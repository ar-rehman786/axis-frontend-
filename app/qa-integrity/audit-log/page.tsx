"use client";

import React, { useState } from 'react';
import { Clock, Search, Filter, Download, Eye, CheckCircle, XCircle, User, Shield, Database, Calendar } from 'lucide-react';

const AuditLog = () => {
  const [dateRange, setDateRange] = useState('30days');
  const [userFilter, setUserFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const dateRanges = [
    { id: '7days', label: 'Last 7 Days' },
    { id: '30days', label: 'Last 30 Days' },
    { id: '90days', label: 'Last 90 Days' },
    { id: '365days', label: 'Last Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const userFilters = [
    { id: 'all', label: 'All Users' },
    { id: 'system', label: 'System' },
    { id: 'john', label: 'John Smith' },
    { id: 'lisa', label: 'Lisa Wang' },
    { id: 'mike', label: 'Mike Johnson' }
  ];

  const actionFilters = [
    { id: 'all', label: 'All Actions' },
    { id: 'data', label: 'Data Changes' },
    { id: 'security', label: 'Security' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'system', label: 'System Events' }
  ];

  const auditLogData = [
    {
      id: 1,
      user: 'John Smith',
      userType: 'admin',
      action: 'Merged duplicate records',
      target: '3 contacts (IDs: 145, 146, 147)',
      time: '2 hours ago',
      date: '2025-11-25 14:30',
      ip: '192.168.1.100',
      result: 'success',
      actionType: 'data',
      details: 'Merged duplicate contact records for Robert Johnson'
    },
    {
      id: 2,
      user: 'Lisa Wang',
      userType: 'manager',
      action: 'Updated data validation rules',
      target: 'Phone field validation',
      time: '5 hours ago',
      date: '2025-11-25 11:15',
      ip: '192.168.1.101',
      result: 'success',
      actionType: 'system',
      details: 'Updated phone number validation regex pattern'
    },
    {
      id: 3,
      user: 'System',
      userType: 'system',
      action: 'Automated data cleanup',
      target: '145 invalid email addresses',
      time: '1 day ago',
      date: '2025-11-24 03:00',
      ip: 'System',
      result: 'success',
      actionType: 'system',
      details: 'Removed invalid email addresses from database'
    },
    {
      id: 4,
      user: 'Mike Johnson',
      userType: 'user',
      action: 'Exported compliance report',
      target: 'Q4 2025 Compliance Report',
      time: '2 days ago',
      date: '2025-11-23 09:45',
      ip: '192.168.1.102',
      result: 'success',
      actionType: 'compliance',
      details: 'Exported comprehensive compliance audit report'
    },
    {
      id: 5,
      user: 'System',
      userType: 'system',
      action: 'Security audit completed',
      target: 'System security scan',
      time: '3 days ago',
      date: '2025-11-22 02:30',
      ip: 'System',
      result: 'success',
      actionType: 'security',
      details: 'Automated security audit detected no vulnerabilities'
    },
    {
      id: 6,
      user: 'John Smith',
      userType: 'admin',
      action: 'Modified user permissions',
      target: 'User: Lisa Wang',
      time: '4 days ago',
      date: '2025-11-21 16:20',
      ip: '192.168.1.100',
      result: 'success',
      actionType: 'security',
      details: 'Updated Lisa Wang permissions to Manager level'
    },
    {
      id: 7,
      user: 'Unauthorized User',
      userType: 'external',
      action: 'Failed login attempt',
      target: 'User account: admin',
      time: '5 days ago',
      date: '2025-11-20 22:15',
      ip: '203.0.113.5',
      result: 'failed',
      actionType: 'security',
      details: 'Multiple failed login attempts from suspicious IP'
    },
    {
      id: 8,
      user: 'Lisa Wang',
      userType: 'manager',
      action: 'Bulk contact import',
      target: '245 new leads',
      time: '1 week ago',
      date: '2025-11-19 10:30',
      ip: '192.168.1.101',
      result: 'success',
      actionType: 'data',
      details: 'Successfully imported lead list from CRM integration'
    }
  ];

  const logStats = {
    totalEvents: 8,
    successRate: 87.5,
    securityEvents: 3,
    dataEvents: 3,
    averageDaily: '1.2'
  };

  type ActionType = 'data' | 'security' | 'compliance' | 'system';
  type UserType = 'admin' | 'manager' | 'user' | 'system' | 'external';

  const getActionIcon = (actionType: ActionType) => {
    switch(actionType) {
      case 'data': return Database;
      case 'security': return Shield;
      case 'compliance': return Shield;
      case 'system': return Database;
      default: return Database;
    }
  };

  const getUserColor = (userType: UserType) => {
    switch(userType) {
      case 'admin': return 'bg-purple-500/20 text-purple-400';
      case 'manager': return 'bg-blue-500/20 text-blue-400';
      case 'user': return 'bg-green-500/20 text-green-400';
      case 'system': return 'bg-gray-500/20 text-gray-400';
      case 'external': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredLogs = auditLogData.filter(log => {
    if (userFilter !== 'all') {
      if (userFilter === 'system' && log.userType !== 'system') return false;
      if (userFilter === 'john' && log.user !== 'John Smith') return false;
      if (userFilter === 'lisa' && log.user !== 'Lisa Wang') return false;
      if (userFilter === 'mike' && log.user !== 'Mike Johnson') return false;
    }
    
    if (actionFilter !== 'all' && log.actionType !== actionFilter) return false;
    
    if (searchTerm && 
        !log.user.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !log.action.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !log.target.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">System Audit Log</h2>
          <p className="text-[#9CA3AF]">Track all system activities and user actions</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Log
          </button>
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
            Real-time View
          </button>
        </div>
      </div>

      {/* Log Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Events</p>
          <h3 className="text-3xl font-bold text-white">{logStats.totalEvents}</h3>
          <p className="text-[#9CA3AF] text-sm mt-2">In selected period</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Success Rate</p>
          <h3 className="text-3xl font-bold text-white">{logStats.successRate}%</h3>
          <p className="text-green-400 text-sm font-semibold mt-2">Excellent</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Security Events</p>
          <h3 className="text-3xl font-bold text-white">{logStats.securityEvents}</h3>
          <p className="text-blue-400 text-sm font-semibold mt-2">All normal</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Avg Daily Events</p>
          <h3 className="text-3xl font-bold text-white">{logStats.averageDaily}</h3>
          <p className="text-purple-400 text-sm font-semibold mt-2">Stable activity</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Date Range */}
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Date Range</label>
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            >
              {dateRanges.map((range) => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>

          {/* User Filter */}
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">User</label>
            <select 
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            >
              {userFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>{filter.label}</option>
              ))}
            </select>
          </div>

          {/* Action Filter */}
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Action Type</label>
            <select 
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="w-full px-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            >
              {actionFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>{filter.label}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Search</label>
            <div className="relative">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-gray-800 bg-[#2A2A2A]">
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">User / System</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Action</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Target</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Date & Time</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">IP Address</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Result</th>
                <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => {
                const ActionIcon = getActionIcon(log.actionType as ActionType);
                return (
                  <tr key={log.id} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full ${getUserColor(log.userType as UserType)} flex items-center justify-center`}>
                          {log.userType === 'system' ? (
                            <Database className="w-5 h-5" />
                          ) : (
                            <User className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <div className="text-white font-semibold">{log.user}</div>
                          <div className="text-[#9CA3AF] text-sm capitalize">{log.userType}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="w-4 h-4 text-[#00D1D1]" />
                        <span className="text-white">{log.action}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">{log.target}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-white">{log.time}</div>
                        <div className="text-[#9CA3AF] text-sm">{log.date}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        log.ip === 'System' ? 'bg-gray-500/20 text-gray-400' :
                        log.ip.startsWith('192.168') ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {log.ip}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        log.result === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {log.result === 'success' ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                        {log.result.charAt(0).toUpperCase() + log.result.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button 
                          className="p-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <span className="text-[#9CA3AF] text-sm truncate max-w-xs">
                          {log.details}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Activity Summary</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-3">Most Active Users</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">John Smith</span>
                <span className="text-white font-semibold">142 actions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">Lisa Wang</span>
                <span className="text-white font-semibold">89 actions</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">System</span>
                <span className="text-white font-semibold">45 actions</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-3">Common Actions</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">Data Modifications</span>
                <span className="text-white font-semibold">58%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">Security Events</span>
                <span className="text-white font-semibold">22%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">System Maintenance</span>
                <span className="text-white font-semibold">20%</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-3">Time Distribution</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">Business Hours (9-5)</span>
                <span className="text-white font-semibold">72%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">After Hours</span>
                <span className="text-white font-semibold">18%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF]">System Automation</span>
                <span className="text-white font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog;