// Alternative: Tabs with subtle indicators
'use client'
import React from 'react'

interface TopBarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    tabs?: { id: string; label: string }[];
}

export default function TopBar({ activeTab, setActiveTab, tabs }: TopBarProps) {
    const navigationItems = tabs ?? [
        { id: 'home', label: 'Home' },
        { id: 'properties', label: 'Properties' },
        { id: 'feeds', label: 'Feeds' },
        { id: 'reports', label: 'Reports' },
        { id: 'upload', label: 'Upload' },
        { id: 'qa', label: 'Q&A' },
        { id: 'settings', label: 'Settings' }
    ];

    return (
        <div className="border-b border-zinc-800 bg-black">
            {/* Compact Header */}
            <div className="flex items-center justify-between px-6 py-3">
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <div>
                        <h1 className="text-xl font-bold text-teal-400">InvestorHub</h1>
                        <p className="text-xs text-gray-400">Property Intelligence</p>
                    </div>
                    
                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`px-4 py-2.5 rounded-md transition-all relative ${activeTab === item.id
                                    ? 'bg-teal-500/20 text-teal-400 font-semibold'
                                    : 'text-gray-400 hover:text-white hover:bg-zinc-800'
                                    }`}
                            >
                                {item.label}
                                {activeTab === item.id && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-teal-500 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* User Section */}
                <div className="flex items-center gap-4">
                    <button className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors relative">
                        🔔
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-sm font-medium">John Investor</p>
                            <p className="text-xs text-gray-400">Premium</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                            JD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}