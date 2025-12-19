"use client";
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Bitcoin, Coins, DollarSign, AlertCircle, LineChart, PieChart } from 'lucide-react';

const CryptoFeed = () => {
  const [timeRange, setTimeRange] = useState('24h');

  const timeRanges = [
    { id: '1h', label: '1H' },
    { id: '24h', label: '24H' },
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' }
  ];

  const cryptoData = [
    { 
      symbol: 'BTC', 
      name: 'Bitcoin', 
      price: '$43,250', 
      change: '+2.45%', 
      trend: 'up',
      volume: '$28.4B',
      marketCap: '$845B',
      correlation: 0.78,
      icon: Bitcoin,
      color: 'text-yellow-500'
    },
    { 
      symbol: 'ETH', 
      name: 'Ethereum', 
      price: '$2,380', 
      change: '+1.23%', 
      trend: 'up',
      volume: '$14.2B',
      marketCap: '$285B',
      correlation: 0.65,
      icon: Bitcoin,
      color: 'text-purple-500'
    },
    { 
      symbol: 'SOL', 
      name: 'Solana', 
      price: '$98.45', 
      change: '-3.21%', 
      trend: 'down',
      volume: '$3.8B',
      marketCap: '$42B',
      correlation: 0.42,
      icon: PieChart,
      color: 'text-pink-500'
    },
    { 
      symbol: 'XRP', 
      name: 'Ripple', 
      price: '$0.62', 
      change: '+0.85%', 
      trend: 'up',
      volume: '$2.1B',
      marketCap: '$33B',
      correlation: 0.31,
      icon: DollarSign,
      color: 'text-blue-500'
    },
    { 
      symbol: 'ADA', 
      name: 'Cardano', 
      price: '$0.58', 
      change: '-1.45%', 
      trend: 'down',
      volume: '$0.8B',
      marketCap: '$20B',
      correlation: 0.28,
      icon: LineChart,
      color: 'text-cyan-500'
    }
  ];

  const cryptoNews = [
    {
      id: 1,
      title: 'Bitcoin ETF Approval Expected',
      description: 'SEC expected to approve spot Bitcoin ETF in Q1 2024',
      source: 'Bloomberg',
      time: '2 hours ago',
      impact: 'high'
    },
    {
      id: 2,
      title: 'Ethereum Shanghai Upgrade',
      description: 'Next major upgrade scheduled for March 2024',
      source: 'CoinDesk',
      time: '5 hours ago',
      impact: 'medium'
    },
    {
      id: 3,
      title: 'Fed Digital Currency Research',
      description: 'Federal Reserve accelerates CBDC research program',
      source: 'WSJ',
      time: '1 day ago',
      impact: 'high'
    }
  ];

  const cryptoMetrics = {
    totalMarketCap: '$1.65T',
    dominance: { btc: 52.3, eth: 17.8, others: 29.9 },
    fearGreedIndex: 68,
    volatilityIndex: 42
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Cryptocurrency Intelligence</h2>
          <p className="text-[#9CA3AF]">Real-time crypto prices, news, and market sentiment</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#2A2A2A] rounded-lg">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeRange === range.id
                    ? 'bg-[#00D1D1] text-white'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
            Watch Portfolio
          </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Market Cap</p>
          <h3 className="text-3xl font-bold text-white mb-2">{cryptoMetrics.totalMarketCap}</h3>
          <div className="flex items-center text-green-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">+4.2% today</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">BTC Dominance</p>
          <h3 className="text-3xl font-bold text-white mb-2">{cryptoMetrics.dominance.btc}%</h3>
          <div className="flex items-center text-red-400">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">-0.8% this week</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Fear & Greed Index</p>
          <h3 className="text-3xl font-bold text-white mb-2">{cryptoMetrics.fearGreedIndex}</h3>
          <p className="text-yellow-400 text-sm font-semibold">Greed</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Volatility Index</p>
          <h3 className="text-3xl font-bold text-white mb-2">{cryptoMetrics.volatilityIndex}</h3>
          <p className="text-yellow-400 text-sm font-semibold">Moderate</p>
        </div>
      </div>

      {/* Cryptocurrency Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Top Cryptocurrencies</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Asset</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Price</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">24h Change</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Volume (24h)</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Market Cap</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Correlation</th>
              <th className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, idx) => {
              const Icon = crypto.icon;
              return (
                <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${crypto.color} bg-opacity-20 flex items-center justify-center`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">{crypto.symbol}</div>
                        <div className="text-[#9CA3AF] text-sm">{crypto.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-white font-semibold">{crypto.price}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      crypto.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {crypto.change}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white">{crypto.volume}</td>
                  <td className="py-4 px-4 text-right text-white">{crypto.marketCap}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      crypto.correlation > 0.7 ? 'bg-green-500/20 text-green-400' :
                      crypto.correlation > 0.5 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {crypto.correlation.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="px-3 py-1 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors text-sm">
                      Alert
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Crypto News & Dominance Chart */}
      <div className="grid grid-cols-2 gap-6">
        {/* Crypto News */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Crypto News & Updates</h3>
          <div className="space-y-4">
            {cryptoNews.map((news) => (
              <div key={news.id} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{news.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    news.impact === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {news.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-[#9CA3AF] text-sm mb-2">{news.description}</p>
                <div className="flex justify-between text-xs text-[#9CA3AF]">
                  <span>Source: {news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dominance Chart */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Market Dominance</h3>
          <div className="space-y-4">
            {Object.entries(cryptoMetrics.dominance).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF] capitalize">{key}</span>
                  <span className="text-white font-semibold">{value}%</span>
                </div>
                <div className="w-full bg-[#2A2A2A] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      key === 'btc' ? 'bg-yellow-500' :
                      key === 'eth' ? 'bg-purple-500' :
                      'bg-blue-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoFeed;