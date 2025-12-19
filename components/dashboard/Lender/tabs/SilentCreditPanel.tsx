import React, { useState, useEffect, JSX } from 'react';
import { Shield, AlertTriangle, TrendingDown, Activity, Eye, Bell } from 'lucide-react';

interface CreditEvent {
  id: string;
  currentScore: number;
}

type Severity = "critical" | "high" | "medium" | "low";


// Animated scores state
export default function SilentCreditPanel() {
    const [animatedScores, setAnimatedScores] = useState<Record<string, number>>({});
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedAction, setSelectedAction] = useState('all');
//   const [animatedScores, setAnimatedScores] = useState({});

  const creditSummary = {
    totalMonitored: 5847,
    newInquiries: 342,
    scoreDrops: 156,
    utilIncrease: 234,
    criticalAlerts: 89
  };

  const creditEvents = [
    {
      id: 1,
      customer: 'Thompson Family',
      accountId: 'ACC-8934',
      event: 'Hard Inquiry',
      date: '2 hours ago',
      details: 'Auto loan inquiry - $45k',
      currentScore: 720,
      previousScore: 728,
      change: -8,
      severity: 'medium',
      lender: 'Chase Auto Finance'
    },
    {
      id: 2,
      customer: 'Rodriguez Household',
      accountId: 'ACC-7823',
      event: 'Utilization Spike',
      date: '5 hours ago',
      details: 'Credit card utilization jumped to 78%',
      currentScore: 695,
      previousScore: 715,
      change: -20,
      severity: 'high',
      lender: 'N/A'
    },
    {
      id: 3,
      customer: 'Chen Family',
      accountId: 'ACC-6712',
      event: 'New Account',
      date: '1 day ago',
      details: 'New credit card opened',
      currentScore: 742,
      previousScore: 755,
      change: -13,
      severity: 'medium',
      lender: 'American Express'
    },
    {
      id: 4,
      customer: 'Anderson Household',
      accountId: 'ACC-5601',
      event: 'Multiple Inquiries',
      date: '1 day ago',
      details: '3 hard inquiries in 7 days',
      currentScore: 668,
      previousScore: 698,
      change: -30,
      severity: 'critical',
      lender: 'Multiple'
    },
    {
      id: 5,
      customer: 'Williams Family',
      accountId: 'ACC-4590',
      event: 'Late Payment',
      date: '2 days ago',
      details: '30+ days late on credit card',
      currentScore: 645,
      previousScore: 685,
      change: -40,
      severity: 'critical',
      lender: 'Capital One'
    }
  ];

  const monitoredCustomers = [
    {
      id: 1,
      name: 'Martinez Family',
      score: 745,
      trend: 'stable',
      inquiries: 0,
      utilization: 32,
      newAccounts: 0,
      alerts: 0
    },
    {
      id: 2,
      name: 'Garcia Household',
      score: 712,
      trend: 'declining',
      inquiries: 2,
      utilization: 58,
      newAccounts: 1,
      alerts: 2
    },
    {
      id: 3,
      name: 'Lee Family',
      score: 689,
      trend: 'declining',
      inquiries: 1,
      utilization: 72,
      newAccounts: 0,
      alerts: 3
    },
    {
      id: 4,
      name: 'Patel Household',
      score: 768,
      trend: 'improving',
      inquiries: 0,
      utilization: 25,
      newAccounts: 0,
      alerts: 0
    }
  ];

  // Animate scores
useEffect(() => {
  const timer = setTimeout(() => {
    const scores: Record<string, number> = {};
    creditEvents.forEach((event) => {
      scores[event.id] = event.currentScore;
    });
    setAnimatedScores(scores);
  }, 100);
  return () => clearTimeout(timer);
}, []);

  const getSeverityBadge = (severity: Severity): { bg: string; text: string; border: string; icon: string } => {
    const badges: Record<Severity, { bg: string; text: string; border: string; icon: string }> = {
      critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: '🔴' },
      high: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', icon: '🔵' },
      medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '🟡' },
      low: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30', icon: '🟦' },
    };

    return badges[severity];
  };

  type Trend = "improving" | "declining" | "stable" | undefined;

  const getTrendIcon = (trend: Trend): JSX.Element => {
    if (trend === "improving") {
      return <TrendingDown className="w-4 h-4 text-red-400 rotate-180" />;
    }

    if (trend === "declining") {
      return <TrendingDown className="w-4 h-4 text-red-400" />;
    }

    return <Activity className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Silent Credit Monitor</h1>
          <p className="text-gray-400">Track credit events and risk signals across your portfolio</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Risk Level:</span>
              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'critical', label: 'Critical' },
                  { id: 'high', label: 'High' },
                  { id: 'medium', label: 'Medium' }
                ].map(level => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedRiskLevel(level.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedRiskLevel === level.id
                        ? 'bg-[#19F6FF] text-black'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Event Type:</span>
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Events</option>
                <option value="inquiry">Hard Inquiries</option>
                <option value="utilization">Utilization Changes</option>
                <option value="account">New Accounts</option>
                <option value="late">Late Payments</option>
              </select>
            </div>
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-gray-400">Total Monitored</div>
            </div>
            <div className="text-2xl font-bold text-white">{creditSummary.totalMonitored.toLocaleString()}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="text-xs text-gray-400">New Inquiries</div>
            </div>
            <div className="text-2xl font-bold text-yellow-400">{creditSummary.newInquiries}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-gray-400">Score Drops</div>
            </div>
            <div className="text-2xl font-bold text-blue-400">{creditSummary.scoreDrops}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs text-gray-400">Util. Increases</div>
            </div>
            <div className="text-2xl font-bold text-purple-400">{creditSummary.utilIncrease}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-xs text-gray-400">Critical Alerts</div>
            </div>
            <div className="text-2xl font-bold text-red-400">{creditSummary.criticalAlerts}</div>
          </div>
        </div>

        {/* Recent Credit Events */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">🚨 Recent Credit Events</h3>
            <span className="text-sm text-gray-400">{creditEvents.length} events</span>
          </div>

          <div className="space-y-4">
            {creditEvents.map((event) => {
              const badge = getSeverityBadge(event.severity as "critical" | "high" | "medium" | "low");
              const animatedScore = animatedScores[event.id] || event.previousScore;
              
              return (
                <div key={event.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700">
                        <div className="text-xs text-gray-400 mb-1">Credit Score</div>
                        <div className="flex items-center gap-2">
                          <div className="text-2xl font-bold text-white transition-all duration-1000">
                            {Math.round(animatedScore)}
                          </div>
                          <div className={`flex items-center gap-1 text-xs font-bold ${
                            event.change < 0 ? 'text-blue-400' : 'text-red-400'
                          }`}>
                            <TrendingDown className="w-3 h-3" />
                            {event.change}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold text-white">{event.customer}</h4>
                          <span className="text-xs text-gray-500">{event.accountId}</span>
                        </div>
                        <p className="text-sm text-gray-400">{event.event} · {event.date}</p>
                      </div>
                    </div>

                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                      {badge.icon} {event.severity.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-900/50 rounded-lg col-span-2">
                      <div className="text-xs text-gray-400 mb-1">Event Details</div>
                      <div className="text-sm font-medium text-white">{event.details}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Source</div>
                      <div className="text-sm font-medium text-white">{event.lender}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                      Review Account
                    </button>
                    <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm">
                      Set Alert
                    </button>
                    <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm">
                      Contact Customer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monitored Customers */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">👥 Monitored Customer Portfolio</h3>
          
          <div className="grid grid-cols-2 gap-4">
            {monitoredCustomers.map((customer) => (
              <div key={customer.id} className="p-5 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-[#19F6FF] transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-400">{customer.score}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{customer.name}</h4>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(customer.trend as any)}
                        <span className="text-xs text-gray-400 capitalize">{customer.trend}</span>
                      </div>
                    </div>
                  </div>
                  
                  {customer.alerts > 0 && (
                    <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {customer.alerts}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-gray-900/50 rounded">
                    <div className="text-xs text-gray-400">Inquiries</div>
                    <div className="text-sm font-bold text-white">{customer.inquiries}</div>
                  </div>
                  <div className="p-2 bg-gray-900/50 rounded">
                    <div className="text-xs text-gray-400">Util.</div>
                    <div className={`text-sm font-bold ${customer.utilization > 60 ? 'text-red-400' : 'text-white'}`}>
                      {customer.utilization}%
                    </div>
                  </div>
                  <div className="p-2 bg-gray-900/50 rounded">
                    <div className="text-xs text-gray-400">New Acct</div>
                    <div className="text-sm font-bold text-white">{customer.newAccounts}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export Credit Report
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Configure Alerts
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Download Analysis
          </button>
        </div>
      </div>
    </div>
  );
}