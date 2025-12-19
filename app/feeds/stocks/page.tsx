"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Building2, DollarSign, BarChart2, PieChart, AlertCircle } from 'lucide-react';

const StocksFeed = () => {
  const [sector, setSector] = useState('all');

  const sectors = [
    { id: 'all', label: 'All Sectors' },
    { id: 'finance', label: 'Finance' },
    { id: 'tech', label: 'Technology' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'energy', label: 'Energy' }
  ];

  const stockData = [
    { 
      symbol: 'JPM', 
      name: 'JPMorgan Chase', 
      price: '$172.45', 
      change: '+1.23%', 
      trend: 'up',
      sector: 'finance',
      volume: '12.4M',
      marketCap: '$485B',
      peRatio: 11.2,
      dividend: '2.4%',
      correlation: 0.82
    },
    { 
      symbol: 'BAC', 
      name: 'Bank of America', 
      price: '$33.78', 
      change: '+0.85%', 
      trend: 'up',
      sector: 'finance',
      volume: '45.2M',
      marketCap: '$265B',
      peRatio: 10.5,
      dividend: '2.8%',
      correlation: 0.78
    },
    { 
      symbol: 'WFC', 
      name: 'Wells Fargo', 
      price: '$48.92', 
      change: '-0.45%', 
      trend: 'down',
      sector: 'finance',
      volume: '18.7M',
      marketCap: '$175B',
      peRatio: 9.8,
      dividend: '3.1%',
      correlation: 0.75
    },
    { 
      symbol: 'MS', 
      name: 'Morgan Stanley', 
      price: '$88.34', 
      change: '+2.15%', 
      trend: 'up',
      sector: 'finance',
      volume: '8.9M',
      marketCap: '$145B',
      peRatio: 13.4,
      dividend: '3.7%',
      correlation: 0.68
    },
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      price: '$195.71', 
      change: '+0.92%', 
      trend: 'up',
      sector: 'tech',
      volume: '58.3M',
      marketCap: '$3.05T',
      peRatio: 31.2,
      dividend: '0.5%',
      correlation: 0.42
    }
  ];

  const marketIndices = [
    { name: 'S&P 500', value: '4,567.80', change: '+0.65%', trend: 'up' },
    { name: 'Dow Jones', value: '35,432.15', change: '+0.42%', trend: 'up' },
    { name: 'NASDAQ', value: '14,289.45', change: '+1.23%', trend: 'up' },
    { name: 'Financials ETF (XLF)', value: '$35.78', change: '+0.85%', trend: 'up' }
  ];

  const economicIndicators = [
    { indicator: 'Fed Funds Rate', value: '5.25-5.50%', change: '0.00%', trend: 'neutral' },
    { indicator: '10yr Treasury', value: '4.35%', change: '-0.08%', trend: 'down' },
    { indicator: 'CPI YoY', value: '3.2%', change: '-0.1%', trend: 'down' },
    { indicator: 'Unemployment', value: '3.7%', change: '-0.1%', trend: 'down' }
  ];

  const mortgageStocks = [
    { name: 'Rocket Companies (RKT)', price: '$8.45', change: '+1.20%' },
    { name: 'UWM Holdings (UWMC)', price: '$6.78', change: '-0.45%' },
    { name: 'loanDepot (LDI)', price: '$2.15', change: '+3.65%' }
  ];

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Stock Market Intelligence</h2>
          <p className="text-[#9CA3AF]">Financial stocks, market indices, and economic indicators</p>
        </div>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
          Create Watchlist
        </button>
      </div>

      {/* Market Indices */}
      <div className="grid grid-cols-4 gap-6">
        {marketIndices.map((index, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">{index.name}</p>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-bold text-white">{index.value}</h3>
              <div className={`flex items-center ${index.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                <span className="text-sm font-semibold">{index.change}</span>
                {index.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 ml-1" />
                ) : (
                  <TrendingUp className="w-4 h-4 ml-1 transform rotate-180" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sector Filters */}
      <div className="flex gap-2">
        {sectors.map((s) => (
          <button
            key={s.id}
            onClick={() => setSector(s.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              sector === s.id
                ? 'bg-[#00D1D1] text-white'
                : 'bg-[#2A2A2A] text-[#9CA3AF] hover:text-white'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Financial Stocks Table */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Financial Sector Stocks</h3>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Stock</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Price</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Change</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Volume</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Market Cap</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">P/E Ratio</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Dividend</th>
              <th className="text-right py-3 px-4 text-[#9CA3AF] font-semibold">Correlation</th>
            </tr>
          </thead>
          <tbody>
            {stockData
              .filter(stock => sector === 'all' || stock.sector === sector)
              .map((stock, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <div className="text-white font-semibold">{stock.symbol}</div>
                      <div className="text-[#9CA3AF] text-sm">{stock.name}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right text-white font-semibold">{stock.price}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      stock.trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {stock.change}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right text-white">{stock.volume}</td>
                  <td className="py-4 px-4 text-right text-white">{stock.marketCap}</td>
                  <td className="py-4 px-4 text-right text-white">{stock.peRatio}</td>
                  <td className="py-4 px-4 text-right text-white">{stock.dividend}</td>
                  <td className="py-4 px-4 text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      stock.correlation > 0.7 ? 'bg-green-500/20 text-green-400' :
                      stock.correlation > 0.5 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {stock.correlation.toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Economic Indicators & Mortgage Stocks */}
      <div className="grid grid-cols-2 gap-6">
        {/* Economic Indicators */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Economic Indicators</h3>
          <div className="space-y-4">
            {economicIndicators.map((indicator, idx) => (
              <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{indicator.indicator}</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-white">{indicator.value}</div>
                    <div className={`flex items-center justify-end text-sm ${
                      indicator.trend === 'down' ? 'text-green-400' :
                      indicator.trend === 'up' ? 'text-red-400' :
                      'text-gray-400'
                    }`}>
                      {indicator.change}
                      {indicator.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 ml-1" />
                      ) : indicator.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 ml-1" />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mortgage-Related Stocks */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Mortgage & Lending Stocks</h3>
          <div className="space-y-4">
            {mortgageStocks.map((stock, idx) => (
              <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-semibold">{stock.name}</span>
                  <span className="text-white font-bold">{stock.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#9CA3AF] text-sm">Today's Change</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    stock.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {stock.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksFeed;