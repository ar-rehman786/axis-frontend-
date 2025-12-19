"use client";

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity, Target, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ==================== MOCK DATA ====================
const mockData = {
  // KPIs
  kpis: {
    estimatedTransactions: 487,
    refiVolume: 312,
    refiPercent: 64,
    saleVolume: 175,
    salePercent: 36,
    avgDealSize: 385000,
    conversionConfidence: 82
  },

  // KPI Changes
  kpiChanges: {
    estimatedTransactions: { value: 12, type: 'positive' },
    refiVolume: { value: 8, type: 'positive' },
    saleVolume: { value: 4, type: 'positive' },
    avgDealSize: { value: 3.2, type: 'positive' },
    conversionConfidence: { value: 5, type: 'positive' }
  },

  // Transaction Forecast (90 days)
  transactionForecast: [
    { month: 'Week 1', transactions: 35, confidence: 90 },
    { month: 'Week 2', transactions: 42, confidence: 88 },
    { month: 'Week 3', transactions: 48, confidence: 85 },
    { month: 'Week 4', transactions: 55, confidence: 82 },
    { month: 'Week 5', transactions: 62, confidence: 78 },
    { month: 'Week 6', transactions: 68, confidence: 75 },
    { month: 'Week 7', transactions: 72, confidence: 72 },
    { month: 'Week 8', transactions: 75, confidence: 68 },
    { month: 'Week 9', transactions: 78, confidence: 65 },
    { month: 'Week 10', transactions: 80, confidence: 62 },
    { month: 'Week 11', transactions: 82, confidence: 58 },
    { month: 'Week 12', transactions: 85, confidence: 55 }
  ],

  // Transaction Pipeline by ZIP
  transactionPipeline: [
    {
      zip: '27609',
      estTransactions: 142,
      refiPercent: 65,
      salePercent: 35,
      confidence: 87,
      confidenceLevel: 'High',
      trend: 'up',
      trendValue: 12
    },
    {
      zip: '27613',
      estTransactions: 98,
      refiPercent: 58,
      salePercent: 42,
      confidence: 72,
      confidenceLevel: 'Medium',
      trend: 'stable',
      trendValue: 0
    },
    {
      zip: '27601',
      estTransactions: 87,
      refiPercent: 72,
      salePercent: 28,
      confidence: 84,
      confidenceLevel: 'High',
      trend: 'up',
      trendValue: 8
    },
    {
      zip: '27617',
      estTransactions: 76,
      refiPercent: 55,
      salePercent: 45,
      confidence: 79,
      confidenceLevel: 'Medium',
      trend: 'up',
      trendValue: 5
    },
    {
      zip: '27615',
      estTransactions: 84,
      refiPercent: 68,
      salePercent: 32,
      confidence: 81,
      confidenceLevel: 'High',
      trend: 'stable',
      trendValue: 0
    }
  ],

  // Churn Timeline (Heat Calendar Data)
  churnTimeline: [
    { week: 'Week 1', day1: 12, day2: 15, day3: 18, day4: 22, day5: 25, day6: 20, day7: 16 },
    { week: 'Week 2', day1: 18, day2: 22, day3: 28, day4: 32, day5: 35, day6: 30, day7: 24 },
    { week: 'Week 3', day1: 25, day2: 30, day3: 38, day4: 42, day5: 45, day6: 40, day7: 32 },
    { week: 'Week 4', day1: 32, day2: 38, day3: 45, day4: 52, day5: 55, day6: 48, day7: 40 }
  ]
};

// ==================== INTERFACES ====================
interface KPICardProps {
  title: string;
  value: string | number;
  change?: { value: number; type: string };
  icon: React.ElementType;
  format?: 'number' | 'currency' | 'percent';
  subtitle?: string;
}

