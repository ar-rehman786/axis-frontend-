"use client";

import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Database, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

const QAOverview = () => {
  const [timeRange, setTimeRange] = useState('30days');

  const dataQualityMetrics = {
    completeness: 94.5,
    accuracy: 96.8,
    duplicates: 2.3,
    invalidData: 1.2,
    overallScore: 95.2
  };

  const complianceMetrics = {
    dncCompliance: 98.5,
    tcpaAdherence: 99.2,
    consentTracking: 96.8,
    disclosureRate: 100
  };

  const systemMetrics = [
    { label: 'Database Size', value: '4.8 GB', trend: 'up', change: '+12%' },
    { label: 'API Calls', value: '2.4M', trend: 'up', change: '+8%' },
    { label: 'Error Rate', value: '0.03%', trend: 'down', change: '-45%' },
    { label: 'Uptime', value: '99.99%', trend: 'stable', change: '0%' }
  ];

  const recentIssues = [
    { id: 1, type: 'Data Anomaly', severity: 'medium', count: 24, resolved: 18, trend: 'down' },
    { id: 2, type: 'Compliance Alert', severity: 'high', count: 8, resolved: 6, trend: 'stable' },
    { id: 3, type: 'System Error', severity: 'low', count: 3, resolved: 3, trend: 'down' },
    { id: 4, type: 'User Error', severity: 'medium', count: 12, resolved: 9, trend: 'up' }
  ];

  const validationRules = [
    { name: 'Email Format', status: 'active', coverage: '100%', lastChecked: '2 hours ago' },
    { name: 'Phone Validation', status: 'active', coverage: '98%', lastChecked: '1 hour ago' },
    { name: 'Address Standardization', status: 'active', coverage: '95%', lastChecked: '3 hours ago' },
    { name: 'Required Fields', status: 'active', coverage: '100%', lastChecked: '5 hours ago' }
  ];

  return (
    <div className="space-y-6 p-14">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Quality Overview</h2>
        <div className="flex items-center gap-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="365days">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-8 text-center">
        <h2 className="text-[#9CA3AF] text-lg mb-4">Overall Data Quality Score</h2>
        <div className="relative inline-block">
          <div className="text-7xl font-bold text-white">{dataQualityMetrics.overallScore}</div>
          <span className="text-3xl text-[#9CA3AF]">/100</span>
        </div>
        <p className="text-green-400 font-semibold mt-4 text-lg">Excellent Health</p>
      </div>

      {/* Data Quality Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#9CA3AF] text-sm">Completeness</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.completeness}%</h3>
          <div className="w-full bg-[#2A2A2A] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00D1D1] to-[#00B8B8] h-2 rounded-full"
              style={{ width: `${dataQualityMetrics.completeness}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#9CA3AF] text-sm">Accuracy</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.accuracy}%</h3>
          <div className="w-full bg-[#2A2A2A] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#00D1D1] to-[#00B8B8] h-2 rounded-full"
              style={{ width: `${dataQualityMetrics.accuracy}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#9CA3AF] text-sm">Duplicates</p>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.duplicates}%</h3>
          <div className="w-full bg-[#2A2A2A] rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${dataQualityMetrics.duplicates * 10}%` }}
            />
          </div>
        </div>

        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#9CA3AF] text-sm">Invalid Data</p>
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.invalidData}%</h3>
          <div className="w-full bg-[#2A2A2A] rounded-full h-2">
            <div 
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${dataQualityMetrics.invalidData * 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* System Metrics */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">System Performance Metrics</h3>
        <div className="grid grid-cols-4 gap-6">
          {systemMetrics.map((metric, idx) => (
            <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg">
              <p className="text-[#9CA3AF] text-sm mb-2">{metric.label}</p>
              <div className="flex items-center justify-between">
                <h4 className="text-2xl font-bold text-white">{metric.value}</h4>
                <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                  <span className="text-sm font-semibold">{metric.change}</span>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 ml-1" />
                  ) : metric.trend === 'down' ? (
                    <TrendingDown className="w-4 h-4 ml-1" />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Issues & Validation Rules */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Issues */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Recent Quality Issues</h3>
          <div className="space-y-3">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      issue.severity === 'high' ? 'bg-red-500' :
                      issue.severity === 'medium' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <span className="text-white font-semibold">{issue.type}</span>
                  </div>
                  <span className="text-[#9CA3AF] text-sm">
                    {issue.resolved}/{issue.count} resolved
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {issue.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-green-400" />
                    ) : issue.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-400" />
                    ) : null}
                    <span className="text-[#9CA3AF] text-sm">
                      Trend: {issue.trend === 'down' ? 'Improving' : issue.trend === 'up' ? 'Worsening' : 'Stable'}
                    </span>
                  </div>
                  <button className="px-3 py-1 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validation Rules */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Active Validation Rules</h3>
          <div className="space-y-3">
            {validationRules.map((rule, idx) => (
              <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{rule.name}</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                    {rule.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#9CA3AF] text-sm">Coverage: {rule.coverage}</p>
                    <p className="text-[#9CA3AF] text-xs">Checked: {rule.lastChecked}</p>
                  </div>
                  <div className="w-12 h-2 bg-[#1A1A1A] rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        rule.coverage === '100%' ? 'bg-green-500' :
                        rule.coverage >= '95%' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: rule.coverage }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compliance Metrics */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Compliance Metrics</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">DNC Compliance</p>
            <h3 className="text-3xl font-bold text-white mb-2">{complianceMetrics.dncCompliance}%</h3>
            <p className="text-green-400 text-sm font-semibold">Excellent</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">TCPA Adherence</p>
            <h3 className="text-3xl font-bold text-white mb-2">{complianceMetrics.tcpaAdherence}%</h3>
            <p className="text-green-400 text-sm font-semibold">Excellent</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">Consent Tracking</p>
            <h3 className="text-3xl font-bold text-white mb-2">{complianceMetrics.consentTracking}%</h3>
            <p className="text-green-400 text-sm font-semibold">Good</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">Disclosure Rate</p>
            <h3 className="text-3xl font-bold text-white mb-2">{complianceMetrics.disclosureRate}%</h3>
            <p className="text-green-400 text-sm font-semibold">Perfect</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QAOverview;