// Sidebar1.tsx
import React from 'react';
import { useRouter, usePathname } from "next/navigation";
import { Building2, ChevronRight, FileText, Grid3x3, MapPin, ShoppingCart, TrendingUp, BarChart3, LucideIcon } from 'lucide-react';

// Update this type to match the main file
type DashboardId = 'lender' | 'institutional' | 'broker' | 'sales' | 'marketplace' | 'reports' | 'geo' | 'Realtor' | 'Title' | 'consumer' | 'firm';

type DashboardInfo = {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconBg: string;
};

type Sidebar1Props = {
    activeDashboard: DashboardId;
    onDashboardChange: (dashboardId: DashboardId) => void;
};

// Update DASHBOARDS to include axis-dashboard
const DASHBOARDS: DashboardInfo[] = [
    // {
    //     id: 'Lendor',
    //     title: 'Lendor',
    //     description: 'Dashboard, Feeds, Reports & Settings',
    //     icon: BarChart3,
    //     iconBg: 'bg-gradient-to-br from-[#00D4D4] to-[#00B8B8]'
    // },
    {
        id: 'Title',
        title: 'Title Company',
        description: 'Dashboard, Feeds, Reports & Settings',
        icon: BarChart3,
        iconBg: 'bg-gradient-to-br from-[#00D4D4] to-[#00B8B8]'
    },
    {
        id: 'Realtor',
        title: 'Realtor',
        description: 'Dashboard, Feeds, Reports & Settings',
        icon: TrendingUp,
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
        id: 'lender',
        title: 'Lender Intelligence',
        description: 'Refi-ready homeowners & Loan lifecycle',
        icon: Grid3x3,
        iconBg: 'bg-gray-800'
    },
    
    {
        id: 'broker',
        title: 'Data Broker/Analytics',
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
        icon: MapPin,
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

export default function Sidebar1({ activeDashboard, onDashboardChange }: Sidebar1Props) {

    const router = useRouter();
    const pathname = usePathname();
    const handleDashboardClick = (dashboardId: string): void => {
        if (onDashboardChange) {
            onDashboardChange(dashboardId as DashboardId);
        }
    };

    return (
        <aside className="w-[400px] h-screen bg-black border-r border-gray-900 flex flex-col fixed left-0 top-0">
            <div className="p-6 pb-4 border-b border-gray-900 flex-shrink-0 flex items-center gap-x-2">
            {/* Logo */}
                    <img src="/axis-trade-market.jpeg" className='rounded-full h-20 w-20' alt="" />
                    {/* text added */}
                <h1 className="text-2xl font-bold tracking-tight">
                    <span className="text-white">AXIS</span>
                    <span className="text-[#00D4D4]">TRADE</span>
                </h1>
                <p className="text-gray-500 text-xs font-mono mt-1 tracking-wider">MARKET AI</p>
            </div>

            {/* Dashboards Section - Scrollable with completely hidden scrollbar */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-[#00D4D4] text-sm font-bold tracking-wider">DASHBOARDS</h2>
                        <div className="w-7 h-7 bg-[#00D4D4] rounded-full cursor-pointer flex items-center justify-center text-black text-xs font-bold">
                            {DASHBOARDS.length}
                        </div>
                    </div>

                    {/* Dashboard Cards */}
                    <div className="space-y-3">
                        {DASHBOARDS.map((dashboard) => {
                            const Icon = dashboard.icon;
                            // const href = `/dashboard/${dashboard.id.toLowerCase()}`;
                            const href = `/dashboard/${dashboard.id}`;


                            const isActive = pathname === href;
                            // const isActive = activeDashboard === dashboard.id;

                            return (
                                <button
                                    key={dashboard.id}
                                    // onClick={() => handleDashboardClick(dashboard.id)}
                                    onClick={() => router.push(href)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all group ${isActive
                                        ? 'bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700'
                                        : 'bg-transparent border-gray-900 hover:border-gray-800 hover:bg-gray-900/30'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 ${dashboard.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold text-base mb-1 leading-tight">
                                                {dashboard.title}
                                            </h3>
                                            <p className="text-gray-500 text-xs leading-relaxed">
                                                {dashboard.description}
                                            </p>
                                        </div>

                                        <ChevronRight
                                            className={`w-5 h-5 flex-shrink-0 transition-transform ${isActive ? 'text-[#00D4D4]' : 'text-gray-600 group-hover:text-gray-400'
                                                }`}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="p-6 border-t border-gray-900 flex-shrink-0">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-sm font-bold">
                        N
                    </div>
                </div>
            </div>
        </aside>
    );
}