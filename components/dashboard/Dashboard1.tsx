// Dashboard1.tsx
'use client'
import React, { useState, useEffect } from 'react';
import { Grid3x3, Building2, TrendingUp, ShoppingCart, FileText, MapPin, BarChart3, LucideIcon, Target } from 'lucide-react';
import Sidebar1 from '../Sidebar1';
import Topbar1 from './Topbar1';

// Import components from first dashboard system
import RefinanceCyclePrediction from './Lender/tabs/RefinanceCyclePrediction';
import LoanLifecycleRisk from './Lender/tabs/LoanLifecycleRisk';
import SpendingBehaviorShift from './Lender/tabs/SpendingBehaviorShift';
import SilentCreditPanel from './Lender/tabs/SilentCreditPanel';
import MultiAssetWidget from './Lender/tabs/MultiAssetWidget';
import GlobalRiskMesh from './Institutional/Tabs/GlobalRiskMesh';
import CrossBankMovement from './Institutional/Tabs/CrossBankMovement';
import MultiAssetExposureTable from './Institutional/Tabs/MultiAssetExposureTable';
import TierComparisonCards from './Sales/TierComparisonCards';
import ClientUpgradePanel from './Sales/ClientUpgradePanel';
import AddOnFeaturePreviews from './Sales/AddOnFeaturePreviews';
import MarketFeedCard from './Market/MarketFeedCard';
import CartTray from './Market/CartTray';
import PackDetailModal from './Market/PackDetailModal';
import PDFListPanel from './PDF-viewer/PDFListPanel';
import PDFViewer from './PDF-viewer/PDFViewer';
import ActionBar from './PDF-viewer/ActionBar';
import MarketSelector from './GEO-intelligence/MarketSelector';
import ZIPHeatmap from './GEO-intelligence/ZIPHeatmap';
import InsightCards from './GEO-intelligence/InsightCards';

// Import components from second dashboard system
import Dashboard from '@/components/dashboard/Dashboard';
import Feeds from './Feeds/Feeds';
import Reports from './Reports/Reports';
import Uploads from './Upload/Upload';
import QAIntegrity from './QA/Qa';
import Settings from './Settings/Settings';

// Import individual tab components from Realtor
import HomeTab from '@/components/RealtorDashboard/Tabs/Home';
import PropertyCardDemo from '@/components/RealtorDashboard/Tabs/Properties';
import FeedsTab from '@/components/RealtorDashboard/Tabs/Feeds';
// import RealtorReportsTab from '@/components/RealtorDashboard/Tabs/';
import RealtorUploadTab from '@/components/RealtorDashboard/Tabs/Upload';
import RealtorQATab from '@/components/RealtorDashboard/Tabs/QA';
import RealtorSettingsTab from '@/components/RealtorDashboard/Tabs/Setting';

// Import individual tab components from Title
import TitleHomeTab from '@/components/TitleCompanyDadhbaord/tabs/Home';
import PipelineTab from '@/components/TitleCompanyDadhbaord/tabs/Pipeline';
import TitleFeedsTab from '@/components/TitleCompanyDadhbaord/tabs/Feeds';
import TitleReportsTab from '@/components/TitleCompanyDadhbaord/tabs/Reports';
import TitleUploadTab from '@/components/TitleCompanyDadhbaord/tabs/Uploads';
import TitleQATab from '@/components/TitleCompanyDadhbaord/tabs/QA';
import TitleSettingsTab from '@/components/TitleCompanyDadhbaord/tabs/Setting';
import BrokerFeedsTab from './Data-broker/FeedsTab';
import ProfileTab from '@/components/dashboard/consumer/tabs/profileTab';
import FinancialTab from '@/components/dashboard/consumer/tabs/FinaincialTab';
import PredictiveTab from '@/components/dashboard/consumer/tabs/predictiveTab';;
import CrossMarketTab from '@/components/dashboard/consumer/tabs/CrossMarketTab';
import ActionsTab from '@/components/dashboard/consumer/tabs/ActionsTab';

import HomeTabs from '@/components/dashboard/firm-intelligence-dashboard/tabs/HomeTab';
import TeamTab from '@/components/dashboard/firm-intelligence-dashboard/tabs/TeamTab';
import OpportunitiesTab from '@/components/dashboard/firm-intelligence-dashboard/tabs/OpportunitiesTab';
import RevenueTab from '@/components/dashboard/firm-intelligence-dashboard/tabs/RevenueTab';
import ReportsTab from '@/components/dashboard/firm-intelligence-dashboard/tabs/ReportsTab';
import SettingsTab from '@/components/dashboard/firm-intelligence-dashboard/tabs/SettingsTab';

export type DashboardTab = {
    id: string;
    label: string;
    component?: React.ComponentType<any>;
};

export type DashboardInfo = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
};

export type DashboardId = 'lender' | 'institutional' | 'broker' | 'sales' | 'marketplace' | 'reports' | 'geo'  | 'Realtor' | 'Title' | 'consumer' | 'firm';

// Tab Definitions - All dashboards with their individual tabs
export const DASHBOARD_TABS: Record<DashboardId, DashboardTab[]> = {
   
    lender: [
        { id: 'refi-prediction', label: 'Refi Prediction', component: RefinanceCyclePrediction },
        { id: 'loan-lifecycle', label: 'Loan Lifecycle', component: LoanLifecycleRisk },
        { id: 'spending-behavior', label: 'Spending Behavior', component: SpendingBehaviorShift },
        { id: 'credit-alerts', label: 'Credit Alerts', component: SilentCreditPanel },
        { id: 'multi-asset', label: 'Multi-Asset', component: MultiAssetWidget }
    ],
    
    // Realtor dashboard - individual tabs in top bar
    Realtor: [
        { id: 'home', label: 'Home', component: HomeTab },
        { id: 'properties', label: 'Properties', component: PropertyCardDemo },
        { id: 'feeds', label: 'Feeds', component: FeedsTab },
        // { id: 'reports', label: 'Reports', component: RealtorReportsTab },
        { id: 'upload', label: 'Upload', component: RealtorUploadTab },
        { id: 'qa', label: 'QA', component: RealtorQATab },
        { id: 'settings', label: 'Settings', component: RealtorSettingsTab }
    ],
    
    // Title dashboard - individual tabs in top bar
    Title: [
        { id: 'home', label: 'Home', component: TitleHomeTab },
        { id: 'pipeline', label: 'Pipeline', component: PipelineTab },
        { id: 'feeds', label: 'Feeds', component: TitleFeedsTab },
        { id: 'reports', label: 'Reports', component: TitleReportsTab },
        { id: 'upload', label: 'Upload', component: TitleUploadTab },
        { id: 'qa', label: 'QA', component: TitleQATab },
        { id: 'settings', label: 'Settings', component: TitleSettingsTab }
    ],
    
    institutional: [
        { id: 'risk-mesh', label: 'Global Risk Mesh', component: GlobalRiskMesh },
        { id: 'cross-bank', label: 'Cross-Bank Movement', component: CrossBankMovement },
        { id: 'multi-asset', label: 'Multi-Asset Exposure', component: MultiAssetExposureTable },
    ],
    sales: [
        { id: 'tier-comparison', label: 'Tier Comparison', component: TierComparisonCards },
        { id: 'client-upgrades', label: 'Client Upgrades', component: ClientUpgradePanel },
        { id: 'add-ons', label: 'Add-On Features', component: AddOnFeaturePreviews }
    ],
    marketplace: [
        { id: 'browse', label: 'Browse Packs', component: MarketFeedCard },
        { id: 'cart', label: 'Cart', component: CartTray },
        { id: 'orders', label: 'My Orders', component: PackDetailModal }
    ],
    reports: [
        { id: 'viewer', label: 'PDF Viewer', component: PDFViewer },
        { id: 'my-reports', label: 'My Reports', component: PDFListPanel },
        { id: 'action-bar', label: 'Action Bar', component: ActionBar }
    ],
    geo: [
        { id: 'market-selector', label: 'Market Selector', component: MarketSelector },
        { id: 'heatmap', label: 'Heat Map', component: ZIPHeatmap },
        { id: 'insight', label: 'Insight', component: InsightCards }
    ],

    broker: [
        { id: 'feeds', label: 'Feeds', component: BrokerFeedsTab },
        // { id: 'heatmap', label: 'Heat Map', component: ZIPHeatmap },
        // { id: 'insight', label: 'Insight', component: InsightCards }
    ],
    consumer: [
        { id: 'ProfileTab', label: 'ProfileTab', component: ProfileTab  },
        { id: 'FinancialTab', label: 'FinancialTab', component: FinancialTab },
        { id: 'PredictiveTab', label: 'PredictiveTab', component: PredictiveTab },
         { id: 'CrossMarketTab ', label: 'CrossMarketTab ', component: CrossMarketTab  },
        { id: 'ActionsTab', label: 'ActionsTab', component: ActionsTab },
    ],
     firm: [
        { id: 'HomeTabs', label: 'HomeTabs', component: HomeTabs  },
        { id: 'TeamTab', label: 'TeamTab', component: TeamTab },
        { id: 'OpportunitiesTab', label: 'OpportunitiesTab', component: OpportunitiesTab },
         { id: 'RevenueTab ', label: 'RevenueTab', component: RevenueTab },
        { id: 'ReportsTab', label: 'ReportsTab', component: ReportsTab },
        { id: 'SettingsTab', label: 'SettingsTab', component: SettingsTab },
    ]
    // 'Lendor': [
    //     { id: 'dashboard', label: 'Dashboard', component: Dashboard },
    //     { id: 'feeds', label: 'Feeds', component: Feeds },
    //     { id: 'reports', label: 'Reports', component: Reports },
    //     { id: 'uploads', label: 'Uploads', component: Uploads },
    //     { id: 'qa', label: 'QA & Integrity', component: QAIntegrity },
    //     { id: 'settings', label: 'Settings', component: Settings }
    // ]
};

// Dashboard Definitions - Updated to include all dashboards
export const DASHBOARDS: DashboardInfo[] = [
    {
        id: 'Lendor',
        title: 'Lendor',
        description: 'Dashboard, Feeds, Reports & Settings',
        icon: BarChart3,
        iconBg: 'bg-gradient-to-br from-[#00D4D4] to-[#00B8B8]'
    },
    {
        id: 'Realtor',
        title: 'Realtor',
        description: 'Property listings, market feeds & client management',
        icon: BarChart3,
        iconBg: 'bg-gradient-to-br from-[#00D4D4] to-[#00B8B8]'
    },
    {
        id: 'Title',
        title: 'Title Company',
        description: 'Title pipeline, document management & closing coordination',
        icon: BarChart3,
        iconBg: 'bg-gradient-to-br from-[#00D4D4] to-[#00B8B8]'
    },
    {
        id: 'lender',
        title: 'Lender Intelligence',
        description: 'Refi-ready homeowners & Loan lifecycle',
        icon: Grid3x3,
        iconBg: 'bg-gray-800'
    },
    {
        id: 'institutional',
        title: 'Institutional Intelligence',
        description: 'Cross-asset risk & macro analytics',
        icon: Building2,
        iconBg: 'bg-gray-800'
    },
    {
        id: 'sales',
        title: 'Sales Command Suite',
        description: 'Upsell panels & tier comparison',
        icon: TrendingUp,
        iconBg: 'bg-gradient-to-br from-yellow-600 to-yellow-700'
    },
    {
        id: 'marketplace',
        title: 'Data Pack Marketplace',
        description: 'Market intelligence & equity packs',
        icon: ShoppingCart,
        iconBg: 'bg-gray-800'
    },
    {
        id: 'reports',
        title: 'Analytics PDF Viewer',
        description: 'Generated reports & client delivery',
        icon: FileText,
        iconBg: 'bg-gray-800'
    },
    {
        id: 'geo',
        title: 'City/ZIP Intelligence',
        description: 'Hot ZIPs, churn risk & opportunity',
        icon: Target,
        iconBg: 'bg-gray-800'
    },
       {
        id: 'consumer',
        title: 'Consumer',
        description: 'Owner profiles & financial insights',
        icon: MapPin,
        iconBg: 'bg-gray-800'
    },
    {
        id: 'firm',
        title: 'Firm Intelligence',
        description: '`Firm profiles & market positioning',
        icon: MapPin,
        iconBg: 'bg-gray-800'
    }
];

export default function AxisTradeMarket() {
    const [activeDashboard, setActiveDashboard] = useState<DashboardId>('lender');
    const [activeTab, setActiveTab] = useState<string>('dashboard');

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

    // Get current tabs based on active dashboard
    const currentTabs = DASHBOARD_TABS[activeDashboard] || [];
    const currentDashboardInfo = DASHBOARDS.find(d => d.id === activeDashboard);
    const ActiveTabComponent = currentTabs.find(t => t.id === activeTab)?.component;

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="flex">
                {/* Sidebar */}
                <Sidebar1 
                    activeDashboard={activeDashboard}
                    onDashboardChange={handleDashboardClick}
                />

                {/* Main Content */}
                <main className="flex-1 min-h-screen bg-black ml-[400px]">
                    {/* Top Bar with Tabs */}
                    <Topbar1 
                        currentDashboard={currentDashboardInfo}
                        currentTabs={currentTabs}
                        activeTab={activeTab}
                        onTabChange={handleTabClick}
                    />

                    {/* Content Area */}
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
                </main>
            </div>
        </div>
    );
}