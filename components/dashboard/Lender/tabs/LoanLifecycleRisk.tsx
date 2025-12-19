import React, { useState, useEffect, JSX } from 'react';
import { AlertTriangle, TrendingDown, Shield, Target, Activity, Clock } from 'lucide-react';



export default function LoanLifecycleRisk() {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');
  const [animatedCounts, setAnimatedCounts] = useState({});

  const riskSummary = {
    critical: 347,
    high: 892,
    medium: 1567,
    low: 3421,
    totalLoans: 6227
  };

  const stageDistribution = [
    { stage: 'Origination', critical: 23, high: 89, medium: 234, low: 567, total: 913 },
    { stage: 'Early Payment', critical: 45, high: 156, medium: 378, low: 891, total: 1470 },
    { stage: 'Mid-Term', critical: 178, high: 423, medium: 689, low: 1234, total: 2524 },
    { stage: 'Maturity', critical: 67, high: 145, medium: 189, low: 456, total: 857 },
    { stage: 'Refinance Window', critical: 34, high: 79, medium: 77, low: 273, total: 463 }
  ];

  const loans = [
    {
      id: 'LN-2024-8934',
      borrower: 'Martinez Family',
      amount: 425000,
      stage: 'Mid-Term',
      riskLevel: 'critical',
      riskScore: 87,
      ltv: 92,
      dti: 48,
      paymentHistory: 'Late 3x',
      daysDelinquent: 45,
      trend: 'worsening'
    },
    {
      id: 'LN-2024-7823',
      borrower: 'Chen Household',
      amount: 385000,
      stage: 'Early Payment',
      riskLevel: 'high',
      riskScore: 72,
      ltv: 85,
      dti: 42,
      paymentHistory: 'Late 2x',
      daysDelinquent: 15,
      trend: 'stable'
    },
    {
      id: 'LN-2024-6712',
      borrower: 'Rodriguez Family',
      amount: 510000,
      stage: 'Mid-Term',
      riskLevel: 'critical',
      riskScore: 91,
      ltv: 95,
      dti: 52,
      paymentHistory: 'Late 4x',
      daysDelinquent: 60,
      trend: 'worsening'
    },
    {
      id: 'LN-2024-5601',
      borrower: 'Anderson Household',
      amount: 295000,
      stage: 'Maturity',
      riskLevel: 'medium',
      riskScore: 58,
      ltv: 78,
      dti: 38,
      paymentHistory: 'Late 1x',
      daysDelinquent: 0,
      trend: 'improving'
    },
    {
      id: 'LN-2024-4590',
      borrower: 'Thompson Family',
      amount: 467000,
      stage: 'Refinance Window',
      riskLevel: 'high',
      riskScore: 68,
      ltv: 88,
      dti: 45,
      paymentHistory: 'Late 2x',
      daysDelinquent: 30,
      trend: 'stable'
    }
  ];

  const filteredLoans = loans.filter(loan => {
    const matchesRisk = selectedRiskLevel === 'all' || loan.riskLevel === selectedRiskLevel;
    const matchesStage = selectedStage === 'all' || loan.stage === selectedStage;
    return matchesRisk && matchesStage;
  });

  // Animate counts on mount

useEffect(() => {
  const timer = setInterval(() => {
    setAnimatedCounts((prev: Record<string, number>) => {
      const newCounts: Record<string, number> = {};

      Object.keys(riskSummary as Record<string, number>).forEach((key: string) => {
        const target: number = (riskSummary as Record<string, number>)[key];
        const current: number = prev[key] || 0;

        newCounts[key] =
          current < target
            ? Math.min(current + Math.ceil(target / 20), target)
            : target;
      });

      return newCounts;
    });
  }, 50);

  return () => clearInterval(timer);
}, []);


//   const getRiskBadge = (level) => {
//     const badges = {
//       critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: '🔴' },
//       high: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', icon: '🟠' },
//       medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '🟡' },
//       low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: '🟢' }
//     };
//     return badges[level];
//   };

const getRiskBadge = (
  level: "critical" | "high" | "medium" | "low"
): {
  bg: string;
  text: string;
  border: string;
  icon: string;
} => {
  const badges: Record<
    "critical" | "high" | "medium" | "low",
    { bg: string; text: string; border: string; icon: string }
  > = {
    critical: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: '🔴'
    },
    high: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: '🟠'
    },
    medium: {
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-400',
      border: 'border-yellow-500/30',
      icon: '🟡'
    },
    low: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-400',
      border: 'border-teal-500/30',
      icon: '🟢'
    }
  };

  return badges[level];
};

//   const getTrendIcon = (trend) => {
//     if (trend === 'worsening') return <TrendingDown className="w-4 h-4 text-red-400" />;
//     if (trend === 'improving') return <TrendingDown className="w-4 h-4 text-green-400 rotate-180" />;
//     return <Activity className="w-4 h-4 text-gray-400" />;
//   };

