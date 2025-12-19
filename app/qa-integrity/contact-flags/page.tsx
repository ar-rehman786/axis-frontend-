"use client";

import React, { useState } from 'react';
import { AlertTriangle, Shield, Ban, Clock, CheckCircle, XCircle, Search, Filter, Eye, User } from 'lucide-react';

const ContactFlags = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const flagTypes = [
    { id: 'all', label: 'All Flags', count: 48 },
    { id: 'compliance', label: 'Compliance', count: 12 },
    { id: 'duplicate', label: 'Duplicate', count: 18 },
    { id: 'invalid', label: 'Invalid Data', count: 24 },
    { id: 'risk', label: 'High Risk', count: 6 }
  ];

  const flaggedContacts = [
    {
      id: 1,
      name: 'John Williams',
      email: 'john.w@email.com',
      phone: '(555) 123-4567',
      flags: [
        { type: 'compliance', label: 'DNC Violation', severity: 'high', date: '2025-11-20' },
        { type: 'invalid', label: 'Invalid Address', severity: 'medium', date: '2025-11-19' }
      ],
      status: 'pending',
      lastContact: '2 days ago'
    },
    {
      id: 2,
      name: 'Sarah Davis',
      email: 'sarah.d@email.com',
      phone: '(555) 234-5678',
      flags: [
        { type: 'compliance', label: 'Missing Consent', severity: 'medium', date: '2025-11-19' }
      ],
      status: 'investigating',
      lastContact: '5 days ago'
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '(555) 345-6789',
      flags: [
        { type: 'compliance', label: 'TCPA Non-Compliance', severity: 'high', date: '2025-11-18' },
        { type: 'duplicate', label: 'Duplicate Record', severity: 'medium', date: '2025-11-17' }
      ],
      status: 'investigating',
      lastContact: '1 week ago'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      email: 'emily.w@email.com',
      phone: '(555) 456-7890',
      flags: [
        { type: 'compliance', label: 'Opt-Out Request', severity: 'low', date: '2025-11-17' }
      ],
      status: 'resolved',
      lastContact: '2 weeks ago'
    },
    {
      id: 5,
      name: 'Robert Johnson',
      email: 'robert.j@email.com',
      phone: '(555) 111-2222',
      flags: [
        { type: 'duplicate', label: '3 Duplicate Records', severity: 'high', date: '2025-11-16' },
        { type: 'invalid', label: 'Invalid Email Format', severity: 'medium', date: '2025-11-15' }
      ],
      status: 'pending',
      lastContact: '3 days ago'
    },
    {
      id: 6,
      name: 'Jennifer Smith',
      email: 'jen.smith@email.com',
      phone: '(555) 222-3333',
      flags: [
        { type: 'risk', label: 'High Risk Profile', severity: 'high', date: '2025-11-14' },
        { type: 'invalid', label: 'Missing ZIP Code', severity: 'low', date: '2025-11-13' }
      ],
      status: 'investigating',
      lastContact: '1 day ago'
    }
  ];

  const flagStats = {
    total: 48,
    resolved: 18,
    pending: 24,
    highSeverity: 12,
    averageAge: '3.2 days'
  };

  const getFlagIcon = (type: 'compliance' | 'duplicate' | 'invalid' | 'risk') => {
    switch(type) {
      case 'compliance': return Shield;
      case 'duplicate': return User;
      case 'invalid': return XCircle;
      case 'risk': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: 'high' | 'medium' | 'low'): string => {
    switch(severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: 'resolved' | 'pending' | 'investigating'): string => {
    switch(status) {
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'investigating': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredContacts = flaggedContacts.filter(contact => {
    if (filter !== 'all' && !contact.flags.some(f => f.type === filter)) return false;
    if (searchTerm && !contact.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !contact.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !contact.phone.includes(searchTerm)) return false;
    return true;
  });

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Contact Flags & Issues</h2>
          <p className="text-[#9CA3AF]">Monitor and resolve flagged contact records</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
            Bulk Actions
          </button>
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
            Export List
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-5 gap-6">
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Flags</p>
          <h3 className="text-3xl font-bold text-white">{flagStats.total}</h3>
          <p className="text-[#9CA3AF] text-sm mt-2">Active issues</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Resolved</p>
          <h3 className="text-3xl font-bold text-white">{flagStats.resolved}</h3>
          <p className="text-green-400 text-sm font-semibold mt-2">✓ Complete</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Pending</p>
          <h3 className="text-3xl font-bold text-white">{flagStats.pending}</h3>
          <p className="text-yellow-400 text-sm font-semibold mt-2">Requires action</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">High Severity</p>
          <h3 className="text-3xl font-bold text-white">{flagStats.highSeverity}</h3>
          <p className="text-red-400 text-sm font-semibold mt-2">Urgent attention</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/5 border border-gray-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Avg Age</p>
          <h3 className="text-3xl font-bold text-white">{flagStats.averageAge}</h3>
          <p className="text-[#9CA3AF] text-sm mt-2">Since flag creation</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts by name, email, or phone..."
              className="w-full pl-10 pr-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {flagTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilter(type.id)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                filter === type.id
                  ? 'bg-[#00D1D1] text-white'
                  : 'bg-[#2A2A2A] text-[#9CA3AF] hover:text-white'
              }`}
            >
              <span>{type.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === type.id ? 'bg-white/20' : 'bg-[#1A1A1A]'
              }`}>
                {type.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Flagged Contacts Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-[#2A2A2A]">
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Contact</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Flags</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Status</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Last Contact</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact) => (
              <tr key={contact.id} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center text-white font-bold">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{contact.name}</div>
                      <div className="text-[#9CA3AF] text-sm">{contact.email}</div>
                      <div className="text-[#9CA3AF] text-sm">{contact.phone}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="space-y-2">
                    {contact.flags.map((flag, idx) => {
                      const Icon = getFlagIcon(flag.type as 'compliance' | 'duplicate' | 'invalid' | 'risk');
                      return (
                        <div key={idx} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getSeverityColor(flag.severity as 'high' | 'medium' | 'low')}`}>
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{flag.label}</span>
                          <span className="text-xs opacity-75 ml-auto">{flag.date}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${getStatusColor(contact.status as 'resolved' | 'pending' | 'investigating')}`}>
                    {contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}
                  </span>
                </td>
                <td className="py-4 px-6 text-white">
                  {contact.lastContact}
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="p-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors" title="Resolve">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors" title="Block">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Flag Resolution Actions */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Common Resolution Actions</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="p-4 bg-[#2A2A2A] rounded-lg text-center">
            <div className="w-12 h-12 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Mark as Verified</h4>
            <p className="text-[#9CA3AF] text-sm">For legitimate contacts with minor issues</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg text-center">
            <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Merge Duplicates</h4>
            <p className="text-[#9CA3AF] text-sm">Combine duplicate contact records</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg text-center">
            <div className="w-12 h-12 mx-auto bg-yellow-500/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-yellow-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Compliance Review</h4>
            <p className="text-[#9CA3AF] text-sm">Manual compliance verification</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg text-center">
            <div className="w-12 h-12 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4">
              <Ban className="w-6 h-6 text-red-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Block Contact</h4>
            <p className="text-[#9CA3AF] text-sm">For spam or high-risk contacts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactFlags;