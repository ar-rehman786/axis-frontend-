"use client"
import React, { useState, useEffect } from 'react';
import { FileText, Download, Clock, CheckCircle, AlertCircle, RefreshCw, Filter } from 'lucide-react';
import { ReportsApi, ReportStatus } from '@/utils/apis/ReportsApi';

export default function ReportsListPage() {
  const [reports, setReports] = useState<ReportStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'processing' | 'failed'>('all');

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await ReportsApi.listReports();
      setReports(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch reports');
      console.error('Error fetching reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownloadPDF = async (reportId: string) => {
    try {
      const blob = await ReportsApi.downloadReportPDF(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      alert('Failed to download PDF: ' + err.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400 bg-green-500/20';
      case 'processing':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'failed':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return CheckCircle;
      case 'processing':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return FileText;
    }
  };

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true;
    return report.status.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#00D1D1] animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Reports</h1>
          <p className="text-gray-400">View and download generated reports</p>
        </div>
        <button
          onClick={fetchReports}
          className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <Filter className="w-5 h-5 text-gray-400" />
        <div className="flex gap-2">
          {['all', 'completed', 'processing', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${filter === status
                  ? 'bg-[#00D1D1] text-white'
                  : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-gray-700'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
        <span className="text-gray-400 ml-auto">
          {filteredReports.length} of {reports.length} reports
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-12 text-center">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No reports found</h3>
            <p className="text-gray-400">
              {filter === 'all' ? 'No reports available' : `No ${filter} reports`}
            </p>
          </div>
        ) : (
          filteredReports.map((report) => {
            const StatusIcon = getStatusIcon(report.status);
            return (
              <div
                key={report.id}
                className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-[#00D1D1]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#00D1D1]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{report.original_filename}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(report.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {report.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Report ID</p>
                          <p className="text-white font-mono text-xs">{report.id.slice(0, 8)}...</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Created</p>
                          <p className="text-white">{new Date(report.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Completed</p>
                          <p className="text-white">
                            {report.completed_at ? new Date(report.completed_at).toLocaleString() : 'In progress'}
                          </p>
                        </div>
                      </div>

                      {report.error_message && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3">
                          <p className="text-red-400 text-sm">{report.error_message}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {report.status === 'completed' && (
                      <button
                        onClick={() => handleDownloadPDF(report.id)}
                        className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                    )}
                    <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Total Reports</p>
          <h3 className="text-3xl font-bold text-white">{reports.length}</h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Completed</p>
          <h3 className="text-3xl font-bold text-green-400">
            {reports.filter(r => r.status === 'completed').length}
          </h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Processing</p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {reports.filter(r => r.status === 'processing').length}
          </h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Failed</p>
          <h3 className="text-3xl font-bold text-red-400">
            {reports.filter(r => r.status === 'failed').length}
          </h3>
        </div>
      </div>
    </div>
  );
}