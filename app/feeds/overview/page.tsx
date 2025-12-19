"use client"
import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, Database, Activity, RefreshCw } from 'lucide-react';
import { FeedsApi, FeedStatsResponse, FeedConfig } from '@/utils/apis/FeedsApi';

export default function FeedsOverviewPage() {
  const [stats, setStats] = useState<FeedStatsResponse | null>(null);
  const [configs, setConfigs] = useState<FeedConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [statsData, configsData] = await Promise.all([
        FeedsApi.getFeedStats(),
        FeedsApi.getFeedConfigs()
      ]);
      setStats(statsData);
      setConfigs(configsData);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch feed data');
      console.error('Error fetching feeds data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier.toUpperCase()) {
      case 'PREMIUM':
        return 'from-yellow-500/20 to-orange-500/10 border-yellow-500/30';
      case 'BASIC':
        return 'from-blue-500/20 to-cyan-500/10 border-blue-500/30';
      default:
        return 'from-gray-500/20 to-gray-600/10 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#00D1D1] animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading feed data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Feed Overview</h1>
          <p className="text-gray-400">Monitor and manage your data feeds</p>
        </div>
        <button
          onClick={fetchData}
          className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Refresh
        </button>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-8 h-8 text-[#00D1D1]" />
              <p className="text-gray-400 text-sm">Total Feeds Processed</p>
            </div>
            <h3 className="text-4xl font-bold text-white">{stats.total_feeds_processed}</h3>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Activity className="w-8 h-8 text-purple-400" />
              <p className="text-gray-400 text-sm">Total Records</p>
            </div>
            <h3 className="text-4xl font-bold text-white">{stats.total_records.toLocaleString()}</h3>
          </div>

          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <p className="text-gray-400 text-sm">Avg Records/Feed</p>
            </div>
            <h3 className="text-4xl font-bold text-white">{stats.avg_records_per_feed}</h3>
          </div>

          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Package className="w-8 h-8 text-orange-400" />
              <p className="text-gray-400 text-sm">Feed Types</p>
            </div>
            <h3 className="text-4xl font-bold text-white">{Object.keys(stats.feed_breakdown).length}</h3>
          </div>
        </div>
      )}

      {/* Feed Breakdown */}
      {stats && (
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Feed Breakdown</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(stats.feed_breakdown).map(([feedType, count]) => (
              <div key={feedType} className="bg-black/50 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{feedType.replace(/_/g, ' ')}</p>
                  <p className="text-2xl font-bold text-white">{count} feeds</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {((count / stats.total_feeds_processed) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Feed Configurations */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Available Feed Types</h2>
        <div className="grid grid-cols-3 gap-6">
          {configs.map((config) => (
            <div
              key={config.feed_type}
              className={`bg-gradient-to-br ${getTierColor(config.pricing_tier)} border rounded-xl p-6 hover:scale-105 transition-transform`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{config.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.pricing_tier === 'PREMIUM'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                    }`}>
                    {config.pricing_tier}
                  </span>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>

              <p className="text-gray-400 text-sm mb-4">{config.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Pages:</span>
                <span className="text-white font-semibold">{config.page_count}</span>
              </div>

              {config.required_columns && config.required_columns.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="text-xs text-gray-500 mb-2">Required Columns:</p>
                  <div className="flex flex-wrap gap-1">
                    {config.required_columns.slice(0, 3).map((col) => (
                      <span key={col} className="px-2 py-1 bg-black/50 text-gray-400 text-xs rounded">
                        {col}
                      </span>
                    ))}
                    {config.required_columns.length > 3 && (
                      <span className="px-2 py-1 bg-black/50 text-gray-400 text-xs rounded">
                        +{config.required_columns.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}