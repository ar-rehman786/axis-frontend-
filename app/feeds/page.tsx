"use client"

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bell, TrendingUp, Home, LineChart, BarChart2, Activity, Target, Phone, Mail, FileText, User, Calendar, AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';

export default function FeedsPage() {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState('all');

  const feedTabs = [
    { id: 'overview', label: 'Overview', icon: Activity, path: '/feeds' },
    { id: 'crypto', label: 'Crypto', icon: TrendingUp, path: '/feeds/crypto' },
    { id: 'stocks', label: 'Stocks', icon: LineChart, path: '/feeds/stocks' },
    { id: 'housing', label: 'Housing', icon: Home, path: '/feeds/housing' },
    { id: 'correlations', label: 'Correlations', icon: BarChart2, path: '/feeds/correlations' },
    { id: 'alerts', label: 'Alerts', icon: Bell, path: '/feeds/alerts' }
  ];

  const filters = [
    { id: 'all', label: 'All Activity' },
    { id: 'leads', label: 'Leads' },
    { id: 'market', label: 'Market' },
    { id: 'team', label: 'Team' },
    { id: 'alerts', label: 'Alerts' }
  ];

  const activityData = [
    { 
      id: 1, 
      type: 'lead', 
      user: 'Sarah Johnson', 
      action: 'New lead submitted', 
      details: 'Website Form • Score: 85/100 • Equity: $425k',
      time: '2 mins ago',
      priority: 'high',
      icon: User,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    { 
      id: 2, 
      type: 'market', 
      user: 'Market Alert', 
      action: 'Fed Rate Decision', 
      details: 'Federal Reserve holds rates steady at 5.25-5.50%',
      time: '1 hour ago',
      priority: 'medium',
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20'
    },
    { 
      id: 3, 
      type: 'team', 
      user: 'John Smith', 
      action: 'Called lead', 
      details: 'Sarah Johnson • Duration: 12:34 • Outcome: Interested',
      time: '10 mins ago',
      priority: 'low',
      icon: Phone,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20'
    },
    { 
      id: 4, 
      type: 'refi', 
      user: 'Robert Williams', 
      action: 'Refinance Opportunity', 
      details: 'Equity Threshold • LTV: 52% • Current Rate: 6.5%',
      time: 'Today',
      priority: 'high',
      icon: AlertCircle,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20'
    },
    { 
      id: 5, 
      type: 'alert', 
      user: 'Susan Miller', 
      action: 'Rate Lock Expiry', 
      details: 'Rate lock expires in 3 days • Loan: #ML-2345',
      time: '2:00 PM',
      priority: 'critical',
      icon: Clock,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20'
    },
    { 
      id: 6, 
      type: 'team', 
      user: 'Lisa Wang', 
      action: 'Sent email', 
      details: 'Michael Chen • Subject: Refinance Options • Status: Opened',
      time: '25 mins ago',
      priority: 'low',
      icon: Mail,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20'
    }
  ];

  const marketMetrics = [
    { label: '30yr Fixed Rate', value: '6.05%', change: '-0.45%', trend: 'down' },
    { label: 'Market Volume', value: '$2.1B', change: '+8.2%', trend: 'up' },
    { label: 'Housing Inventory', value: '+8.5%', change: 'MoM', trend: 'up' },
    { label: 'Refi Applications', value: '32%', change: '-5.3%', trend: 'down' }
  ];

  return (
    <div className="space-y-6 p-14">
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Activity Overview</h2>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
            Refresh
          </button>
          <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
            Subscribe to Alerts
          </button>
        </div>
      </div>

      {/* Market Metrics */}
      <div className="grid grid-cols-4 gap-6">
        {marketMetrics.map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
            <p className="text-[#9CA3AF] text-sm mb-2">{metric.label}</p>
            <div className="flex items-center justify-between">
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
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === filter.id
                ? 'bg-[#00D1D1] text-white'
                : 'bg-[#2A2A2A] text-[#9CA3AF] hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <span className="text-[#9CA3AF] text-sm">Live updates</span>
        </div>

        {activityData
          .filter(item => activeFilter === 'all' || item.type === activeFilter)
          .map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${activity.bgColor} ${activity.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold text-lg">{activity.user}</h4>
                        <p className="text-[#9CA3AF] mt-1">{activity.action}</p>
                        <p className="text-[#9CA3AF] text-sm mt-2">{activity.details}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                        activity.priority === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {activity.priority.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-[#9CA3AF] text-sm">⏱ {activity.time}</span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="px-3 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded-lg hover:bg-[#00D1D1]/30 transition-colors text-sm">
                          Take Action
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Quick Stats */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Today's Summary</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">8</div>
            <div className="text-[#9CA3AF] text-sm">New Leads</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">24</div>
            <div className="text-[#9CA3AF] text-sm">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">4</div>
            <div className="text-[#9CA3AF] text-sm">Refi Opportunities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">12</div>
            <div className="text-[#9CA3AF] text-sm">Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
}