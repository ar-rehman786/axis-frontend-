'use client'
import React, { useState } from 'react';
import { Building2, Users, Target, DollarSign, FileText, Settings } from 'lucide-react';
import HomeTab from './tabs/HomeTab';
import TeamTab from './tabs/TeamTab';
import OpportunitiesTab from './tabs/OpportunitiesTab';
import RevenueTab from './tabs/RevenueTab';
import ReportsTab from './tabs/ReportsTab';
import SettingsTab from './tabs/SettingsTab';

type TabId = 'home' | 'team' | 'opportunities' | 'revenue' | 'reports' | 'settings';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const TABS: Tab[] = [
  { id: 'home', label: 'Home', icon: Building2, component: HomeTab },
  { id: 'team', label: 'Team', icon: Users, component: TeamTab },
  { id: 'opportunities', label: 'Opps', icon: Target, component: OpportunitiesTab },
  { id: 'revenue', label: 'Revenue', icon: DollarSign, component: RevenueTab },
  { id: 'reports', label: 'Reports', icon: FileText, component: ReportsTab },
  { id: 'settings', label: 'Settings', icon: Settings, component: SettingsTab }
];

export default function FirmIntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [selectedTeam, setSelectedTeam] = useState('ABC Realty');
  const [selectedQuarter, setSelectedQuarter] = useState('Q4 2025');

  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component || HomeTab;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="border-b border-gray-900 bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Firm Intelligence</h1>
              <p className="text-sm text-gray-400">Team: {selectedTeam} • {selectedQuarter}</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option>ABC Realty</option>
                <option>XYZ Properties</option>
                <option>Summit Group</option>
              </select>
              <select 
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option>Q4 2025</option>
                <option>Q3 2025</option>
                <option>Q2 2025</option>
                <option>Q1 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-[#00D4D4] border-[#00D4D4]'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        <ActiveComponent />
      </div>
    </div>
  );
}