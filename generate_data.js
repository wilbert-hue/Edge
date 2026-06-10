const fs = require('fs');
const path = require('path');

const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];
const GEOGRAPHY = 'U.S.';

// US Edge AI market base value (USD Million) for 2021
const US_BASE_VALUE_2021 = 6200;
const US_BASE_CAGR = 0.182;

// Hierarchical: By Component (Segment > Sub-segment > Sub-sub-segment)
const byComponentHierarchy = {
  Hardware: {
    'Edge AI Processors': {
      CPUs: 0.055,
      GPUs: 0.066,
      'NPUs / AI Accelerators': 0.055,
      FPGAs: 0.022,
      ASICs: 0.022,
    },
    'Edge Infrastructure Hardware': {
      'Edge AI Servers': 0.086,
      'Edge Gateways': 0.058,
      'Embedded Edge Modules': 0.048,
    },
    'Edge Endpoint Devices': {
      'AI-enabled Sensors': 0.038,
      'Smart Cameras': 0.044,
      'Robotics Controllers': 0.028,
    },
  },
  Software: {
    'Edge AI Platforms': 0.09,
    'AI Training & Inference Software': 0.075,
    'Edge Analytics Software': 0.06,
    'AI Middleware & Runtime Software': 0.045,
    'Security & Privacy Software': 0.03,
  },
  Services: {
    'Professional Services': 0.09,
    'Managed Services': 0.06,
  },
};

// Flat segment types (segment name -> share of total market)
const flatSegmentTypes = {
  'By Processing Architecture': {
    'On-device Edge AI': 0.52,
    'Distributed Edge AI': 0.33,
    'Federated Edge AI': 0.15,
  },
  'By Data Type': {
    'Visual Data (Video & Image Data)': 0.42,
    'Sensor & Telemetry Data': 0.38,
    'Multimodal Data': 0.20,
  },
  'By Connectivity': {
    'Cellular Connectivity (5G/4G)': 0.35,
    'Wi-Fi Connectivity': 0.30,
    'LPWAN Connectivity': 0.20,
    'Satellite Connectivity': 0.15,
  },
  'By Industry Vertical': {
    Manufacturing: 0.24,
    'Energy & Utilities': 0.18,
    'Aerospace & Defense': 0.14,
    Agriculture: 0.08,
    'Logistics & Transportation': 0.16,
    'Government & Public Sector': 0.12,
    'Others (Marine & Environmental Monitoring, etc.)': 0.08,
  },
};

const segmentGrowthMultipliers = {
  Hardware: 1.05,
  Software: 1.12,
  Services: 1.08,
  CPUs: 0.95,
  GPUs: 1.15,
  'NPUs / AI Accelerators': 1.18,
  FPGAs: 1.02,
  ASICs: 1.10,
  'Edge AI Servers': 1.08,
  'Edge Gateways': 1.06,
  'Embedded Edge Modules': 1.04,
  'AI-enabled Sensors': 1.12,
  'Smart Cameras': 1.14,
  'Robotics Controllers': 1.16,
  'Edge AI Platforms': 1.14,
  'AI Training & Inference Software': 1.10,
  'AI Middleware & Runtime Software': 1.12,
  'Edge Analytics Software': 1.08,
  'Security & Privacy Software': 1.15,
  'Professional Services': 1.06,
  'Managed Services': 1.10,
  'On-device Edge AI': 1.08,
  'Distributed Edge AI': 1.12,
  'Federated Edge AI': 1.18,
  'Visual Data (Video & Image Data)': 1.10,
  'Sensor & Telemetry Data': 1.06,
  'Multimodal Data': 1.16,
  'Cellular Connectivity (5G/4G)': 1.14,
  'Wi-Fi Connectivity': 1.05,
  'LPWAN Connectivity': 1.10,
  'Satellite Connectivity': 1.12,
  Manufacturing: 1.10,
  'Energy & Utilities': 1.08,
  'Aerospace & Defense': 1.06,
  Agriculture: 1.14,
  'Logistics & Transportation': 1.12,
  'Government & Public Sector': 1.04,
  'Others (Marine & Environmental Monitoring, etc.)': 1.16,
};

const volumePerMillionUSD = 1250;

let seed = 42;
function seededRandom() {
  seed = (seed * 16807 + 0) % 2147483647;
  return (seed - 1) / 2147483646;
}

function addNoise(value, noiseLevel = 0.025) {
  return value * (1 + (seededRandom() - 0.5) * 2 * noiseLevel);
}

function roundTo1(val) {
  return Math.round(val * 10) / 10;
}

function roundToInt(val) {
  return Math.round(val);
}

function getGrowthMultiplier(name) {
  return segmentGrowthMultipliers[name] || 1.0;
}

