import React, { useState } from 'react';

import { Lightbulb, TrendingUp, AlertTriangle, Target, Award, Users, Calendar, Filter } from 'lucide-react';

type InsightCategory = 'opportunity' | 'trend' | 'risk' | 'demographic';
type InsightPriority = 'high' | 'medium' | 'low';

type InsightMetrics = Record<string, string | number>;

type Insight = {
  id: number;
  category: InsightCategory;
  priority: InsightPriority;
  title: string;
  description: string;
  impact: string;
  actionItems: string[];
  metrics: InsightMetrics;
  date: string;
  icon: React.ComponentType<{ className?: string }>;
};

export default function InsightCards() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | InsightCategory>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | InsightPriority>('all');

  // Insights Data
  const insights: Insight[] = [
    {
      id: 1,
      category: 'opportunity',
      priority: 'high',
      title: 'High-Equity Refinance Wave Expected',
      description: 'Over 2,800 homeowners in ZIP 27560 have gained significant equity (avg $127k) and are prime candidates for refinance in Q1 2026.',
      impact: 'High Revenue Potential',
      actionItems: [
        'Launch targeted refi campaign',
        'Prepare competitive rate sheets',
        'Contact high-equity homeowners'
      ],
      metrics: {
        potential: '$342M',
        candidates: 2847,
        avgEquity: '$127k',
        timeline: 'Q1 2026'
      },
      date: '2024-12-08',
      icon: Target
    },
    {
      id: 2,
      category: 'trend',
      priority: 'medium',
      title: 'First-Time Buyer Surge in Cary Area',
      description: 'Demographics show increasing millennial population (ages 28-35) entering homebuying market with strong pre-approval rates.',
      impact: 'Market Expansion',
      actionItems: [
        'Develop first-time buyer programs',
        'Partner with local employers',
        'Create educational content'
      ],
      metrics: {
        potential: '$215M',
        candidates: 1523,
        avgIncome: '$78k',
        timeline: 'Q4 2025'
      },
      date: '2024-12-07',
      icon: TrendingUp
    },
    {
      id: 3,
      category: 'risk',
      priority: 'high',
      title: 'Increasing Payment Delinquency in ZIP 27713',
      description: 'Late payments up 18% in past 60 days. Economic stress indicators suggest proactive outreach needed to prevent defaults.',
      impact: 'Risk Mitigation Required',
      actionItems: [
        'Contact at-risk borrowers',
        'Offer payment restructuring',
        'Monitor credit changes'
      ],
      metrics: {
        affected: 347,
        delinquency: '+18%',
        avgDays: '45 days',
        timeline: 'Immediate'
      },
      date: '2024-12-08',
      icon: AlertTriangle
    },
    {
      id: 4,
      category: 'opportunity',
      priority: 'medium',
      title: 'Luxury Market Expansion in North Raleigh',
      description: 'New high-income residents moving to ZIP 27617. Average home values increased 14.2% YoY with inventory shortages creating opportunity.',
      impact: 'Premium Segment Growth',
      actionItems: [
        'Develop jumbo loan offerings',
        'Target HNW prospects',
        'Partner with luxury builders'
      ],
      metrics: {
        potential: '$89M',
        candidates: 156,
        avgPrice: '$575k',
        timeline: 'Q1 2026'
      },
      date: '2024-12-06',
      icon: Award
    },
    {
      id: 5,
      category: 'demographic',
      priority: 'low',
      title: 'Tech Sector Growth Driving Housing Demand',
      description: 'Apple and Google expansions bringing 3,000+ jobs to RTP. Expect sustained housing demand in Durham/Morrisville corridor.',
      impact: 'Long-term Growth',
      actionItems: [
        'Build employer partnerships',
        'Prepare relocation packages',
        'Monitor inventory levels'
      ],
      metrics: {
        newJobs: '3000+',
        avgSalary: '$125k',
        impact: '+850 buyers',
        timeline: '2025-2026'
      },
      date: '2024-12-05',
      icon: Users
    },
    {
      id: 6,
      category: 'trend',
      priority: 'medium',
      title: 'Seasonal Pattern Suggests Q1 Buying Surge',
      description: 'Historical data shows 23% increase in purchase activity January-March. Inventory currently at 5-year low suggests strong competition.',
      impact: 'Market Timing',
      actionItems: [
        'Increase marketing budget',
        'Hire seasonal staff',
        'Optimize lead pipeline'
      ],
      metrics: {
        expected: '+23%',
        inventory: '5-yr low',
        competition: 'Very High',
        timeline: 'Jan-Mar 2026'
      },
      date: '2024-12-04',
      icon: Calendar
    }
  ];

  const getCategoryBadge = (category: InsightCategory) => {
    const badges: Record<InsightCategory, { bg: string; text: string; border: string; label: string }> = {
      opportunity: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Opportunity' },
      trend: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Trend' },
      risk: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Risk Alert' },
      demographic: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', label: 'Demographic' },
    };
    return badges[category];
  };

  const getPriorityBadge = (priority: InsightPriority) => {
    const badges: Record<InsightPriority, { bg: string; text: string; border: string }> = {
      high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
      medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
    };
    return badges[priority];
  };

  const filteredInsights = insights.filter(insight => {
    const matchesCategory = selectedCategory === 'all' || insight.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || insight.priority === selectedPriority;
    return matchesCategory && matchesPriority;
  });

  const stats = {
    total: insights.length,
    opportunities: insights.filter(i => i.category === 'opportunity').length,
    risks: insights.filter(i => i.category === 'risk').length,
    highPriority: insights.filter(i => i.priority === 'high').length
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">💡 Market Insights & Intelligence</h1>
          <p className="text-gray-400">AI-powered insights and actionable recommendations for your market</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Lightbulb className="w-5 h-5 text-[#19F6FF]" />
              <div className="text-xs text-gray-400">Total Insights</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-green-400" />
              <div className="text-xs text-gray-400">Opportunities</div>
            </div>
            <div className="text-3xl font-bold text-green-400">{stats.opportunities}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="text-xs text-gray-400">Risk Alerts</div>
            </div>
            <div className="text-3xl font-bold text-red-400">{stats.risks}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <div className="text-xs text-gray-400">High Priority</div>
            </div>
            <div className="text-3xl font-bold text-yellow-400">{stats.highPriority}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-[#19F6FF]" />
              <span className="text-sm font-semibold text-white">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value as 'all' | InsightCategory)
                }

                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Categories</option>
                <option value="opportunity">Opportunities</option>
                <option value="trend">Trends</option>
                <option value="risk">Risk Alerts</option>
                <option value="demographic">Demographics</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-white">Priority:</span>
              <select
                value={selectedPriority}
                onChange={(e) =>
                  setSelectedPriority(e.target.value as 'all' | InsightPriority)
                }

                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-400">
          Showing {filteredInsights.length} of {insights.length} insights
        </div>

        {/* Insight Cards */}
        <div className="grid grid-cols-2 gap-6">
          {filteredInsights.map((insight) => {
            const categoryBadge = getCategoryBadge(insight.category);
            const priorityBadge = getPriorityBadge(insight.priority);
            const Icon = insight.icon;
            
            return (
              <div
                key={insight.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#19F6FF] transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryBadge.bg}`}>
                    <Icon className={`w-6 h-6 ${categoryBadge.text}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryBadge.bg} ${categoryBadge.text} ${categoryBadge.border}`}>
                          {categoryBadge.label}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityBadge.bg} ${priorityBadge.text} ${priorityBadge.border} uppercase`}>
                          {insight.priority}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{insight.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                    
                    <div className="px-3 py-2 bg-gray-800/50 rounded-lg mb-4">
                      <div className="text-xs text-gray-400 mb-1">Impact:</div>
                      <div className="text-sm font-bold text-[#19F6FF]">{insight.impact}</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-white mb-2">Key Metrics:</div>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(insight.metrics).map(([key, value]) => (
                      <div key={key} className="p-2 bg-gray-800/50 rounded">
                        <div className="text-xs text-gray-400 capitalize mb-1">{key}</div>
                        <div className="text-sm font-bold text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-white mb-2">Action Items:</div>
                  <div className="space-y-2">
                    {insight.actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#19F6FF] mt-1.5"></div>
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                    Export
                  </button>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                    Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredInsights.length === 0 && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-16 text-center">
            <Lightbulb className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No insights found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}

        {/* Summary Banner */}
        <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">AI-Powered Market Intelligence</h3>
              <p className="text-gray-400">
                These insights are generated using advanced analytics and machine learning algorithms analyzing thousands of data points across your market.
              </p>
            </div>
            <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors whitespace-nowrap">
              Generate New Insights
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export All Insights
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Schedule Report
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Configure Alerts
          </button>
        </div>
      </div>
    </div>
  );
}