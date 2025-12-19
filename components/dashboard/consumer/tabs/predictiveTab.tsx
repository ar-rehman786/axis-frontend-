"use client"
import React, { useState } from 'react';
import { TrendingUp, Target, Activity, Brain, ArrowUp, Calendar, AlertCircle, Download, RefreshCw, X, ChevronDown, ChevronUp, BarChart3, Clock } from 'lucide-react';

interface BehaviorChange {
  id: number;
  change: string;
  value: string;
  impact: 'high' | 'medium' | 'low';
  icon: string;
  date: string;
  details: string;
}

interface SignalStrength {
  label: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface IntentHistoryPoint {
  month: string;
  value: number;
}

interface AIInsight {
  id: number;
  type: 'info' | 'warning' | 'success';
  title: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

export default function PredictiveTab() {
  const [showChurnDetails, setShowChurnDetails] = useState(false);
  const [showRefiDetails, setShowRefiDetails] = useState(false);
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);
  const [selectedBehavior, setSelectedBehavior] = useState<BehaviorChange | null>(null);
  const [expandedInsights, setExpandedInsights] = useState(true);
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m'>('90d');

  const [churnData, setChurnData] = useState({
    risk: 68,
    confidence: 87,
    trend: 'up' as const,
    trendChange: 12
  });

  const [refiData] = useState({
    window: '6-9 months',
    probability: 72,
    optimalTiming: 'Q2 2025',
    rateThreshold: 3.75,
    estimatedSavings: 285
  });

  const [intentData, setIntentData] = useState({
    score: 64,
    category: 'Active Explorer',
    lastChange: '15 days ago',
    changeAmount: 12,
    previousScore: 52
  });

  const [behaviorChanges, setBehaviorChanges] = useState<BehaviorChange[]>([
    {
      id: 1,
      change: 'Increased online search activity',
      value: '+15%',
      impact: 'high',
      icon: '🔍',
      date: '2024-11-28',
      details: 'Owner has been actively searching for refinancing options and property values. Search frequency increased from 2x/week to 8x/week.'
    },
    {
      id: 2,
      change: 'Credit inquiry detected',
      value: 'Auto loan',
      impact: 'medium',
      icon: '🏦',
      date: '2024-11-28',
      details: 'Hard credit inquiry for auto loan application. May indicate major purchase or financial planning activity.'
    },
    {
      id: 3,
      change: 'Spending pattern shift',
      value: 'Higher discretionary',
      impact: 'medium',
      icon: '💳',
      date: '2024-11-15',
      details: 'Credit card utilization increased from 28% to 32%. Discretionary spending up 18% compared to 3-month average.'
    }
  ]);

  const [signalStrengths, setSignalStrengths] = useState<SignalStrength[]>([
    { label: 'Online Activity', percentage: 85, trend: 'up', color: 'bg-green-400' },
    { label: 'Credit Checks', percentage: 60, trend: 'up', color: 'bg-yellow-400' },
    { label: 'Engagement Rate', percentage: 72, trend: 'up', color: 'bg-blue-400' }
  ]);

  const [intentHistory] = useState<IntentHistoryPoint[]>([
    { month: 'Jul', value: 42 },
    { month: 'Aug', value: 45 },
    { month: 'Sep', value: 48 },
    { month: 'Oct', value: 52 },
    { month: 'Nov', value: 55 },
    { month: 'Dec', value: 58 },
    { month: 'Jan', value: 61 },
    { month: 'Feb', value: 64 }
  ]);

  const [aiInsights] = useState<AIInsight[]>([
    {
      id: 1,
      type: 'info',
      title: 'High Refinance Intent Predicted',
      description: 'Owner shows strong signals for refinancing in Q2 2025. Credit inquiry and increased search activity align with typical pre-refi behavior patterns.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Churn Risk Increasing',
      description: 'Recent spending changes and auto loan inquiry suggest potential financial stress or major life change. Monitor closely for listing signals.',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/5',
      border: 'border-yellow-500/20'
    },
    {
      id: 3,
      type: 'success',
      title: 'Strong Financial Position',
      description: 'Excellent credit score (742) and significant equity ($180K) provide strong foundation. Owner is likely to respond well to consultative approach.',
      color: 'text-green-400',
      bg: 'bg-green-500/5',
      border: 'border-green-500/20'
    }
  ]);

  const handleRefreshPredictions = () => {
    alert('Predictions refreshed successfully!');
  };

  const handleExportPredictive = () => {
    const predictiveData = {
      churn: churnData,
      refi: refiData,
      intent: intentData,
      behaviors: behaviorChanges,
      insights: aiInsights
    };
    console.log('Exporting predictive data:', predictiveData);
    alert('Predictive data exported successfully!');
  };

  const handleViewBehaviorDetails = (behavior: BehaviorChange) => {
    setSelectedBehavior(behavior);
    setShowBehaviorModal(true);
  };

  const getImpactColor = (impact: string) => {
    if (impact === 'high') return 'text-red-400';
    if (impact === 'medium') return 'text-yellow-400';
    return 'text-blue-400';
  };

  const getImpactBadge = (impact: string) => {
    if (impact === 'high') return 'bg-red-500/10 text-red-400 border-red-500/30';
    if (impact === 'medium') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
  };

  return (
    <div className="space-y-6">
      {/* Section Title with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Predictive Modeling</h2>
          <p className="text-sm text-gray-400">AI-driven behavior and intent analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm"
          >
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="6m">Last 6 Months</option>
          </select>
          <button
            onClick={handleRefreshPredictions}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExportPredictive}
            className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Churn Risk Analysis */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
              <TrendingUp className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Churn Risk Analysis</h3>
              <p className="text-sm text-gray-400">Probability of owner leaving within 12 months</p>
            </div>
          </div>
          <button
            onClick={() => setShowChurnDetails(!showChurnDetails)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showChurnDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-yellow-500/5 border border-yellow-500/20 rounded-lg hover:border-yellow-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-3">Churn Risk Level</div>
            <div className="text-4xl font-bold text-yellow-400 mb-2">{churnData.risk}%</div>
            <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30 inline-block">
              🟡 Medium Risk
            </div>
            <div className="mt-4 bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all" 
                style={{ width: `${churnData.risk}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="text-xs text-gray-400 mb-3">Model Confidence</div>
            <div className="text-4xl font-bold text-white mb-2">{churnData.confidence}%</div>
            <div className="text-xs text-gray-500">High confidence score</div>
            <div className="mt-4 bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] h-3 rounded-full transition-all" 
                style={{ width: `${churnData.confidence}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="text-xs text-gray-400 mb-3">Risk Trend</div>
            <div className="flex items-center gap-2 mb-2">
              <ArrowUp className="w-8 h-8 text-red-400" />
              <div className="text-4xl font-bold text-white">↑</div>
            </div>
            <div className="text-xs text-red-400 font-medium">Increasing</div>
            <div className="text-xs text-gray-500 mt-1">+{churnData.trendChange}% from last month</div>
          </div>
        </div>

        {showChurnDetails && (
          <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
              <div className="text-xs text-gray-400 mb-2">Contributing Factors</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Recent credit inquiry</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Increased search activity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Spending pattern changes</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="text-xs text-gray-400 mb-2">Stabilizing Factors</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Strong credit history (742)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">30-month tenure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">High equity position ($180K)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Refi Probability Window */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Refi Probability Window</h3>
              <p className="text-sm text-gray-400">Optimal refinancing timing prediction</p>
            </div>
          </div>
          <button
            onClick={() => setShowRefiDetails(!showRefiDetails)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {showRefiDetails ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">Time Window</div>
            <div className="text-3xl font-bold text-white mb-1">{refiData.window}</div>
            <div className="text-xs text-gray-500">Optimal period</div>
          </div>

          <div className="p-6 bg-green-500/5 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">Refi Probability</div>
            <div className="text-3xl font-bold text-green-400 mb-1">{refiData.probability}%</div>
            <div className="text-xs text-green-500">High likelihood</div>
            <div className="mt-3 bg-gray-800 rounded-full h-2">
              <div 
                className="bg-green-400 h-2 rounded-full transition-all" 
                style={{ width: `${refiData.probability}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="text-xs text-gray-400 mb-2">Optimal Timing</div>
            <div className="text-3xl font-bold text-[#00D4D4] mb-1">{refiData.optimalTiming}</div>
            <div className="text-xs text-gray-500">Apr - Jun 2025</div>
          </div>
        </div>

        {showRefiDetails && (
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white mb-1">Rate Watch Trigger</div>
                    <div className="text-xs text-gray-400">Alert when rates drop below</div>
                  </div>
                  <div className="text-2xl font-bold text-blue-400">{refiData.rateThreshold}%</div>
                </div>
              </div>

              <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-white mb-1">Estimated Savings</div>
                    <div className="text-xs text-gray-400">Monthly payment reduction</div>
                  </div>
                  <div className="text-2xl font-bold text-purple-400">${refiData.estimatedSavings}/mo</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Intent Level */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30">
            <Target className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Intent Level</h3>
            <p className="text-sm text-gray-400">Current engagement and action signals</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-3">Current Intent Score</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl font-bold text-white">{intentData.score}</div>
              <div className="text-2xl text-gray-400">/100</div>
            </div>
            <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-xs font-bold border border-yellow-500/30 inline-block">
              🟡 Medium
            </div>
            <div className="mt-4 bg-gray-800 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full transition-all" 
                style={{ width: `${intentData.score}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="text-xs text-gray-400 mb-3">Intent Category</div>
            <div className="text-2xl font-bold text-white mb-2">{intentData.category}</div>
            <div className="text-xs text-gray-500">Researching options actively</div>
          </div>

          <div className="p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
            <div className="text-xs text-gray-400 mb-3">Last Intent Change</div>
            <div className="text-2xl font-bold text-white mb-2">{intentData.lastChange}</div>
            <div className="text-xs text-yellow-400">↑ Increased from {intentData.previousScore} to {intentData.score}</div>
          </div>
        </div>

        {/* Intent Indicators */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Signal Strength</div>
            <div className="space-y-2">
              {signalStrengths.map((signal, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">{signal.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <div 
                        className={`${signal.color} h-2 rounded-full transition-all`}
                        style={{ width: `${signal.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white w-8 text-right">{signal.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Intent Trend (8 Months)</div>
            <div className="flex items-end justify-between h-24 gap-1">
              {intentHistory.map((point, idx) => {
                const percentage = point.value;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full relative" style={{ height: `${percentage}%` }}>
                      <div className="absolute inset-0 bg-purple-500 rounded-t transition-all group-hover:bg-purple-400"></div>
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                          {point.value}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span>{intentHistory[0].month}</span>
              <span>{intentHistory[intentHistory.length - 1].month}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Behavior Change Score */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
            <Activity className="w-6 h-6 text-[#00D4D4]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Behavior Change Score</h3>
            <p className="text-sm text-gray-400">Recent behavioral pattern shifts</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-400">Overall Behavior Change</div>
            <div className="text-2xl font-bold text-white">58<span className="text-lg text-gray-400">/100</span></div>
          </div>
          <div className="bg-gray-800 rounded-full h-4">
            <div className="bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] h-4 rounded-full flex items-center justify-center transition-all" style={{ width: '58%' }}>
              <span className="text-xs font-bold text-black">Moderate Change</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-white">Recent Changes Detected:</div>
            <div className="text-xs text-gray-400">{behaviorChanges.length} changes in last 30 days</div>
          </div>
          
          {behaviorChanges.map((item) => (
            <div 
              key={item.id} 
              className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-[#00D4D4]/30 transition-all cursor-pointer"
              onClick={() => handleViewBehaviorDetails(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{item.change}</div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {new Date(item.date).toLocaleDateString()} • Click for details
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-sm font-bold text-[#00D4D4]">{item.value}</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactBadge(item.impact)}`}>
                    {item.impact.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI-Generated Insights</h3>
              <p className="text-sm text-gray-400">Machine learning predictions</p>
            </div>
          </div>
          <button
            onClick={() => setExpandedInsights(!expandedInsights)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {expandedInsights ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedInsights && (
          <div className="space-y-3">
            {aiInsights.map((insight) => (
              <div key={insight.id} className={`p-4 border rounded-lg ${insight.bg} ${insight.border} hover:border-[#00D4D4]/30 transition-all`}>
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${insight.color.replace('text-', 'bg-')}`}></div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium mb-1 ${insight.color}`}>{insight.title}</div>
                    <div className="text-xs text-gray-400">{insight.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Behavior Details Modal */}
      {showBehaviorModal && selectedBehavior && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Behavior Change Details</h2>
              <button onClick={() => setShowBehaviorModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#00D4D4]/10 rounded-xl flex items-center justify-center border border-[#00D4D4]/30">
                  <span className="text-4xl">{selectedBehavior.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{selectedBehavior.change}</h3>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-400">
                      Detected: {new Date(selectedBehavior.date).toLocaleDateString()}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getImpactBadge(selectedBehavior.impact)}`}>
                      {selectedBehavior.impact.toUpperCase()} IMPACT
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#00D4D4]">{selectedBehavior.value}</div>
              </div>

              <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="text-sm font-medium text-white mb-2">Detailed Analysis</div>
                <div className="text-sm text-gray-300">{selectedBehavior.details}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Impact Level</div>
                  <div className={`text-lg font-bold ${getImpactColor(selectedBehavior.impact)}`}>
                    {selectedBehavior.impact.charAt(0).toUpperCase() + selectedBehavior.impact.slice(1)}
                  </div>
                </div>
                <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Change Type</div>
                  <div className="text-lg font-bold text-white">Behavioral</div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={() => setShowBehaviorModal(false)}
                  className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}