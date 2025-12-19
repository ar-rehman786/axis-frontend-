import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, DollarSign, PieChart } from 'lucide-react';

// ==================== MOCK DATA ====================
const mockData = {
  // Opportunity Types Summary
  opportunityTypesSummary: [
    { type: 'Immediate Contact', count: 87, avgEquity: 368000, priority: 'Urgent' },
    { type: 'Pre-listing Contact', count: 198, avgEquity: 285000, priority: 'High' },
    { type: 'Acquisition Target', count: 156, avgEquity: 312000, priority: 'High' },
    { type: 'Equity Partner', count: 124, avgEquity: 220000, priority: 'Medium' },
    { type: 'Nurture', count: 342, avgEquity: 185000, priority: 'Low' },
    { type: 'Watch List', count: 340, avgEquity: 145000, priority: 'Monitor' }
  ],

  // ROI Scenarios
  roiScenarios: [
    {
      scenario: 'Quick Flip',
      purchasePrice: 425000,
      rehabCost: 35000,
      holdingTime: '3-6 months',
      estimatedARV: 495000,
      roi: 7.6,
      annualizedROI: 15.2
    },
    {
      scenario: 'Buy & Hold',
      purchasePrice: 425000,
      rehabCost: 15000,
      holdingTime: '5 years',
      estimatedAppreciation: 5.2,
      cashFlow: 850,
      roi: 12.3,
      annualizedROI: 12.3
    },
    {
      scenario: 'Wholesale',
      purchasePrice: 425000,
      assignmentFee: 15000,
      holdingTime: '0-1 month',
      roi: 3.5,
      annualizedROI: 42
    }
  ],

  // Contact Status Breakdown
  contactStatus: [
    { status: 'Not Contacted', count: 892, percent: 71.5, color: 'gray' },
    { status: 'Email Sent', count: 198, percent: 15.9, color: 'blue' },
    { status: 'Phone Call Made', count: 87, percent: 7.0, color: 'yellow' },
    { status: 'Meeting Scheduled', count: 42, percent: 3.4, color: 'teal' },
    { status: 'Under Contract', count: 18, percent: 1.4, color: 'green' },
    { status: 'Closed Deal', count: 10, percent: 0.8, color: 'purple' }
  ],

  // Churn Risk Breakdown
  churnRiskBreakdown: [
    { risk: 'Very High', count: 87, percent: 7, color: '#FF0000' },
    { risk: 'High', count: 312, percent: 25, color: '#FF6B6B' },
    { risk: 'Medium', count: 487, percent: 39, color: '#FFD166' },
    { risk: 'Low', count: 298, percent: 24, color: '#00D1D1' },
    { risk: 'Very Low', count: 63, percent: 5, color: '#9CA3AF' }
  ]
};

// ==================== INTERFACES ====================
interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

interface OpportunityType {
  type: string;
  count: number;
  avgEquity: number;
  priority: string;
}

interface ROIScenario {
  scenario: string;
  purchasePrice: number;
  rehabCost?: number;
  assignmentFee?: number;
  holdingTime: string;
  estimatedARV?: number;
  estimatedAppreciation?: number;
  cashFlow?: number;
  roi: number;
  annualizedROI: number;
}

interface ContactStatus {
  status: string;
  count: number;
  percent: number;
  color: string;
}

// ==================== COMPONENTS ====================
const ReportCard: React.FC<ReportCardProps> = ({ title, description, icon: Icon, color, action }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-teal-500/50 transition-all">
    <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
      <Icon size={24} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-400 mb-4">{description}</p>
    <button
      onClick={action}
      className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
    >
      <Download size={16} />
      Generate Report
    </button>
  </div>
);

