import React from 'react';
import { LucideIcon } from 'lucide-react';

type DashboardTab = {
    id: string;
    label: string;
    component?: React.ComponentType<any>;
};

type DashboardInfo = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
};

type Topbar1Props = {
    currentDashboard?: DashboardInfo;
    currentTabs: DashboardTab[];
    activeTab: string;
    onTabChange: (tabId: string) => void;
};

export default function Topbar1({ currentDashboard, currentTabs, activeTab, onTabChange }: Topbar1Props) {
    
    const handleTabClick = (tabId: string): void => {
        if (onTabChange) {
            onTabChange(tabId);
        }
    };

    return (
        <div className="border-b border-gray-900 sticky top-0 bg-black z-10">
            {/* Dashboard Title */}
            <div className="px-8 py-6 border-b border-gray-900">
                <div className="flex items-center gap-3">
                    {currentDashboard && (
                        <>
                            <div className={`w-10 h-10 ${currentDashboard.iconBg} rounded-lg flex items-center justify-center`}>
                                {React.createElement(currentDashboard.icon, { className: "w-5 h-5 text-white" })}
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{currentDashboard.title}</h1>
                                <p className="text-xs text-gray-500">{currentDashboard.description}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Nested Tabs */}
            {currentTabs && currentTabs.length > 0 && (
                <div className="px-8">
                    <div className="flex gap-1 overflow-x-auto scrollbar-hide">
                        {currentTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => handleTabClick(tab.id)}
                                className={`px-5 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                                    activeTab === tab.id
                                        ? 'text-[#00D4D4] border-[#00D4D4]'
                                        : 'text-gray-500 border-transparent hover:text-gray-300'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
