'use client'
import React, { useState } from 'react'
import { Home, TrendingUp, Rss, FileText, Upload, CheckSquare, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
//   const [activeTab, setActiveTab] = useState('home');

    const navigationItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'pipeline', label: 'Pipeline', icon: TrendingUp },
        { id: 'feeds', label: 'Feeds', icon: Rss },
        { id: 'reports', label: 'Reports', icon: FileText },
        { id: 'upload', label: 'Upload', icon: Upload },
        { id: 'qa', label: 'QA', icon: CheckSquare },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];
    return (
        <>
            <div className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-2xl font-bold text-teal-400">TitleHub</h1>
                    <p className="text-xs text-gray-400 mt-1">Transaction Intelligence</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id
                                                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                                                : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-sm font-bold">
                            TC
                        </div>
                        <div>
                            <p className="text-sm font-medium">Title Coordinator</p>
                            <p className="text-xs text-gray-400">Premium Account</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