const getTrendIcon = (
  trend: "worsening" | "improving" | "stable" | undefined
): JSX.Element => {
  if (trend === "worsening")
    return <TrendingDown className="w-4 h-4 text-blue-400" />;

  if (trend === "improving")
    return <TrendingDown className="w-4 h-4 text-red-400 rotate-180" />;

  return <Activity className="w-4 h-4 text-teal-400" />;
};


  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">⚠️ Loan Lifecycle Risk Monitor</h1>
          <p className="text-gray-400">Track and manage risk across all loan stages</p>
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
              <Clock className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Loan Stage:</span>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Stages</option>
                {stageDistribution.map(s => (
                  <option key={s.stage} value={s.stage}>{s.stage}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Risk Summary Cards */}
        <div className="grid grid-cols-5 gap-4">
          {[
            { key: 'critical', label: 'Critical Risk', icon: AlertTriangle, color: 'blue' },
            { key: 'high', label: 'High Risk', icon: AlertTriangle, color: 'blue' },
            { key: 'medium', label: 'Medium Risk', icon: Shield, color: 'yellow' },
            { key: 'low', label: 'Low Risk', icon: Shield, color: 'teal' },
            { key: 'totalLoans', label: 'Total Loans', icon: Target, color: 'teal' }
          ].map(item => {
            const Icon = item.icon;
            const count: number = animatedCounts[item.key as keyof typeof animatedCounts] || 0;
            
            return (
              <div key={item.key} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 bg-${item.color}-500/20 rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <div className="text-xs text-gray-400">{item.label}</div>
                </div>
                <div className={`text-3xl font-bold text-${item.color}-400`}>
                  {count.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stage Distribution */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Risk Distribution by Loan Stage</h3>
          
          <div className="space-y-4">
            {stageDistribution.map((stage, idx) => (
              <div key={idx} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-white">{stage.stage}</span>
                  <span className="text-sm text-gray-400">{stage.total} loans</span>
                </div>
                
                <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
                  <div 
                    className="bg-blue-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-1000"
                    style={{ width: `${(stage.critical / stage.total) * 100}%` }}
                  >
                    {stage.critical > 0 && stage.critical}
                  </div>
                  <div 
                    className="bg-blue-500 flex items-center justify-center text-xs font-bold text-white transition-all duration-1000"
                    style={{ width: `${(stage.high / stage.total) * 100}%` }}
                  >
                    {stage.high > 0 && stage.high}
                  </div>
                  <div 
                    className="bg-yellow-500 flex items-center justify-center text-xs font-bold text-black transition-all duration-1000"
                    style={{ width: `${(stage.medium / stage.total) * 100}%` }}
                  >
                    {stage.medium > 0 && stage.medium}
                  </div>
                  <div 
                    className="bg-teal-500 flex items-center justify-center text-xs font-bold text-black transition-all duration-1000"
                    style={{ width: `${(stage.low / stage.total) * 100}%` }}
                  >
                    {stage.low > 0 && stage.low}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Critical: {stage.critical}</span>
                  <span>High: {stage.high}</span>
                  <span>Medium: {stage.medium}</span>
                  <span>Low: {stage.low}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Risk Loans Table */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">🎯 High-Risk Loans Requiring Attention</h3>
            <span className="text-sm text-gray-400">Showing {filteredLoans.length} of {loans.length}</span>
          </div>

          <div className="space-y-4">
            {filteredLoans.map((loan) => {
            const badge = getRiskBadge(loan.riskLevel as "critical" | "high" | "medium" | "low");

              
              return (
                <div key={loan.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-3 rounded-xl border ${badge.bg} ${badge.border}`}>
                        <div className="text-xs text-gray-400 mb-1">Risk Score</div>
                        <div className={`text-2xl font-bold ${badge.text}`}>{loan.riskScore}</div>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-bold text-white">{loan.borrower}</h4>
                          {getTrendIcon(loan.trend as any)}
                        </div>
                        <p className="text-sm text-gray-400">Loan ID: {loan.id}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                        {badge.icon} {loan.riskLevel.toUpperCase()}
                      </span>
                      <span className="px-3 py-1.5 bg-gray-700 rounded-lg text-xs font-medium text-white">
                        {loan.stage}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4">
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Loan Amount</div>
                      <div className="text-sm font-bold text-white">${(loan.amount / 1000).toFixed(0)}k</div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">LTV</div>
                      <div className={`text-sm font-bold ${loan.ltv > 90 ? 'text-red-400' : 'text-white'}`}>
                        {loan.ltv}%
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">DTI</div>
                      <div className={`text-sm font-bold ${loan.dti > 45 ? 'text-red-400' : 'text-white'}`}>
                        {loan.dti}%
                      </div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Payment History</div>
                      <div className="text-sm font-bold text-yellow-400">{loan.paymentHistory}</div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Delinquent</div>
                      <div className={`text-sm font-bold ${loan.daysDelinquent > 30 ? 'text-red-400' : 'text-yellow-400'}`}>
                        {loan.daysDelinquent} days
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-end gap-2">
                      <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export Risk Report
          </button>
          <button className="px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 font-bold rounded-lg hover:bg-red-500/30 transition-colors">
            Flag for Review
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Set Alerts
          </button>
        </div>
      </div>
    </div>
  );
}