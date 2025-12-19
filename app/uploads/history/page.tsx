"use client"
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, RefreshCw, TrendingUp, Database } from 'lucide-react';
import { IngestApi, JobStatus } from '@/utils/apis/IngestApi';

export default function UploadHistoryPage() {
  const [jobs, setJobs] = useState<JobStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  // Mock job IDs for demo - in real app, these would come from a list endpoint
  const mockJobIds = [
    '660e8400-e29b-41d4-a716-446655440001',
    '770e8400-e29b-41d4-a716-446655440002',
  ];

  const fetchJobStatuses = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobStatuses = await Promise.all(
        mockJobIds.map(id => IngestApi.getJobStatus(id).catch(() => null))
      );
      setJobs(jobStatuses.filter(Boolean) as JobStatus[]);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch job history');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobStatuses();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchJobStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-400 bg-green-500/20';
      case 'processing':
      case 'pending':
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
      case 'pending':
        return Clock;
      case 'failed':
        return AlertCircle;
      default:
        return Database;
    }
  };

  const getProgressPercentage = (job: JobStatus) => {
    if (job.progress.total === 0) return 0;
    return (job.progress.processed / job.progress.total) * 100;
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#00D1D1] animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading upload history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Upload History</h1>
          <p className="text-gray-400">Track your data ingestion jobs</p>
        </div>
        <button
          onClick={fetchJobStatuses}
          disabled={loading}
          className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Total Jobs</p>
          <h3 className="text-3xl font-bold text-white">{jobs.length}</h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Completed</p>
          <h3 className="text-3xl font-bold text-green-400">
            {jobs.filter(j => j.status === 'completed').length}
          </h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Processing</p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {jobs.filter(j => j.status === 'processing' || j.status === 'pending').length}
          </h3>
        </div>
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-2">Total Records</p>
          <h3 className="text-3xl font-bold text-[#00D1D1]">
            {jobs.reduce((sum, j) => sum + j.progress.processed, 0).toLocaleString()}
          </h3>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-12 text-center">
            <Database className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No upload history</h3>
            <p className="text-gray-400">Your ingestion jobs will appear here</p>
          </div>
        ) : (
          jobs.map((job) => {
            const StatusIcon = getStatusIcon(job.status);
            const progress = getProgressPercentage(job);

            return (
              <div
                key={job.job_id}
                className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-[#00D1D1]/10 rounded-lg flex items-center justify-center">
                      <Database className="w-6 h-6 text-[#00D1D1]" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">{job.market}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(job.status)}`}>
                          <StatusIcon className="w-3 h-3" />
                          {job.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-gray-500">Job ID</p>
                          <p className="text-white font-mono text-xs">{job.job_id.slice(0, 8)}...</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Created</p>
                          <p className="text-white">{new Date(job.created_at).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Completed</p>
                          <p className="text-white">
                            {job.completed_at ? new Date(job.completed_at).toLocaleString() : 'In progress'}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Source</p>
                          <p className="text-white text-xs truncate">{job.original_url.split('/').pop()}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white">
                            {job.progress.processed.toLocaleString()} / {job.progress.total.toLocaleString()} records
                            {job.progress.failed > 0 && (
                              <span className="text-red-400 ml-2">({job.progress.failed} failed)</span>
                            )}
                          </span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#00D1D1] to-[#00B8B8] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Feed Counts */}
                      {Object.keys(job.feed_counts).length > 0 && (
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Feed Distribution</p>
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(job.feed_counts).map(([feed, count]) => (
                              <div
                                key={feed}
                                className="px-3 py-1 bg-[#00D1D1]/10 border border-[#00D1D1]/30 rounded-lg text-sm"
                              >
                                <span className="text-gray-400">{feed}:</span>
                                <span className="text-[#00D1D1] font-semibold ml-1">{count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(selectedJob === job.job_id ? null : job.job_id)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    {selectedJob === job.job_id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedJob === job.job_id && (
                  <div className="mt-4 pt-4 border-t border-gray-800">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-gray-400 mb-1">Full Job ID</p>
                        <p className="text-white font-mono text-xs break-all">{job.job_id}</p>
                      </div>
                      <div className="bg-black/30 rounded-lg p-3">
                        <p className="text-gray-400 mb-1">Original URL</p>
                        <p className="text-white text-xs break-all">{job.original_url}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}