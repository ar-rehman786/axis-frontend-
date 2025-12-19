import React, { useState, useEffect, JSX } from 'react';
import { PieChart, TrendingUp, TrendingDown, AlertTriangle, Shield, DollarSign, Percent } from 'lucide-react';

export default function MultiAssetExposureTable() {
    const [selectedInstitution, setSelectedInstitution] = useState('all');
    const [selectedAssetClass, setSelectedAssetClass] = useState('all');
    const [sortBy, setSortBy] = useState('exposure');
    const [animatedValues, setAnimatedValues] = useState({});

    // Portfolio Summary
    const portfolioSummary = {
        totalExposure: 1847000000000,
        totalInstitutions: 156,
        avgConcentration: 42,
        riskWeightedAssets: 894000000000,
        capitalRatio: 14.2
    };

    // Asset Classes
    const assetClasses = [
        {
            class: 'Government Bonds',
            exposure: 456000000000,
            percentage: 24.7,
            institutions: 89,
            riskWeight: 0,
            trend: 'stable',
            ytd: 2.4
        },
        {
            class: 'Corporate Bonds',
            exposure: 389000000000,
            percentage: 21.1,
            institutions: 124,
            riskWeight: 20,
            trend: 'increasing',
            ytd: 5.8
        },
        {
            class: 'Equities',
            exposure: 312000000000,
            percentage: 16.9,
            institutions: 98,
            riskWeight: 100,
            trend: 'increasing',
            ytd: 12.3
        },
        {
            class: 'Real Estate',
            exposure: 278000000000,
            percentage: 15.0,
            institutions: 67,
            riskWeight: 50,
            trend: 'stable',
            ytd: 4.2
        },
        {
            class: 'Derivatives',
            exposure: 234000000000,
            percentage: 12.7,
            institutions: 45,
            riskWeight: 75,
            trend: 'decreasing',
            ytd: -3.1
        },
        {
            class: 'Commodities',
            exposure: 178000000000,
            percentage: 9.6,
            institutions: 34,
            riskWeight: 85,
            trend: 'increasing',
            ytd: 8.7
        }
    ];

    // Institutional Exposures
    const institutions = [
        {
            name: 'JPMorgan Chase',
            totalExposure: 145000000000,
            assetBreakdown: {
                govBonds: 42000000000,
                corpBonds: 38000000000,
                equities: 28000000000,
                realEstate: 20000000000,
                derivatives: 12000000000,
                commodities: 5000000000
            },
            concentration: 31,
            riskScore: 45,
            capitalRatio: 15.8
        },
        {
            name: 'Goldman Sachs',
            totalExposure: 123000000000,
            assetBreakdown: {
                govBonds: 28000000000,
                corpBonds: 32000000000,
                equities: 35000000000,
                realEstate: 15000000000,
                derivatives: 8000000000,
                commodities: 5000000000
            },
            concentration: 28,
            riskScore: 52,
            capitalRatio: 14.2
        },
        {
            name: 'Bank of America',
            totalExposure: 134000000000,
            assetBreakdown: {
                govBonds: 48000000000,
                corpBonds: 36000000000,
                equities: 22000000000,
                realEstate: 18000000000,
                derivatives: 7000000000,
                commodities: 3000000000
            },
            concentration: 36,
            riskScore: 38,
            capitalRatio: 16.1
        },
        {
            name: 'Citigroup',
            totalExposure: 118000000000,
            assetBreakdown: {
                govBonds: 35000000000,
                corpBonds: 30000000000,
                equities: 28000000000,
                realEstate: 16000000000,
                derivatives: 6000000000,
                commodities: 3000000000
            },
            concentration: 30,
            riskScore: 48,
            capitalRatio: 14.8
        },
        {
            name: 'Morgan Stanley',
            totalExposure: 98000000000,
            assetBreakdown: {
                govBonds: 22000000000,
                corpBonds: 26000000000,
                equities: 30000000000,
                realEstate: 12000000000,
                derivatives: 5000000000,
                commodities: 3000000000
            },
            concentration: 31,
            riskScore: 55,
            capitalRatio: 13.6
        }
    ];

    // Concentration Risk
    const concentrationData = [
        { range: '0-20%', institutions: 45, color: 'teal' },
        { range: '20-40%', institutions: 67, color: 'yellow' },
        { range: '40-60%', institutions: 32, color: 'blue' },
        { range: '60%+', institutions: 12, color: 'blue' }
    ];

    // Animate values
    useEffect(() => {
        const timer: NodeJS.Timeout = setInterval(() => {
            setAnimatedValues(
                (
                    prev: Record<string, number>
                ): Record<string, number> => {
                    const newValues: Record<string, number> = {};

                    Object.keys(portfolioSummary as Record<string, number>).forEach(
                        (key: string) => {
                            const target: number = (portfolioSummary as Record<string, number>)[key];
                            const current: number = prev[key] || 0;

                            newValues[key] =
                                current < target
                                    ? Math.min(current + Math.ceil(target / 20), target)
                                    : target;
                        }
                    );

                    return newValues;
                }
            );
        }, 50);

        return () => clearInterval(timer);
    }, []);

    const getRiskColor = (score: number): "blue" | "yellow" | "teal" => {
        if (score >= 60) return "blue";
        if (score >= 40) return "yellow";
        return "teal";
    };

    const getTrendIcon = (
        trend: "increasing" | "decreasing" | "stable"
    ): JSX.Element => {
        if (trend === "increasing")
            return <TrendingUp className="w-4 h-4 text-red-400" />;

        if (trend === "decreasing")
            return <TrendingDown className="w-4 h-4 text-blue-400" />;

        return <Shield className="w-4 h-4 text-gray-400" />;
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">📊 Multi-Asset Exposure Matrix</h1>
                    <p className="text-gray-400">Comprehensive view of institutional asset exposure and concentration risk</p>
                </div>

                {/* Controls */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <PieChart className="w-5 h-5 text-[#19F6FF]" />
                            <span className="text-sm font-semibold text-white">Institution:</span>
                            <select
                                value={selectedInstitution}
                                onChange={(e) => setSelectedInstitution(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Institutions</option>
                                {institutions.map(inst => (
                                    <option key={inst.name} value={inst.name}>{inst.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white">Asset Class:</span>
                            <select
                                value={selectedAssetClass}
                                onChange={(e) => setSelectedAssetClass(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Assets</option>
                                {assetClasses.map(ac => (
                                    <option key={ac.class} value={ac.class}>{ac.class}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-white">Sort By:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="exposure">Exposure</option>
                                <option value="risk">Risk Score</option>
                                <option value="concentration">Concentration</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Portfolio Summary Metrics */}
                <div className="grid grid-cols-5 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-xs text-gray-400">Total Exposure</div>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            ${(((animatedValues as Record<string, number>).totalExposure || 0) / 1_000_000_000_000).toFixed(2)}T
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-teal-400" />
                            </div>
                            <div className="text-xs text-gray-400">Institutions</div>
                        </div>
                        <div className="text-2xl font-bold text-white">
                            {(animatedValues as Record<string, number>).totalInstitutions || 0}
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <Percent className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div className="text-xs text-gray-400">Avg Concentration</div>
                        </div>
                        <div className="text-2xl font-bold text-yellow-400">
                            {((animatedValues as Record<string, number>).avgConcentration || 0)}%
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="text-xs text-gray-400">Risk-Weighted</div>
                        </div>
                        <div className="text-2xl font-bold text-purple-400">
                            ${(((animatedValues as Record<string, number>).riskWeightedAssets || 0) / 1_000_000_000).toFixed(0)}B
                        </div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-teal-400" />
                            </div>
                            <div className="text-xs text-gray-400">Capital Ratio</div>
                        </div>
                        <div className="text-2xl font-bold text-teal-400">
                            {portfolioSummary.capitalRatio}%
                        </div>
                    </div>
                </div>

                {/* Asset Class Breakdown */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">📈 Asset Class Breakdown</h3>

                    <div className="space-y-4">
                        {assetClasses.map((asset, idx) => (
                            <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-base font-bold text-white">{asset.class}</h4>
                                        {getTrendIcon(asset.trend as "increasing" | "decreasing" | "stable")}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-white">${(asset.exposure / 1000000000).toFixed(0)}B</div>
                                        <div className="text-xs text-gray-400">{asset.percentage}% of total</div>
                                    </div>
                                </div>

                                <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                                    <div
                                        className="bg-gradient-to-r from-[#19F6FF] to-[#00BCC9] h-3 rounded-full transition-all duration-1000"
                                        style={{ width: `${asset.percentage}%` }}
                                    ></div>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    <div className="p-2 bg-gray-900/50 rounded">
                                        <div className="text-xs text-gray-400">Institutions</div>
                                        <div className="text-sm font-bold text-white">{asset.institutions}</div>
                                    </div>
                                    <div className="p-2 bg-gray-900/50 rounded">
                                        <div className="text-xs text-gray-400">Risk Weight</div>
                                        <div className="text-sm font-bold text-white">{asset.riskWeight}%</div>
                                    </div>
                                    <div className="p-2 bg-gray-900/50 rounded">
                                        <div className="text-xs text-gray-400">YTD Change</div>
                                        <div className={`text-sm font-bold ${asset.ytd > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                            {asset.ytd > 0 ? '+' : ''}{asset.ytd}%
                                        </div>
                                    </div>
                                    <div className="p-2 bg-gray-900/50 rounded">
                                        <div className="text-xs text-gray-400">Trend</div>
                                        <div className="text-sm font-medium text-white capitalize">{asset.trend}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Institutional Exposure Table */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">🏦 Institutional Exposure Details</h3>

                    <div className="space-y-4">
                        {institutions.map((inst, idx) => {
                            const riskColor = getRiskColor(inst.riskScore);

                            return (
                                <div key={idx} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`px-4 py-3 bg-${riskColor}-500/10 border border-${riskColor}-500/30 rounded-xl`}>
                                                <div className="text-xs text-gray-400 mb-1">Risk Score</div>
                                                <div className={`text-2xl font-bold text-${riskColor}-400`}>{inst.riskScore}</div>
                                            </div>
                                            <div>
                                                <h4 className="text-base font-bold text-white mb-1">{inst.name}</h4>
                                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                                    <span>Exposure: ${(inst.totalExposure / 1000000000).toFixed(0)}B</span>
                                                    <span>•</span>
                                                    <span>Concentration: {inst.concentration}%</span>
                                                    <span>•</span>
                                                    <span>Capital Ratio: {inst.capitalRatio}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-6 gap-3">
                                        {Object.entries(inst.assetBreakdown).map(([key, value]) => (
                                            <div key={key} className="p-3 bg-gray-900/50 rounded-lg">
                                                <div className="text-xs text-gray-400 mb-1 capitalize">
                                                    {key.replace('gov', 'Gov ').replace('corp', 'Corp ')}
                                                </div>
                                                <div className="text-sm font-bold text-white">${(value / 1000000000).toFixed(1)}B</div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {((value / inst.totalExposure) * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Concentration Risk Distribution */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">⚠️ Concentration Risk Distribution</h3>

                    <div className="grid grid-cols-4 gap-6">
                        {concentrationData.map((data, idx) => (
                            <div key={idx} className={`bg-${data.color}-500/10 border border-${data.color}-500/30 rounded-xl p-6`}>
                                <div className="text-center mb-4">
                                    <div className={`text-4xl font-bold text-${data.color}-400 mb-2`}>
                                        {data.institutions}
                                    </div>
                                    <div className="text-sm text-gray-400">Institutions</div>
                                </div>
                                <div className={`text-center py-2 px-4 bg-${data.color}-500/20 rounded-lg`}>
                                    <div className={`text-sm font-bold text-${data.color}-400`}>{data.range}</div>
                                    <div className="text-xs text-gray-400">Concentration</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                        Export Exposure Report
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Risk Analysis
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Rebalancing Tool
                    </button>
                </div>
            </div>
        </div>
    );
}