/**
 * Utility functions for Filter Presets
 * Geography-focused quick filters for market analysis
 */

import type { ComparisonData, DataRecord, FilterState } from './types'

const PREFERRED_SEGMENT_TYPE = 'By Component'

export function getPreferredSegmentType(data: ComparisonData | null): string | null {
  if (!data?.dimensions?.segments) return null
  const segmentTypes = Object.keys(data.dimensions.segments)
  if (segmentTypes.includes(PREFERRED_SEGMENT_TYPE)) return PREFERRED_SEGMENT_TYPE
  return segmentTypes[0] || null
}

export function getFirstSegmentType(data: ComparisonData | null): string | null {
  return getPreferredSegmentType(data)
}

/**
 * Calculate top geographies based on market value for a specific year
 */
export function getTopGeographiesByMarketValue(
  data: ComparisonData | null,
  year: number = 2023,
  topN: number = 3
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const geographyTotals = new Map<string, number>()

  records.forEach((record: DataRecord) => {
    const geography = record.geography
    const value = record.time_series[year] || 0
    if (geography === 'Global') return
    geographyTotals.set(geography, (geographyTotals.get(geography) || 0) + value)
  })

  return Array.from(geographyTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([geography]) => geography)
}

/**
 * Calculate top geographies based on CAGR
 */
export function getTopGeographiesByCAGR(
  data: ComparisonData | null,
  topN: number = 2
): string[] {
  if (!data) return []

  const records = data.data.value.geography_segment_matrix
  const geographyCAGRs = new Map<string, number[]>()

  records.forEach((record: DataRecord) => {
    const geography = record.geography
    if (geography === 'Global') return
    if (record.cagr !== undefined && record.cagr !== null) {
      const cagrs = geographyCAGRs.get(geography) || []
      cagrs.push(record.cagr)
      geographyCAGRs.set(geography, cagrs)
    }
  })

  return Array.from(geographyCAGRs.entries())
    .map(([geography, cagrs]) => ({
      geography,
      avgCAGR: cagrs.reduce((a, b) => a + b, 0) / cagrs.length,
    }))
    .sort((a, b) => b.avgCAGR - a.avgCAGR)
    .slice(0, topN)
    .map((item) => item.geography)
}

/**
 * Get all first-level segments for a given segment type
 */
export function getFirstLevelSegments(
  data: ComparisonData | null,
  segmentType: string
): string[] {
  if (!data) return []

  const segmentDimension = data.dimensions.segments[segmentType]
  if (!segmentDimension) return []

  const hierarchy = segmentDimension.hierarchy || {}
  const allSegments = segmentDimension.items || []
  const allChildren = new Set(Object.values(hierarchy).flat())
  const firstLevelSegments: string[] = []

  Object.keys(hierarchy).forEach((parent) => {
    if (!allChildren.has(parent) && hierarchy[parent].length > 0) {
      firstLevelSegments.push(parent)
    }
  })

  allSegments.forEach((segment) => {
    if (!allChildren.has(segment) && !hierarchy[segment]) {
      firstLevelSegments.push(segment)
    }
  })

  return firstLevelSegments.sort()
}

function baseGeographyPreset(
  data: ComparisonData | null,
  geographies: string[],
  yearRange: [number, number]
): Partial<FilterState> {
  const segmentType = getPreferredSegmentType(data) || 'By Component'
  const firstLevelSegments = getFirstLevelSegments(data, segmentType)

  return {
    viewMode: 'geography-mode',
    geographies,
    segments: firstLevelSegments,
    segmentType,
    yearRange,
    dataType: 'value',
  }
}

/**
 * Top geographies by 2023 market size
 */
export function createTopMarketFilters(data: ComparisonData | null): Partial<FilterState> {
  const topGeographies = getTopGeographiesByMarketValue(data, 2023, 3)
  return baseGeographyPreset(data, topGeographies, [2023, 2027])
}

/**
 * Top geographies with highest CAGR
 */
export function createGrowthLeadersFilters(data: ComparisonData | null): Partial<FilterState> {
  if (!data) {
    return { viewMode: 'geography-mode', yearRange: [2025, 2031], dataType: 'value' }
  }
  const topGeographies = getTopGeographiesByCAGR(data, 2)
  return baseGeographyPreset(data, topGeographies, [2025, 2031])
}

/**
 * Top geographies by growth (uses top 5 by CAGR)
 */
export function createEmergingMarketsFilters(data: ComparisonData | null): Partial<FilterState> {
  if (!data) {
    return { viewMode: 'geography-mode', yearRange: [2025, 2031], dataType: 'value' }
  }
  const topGeographies = getTopGeographiesByCAGR(data, 5)
  return baseGeographyPreset(data, topGeographies, [2025, 2031])
}

/**
 * Full comparison matrix across all geographies
 */
export function createFullComparisonFilters(data: ComparisonData | null): Partial<FilterState> {
  if (!data) {
    return { viewMode: 'matrix', yearRange: [2023, 2027], dataType: 'value' }
  }

  const allGeographies = data.dimensions.geographies.all_geographies || []
  const segmentType = getPreferredSegmentType(data) || 'By Component'
  const firstLevelSegments = getFirstLevelSegments(data, segmentType)

  return {
    viewMode: 'matrix',
    geographies: allGeographies,
    segments: firstLevelSegments,
    segmentType,
    yearRange: [2023, 2027],
    dataType: 'value',
  }
}

/**
 * Create a quick-filter preset for a single geography
 */
export function createSingleGeographyFilters(
  data: ComparisonData | null,
  geography: string
): Partial<FilterState> {
  return baseGeographyPreset(data, [geography], [2023, 2027])
}

/**
 * Build one quick-filter preset per available geography
 */
export function createGeographyQuickFilters(
  data: ComparisonData | null
): Array<{ id: string; name: string; description: string; filters: Partial<FilterState> }> {
  if (!data) return []

  const allGeographies = data.dimensions.geographies.all_geographies || []
  return allGeographies.map((geo) => ({
    id: `geo-${geo.replace(/\s+/g, '-').toLowerCase()}`,
    name: geo,
    description: `View ${geo} market data`,
    filters: createSingleGeographyFilters(data, geo),
  }))
}
