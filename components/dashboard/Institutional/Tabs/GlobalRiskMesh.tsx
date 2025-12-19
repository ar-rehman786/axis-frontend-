import React, { useState, useEffect, JSX } from 'react';
import { Globe, AlertTriangle, TrendingUp, TrendingDown, Shield, Zap, Network } from 'lucide-react';

export default function GlobalRiskMesh() {
    const [selectedRegion, setSelectedRegion] = useState('all');
    const [selectedRiskType, setSelectedRiskType] = useState('all');
    const [animatedScores, setAnimatedScores] = useState({});

    // Global Risk Summary
    const globalMetrics = {
        overallRisk: 67,
        activeThreats: 42,
        exposedInstitutions: 156,
        correlationIndex: 0.73,
        contagionRisk: 58
    };

    // Regional Risk Data
    const regions = [
        {
            name: 'North America',
            code: 'NA',
            riskScore: 45,
            trend: 'stable',
            institutions: 234,
            exposure: 12400000000,
            topRisks: ['Credit Risk', 'Market Volatility', 'Regulatory']
        },
        {
            name: 'Europe',
            code: 'EU',
            riskScore: 72,
            trend: 'increasing',
            institutions: 189,
            exposure: 9800000000,
            topRisks: ['Sovereign Debt', 'Currency Risk', 'Political']
        },
        {
            name: 'Asia Pacific',
            code: 'APAC',
            riskScore: 58,
            trend: 'decreasing',
            institutions: 312,
            exposure: 15600000000,
            topRisks: ['Market Risk', 'Liquidity', 'Operational']
        },
        {
            name: 'Latin America',
            code: 'LATAM',
            riskScore: 81,
            trend: 'increasing',
            institutions: 98,
            exposure: 4200000000,
            topRisks: ['Political Risk', 'Currency', 'Credit']
        },
        {
            name: 'Middle East & Africa',
            code: 'MEA',
            riskScore: 69,
            trend: 'stable',
            institutions: 67,
            exposure: 3100000000,
            topRisks: ['Geopolitical', 'Oil Price', 'Credit']
        }
    ];

    // Risk Connections (Network)
    const riskConnections = [
        {
            id: 1,
            from: 'JPMorgan Chase',
            to: 'Goldman Sachs',
            type: 'Credit Exposure',
            amount: 2400000000,
            riskLevel: 'medium',
            correlation: 0.68
        },
        {
            id: 2,
            from: 'Deutsche Bank',
            to: 'BNP Paribas',
            type: 'Counterparty Risk',
            amount: 1800000000,
            riskLevel: 'high',
            correlation: 0.82
        },
        {
            id: 3,
            from: 'HSBC',
            to: 'Standard Chartered',
            type: 'Market Exposure',
            amount: 3200000000,
            riskLevel: 'medium',
            correlation: 0.71
        },
        {
            id: 4,
            from: 'Citigroup',
            to: 'Bank of America',
            type: 'Derivative Exposure',
            amount: 4500000000,
            riskLevel: 'critical',
            correlation: 0.89
        },
        {
            id: 5,
            from: 'Credit Suisse',
            to: 'UBS',
            type: 'Operational Risk',
            amount: 1200000000,
            riskLevel: 'high',
            correlation: 0.76
        }
    ];

    // Systemic Risk Events
    const riskEvents = [
        {
            id: 1,
            title: 'European Sovereign Debt Concerns',
            severity: 'high',
            region: 'EU',
            impact: 'High',
            probability: 72,
            affected: 45,
            timestamp: '2 hours ago'
        },
        {
            id: 2,
            title: 'Currency Volatility in Emerging Markets',
            severity: 'medium',
            region: 'LATAM',
            impact: 'Medium',
            probability: 58,
            affected: 23,
            timestamp: '5 hours ago'
        },
        {
            id: 3,
            title: 'Liquidity Stress in Asian Markets',
            severity: 'critical',
            region: 'APAC',
            impact: 'Critical',
            probability: 84,
            affected: 67,
            timestamp: '1 day ago'
        }
    ];
    useEffect(() => {
        const timer: NodeJS.Timeout = setInterval(() => {
            setAnimatedScores((prev: Record<string, number>) => {
                const newScores: Record<string, number> = { ...prev };

                regions.forEach((region: { code: string; riskScore: number }) => {
                    const current: number = newScores[region.code] || 0;

                    newScores[region.code] =
                        current < region.riskScore
                            ? Math.min(
                                current + Math.ceil(region.riskScore / 15),
                                region.riskScore
                            )
                            : region.riskScore;
                });

                return newScores;
            });
        }, 50);

        return () => clearInterval(timer);
    }, []);


    const getRiskColor = (score: number): 'blue' | 'yellow' | 'teal' => {
        if (score >= 70) return 'blue';
        if (score >= 50) return 'yellow';
        return 'teal';
    };


    const getRiskBadge = (
        level: "critical" | "high" | "medium" | "low"
    ): { bg: string; text: string; border: string } => {
        const badges: Record<
            "critical" | "high" | "medium" | "low",
            { bg: string; text: string; border: string }
        > = {
            critical: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
            high: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
            medium: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30" },
            low: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30" }
        };

        return badges[level];
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
                    <h1 className="text-3xl font-bold text-white mb-2">🌐 Global Risk Mesh Network</h1>
                    <p className="text-gray-400">Real-time systemic risk monitoring across global financial institutions</p>
                </div>

                {/* Controls */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5 text-[#19F6FF]" />
                            <span className="text-sm font-semibold text-white">Region:</span>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Regions</option>
                                {regions.map(r => (
                                    <option key={r.code} value={r.code}>{r.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <Network className="w-5 h-5 text-[#19F6FF]" />
                            <span className="text-sm font-semibold text-white">Risk Type:</span>
                            <select
                                value={selectedRiskType}
                                onChange={(e) => setSelectedRiskType(e.target.value)}
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Risk Types</option>
                                <option value="credit">Credit Risk</option>
                                <option value="market">Market Risk</option>
                                <option value="operational">Operational Risk</option>
                                <option value="liquidity">Liquidity Risk</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Global Risk Metrics */}
                <div className="grid grid-cols-5 gap-4">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-xs text-gray-400">Overall Risk</div>
                        </div>
                        <div className="text-3xl font-bold text-blue-400">{globalMetrics.overallRisk}</div>
                        <div className="text-xs text-gray-500 mt-1">Global Index</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-red-400" />
                            </div>
                            <div className="text-xs text-gray-400">Active Threats</div>
                        </div>
                        <div className="text-3xl font-bold text-red-400">{globalMetrics.activeThreats}</div>
                        <div className="text-xs text-gray-500 mt-1">Real-time</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                <Shield className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div className="text-xs text-gray-400">Exposed Institutions</div>
                        </div>
                        <div className="text-3xl font-bold text-yellow-400">{globalMetrics.exposedInstitutions}</div>
                        <div className="text-xs text-gray-500 mt-1">Monitored</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                <Network className="w-5 h-5 text-purple-400" />
                            </div>
                            <div className="text-xs text-gray-400">Correlation Index</div>
                        </div>
                        <div className="text-3xl font-bold text-purple-400">{globalMetrics.correlationIndex}</div>
                        <div className="text-xs text-gray-500 mt-1">Network strength</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="text-xs text-gray-400">Contagion Risk</div>
                        </div>
                        <div className="text-3xl font-bold text-blue-400">{globalMetrics.contagionRisk}%</div>
                        <div className="text-xs text-gray-500 mt-1">Systemic</div>
                    </div>
                </div>

                {/* Regional Risk Grid */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">🗺️ Regional Risk Map</h3>

                    <div className="grid grid-cols-3 gap-6">
                        {regions.map((region) => {
                            //   const animatedScore = animatedScores[region.code] || 0;
                            const animatedScore: number = (animatedScores as Record<string, number>)[region.code] || 0;

                            const riskColor = getRiskColor(region.riskScore);

                            return (
                                <div key={region.code} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-base font-bold text-white mb-1">{region.name}</h4>
                                            <p className="text-xs text-gray-400">{region.code}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* {getTrendIcon(region.trend )} */}
                                            {getTrendIcon(region.trend as "increasing" | "decreasing" | "stable")}
                                            <span className="text-xs text-gray-400 capitalize">{region.trend}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-400">Risk Score</span>
                                            <span className={`text-2xl font-bold text-${riskColor}-400`}>
                                                {Math.round(animatedScore)}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-3">
                                            <div
                                                className={`bg-${riskColor}-500 h-3 rounded-full transition-all duration-1000`}
                                                style={{ width: `${animatedScore}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Institutions</div>
                                            <div className="text-base font-bold text-white">{region.institutions}</div>
                                        </div>
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Exposure</div>
                                            <div className="text-base font-bold text-white">${(region.exposure / 1000000000).toFixed(1)}B</div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-gray-400 mb-2">Top Risks:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {region.topRisks.map((risk, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-gray-700 rounded text-xs text-white">
                                                    {risk}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Risk Network Connections */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">🔗 Institutional Risk Connections</h3>

                    <div className="space-y-4">
                        {riskConnections.map((connection) => {
                            //   const badge = getRiskBadge(connection.riskLevel);
                            const badge: { bg: string; text: string; border: string } =
                                getRiskBadge(connection.riskLevel as "critical" | "high" | "medium" | "low");


                            return (
                                <div key={connection.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-[#19F6FF] rounded-full"></div>
                                                <span className="text-sm font-bold text-white">{connection.from}</span>
                                            </div>
                                            <div className="text-gray-500">→</div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                                                <span className="text-sm font-bold text-white">{connection.to}</span>
                                            </div>
                                        </div>

                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border} uppercase`}>
                                            {connection.riskLevel}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Type</div>
                                            <div className="text-sm font-medium text-white">{connection.type}</div>
                                        </div>
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Exposure</div>
                                            <div className="text-sm font-bold text-white">${(connection.amount / 1000000000).toFixed(2)}B</div>
                                        </div>
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Correlation</div>
                                            <div className="text-sm font-bold text-purple-400">{connection.correlation}</div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                                                Analyze
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">⚠️ Active Systemic Risk Events</h3>

                    <div className="space-y-4">
                        {riskEvents.map((event) => {
                            //   const badge = getRiskBadge(event.severity);
                            const badge: { bg: string; text: string; border: string } =
                                getRiskBadge(event.severity as "critical" | "high" | "medium" | "low");

                            return (
                                <div key={event.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-base font-bold text-white">{event.title}</h4>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.bg} ${badge.text} ${badge.border} uppercase`}>
                                                    {event.severity}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400">{event.region} · {event.timestamp}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Impact Level</div>
                                            <div className="text-sm font-bold text-white">{event.impact}</div>
                                        </div>
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Probability</div>
                                            <div className="text-sm font-bold text-yellow-400">{event.probability}%</div>
                                        </div>
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Affected Institutions</div>
                                            <div className="text-sm font-bold text-white">{event.affected}</div>
                                        </div>
                                        <div className="flex items-center justify-end">
                                            <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium text-sm">
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                        Export Risk Report
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Configure Alerts
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Network Analysis
                    </button>
                </div>
            </div>
        </div>
    );
}