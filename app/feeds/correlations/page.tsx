
"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Link, BarChart3, PieChart, LineChart, Activity } from 'lucide-react';

const CorrelationsFeed = () => {
  const [correlationType, setCorrelationType] = useState('rates');

  const correlationTypes = [
    { id: 'rates', label: 'Interest Rates' },
    { id: 'housing', label: 'Housing' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'crypto', label: 'Crypto' }
  ];

  const rateCorrelations = [
    {
      pair: '30yr Mortgage vs 10yr Treasury',
      correlation: 0.92,
      strength: 'Very Strong',
      direction: 'positive',
      description: 'Mortgage rates closely follow 10yr Treasury yields'
    },
    {
      pair: 'Fed Funds vs Mortgage Rates',
      correlation: 0.78,
      strength: 'Strong',
      direction: 'positive',
      description: 'Fed rate changes impact mortgage rates with ~3 month lag'
    },
    {
      pair: 'CPI Inflation vs Mortgage Rates',
      correlation: 0.65,
      strength: 'Moderate',
      direction: 'positive',
      description: 'Higher inflation typically leads to higher rates'
    },
    {
      pair: 'Unemployment vs Refi Volume',
      correlation: -0.58,
      strength: 'Moderate',
      direction: 'negative',
      description: 'Lower unemployment correlates with lower refi demand'
    }
  ];

  const housingCorrelations = [
    {
      pair: 'Home Prices vs Mortgage Rates',
      correlation: -0.42,
      strength: 'Weak',
      direction: 'negative',
      description: 'Higher rates typically slow price growth'
    },
    {
      pair: 'Inventory vs Days on Market',
      correlation: 0.81,
      strength: 'Very Strong',
      direction: 'positive',
      description: 'More inventory leads to longer market times'
    },
    {
      pair: 'Consumer Confidence vs Sales',
      correlation: 0.72,
      strength: 'Strong',
      direction: 'positive',
      description: 'Confidence strongly predicts home sales'
    }
  ];

  const stockCorrelations = [
    {
      pair: 'Financial Stocks vs Mortgage Rates',
      correlation: 0.68,
      strength: 'Strong',
      direction: 'positive',
      description: 'Banks benefit from higher rates'
    },
    {
      pair: 'Tech Stocks vs Mortgage Apps',
      correlation: 0.45,
      strength: 'Weak',
      direction: 'positive',
      description: 'Limited correlation observed'
    },
    {
      pair: 'REITs vs 10yr Treasury',
      correlation: -0.82,
      strength: 'Very Strong',
      direction: 'negative',
      description: 'REITs highly sensitive to interest rates'
    }
  ];

  const cryptoCorrelations = [
    {
      pair: 'Bitcoin vs Mortgage Rates',
      correlation: -0.12,
      strength: 'Very Weak',
      direction: 'negative',
      description: 'Minimal correlation with traditional rates'
    },
    {
      pair: 'Bitcoin vs Stock Market',
      correlation: 0.38,
      strength: 'Weak',
      direction: 'positive',
      description: 'Some correlation emerging recently'
    }
  ];

  const realTimeInsights = [
    {
      id: 1,
      insight: 'Strong correlation between Treasury yields and mortgage rates suggests upcoming rate stability',
      confidence: 'High',
      impact: 'Medium',
      time: 'Updated 2 hours ago'
    },
    {
      id: 2,
      insight: 'Consumer confidence drop may signal housing market slowdown in Q1',
      confidence: 'Medium',
      impact: 'High',
      time: 'Updated 1 day ago'
    },
    {
      id: 3,
      insight: 'Stock market volatility increasing correlation with mortgage applications',
      confidence: 'Low',
      impact: 'Low',
      time: 'Updated 3 days ago'
    }
  ];

  const getCorrelationData = () => {
    switch (correlationType) {
      case 'rates': return rateCorrelations;
      case 'housing': return housingCorrelations;
      case 'stocks': return stockCorrelations;
      case 'crypto': return cryptoCorrelations;
      default: return rateCorrelations;
    }
  };

  const getCorrelationColor = (value: number, direction: 'positive' | 'negative'): string => {
    const absValue = Math.abs(value);
    if (absValue >= 0.8) return direction === 'positive' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400';
    if (absValue >= 0.6) return direction === 'positive' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400';
    if (absValue >= 0.4) return direction === 'positive' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400';
    return 'bg-zinc-500/20 text-gray-400';
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Correlations</h2>
          <p className="text-[#9CA3AF]">Analyze relationships between different market indicators</p>
        </div>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
          Generate Report
        </button>
      </div>

      {/* Correlation Type Selector */}
      <div className="flex gap-2">
        {correlationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setCorrelationType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              correlationType === type.id
                ? 'bg-[#00D1D1] text-white'
                : 'bg-[#2A2A2A] text-[#9CA3AF] hover:text-white'
            }`}
          >
            <Link className="w-4 h-4" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Correlation Matrix */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-semibold">
            {correlationType.charAt(0).toUpperCase() + correlationType.slice(1)} Correlations
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-[#9CA3AF] text-sm">Live correlation analysis</span>
          </div>
        </div>

        <div className="space-y-4">
          {getCorrelationData().map((correlation, idx) => (
            <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-zinc-800 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-lg mb-2">{correlation.pair}</h4>
                  <p className="text-[#9CA3AF] text-sm">{correlation.description}</p>
                </div>
                <div className="flex flex-col items-end ml-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getCorrelationColor(correlation.correlation, correlation.direction as 'positive' | 'negative')}`}>
                    {correlation.direction === 'positive' ? '+' : ''}{correlation.correlation.toFixed(2)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    correlation.strength === 'Very Strong' ? 'bg-purple-500/20 text-purple-400' :
                    correlation.strength === 'Strong' ? 'bg-purple-500/20 text-purple-400' :
                    correlation.strength === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-zinc-500/20 text-gray-400'
                  }`}>
                    {correlation.strength}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      correlation.direction === 'positive' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <span className="text-[#9CA3AF] text-sm">
                      {correlation.direction === 'positive' ? 'Positive Correlation' : 'Negative Correlation'}
                    </span>
                  </div>
                </div>
                <div className="text-[#9CA3AF] text-sm">
                  {correlation.direction === 'positive' ? 'Variables move together' : 'Variables move opposite'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Insights */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Real-time Correlation Insights</h3>
        <div className="space-y-4">
          {realTimeInsights.map((insight) => (
            <div key={insight.id} className="p-4 bg-gradient-to-r from-[#00D1D1]/10 to-transparent border border-[#00D1D1]/20 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <p className="text-white font-semibold">{insight.insight}</p>
                <div className="flex flex-col items-end ml-4">
                  <span className={`px-2 py-1 rounded text-xs mb-2 ${
                    insight.confidence === 'High' ? 'bg-purple-500/20 text-purple-400' :
                    insight.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    Confidence: {insight.confidence}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    insight.impact === 'High' ? 'bg-blue-500/20 text-blue-400' :
                    insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-teal-500/20 text-teal-400'
                  }`}>
                    Impact: {insight.impact}
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-sm text-[#9CA3AF]">
                <span>Market Intelligence</span>
                <span>{insight.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Correlation Legend */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Correlation Strength Guide</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center p-4 bg-purple-500/10 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-2">0.8 - 1.0</div>
            <h4 className="text-white font-semibold mb-1">Very Strong</h4>
            <p className="text-[#9CA3AF] text-sm">Highly predictive relationship</p>
          </div>
          
          <div className="text-center p-4 bg-purple-500/10 rounded-lg">
            <div className="text-2xl font-bold text-purple-400 mb-2">0.6 - 0.79</div>
            <h4 className="text-white font-semibold mb-1">Strong</h4>
            <p className="text-[#9CA3AF] text-sm">Clear relationship exists</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
            <div className="text-2xl font-bold text-yellow-400 mb-2">0.4 - 0.59</div>
            <h4 className="text-white font-semibold mb-1">Moderate</h4>
            <p className="text-[#9CA3AF] text-sm">Some correlation present</p>
          </div>
          
          <div className="text-center p-4 bg-zinc-500/10 rounded-lg">
            <div className="text-2xl font-bold text-gray-400 mb-2">0.0 - 0.39</div>
            <h4 className="text-white font-semibold mb-1">Weak</h4>
            <p className="text-[#9CA3AF] text-sm">Limited or no correlation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorrelationsFeed;