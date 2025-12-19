import React, { useState } from 'react';
import { Database, TrendingUp, Users, DollarSign, Activity, Download, Mail, FileText, BarChart3 } from 'lucide-react';

export default function BrokerFeedsTab() {
  const [customFilters, setCustomFilters] = useState({
    ltvMax: 70,
    equityMin: 250000,
    loanAgeMin: 18,
    loanAgeMax: 36,
    ownerOccupied: true,
    zipCodes: '27609, 27613',
    apsScore: 70
  });

  const [matchedRecords, setMatchedRecords] = useState(342);
  const [estimatedRevenue, setEstimatedRevenue] = useState(855);

  // KPI Data
  const kpis = [
    { label: 'Total Records', value: '1,247', icon: Database, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Core Equity Feed', value: '487', percent: '38%', icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'Predictive Churn', value: '312', percent: '28%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Trans. Momentum', value: '256', percent: '24%', icon: Activity, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Market Activity', value: '192', percent: '10%', icon: BarChart3, color: 'text-teal-400', bg: 'bg-teal-500/10' }
  ];

  // Feed Performance Data
  const feedPerformance = [
    { type: 'Core Equity', records: 487, quality: 95, cpl: 2.50, revenue: 1217 },
    { type: 'Predictive Churn', records: 312, quality: 92, cpl: 3.00, revenue: 936 },
    { type: 'Transactional Momentum', records: 256, quality: 88, cpl: 1.80, revenue: 461 },
    { type: 'Market Activity', records: 192, quality: 85, cpl: 1.50, revenue: 288 }
  ];

  const totals = {
    records: feedPerformance.reduce((sum, feed) => sum + feed.records, 0),
    quality: Math.round(feedPerformance.reduce((sum, feed) => sum + feed.quality, 0) / feedPerformance.length),
    cpl: (feedPerformance.reduce((sum, feed) => sum + feed.cpl, 0) / feedPerformance.length).toFixed(2),
    revenue: feedPerformance.reduce((sum, feed) => sum + feed.revenue, 0)
  };

  // Chart Data
  const qualityTrends = [
    { month: 'Jan', value: 88 },
    { month: 'Feb', value: 90 },
    { month: 'Mar', value: 89 },
    { month: 'Apr', value: 92 },
    { month: 'May', value: 91 },
    { month: 'Jun', value: 93 }
  ];

  const revenueData = [
    { segment: 'Core Equity', value: 1217 },
    { segment: 'Pred. Churn', value: 936 },
    { segment: 'Trans. Mom.', value: 461 },
    { segment: 'Market Act.', value: 288 }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${kpi.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{kpi.value}</div>
              <div className="text-sm text-gray-400">{kpi.label}</div>
              {kpi.percent && (
                <div className="text-xs text-gray-500 mt-1">{kpi.percent} of total</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Feed Performance Table */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">Feed Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Feed Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Records</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Quality Score</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">CPL</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {feedPerformance.map((feed, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-white">{feed.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{feed.records.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-[100px]">
                        <div 
                          className="bg-[#00D4D4] h-2 rounded-full transition-all"
                          style={{ width: `${feed.quality}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-white">{feed.quality}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">${feed.cpl.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-400">${feed.revenue.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-gray-800/50 font-bold">
                <td className="px-6 py-4 text-sm text-white">TOTAL</td>
                <td className="px-6 py-4 text-sm text-white">{totals.records.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-white">{totals.quality}% avg</td>
                <td className="px-6 py-4 text-sm text-white">${totals.cpl} avg</td>
                <td className="px-6 py-4 text-sm font-bold text-[#00D4D4]">${totals.revenue.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        {/* Data Quality Trends */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Data Quality Trends</h3>
          <div className="flex items-end justify-between h-64 gap-2">
            {qualityTrends.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-800 rounded-t relative" style={{ height: `${item.value}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00D4D4] to-[#00A8A8] rounded-t"></div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                    {item.value}%
                  </div>
                </div>
                <div className="text-xs text-gray-400">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Segment Revenue */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Segment Revenue</h3>
          <div className="space-y-4">
            {revenueData.map((item, idx) => {
              const maxValue = Math.max(...revenueData.map(d => d.value));
              const percentage = (item.value / maxValue) * 100;
              
              return (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{item.segment}</span>
                    <span className="text-sm font-bold text-white">${item.value.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] h-3 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Feed Customization Panel */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Create Custom Feed</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">LTV Range</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Less than</span>
                <input
                  type="number"
                  value={customFilters.ltvMax}
                  onChange={(e) => setCustomFilters({...customFilters, ltvMax: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-24"
                />
                <span className="text-sm text-gray-400">%</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Equity Minimum</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">$</span>
                <input
                  type="number"
                  value={customFilters.equityMin}
                  onChange={(e) => setCustomFilters({...customFilters, equityMin: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Loan Age (months)</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={customFilters.loanAgeMin}
                  onChange={(e) => setCustomFilters({...customFilters, loanAgeMin: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-24"
                />
                <span className="text-sm text-gray-400">to</span>
                <input
                  type="number"
                  value={customFilters.loanAgeMax}
                  onChange={(e) => setCustomFilters({...customFilters, loanAgeMax: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-24"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customFilters.ownerOccupied}
                  onChange={(e) => setCustomFilters({...customFilters, ownerOccupied: e.target.checked})}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
                />
                <span className="text-sm font-medium text-white">Owner-Occupied</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">ZIP Codes</label>
              <input
                type="text"
                value={customFilters.zipCodes}
                onChange={(e) => setCustomFilters({...customFilters, zipCodes: e.target.value})}
                className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-full"
                placeholder="27609, 27613"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">APS Score</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Greater than</span>
                <input
                  type="number"
                  value={customFilters.apsScore}
                  onChange={(e) => setCustomFilters({...customFilters, apsScore: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-24"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#00D4D4]/10 border border-[#00D4D4]/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white">Preview:</span>
            <span className="text-xl font-bold text-[#00D4D4]">{matchedRecords} records match</span>
          </div>
          <div className="text-sm text-gray-400">
            Est. Revenue: <span className="font-bold text-white">${estimatedRevenue.toLocaleString()}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button className="px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold">
            Generate Feed
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Price Quote
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-4 gap-4">
        <button className="px-6 py-3 bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] text-black rounded-lg hover:opacity-90 transition-opacity font-bold flex items-center justify-center gap-2">
          <Database className="w-5 h-5" />
          Generate All Feeds
        </button>
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" />
          Export Master CSV
        </button>
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          Deliver to Client
        </button>
        <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700 flex items-center justify-center gap-2">
          <DollarSign className="w-5 h-5" />
          Revenue Report
        </button>
      </div>

      {/* Multi-Market Comparison */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-6">Multi-Market Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Market</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Records</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Quality</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Revenue</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-400">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {[
                { market: 'Crypto', records: 423, quality: 89, revenue: 1269, growth: 12.5 },
                { market: 'Stocks', records: 378, quality: 94, revenue: 1134, growth: 8.3 },
                { market: 'Housing', records: 446, quality: 91, revenue: 1338, growth: 15.7 }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium text-white">{item.market}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{item.records}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{item.quality}%</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-400">${item.revenue}</td>
                  <td className="px-4 py-3 text-sm text-green-400">+{item.growth}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}