"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Download, Filter, TrendingUp, AlertCircle, Clock, CheckCircle, Target } from 'lucide-react';

const PipelineReport = () => {
  const [dateRange, setDateRange] = useState('last90days');

  const pipelineStages = [
    { stage: 'New Leads', count: 145, value: '$45.8M', avgDays: 1, conversion: 100 },
    { stage: 'Contacted', count: 132, value: '$41.2M', avgDays: 2, conversion: 91 },
    { stage: 'Application', count: 98, value: '$30.5M', avgDays: 5, conversion: 68 },
    { stage: 'Processing', count: 76, value: '$23.8M', avgDays: 12, conversion: 52 },
    { stage: 'Underwriting', count: 54, value: '$16.9M', avgDays: 8, conversion: 37 },
    { stage: 'Approved', count: 42, value: '$13.1M', avgDays: 3, conversion: 29 },
    { stage: 'Closed', count: 38, value: '$11.9M', avgDays: 0, conversion: 26 }
  ];

  const pipelineByLO = [
    { name: 'John Smith', total: 28, hot: 12, warm: 10, cold: 6, value: '$8.2M', conversion: 32 },
    { name: 'Lisa Wang', total: 25, hot: 10, warm: 9, cold: 6, value: '$7.3M', conversion: 29 },
    { name: 'Mike Johnson', total: 22, hot: 8, warm: 8, cold: 6, value: '$6.4M', conversion: 24 },
    { name: 'Sarah Chen', total: 18, hot: 6, warm: 7, cold: 5, value: '$5.2M', conversion: 27 }
  ];

  const agingPipeline = [
    { range: '0-7 days', count: 45, percentage: 31 },
    { range: '8-14 days', count: 38, percentage: 26 },
    { range: '15-30 days', count: 32, percentage: 22 },
    { range: '31-60 days', count: 22, percentage: 15 },
    { range: '60+ days', count: 8, percentage: 6 }
  ];

  const productPipeline = [
    { product: '30yr Fixed', count: 65, value: '$20.3M', percentage: 45 },
    { product: '15yr Fixed', count: 32, value: '$9.8M', percentage: 22 },
    { product: 'FHA', count: 28, value: '$8.7M', percentage: 19 },
    { product: 'VA', count: 18, value: '$5.6M', percentage: 12 },
    { product: 'Jumbo', count: 12, value: '$9.8M', percentage: 8 }
  ];

  return (
    <div className="space-y-6 p-14">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Pipeline Analytics Report</h2>
        <div className="flex gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
          >
            <option value="active">Active Pipeline</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="forecast">30-Day Forecast</option>
          </select>
          
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <button className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2 font-semibold">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Pipeline KPI Summary */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Pipeline Value</p>
          <h3 className="text-3xl font-bold text-white mb-2">$173.2M</h3>
          <p className="text-green-400 text-sm font-semibold">+12.5% vs last month</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Active Deals</p>
          <h3 className="text-3xl font-bold text-white mb-2">145</h3>
          <p className="text-green-400 text-sm font-semibold">+8 deals this week</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Avg Days in Pipeline</p>
          <h3 className="text-3xl font-bold text-white mb-2">31</h3>
          <p className="text-red-400 text-sm font-semibold">+2 days vs target</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Conversion Rate</p>
          <h3 className="text-3xl font-bold text-white mb-2">26.2%</h3>
          <p className="text-green-400 text-sm font-semibold">+1.8% vs target</p>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-6">Pipeline by Stage</h3>
        <div className="space-y-4">
          {pipelineStages.map((stage, idx) => (
            <div key={idx} className="flex items-center">
              <div className="w-40">
                <span className="text-white font-semibold">{stage.stage}</span>
              </div>
              <div className="flex-1 ml-6">
                <div className="flex justify-between mb-1">
                  <span className="text-[#9CA3AF] text-sm">{stage.count} deals • {stage.conversion}% conversion</span>
                  <span className="text-white font-semibold">{stage.value}</span>
                </div>
                <div className="w-full bg-[#2A2A2A] rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-[#00D1D1] to-[#00B8B8] h-4 rounded-full"
                    style={{ width: `${stage.conversion}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[#9CA3AF] text-xs">
                    Avg: {stage.avgDays} days
                  </span>
                  <span className="text-[#9CA3AF] text-xs">
                    {((stage.count / 145) * 100).toFixed(1)}% of total
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Distribution & Aging */}
      <div className="grid grid-cols-2 gap-6">
        {/* Pipeline by Loan Officer */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Pipeline by Loan Officer</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Loan Officer</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Total Deals</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Hot</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Warm</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Cold</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Value</th>
                <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Conv. Rate</th>
              </tr>
            </thead>
            <tbody>
              {pipelineByLO.map((lo, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                  <td className="py-4 px-4 text-white font-semibold">{lo.name}</td>
                  <td className="py-4 px-4 text-center text-white font-bold">{lo.total}</td>
                  <td className="py-4 px-4 text-center text-red-400 font-semibold">{lo.hot}</td>
                  <td className="py-4 px-4 text-center text-yellow-400 font-semibold">{lo.warm}</td>
                  <td className="py-4 px-4 text-center text-blue-400 font-semibold">{lo.cold}</td>
                  <td className="py-4 px-4 text-center text-white font-semibold">{lo.value}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      lo.conversion >= 30 ? 'bg-green-500/20 text-green-400' :
                      lo.conversion >= 25 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {lo.conversion}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Aging Pipeline */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Pipeline Aging Analysis</h3>
          <div className="space-y-4">
            {agingPipeline.map((age, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">{age.range}</span>
                  <div className="text-right">
                    <span className="text-white font-semibold mr-3">{age.count} deals</span>
                    <span className="text-[#9CA3AF] text-sm">({age.percentage}%)</span>
                  </div>
                </div>
                <div className="w-full bg-[#2A2A2A] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      idx === 0 ? 'bg-green-500' :
                      idx === 1 ? 'bg-yellow-500' :
                      idx === 2 ? 'bg-orange-500' :
                      idx === 3 ? 'bg-red-500' :
                      'bg-purple-500'
                    }`}
                    style={{ width: `${age.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Pipeline */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Pipeline by Product Type</h3>
        <div className="grid grid-cols-5 gap-6">
          {productPipeline.map((product, idx) => (
            <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg text-center">
              <div className="text-2xl font-bold text-white mb-2">{product.count}</div>
              <div className="text-[#00D1D1] font-semibold mb-1">{product.product}</div>
              <div className="text-white font-semibold text-lg mb-2">{product.value}</div>
              <div className="text-[#9CA3AF] text-sm">{product.percentage}% of total</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Pipeline Bottleneck Analysis</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <h4 className="text-white font-semibold">Processing Stage</h4>
            </div>
            <p className="text-[#9CA3AF] text-sm">Longest average days (12 days)</p>
            <p className="text-red-400 text-sm font-semibold mt-2">Needs attention</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-6 h-6 text-yellow-400" />
              <h4 className="text-white font-semibold">Underwriting</h4>
            </div>
            <p className="text-[#9CA3AF] text-sm">8 days average • 37% conversion</p>
            <p className="text-yellow-400 text-sm font-semibold mt-2">Monitor closely</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h4 className="text-white font-semibold">Closed Deals</h4>
            </div>
            <p className="text-[#9CA3AF] text-sm">26.2% overall conversion rate</p>
            <p className="text-green-400 text-sm font-semibold mt-2">Above target</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PipelineReport;