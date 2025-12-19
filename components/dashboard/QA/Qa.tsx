import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Search, Filter, RefreshCw, Database, FileCheck } from 'lucide-react';

// Mock Data
const dataQualityMetrics: {
  completeness: number;
  accuracy: number;
  duplicates: number;
  invalidData: number;
  overallScore: number;
} = {
  completeness: 94.5,
  accuracy: 96.8,
  duplicates: 2.3,
  invalidData: 1.2,
  overallScore: 95.2
};

const complianceIssues: Array<{
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low';
  contact: string;
  phone: string;
  date: string;
  status: 'resolved' | 'pending' | 'investigating';
}> = [
  { id: 1, type: 'DNC Violation', severity: 'high', contact: 'John Williams', phone: '(555) 123-4567', date: '2025-11-20', status: 'resolved' },
  { id: 2, type: 'Missing Consent', severity: 'medium', contact: 'Sarah Davis', phone: '(555) 234-5678', date: '2025-11-19', status: 'pending' },
  { id: 3, type: 'TCPA Non-Compliance', severity: 'high', contact: 'Michael Brown', phone: '(555) 345-6789', date: '2025-11-18', status: 'investigating' },
  { id: 4, type: 'Opt-Out Request', severity: 'low', contact: 'Emily Wilson', phone: '(555) 456-7890', date: '2025-11-17', status: 'resolved' }
];

const duplicateRecords: Array<{
  id: number;
  name: string;
  phone: string;
  email: string;
  count: number;
  lastSeen: string;
}> = [
  { id: 1, name: 'Robert Johnson', phone: '(555) 111-2222', email: 'robert.j@email.com', count: 3, lastSeen: '2 days ago' },
  { id: 2, name: 'Jennifer Smith', phone: '(555) 222-3333', email: 'jen.smith@email.com', count: 2, lastSeen: '5 days ago' },
  { id: 3, name: 'David Lee', phone: '(555) 333-4444', email: 'dlee@email.com', count: 2, lastSeen: '1 week ago' }
];

const dataAnomalies: Array<{
  id: number;
  field: string;
  issue: string;
  records: number;
  example: string;
}> = [
  { id: 1, field: 'Email', issue: 'Invalid format', records: 45, example: 'user@invalid' },
  { id: 2, field: 'Phone', issue: 'Incomplete number', records: 23, example: '(555) 12-' },
  { id: 3, field: 'Address', issue: 'Missing ZIP code', records: 67, example: '123 Main St, City' },
  { id: 4, field: 'Loan Amount', issue: 'Out of range', records: 12, example: '$0 or $9,999,999+' }
];

const auditLog: Array<{
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  result: 'success' | 'failed';
}> = [
  { id: 1, user: 'John Smith', action: 'Merged duplicate records', target: '3 contacts', time: '2 hours ago', result: 'success' },
  { id: 2, user: 'Lisa Wang', action: 'Updated data validation rules', target: 'Phone field', time: '5 hours ago', result: 'success' },
  { id: 3, user: 'System', action: 'Automated cleanup', target: '145 invalid emails', time: '1 day ago', result: 'success' },
  { id: 4, user: 'Mike Johnson', action: 'Exported compliance report', target: 'Q4 2025', time: '2 days ago', result: 'success' }
];

