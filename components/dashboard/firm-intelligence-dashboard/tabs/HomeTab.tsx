import React from 'react';
import { TrendingUp, Users, AlertCircle, DollarSign, Shield, TrendingDown, Activity, CheckCircle, TargetIcon } from 'lucide-react';

export default function HomeTab() {
  // Funnel Data
  const funnelStages = [
    { stage: 'Lead', count: 2340, width: 100 },
    { stage: 'Contact', count: 1856, width: 79 },
    { stage: 'Meeting', count: 987, width: 42 },
    { stage: 'Under Contract', count: 342, width: 15 },
    { stage: 'Closed', count: 87, width: 4 }
  ];

  // Agent Production
  const agents = [
    { name: 'John D.', production: 12, score: 92, tier: 'Platinum', color: 'text-purple-400' },
    { name: 'Sarah M.', production: 8, score: 78, tier: 'Gold', color: 'text-yellow-400' },
    { name: 'Mike R.', production: 5, score: 64, tier: 'Silver', color: 'text-gray-400' }
  ];

  // Owner Tier Breakdown
  const ownerTiers = [
    { tier: 'Platinum', count: 342, percent: 15, color: 'from-purple-500 to-purple-600' },
    { tier: 'Gold', count: 856, percent: 38, color: 'from-yellow-500 to-yellow-600' },
    { tier: 'Silver', count: 742, percent: 32, color: 'from-gray-500 to-gray-600' },
    { tier: 'Nurture', count: 340, percent: 15, color: 'from-blue-500 to-blue-600' }
  ];

  // ZIP Momentum Data
  const zipMomentum = [
    { zip: '27609', momentum: 'High', trend: '↑', pressure: 'Hot', emoji: '🔥', status: 'Buy Now', color: 'text-red-400' },
    { zip: '27613', momentum: 'Stable', trend: '→', pressure: 'Warm', emoji: '📊', status: 'Monitor', color: 'text-yellow-400' },
    { zip: '27601', momentum: 'Cooling', trend: '↓', pressure: 'Cold', emoji: '❄️', status: 'Wait', color: 'text-blue-400' }
  ];

  // Interaction Feed
  const interactions = [
    { date: 'Nov 28', agent: 'John D.', owner: 'Owner X123', action: 'Follow-up: Equity alert triggered' },
    { date: 'Nov 27', agent: 'Sarah M.', owner: 'Owner Y456', action: 'Behavior shift detected' },
    { date: 'Nov 26', agent: 'Mike R.', owner: 'Owner Z789', action: 'Refi window opened' }
  ];

  // Alerts
  const alerts = [
    { type: 'Equity Alerts', count: 42, color: 'text-red-400', emoji: '🔴' },
    { type: 'Behavior Alerts', count: 18, color: 'text-yellow-400', emoji: '🟡' },
    { type: 'Refi Alerts', count: 87, color: 'text-green-400', emoji: '🟢' },
    { type: 'Churn Alerts', count: 124, color: 'text-blue-400', emoji: '🔵' }
  ];

  return (
    <div className="space-y-8">
      {/* A. TEAM PERFORMANCE OVERVIEW */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-[#00D4D4]" />
          Team Performance Overview
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Funnel Visualization */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Pipeline → Close Funnel</h3>
            <div className="space-y-4">
              {funnelStages.map((stage, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{stage.stage}</span>
                    <span className="text-sm font-bold text-[#00D4D4]">{stage.count.toLocaleString()}</span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-8 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] h-8 rounded-full flex items-center justify-end px-3 transition-all"
                      style={{ width: `${stage.width}%` }}
                    >
                      <span className="text-xs font-bold text-black">{stage.width}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Production Score */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Agent Production Score</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Agent</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Production</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Score</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {agents.map((agent, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{agent.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{agent.production} deals</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-700 rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-[#00D4D4] h-2 rounded-full"
                            style={{ width: `${agent.score}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-white">{agent.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-bold ${agent.color}`}>{agent.tier}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Owner Tier Breakdown */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Verified Owner Tier Breakdown</h3>
          <div className="grid grid-cols-4 gap-4">
            {ownerTiers.map((tier, idx) => (
              <div key={idx} className="text-center">
                <div className={`w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center relative`}>
                  <div className="absolute inset-2 bg-gray-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{tier.percent}%</span>
                  </div>
                </div>
                <div className="text-sm font-bold text-white mb-1">{tier.tier}</div>
                <div className="text-xs text-gray-400">{tier.count.toLocaleString()} owners</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B. MARKET OPPORTUNITY MAP */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <TargetIcon className="w-6 h-6 text-[#00D4D4]" />
          Market Opportunity Map
        </h2>

        <div className="grid gap-6">
          {/* ZIP Momentum Heatmap */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">ZIP Momentum Heatmap</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">ZIP</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Momentum</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Pressure</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {zipMomentum.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{item.zip}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${item.color}`}>
                        {item.trend} {item.momentum}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {item.emoji} {item.pressure}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === 'Buy Now' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                        item.status === 'Monitor' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Opportunity Clusters Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3">Equity-Rich Owner Clusters</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">Cluster A (27609): <span className="font-bold text-white">342 owners</span>, $285k avg</div>
                <div className="text-gray-300">Cluster B (27613): <span className="font-bold text-white">198 owners</span>, $412k avg</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3">Refi-Ready Owner Lists</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">Prime borrowers: <span className="font-bold text-white">487</span> (18-36mo window)</div>
                <div className="text-gray-300">Near-prime: <span className="font-bold text-white">312</span> (6-9mo window)</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
              <h4 className="text-sm font-bold text-white mb-3">High-Churn Households</h4>
              <div className="space-y-2 text-sm">
                <div className="text-gray-300">High risk (85%+): <span className="font-bold text-red-400">87 households</span></div>
                <div className="text-gray-300">Medium risk (60-85%): <span className="font-bold text-yellow-400">234 households</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* C. AGENT → OWNER INTERACTION FEED */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Activity className="w-6 h-6 text-[#00D4D4]" />
          Agent → Owner Interaction Feed
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Timeline */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Recent Events</h3>
            <div className="space-y-4">
              {interactions.map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#00D4D4] pl-4 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{item.date}</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-1">
                    <span className="text-[#00D4D4]">{item.agent}</span> → {item.owner}
                  </div>
                  <div className="text-sm text-gray-300">{item.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Summary */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Alert Summary</h3>
            <div className="space-y-4">
              {alerts.map((alert, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{alert.emoji}</span>
                    <span className="text-sm font-medium text-white">{alert.type}</span>
                  </div>
                  <span className={`text-xl font-bold ${alert.color}`}>{alert.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* D. PERFORMANCE MONETIZATION */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-[#00D4D4]" />
          Performance Monetization (10% Model)
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Revenue Dashboard */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-bold text-white">Revenue Dashboard</h3>
            </div>
            <table className="w-full">
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">Closings Tied to Intel</td>
                  <td className="px-6 py-4 text-sm font-bold text-white text-right">87 deals</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">Total Deal Value</td>
                  <td className="px-6 py-4 text-sm font-bold text-white text-right">$42.5M</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition-colors bg-[#00D4D4]/5">
                  <td className="px-6 py-4 text-sm font-bold text-white">Performance Fee (10%)</td>
                  <td className="px-6 py-4 text-xl font-bold text-[#00D4D4] text-right">$4.25M</td>
                </tr>
                <tr className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-400">Forecasted (Next Q)</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-400 text-right">$5.8M</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Team Growth Projections */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Team Growth Projections</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-white">Q1 2026 Growth</span>
                </div>
                <div className="text-2xl font-bold text-green-400">+25%</div>
                <div className="text-xs text-gray-400 mt-1">projected increase</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">New Agents</div>
                  <div className="text-xl font-bold text-white">3</div>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-1">Pipeline Velocity</div>
                  <div className="text-xl font-bold text-[#00D4D4]">+18%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* E. COMPLIANCE SNAPSHOT */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#00D4D4]" />
          Compliance Snapshot
        </h2>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Agent Actions */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Agent Actions (Non-Sensitive)</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total contacts made</span>
                <span className="text-lg font-bold text-white">2,340</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Allowed actions</span>
                <span className="text-lg font-bold text-green-400">2,298 (98%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Restricted actions blocked</span>
                <span className="text-lg font-bold text-red-400">42 (2%)</span>
              </div>
            </div>
          </div>

          {/* Cooldown Windows */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6">Cooldown Windows</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Active cooldowns</span>
                <span className="text-lg font-bold text-white">87 owners</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Expiring this week</span>
                <span className="text-lg font-bold text-yellow-400">12 owners</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Pending verification</span>
                <span className="text-lg font-bold text-blue-400">5 owners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}