// ==================== MAIN COMPONENT ====================
const ReportsTab: React.FC = () => {
  const [reportType, setReportType] = useState('acquisition');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-blue-500/20 text-blue-400';
      case 'High': return 'bg-yellow-500/20 text-yellow-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Low': return 'bg-teal-500/20 text-teal-400';
      case 'Monitor': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getColorClass = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'gray': 'bg-gray-500',
      'blue': 'bg-blue-500',
      'yellow': 'bg-yellow-500',
      'teal': 'bg-teal-500',
      'green': 'bg-red-500',
      'purple': 'bg-purple-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Reports & Analytics</h2>
        <p className="text-gray-400">Generate investment reports and analyze market opportunities</p>
      </div>

      {/* Report Type Selector */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm font-medium">Report Type:</label>
          <div className="flex gap-2 flex-wrap">
            {['acquisition', 'market', 'roi', 'pipeline'].map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  reportType === type
                    ? 'bg-teal-500 text-white'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                }`}
              >
                {type === 'acquisition' && 'Acquisition Report'}
                {type === 'market' && 'Market Analysis'}
                {type === 'roi' && 'ROI Analysis'}
                {type === 'pipeline' && 'Pipeline Report'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Reports Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReportCard
            title="Acquisition Report"
            description="Detailed property analysis with equity, churn, and opportunity breakdown"
            icon={FileText}
            color="bg-teal-500/10 text-teal-400"
            action={() => console.log('Generate Acquisition Report')}
          />
          <ReportCard
            title="Market Overview"
            description="ZIP-level market trends, DOM, inventory, and price movements"
            icon={TrendingUp}
            color="bg-blue-500/10 text-blue-400"
            action={() => console.log('Generate Market Report')}
          />
          <ReportCard
            title="ROI Calculator"
            description="Investment scenarios with flip, hold, and wholesale projections"
            icon={DollarSign}
            color="bg-red-500/10 text-red-400"
            action={() => console.log('Generate ROI Report')}
          />
          <ReportCard
            title="Contact Status"
            description="Owner outreach tracking and conversion metrics"
            icon={Calendar}
            color="bg-yellow-500/10 text-yellow-400"
            action={() => console.log('Generate Contact Report')}
          />
          <ReportCard
            title="Opportunity Pipeline"
            description="Sales funnel from lead to closed deal analysis"
            icon={PieChart}
            color="bg-purple-500/10 text-purple-400"
            action={() => console.log('Generate Pipeline Report')}
          />
          <ReportCard
            title="Custom Report"
            description="Build your own custom report with selected metrics"
            icon={FileText}
            color="bg-purple-500/10 text-purple-400"
            action={() => console.log('Generate Custom Report')}
          />
        </div>
      </div>

      {/* Opportunity Types Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Opportunity Types Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-zinc-800">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Count</th>
                <th className="pb-3 font-medium">Avg Equity</th>
                <th className="pb-3 font-medium">Priority</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockData.opportunityTypesSummary.map((opportunity: OpportunityType) => (
                <tr key={opportunity.type} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-3 font-medium">{opportunity.type}</td>
                  <td className="py-3">{opportunity.count}</td>
                  <td className="py-3 text-teal-400 font-medium">
                    ${(opportunity.avgEquity / 1000).toFixed(0)}k
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(opportunity.priority)}`}>
                      {opportunity.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-teal-400 hover:text-teal-300">View List</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Scenarios */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">ROI Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.roiScenarios.map((scenario: ROIScenario) => (
            <div key={scenario.scenario} className="bg-zinc-800/50 rounded-lg p-4">
              <h4 className="font-medium mb-3 text-teal-400">{scenario.scenario}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Purchase:</span>
                  <span>${(scenario.purchasePrice / 1000).toFixed(0)}k</span>
                </div>
                {scenario.rehabCost && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rehab:</span>
                    <span>${(scenario.rehabCost / 1000).toFixed(0)}k</span>
                  </div>
                )}
                {scenario.assignmentFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Assignment Fee:</span>
                    <span>${(scenario.assignmentFee / 1000).toFixed(0)}k</span>
                  </div>
                )}
                {scenario.estimatedARV && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. ARV:</span>
                    <span>${(scenario.estimatedARV / 1000).toFixed(0)}k</span>
                  </div>
                )}
                {scenario.cashFlow && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Monthly Cash Flow:</span>
                    <span>${scenario.cashFlow}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Timeline:</span>
                  <span>{scenario.holdingTime}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-700">
                  <span className="text-gray-400">ROI:</span>
                  <span className="text-red-400 font-medium">{scenario.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Annualized ROI:</span>
                  <span className="text-red-400 font-medium">{scenario.annualizedROI}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Status Breakdown */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Contact Status Distribution</h3>
        <div className="space-y-3">
          {mockData.contactStatus.map((status: ContactStatus) => (
            <div key={status.status} className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="text-sm font-medium w-32">{status.status}</div>
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getColorClass(status.color)}`} 
                    style={{ width: `${status.percent}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm font-medium w-24 text-right">
                {status.count} ({status.percent}%)
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 pt-6 border-t border-zinc-800 grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-teal-400">
              {mockData.contactStatus.reduce((sum, s) => sum + s.count, 0)}
            </p>
            <p className="text-sm text-gray-400">Total Contacts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {mockData.contactStatus
                .filter(s => ['Meeting Scheduled', 'Under Contract', 'Closed Deal'].includes(s.status))
                .reduce((sum, s) => sum + s.count, 0)}
            </p>
            <p className="text-sm text-gray-400">Active Pipeline</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-400">
              {mockData.contactStatus.find(s => s.status === 'Closed Deal')?.count || 0}
            </p>
            <p className="text-sm text-gray-400">Closed Deals</p>
          </div>
        </div>
      </div>

      {/* Churn Risk Breakdown */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Churn Risk Distribution</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {mockData.churnRiskBreakdown.map((risk) => (
            <div key={risk.risk} className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: `${risk.color}20` }}>
                <span className="text-2xl font-bold" style={{ color: risk.color }}>
                  {risk.percent}%
                </span>
              </div>
              <p className="text-sm font-medium mb-1">{risk.risk}</p>
              <p className="text-xs text-gray-400">{risk.count} properties</p>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Export Options</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
            <Download size={20} />
            <span className="font-medium">Export to PDF</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
            <Download size={20} />
            <span className="font-medium">Export to Excel</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
            <Download size={20} />
            <span className="font-medium">Export to CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;