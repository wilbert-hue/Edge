'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import {
  CUSTOMER_DATABASE_TITLE,
  CUSTOMER_DATABASE_SUBTITLE,
  proposition1DemoData,
  proposition2DemoData,
  proposition3DemoData,
  type EdgeCustomerBase,
  type EdgeCustomerProposition2,
  type EdgeCustomerProposition3,
} from '@/lib/edge-customer-intelligence-data'

const thBase = 'border border-gray-300 px-3 py-2 text-left text-xs font-semibold text-black'
const thGroupCustomer = 'bg-[#E8C4A0] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black'
const thGroupContact = 'bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black'
const thGroupBuying = 'bg-[#7EC8E3] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black'
const thGroupPurchasing = 'bg-[#9370DB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-white'
const thGroupSolution = 'bg-[#D4A574] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black'
const thGroupCmi = 'bg-[#87CEEB] border border-gray-300 px-3 py-2 text-center text-sm font-semibold text-black'
const thSubCustomer = 'bg-[#FFF8DC] ' + thBase
const thSubContact = 'bg-[#B0E0E6] ' + thBase
const thSubBuying = 'bg-[#B0E0E6] ' + thBase
const thSubPurchasing = 'bg-[#DDA0DD] ' + thBase
const thSubSolution = 'bg-[#DEB887] ' + thBase
const thSubCmi = 'bg-[#B0E0E6] ' + thBase
const tdCell = 'border border-gray-300 px-3 py-2 text-sm text-black'

function LinkCell({ href, label, prefix = '' }: { href: string; label: string; prefix?: string }) {
  const url = prefix ? `${prefix}${label}` : label
  return (
    <td className={`${tdCell} text-blue-600 hover:underline`}>
      <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
    </td>
  )
}

interface PropositionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

function Proposition({ title, isOpen, onToggle, children }: PropositionProps) {
  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span className="text-lg font-semibold text-black">{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>
      {isOpen && <div className="px-2 pb-4 bg-white rounded-b-lg">{children}</div>}
    </div>
  )
}

function renderBaseColumns(c: EdgeCustomerBase) {
  return (
    <>
      <td className={`${tdCell} text-center`}>{c.sNo}</td>
      <td className={tdCell}>{c.customerName}</td>
      <td className={tdCell}>{c.businessOverview}</td>
      <td className={tdCell}>{c.edgeAiExactCustomerType}</td>
      <td className={tdCell}>{c.edgeAiUseCase}</td>
      <td className={tdCell}>{c.annualRevenueUsdMillion2025}</td>
      <td className={tdCell}>{c.sizeAndScale}</td>
      <td className={tdCell}>{c.relevantKeyContactPerson}</td>
      <td className={tdCell}>{c.roleOrDesignation}</td>
      <td className={tdCell}>
        <a href={`mailto:${c.emailAddress}`} className="text-blue-600 hover:underline">{c.emailAddress}</a>
      </td>
      <td className={tdCell}>{c.phoneNumberOrWhatsApp}</td>
      <LinkCell href="" label={c.linkedInProfile} prefix="https://" />
      <LinkCell href="" label={c.companyWebsite} prefix="https://" />
    </>
  )
}

function Proposition1Table() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th rowSpan={2} className={`${thSubCustomer} min-w-[50px] align-middle text-center`}>S.No.</th>
            <th colSpan={6} className={thGroupCustomer}>Customer Information</th>
            <th colSpan={6} className={thGroupContact}>Contact Details</th>
          </tr>
          <tr>
            <th className={`${thSubCustomer} min-w-[180px]`}>Customer Name</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Business Overview</th>
            <th className={`${thSubCustomer} min-w-[180px]`}>Edge Artificial Intelligence Exact Customer Type</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Edge Artificial Intelligence Use Case</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Annual Revenue in United States Dollars Million, 2025</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Size and Scale</th>
            <th className={`${thSubContact} min-w-[140px]`}>Relevant Key Contact Person</th>
            <th className={`${thSubContact} min-w-[150px]`}>Role or Designation</th>
            <th className={`${thSubContact} min-w-[160px]`}>Email Address</th>
            <th className={`${thSubContact} min-w-[150px]`}>Phone Number or WhatsApp Number</th>
            <th className={`${thSubContact} min-w-[150px]`}>LinkedIn Profile</th>
            <th className={`${thSubContact} min-w-[130px]`}>Company Website</th>
          </tr>
        </thead>
        <tbody>
          {proposition1DemoData.map((c, i) => (
            <tr key={c.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderBaseColumns(c)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Proposition2Table() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th rowSpan={2} className={`${thSubCustomer} min-w-[50px] align-middle text-center`}>S.No.</th>
            <th colSpan={6} className={thGroupCustomer}>Customer Information</th>
            <th colSpan={6} className={thGroupContact}>Contact Details</th>
            <th colSpan={4} className={thGroupBuying}>Edge Artificial Intelligence Buying Drivers</th>
          </tr>
          <tr>
            <th className={`${thSubCustomer} min-w-[180px]`}>Customer Name</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Business Overview</th>
            <th className={`${thSubCustomer} min-w-[180px]`}>Edge Artificial Intelligence Exact Customer Type</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Edge Artificial Intelligence Use Case</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Annual Revenue in United States Dollars Million, 2025</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Size and Scale</th>
            <th className={`${thSubContact} min-w-[140px]`}>Relevant Key Contact Person</th>
            <th className={`${thSubContact} min-w-[150px]`}>Role or Designation</th>
            <th className={`${thSubContact} min-w-[160px]`}>Email Address</th>
            <th className={`${thSubContact} min-w-[150px]`}>Phone Number or WhatsApp Number</th>
            <th className={`${thSubContact} min-w-[150px]`}>LinkedIn Profile</th>
            <th className={`${thSubContact} min-w-[130px]`}>Company Website</th>
            <th className={`${thSubBuying} min-w-[180px]`}>Edge Artificial Intelligence Buying Criteria</th>
            <th className={`${thSubBuying} min-w-[180px]`}>Edge Artificial Intelligence Pain Points</th>
            <th className={`${thSubBuying} min-w-[220px]`}>Buying Trigger, Digital Maturity, Risk Exposure, and Edge Complexity</th>
            <th className={`${thSubBuying} min-w-[140px]`}>Budget Owner</th>
          </tr>
        </thead>
        <tbody>
          {proposition2DemoData.map((c: EdgeCustomerProposition2, i) => (
            <tr key={c.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderBaseColumns(c)}
              <td className={tdCell}>{c.edgeAiBuyingCriteria}</td>
              <td className={tdCell}>{c.edgeAiPainPoints}</td>
              <td className={tdCell}>{c.buyingTriggerDigitalMaturity}</td>
              <td className={tdCell}>{c.budgetOwner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Proposition3Table() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th rowSpan={2} className={`${thSubCustomer} min-w-[50px] align-middle text-center`}>S.No.</th>
            <th colSpan={6} className={thGroupCustomer}>Customer Information</th>
            <th colSpan={6} className={thGroupContact}>Contact Details</th>
            <th colSpan={4} className={thGroupBuying}>Edge Artificial Intelligence Buying Drivers</th>
            <th colSpan={4} className={thGroupPurchasing}>Purchasing Behaviour Metrics</th>
            <th colSpan={4} className={thGroupSolution}>Solution Requirements</th>
            <th className={thGroupCmi}>
              CMI Insights on Customer Benchmarking Summary (Potential Customers)
            </th>
          </tr>
          <tr>
            <th className={`${thSubCustomer} min-w-[180px]`}>Customer Name</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Business Overview</th>
            <th className={`${thSubCustomer} min-w-[180px]`}>Edge Artificial Intelligence Exact Customer Type</th>
            <th className={`${thSubCustomer} min-w-[200px]`}>Edge Artificial Intelligence Use Case</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Annual Revenue in United States Dollars Million, 2025</th>
            <th className={`${thSubCustomer} min-w-[160px]`}>Size and Scale</th>
            <th className={`${thSubContact} min-w-[140px]`}>Relevant Key Contact Person</th>
            <th className={`${thSubContact} min-w-[150px]`}>Role or Designation</th>
            <th className={`${thSubContact} min-w-[160px]`}>Email Address</th>
            <th className={`${thSubContact} min-w-[150px]`}>Phone Number or WhatsApp Number</th>
            <th className={`${thSubContact} min-w-[150px]`}>LinkedIn Profile</th>
            <th className={`${thSubContact} min-w-[130px]`}>Company Website</th>
            <th className={`${thSubBuying} min-w-[180px]`}>Edge Artificial Intelligence Buying Criteria</th>
            <th className={`${thSubBuying} min-w-[180px]`}>Edge Artificial Intelligence Pain Points</th>
            <th className={`${thSubBuying} min-w-[220px]`}>Buying Trigger, Digital Maturity, Risk Exposure, and Edge Complexity</th>
            <th className={`${thSubBuying} min-w-[140px]`}>Budget Owner</th>
            <th className={`${thSubPurchasing} min-w-[160px]`}>Procurement Model</th>
            <th className={`${thSubPurchasing} min-w-[180px]`}>Vendor Selection Criteria</th>
            <th className={`${thSubPurchasing} min-w-[180px]`}>Preferred Engagement Model</th>
            <th className={`${thSubPurchasing} min-w-[200px]`}>Preferred Deployment and Service Model</th>
            <th className={`${thSubSolution} min-w-[180px]`}>Preferred Solution Type</th>
            <th className={`${thSubSolution} min-w-[220px]`}>Integration, Technical, and Service Requirements</th>
            <th className={`${thSubSolution} min-w-[180px]`}>Performance Expectations</th>
            <th className={`${thSubSolution} min-w-[180px]`}>Benchmark Summary</th>
            <th className={`${thSubCmi} min-w-[200px]`}>Customer Benchmarking Summary</th>
          </tr>
        </thead>
        <tbody>
          {proposition3DemoData.map((c: EdgeCustomerProposition3, i) => (
            <tr key={c.sNo} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {renderBaseColumns(c)}
              <td className={tdCell}>{c.edgeAiBuyingCriteria}</td>
              <td className={tdCell}>{c.edgeAiPainPoints}</td>
              <td className={tdCell}>{c.buyingTriggerDigitalMaturity}</td>
              <td className={tdCell}>{c.budgetOwner}</td>
              <td className={tdCell}>{c.procurementModel}</td>
              <td className={tdCell}>{c.vendorSelectionCriteria}</td>
              <td className={tdCell}>{c.preferredEngagementModel}</td>
              <td className={tdCell}>{c.preferredDeploymentAndServiceModel}</td>
              <td className={tdCell}>{c.preferredSolutionType}</td>
              <td className={tdCell}>{c.integrationTechnicalServiceRequirements}</td>
              <td className={tdCell}>{c.performanceExpectations}</td>
              <td className={tdCell}>{c.benchmarkSummary}</td>
              <td className={tdCell}>{c.customerBenchmarkingSummary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface CustomerIntelligenceDatabaseProps {
  title?: string
  height?: number
}

export default function CustomerIntelligenceDatabase({ title }: CustomerIntelligenceDatabaseProps) {
  const [openProposition, setOpenProposition] = useState<number | null>(1)

  const toggleProposition = (num: number) => {
    setOpenProposition(openProposition === num ? null : num)
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-black mb-2">{title || CUSTOMER_DATABASE_TITLE}</h2>
      <p className="text-sm text-gray-700 mb-6">{CUSTOMER_DATABASE_SUBTITLE}</p>

      <Proposition
        title="Proposition 1 — Basic"
        isOpen={openProposition === 1}
        onToggle={() => toggleProposition(1)}
      >
        <Proposition1Table />
      </Proposition>

      <Proposition
        title="Proposition 2 — Advanced"
        isOpen={openProposition === 2}
        onToggle={() => toggleProposition(2)}
      >
        <Proposition2Table />
      </Proposition>

      <Proposition
        title="Proposition 3 — Premium"
        isOpen={openProposition === 3}
        onToggle={() => toggleProposition(3)}
      >
        <Proposition3Table />
      </Proposition>
    </div>
  )
}
