import React, { useState, useEffect } from 'react';
import { Home, TrendingUp, DollarSign, Bitcoin, Briefcase, PieChart } from 'lucide-react';

type DiversificationLevel = "excellent" | "good" | "moderate" | "poor";

interface PortfolioMetrics {
    totalValue: number;
    avgValue: number;
    invested: number;
    withdrawn: number;

}

interface PortfolioSummary {
    totalValue: number;
    realEstate: number;
    loans: number;
    investments: number;
    crypto: number;
    other: number;
}

export default function MultiAssetWidget() {
    const [selectedCustomer, setSelectedCustomer] = useState('all');
    const [selectedAsset, setSelectedAsset] = useState('all');
    //   const [animatedValues, setAnimatedValues] = useState({});

    const [animatedValues, setAnimatedValues] = useState<PortfolioSummary>({
        totalValue: 0,
        realEstate: 0,
        loans: 0,
        investments: 0,
        crypto: 0,
        other: 0,
    });
    const portfolioSummary = {
        totalValue: 2847000,
        realEstate: 1245000,
        loans: 892000,
        investments: 456000,
        crypto: 154000,
        other: 100000
    };

    const assetClasses = [
        {
            name: 'Real Estate',
            icon: Home,
            value: 1245000,
            percentage: 43.7,
            change: 12.4,
            color: 'red',
            count: 3,
            avgValue: 415000
        },
        {
            name: 'Loan Portfolio',
            icon: DollarSign,
            value: 892000,
            percentage: 31.3,
            change: 5.8,
            color: 'teal',
            count: 5,
            avgValue: 178400
        },
        {
            name: 'Investments',
            icon: TrendingUp,
            value: 456000,
            percentage: 16.0,
            change: 8.2,
            color: 'yellow',
            count: 12,
            avgValue: 38000
        },
        {
            name: 'Cryptocurrency',
            icon: Bitcoin,
            value: 154000,
            percentage: 5.4,
            change: -15.3,
            color: 'blue',
            count: 4,
            avgValue: 38500
        },
        {
            name: 'Other Assets',
            icon: Briefcase,
            value: 100000,
            percentage: 3.5,
            change: 3.1,
            color: 'gray',
            count: 8,
            avgValue: 12500
        }
    ];

    const customers = [
        {
            id: 1,
            name: 'Johnson Family',
            totalValue: 1450000,
            assets: {
                realEstate: 850000,
                loans: 420000,
                investments: 145000,
                crypto: 25000,
                other: 10000
            },
            riskScore: 28,
            diversification: 'excellent'
        },
        {
            id: 2,
            name: 'Martinez Household',
            totalValue: 890000,
            assets: {
                realEstate: 520000,
                loans: 245000,
                investments: 98000,
                crypto: 15000,
                other: 12000
            },
            riskScore: 42,
            diversification: 'good'
        },
        {
            id: 3,
            name: 'Chen Family',
            totalValue: 1950000,
            assets: {
                realEstate: 1100000,
                loans: 550000,
                investments: 235000,
                crypto: 45000,
                other: 20000
            },
            riskScore: 18,
            diversification: 'excellent'
        },
        {
            id: 4,
            name: 'Rodriguez Household',
            totalValue: 675000,
            assets: {
                realEstate: 380000,
                loans: 195000,
                investments: 78000,
                crypto: 12000,
                other: 10000
            },
            riskScore: 55,
            diversification: 'poor'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimatedValues((prev: PortfolioSummary) => {
                const newValues: PortfolioSummary = { ...prev };

                (Object.keys(portfolioSummary) as (keyof PortfolioSummary)[]).forEach((key) => {
                    const target = portfolioSummary[key];
                    const current = prev[key];
                    newValues[key] = current < target ? Math.min(current + Math.ceil(target / 20), target) : target;
                });

                return newValues;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [portfolioSummary]);

    const getDiversificationBadge = (
        level: DiversificationLevel
    ): { bg: string; text: string; border: string } => {
        const badges: Record<DiversificationLevel, { bg: string; text: string; border: string }> = {
            excellent: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
            good: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
            moderate: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
            poor: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' }
        };

        return badges[level];
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">📊 Multi-Asset Portfolio View</h1>
                    <p className="text-gray-400">Comprehensive view of customer asset holdings across all categories</p>
                </div>

                {/* Controls */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <PieChart className="w-5 h-5 text-[#19F6FF]" />
                            <span className="text-sm font-semibold text-white">Customer:</span>
                            <select
                                value={selectedCustomer}
                                onChange={(e) => setSelectedCustomer(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Customers</option>
                                {customers.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white">Asset Class:</span>
                            <select
                                value={selectedAsset}
                                onChange={(e) => setSelectedAsset(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Assets</option>
                                {assetClasses.map(a => (
                                    <option key={a.name} value={a.name}>{a.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Total Portfolio Value */}
                <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm text-gray-400 mb-2">Total Portfolio Value</div>
                            <div className="text-5xl font-bold text-white mb-2">
                                {/* ${((animatedValues.totalValue || 0) / 1000000).toFixed(2)} */}
                                ${(((animatedValues.totalValue ?? 0) as number) / 1000000).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-400">Across all asset classes</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-gray-400 mb-2">Portfolio Growth</div>
                            <div className="text-3xl font-bold text-red-400">+8.7%</div>
                            <div className="text-sm text-gray-400">Last 12 months</div>
                        </div>
                    </div>
                </div>

                {/* Asset Class Breakdown */}
                <div className="grid grid-cols-5 gap-4">
                    {assetClasses.map((asset, idx) => {
                        const Icon = asset.icon;
                        // const value = animatedValues[asset.name.toLowerCase().replace(' ', '')] || 0;
                        const key = asset.name.toLowerCase().replace(' ', '') as keyof PortfolioSummary;
                        const value = animatedValues[key] ?? 0;

                        return (
                            <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 hover:border-[#19F6FF] transition-all">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 bg-${asset.color}-500/20 rounded-xl flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 text-${asset.color}-400`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-gray-400 mb-1">{asset.name}</div>
                                        <div className="text-lg font-bold text-white">
                                            ${(asset.value / 1000).toFixed(0)}k
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-400">Portfolio %</span>
                                        <span className="text-white font-semibold">{asset.percentage.toFixed(1)}%</span>
                                    </div>

                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div
                                            className={`bg-${asset.color}-500 h-2 rounded-full transition-all duration-1000`}
                                            style={{ width: `${asset.percentage}%` }}
                                        ></div>
                                    </div>

                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-400">Change</span>
                                        <span className={`font-semibold ${asset.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                            {asset.change > 0 ? '+' : ''}{asset.change}%
                                        </span>
                                    </div>

                                    <div className="pt-2 border-t border-gray-700 flex items-center justify-between text-xs text-gray-400">
                                        <span>{asset.count} holdings</span>
                                        <span>Avg: ${(asset.avgValue / 1000).toFixed(0)}k</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Portfolio Pie Chart Visualization */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Asset Allocation</h3>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex items-center justify-center">
                            <div className="relative w-64 h-64">
                                {/* Simplified Pie Chart Representation */}
                                <div className="absolute inset-0 rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
                                <div className="absolute inset-0 rounded-full border-8 border-teal-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 50% 0%, 50% 100%, 0% 100%, 0% 0%)' }}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-white">$2.8M</div>
                                        <div className="text-sm text-gray-400">Total Value</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {assetClasses.map((asset, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full bg-${asset.color}-500`}></div>
                                        <span className="text-sm font-medium text-white">{asset.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-white">${(asset.value / 1000).toFixed(0)}k</div>
                                        <div className="text-xs text-gray-400">{asset.percentage.toFixed(1)}%</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Customer Portfolio Details */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">👥 Customer Portfolio Breakdown</h3>

                    <div className="space-y-4">
                        {customers.map((customer) => {
                            // const badge = getDiversificationBadge(customer.diversification);
                            const badge = getDiversificationBadge(customer.diversification as "excellent" | "good" | "moderate" | "poor");

                            return (
                                <div key={customer.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="px-4 py-3 bg-gradient-to-br from-[#19F6FF]/20 to-[#00BCC9]/20 rounded-xl border border-[#19F6FF]/30">
                                                <div className="text-xs text-gray-400 mb-1">Total Value</div>
                                                <div className="text-xl font-bold text-white">${(customer.totalValue / 1000).toFixed(0)}k</div>
                                            </div>

                                            <div>
                                                <h4 className="text-base font-bold text-white mb-1">{customer.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-gray-400">Risk Score:</span>
                                                    <span className={`text-xs font-bold ${customer.riskScore < 30 ? 'text-teal-400' :
                                                            customer.riskScore < 50 ? 'text-yellow-400' : 'text-blue-400'
                                                        }`}>
                                                        {customer.riskScore}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border} capitalize`}>
                                            {customer.diversification} Diversification
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-5 gap-3">
                                        {Object.entries(customer.assets).map(([key, value]) => (
                                            <div key={key} className="p-3 bg-gray-900/50 rounded-lg">
                                                <div className="text-xs text-gray-400 mb-1 capitalize">{key.replace('real', 'Real ')}</div>
                                                <div className="text-sm font-bold text-white">${(value / 1000).toFixed(0)}k</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {((value / customer.totalValue) * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                        Export Portfolio Report
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Rebalance Analysis
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Risk Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}