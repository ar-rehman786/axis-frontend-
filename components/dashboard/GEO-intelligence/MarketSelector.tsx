import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, TrendingDown, Users, DollarSign, Home, Activity } from 'lucide-react';

type MarketTrendsLevel = 'very-high' | 'high' | 'medium' | 'low' | 'very-low';

type MarketTrends = {
  demand: MarketTrendsLevel | 'very-high' | 'high' | 'medium' | 'low';
  supply: MarketTrendsLevel | 'very-low' | 'low' | 'medium' | 'high';
  competition: MarketTrendsLevel | 'high' | 'very-high' | 'medium';
};

type Demographics = {
  avgAge: number;
  avgIncome: number;
  homeownership: number;
  education: number;
};

type City = {
  name: string;
  population: number;
  medianPrice: number;
  priceChange: number;
  inventory: number;
  avgDaysMarket: number;
  demographics: Demographics;
  trends: MarketTrends;
  topZips: string[];
};

type Markets = Record<string, { cities: City[] }>;

type AnimatedStats = {
  population: number;
  medianPrice: number;
  inventory: number;
  avgDaysMarket: number;
};

export default function MarketSelector() {
  const [selectedState, setSelectedState] = useState<string>('North Carolina');
  const [selectedCity, setSelectedCity] = useState<string>('Raleigh-Durham');
  const [animatedStats, setAnimatedStats] = useState<AnimatedStats>({
    population: 0,
    medianPrice: 0,
    inventory: 0,
    avgDaysMarket: 0,
  });

  // Market Data
  const markets: Markets = {
    'North Carolina': {
      cities: [
        {
          name: 'Raleigh-Durham',
          population: 2150000,
          medianPrice: 425000,
          priceChange: 8.5,
          inventory: 3421,
          avgDaysMarket: 28,
          demographics: {
            avgAge: 35,
            avgIncome: 78500,
            homeownership: 62,
            education: 45
          },
          trends: {
            demand: 'high',
            supply: 'low',
            competition: 'high'
          },
          topZips: ['27560', '27587', '27709', '27713', '27617']
        },
        {
          name: 'Charlotte',
          population: 2700000,
          medianPrice: 398000,
          priceChange: 6.2,
          inventory: 4567,
          avgDaysMarket: 32,
          demographics: {
            avgAge: 36,
            avgIncome: 72300,
            homeownership: 58,
            education: 42
          },
          trends: {
            demand: 'high',
            supply: 'medium',
            competition: 'high'
          },
          topZips: ['28204', '28277', '28226', '28209', '28215']
        }
      ]
    },
    'Arizona': {
      cities: [
        {
          name: 'Phoenix',
          population: 4900000,
          medianPrice: 465000,
          priceChange: 12.3,
          inventory: 6789,
          avgDaysMarket: 24,
          demographics: {
            avgAge: 37,
            avgIncome: 68900,
            homeownership: 54,
            education: 38
          },
          trends: {
            demand: 'very-high',
            supply: 'low',
            competition: 'very-high'
          },
          topZips: ['85254', '85255', '85266', '85331', '85374']
        },
        {
          name: 'Tucson',
          population: 1050000,
          medianPrice: 312000,
          priceChange: 5.8,
          inventory: 2134,
          avgDaysMarket: 35,
          demographics: {
            avgAge: 39,
            avgIncome: 52400,
            homeownership: 56,
            education: 35
          },
          trends: {
            demand: 'medium',
            supply: 'medium',
            competition: 'medium'
          },
          topZips: ['85718', '85704', '85710', '85745', '85756']
        }
      ]
    },
    'Georgia': {
      cities: [
        {
          name: 'Atlanta',
          population: 6100000,
          medianPrice: 389000,
          priceChange: 7.9,
          inventory: 8234,
          avgDaysMarket: 30,
          demographics: {
            avgAge: 34,
            avgIncome: 75600,
            homeownership: 55,
            education: 44
          },
          trends: {
            demand: 'high',
            supply: 'medium',
            competition: 'high'
          },
          topZips: ['30328', '30342', '30319', '30350', '30338']
        }
      ]
    },
    'Texas': {
      cities: [
        {
          name: 'Dallas-Fort Worth',
          population: 7600000,
          medianPrice: 375000,
          priceChange: 9.1,
          inventory: 9876,
          avgDaysMarket: 26,
          demographics: {
            avgAge: 35,
            avgIncome: 71200,
            homeownership: 57,
            education: 40
          },
          trends: {
            demand: 'high',
            supply: 'medium',
            competition: 'high'
          },
          topZips: ['75024', '75034', '75035', '75252', '76034']
        },
        {
          name: 'Austin',
          population: 2300000,
          medianPrice: 525000,
          priceChange: 15.4,
          inventory: 3421,
          avgDaysMarket: 18,
          demographics: {
            avgAge: 33,
            avgIncome: 82100,
            homeownership: 48,
            education: 52
          },
          trends: {
            demand: 'very-high',
            supply: 'very-low',
            competition: 'very-high'
          },
          topZips: ['78701', '78703', '78704', '78731', '78746']
        }
      ]
    },
    'Washington': {
      cities: [
        {
          name: 'Seattle',
          population: 3900000,
          medianPrice: 725000,
          priceChange: 4.2,
          inventory: 4123,
          avgDaysMarket: 22,
          demographics: {
            avgAge: 36,
            avgIncome: 98500,
            homeownership: 46,
            education: 58
          },
          trends: {
            demand: 'high',
            supply: 'low',
            competition: 'very-high'
          },
          topZips: ['98004', '98005', '98033', '98039', '98052']
        }
      ]
    },
    'Florida': {
      cities: [
        {
          name: 'Miami',
          population: 6200000,
          medianPrice: 485000,
          priceChange: 11.7,
          inventory: 7654,
          avgDaysMarket: 29,
          demographics: {
            avgAge: 41,
            avgIncome: 64300,
            homeownership: 52,
            education: 37
          },
          trends: {
            demand: 'high',
            supply: 'medium',
            competition: 'high'
          },
          topZips: ['33109', '33139', '33140', '33154', '33180']
        }
      ]
    }
  };

  const selectedMarket = markets[selectedState]?.cities.find((c) => c.name === selectedCity);

  // Animate stats
  useEffect(() => {
    if (!selectedMarket) return;

    const timer = setInterval(() => {
      setAnimatedStats((prev) => {
        const newStats: AnimatedStats = { ...prev };
        (['population', 'medianPrice', 'inventory', 'avgDaysMarket'] as (keyof AnimatedStats)[]).forEach(
          (key) => {
            const target = selectedMarket[key];
            const current = prev[key] || 0;
            newStats[key] = current < target ? Math.min(current + Math.ceil(target / 20), target) : target;
          },
        );
        return newStats;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [selectedMarket, selectedCity]);

  const getTrendBadge = (value: MarketTrends[keyof MarketTrends]) => {
    if (value === 'very-high') return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Very High' };
    if (value === 'high') return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', label: 'High' };
    if (value === 'medium') return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Medium' };
    if (value === 'low') return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Low' };
    return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Very Low' };
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🗺️ Market Intelligence Selector</h1>
          <p className="text-gray-400">Select a market to view detailed real estate intelligence and insights</p>
        </div>

        {/* Market Selectors */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">State:</span>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity(markets[e.target.value].cities[0].name);
                }}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white min-w-[200px]"
              >
                {Object.keys(markets).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <Home className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">City/Metro:</span>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white min-w-[200px]"
              >
                {markets[selectedState]?.cities.map(city => (
                  <option key={city.name} value={city.name}>{city.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {selectedMarket && (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-xs text-gray-400">Population</div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {((animatedStats.population || 0) / 1000000).toFixed(2)}M
                </div>
                <div className="text-xs text-gray-500 mt-1">Metro area</div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-xs text-gray-400">Median Price</div>
                </div>
                <div className="text-2xl font-bold text-white">
                  ${((animatedStats.medianPrice || 0) / 1000).toFixed(0)}k
                </div>
                <div className={`text-xs mt-1 flex items-center gap-1 ${selectedMarket.priceChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedMarket.priceChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(selectedMarket.priceChange)}% YoY
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-xs text-gray-400">Inventory</div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {(animatedStats.inventory || 0).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">Active listings</div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="text-xs text-gray-400">Avg Days Market</div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {animatedStats.avgDaysMarket || 0}
                </div>
                <div className="text-xs text-gray-500 mt-1">Time to sell</div>
              </div>
            </div>

            {/* Market Trends */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Market Trends & Indicators</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Buyer Demand</div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const badge = getTrendBadge(selectedMarket.trends.demand);
                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Housing Supply</div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const badge = getTrendBadge(selectedMarket.trends.supply);
                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Competition Level</div>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const badge = getTrendBadge(selectedMarket.trends.competition);
                      return (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Demographics */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Demographics & Economics</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Average Age</div>
                  <div className="text-2xl font-bold text-white mb-1">{selectedMarket.demographics.avgAge}</div>
                  <div className="text-xs text-gray-500">Years old</div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Avg Household Income</div>
                  <div className="text-2xl font-bold text-white mb-1">
                    ${(selectedMarket.demographics.avgIncome / 1000).toFixed(0)}k
                  </div>
                  <div className="text-xs text-gray-500">Annual</div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Homeownership Rate</div>
                  <div className="text-2xl font-bold text-white mb-1">{selectedMarket.demographics.homeownership}%</div>
                  <div className="text-xs text-gray-500">Of households</div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Bachelor's Degree+</div>
                  <div className="text-2xl font-bold text-white mb-1">{selectedMarket.demographics.education}%</div>
                  <div className="text-xs text-gray-500">Of population</div>
                </div>
              </div>
            </div>

            {/* Top ZIP Codes */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Top Performing ZIP Codes</h3>
              
              <div className="flex gap-3">
                {selectedMarket.topZips.map((zip, idx) => (
                  <div
                    key={zip}
                    className="flex-1 p-4 bg-gradient-to-br from-[#19F6FF]/10 to-[#00BCC9]/5 border border-[#19F6FF]/30 rounded-lg hover:border-[#19F6FF] transition-all cursor-pointer"
                  >
                    <div className="text-xs text-gray-400 mb-1">Top {idx + 1}</div>
                    <div className="text-2xl font-bold text-[#19F6FF] mb-1">{zip}</div>
                    <div className="text-xs text-gray-400">High activity</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                View ZIP Code Heatmap
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Export Market Report
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                View Insights
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}