// ==================== COMPONENTS ====================
const KPICard: React.FC<KPICardProps> = ({ title, value, change, icon: Icon, format = 'number', subtitle }) => {
  const isPositive = change?.type === 'positive';
  
  const formattedValue = 
    format === 'currency' ? `$${(Number(value) / 1000).toFixed(0)}k` :
    format === 'percent' ? `${value}%` :
    typeof value === 'number' ? value.toLocaleString() : value;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-teal-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-teal-500/10 rounded-lg">
          <Icon className="text-teal-400" size={24} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span>{change.value}{format === 'percent' ? '%' : ''}</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-1">{formattedValue}</h3>
      <p className="text-sm text-gray-400">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const TitleHomeTab: React.FC = () => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-400">{payload[0].payload.month}</p>
          <p className="text-lg font-semibold text-teal-400">
            {payload[0].value} transactions
          </p>
          {payload[0].payload.confidence && (
            <p className="text-xs text-gray-400">
              Confidence: {payload[0].payload.confidence}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* KPI Row - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Est. Transactions"
          value={mockData.kpis.estimatedTransactions}
          change={mockData.kpiChanges.estimatedTransactions}
          icon={Activity}
          subtitle="90-day outlook"
        />
        <KPICard
          title="Refi Volume"
          value={mockData.kpis.refiVolume}
          change={mockData.kpiChanges.refiVolume}
          icon={TrendingUp}
          subtitle={`${mockData.kpis.refiPercent}% of total`}
        />
        <KPICard
          title="Sale Volume"
          value={mockData.kpis.saleVolume}
          change={mockData.kpiChanges.saleVolume}
          icon={TrendingUp}
          subtitle={`${mockData.kpis.salePercent}% of total`}
        />
        <KPICard
          title="Avg Deal Size"
          value={mockData.kpis.avgDealSize}
          change={mockData.kpiChanges.avgDealSize}
          icon={DollarSign}
          format="currency"
        />
        <KPICard
          title="Conv. Confidence"
          value={mockData.kpis.conversionConfidence}
          change={mockData.kpiChanges.conversionConfidence}
          icon={Target}
          format="percent"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transaction Forecast */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Transaction Forecast (90-Day Outlook)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockData.transactionForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                style={{ fontSize: '11px' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                style={{ fontSize: '12px' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="transactions" 
                stroke="#00D1D1" 
                strokeWidth={3}
                dot={{ fill: '#00D1D1', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Timeline (Heat Calendar) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Churn Timeline (Heat Calendar)</h3>
          <div className="space-y-2">
            {mockData.churnTimeline.map((week, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-16">{week.week}</span>
                <div className="flex-1 grid grid-cols-7 gap-1">
                  {[week.day1, week.day2, week.day3, week.day4, week.day5, week.day6, week.day7].map((value, dayIdx) => {
                    const intensity = value < 20 ? 'bg-green-500/20' :
                                     value < 30 ? 'bg-yellow-500/30' :
                                     value < 40 ? 'bg-orange-500/40' :
                                     'bg-red-500/50';
                    return (
                      <div
                        key={dayIdx}
                        className={`h-10 rounded ${intensity} flex items-center justify-center text-xs font-medium hover:scale-110 transition-transform cursor-pointer`}
                        title={`${value} churns`}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 rounded"></div>
              <span>Low (0-20)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500/30 rounded"></div>
              <span>Medium (20-30)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500/40 rounded"></div>
              <span>High (30-40)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/50 rounded"></div>
              <span>Very High (40+)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Pipeline Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Transaction Pipeline by ZIP</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-zinc-800">
                <th className="pb-3 font-medium">ZIP</th>
                <th className="pb-3 font-medium">Est. Transactions</th>
                <th className="pb-3 font-medium">Refi %</th>
                <th className="pb-3 font-medium">Sale %</th>
                <th className="pb-3 font-medium">Confidence</th>
                <th className="pb-3 font-medium">Trend</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockData.transactionPipeline.map((item) => (
                <tr key={item.zip} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                  <td className="py-4 font-medium">{item.zip}</td>
                  <td className="py-4 text-teal-400 font-semibold">{item.estTransactions}</td>
                  <td className="py-4">{item.refiPercent}%</td>
                  <td className="py-4">{item.salePercent}%</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.confidenceLevel === 'High' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.confidenceLevel} ({item.confidence}%)
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1">
                      {item.trend === 'up' && <TrendingUp size={16} className="text-green-400" />}
                      {item.trend === 'stable' && <span className="text-gray-400">→</span>}
                      {item.trend === 'down' && <TrendingDown size={16} className="text-red-400" />}
                      <span className={`text-xs ${
                        item.trend === 'up' ? 'text-green-400' :
                        item.trend === 'stable' ? 'text-gray-400' :
                        'text-red-400'
                      }`}>
                        {item.trend === 'stable' ? 'Stable' : `${item.trendValue > 0 ? '+' : ''}${item.trendValue}%`}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
          <Calendar size={20} />
          <span className="font-medium">Transaction Forecast Report</span>
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
          <Activity size={20} />
          <span className="font-medium">Partner Alert System</span>
        </button>
        <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl p-4 flex items-center justify-center gap-2 transition-colors">
          <TrendingUp size={20} />
          <span className="font-medium">Market Velocity Report</span>
        </button>
      </div>
    </div>
  );
};

export default TitleHomeTab;