import React, { useState, useEffect, JSX } from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, CreditCard, Zap, AlertCircle } from 'lucide-react';


interface Metrics {
    avgSpending: number;
    spendingChange: number;
    highSpenders: number;
    reducedSpending: number;
    atRisk: number;
}

export default function SpendingBehaviorShift() {
    const [selectedTimeframe, setSelectedTimeframe] = useState<"7-days" | "30-days" | "90-days">("30-days");

    const [animatedValues, setAnimatedValues] = useState<Metrics>({
        avgSpending: 0,
        spendingChange: 0,
        highSpenders: 0,
        reducedSpending: 0,
        atRisk: 0,
    });
    const [selectedCategory, setSelectedCategory] = useState('all');
    //   const [animatedValues, setAnimatedValues] = useState({});

    const spendingMetrics = {
        '30-days': {
            avgSpending: 4250,
            spendingChange: 12,
            highSpenders: 1847,
            reducedSpending: 923,
            atRisk: 342
        },
        '60-days': {
            avgSpending: 4680,
            spendingChange: 18,
            highSpenders: 2134,
            reducedSpending: 1256,
            atRisk: 478
        },
        '90-days': {
            avgSpending: 4890,
            spendingChange: 22,
            highSpenders: 2456,
            reducedSpending: 1489,
            atRisk: 589
        }
    };

    //   const currentMetrics = spendingMetrics[selectedTimeframe];
    const currentMetrics = spendingMetrics[selectedTimeframe as keyof typeof spendingMetrics];

    // const currentMetrics: Record<string, number> = 
    //   spendingMetrics[selectedTimeframe];


    const categories = [
        { name: 'Dining & Entertainment', current: 1245, previous: 1089, change: 14, trend: 'up', icon: '🍽️' },
        { name: 'Retail Shopping', current: 2134, previous: 2456, change: -13, trend: 'down', icon: '🛍️' },
        { name: 'Travel & Transport', current: 892, previous: 734, change: 22, trend: 'up', icon: '✈️' },
        { name: 'Groceries', current: 1567, previous: 1523, change: 3, trend: 'up', icon: '🛒' },
        { name: 'Healthcare', current: 687, previous: 598, change: 15, trend: 'up', icon: '🏥' },
        { name: 'Utilities', current: 456, previous: 445, change: 2, trend: 'up', icon: '💡' }
    ];

    const customers = [
        {
            id: 1,
            name: 'Wilson Family',
            segment: 'HNW',
            spending: 8945,
            change: -34,
            trend: 'decreasing',
            riskFlag: true,
            categories: { dining: 2400, retail: 3200, travel: 2100, groceries: 1245 }
        },
        {
            id: 2,
            name: 'Garcia Household',
            segment: 'Prime',
            spending: 6234,
            change: 28,
            trend: 'increasing',
            riskFlag: false,
            categories: { dining: 1800, retail: 2100, travel: 1500, groceries: 834 }
        },
        {
            id: 3,
            name: 'Lee Family',
            segment: 'Youth',
            spending: 3478,
            change: -18,
            trend: 'decreasing',
            riskFlag: true,
            categories: { dining: 1200, retail: 1400, travel: 500, groceries: 378 }
        },
        {
            id: 4,
            name: 'Patel Household',
            segment: 'HNW',
            spending: 9823,
            change: 42,
            trend: 'increasing',
            riskFlag: false,
            categories: { dining: 2800, retail: 3900, travel: 2300, groceries: 823 }
        },
        {
            id: 5,
            name: 'Miller Family',
            segment: 'Prime',
            spending: 5456,
            change: -12,
            trend: 'decreasing',
            riskFlag: false,
            categories: { dining: 1600, retail: 2000, travel: 1200, groceries: 656 }
        }
    ];

    // Animate values on mount

    useEffect(() => {
        const timer = setInterval(() => {
            setAnimatedValues((prev: Metrics) => {
                const newValues: Metrics = { ...prev }; // start with previous values

                (Object.keys(currentMetrics) as (keyof Metrics)[]).forEach((key) => {
                    const target = currentMetrics[key];
                    const current = prev[key];
                    newValues[key] = current < target ? Math.min(current + Math.ceil(target / 15), target) : target;
                });

                return newValues;
            });
        }, 50);

        return () => clearInterval(timer);
    }, [selectedTimeframe, currentMetrics]);

    const getTrendIcon = (change: number): JSX.Element => {
        if (change > 0) {
            return <TrendingUp className="w-4 h-4 text-red-400" />;
        }
        return <TrendingDown className="w-4 h-4 text-blue-400" />;
    };


    return (
        <>
            <div className="min-h-screen bg-black p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">💳 Spending Behavior Shift Monitor</h1>
                        <p className="text-gray-400">Track customer spending patterns and identify risk signals</p>
                    </div>

                    {/* Controls */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-5 h-5 text-[#19F6FF]" />
                                <span className="text-sm font-semibold text-white">Timeframe:</span>
                                <div className="flex gap-2">
                                    {[
                                        { id: '30-days', label: '30 Days' },
                                        { id: '60-days', label: '60 Days' },
                                        { id: '90-days', label: '90 Days' }
                                    ].map(tf => (
                                        <button
                                            key={tf.id}
                                            // onClick={() => setSelectedTimeframe(tf.id)}
                                            onClick={() => setSelectedTimeframe(tf.id as any)}

                                            className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTimeframe === tf.id
                                                ? 'bg-[#19F6FF] text-black'
                                                : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                                                }`}
                                        >
                                            {tf.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-white">Category:</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                                >
                                    <option value="all">All Categories</option>
                                    {categories.map(c => (
                                        <option key={c.name} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-5 gap-4">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-blue-400" />
                                </div>
                                <div className="text-xs text-gray-400">Avg Spending</div>
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">
                                {/* ${(animatedValues.avgSpending  || 0).toLocaleString()} */}
                                ${((animatedValues.avgSpending ?? 0) as number).toLocaleString()}
                            </div>
                            <div className="text-xs text-red-400">↑ {currentMetrics.spendingChange}% vs last period</div>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-red-400" />
                                </div>
                                <div className="text-xs text-gray-400">High Spenders</div>
                            </div>
                            <div className="text-2xl font-bold text-red-400 mb-1">
                                {(animatedValues.highSpenders || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">Increased activity</div>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                                    <TrendingDown className="w-5 h-5 text-yellow-400" />
                                </div>
                                <div className="text-xs text-gray-400">Reduced Spending</div>
                            </div>
                            <div className="text-2xl font-bold text-yellow-400 mb-1">
                                {(animatedValues.reducedSpending || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">Decreased activity</div>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-5 h-5 text-red-400" />
                                </div>
                                <div className="text-xs text-gray-400">At Risk</div>
                            </div>
                            <div className="text-2xl font-bold text-red-400 mb-1">
                                {(animatedValues.atRisk || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">Requires attention</div>
                        </div>

                        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-purple-400" />
                                </div>
                                <div className="text-xs text-gray-400">Change Rate</div>
                            </div>
                            <div className="text-2xl font-bold text-purple-400 mb-1">
                                {currentMetrics.spendingChange}%
                            </div>
                            <div className="text-xs text-gray-400">Overall shift</div>
                        </div>
                    </div>

                    {/* Category Breakdown */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-6">Spending by Category</h3>

                        <div className="grid grid-cols-2 gap-6">
                            {categories.map((category, idx) => (
                                <div key={idx} className="p-4 bg-gray-800/50 rounded-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{category.icon}</span>
                                            <span className="text-sm font-semibold text-white">{category.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getTrendIcon(category.change)}
                                            <span className={`text-sm font-bold ${category.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                                {category.change > 0 ? '+' : ''}{category.change}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-gray-400">
                                            <span>Current: ${category.current.toLocaleString()}</span>
                                            <span>Previous: ${category.previous.toLocaleString()}</span>
                                        </div>

                                        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ${category.trend === 'up' ? 'bg-red-500' : 'bg-blue-500'
                                                    }`}
                                                style={{ width: `${Math.min((category.current / 3000) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Customer Behavior Table */}
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-white">🎯 Customer Spending Patterns</h3>
                            <span className="text-sm text-gray-400">{customers.length} customers shown</span>
                        </div>

                        <div className="space-y-4">
                            {customers.map((customer) => (
                                <div key={customer.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`px-4 py-3 rounded-xl ${customer.trend === 'increasing' ? 'bg-red-500/10 border border-red-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'
                                                }`}>
                                                <div className="text-xs text-gray-400 mb-1">Spending</div>
                                                <div className="text-xl font-bold text-white">${(customer.spending / 1000).toFixed(1)}k</div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-base font-bold text-white">{customer.name}</h4>
                                                    {customer.riskFlag && (
                                                        <AlertCircle className="w-4 h-4 text-red-400" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-0.5 bg-gray-700 rounded text-xs text-white">{customer.segment}</span>
                                                    <div className="flex items-center gap-1">
                                                        {getTrendIcon(customer.change)}
                                                        <span className={`text-xs font-bold ${customer.change > 0 ? 'text-red-400' : 'text-blue-400'}`}>
                                                            {customer.change > 0 ? '+' : ''}{customer.change}%
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {customer.riskFlag && (
                                            <span className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-full text-xs font-medium">
                                                Risk Flag
                                            </span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-4 gap-3">
                                        {Object.entries(customer.categories).map(([key, value]) => (
                                            <div key={key} className="p-3 bg-gray-900/50 rounded-lg">
                                                <div className="text-xs text-gray-400 mb-1 capitalize">{key}</div>
                                                <div className="text-sm font-bold text-white">${value.toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                            Export Spending Report
                        </button>
                        <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                            Set Alerts
                        </button>
                        <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                            Download Analysis
                        </button>
                    </div>
                </div>
            </div>
        </>

    );
}