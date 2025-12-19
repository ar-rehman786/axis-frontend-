'use client'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronDown, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import TopBar from "./TopBar";
import KPICard from "./KPICard";
import { useState } from 'react';

const mockKPIs = {
    totalRecords: { value: 1247, change: 12, changeType: 'positive' },
    qualifiedOwners: { value: 487, change: 8, changeType: 'positive' },
    activeRefi: { value: 312, change: 15, changeType: 'positive' },
    highEquity: { value: 178, change: -3, changeType: 'negative' },
    dncCooldown: { value: 42, change: 0, changeType: 'neutral' }
};

const mockRefiChartData = [
    { month: 'Jan', count: 180 },
    { month: 'Feb', count: 220 },
    { month: 'Mar', count: 280 },
    { month: 'Apr', count: 312 },
    { month: 'May', count: 295 }
];

const mockSegments = [
    { name: 'Core Equity – Ready Now', count: 487, percent: 38, color: '#00D1D1', badge: 'teal', notes: 'Refi-ready, 18-36mo loan age' },
    { name: 'High Equity – 6-12 Months', count: 312, percent: 28, color: '#FFD166', badge: 'yellow', notes: 'Strong equity, emerging' },
    { name: 'Watchlist', count: 256, percent: 24, color: '#FF6B6B', badge: 'red', notes: 'Monitor for movement' },
    { name: 'DNC/Cooldown', count: 42, percent: 10, color: '#9CA3AF', badge: 'gray', notes: 'Do not contact' }
];

const cryptoData = [
    { coin: 'BTC', price: '$43,250', change24h: '+2.3%', change7d: '+8.1%', positive: true },
    { coin: 'ETH', price: '$2,340', change24h: '+1.8%', change7d: '+5.4%', positive: true },
    { coin: 'SOL', price: '$98', change24h: '+4.2%', change7d: '+12.3%', positive: true }
];

const stockIndices = [
    { name: 'S&P 500', value: '4,528', change: '+0.8%', positive: true },
    { name: 'Nasdaq', value: '14,230', change: '+1.2%', positive: true },
    { name: 'Dow', value: '35,120', change: '+0.5%', positive: true }
];

const housingStocks = [
    { ticker: 'RKT', name: 'Rocket', price: '$12.45', change: '+2.1%', positive: true },
    { ticker: 'Z', name: 'Zillow', price: '$48.30', change: '-0.8%', positive: false },
    { ticker: 'RDFN', name: 'Redfin', price: '$8.90', change: '+1.5%', positive: true }
];

const housingMetrics = [
    { label: 'Active Listings', value: '12,450', change: '-3.2%', positive: false },
    { label: 'Median DOM', value: '42 days', change: '+5 days', positive: false },
    { label: 'Price Reductions', value: '18%', change: '+2%', positive: false },
    { label: 'Median Price', value: '$385k', change: '+1.2%', positive: true }
];

const Dashboard = () => {

    return (
        <>
            <div className="flex bg-black min-h-screen">
                {/* <Sidebar activeItem="Dashboard" />  */}
                <div className=" flex-1 flex flex-col">
                    <TopBar />

                    <main className="flex-1 p-8 overflow-auto">
                        {/* KPI Row */}
                        <div className="grid grid-cols-5 gap-6 mb-8">
                            <KPICard
                                label="Total Records"
                                value={mockKPIs.totalRecords.value}
                                change={mockKPIs.totalRecords.change}
                                changeType={mockKPIs.totalRecords.changeType}
                            />
                            <KPICard
                                label="Qualified Owners"
                                value={mockKPIs.qualifiedOwners.value}
                                change={mockKPIs.qualifiedOwners.change}
                                changeType={mockKPIs.qualifiedOwners.changeType}
                            />
                            <KPICard
                                label="Active Refi Window"
                                value={mockKPIs.activeRefi.value}
                                change={mockKPIs.activeRefi.change}
                                changeType={mockKPIs.activeRefi.changeType}
                            />
                            <KPICard
                                label="High-Equity Owners"
                                value={mockKPIs.highEquity.value}
                                change={mockKPIs.highEquity.change}
                                changeType={mockKPIs.highEquity.changeType}
                            />
                            <KPICard
                                label="DNC/Cooldown"
                                value={mockKPIs.dncCooldown.value}
                                change={mockKPIs.dncCooldown.change}
                                changeType={mockKPIs.dncCooldown.changeType}
                            />
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {/* Line Chart */}
                            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">Refi Opportunity Over Time</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={mockRefiChartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" />
                                        <XAxis dataKey="month" stroke="#9CA3AF" />
                                        <YAxis stroke="#9CA3AF" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                            labelStyle={{ color: '#FFFFFF' }}
                                        />
                                        <Line type="monotone" dataKey="count" stroke="#00D1D1" strokeWidth={3} dot={{ fill: '#00D1D1', r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Pie Chart */}
                            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">Segment Breakdown</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={mockSegments}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }: { name?: string; percent?: number }) => {
                                                const safeName = typeof name === 'string' ? name.split(' ')[0] : '';
                                                const safePercent = percent ?? 0;
                                                return `${safeName} ${safePercent}%`;
                                            }}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="percent"
                                        >
                                            {mockSegments.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Lead Segments + Actions */}
                        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
                            <div className="flex gap-4 mb-6">
                                <button className="px-6 py-3 bg-[#00D1D1] hover:bg-[#00B8B8] text-white font-semibold rounded-lg transition-colors">
                                    📄 Generate 7-Page PDF
                                </button>
                                <button className="px-6 py-3 bg-[#2A2A2A] hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors">
                                    📊 Export CSV
                                </button>
                                <button className="px-6 py-3 border-2 border-[#00D1D1] text-[#00D1D1] hover:bg-[#00D1D1] hover:text-white rounded-lg font-semibold transition-colors">
                                    📧 Send to Realtor
                                </button>
                                <button className="px-6 py-3 border-2 border-[#00D1D1] text-[#00D1D1] hover:bg-[#00D1D1] hover:text-white rounded-lg font-semibold transition-colors">
                                    🏢 Send to Firm
                                </button>
                            </div>

                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-800">
                                        <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Segment</th>
                                        <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Records</th>
                                        <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">% of Total</th>
                                        <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Notes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockSegments.map((segment, idx) => (
                                        <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                                            <td className="py-4 px-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${segment.badge === 'teal' ? 'bg-[#00D1D1]/20 text-[#00D1D1]' :
                                                    segment.badge === 'yellow' ? 'bg-[#FFD166]/20 text-[#FFD166]' :
                                                        segment.badge === 'red' ? 'bg-[#FF6B6B]/20 text-[#FF6B6B]' :
                                                            'bg-[#9CA3AF]/20 text-[#9CA3AF]'
                                                    }`}>
                                                    {segment.name}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-white font-semibold">{segment.count}</td>
                                            <td className="py-4 px-4 text-white font-semibold">{segment.percent}%</td>
                                            <td className="py-4 px-4 text-[#9CA3AF]">{segment.notes}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Data Grid Placeholder */}
                        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
                            <div className="flex gap-2 mb-6">
                                <span className="px-4 py-2 bg-[#00D1D1] text-white rounded-full text-sm font-semibold cursor-pointer">
                                    Segment: All
                                </span>
                                <span className="px-4 py-2 bg-[#2A2A2A] text-[#9CA3AF] rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-700 transition-colors">
                                    Equity: &gt;$300k
                                </span>
                                <span className="px-4 py-2 bg-[#2A2A2A] text-[#9CA3AF] rounded-full text-sm font-semibold cursor-pointer hover:bg-gray-700 transition-colors">
                                    ZIP: 27601
                                </span>
                            </div>

                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-12 text-center">
                                <p className="text-white text-lg mb-2">📊 Data grid placeholder – connect to existing table/API.</p>
                                <p className="text-[#9CA3AF] text-sm">
                                    Will display: Address | City | LTV | Equity | APS Score | Tier
                                </p>
                            </div>
                        </div>

                        {/* Compliance Ribbon */}
                        <div className="bg-[#FFD166]/10 border border-[#FFD166]/30 rounded-xl p-6 mb-8 flex items-center gap-4">
                            <div className="text-4xl">⚖️</div>
                            <div className="flex-1">
                                <h4 className="text-white font-semibold text-lg mb-1">24h Delay — Informational Analytics Only</h4>
                                <p className="text-[#9CA3AF] text-sm">
                                    Crypto, Stocks, and Housing panels run on a mandatory 24-hour delay for compliance and regulatory purposes.
                                </p>
                            </div>
                            <span className="px-4 py-2 bg-[#FFD166]/20 text-[#FFD166] rounded-full text-sm font-semibold whitespace-nowrap">
                                ⚖ 24h Delay
                            </span>
                        </div>

                        {/* Market Feeds */}
                        <div className="grid grid-cols-3 gap-6">
                            {/* Crypto Feed */}
                            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">🪙 Crypto Feed (24h delayed)</h3>

                                <div className="space-y-4 mb-6">
                                    {cryptoData.map((crypto) => (
                                        <div key={crypto.coin} className="bg-[#2A2A2A] rounded-lg p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-white font-bold">{crypto.coin}</span>
                                                <span className="text-white font-semibold">{crypto.price}</span>
                                            </div>
                                            <div className="flex gap-4 text-sm">
                                                <span className="text-red-400">24h: {crypto.change24h}</span>
                                                <span className="text-red-400">7d: {crypto.change7d}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-700 pt-4">
                                    <h4 className="text-[#9CA3AF] text-sm font-semibold mb-3">Refi Correlations:</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-[#9CA3AF] text-sm">BTC → Refi Volume</span>
                                            <span className="text-red-400 font-semibold">+0.42</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#9CA3AF] text-sm">ETH → Equity Growth</span>
                                            <span className="text-red-400 font-semibold">+0.38</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stock Feed */}
                            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">📈 Stock Feed (24h delayed)</h3>

                                <div className="space-y-3 mb-6">
                                    {stockIndices.map((index) => (
                                        <div key={index.name} className="flex justify-between items-center">
                                            <span className="text-[#9CA3AF]">{index.name}</span>
                                            <div className="text-right">
                                                <div className="text-white font-semibold">{index.value}</div>
                                                <div className="text-red-400 text-sm">{index.change}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-700 pt-4 mb-4">
                                    <h4 className="text-[#9CA3AF] text-sm font-semibold mb-3">Housing Stocks:</h4>
                                    <div className="space-y-2">
                                        {housingStocks.map((stock) => (
                                            <div key={stock.ticker} className="flex justify-between items-center">
                                                <div>
                                                    <span className="text-white font-semibold">{stock.ticker}</span>
                                                    <span className="text-[#9CA3AF] text-sm ml-2">{stock.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-white text-sm">{stock.price}</div>
                                                    <div className={`text-sm ${stock.positive ? 'text-red-400' : 'text-blue-400'}`}>
                                                        {stock.change}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border-t border-gray-700 pt-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-[#9CA3AF] text-sm">10yr Treasury</span>
                                            <span className="text-white font-semibold">4.25%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[#9CA3AF] text-sm">Mortgage Rate</span>
                                            <span className="text-white font-semibold">6.87%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Housing Feed */}
                            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                                <h3 className="text-white text-xl font-semibold mb-4">🏠 Housing Feed (24h delayed)</h3>

                                <div className="space-y-4 mb-6">
                                    {housingMetrics.map((metric) => (
                                        <div key={metric.label} className="flex justify-between items-center">
                                            <span className="text-[#9CA3AF]">{metric.label}</span>
                                            <div className="text-right">
                                                <div className="text-white font-semibold">{metric.value}</div>
                                                <div className={`text-sm ${metric.positive ? 'text-red-400' : 'text-blue-400'}`}>
                                                    {metric.change}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-700 pt-4">
                                    <h4 className="text-[#9CA3AF] text-sm font-semibold mb-3">Refi Activity:</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#9CA3AF] text-sm">Refi Volume</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-semibold">2,340/mo</span>
                                                <TrendingUp className="w-4 h-4 text-red-400" />
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-[#9CA3AF] text-sm">Lender Activity</span>
                                            <span className="text-white font-semibold">High</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#9CA3AF] text-sm">Churn Clock</span>
                                            <span className="text-white font-semibold">18-24 mo peak</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Dashboard;