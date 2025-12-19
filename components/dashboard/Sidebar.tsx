'use client'
import { useState } from 'react';
import Dashboard from '@/components/dashboard/Dashboard';
import Feeds from './Feeds/Feeds';
import Reports from './Reports/Reports';
import Uploads from './Upload/Upload'
import QAIntegrity from './QA/Qa';
import Settings from './Settings/Settings'

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'feeds', icon: '📡', label: 'Feeds' },
    { id: 'reports', icon: '📄', label: 'Reports' },
    { id: 'uploads', icon: '📤', label: 'Uploads' },
    { id: 'qa', icon: '✓', label: 'QA & Integrity' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'feeds':
        return <Feeds />;
      case 'reports':
        return <Reports />;
      case 'uploads':
        return <Uploads />;
      case 'qa':
        return <QAIntegrity />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black border-r border-gray-800 flex flex-col h-screen fixed left-0 top-0">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-white font-semibold text-lg">Axis Trade Market</span>
            </div>
          </div>

          <nav className="flex-1 p-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${item.id === activeItem
                    ? 'bg-[#00D1D1] text-white'
                    : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 ml-64">{renderContent()}</main>
      </div>
    </>
  );
};

export default Sidebar;

