'use client'
import React, { useState } from 'react';
import { Home, TrendingUp, Rss, FileText, Upload, CheckSquare, Settings } from 'lucide-react';
import TitleHomeTab from './tabs/Home';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PipelineTab from './tabs/Pipeline';
import FeedsTab from './tabs/Feeds';
import ReportsTab from './tabs/Reports';
import UploadTab from './tabs/Uploads';
import QATab from './tabs/QA';
import SettingsTab from './tabs/Setting';



const TitleDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
    { id: 'feeds', label: 'Feeds', icon: Rss },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'upload', label: 'Upload', icon: Upload },
    { id: 'qa', label: 'QA', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return <TitleHomeTab />;
      //   case 'pipeline':
      //     return <PipelineTab />;
      //   case 'feeds':
      //     return <TitleFeedsTab />;
      //   case 'reports':
      //     return <TitleReportsTab />;
      //   case 'upload':
      //     return <TitleUploadTab />;
      //   case 'qa':
      //     return <TitleQATab />;
      //   case 'settings':
      //     return <TitleSettingsTab />;
      default:
        return <TitleHomeTab />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar />

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-black">
          {activeTab === "home" && <TitleHomeTab />}
          {activeTab === "pipeline" && <PipelineTab/>} 
           {activeTab === "feeds" && <FeedsTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "upload" && <UploadTab />}
          {activeTab === "qa" && <QATab />}
          {activeTab === "settings" && <SettingsTab />}
        </div>

        {/* Footer Disclaimer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-3">
          <p className="text-xs text-gray-500 flex items-center gap-2">
            <span className="text-yellow-500">⚖️</span>
            Predictive data for planning purposes only. Actual transaction volume may vary.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TitleDashboard;