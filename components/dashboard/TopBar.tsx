'use client'

import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';
const TopBar = () => {
    const [market, setMarket] = useState('Raleigh-Durham');
    const [quarter, setQuarter] = useState('Q4 2025');

    return (
        <header className="h-16 bg-[#1A1A1A] border-b border-gray-800 flex items-center justify-between px-6">
            <div>
                <span className="px-3 py-1 bg-[#00D1D1] text-white text-sm font-semibold rounded-full">
                    Predictive Churn Feed
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <span className="text-white text-sm">{market}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-[#2A2A2A] rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
                    <span className="text-white text-sm">{quarter}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center cursor-pointer">
                    <span className="text-white font-semibold">JD</span>
                </div>
            </div>
        </header>
    );
};

export default TopBar;