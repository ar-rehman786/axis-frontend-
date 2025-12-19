"use client"
import React, { useState } from 'react';
import { Home, TrendingUp, TrendingDown, MapPin, DollarSign, Percent, Users, Building } from 'lucide-react';

const HousingFeed = () => {
  const [region, setRegion] = useState('national');

  const regions = [
    { id: 'national', label: 'National' },
    { id: 'northeast', label: 'Northeast' },
    { id: 'south', label: 'South' },
    { id: 'midwest', label: 'Midwest' },
    { id: 'west', label: 'West' }
  ];

  const housingMetrics = [
    { 
      metric: 'Median Home Price', 
      value: '$385,000', 
      change: '+5.2%', 
      trend: 'up',
      description: 'Year-over-year change'
    },
    { 
      metric: 'Days on Market', 
      value: '24', 
      change: '-8%', 
      trend: 'down',
      description: 'Average days listed'
    },
    { 
      metric: 'Inventory (months)', 
      value: '3.2', 
      change: '+12%', 
      trend: 'up',
      description: 'Supply at current sales pace'
    },
    { 
      metric: 'Price Reductions', 
      value: '18%', 
      change: '-4%', 
      trend: 'down',
      description: 'Listings with price cuts'
    }
  ];

  const regionalData = [
    {
      region: 'Northeast',
      medianPrice: '$425,000',
      yoyChange: '+4.8%',
      inventory: '2.8 months',
      hotMarkets: ['Boston', 'New York', 'Philadelphia']
    },
    {
      region: 'South',
      medianPrice: '$345,000',
      yoyChange: '+6.2%',
      inventory: '3.5 months',
      hotMarkets: ['Atlanta', 'Dallas', 'Nashville']
    },
    {
      region: 'Midwest',
      medianPrice: '$295,000',
      yoyChange: '+3.9%',
      inventory: '4.1 months',
      hotMarkets: ['Chicago', 'Columbus', 'Indianapolis']
    },
    {
      region: 'West',
      medianPrice: '$585,000',
      yoyChange: '+5.8%',
      inventory: '2.5 months',
      hotMarkets: ['Seattle', 'Denver', 'Phoenix']
    }
  ];

  const marketNews = [
    {
      id: 1,
      title: 'Inventory Levels Rising',
      description: 'Housing inventory increased 8.5% month-over-month nationally',
      source: 'MLS Data',
      time: '3 hours ago',
      impact: 'positive'
    },
    {
      id: 2,
      title: 'First-time Buyer Activity Up',
      description: 'FHA loan applications increase 12% this quarter',
      source: 'Mortgage Bankers Association',
      time: '1 day ago',
      impact: 'positive'
    },
    {
      id: 3,
      title: 'Luxury Market Cooling',
      description: 'Homes above $1M seeing longer market times',
      source: 'Redfin Report',
      time: '2 days ago',
      impact: 'neutral'
    }
  ];

  const affordabilityIndex = {
    national: 32.5,
    northeast: 28.4,
    south: 35.2,
    midwest: 42.8,
    west: 25.6
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Housing Market Intelligence</h2>
          <p className="text-[#9CA3AF]">Real-time housing data, trends, and market insights</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-[#2A2A2A] rounded-lg">
            {regions.map((r) => (
              <button
                key={r.id}
                onClick={() => setRegion(r.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  region === r.id
                    ? 'bg-[#00D1D1] text-white'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Housing Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {housingMetrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">{metric.metric}</p>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-3xl font-bold text-white">{metric.value}</h3>
              <div className={`flex items-center ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                <span className="text-sm font-semibold">{metric.change}</span>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 ml-1" />
                ) : (
                  <TrendingUp className="w-4 h-4 ml-1 transform rotate-180" />
                )}
              </div>
            </div>
            <p className="text-[#9CA3AF] text-xs">{metric.description}</p>
          </div>
        ))}
      </div>

      {/* Regional Analysis */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Regional Market Analysis</h3>
        <div className="grid grid-cols-4 gap-6">
          {regionalData.map((data, idx) => (
            <div key={idx} className="p-4 bg-[#2A2A2A] rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#00D1D1]" />
                <h4 className="text-white font-semibold">{data.region}</h4>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[#9CA3AF] text-xs">Median Price</p>
                  <p className="text-white font-semibold text-lg">{data.medianPrice}</p>
                  <p className="text-green-400 text-sm">YoY: {data.yoyChange}</p>
                </div>
                
                <div>
                  <p className="text-[#9CA3AF] text-xs">Inventory</p>
                  <p className="text-white font-semibold">{data.inventory}</p>
                </div>
                
                <div>
                  <p className="text-[#9CA3AF] text-xs">Hot Markets</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {data.hotMarkets.map((market, i) => (
                      <span key={i} className="px-2 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded text-xs">
                        {market}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affordability & News */}
      <div className="grid grid-cols-2 gap-6">
        {/* Affordability Index */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Housing Affordability Index</h3>
          <p className="text-[#9CA3AF] text-sm mb-6">
            Lower numbers indicate less affordability (0-100 scale)
          </p>
          
          <div className="space-y-4">
            {Object.entries(affordabilityIndex).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#9CA3AF] capitalize">{key}</span>
                  <span className={`font-semibold ${
                    value < 30 ? 'text-red-400' :
                    value < 40 ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {value}
                  </span>
                </div>
                <div className="w-full bg-[#2A2A2A] rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      value < 30 ? 'bg-red-500' :
                      value < 40 ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market News */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white text-xl font-semibold mb-4">Market News & Updates</h3>
          <div className="space-y-4">
            {marketNews.map((news) => (
              <div key={news.id} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-semibold">{news.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs ${
                    news.impact === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
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
      </div>

      {/* Market Trends */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Key Market Trends</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00D1D1]/20 to-[#00D1D1]/10 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-[#00D1D1]" />
            </div>
            <h4 className="text-white font-semibold mb-2">Millennial Homebuying</h4>
            <p className="text-[#9CA3AF] text-sm">Ages 28-38 driving 45% of purchases</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00D1D1]/20 to-[#00D1D1]/10 rounded-full flex items-center justify-center mb-4">
              <Building className="w-8 h-8 text-[#00D1D1]" />
            </div>
            <h4 className="text-white font-semibold mb-2">New Construction</h4>
            <p className="text-[#9CA3AF] text-sm">Up 18% YoY, focusing on affordability</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00D1D1]/20 to-[#00D1D1]/10 rounded-full flex items-center justify-center mb-4">
              <Percent className="w-8 h-8 text-[#00D1D1]" />
            </div>
            <h4 className="text-white font-semibold mb-2">Rental Market</h4>
            <p className="text-[#9CA3AF] text-sm">Rent prices stabilizing, up only 2.3% YoY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HousingFeed;