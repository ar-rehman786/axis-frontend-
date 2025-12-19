import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Award, Users, BarChart3, Download, Filter, ArrowUpRight, ArrowDownRight, Target, X } from 'lucide-react';

interface RevenueMetric {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change?: string;
  changeType?: 'up' | 'down';
}

interface AgentRevenue {
  id: number;
  agent: string;
  revenue: number;
  deals: number;
  fee: number;
  avgDealSize: number;
  conversionRate: number;
  pipeline: number;
  tier: string;
  quarterlyGrowth: number;
}

interface MonthlyData {
  month: string;
  revenue: number;
  deals: number;
  avgDealSize: number;
}

interface DealDetail {
  id: number;
  property: string;
  agent: string;
  dealValue: number;
  fee: number;
  closeDate: string;
  status: 'Closed' | 'Pending';
  type: string;
}

export default function RevenueTab() {
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<string>('Q4 2025');
  const [showDealDetails, setShowDealDetails] = useState(false);
  const [selectedDealAgent, setSelectedDealAgent] = useState<string | null>(null);

  // Revenue Metrics
  const revenueMetrics: RevenueMetric[] = [
    { 
      label: 'Closings Tied to Intel', 
      value: '87 deals', 
      icon: Award, 
      color: 'text-purple-400',
      change: '+12.5%',
      changeType: 'up'
    },
    { 
      label: 'Total Deal Value', 
      value: '$42.5M', 
      icon: TrendingUp, 
      color: 'text-green-400',
      change: '+18.3%',
      changeType: 'up'
    },
    { 
      label: 'Performance Fee (10%)', 
      value: '$4.25M', 
      icon: DollarSign, 
      color: 'text-[#00D4D4]',
      change: '+18.3%',
      changeType: 'up'
    },
    { 
      label: 'Forecasted (Next Q)', 
      value: '$5.8M', 
      icon: Calendar, 
      color: 'text-yellow-400',
      change: '+36.5%',
      changeType: 'up'
    }
  ];

  // Monthly Revenue Data
  const [monthlyRevenue] = useState<MonthlyData[]>([
    { month: 'Jul', revenue: 680000, deals: 14, avgDealSize: 48571 },
    { month: 'Aug', revenue: 720000, deals: 15, avgDealSize: 48000 },
    { month: 'Sep', revenue: 850000, deals: 17, avgDealSize: 50000 },
    { month: 'Oct', revenue: 920000, deals: 19, avgDealSize: 48421 },
    { month: 'Nov', revenue: 1080000, deals: 22, avgDealSize: 49091 },
    { month: 'Dec', revenue: 1000000, deals: 20, avgDealSize: 50000 }
  ]);

  // Agent Revenue Data
  const [agentRevenue] = useState<AgentRevenue[]>([
    { 
      id: 1,
      agent: 'John D.', 
      revenue: 2400000, 
      deals: 12, 
      fee: 240000,
      avgDealSize: 200000,
      conversionRate: 24.5,
      pipeline: 1800000,
      tier: 'Platinum',
      quarterlyGrowth: 15.2
    },
    { 
      id: 2,
      agent: 'Sarah M.', 
      revenue: 1600000, 
      deals: 8, 
      fee: 160000,
      avgDealSize: 200000,
      conversionRate: 18.3,
      pipeline: 1200000,
      tier: 'Gold',
      quarterlyGrowth: 12.8
    },
    { 
      id: 3,
      agent: 'Mike R.', 
      revenue: 1000000, 
      deals: 5, 
      fee: 100000,
      avgDealSize: 200000,
      conversionRate: 15.7,
      pipeline: 750000,
      tier: 'Silver',
      quarterlyGrowth: 8.5
    },
    { 
      id: 4,
      agent: 'Lisa K.', 
      revenue: 600000, 
      deals: 3, 
      fee: 60000,
      avgDealSize: 200000,
      conversionRate: 12.2,
      pipeline: 450000,
      tier: 'Bronze',
      quarterlyGrowth: 5.3
    }
  ]);

  // Deal Details
  const [dealDetails] = useState<DealDetail[]>([
    { id: 1, property: '123 Main St', agent: 'John D.', dealValue: 520000, fee: 52000, closeDate: '2024-12-05', status: 'Closed', type: 'Sale' },
    { id: 2, property: '456 Oak Ave', agent: 'John D.', dealValue: 380000, fee: 38000, closeDate: '2024-11-28', status: 'Closed', type: 'Sale' },
    { id: 3, property: '789 Pine Rd', agent: 'Sarah M.', dealValue: 425000, fee: 42500, closeDate: '2024-12-10', status: 'Closed', type: 'Sale' },
    { id: 4, property: '321 Elm St', agent: 'Sarah M.', dealValue: 295000, fee: 29500, closeDate: '2024-11-15', status: 'Closed', type: 'Sale' },
    { id: 5, property: '654 Maple Dr', agent: 'Mike R.', dealValue: 340000, fee: 34000, closeDate: '2024-12-01', status: 'Closed', type: 'Sale' },
    { id: 6, property: '987 Cedar Ln', agent: 'Mike R.', dealValue: 285000, fee: 28500, closeDate: '2024-11-20', status: 'Closed', type: 'Sale' },
    { id: 7, property: '147 Birch Way', agent: 'Lisa K.', dealValue: 245000, fee: 24500, closeDate: '2024-12-08', status: 'Closed', type: 'Sale' },
    { id: 8, property: '258 Spruce Ct', agent: 'John D.', dealValue: 475000, fee: 47500, closeDate: '2024-12-15', status: 'Pending', type: 'Sale' }
  ]);

  // Calculate totals
  const totalRevenue = agentRevenue.reduce((sum, agent) => sum + agent.revenue, 0);
  const totalDeals = agentRevenue.reduce((sum, agent) => sum + agent.deals, 0);
  const totalFee = agentRevenue.reduce((sum, agent) => sum + agent.fee, 0);
  const totalPipeline = agentRevenue.reduce((sum, agent) => sum + agent.pipeline, 0);
  const avgConversion = agentRevenue.reduce((sum, agent) => sum + agent.conversionRate, 0) / agentRevenue.length;

  // Filter agent data
  const filteredAgents = selectedAgent === 'all' 
    ? agentRevenue 
    : agentRevenue.filter(agent => agent.agent === selectedAgent);

  const filteredDeals = selectedDealAgent 
    ? dealDetails.filter(deal => deal.agent === selectedDealAgent)
    : dealDetails;

  const maxValue = Math.max(...monthlyRevenue.map(m => m.revenue));

  const exportReport = () => {
    alert('Revenue report exported successfully!');
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Platinum: 'text-purple-400',
      Gold: 'text-yellow-400',
      Silver: 'text-gray-400',
      Bronze: 'text-orange-400'
    };
    return colors[tier] || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Revenue Performance</h2>
          <p className="text-sm text-gray-400 mt-1">Track revenue, fees, and team performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option>Q4 2025</option>
            <option>Q3 2025</option>
            <option>Q2 2025</option>
            <option>Q1 2025</option>
          </select>
          <button
            onClick={exportReport}
            className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {revenueMetrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-[#00D4D4]/30 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`w-5 h-5 ${metric.color}`} />
                <div className="text-xs text-gray-400">{metric.label}</div>
              </div>
              <div className={`text-2xl font-bold ${metric.color} mb-1`}>{metric.value}</div>
              {metric.change && (
                <div className="flex items-center gap-1">
                  {metric.changeType === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-xs font-medium ${metric.changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500">vs last quarter</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <div className="text-xs text-gray-400">Total Deals</div>
          </div>
          <div className="text-2xl font-bold text-white">{totalDeals}</div>
          <div className="text-xs text-gray-500 mt-1">Closed this quarter</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-orange-400" />
            <div className="text-xs text-gray-400">Avg Deal Size</div>
          </div>
          <div className="text-2xl font-bold text-white">${(totalRevenue / totalDeals / 1000).toFixed(0)}K</div>
          <div className="text-xs text-gray-500 mt-1">Per transaction</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Pipeline Value</div>
          </div>
          <div className="text-2xl font-bold text-white">${(totalPipeline / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-gray-500 mt-1">In progress</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-purple-400" />
            <div className="text-xs text-gray-400">Avg Conversion</div>
          </div>
          <div className="text-2xl font-bold text-white">{avgConversion.toFixed(1)}%</div>
          <div className="text-xs text-gray-500 mt-1">Team average</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-teal-400" />
            <div className="text-xs text-gray-400">Active Agents</div>
          </div>
          <div className="text-2xl font-bold text-white">{agentRevenue.length}</div>
          <div className="text-xs text-gray-500 mt-1">Contributing</div>
        </div>
      </div>

      {/* Monthly Revenue Trend */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">Monthly Revenue Trend</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] rounded-full"></div>
              <span className="text-gray-400">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-400">Deals</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between h-64 gap-2">
          {monthlyRevenue.map((item, idx) => {
            const percentage = (item.revenue / maxValue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full relative" style={{ height: `${percentage}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00D4D4] to-[#00A8A8] rounded-t transition-all group-hover:from-[#00BCC9] group-hover:to-[#009999]"></div>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                      <div className="font-bold">${(item.revenue / 1000).toFixed(0)}K</div>
                      <div className="text-gray-400">{item.deals} deals</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400 font-medium">{item.month}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent Filter */}
      <div className="flex items-center gap-3">
        <Filter className="w-5 h-5 text-gray-400" />
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Agents</option>
          {agentRevenue.map(agent => (
            <option key={agent.id} value={agent.agent}>{agent.agent}</option>
          ))}
        </select>
      </div>

      {/* Agent Revenue Breakdown */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Agent Revenue Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Agent</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Revenue</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Deals</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Avg Deal Size</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Conversion</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Pipeline</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Growth</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Performance Fee</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredAgents.map((agent) => (
                <tr key={agent.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{agent.agent}</span>
                      <span className={`text-xs font-bold ${getTierColor(agent.tier)}`}>({agent.tier})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-green-400">
                    ${(agent.revenue / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{agent.deals}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">${(agent.avgDealSize / 1000).toFixed(0)}K</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-[80px]">
                        <div 
                          className="bg-[#00D4D4] h-2 rounded-full"
                          style={{ width: `${agent.conversionRate * 4}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{agent.conversionRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-400">
                    ${(agent.pipeline / 1000000).toFixed(2)}M
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-green-400">{agent.quarterlyGrowth}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#00D4D4]">
                    ${(agent.fee / 1000).toFixed(0)}K
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedDealAgent(agent.agent);
                        setShowDealDetails(true);
                      }}
                      className="text-sm text-[#00D4D4] hover:underline"
                    >
                      View Deals
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-800/50 font-bold">
                <td className="px-6 py-4 text-sm text-white">TOTAL</td>
                <td className="px-6 py-4 text-sm font-bold text-green-400">${(totalRevenue / 1000000).toFixed(2)}M</td>
                <td className="px-6 py-4 text-sm text-white">{totalDeals}</td>
                <td className="px-6 py-4 text-sm text-white">${(totalRevenue / totalDeals / 1000).toFixed(0)}K</td>
                <td className="px-6 py-4 text-sm text-white">{avgConversion.toFixed(1)}%</td>
                <td className="px-6 py-4 text-sm text-blue-400">${(totalPipeline / 1000000).toFixed(2)}M</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4 text-sm font-bold text-[#00D4D4]">${(totalFee / 1000).toFixed(0)}K</td>
                <td className="px-6 py-4"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth Projections */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Q1 2026 Growth</div>
          </div>
          <div className="text-2xl font-bold text-green-400 mb-1">+25%</div>
          <div className="text-xs text-gray-400">Projected increase</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <div className="text-xs text-gray-400">New Agents</div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">3</div>
          <div className="text-xs text-gray-400">Onboarded</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#00D4D4]" />
            <div className="text-xs text-gray-400">Pipeline Velocity</div>
          </div>
          <div className="text-2xl font-bold text-[#00D4D4] mb-1">+18%</div>
          <div className="text-xs text-gray-400">Increase</div>
        </div>
      </div>

      {/* Deal Details Modal */}
      {showDealDetails && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Deal Details {selectedDealAgent && `- ${selectedDealAgent}`}
              </h2>
              <button
                onClick={() => {
                  setShowDealDetails(false);
                  setSelectedDealAgent(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Property</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Agent</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Deal Value</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Fee (10%)</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Close Date</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredDeals.map((deal) => (
                    <tr key={deal.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-white">{deal.property}</td>
                      <td className="px-4 py-3 text-sm text-gray-300">{deal.agent}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-400">
                        ${deal.dealValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-[#00D4D4]">
                        ${deal.fee.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">
                        {new Date(deal.closeDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          deal.status === 'Closed' 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {deal.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-300">{deal.type}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-800/50 font-bold">
                  <tr>
                    <td className="px-4 py-3 text-sm text-white" colSpan={2}>
                      TOTAL ({filteredDeals.length} deals)
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-green-400">
                      ${filteredDeals.reduce((sum, d) => sum + d.dealValue, 0).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-[#00D4D4]">
                      ${filteredDeals.reduce((sum, d) => sum + d.fee, 0).toLocaleString()}
                    </td>
                    <td colSpan={3}></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setShowDealDetails(false);
                  setSelectedDealAgent(null);
                }}
                className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}