import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Calendar, DollarSign, Percent, ChevronRight } from 'lucide-react';

import { ComponentType } from "react";

export type SegmentType = "all" | "prime" | "hnw" | "youth";
export type UrgencyType = "high" | "medium";

export interface PredictionData {
    highProbability: number;
    mediumProbability: number;
    lowProbability: number;
    avgEquity: number;
    avgLTV: number;
    potentialVolume: number;
}

export interface Household {
    id: number;
    name: string;
    zip: string;
    refiScore: number;
    currentRate: number;
    potentialRate: number;
    savings: number;
    equity: number;
    ltv: number;
    segment: SegmentType;
    urgency: UrgencyType;
}

export interface AnimatedScores {
    [householdId: number]: number;
}

export type TimeframeType = "3-months" | "6-months" | "12-months";

export default function RefinanceCyclePrediction() {
    // const [selectedTimeframe, setSelectedTimeframe] = useState('3-months');
    // const [selectedSegment, setSelectedSegment] = useState('all');
    // const [animatedScores, setAnimatedScores] = useState({});

    const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeType>("3-months");
    const [selectedSegment, setSelectedSegment] = useState<SegmentType>("all");
    const [animatedScores, setAnimatedScores] = useState<AnimatedScores>({});

    // Mock data for refi predictions
    // const predictions = {
    const predictions: Record<TimeframeType, PredictionData> = {
        '3-months': {
            highProbability: 2847,
            mediumProbability: 1523,
            lowProbability: 894,
            avgEquity: 127000,
            avgLTV: 68,
            potentialVolume: 342000000
        },
        '6-months': {
            highProbability: 4521,
            mediumProbability: 2678,
            lowProbability: 1456,
            avgEquity: 132000,
            avgLTV: 65,
            potentialVolume: 578000000
        },
        '12-months': {
            highProbability: 7834,
            mediumProbability: 4123,
            lowProbability: 2345,
            avgEquity: 138000,
            avgLTV: 62,
            potentialVolume: 987000000
        }
    };

    const currentPrediction = predictions[selectedTimeframe];

    // const households = [
    const households: Household[] = [
        {
            id: 1,
            name: 'Johnson Family',
            zip: '27601',
            refiScore: 94,
            currentRate: 6.5,
            potentialRate: 5.2,
            savings: 347,
            equity: 145000,
            ltv: 62,
            segment: 'prime',
            urgency: 'high'
        },
        {
            id: 2,
            name: 'Smith Household',
            zip: '27609',
            refiScore: 89,
            currentRate: 6.8,
            potentialRate: 5.4,
            savings: 412,
            equity: 128000,
            ltv: 68,
            segment: 'hnw',
            urgency: 'high'
        },
        {
            id: 3,
            name: 'Williams Family',
            zip: '27613',
            refiScore: 76,
            currentRate: 5.9,
            potentialRate: 5.0,
            savings: 189,
            equity: 98000,
            ltv: 72,
            segment: 'prime',
            urgency: 'medium'
        },
        {
            id: 4,
            name: 'Brown Household',
            zip: '27615',
            refiScore: 82,
            currentRate: 7.1,
            potentialRate: 5.5,
            savings: 523,
            equity: 156000,
            ltv: 58,
            segment: 'hnw',
            urgency: 'high'
        },
        {
            id: 5,
            name: 'Davis Family',
            zip: '27617',
            refiScore: 71,
            currentRate: 6.2,
            potentialRate: 5.3,
            savings: 234,
            equity: 112000,
            ltv: 75,
            segment: 'youth',
            urgency: 'medium'
        }
    ];

    const filteredHouseholds = selectedSegment === 'all'
        ? households
        : households.filter(h => h.segment === selectedSegment);

    // Animate scores on mount
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         const scores = {};
    //         households.forEach(h => {
    //             scores[h.id] = h.refiScore;
    //         });
    //         setAnimatedScores(scores);
    //     }, 100);
    //     return () => clearTimeout(timer);
    // }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            const scores: AnimatedScores = {};
            households.forEach((h: Household) => {
                scores[h.id] = h.refiScore;
            });
            setAnimatedScores(scores);
        }, 100);

        return () => clearTimeout(timer);
    }, []);


    // const getScoreColor = (score) => {
    const getScoreColor = (score: number): string => {
        if (score >= 80) return 'text-red-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-blue-400';
    };

    // const getScoreBg = (score) => {
    const getScoreBg = (score: number): string => {
        if (score >= 80) return 'bg-red-500/10 border-red-500/30';
        if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/30';
        return 'bg-blue-500/10 border-blue-500/30';
    };

    // const getUrgencyBadge = (urgency) => {
    const getUrgencyBadge = (urgency: UrgencyType): { bg: string; text: string; border: string; label: string } => {
        if (urgency === 'high') return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'High Urgency' };
        return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Medium' };
    };

    return (
        <div className="min-h-screen bg-black p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">💰 Refinance Cycle Prediction</h1>
                    <p className="text-gray-400">Identify high-probability refi candidates and forecast volume</p>
                </div>

                {/* Controls */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[#19F6FF]" />
                            <span className="text-sm font-semibold text-white">Timeframe:</span>
                            <div className="flex gap-2">
                                {[
                                    { id: '3-months', label: '3 Months' },
                                    { id: '6-months', label: '6 Months' },
                                    { id: '12-months', label: '12 Months' }
                                ].map(tf => (
                                    <button
                                        key={tf.id}
                                        // onClick={() => setSelectedTimeframe(tf.id)}
                                        onClick={() => setSelectedTimeframe(tf.id as TimeframeType)}

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
                            <span className="text-sm font-semibold text-white">Segment:</span>
                            <select
                                value={selectedSegment}
                                // onChange={(e) => setSelectedSegment(e.target.value)}
                                onChange={(e) => setSelectedSegment(e.target.value as SegmentType)}

                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
                            >
                                <option value="all">All Segments</option>
                                <option value="prime">Prime</option>
                                <option value="hnw">HNW</option>
                                <option value="youth">Youth</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-red-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">High Probability</div>
                                <div className="text-2xl font-bold text-white">{currentPrediction.highProbability.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="text-xs text-red-400">↑ Ready to refinance</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                                <AlertCircle className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Medium Probability</div>
                                <div className="text-2xl font-bold text-white">{currentPrediction.mediumProbability.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className="text-xs text-yellow-400">→ Monitor closely</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Avg Equity</div>
                                <div className="text-2xl font-bold text-white">${(currentPrediction.avgEquity / 1000).toFixed(0)}k</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400">Per household</div>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                <Percent className="w-6 h-6 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Potential Volume</div>
                                <div className="text-2xl font-bold text-white">${(currentPrediction.potentialVolume / 1000000).toFixed(0)}M</div>
                            </div>
                        </div>
                        <div className="text-xs text-gray-400">Est. loan volume</div>
                    </div>
                </div>

                {/* Probability Distribution */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Refi Probability Distribution</h3>

                    <div className="space-y-4">
                        {[
                            { label: 'High Probability (80-100)', count: currentPrediction.highProbability, color: 'red', percent: 52 },
                            { label: 'Medium Probability (60-79)', count: currentPrediction.mediumProbability, color: 'yellow', percent: 28 },
                            { label: 'Low Probability (0-59)', count: currentPrediction.lowProbability, color: 'blue', percent: 20 }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-300">{item.label}</span>
                                    <span className="text-sm font-semibold text-white">{item.count.toLocaleString()} ({item.percent}%)</span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-3">
                                    <div
                                        className={`bg-${item.color}-500 h-3 rounded-full transition-all duration-1000`}
                                        style={{ width: `${item.percent}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Candidates Table */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">🎯 Top Refi Candidates</h3>
                        <span className="text-sm text-gray-400">Showing {filteredHouseholds.length} of {households.length}</span>
                    </div>

                    <div className="space-y-4">
                        {filteredHouseholds.map((household) => {
                            const urgency = getUrgencyBadge(household.urgency);
                            const animatedScore = animatedScores[household.id] || 0;

                            return (
                                <div key={household.id} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-16 h-16 rounded-xl border flex flex-col items-center justify-center ${getScoreBg(household.refiScore)}`}>
                                                <div className={`text-2xl font-bold ${getScoreColor(household.refiScore)} transition-all duration-1000`}>
                                                    {animatedScore}
                                                </div>
                                                <div className="text-xs text-gray-500">Score</div>
                                            </div>

                                            <div>
                                                <h4 className="text-base font-bold text-white mb-1">{household.name}</h4>
                                                <p className="text-sm text-gray-400">ZIP {household.zip}</p>
                                            </div>
                                        </div>

                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${urgency.bg} ${urgency.text} ${urgency.border}`}>
                                            {urgency.label}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-6 gap-4">
                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Current Rate</div>
                                            <div className="text-base font-bold text-white">{household.currentRate}%</div>
                                        </div>

                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Potential Rate</div>
                                            <div className="text-base font-bold text-red-400">{household.potentialRate}%</div>
                                        </div>

                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Monthly Savings</div>
                                            <div className="text-base font-bold text-white">${household.savings}</div>
                                        </div>

                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">Equity</div>
                                            <div className="text-base font-bold text-white">${(household.equity / 1000).toFixed(0)}k</div>
                                        </div>

                                        <div className="p-3 bg-gray-900/50 rounded-lg">
                                            <div className="text-xs text-gray-400 mb-1">LTV</div>
                                            <div className="text-base font-bold text-white">{household.ltv}%</div>
                                        </div>

                                        <div className="flex items-center justify-end">
                                            <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center gap-2">
                                                Contact
                                                <ChevronRight className="w-4 h-4" />
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
                        Export Refi List
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Schedule Campaign
                    </button>
                    <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                        Download Report
                    </button>
                </div>
            </div>
        </div>
    );
}