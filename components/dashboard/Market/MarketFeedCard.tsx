import React, { useState } from 'react';
import { Package, Filter, Search, FileText, Database, Download, ShoppingCart, Eye, MapPin, Calendar } from 'lucide-react';

type Pack = {
  id: number;
  name: string;
  market: string;
  quarter: string;
  records: number;
  format: string;
  pricing: string;
  description: string;
  includes: string[];
  bestFor: string[];
  featured: boolean;
  dataPoints: number;
  accuracy: number;
  lastUpdated: string;
};

export default function MarketFeedCard() {
  const [selectedMarket, setSelectedMarket] = useState<'all' | string>('all');
  const [selectedPackType, setSelectedPackType] = useState<'all' | string>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Pack[]>([]);
  const [selectedPack, setSelectedPack] = useState<Pack | null>(null);

  // Data Packs
  const dataPacks: Pack[] = [
    {
      id: 1,
      name: 'Raleigh Q4 2025 - Equity Refinance Pack',
      market: 'Raleigh-Durham',
      quarter: 'Q4-2025',
      records: 8421,
      format: 'Report + CSV',
      pricing: 'Custom',
      description: 'Complete equity refinance opportunities for Raleigh market',
      includes: [
        'Homeowner contact information',
        'Current equity calculations',
        'Refinance probability scores',
        'Property valuations',
        'Historical transaction data'
      ],
      bestFor: [
        'Mortgage lenders targeting refi opportunities',
        'Real estate professionals',
        'Investment firms'
      ],
      featured: true,
      dataPoints: 15,
      accuracy: 98,
      lastUpdated: '2024-12-08'
    },
    {
      id: 2,
      name: 'Phoenix Q4 2025 - High-Equity Leads',
      market: 'Phoenix',
      quarter: 'Q4-2025',
      records: 6789,
      format: 'Report Only',
      pricing: 'Custom',
      description: 'High-value homeowners with substantial equity positions',
      includes: [
        'Property owner details',
        'Equity amounts ($200k+)',
        'Credit score estimates',
        'Income verification data',
        'Contact preferences'
      ],
      bestFor: [
        'Premium lenders',
        'HELOC providers',
        'Financial advisors'
      ],
      featured: false,
      dataPoints: 12,
      accuracy: 96,
      lastUpdated: '2024-12-07'
    },
    {
      id: 3,
      name: 'Atlanta Q4 2025 - First-Time Buyer Database',
      market: 'Atlanta',
      quarter: 'Q4-2025',
      records: 12456,
      format: 'CSV Only',
      pricing: 'Custom',
      description: 'Pre-qualified first-time homebuyers ready to purchase',
      includes: [
        'Buyer demographics',
        'Pre-approval status',
        'Budget ranges',
        'Timeline to purchase',
        'Preferred neighborhoods'
      ],
      bestFor: [
        'Mortgage brokers',
        'Real estate agents',
        'New construction developers'
      ],
      featured: true,
      dataPoints: 18,
      accuracy: 94,
      lastUpdated: '2024-12-08'
    },
    {
      id: 4,
      name: 'Dallas Q3 2025 - Commercial Property Leads',
      market: 'Dallas',
      quarter: 'Q3-2025',
      records: 3421,
      format: 'Report + CSV',
      pricing: 'Custom',
      description: 'Commercial real estate investment opportunities',
      includes: [
        'Property details & valuations',
        'Owner/investor information',
        'Cash flow analysis',
        'Market comparables',
        'Investment metrics'
      ],
      bestFor: [
        'Commercial lenders',
        'CRE investors',
        'Property management firms'
      ],
      featured: false,
      dataPoints: 20,
      accuracy: 97,
      lastUpdated: '2024-09-30'
    },
    {
      id: 5,
      name: 'Seattle Q4 2025 - Luxury Market Intelligence',
      market: 'Seattle',
      quarter: 'Q4-2025',
      records: 2156,
      format: 'Report + CSV',
      pricing: 'Custom',
      description: 'High-net-worth individuals and luxury property market',
      includes: [
        'HNW homeowner profiles',
        'Luxury property inventory',
        'Wealth indicators',
        'Investment portfolios',
        'Private banking relationships'
      ],
      bestFor: [
        'Private banks',
        'Luxury brokerages',
        'Wealth management firms'
      ],
      featured: true,
      dataPoints: 25,
      accuracy: 99,
      lastUpdated: '2024-12-08'
    },
    {
      id: 6,
      name: 'Miami Q4 2025 - International Buyer Pool',
      market: 'Miami',
      quarter: 'Q4-2025',
      records: 5678,
      format: 'CSV Only',
      pricing: 'Custom',
      description: 'International buyers seeking US property investments',
      includes: [
        'Buyer country of origin',
        'Investment capacity',
        'Property preferences',
        'Legal/visa status',
        'Timeline & urgency'
      ],
      bestFor: [
        'International real estate teams',
        'Immigration attorneys',
        'Global banks'
      ],
      featured: false,
      dataPoints: 14,
      accuracy: 92,
      lastUpdated: '2024-12-06'
    }
  ];

  const addToCart = (pack: Pack): void => {
    if (!cart.find(item => item.id === pack.id)) {
      setCart([...cart, pack]);
    }
  };

  const removeFromCart = (packId: number): void => {
    setCart(cart.filter(item => item.id !== packId));
  };

  const openPackDetails = (pack: Pack | null): void => {
    setSelectedPack(pack);
  };

  const closePackDetails = (): void => {
    setSelectedPack(null);
  };

  const filteredPacks = dataPacks.filter((pack: Pack) => {
    const matchesMarket = selectedMarket === 'all' || pack.market === selectedMarket;
    const matchesType = selectedPackType === 'all' || pack.format.includes(selectedPackType);
    const matchesQuarter = selectedQuarter === 'all' || pack.quarter === selectedQuarter;
    const matchesSearch = searchQuery === '' ||
      pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pack.market.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMarket && matchesType && matchesQuarter && matchesSearch;
  });

  const getFormatBadge = (format: string): { bg: string; text: string; border: string } => {
    if (format === 'Report + CSV') return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' };
    if (format === 'Report Only') return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' };
    return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' };
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🛒 Data Pack Marketplace</h1>
            <p className="text-gray-400">Browse and purchase curated real estate data packages</p>
          </div>
          
          {/* Cart Badge */}
          <div className="relative">
            <button className="px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search data packs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#19F6FF]" />
              <select
                value={selectedMarket}
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Markets</option>
                <option value="Raleigh-Durham">Raleigh-Durham</option>
                <option value="Phoenix">Phoenix</option>
                <option value="Atlanta">Atlanta</option>
                <option value="Dallas">Dallas</option>
                <option value="Seattle">Seattle</option>
                <option value="Miami">Miami</option>
              </select>

              <select
                value={selectedPackType}
                onChange={(e) => setSelectedPackType(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Types</option>
                <option value="Report + CSV">Report + CSV</option>
                <option value="Report Only">Report Only</option>
                <option value="CSV Only">CSV Only</option>
              </select>

              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Quarters</option>
                <option value="Q4-2025">Q4 2025</option>
                <option value="Q3-2025">Q3 2025</option>
                <option value="Q2-2025">Q2 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing {filteredPacks.length} of {dataPacks.length} data packs
        </div>

        {/* Data Pack Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredPacks.map((pack: Pack, idx: number) => {
            const formatBadge = getFormatBadge(pack.format);
            const inCart = cart.find(item => item.id === pack.id);
            
            return (
              <div
                key={pack.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#19F6FF] transition-all relative"
              >
                {pack.featured && (
                  <div className="absolute -top-3 right-6">
                    <span className="px-3 py-1 bg-[#19F6FF] text-black text-xs font-bold rounded-full">
                      FEATURED
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#19F6FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6 text-[#19F6FF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{pack.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{pack.market}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-xs text-gray-400">Records</span>
                    <span className="text-sm font-bold text-white">{pack.records.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-xs text-gray-400">Pricing</span>
                    <span className="text-sm font-bold text-[#19F6FF]">{pack.pricing}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-xs text-gray-400">Format</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full border ${formatBadge.bg} ${formatBadge.text} ${formatBadge.border}`}>
                      {pack.format}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Data Points</div>
                    <div className="text-sm font-bold text-white">{pack.dataPoints}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                    <div className="text-sm font-bold text-green-400">{pack.accuracy}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Updated</div>
                    <div className="text-xs text-gray-300">{pack.lastUpdated.slice(5)}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openPackDetails(pack)}
                    className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center justify-center gap-2 border border-gray-700"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  
                  {inCart ? (
                    <button
                      onClick={() => removeFromCart(pack.id)}
                      className="flex-1 px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(pack)}
                      className="flex-1 px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pack Detail Modal */}
        {selectedPack && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-[#19F6FF]/20 rounded-xl flex items-center justify-center">
                      <Package className="w-8 h-8 text-[#19F6FF]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{selectedPack.name}</h2>
                      <p className="text-gray-400">{selectedPack.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={closePackDetails}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Market</div>
                    <div className="text-lg font-bold text-white">{selectedPack.market}</div>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Period</div>
                    <div className="text-lg font-bold text-white">{selectedPack.quarter}</div>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Records</div>
                    <div className="text-lg font-bold text-white">{selectedPack.records.toLocaleString()}</div>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Format</div>
                    <div className="text-sm font-medium text-[#19F6FF]">{selectedPack.format}</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">What's Included:</h3>
                  <div className="space-y-2">
                    {selectedPack.includes.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-3 bg-gray-800/50 rounded-lg">
                        <Database className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-3">Best For:</h3>
                  <div className="space-y-2">
                    {selectedPack.bestFor.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-[#19F6FF]">•</span>
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border border-gray-700">
                    Preview Sample
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-bold">
                    Request Pricing
                  </button>
                  <button
                    onClick={() => {
                      addToCart(selectedPack);
                      closePackDetails();
                    }}
                    className="flex-1 px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}