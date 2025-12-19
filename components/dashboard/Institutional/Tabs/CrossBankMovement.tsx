"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, TrendingUp, TrendingDown, Building2, DollarSign, Activity, Filter } from 'lucide-react';

export default function CrossBankMovement() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedFlowType, setSelectedFlowType] = useState('all');
  const [animatedValues, setAnimatedValues] = useState({});

  // Flow Summary Metrics
  const flowMetrics = {
    '24h': {
      totalVolume: 45600000000,
      inflowVolume: 23400000000,
      outflowVolume: 22200000000,
      netFlow: 1200000000,
      transactions: 8934,
      avgTransaction: 5100000
    },
    '7d': {
      totalVolume: 289000000000,
      inflowVolume: 148000000000,
      outflowVolume: 141000000000,
      netFlow: 7000000000,
      transactions: 56789,
      avgTransaction: 5090000
    },
    '30d': {
      totalVolume: 1240000000000,
      inflowVolume: 635000000000,
      outflowVolume: 605000000000,
      netFlow: 30000000000,
      transactions: 234567,
      avgTransaction: 5290000
    }
  };

//   const currentMetrics = flowMetrics[selectedTimeframe];
const currentMetrics: Record<string, number> =
  (flowMetrics as Record<string, Record<string, number>>)[selectedTimeframe];


  // Major Fund Movements
  const movements = [
    {
      id: 1,
      fromBank: 'JPMorgan Chase',
      toBank: 'Goldman Sachs',
      amount: 2400000000,
      type: 'Derivative Settlement',
      timestamp: '15 mins ago',
      status: 'completed',
      direction: 'outflow',
      risk: 'low'
    },
    {
      id: 2,
      fromBank: 'Bank of America',
      toBank: 'Citigroup',
      amount: 3800000000,
      type: 'Repo Transaction',
      timestamp: '32 mins ago',
      status: 'completed',
      direction: 'inflow',
      risk: 'medium'
    },
    {
      id: 3,
      fromBank: 'Deutsche Bank',
      toBank: 'JPMorgan Chase',
      amount: 5200000000,
      type: 'Cross-Border Transfer',
      timestamp: '1 hour ago',
      status: 'pending',
      direction: 'inflow',
      risk: 'high'
    },
    {
      id: 4,
      fromBank: 'HSBC',
      toBank: 'Standard Chartered',
      amount: 1900000000,
      type: 'Trade Finance',
      timestamp: '2 hours ago',
      status: 'completed',
      direction: 'outflow',
      risk: 'low'
    },
    {
      id: 5,
      fromBank: 'Wells Fargo',
      toBank: 'Bank of America',
      amount: 4100000000,
      type: 'Interbank Loan',
      timestamp: '3 hours ago',
      status: 'processing',
      direction: 'outflow',
      risk: 'medium'
    }
  ];

  // Bank Flow Summary
  const bankFlows = [
    {
      bank: 'JPMorgan Chase',
      inflow: 12400000000,
      outflow: 9800000000,
      netFlow: 2600000000,
      transactions: 1247,
      topPartners: ['Goldman Sachs', 'Citigroup', 'Deutsche Bank']
    },
    {
      bank: 'Goldman Sachs',
      inflow: 8900000000,
      outflow: 11200000000,
      netFlow: -2300000000,
      transactions: 892,
      topPartners: ['JPMorgan Chase', 'Morgan Stanley', 'Bank of America']
    },
    {
      bank: 'Bank of America',
      inflow: 10600000000,
      outflow: 8900000000,
      netFlow: 1700000000,
      transactions: 1034,
      topPartners: ['Wells Fargo', 'Citigroup', 'US Bank']
    },
    {
      bank: 'Citigroup',
      inflow: 9200000000,
      outflow: 10800000000,
      netFlow: -1600000000,
      transactions: 945,
      topPartners: ['JPMorgan Chase', 'Bank of America', 'HSBC']
    }
  ];

  // Flow Patterns
  const flowPatterns = [
    { time: '00:00', volume: 3200000000 },
    { time: '04:00', volume: 1800000000 },
    { time: '08:00', volume: 5400000000 },
    { time: '12:00', volume: 7800000000 },
    { time: '16:00', volume: 9200000000 },
    { time: '20:00', volume: 6400000000 }
  ];

  // Animate values
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setAnimatedValues(prev => {
//         const newValues = {};
//         Object.keys(currentMetrics).forEach(key => {
//           const target = currentMetrics[key];
//           const current = prev[key] || 0;
//           newValues[key] = current < target ? Math.min(current + Math.ceil(target / 20), target) : target;
//         });
//         return newValues;
//       });
//     }, 50);
//     return () => clearInterval(timer);
//   }, [selectedTimeframe]);

useEffect(() => {
  const timer: NodeJS.Timeout = setInterval(() => {
    setAnimatedValues(
      (
        prev: Record<string, number>
      ): Record<string, number> => {
        const newValues: Record<string, number> = {};

        Object.keys(currentMetrics as Record<string, number>).forEach(
          (key: string) => {
            const target: number = (currentMetrics as Record<string, number>)[key];
            const current: number = prev[key] || 0;

            newValues[key] =
              current < target
                ? Math.min(current + Math.ceil(target / 20), target)
                : target;
          }
        );

        return newValues;
      }
    );
  }, 50);

  return () => clearInterval(timer);
}, [selectedTimeframe]);


//   const getStatusBadge = (status) => {
//     const badges = {
//       completed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
//       processing: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
//       pending: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
//       failed: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
//     };
//     return badges[status];
//   };

const getStatusBadge = (
  status: "completed" | "processing" | "pending" | "failed"
): { bg: string; text: string; border: string } => {
  const badges: Record<
    "completed" | "processing" | "pending" | "failed",
    { bg: string; text: string; border: string }
  > = {
    completed: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
    processing: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
    pending: { bg: "bg-orange-500/10", text: "text-orange-400", border: "border-orange-500/30" },
    failed: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" }
  };

  return badges[status];
};

//   const getRiskBadge = (risk) => {
//     const badges = {
//       low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
//       medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
//       high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
//     };
//     return badges[risk];
//   };

const getRiskBadge = (
  risk: "low" | "medium" | "high"
): { bg: string; text: string; border: string } => {
  const badges: Record<
    "low" | "medium" | "high",
    { bg: string; text: string; border: string }
  > = {
    low: { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/30" },
    medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
    high: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" }
  };

  return badges[risk];
};

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🔄 Cross-Bank Movement Tracker</h1>
          <p className="text-gray-400">Real-time monitoring of interbank fund flows and transactions</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Timeframe:</span>
              <div className="flex gap-2">
                {[
                  { id: '24h', label: '24 Hours' },
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' }
                ].map(tf => (
                  <button
                    key={tf.id}
                    onClick={() => setSelectedTimeframe(tf.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedTimeframe === tf.id
                        ? 'bg-[#19F6FF] text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Flow Type:</span>
              <select
                value={selectedFlowType}
                onChange={(e) => setSelectedFlowType(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Flows</option>
                <option value="inflow">Inflows Only</option>
                <option value="outflow">Outflows Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Flow Summary Metrics */}
        <div className="grid grid-cols-6 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-gray-400">Total Volume</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {/* ${((animatedValues.totalVolume || 0) / 1000000000).toFixed(1)} */}
              ${(((animatedValues as Record<string, number>).totalVolume || 0) / 1_000_000_000).toFixed(1)}B

            </div>
            <div className="text-xs text-gray-500">Bilateral flows</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-xs text-gray-400">Inflows</div>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {/* ${((animatedValues.inflowVolume || 0) / 1000000000).toFixed(1)}B */}
              ${(((animatedValues as Record<string, number>).inflowVolume || 0) / 1_000_000_000).toFixed(1)}B

            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-xs text-gray-400">Outflows</div>
            </div>
            <div className="text-2xl font-bold text-red-400">
              {/* ${((animatedValues.outflowVolume || 0) / 1000000000).toFixed(1)}B */}
              ${(((animatedValues as Record<string, number>).outflowVolume || 0) / 1_000_000_000).toFixed(1)}B

            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs text-gray-400">Net Flow</div>
            </div>
            <div className="text-2xl font-bold text-purple-400">
              {/* ${((animatedValues.netFlow || 0) / 1000000000).toFixed(1)}B */}
              ${(((animatedValues as Record<string, number>).netFlow || 0) / 1_000_000_000).toFixed(1)}B

            </div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-xs text-gray-400">Transactions</div>
            </div>
            <div className="text-2xl font-bold text-yellow-400">
              {/* {(animatedValues.transactions || 0).toLocaleString()} */}
              {((animatedValues as Record<string, number>).transactions || 0).toLocaleString()}

            </div>
          </div>
        </div>

        {/* Flow Pattern Chart */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">📊 Flow Pattern (Last 24h)</h3>
          
          <div className="flex items-end justify-between h-64 gap-4">
            {flowPatterns.map((pattern, idx) => {
              const height = (pattern.volume / 10000000000) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex-1 w-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-[#19F6FF] to-[#00BCC9] rounded-t-lg transition-all duration-1000 hover:opacity-80 cursor-pointer"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-[#19F6FF]">{pattern.time}</div>
                    <div className="text-xs text-gray-500">${(pattern.volume / 1000000000).toFixed(1)}B</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Movements */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">💸 Recent Major Movements</h3>
            <span className="text-sm text-gray-400">{movements.length} transactions</span>
          </div>

          <div className="space-y-4">
            {movements.map((movement) => {
            //   const statusBadge = getStatusBadge(movement.status);
            //   const riskBadge = getRiskBadge(movement.risk);

            const statusBadge: { bg: string; text: string; border: string } =
  getStatusBadge(movement.status as "completed" | "processing" | "pending" | "failed");

const riskBadge: { bg: string; text: string; border: string } =
  getRiskBadge(movement.risk as "low" | "medium" | "high");

              
              return (
                <div key={movement.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-[#19F6FF]" />
                        <span className="text-sm font-bold text-white">{movement.fromBank}</span>
                      </div>
                      <ArrowRightLeft className="w-5 h-5 text-gray-500" />
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-purple-400" />
                        <span className="text-sm font-bold text-white">{movement.toBank}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} uppercase`}>
                        {movement.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border} uppercase`}>
                        {movement.risk}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Amount</div>
                      <div className="text-base font-bold text-white">${(movement.amount / 1000000000).toFixed(2)}B</div>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Type</div>
                      <div className="text-sm font-medium text-white">{movement.type}</div>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Direction</div>
                      <div className={`text-sm font-bold ${movement.direction === 'inflow' ? 'text-green-400' : 'text-red-400'}`}>
                        {movement.direction === 'inflow' ? '↓ Inflow' : '↑ Outflow'}
                      </div>
                    </div>
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Time</div>
                      <div className="text-sm text-white">{movement.timestamp}</div>
                    </div>
                    <div className="flex items-center justify-end">
                      <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bank Flow Summary */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">🏦 Bank Flow Summary</h3>
          
          <div className="space-y-4">
            {bankFlows.map((bank, idx) => (
              <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-6 h-6 text-[#19F6FF]" />
                    <h4 className="text-base font-bold text-white">{bank.bank}</h4>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Net Flow</div>
                    <div className={`text-xl font-bold ${bank.netFlow > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {bank.netFlow > 0 ? '+' : ''}${(bank.netFlow / 1000000000).toFixed(1)}B
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Inflows</div>
                    <div className="text-sm font-bold text-green-400">${(bank.inflow / 1000000000).toFixed(1)}B</div>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Outflows</div>
                    <div className="text-sm font-bold text-red-400">${(bank.outflow / 1000000000).toFixed(1)}B</div>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Transactions</div>
                    <div className="text-sm font-bold text-white">{bank.transactions.toLocaleString()}</div>
                  </div>
                  <div className="p-3 bg-gray-900/50 rounded-lg col-span-2">
                    <div className="text-xs text-gray-400 mb-1">Top Partners</div>
                    <div className="flex flex-wrap gap-1">
                      {bank.topPartners.map((partner, pidx) => (
                        <span key={pidx} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-white">
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export Flow Report
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Set Thresholds
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Flow Analysis
          </button>
        </div>
      </div>
    </div>
  );
}