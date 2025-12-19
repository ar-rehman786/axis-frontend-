"use client";
import React, { useState } from 'react';
import { User, DollarSign, TrendingUp, Globe, Target, ChevronRight, Home, MapPin, CreditCard } from 'lucide-react';
import ProfileTab from '@/components/dashboard/consumer/tabs/profileTab';
import FinancialTab from '@/components/dashboard/consumer/tabs/FinaincialTab';
import PredictiveTab from '@/components/dashboard/consumer/tabs/predictiveTab';;
import CrossMarketTab from '@/components/dashboard/consumer/tabs/CrossMarketTab';
import ActionsTab from '@/components/dashboard/consumer/tabs/ActionsTab';

type TabId = 'profile' | 'financial' | 'predictive' | 'crossmarket' | 'actions';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const TABS: Tab[] = [
  { id: 'profile', label: 'Profile', icon: User, component: ProfileTab },
  { id: 'financial', label: 'Financial', icon: DollarSign, component: FinancialTab },
  { id: 'predictive', label: 'Predictive', icon: TrendingUp, component: PredictiveTab },
  { id: 'crossmarket', label: 'Cross Market', icon: Globe, component: CrossMarketTab },
  { id: 'actions', label: 'Actions', icon: Target, component: ActionsTab }
];

interface OwnerInfo {
  name: string;
  id: string;
  property: string;
  zip: string;
}

export default function ConsumerIntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('profile');

  // Owner information (would come from route params in real app)
  const ownerInfo: OwnerInfo = {
    name: 'John Davidson',
    id: 'OWN-2024-5678',
    property: '123 Oak Street, Raleigh, NC',
    zip: '27609'
  };

  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component || ProfileTab;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top Bar with Navigation */}
      <div className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50">
        {/* Header Section */}
        <div className="px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold text-white">Consumer Intelligence</h1>
              <p className="text-sm text-gray-400 mt-1">Owner Profile: {ownerInfo.name}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">ID</div>
                <div className="text-sm font-medium text-white">{ownerInfo.id}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Property</div>
                <div className="text-sm font-medium text-white">{ownerInfo.property}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">ZIP</div>
                <div className="text-sm font-medium text-[#00D4D4]">{ownerInfo.zip}</div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Credit Score:</span>
              <span className="text-sm font-medium text-white">742</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Equity:</span>
              <span className="text-sm font-medium text-green-400">$180K</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Churn Risk:</span>
              <span className="text-sm font-medium text-yellow-400">68%</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-800">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 transition-all relative group ${
                  isActive
                    ? 'text-white bg-gray-900/50'
                    : 'text-gray-400 hover:text-white hover:bg-gray-900/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{tab.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D4D4]"></div>
                )}
                {!isActive && (
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-transparent group-hover:bg-gray-600 transition-all"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}