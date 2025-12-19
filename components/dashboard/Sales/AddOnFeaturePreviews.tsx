"use client"
import React, { useState } from 'react';
import { Sparkles, Zap, Lock, Check, Shield, Layers, TrendingUp, Database, ChevronRight } from 'lucide-react';

export default function AddOnFeaturePreviews() {
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'coming-soon'>('all');

  // Add-On Features
  const addOns: Array<{
    id: number;
    name: string;
    icon: any;
    status: 'available' | 'coming-soon';
    price: number | null;
    priceUnit: string;
    description: string;
    features: string[];
    compatibility: string[];
    stats: {
      users: number;
      avgRevenue: number;
      adoption: number;
    };
    color: string;
    comingSoon: boolean;
    releaseDate: string | null;
  }> = [
    {
      id: 1,
      name: 'Crypto Correlation Module',
      icon: Sparkles,
      status: 'available',
      price: 199,
      priceUnit: 'per month',
      description: 'Track cryptocurrency holdings and correlate with traditional lending risk profiles',
      features: [
        'Real-time crypto wallet monitoring',
        'Risk correlation analysis',
        'Portfolio diversification insights',
        'Crypto income verification',
        'Volatility impact scoring'
      ],
      compatibility: ['Lender Pro', 'Institutional'],
      stats: {
        users: 45,
        avgRevenue: 2388,
        adoption: 13
      },
      color: 'purple',
      comingSoon: false,
      releaseDate: null
    },
    {
      id: 2,
      name: 'Risk Lattice AI',
      icon: Shield,
      status: 'available',
      price: 399,
      priceUnit: 'per month',
      description: 'Advanced multi-dimensional risk assessment using machine learning',
      features: [
        'Multi-factor risk modeling',
        'Predictive default scoring',
        'Early warning system',
        'Custom risk thresholds',
        'Automated risk alerts'
      ],
      compatibility: ['Lender Pro', 'Institutional'],
      stats: {
        users: 67,
        avgRevenue: 4788,
        adoption: 20
      },
      color: 'red',
      comingSoon: false,
      releaseDate: null
    },
    {
      id: 3,
      name: 'AI Copilot Assistant',
      icon: Zap,
      status: 'available',
      price: 499,
      priceUnit: 'per month',
      description: 'Intelligent assistant for automated decision support and workflow optimization',
      features: [
        'Natural language queries',
        'Automated report generation',
        'Smart recommendations',
        'Workflow automation',
        'Integration with existing tools'
      ],
      compatibility: ['Lender Pro', 'Institutional'],
      stats: {
        users: 89,
        avgRevenue: 5988,
        adoption: 26
      },
      color: 'blue',
      comingSoon: false,
      releaseDate: null
    },
    {
      id: 4,
      name: 'White Label Solution',
      icon: Layers,
      status: 'available',
      price: null,
      priceUnit: 'custom pricing',
      description: 'Fully branded platform with your company identity and custom domain',
      features: [
        'Custom branding & logo',
        'Custom domain setup',
        'Branded reports & exports',
        'Custom color schemes',
        'Dedicated support team'
      ],
      compatibility: ['Institutional'],
      stats: {
        users: 12,
        avgRevenue: 25000,
        adoption: 27
      },
      color: 'orange',
      comingSoon: false,
      releaseDate: null
    },
    {
      id: 5,
      name: 'City/ZIP Intelligence',
      icon: TrendingUp,
      status: 'coming-soon',
      price: 299,
      priceUnit: 'per month',
      description: 'Hyper-local market intelligence with ZIP code level analytics',
      features: [
        'ZIP code heat maps',
        'Local market trends',
        'Property value predictions',
        'Demographic insights',
        'Competition analysis'
      ],
      compatibility: ['Lender Pro', 'Institutional'],
      stats: {
        users: 0,
        avgRevenue: 0,
        adoption: 0
      },
      color: 'green',
      comingSoon: true,
      releaseDate: 'Q1 2026'
    },
    {
      id: 6,
      name: 'Real-Time API Access',
      icon: Database,
      status: 'coming-soon',
      price: 599,
      priceUnit: 'per month',
      description: 'Direct API access for real-time data integration with your systems',
      features: [
        'WebSocket connections',
        'Sub-second latency',
        'Unlimited API calls',
        'Custom webhooks',
        'Priority support'
      ],
      compatibility: ['Institutional'],
      stats: {
        users: 0,
        avgRevenue: 0,
        adoption: 0
      },
      color: 'cyan',
      comingSoon: true,
      releaseDate: 'Q2 2026'
    }
  ];

  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);

  const toggleAddOn = (id: number): void => {
    setSelectedAddOns((prev: number[]) => 
      prev.includes(id)
        ? prev.filter((addOnId: number) => addOnId !== id)
        : [...prev, id]
    );
  };

  const getStatusBadge = (status: 'available' | 'coming-soon'): {
    bg: string;
    text: string;
    border: string;
    label: string;
  } => {
    if (status === 'available') {
      return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Available Now' };
    }
    return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Coming Soon' };
  };

  const filteredAddOns = filterStatus === 'all' 
    ? addOns 
    : addOns.filter(addon => addon.status === filterStatus);

  const selectedCount = selectedAddOns.length;
  const totalPrice = selectedAddOns.reduce((sum: number, id: number) => {
    const addon = addOns.find(a => a.id === id);
    return sum + (addon?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">✨ Add-On Feature Marketplace</h1>
          <p className="text-gray-400">Enhance your platform with premium features and integrations</p>
        </div>

        {/* Stats & Filters */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-zinc-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Add-Ons</div>
            <div className="text-3xl font-bold text-white">{addOns.length}</div>
            <div className="text-xs text-gray-500 mt-1">Available features</div>
          </div>

          <div className="bg-zinc-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Available Now</div>
            <div className="text-3xl font-bold text-green-400">{addOns.filter(a => a.status === 'available').length}</div>
            <div className="text-xs text-gray-500 mt-1">Ready to use</div>
          </div>

          <div className="bg-zinc-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Coming Soon</div>
            <div className="text-3xl font-bold text-yellow-400">{addOns.filter(a => a.status === 'coming-soon').length}</div>
            <div className="text-xs text-gray-500 mt-1">In development</div>
          </div>

          <div className="bg-zinc-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Selected</div>
            <div className="text-3xl font-bold text-[#19F6FF]">{selectedCount}</div>
            <div className="text-xs text-gray-500 mt-1">${totalPrice}/month</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-zinc-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">Filter by Status:</span>
            <div className="flex gap-2">
              {[
                { id: 'all' as const, label: 'All Features' },
                { id: 'available' as const, label: 'Available' },
                { id: 'coming-soon' as const, label: 'Coming Soon' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setFilterStatus(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterStatus === filter.id
                      ? 'bg-[#19F6FF] text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add-Ons Grid */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Available Add-Ons ({filteredAddOns.length})</h3>

          <div className="grid grid-cols-2 gap-6">
            {filteredAddOns.map((addon: {
      id: number;
      name: string;
      icon: any;
      status: 'available' | 'coming-soon';
      price: number | null;
      priceUnit: string;
      description: string;
      features: string[];
      compatibility: string[];
      stats: {
        users: number;
        avgRevenue: number;
        adoption: number;
      };
      color: string;
      comingSoon: boolean;
      releaseDate: string | null;
    }) => {
              const Icon = addon.icon;
              const statusBadge = getStatusBadge(addon.status);
              const isSelected = selectedAddOns.includes(addon.id);
              return (
                <div
                  key={addon.id}
                  className={`bg-zinc-900/50 border rounded-xl p-6 transition-all relative ${
                    isSelected 
                      ? 'border-[#19F6FF] shadow-[0_0_20px_rgba(25,246,255,0.2)]' 
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {addon.comingSoon && (
                    <div className="absolute -top-3 right-6">
                      <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                        {addon.releaseDate}
                      </span>
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 bg-${addon.color}-500/20 rounded-xl flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 text-${addon.color}-400`} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{addon.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          {statusBadge.label}
                        </span>
                      </div>
                    </div>

                    {!addon.comingSoon && (
                      <button
                        onClick={() => toggleAddOn(addon.id)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#19F6FF] border-[#19F6FF]'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-black" />}
                      </button>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mb-4">{addon.description}</p>

                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Features:</div>
                    <div className="space-y-2">
                      {addon.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4 p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-baseline gap-2">
                      {addon.price ? (
                        <>
                          <span className="text-2xl font-bold text-white">${addon.price}</span>
                          <span className="text-sm text-gray-400">{addon.priceUnit}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-white capitalize">{addon.priceUnit}</span>
                      )}
                    </div>
                  </div>

                  {!addon.comingSoon && (
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-2 bg-zinc-800/50 rounded">
                        <div className="text-xs text-gray-400">Users</div>
                        <div className="text-sm font-bold text-white">{addon.stats.users}</div>
                      </div>
                      <div className="p-2 bg-zinc-800/50 rounded">
                        <div className="text-xs text-gray-400">Avg Revenue</div>
                        <div className="text-sm font-bold text-green-400">${(addon.stats.avgRevenue / 1000).toFixed(1)}k</div>
                      </div>
                      <div className="p-2 bg-zinc-800/50 rounded">
                        <div className="text-xs text-gray-400">Adoption</div>
                        <div className="text-sm font-bold text-purple-400">{addon.stats.adoption}%</div>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Compatible with:</div>
                    <div className="flex flex-wrap gap-2">
                      {addon.compatibility.map((tier: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-zinc-700 rounded text-xs text-white">
                          {tier}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                      addon.comingSoon
                        ? 'bg-zinc-800 text-gray-400 cursor-not-allowed border border-gray-700'
                        : isSelected
                        ? 'bg-[#19F6FF] text-black hover:bg-[#00BCC9]'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                    }`}
                    disabled={addon.comingSoon}
                  >
                    {addon.comingSoon ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Notify Me
                      </>
                    ) : (
                      <>
                        {isSelected ? 'Selected' : 'Learn More'}
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Summary */}
        {selectedCount > 0 && (
          <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Selected Add-Ons Summary</h3>
                <p className="text-gray-400">
                  {selectedCount} add-on{selectedCount > 1 ? 's' : ''} selected • ${totalPrice}/month total
                </p>
                <div className="flex gap-2 mt-3">
                  {selectedAddOns.map((id: number) => {
                    const addon = addOns.find(a => a.id === id);
                    return (
                      <span key={id} className="px-3 py-1 bg-[#19F6FF]/20 text-[#19F6FF] rounded-full text-xs font-medium">
                        {addon?.name}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedAddOns([])}
                  className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors border border-gray-700"
                >
                  Clear Selection
                </button>
                <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            View All Features
          </button>
          <button className="px-6 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors border border-gray-700">
            Schedule Demo
          </button>
          <button className="px-6 py-3 bg-zinc-800 text-white font-bold rounded-lg hover:bg-zinc-700 transition-colors border border-gray-700">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}