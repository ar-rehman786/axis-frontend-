'use client'
import React, { useState } from 'react'
import TopBar from './Tabs/TopBar';
import HomeTab from './Tabs/Home';
import { realtorMockData } from '@/utils/data/mockData';
import PropertyCardDemo from './Tabs/Properties';
import FeedsTab from './Tabs/Feeds';
import ReportsTab from './Reports';
import UploadTab from './Tabs/Upload';
import QATab from './Tabs/QA';
import SettingsTab from './Tabs/Setting';

export default function Realtor() {
    const mockData = realtorMockData;
    const [activeTab, setActiveTab] = useState<string>("home");

    // Define tabs for navigation - you can customize this array
    const tabs = [
        { id: "home", label: "Home" },
        { id: "properties", label: "Properties" },
        { id: "feeds", label: "Feeds" },
        { id: "reports", label: "Reports" },
        { id: "upload", label: "Upload" },
        { id: "qa", label: "Q&A" },
        { id: "settings", label: "Settings" }
    ];

    return (
        <>
            <div className="flex flex-col h-screen bg-black text-white">
                {/* Updated TopBar with tab navigation */}
                <TopBar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab}
                    tabs={tabs}
                />

                {/* Tab Content */}
                <div className="flex-1 overflow-auto bg-black">
                    {activeTab === "home" && <HomeTab/>}
                    {activeTab === "properties" && <PropertyCardDemo/>}
                    {activeTab === "feeds" && <FeedsTab/>}
                    {activeTab === "reports" && <ReportsTab/>}
                    {activeTab === "upload" && <UploadTab/>}
                    {activeTab === "qa" && <QATab/>}
                    {activeTab === "settings" && <SettingsTab/>}

                    {/* Footer Disclaimer */}
                    <div className="bg-zinc-900 border-t border-zinc-800 px-6 py-3">
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="text-yellow-500">⚖️</span>
                            24h Delay — Informational Only. Not for immediate transaction decisions.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}