function generateTimeSeries(baseValue, growthRate, roundFn) {
  const series = {};
  for (let i = 0; i < years.length; i++) {
    const year = years[i];
    series[year] = roundFn(addNoise(baseValue * Math.pow(1 + growthRate, i)));
  }
  return series;
}

function sumTimeSeries(seriesList) {
  const total = {};
  for (const year of years) {
    total[year] = roundTo1(seriesList.reduce((sum, s) => sum + (s[year] || 0), 0));
  }
  return total;
}

function buildHierarchicalNode(node, baseMarket, parentGrowth, isVolume) {
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;
  const result = {};

  const entries = Object.entries(node);
  const childSeriesList = [];

  for (const [key, value] of entries) {
    if (typeof value === 'object' && value !== null) {
      const childNode = buildHierarchicalNode(value, baseMarket, parentGrowth * getGrowthMultiplier(key), isVolume);
      result[key] = childNode;
      if (childNode._leafSeries) {
        childSeriesList.push(childNode._leafSeries);
        delete childNode._leafSeries;
      } else {
        const childYearKeys = Object.keys(childNode).filter((k) => /^\d{4}$/.test(k));
        if (childYearKeys.length > 0) {
          childSeriesList.push(
            Object.fromEntries(childYearKeys.map((y) => [y, childNode[y]]))
          );
        }
      }
    } else {
      const segGrowth = parentGrowth * getGrowthMultiplier(key);
      const segBase = baseMarket * multiplier * value;
      const series = generateTimeSeries(segBase, segGrowth, roundFn);
      result[key] = series;
      childSeriesList.push(series);
    }
  }

  if (childSeriesList.length > 0) {
    const parentTotals = sumTimeSeries(childSeriesList);
    if (isVolume) {
      for (const year of years) {
        parentTotals[year] = roundToInt(parentTotals[year]);
      }
    }
    Object.assign(result, parentTotals);
  }

  return result;
}

function buildFlatSegmentType(segments, baseMarket, isVolume) {
  const roundFn = isVolume ? roundToInt : roundTo1;
  const multiplier = isVolume ? volumePerMillionUSD : 1;
  const result = {};

  for (const [segName, share] of Object.entries(segments)) {
    const segGrowth = US_BASE_CAGR * getGrowthMultiplier(segName);
    const segBase = baseMarket * multiplier * share;
    result[segName] = generateTimeSeries(segBase, segGrowth, roundFn);
  }

  return result;
}

function generateGeographyData(isVolume) {
  const data = { [GEOGRAPHY]: {} };

  data[GEOGRAPHY]['By Component'] = buildHierarchicalNode(
    byComponentHierarchy,
    US_BASE_VALUE_2021,
    US_BASE_CAGR,
    isVolume
  );

  for (const [segType, segments] of Object.entries(flatSegmentTypes)) {
    data[GEOGRAPHY][segType] = buildFlatSegmentType(segments, US_BASE_VALUE_2021, isVolume);
  }

  return data;
}

function buildSegmentationAnalysisStructure(node) {
  if (typeof node !== 'object' || node === null) return {};
  const result = {};
  for (const [key, value] of Object.entries(node)) {
    result[key] = typeof value === 'object' && !Array.isArray(value)
      ? buildSegmentationAnalysisStructure(value)
      : {};
  }
  return result;
}

function buildSegmentationAnalysis() {
  return {
    [GEOGRAPHY]: {
      'By Component': buildSegmentationAnalysisStructure(byComponentHierarchy),
      ...Object.fromEntries(
        Object.keys(flatSegmentTypes).map((segType) => [
          segType,
          Object.fromEntries(Object.keys(flatSegmentTypes[segType]).map((s) => [s, {}])),
        ])
      ),
    },
  };
}

seed = 42;
const valueData = generateGeographyData(false);
seed = 7777;
const volumeData = generateGeographyData(true);
const segmentationAnalysis = buildSegmentationAnalysis();

const outDir = path.join(__dirname, 'public', 'data');
fs.writeFileSync(path.join(outDir, 'value.json'), JSON.stringify(valueData, null, 2));
fs.writeFileSync(path.join(outDir, 'volume.json'), JSON.stringify(volumeData, null, 2));
fs.writeFileSync(path.join(outDir, 'segmentation_analysis.json'), JSON.stringify(segmentationAnalysis, null, 2));

console.log('Generated Edge AI market data (U.S. only)');
console.log('Geographies:', Object.keys(valueData));
console.log('Segment types:', Object.keys(valueData[GEOGRAPHY]));
console.log('By Component top-level keys:', Object.keys(valueData[GEOGRAPHY]['By Component']));
