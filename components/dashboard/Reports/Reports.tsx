import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Filter, TrendingUp, DollarSign, Users, Mail, FileText, Shield } from 'lucide-react';

// Mock Data
const performanceData = [
  { month: 'Jul', pipeline: 45, closed: 32 },
  { month: 'Aug', pipeline: 52, closed: 38 },
  { month: 'Sep', pipeline: 48, closed: 35 },
  { month: 'Oct', pipeline: 61, closed: 45 },
  { month: 'Nov', pipeline: 58, closed: 42 }
];

const conversionData = [
  { stage: 'Lead', count: 847, rate: 100 },
  { stage: 'Contacted', count: 612, rate: 72 },
  { stage: 'Qualified', count: 423, rate: 50 },
  { stage: 'Application', count: 276, rate: 33 },
  { stage: 'Approved', count: 198, rate: 23 },
  { stage: 'Closed', count: 156, rate: 18 }
];

const leadSourceROI = [
  { source: 'Website', leads: 234, cost: 8500, closed: 42, revenue: 582000, roi: 6747 },
  { source: 'Realtor Referral', leads: 156, cost: 2400, closed: 38, revenue: 526000, roi: 21817 },
  { source: 'Facebook Ads', leads: 189, cost: 12400, closed: 28, revenue: 388000, roi: 3029 },
  { source: 'Google Ads', leads: 145, cost: 9800, closed: 22, revenue: 304000, roi: 3002 },
  { source: 'Email Campaign', leads: 123, cost: 3200, closed: 26, revenue: 360000, roi: 11150 }
];

const teamPerformance = [
  { name: 'John Smith', leads: 145, contacted: 132, qualified: 98, closed: 42, revenue: 582000, conversion: 29 },
  { name: 'Lisa Wang', leads: 132, contacted: 118, qualified: 87, closed: 38, revenue: 526000, conversion: 29 },
  { name: 'Mike Johnson', leads: 118, contacted: 95, qualified: 68, closed: 28, revenue: 388000, conversion: 24 },
  { name: 'Sarah Chen', leads: 98, contacted: 84, qualified: 61, closed: 26, revenue: 360000, conversion: 27 }
];

const marketingCampaigns = [
  { name: 'Q4 Refi Promo', sent: 12450, opened: 4235, clicked: 845, leads: 234, status: 'active', roi: 4.2 },
  { name: 'Cash-Out Offer', sent: 8920, opened: 2987, clicked: 612, leads: 156, status: 'completed', roi: 5.8 },
  { name: 'First-Time Buyer', sent: 15600, opened: 5124, clicked: 1024, leads: 298, status: 'active', roi: 3.9 },
  { name: 'Rate Drop Alert', sent: 6780, opened: 3254, clicked: 987, leads: 387, status: 'completed', roi: 8.1 }
];

const complianceMetrics = {
  dncCompliance: 98.5,
  tcpaAdherence: 99.2,
  disclosureCompletion: 96.8,
  documentRetention: 100,
  auditScore: 97.3
};

const Reports = () => {
  const [activeCategory, setActiveCategory] = useState('performance');
  const [dateRange, setDateRange] = useState('last90days');

  const categories = [
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'leads', label: 'Lead Analytics', icon: Users },
    { id: 'marketing', label: 'Marketing', icon: Mail },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'custom', label: 'Custom Reports', icon: FileText }
  ];

  return (
    <>
    
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports & Analytics</h1>
          <p className="text-[#9CA3AF]">Comprehensive insights into your mortgage operations</p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
          >
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="last6months">Last 6 Months</option>
            <option value="last12months">Last 12 Months</option>
            <option value="custom">Custom Range</option>
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

      {/* Category Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-800 overflow-x-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'text-[#00D1D1] border-b-2 border-[#00D1D1]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Performance Reports */}
      {activeCategory === 'performance' && (
        <div className="space-y-6">
          {/* KPI Summary */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Pipeline Value</p>
              <h3 className="text-3xl font-bold text-white mb-2">$8.4M</h3>
              <p className="text-red-400 text-sm font-semibold">+18.5% vs last period</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Closed Deals</p>
              <h3 className="text-3xl font-bold text-white mb-2">192</h3>
              <p className="text-red-400 text-sm font-semibold">+12.3% vs last period</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-white mb-2">18.4%</h3>
              <p className="text-red-400 text-sm font-semibold">-2.1% vs last period</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Avg Deal Size</p>
              <h3 className="text-3xl font-bold text-white mb-2">$385K</h3>
              <p className="text-red-400 text-sm font-semibold">+5.7% vs last period</p>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Pipeline vs Closed Deals</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                  labelStyle={{ color: '#FFFFFF' }}
                />
                <Legend />
                <Bar dataKey="pipeline" fill="#FFD166" name="Pipeline" />
                <Bar dataKey="closed" fill="#00D1D1" name="Closed" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-6">Conversion Funnel</h3>
            <div className="space-y-3">
              {conversionData.map((stage) => (
                <div key={stage.stage}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">{stage.stage}</span>
                    <div className="text-right">
                      <span className="text-white font-semibold mr-3">{stage.count}</span>
                      <span className="text-[#9CA3AF] text-sm">({stage.rate}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#2A2A2A] rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-[#00D1D1] to-[#00B8B8] h-3 rounded-full transition-all"
                      style={{ width: `${stage.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Team Performance</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Loan Officer</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Leads</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Contacted</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Qualified</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Closed</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Revenue</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {teamPerformance.map((member, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-4 text-white font-semibold">{member.name}</td>
                    <td className="py-4 px-4 text-right text-white">{member.leads}</td>
                    <td className="py-4 px-4 text-right text-white">{member.contacted}</td>
                    <td className="py-4 px-4 text-right text-white">{member.qualified}</td>
                    <td className="py-4 px-4 text-right text-[#00D1D1] font-semibold">{member.closed}</td>
                    <td className="py-4 px-4 text-right text-white font-semibold">
                      ${(member.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        member.conversion >= 28 ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {member.conversion}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Lead Analytics */}
      {activeCategory === 'leads' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Lead Source ROI Analysis</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Source</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Leads</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Cost</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Closed</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Revenue</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">ROI</th>
                </tr>
              </thead>
              <tbody>
                {leadSourceROI.map((source, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-4 text-white font-semibold">{source.source}</td>
                    <td className="py-4 px-4 text-right text-white">{source.leads}</td>
                    <td className="py-4 px-4 text-right text-white">${source.cost.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-[#00D1D1] font-semibold">{source.closed}</td>
                    <td className="py-4 px-4 text-right text-white font-semibold">
                      ${(source.revenue / 1000).toFixed(0)}K
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        source.roi >= 5000 ? 'bg-red-500/20 text-red-400' : 
                        source.roi >= 3000 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {source.roi.toLocaleString()}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Lead Quality Distribution */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Lead Quality Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Hot', value: 185 },
                      { name: 'Warm', value: 342 },
                      { name: 'Cold', value: 256 },
                      { name: 'Unqualified', value: 64 }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {[
                      { color: '#FF6B6B' },
                      { color: '#FFD166' },
                      { color: '#00D1D1' },
                      { color: '#9CA3AF' }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <h3 className="text-white text-xl font-semibold mb-4">Response Time Metrics</h3>
              <div className="space-y-6 pt-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9CA3AF]">Avg Response Time</span>
                    <span className="text-white font-semibold">4.2 mins</span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9CA3AF]">First Contact Rate</span>
                    <span className="text-white font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#9CA3AF]">Follow-up Completion</span>
                    <span className="text-white font-semibold">78%</span>
                  </div>
                  <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Reports */}
      {activeCategory === 'marketing' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Email Open Rate</p>
              <h3 className="text-3xl font-bold text-white mb-2">34.2%</h3>
              <p className="text-red-400 text-sm font-semibold">+4.5% vs benchmark</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Click-Through Rate</p>
              <h3 className="text-3xl font-bold text-white mb-2">6.8%</h3>
              <p className="text-red-400 text-sm font-semibold">+1.2% vs benchmark</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Campaign ROI</p>
              <h3 className="text-3xl font-bold text-white mb-2">5.2x</h3>
              <p className="text-red-400 text-sm font-semibold">Above target</p>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Campaign Performance</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Campaign</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Sent</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Opened</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Clicked</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Leads</th>
                  <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">ROI</th>
                  <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {marketingCampaigns.map((campaign, idx) => (
                  <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-4 text-white font-semibold">{campaign.name}</td>
                    <td className="py-4 px-4 text-right text-white">{campaign.sent.toLocaleString()}</td>
                    <td className="py-4 px-4 text-right text-white">
                      {campaign.opened.toLocaleString()} 
                      <span className="text-[#9CA3AF] text-sm ml-1">
                        ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-white">
                      {campaign.clicked.toLocaleString()}
                      <span className="text-[#9CA3AF] text-sm ml-1">
                        ({((campaign.clicked / campaign.opened) * 100).toFixed(1)}%)
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right text-[#00D1D1] font-semibold">{campaign.leads}</td>
                    <td className="py-4 px-4 text-right text-white font-semibold">{campaign.roi}x</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        campaign.status === 'active' ? 'bg-teal-500/20 text-teal-400' : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compliance Reports */}
      {activeCategory === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-6">
            {Object.entries(complianceMetrics).map(([key, value]) => (
              <div key={key} className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-6">
                <p className="text-[#9CA3AF] text-sm mb-2">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <h3 className="text-3xl font-bold text-white mb-2">{value}%</h3>
                <p className={`text-sm font-semibold ${value >= 98 ? 'text-teal-400' : 'text-yellow-400'}`}>
                  {value >= 98 ? 'Excellent' : 'Good'}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-6">Compliance Audit Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold">DNC List Review</span>
                <span className="px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold">Passed</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold">TCPA Compliance</span>
                <span className="px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold">Passed</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold">Document Retention</span>
                <span className="px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold">Passed</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold">Fair Lending Review</span>
                <span className="px-4 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm font-semibold">Passed</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Financial & Custom placeholder */}
      {(activeCategory === 'financial' || activeCategory === 'custom') && (
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-12 text-center">
          <FileText className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
          <h3 className="text-white text-xl font-semibold mb-2">
            {activeCategory === 'financial' ? 'Financial Reports' : 'Custom Report Builder'}
          </h3>
          <p className="text-[#9CA3AF]">This section is under development</p>
        </div>
      )}
    </div>
    </>
  );
};

export default Reports;