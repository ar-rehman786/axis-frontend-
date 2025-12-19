import React from 'react';
import { TrendingUp, TrendingDown, Home, DollarSign, Calendar, BarChart3 } from 'lucide-react';
import { realtorMockData } from '@/utils/data/mockData';
import { Bar, BarChart, CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

type ChangeType = {
    type: 'positive' | 'negative';
    value: number;
};

export type KPICardProps = {
    title: string;
    value: number;
    change?: ChangeType;
    icon: React.ElementType;
    format?: 'number' | 'currency' | 'days';
};

type InvestmentOpportunity = {
    name: string;
    address: string;
    city: string;
    value: number;
    equity: number;
    equityPercent: number;
    churnRisk: 'Low' | 'Medium' | 'High';
    opportunity: string;
    owner: string;
};

type MockDataType = {
    kpis: {
        totalProperties: number;
        highEquity: number;
        saleReady: number;
        avgPropertyValue: number;
        medianDOM: number;
    };
    kpiChanges: {
        totalProperties?: ChangeType;
        highEquity?: ChangeType;
        saleReady?: ChangeType;
        avgPropertyValue?: ChangeType;
        medianDOM?: ChangeType;
    };
    propertyValuesByZip: { zip: string; avgValue: number; count: number }[];
    equityDistribution: { range: string; count: number; color?: string }[];
    investmentOpportunities: InvestmentOpportunity[];
};

const HomeTab: React.FC<{ mockData?: MockDataType }> = ({ mockData = realtorMockData as any }) => {

    const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, format = 'number' }) => {
        const isPositive = change?.type === 'positive';
        const formattedValue =
            format === 'currency'
                ? `$${(value / 1000).toFixed(0)}k`
                : format === 'days'
                    ? `${value} days`
                    : value.toLocaleString();

        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-teal-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-teal-500/10 rounded-lg">
                        <Icon className="text-teal-400" size={24} />
                    </div>
                    {change && (
                        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-red-400' : 'text-blue-400'}`}>
                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span>{Math.abs(change.value)}{format === 'currency' ? '%' : ''}</span>
                        </div>
                    )}
                </div>
                <h3 className="text-3xl font-bold mb-1">{formattedValue}</h3>
                <p className="text-sm text-gray-400">{title}</p>
            </div>
        );
    };

    return (
        <div className="p-6 space-y-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <KPICard
                    title="Total Properties"
                    value={mockData.kpis.totalProperties}
                    change={mockData.kpiChanges.totalProperties}
                    icon={Home}
                />
                <KPICard
                    title="High Equity (>50%)"
                    value={mockData.kpis.highEquity}
                    change={mockData.kpiChanges.highEquity}
                    icon={TrendingUp}
                />
                <KPICard
                    title="Sale-Ready"
                    value={mockData.kpis.saleReady}
                    change={mockData.kpiChanges.saleReady}
                    icon={BarChart3}
                />
                <KPICard
                    title="Avg Property Value"
                    value={mockData.kpis.avgPropertyValue}
                    change={mockData.kpiChanges.avgPropertyValue}
                    icon={DollarSign}
                    format="currency"
                />
                <KPICard
                    title="Median Days on Market"
                    value={mockData.kpis.medianDOM}
                    change={mockData.kpiChanges.medianDOM}
                    icon={Calendar}
                    format="days"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Property Values by ZIP</h3>
                    <div className="space-y-3">
                        <div className="h-64 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                            <BarChart width={600} height={300} data={mockData.propertyValuesByZip}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="zip" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #333' }}
                                />
                                <Bar dataKey="avgValue" fill="#00D1D1" />
                            </BarChart>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold mb-4">Equity Distribution</h3>
                    <div className="space-y-3">
                        <div className="h-64 bg-zinc-800/50 rounded-lg flex items-center justify-center">
                            <LineChart width={800} height={300} data={mockData.propertyValueTrend}>
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip />
                                <Line type="monotone" dataKey="avgValue" stroke="#00D1D1" strokeWidth={2} />
                            </LineChart>
                        </div>
                    </div>
                </div>
            </div>

            {/* Investment Opportunities Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Top Investment Opportunities</h3>
                    <button className="text-sm text-teal-400 hover:text-teal-300">View All →</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-400 border-b border-zinc-800">
                                <th className="pb-3 font-medium">Address</th>
                                <th className="pb-3 font-medium">City</th>
                                <th className="pb-3 font-medium">Value</th>
                                <th className="pb-3 font-medium">Equity</th>
                                <th className="pb-3 font-medium">Equity %</th>
                                <th className="pb-3 font-medium">Churn Risk</th>
                                <th className="pb-3 font-medium">Opportunity</th>
                                <th className="pb-3 font-medium">Owner</th>
                                <th className="pb-3 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {mockData.investmentOpportunities.map((item: any, index: number) => (
                                <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                                    <td className="py-4">{item.address || '-'}</td>
                                    <td className="py-4">{item.city || '-'}</td>
                                    <td className="py-4">${(item.value ?? 0).toLocaleString()}</td>
                                    <td className="py-4 text-teal-400 font-medium">${(item.equity ?? 0).toLocaleString()}</td>
                                    <td className="py-4">{item.equityPercent ?? 0}%</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-xs ${item.churnRisk === 'High' ? 'bg-red-500/20 text-red-400' :
                                            item.churnRisk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-teal-500/20 text-teal-400'
                                            }`}>
                                            {item.churnRisk || '-'}
                                        </span>
                                    </td>
                                    <td className="py-4">{item.opportunity || '-'}</td>
                                    <td className="py-4">{item.owner || '-'}</td>
                                    <td className="py-4">
                                        <button className="text-teal-400 hover:text-teal-300">View</button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
                    <Home size={20} />
                    <span className="font-medium">Generate Report</span>
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
                    <BarChart3 size={20} />
                    <span className="font-medium">Export Properties</span>
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
                    <span className="font-medium">📧 Contact Owners</span>
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
                    <span className="font-medium">📍 Map View</span>
                </button>
            </div>
        </div>
    );
};

export default HomeTab;
