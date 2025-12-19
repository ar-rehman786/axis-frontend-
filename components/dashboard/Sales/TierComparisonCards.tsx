import React, { useState, useEffect } from 'react';
import { Check, X, Star, Zap, Crown, Building2, ChevronRight, TrendingUp } from 'lucide-react';

export default function TierComparisonCards() {
  const [selectedTier, setSelectedTier] = useState<'brokerage' | 'lender' | 'institutional'>('lender');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [showComparison, setShowComparison] = useState(true);

  // Tier Pricing
  const tiers: Array<{
    id: string;
    name: string;
    icon: any;
    color: string;
    tagline: string;
    monthlyPrice: number | null;
    annualPrice: number | null;
    savings: number | null;
    popular: boolean;
    features: {
      core: Array<{ name: string; included: boolean }>;
      analytics: Array<{ name: string; included: boolean; limit?: string }>;
      data: Array<{ name: string; included: boolean; limit?: string }>;
      support: Array<{ name: string; included: boolean }>;
      users: Array<{ name: string; limit?: string; included?: boolean }>;
    };
    stats: {
      currentUsers: number;
      avgRevenue: number;
      conversionRate: number;
    };
  }> = [
    {
      id: 'brokerage',
      name: 'Brokerage',
      icon: Building2,
      color: 'blue',
      tagline: 'For individual brokers',
      monthlyPrice: 299,
      annualPrice: 2990,
      savings: 598,
      popular: false,
      features: {
        core: [
          { name: 'Refi Cycle Prediction', included: true },
          { name: 'Basic Lead Scoring', included: true },
          { name: 'Email Support', included: true },
          { name: 'Monthly Reports', included: true }
        ],
        analytics: [
          { name: 'Standard Analytics', included: true },
          { name: 'Basic Dashboards', included: true },
          { name: 'Export Reports', included: false },
          { name: 'Custom Reports', included: false }
        ],
        data: [
          { name: 'Lead Database Access', included: true, limit: '1,000 leads/mo' },
          { name: 'Data Retention', included: true, limit: '90 days' },
          { name: 'API Access', included: false },
          { name: 'Real-Time Updates', included: false }
        ],
        support: [
          { name: 'Email Support', included: true },
          { name: 'Knowledge Base', included: true },
          { name: 'Priority Support', included: false },
          { name: 'Dedicated Account Manager', included: false }
        ],
        users: [
          { name: 'User Seats', limit: '1-3 users' },
          { name: 'Team Collaboration', included: false },
          { name: 'Role Management', included: false }
        ]
      },
      stats: {
        currentUsers: 1247,
        avgRevenue: 15600,
        conversionRate: 3.2
      }
    },
    {
      id: 'lender',
      name: 'Lender Pro',
      icon: Star,
      color: 'purple',
      tagline: 'For lending institutions',
      monthlyPrice: 799,
      annualPrice: 7990,
      savings: 1598,
      popular: true,
      features: {
        core: [
          { name: 'Advanced Refi Prediction', included: true },
          { name: 'AI Lead Scoring', included: true },
          { name: 'Priority Support', included: true },
          { name: 'Weekly Reports', included: true }
        ],
        analytics: [
          { name: 'Advanced Analytics', included: true },
          { name: 'Custom Dashboards', included: true },
          { name: 'Unlimited Exports', included: true },
          { name: 'Custom Reports', included: true }
        ],
        data: [
          { name: 'Lead Database Access', included: true, limit: '10,000 leads/mo' },
          { name: 'Data Retention', included: true, limit: '1 year' },
          { name: 'API Access', included: true, limit: '5,000 calls/mo' },
          { name: 'Real-Time Updates', included: true }
        ],
        support: [
          { name: 'Priority Email & Phone', included: true },
          { name: 'Knowledge Base', included: true },
          { name: 'Priority Support', included: true },
          { name: 'Dedicated Account Manager', included: true }
        ],
        users: [
          { name: 'User Seats', limit: '5-25 users' },
          { name: 'Team Collaboration', included: true },
          { name: 'Role Management', included: true }
        ]
      },
      stats: {
        currentUsers: 342,
        avgRevenue: 68900,
        conversionRate: 8.7
      }
    },
    {
      id: 'institutional',
      name: 'Institutional',
      icon: Crown,
      color: 'orange',
      tagline: 'For enterprise organizations',
      monthlyPrice: null,
      annualPrice: null,
      savings: null,
      popular: false,
      features: {
        core: [
          { name: 'Full Platform Access', included: true },
          { name: 'White-Label Options', included: true },
          { name: '24/7 Premium Support', included: true },
          { name: 'Real-Time Reports', included: true }
        ],
        analytics: [
          { name: 'Enterprise Analytics', included: true },
          { name: 'Unlimited Dashboards', included: true },
          { name: 'Unlimited Exports', included: true },
          { name: 'Custom Integrations', included: true }
        ],
        data: [
          { name: 'Lead Database Access', included: true, limit: 'Unlimited' },
          { name: 'Data Retention', included: true, limit: 'Unlimited' },
          { name: 'API Access', included: true, limit: 'Unlimited' },
          { name: 'Real-Time Updates', included: true }
        ],
        support: [
          { name: '24/7 Support All Channels', included: true },
          { name: 'Knowledge Base', included: true },
          { name: 'Priority Support', included: true },
          { name: 'Dedicated Account Team', included: true }
        ],
        users: [
          { name: 'User Seats', limit: 'Unlimited' },
          { name: 'Team Collaboration', included: true },
          { name: 'Advanced Role Management', included: true }
        ]
      },
      stats: {
        currentUsers: 45,
        avgRevenue: 285000,
        conversionRate: 12.4
      }
    }
  ];

  const selectedTierData = tiers.find((t: {
    id: string;
    name: string;
    icon: any;
    color: string;
    tagline: string;
    monthlyPrice: number | null;
    annualPrice: number | null;
    savings: number | null;
    popular: boolean;
    features: {
      core: Array<{ name: string; included: boolean }>;
      analytics: Array<{ name: string; included: boolean; limit?: string }>;
      data: Array<{ name: string; included: boolean; limit?: string }>;
      support: Array<{ name: string; included: boolean }>;
      users: Array<{ name: string; limit?: string; included?: boolean }>;
    };
    stats: {
      currentUsers: number;
      avgRevenue: number;
      conversionRate: number;
    };
  }) => t.id === selectedTier);
  const price = billingCycle === 'monthly' 
    ? selectedTierData?.monthlyPrice 
    : selectedTierData?.annualPrice;

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">💎 Tier Comparison & Pricing</h1>
          <p className="text-gray-400">Compare plans and help clients choose the right tier</p>
        </div>

        {/* Billing Toggle */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-white">Billing Cycle:</span>
              <div className="flex gap-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-[#19F6FF] text-black'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    billingCycle === 'annual'
                      ? 'bg-[#19F6FF] text-black'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  Annual <span className="text-green-400 text-xs ml-1">(Save 17%)</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700 text-sm font-medium"
            >
              {showComparison ? 'Hide' : 'Show'} Comparison Table
            </button>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-3 gap-6">
          {tiers.map((tier: {
        id: string;
        name: string;
        icon: any;
        color: string;
        tagline: string;
        monthlyPrice: number | null;
        annualPrice: number | null;
        savings: number | null;
        popular: boolean;
        features: {
          core: Array<{ name: string; included: boolean }>;
          analytics: Array<{ name: string; included: boolean; limit?: string }>;
          data: Array<{ name: string; included: boolean; limit?: string }>;
          support: Array<{ name: string; included: boolean }>;
          users: Array<{ name: string; limit?: string; included?: boolean }>;
        };
        stats: {
          currentUsers: number;
          avgRevenue: number;
          conversionRate: number;
        };
      }) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            const monthlyPrice = tier.monthlyPrice;
            const annualPrice = tier.annualPrice;
            const displayPrice = billingCycle === 'monthly' ? monthlyPrice : annualPrice;
            
            return (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier.id as 'brokerage' | 'lender' | 'institutional')}
                className={`bg-gray-900/50 border rounded-xl p-6 cursor-pointer transition-all hover:scale-105 relative ${
                  isSelected 
                    ? 'border-[#19F6FF] shadow-[0_0_20px_rgba(25,246,255,0.3)]' 
                    : 'border-gray-800'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-[#19F6FF] text-black text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-${tier.color}-500/20 rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 text-${tier.color}-400`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                  <p className="text-sm text-gray-400">{tier.tagline}</p>
                </div>

                <div className="text-center mb-6 pb-6 border-b border-gray-800">
                  {displayPrice ? (
                    <>
                      <div className="flex items-baseline justify-center gap-2">
                        <span className="text-4xl font-bold text-white">${displayPrice}</span>
                        <span className="text-gray-400">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                      </div>
                      {billingCycle === 'annual' && tier.savings && (
                        <p className="text-sm text-green-400 mt-2">Save ${tier.savings}/year</p>
                      )}
                    </>
                  ) : (
                    <div className="text-3xl font-bold text-white">Custom Pricing</div>
                  )}
                </div>

                {/* Quick Features */}
                <div className="space-y-3 mb-6">
                  {tier.features.core.slice(0, 4).map((feature: { name: string; included: boolean }, idx: number) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{feature.name}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-gray-800/50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Current Users</div>
                    <div className="text-lg font-bold text-white">{tier.stats.currentUsers}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Avg Revenue</div>
                    <div className="text-lg font-bold text-green-400">${(tier.stats.avgRevenue / 1000).toFixed(1)}k</div>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#19F6FF] text-black hover:bg-[#00BCC9]'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                }`}>
                  {tier.monthlyPrice ? 'Select Plan' : 'Contact Sales'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Detailed Comparison Table */}
        {showComparison && selectedTierData && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">📋 Detailed Feature Comparison</h3>
            
            <div className="space-y-6">
              {/* Core Features */}
              <div>
                <h4 className="text-lg font-bold text-[#19F6FF] mb-4">Core Features</h4>
                <div className="space-y-2">
                  {selectedTierData.features.core.map((feature: { name: string; included: boolean }, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-white">{feature.name}</span>
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics */}
              <div>
                <h4 className="text-lg font-bold text-[#19F6FF] mb-4">Analytics & Reporting</h4>
                <div className="space-y-2">
                  {selectedTierData.features.analytics.map((feature: { name: string; included: boolean; limit?: string }, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-white">{feature.name}</span>
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Data Access */}
              <div>
                <h4 className="text-lg font-bold text-[#19F6FF] mb-4">Data & API Access</h4>
                <div className="space-y-2">
                  {selectedTierData.features.data.map((feature: { name: string; included: boolean; limit?: string }, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-white">{feature.name}</span>
                      <div className="flex items-center gap-2">
                        {feature.limit && (
                          <span className="text-xs text-gray-400">{feature.limit}</span>
                        )}
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <X className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-lg font-bold text-[#19F6FF] mb-4">Support & Service</h4>
                <div className="space-y-2">
                  {selectedTierData.features.support.map((feature: { name: string; included: boolean }, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-white">{feature.name}</span>
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Users */}
              <div>
                <h4 className="text-lg font-bold text-[#19F6FF] mb-4">User Management</h4>
                <div className="space-y-2">
                  {selectedTierData.features.users.map((feature: { name: string; limit?: string; included?: boolean }, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-white">{feature.name}</span>
                      <div className="flex items-center gap-2">
                        {feature.limit && (
                          <span className="text-xs text-gray-400">{feature.limit}</span>
                        )}
                        {feature.included !== undefined && (
                          feature.included ? (
                            <Check className="w-5 h-5 text-green-400" />
                          ) : (
                            <X className="w-5 h-5 text-red-400" />
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Ready to upgrade your clients?</h3>
              <p className="text-gray-400">Contact our sales team to discuss custom solutions</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                Schedule Demo
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}