const QAIntegrity = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'compliance' | 'duplicates' | 'audit'>('overview');

  const tabs: Array<{
    id: 'overview' | 'compliance' | 'duplicates' | 'audit';
    label: string;
    icon: any;
  }> = [
    { id: 'overview', label: 'Data Quality', icon: Database },
    { id: 'compliance', label: 'Compliance', icon: Shield },
    { id: 'duplicates', label: 'Duplicates', icon: FileCheck },
    { id: 'audit', label: 'Audit Trail', icon: Clock }
  ];

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">QA & Data Integrity</h1>
          <p className="text-[#9CA3AF]">Monitor data quality, compliance, and system integrity</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2 font-semibold">
            <Shield className="w-4 h-4" />
            Run Full Audit
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-800">
        {tabs.map((tab: {
      id: 'overview' | 'compliance' | 'duplicates' | 'audit';
      label: string;
      icon: any;
    }) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-[#00D1D1] border-b-2 border-[#00D1D1]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Data Quality Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-8 text-center">
            <h2 className="text-[#9CA3AF] text-lg mb-4">Overall Data Quality Score</h2>
            <div className="relative inline-block">
              <div className="text-7xl font-bold text-white">{dataQualityMetrics.overallScore}</div>
              <span className="text-3xl text-[#9CA3AF]">/100</span>
            </div>
            <p className="text-teal-400 font-semibold mt-4 text-lg">Excellent Health</p>
          </div>

          {/* Quality Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#9CA3AF] text-sm">Completeness</p>
                <CheckCircle className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.completeness}%</h3>
              <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
                  style={{ width: `${dataQualityMetrics.completeness}%` }}
                />
              </div>
            </div>

            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#9CA3AF] text-sm">Accuracy</p>
                <CheckCircle className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{dataQualityMetrics.accuracy}%</h3>
              <div className="w-full bg-[#2A2A2A] rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full"
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

          {/* Data Anomalies */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-semibold">Data Anomalies Detected</h3>
              <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors text-sm font-semibold">
                Fix All
              </button>
            </div>
            
            <div className="space-y-3">
              {dataAnomalies.map((anomaly: {
        id: number;
        field: string;
        issue: string;
        records: number;
        example: string;
      }) => (
                <div key={anomaly.id} className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                    <div>
                      <h4 className="text-white font-semibold">{anomaly.field}: {anomaly.issue}</h4>
                      <p className="text-[#9CA3AF] text-sm">
                        {anomaly.records} records affected • Example: {anomaly.example}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors text-sm">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Validation Rules */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-xl font-semibold mb-4">Active Validation Rules</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Email Format</span>
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-[#9CA3AF] text-sm">RFC 5322 compliant email validation</p>
              </div>

              <div className="p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Phone Number</span>
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-[#9CA3AF] text-sm">US format: (XXX) XXX-XXXX</p>
              </div>

              <div className="p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Address Standardization</span>
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-[#9CA3AF] text-sm">USPS address verification</p>
              </div>

              <div className="p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">Required Fields</span>
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                </div>
                <p className="text-[#9CA3AF] text-sm">Name, Contact, Property Address</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          {/* Compliance Score */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">DNC Compliance</p>
              <h3 className="text-3xl font-bold text-white mb-2">98.5%</h3>
              <p className="text-teal-400 text-sm font-semibold">Excellent</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">TCPA Adherence</p>
              <h3 className="text-3xl font-bold text-white mb-2">99.2%</h3>
              <p className="text-teal-400 text-sm font-semibold">Excellent</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Consent Tracking</p>
              <h3 className="text-3xl font-bold text-white mb-2">96.8%</h3>
              <p className="text-teal-400 text-sm font-semibold">Good</p>
            </div>

            <div className="bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Disclosure Rate</p>
              <h3 className="text-3xl font-bold text-white mb-2">100%</h3>
              <p className="text-teal-400 text-sm font-semibold">Perfect</p>
            </div>
          </div>

          {/* Compliance Issues */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-semibold">Compliance Issues</h3>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Export Report
                </button>
              </div>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Contact</th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Phone</th>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Date</th>
                  <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Severity</th>
                  <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Status</th>
                  <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {complianceIssues.map((issue: {
          id: number;
          type: string;
          severity: 'high' | 'medium' | 'low';
          contact: string;
          phone: string;
          date: string;
          status: 'resolved' | 'pending' | 'investigating';
        }) => (
                  <tr key={issue.id} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-4 text-white font-semibold">{issue.type}</td>
                    <td className="py-4 px-4 text-white">{issue.contact}</td>
                    <td className="py-4 px-4 text-white">{issue.phone}</td>
                    <td className="py-4 px-4 text-white">{issue.date}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        issue.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        issue.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {issue.severity}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        issue.status === 'resolved' ? 'bg-teal-500/20 text-teal-400' :
                        issue.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="px-4 py-1 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors text-sm">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Duplicates Tab */}
      {activeTab === 'duplicates' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-white text-xl font-semibold mb-2">Duplicate Records</h3>
                <p className="text-[#9CA3AF]">{duplicateRecords.length} duplicate groups found</p>
              </div>
              <button className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
                Merge All
              </button>
            </div>

            <div className="space-y-4">
              {duplicateRecords.map((record: {
        id: number;
        name: string;
        phone: string;
        email: string;
        count: number;
        lastSeen: string;
      }) => (
                <div key={record.id} className="bg-[#2A2A2A] border border-gray-700 rounded-lg p-6 hover:border-[#00D1D1]/30 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-white font-semibold text-lg">{record.name}</h4>
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
                          {record.count} duplicates
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Phone</p>
                          <p className="text-white font-semibold">{record.phone}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Email</p>
                          <p className="text-white font-semibold">{record.email}</p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Last Seen</p>
                          <p className="text-white font-semibold">{record.lastSeen}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
                        Merge
                      </button>
                      <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-white text-xl font-semibold">System Audit Log</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    type="text"
                    placeholder="Search actions..."
                    className="pl-10 pr-4 py-2 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
                  />
                </div>
                <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Export Log
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {auditLog.map((log: {
        id: number;
        user: string;
        action: string;
        target: string;
        time: string;
        result: 'success' | 'failed';
      }) => (
                <div key={log.id} className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00D1D1]/20 flex items-center justify-center">
                      {log.result === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-teal-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    
                    <div>
                      <p className="text-white mb-1">
                        <span className="font-semibold">{log.user}</span>
                        <span className="text-[#9CA3AF]"> {log.action}</span>
                      </p>
                      <p className="text-[#9CA3AF] text-sm">
                        Target: {log.target} • {log.time}
                      </p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    log.result === 'success' ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {log.result}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAIntegrity;