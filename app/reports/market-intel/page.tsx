"use client"
import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, DollarSign, Home, Users, RefreshCw, Download, Search } from 'lucide-react';
import { MarketIntelApi, MarketIntelResponse, MarketPulseResponse, ZipInsight } from '@/utils/apis/MarketIntelApi';

export default function MarketIntelPage() {
  const [pulse, setPulse] = useState<MarketPulseResponse | null>(null);
  const [marketIntel, setMarketIntel] = useState<MarketIntelResponse | null>(null);
  const [selectedCity, setSelectedCity] = useState('Raleigh');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPulse = async () => {
    try {
      const data = await MarketIntelApi.getMarketPulse();
      setPulse(data);
    } catch (err: any) {
      console.error('Error fetching pulse:', err);
    }
  };

  const fetchMarketIntel = async (city: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await MarketIntelApi.getMarketIntel(city);
      setMarketIntel(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch market intelligence');
      console.error('Error fetching market intel:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPulse();
    fetchMarketIntel(selectedCity);
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    fetchMarketIntel(city);
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Platinum: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
      Gold: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-400',
      Silver: 'from-gray-400/20 to-gray-500/10 border-gray-400/30 text-gray-400',
      Nurture: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400',
    };
    return colors[tier] || 'from-gray-500/20 to-gray-600/10 border-gray-500/30 text-gray-400';
  };

  const getChurnColor = (churn: string) => {
    if (churn === 'High') return 'text-red-400 bg-red-500/20';
    if (churn === 'Medium') return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  if (loading && !marketIntel) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#00D1D1] animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading market intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Market Intelligence</h1>
          <p className="text-gray-400">Real-time market insights and analytics</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-2 text-white"
            >
              <option value="Raleigh">Raleigh, NC</option>
              <option value="Durham">Durham, NC</option>
              <option value="Cary">Cary, NC</option>
              <option value="Charlotte">Charlotte, NC</option>
            </select>
          </div>
          <button
            onClick={() => fetchMarketIntel(selectedCity)}
            className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Refresh
          </button>
        </div>
      </div>

      {/* Market Pulse Overview */}
      {pulse && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Market Pulse</h2>
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-2">Total Markets</p>
              <h3 className="text-3xl font-bold text-white">{pulse.total_markets}</h3>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-2">Total Records</p>
              <h3 className="text-3xl font-bold text-white">{pulse.total_records.toLocaleString()}</h3>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-2">Avg APS Score</p>
              <h3 className="text-3xl font-bold text-white">{pulse.avg_aps_score.toFixed(1)}</h3>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-2">Avg Churn Index</p>
              <h3 className="text-3xl font-bold text-white">{pulse.avg_churn_index.toFixed(1)}</h3>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-6">
              <p className="text-gray-400 text-sm mb-2">High Opportunity</p>
              <h3 className="text-3xl font-bold text-white">{pulse.high_opportunity_markets}</h3>
            </div>
          </div>

          {/* Top Markets */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Top Markets</h3>
            <div className="grid grid-cols-2 gap-4">
              {pulse.top_markets.map((market, idx) => (
                <div key={idx} className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold text-white">{market.city}, {market.state}</h4>
                      <p className="text-sm text-gray-400">{market.market_type}</p>
                    </div>
                    <span className="px-3 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded-full text-xs font-semibold">
                      #{idx + 1}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">APS Score</p>
                      <p className="text-white font-semibold">{market.avg_aps_score.toFixed(1)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Records</p>
                      <p className="text-white font-semibold">{market.total_records.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* City Market Intelligence */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {marketIntel && (
        <>
          {/* Summary Stats */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">{marketIntel.city}, {marketIntel.state} - Market Summary</h2>
            <div className="grid grid-cols-5 gap-4">
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Median LTV</p>
                <h3 className="text-2xl font-bold text-white">{marketIntel.summary.median_ltv.toFixed(1)}%</h3>
              </div>
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Median Equity</p>
                <h3 className="text-2xl font-bold text-green-400">${(marketIntel.summary.median_equity_dollar / 1000).toFixed(0)}k</h3>
              </div>
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">APS Score</p>
                <h3 className="text-2xl font-bold text-[#00D1D1]">{marketIntel.summary.median_aps_score.toFixed(1)}</h3>
              </div>
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Refi Opportunity</p>
                <h3 className="text-2xl font-bold text-yellow-400">{marketIntel.summary.refi_opportunity_pct.toFixed(1)}%</h3>
              </div>
              <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4">
                <p className="text-gray-400 text-xs mb-1">Market Type</p>
                <h3 className="text-lg font-bold text-white">{marketIntel.summary.market_type}</h3>
              </div>
            </div>
          </div>

          {/* Tier Distribution */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">Tier Distribution</h3>
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(marketIntel.tier_distribution).map(([tier, count]) => (
                <div key={tier} className={`bg-gradient-to-br ${getTierColor(tier)} border rounded-lg p-4`}>
                  <h4 className="text-lg font-bold mb-2">{tier}</h4>
                  <p className="text-3xl font-bold">{count}</p>
                  <p className="text-xs mt-1">
                    {((count / Object.values(marketIntel.tier_distribution).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ZIP Insights */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-white mb-4">ZIP Code Insights</h3>
            <div className="space-y-3">
              {marketIntel.zip_insights.map((zip, idx) => (
                <div key={idx} className="bg-black/50 border border-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white">ZIP {zip.zip_code}</h4>
                      <p className="text-sm text-gray-400">{zip.market_type}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getChurnColor(zip.churn_potential)}`}>
                        {zip.churn_potential} Churn
                      </span>
                      <span className="px-3 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded-full text-xs font-semibold">
                        {zip.opportunity_class}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Equity %</p>
                      <p className="text-white font-semibold">{zip.median_equity_pct.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">LTV %</p>
                      <p className="text-white font-semibold">{zip.median_ltv_pct.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Equity $</p>
                      <p className="text-green-400 font-semibold">${(zip.median_equity_dollar / 1000).toFixed(0)}k</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Records</p>
                      <p className="text-white font-semibold">{zip.record_count}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Class</p>
                      <p className="text-[#00D1D1] font-semibold">{zip.opportunity_class}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Opportunities */}
          {marketIntel.top_opportunities && marketIntel.top_opportunities.length > 0 && (
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Top Opportunities</h3>
              <div className="space-y-3">
                {marketIntel.top_opportunities.map((opp, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">{opp.address}</h4>
                        <p className="text-sm text-gray-400">{opp.city}, {opp.state} {opp.zip_code}</p>
                      </div>
                      <span className={`px-3 py-1 bg-gradient-to-br ${getTierColor(opp.tier)} border rounded-full text-xs font-semibold`}>
                        {opp.tier}
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Est Value</p>
                        <p className="text-white font-semibold">${(opp.est_value / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Loan Balance</p>
                        <p className="text-white font-semibold">${(opp.total_loan_bal / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Equity</p>
                        <p className="text-green-400 font-semibold">${(opp.equity / 1000).toFixed(0)}k</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Equity %</p>
                        <p className="text-white font-semibold">{opp.equity_pct.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">LTV</p>
                        <p className="text-white font-semibold">{opp.ltv.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">APS Score</p>
                        <p className="text-[#00D1D1] font-semibold">{opp.aps_score.toFixed(1)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Narrative */}
          <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Market Narrative</h3>
            <p className="text-gray-300 leading-relaxed">{marketIntel.narrative}</p>
            <div className="mt-4 flex gap-3">
              <button className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
              <button className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Share Insights
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}