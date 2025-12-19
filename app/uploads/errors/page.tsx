"use client";

import React, { useState } from 'react';
import { AlertCircle, XCircle, FileText, RefreshCw, Download, Filter, Search, CheckCircle, Clock, User, Database } from 'lucide-react';

type ErrorSeverity = 'error' | 'warning' | 'info';

type ErrorStatus = 'pending' | 'resolved' | 'auto-resolved';

type ErrorLog = {
  id: number;
  fileName: string;
  uploadDate: string;
  errorType: 'Validation' | 'Format' | 'Missing Data' | 'Duplicate' | 'System';
  severity: ErrorSeverity;
  description: string;
  field: string;
  value: string | null;
  expected: string;
  row: number | null;
  status: ErrorStatus;
  user: string;
};

const ErrorLogs = () => {
  const [filter, setFilter] = useState('all');
  const [selectedError, setSelectedError] = useState<ErrorLog | null>(null);

  const errorLogs: ErrorLog[] = [
    {
      id: 1,
      fileName: 'Realtor_Referrals_Q3.xlsx',
      uploadDate: '2025-11-18 09:15',
      errorType: 'Validation',
      severity: 'warning',
      description: 'Invalid phone number format',
      field: 'phone',
      value: '5551234567',
      expected: '(555) 123-4567',
      row: 42,
      status: 'pending',
      user: 'Lisa Wang'
    },
    {
      id: 2,
      fileName: 'Client_Documents_Batch.zip',
      uploadDate: '2025-11-12 11:20',
      errorType: 'Format',
      severity: 'error',
      description: 'Unsupported file format',
      field: 'file_type',
      value: 'ZIP',
      expected: 'PDF, DOC, DOCX, JPG, PNG',
      row: null,
      status: 'resolved',
      user: 'Sarah Chen'
    },
    {
      id: 3,
      fileName: 'Q3_Applications.json',
      uploadDate: '2025-11-10 08:30',
      errorType: 'Missing Data',
      severity: 'warning',
      description: 'Required field missing',
      field: 'email',
      value: null,
      expected: 'Valid email address',
      row: 156,
      status: 'pending',
      user: 'John Smith'
    },
    {
      id: 4,
      fileName: 'October_Contacts.csv',
      uploadDate: '2025-11-05 13:15',
      errorType: 'Duplicate',
      severity: 'info',
      description: 'Duplicate record detected',
      field: 'email',
      value: 'john.doe@email.com',
      expected: 'Unique email',
      row: 89,
      status: 'auto-resolved',
      user: 'Lisa Wang'
    },
    {
      id: 5,
      fileName: 'Property_Listings.csv',
      uploadDate: '2025-10-28 16:20',
      errorType: 'Validation',
      severity: 'error',
      description: 'Loan amount out of range',
      field: 'loan_amount',
      value: '$0',
      expected: '$10,000 - $5,000,000',
      row: 234,
      status: 'resolved',
      user: 'Mike Johnson'
    },
    {
      id: 6,
      fileName: 'September_Leads.xlsx',
      uploadDate: '2025-10-15 10:45',
      errorType: 'System',
      severity: 'error',
      description: 'Database connection timeout',
      field: 'system',
      value: null,
      expected: 'Successful connection',
      row: null,
      status: 'resolved',
      user: 'John Smith'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Errors', count: errorLogs.length },
    { id: 'pending', label: 'Pending', count: errorLogs.filter(e => e.status === 'pending').length },
    { id: 'resolved', label: 'Resolved', count: errorLogs.filter(e => e.status === 'resolved').length },
    { id: 'validation', label: 'Validation', count: errorLogs.filter(e => e.errorType === 'Validation').length },
    { id: 'system', label: 'System', count: errorLogs.filter(e => e.errorType === 'System').length }
  ];

  const getSeverityColor = (severity: ErrorSeverity): string => {
    switch(severity) {
      case 'error': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'info': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: ErrorStatus): string => {
    switch(status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'auto-resolved': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getErrorTypeIcon = (type: ErrorLog['errorType']) => {
    switch(type) {
      case 'Validation': return AlertCircle;
      case 'Format': return FileText;
      case 'Missing Data': return Database;
      case 'Duplicate': return User;
      case 'System': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const filteredErrors = errorLogs.filter(error => {
    if (filter !== 'all') {
      if (filter === 'pending' && error.status !== 'pending') return false;
      if (filter === 'resolved' && error.status !== 'resolved') return false;
      if (filter === 'validation' && error.errorType !== 'Validation') return false;
      if (filter === 'system' && error.errorType !== 'System') return false;
    }
    return true;
  });

  const errorStats = {
    total: errorLogs.length,
    pending: errorLogs.filter(e => e.status === 'pending').length,
    resolved: errorLogs.filter(e => e.status === 'resolved' || e.status === 'auto-resolved').length,
    errorRate: Math.round((errorLogs.length / 100) * 100) // Example calculation
  };

  const handleResolveError = (id: number) => {
    // In a real app, this would update the error status
    console.log(`Resolving error ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Error Logs</h2>
          <p className="text-[#9CA3AF]">Monitor and resolve upload errors</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Error Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Errors</p>
          <h3 className="text-3xl font-bold text-white">{errorStats.total}</h3>
          <p className="text-red-400 text-sm font-semibold mt-2">All time errors</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Pending Resolution</p>
          <h3 className="text-3xl font-bold text-white">{errorStats.pending}</h3>
          <p className="text-yellow-400 text-sm font-semibold mt-2">Require attention</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Resolved</p>
          <h3 className="text-3xl font-bold text-white">{errorStats.resolved}</h3>
          <p className="text-green-400 text-sm font-semibold mt-2">Completed</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Error Rate</p>
          <h3 className="text-3xl font-bold text-white">{errorStats.errorRate}%</h3>
          <p className="text-blue-400 text-sm font-semibold mt-2">Of total uploads</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 text-[#9CA3AF] absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search error logs..."
                className="w-full pl-10 pr-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
          </div>
          <div className="flex gap-2">
            {filters.map((filterItem) => (
              <button
                key={filterItem.id}
                onClick={() => setFilter(filterItem.id)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  filter === filterItem.id
                    ? 'bg-[#00D1D1] text-white'
                    : 'bg-[#2A2A2A] text-[#9CA3AF] hover:text-white'
                }`}
              >
                <span>{filterItem.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  filter === filterItem.id ? 'bg-white/20' : 'bg-[#1A1A1A]'
                }`}>
                  {filterItem.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Logs Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800 bg-[#2A2A2A]">
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Error Details</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">File & Field</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Severity</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Status</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">User</th>
              <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredErrors.map((error) => {
              const ErrorIcon = getErrorTypeIcon(error.errorType);
              return (
                <tr 
                  key={error.id} 
                  className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                  onClick={() => setSelectedError(error)}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <ErrorIcon className={`w-5 h-5 mt-1 ${error.severity === 'error' ? 'text-red-400' : 'text-yellow-400'}`} />
                      <div>
                        <h4 className="text-white font-semibold">{error.description}</h4>
                        <p className="text-[#9CA3AF] text-sm mt-1">{error.uploadDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="text-white font-medium text-sm">{error.fileName}</div>
                      <div className="text-[#9CA3AF] text-xs">
                        Field: {error.field} {error.row && `• Row: ${error.row}`}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(error.severity)}`}>
                      {error.severity}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(error.status)}`}>
                      {error.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-white">{error.user}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {error.status === 'pending' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolveError(error.id);
                          }}
                          className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                        >
                          Resolve
                        </button>
                      )}
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Error Detail Panel */}
      {selectedError && (
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="text-white text-xl font-semibold">Error Details</h3>
                <p className="text-[#9CA3AF]">Row {selectedError.row || 'N/A'} • {selectedError.fileName}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedError(null)}
              className="p-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Error Type</h4>
                <p className="text-white font-semibold">{selectedError.errorType}</p>
              </div>
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Field</h4>
                <p className="text-white font-semibold">{selectedError.field}</p>
              </div>
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Uploaded By</h4>
                <p className="text-white font-semibold">{selectedError.user}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Value Found</h4>
                <p className="text-red-400 font-semibold">{selectedError.value || 'Empty'}</p>
              </div>
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Expected Format</h4>
                <p className="text-green-400 font-semibold">{selectedError.expected}</p>
              </div>
              <div>
                <h4 className="text-[#9CA3AF] text-sm mb-1">Upload Date</h4>
                <p className="text-white font-semibold">{selectedError.uploadDate}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-[#9CA3AF] text-sm mb-2">Error Description</h4>
            <p className="text-white p-4 bg-[#2A2A2A] rounded-lg">{selectedError.description}</p>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6">
            <h4 className="text-white font-semibold mb-2">Resolution Options</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="resolution" className="w-4 h-4 accent-[#00D1D1]" />
                <span className="text-white">Skip this record</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="resolution" className="w-4 h-4 accent-[#00D1D1]" />
                <span className="text-white">Manually correct value</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="resolution" className="w-4 h-4 accent-[#00D1D1]" />
                <span className="text-white">Use default value</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="resolution" className="w-4 h-4 accent-[#00D1D1]" />
                <span className="text-white">Mark as exception</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setSelectedError(null)}
              className="px-6 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">
              Mark as Resolved
            </button>
          </div>
        </div>
      )}

      {/* Common Error Patterns */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Common Error Patterns</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h4 className="text-white font-semibold">Phone Format</h4>
            </div>
            <p className="text-gray-400 text-sm mb-2">Most common error (42%)</p>
            <p className="text-white text-sm">Expected: (555) 123-4567</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <h4 className="text-white font-semibold">Missing Email</h4>
            </div>
            <p className="text-gray-400 text-sm mb-2">28% of all errors</p>
            <p className="text-white text-sm">Required for follow-up</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-blue-400" />
              <h4 className="text-white font-semibold">File Format</h4>
            </div>
            <p className="text-gray-400 text-sm mb-2">15% of all errors</p>
            <p className="text-white text-sm">Supported: CSV, XLSX, XLS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorLogs;