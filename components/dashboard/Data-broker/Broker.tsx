import React, { useEffect, useState } from 'react'
import { DASHBOARD_TABS, DashboardId, DASHBOARDS } from '../Dashboard1';
import Topbar1 from '../Topbar1';

export default function Broker() {

    const [activeDashboard, setActiveDashboard] = useState<DashboardId>('lender');
    const [activeTab, setActiveTab] = useState<string>('dashboard');

    const currentTabs = DASHBOARD_TABS[activeDashboard] || [];

    const currentDashboardInfo = DASHBOARDS.find(d => d.id === activeDashboard);
    const ActiveTabComponent = currentTabs.find(t => t.id === activeTab)?.component;

    useEffect(() => {
        const tabs = DASHBOARD_TABS[activeDashboard] || [];
        if (tabs.length > 0) {
            setActiveTab(tabs[0].id);
        }
    }, [activeDashboard]);

    const handleDashboardClick = (dashboardId: DashboardId): void => {
        setActiveDashboard(dashboardId);
    };

    const handleTabClick = (tabId: string): void => {
        setActiveTab(tabId);
    };

    return (
        <>
            <main className="flex-1 min-h-screen bg-black ">
                <Topbar1
                    currentDashboard={currentDashboardInfo}
                    currentTabs={currentTabs}
                    activeTab={activeTab}
                    onTabChange={handleTabClick}
                />
                <div className="p-8">
                    <div className="p-8">
                        {ActiveTabComponent ? (
                            <div>
                                <ActiveTabComponent />
                                {/* Add footer disclaimer for Realtor and Title dashboards */}
                                {(activeDashboard === 'Realtor' || activeDashboard === 'Title') && (
                                    <div className="mt-8 bg-zinc-900 border-t border-zinc-800 px-6 py-3">
                                        <p className="text-xs text-gray-500 flex items-center gap-2">
                                            <span className="text-yellow-500">⚖️</span>
                                            {activeDashboard === 'Realtor'
                                                ? '24h Delay — Informational Only. Not for immediate transaction decisions.'
                                                : 'Predictive data for planning purposes only. Actual transaction volume may vary.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
