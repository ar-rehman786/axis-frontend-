"use client"
import { useEffect, useState } from 'react';
import Topbar1 from '@/components/dashboard/Topbar1'
import { DASHBOARD_TABS, DashboardId, DASHBOARDS } from '@/components/dashboard/Dashboard1';

export default function page() {
  // Change default to 'sales' instead of 'lender'
  const [activeDashboard, setActiveDashboard] = useState<DashboardId>('marketplace');
  const [activeTab, setActiveTab] = useState<string>('browse');

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