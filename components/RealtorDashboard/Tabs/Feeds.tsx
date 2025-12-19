import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Home, MapPin } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ==================== MOCK DATA ====================
const mockData = {
  // Market Activity by ZIP
  marketActivityByZip: [
    {
      zip: '27609',
      activeListings: 142,
      medianDOM: 38,
      priceReductions: 18,
      medianPrice: 425000,
      trend: 'Hot Market'
    },
    {
      zip: '27613',
      activeListings: 98,
      medianDOM: 42,
      priceReductions: 15,
      medianPrice: 398000,
      trend: 'Stable'
    },
    {
      zip: '27601',
      activeListings: 87,
      medianDOM: 45,
      priceReductions: 22,
      medianPrice: 365000,
      trend: 'Cooling'
    },
    {
      zip: '27617',
      activeListings: 54,
      medianDOM: 32,
      priceReductions: 12,
      medianPrice: 442000,
      trend: 'Very Hot'
    },
    {
      zip: '27615',
      activeListings: 76,
      medianDOM: 51,
      priceReductions: 28,
      medianPrice: 312000,
      trend: "Buyer's Market"
    }
  ],

  // Property Value Trend (6 Months)
  propertyValueTrend: [
    { month: 'Jun 2024', avgValue: 365000 },
    { month: 'Jul 2024', avgValue: 372000 },
    { month: 'Aug 2024', avgValue: 378000 },
    { month: 'Sep 2024', avgValue: 381000 },
    { month: 'Oct 2024', avgValue: 385000 },
    { month: 'Nov 2024', avgValue: 385000 }
  ],

  // Key Market Indicators
  marketIndicators: {
    totalListings: { value: 457, change: 8.2, trend: 'up' },
    avgDOM: { value: 42, change: -5, trend: 'down' },
    priceReductions: { value: 95, change: 12, trend: 'up' },
    monthsSupply: { value: 3.2, status: 'Balanced Market' }
  },

  // Recent Market Activity
  recentActivity: [
    {
      id: 1,
      type: 'new',
      address: '123 Oak Street, 27609',
      time: '2 hours ago',
      value: 425000,
      color: 'green'
    },
    {
      id: 2,
      type: 'reduction',
      address: '456 Elm Avenue, 27613',
      time: '5 hours ago',
      value: -15000,
      color: 'yellow'
    },
    {
      id: 3,
      type: 'sold',
      address: '789 Pine Boulevard, 27601',
      time: '1 day ago',
      value: 395000,
      color: 'red'
    },
    {
      id: 4,
      type: 'new',
      address: '234 Maple Court, 27617',
      time: '1 day ago',
      value: 512000,
      color: 'green'
    },
    {
      id: 5,
      type: 'reduction',
      address: '567 Cedar Lane, 27609',
      time: '2 days ago',
      value: -22000,
      color: 'yellow'
    }
  ]
};

// ==================== INTERFACES ====================
interface MarketCardProps {
  data: {
    zip: string;
    activeListings: number;
    medianDOM: number;
    priceReductions: number;
    medianPrice: number;
    trend: string;
  };
}

// ==================== COMPONENTS ====================
const MarketCard: React.FC<MarketCardProps> = ({ data }) => {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'Very Hot': return 'text-red-400 bg-red-500/20';
      case 'Hot Market': return 'text-red-400 bg-red-500/20';
      case 'Stable': return 'text-teal-400 bg-teal-500/20';
      case 'Cooling': return 'text-blue-400 bg-blue-500/20';
      case "Buyer's Market": return 'text-purple-400 bg-purple-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-teal-500/50 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-lg font-semibold mb-1">ZIP {data.zip}</h4>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getTrendColor(data.trend)}`}>
            {data.trend}
          </span>
        </div>
        <MapPin className="text-teal-400" size={20} />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Active Listings</span>
          <span className="text-lg font-semibold">{data.activeListings}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Median DOM</span>
          <span className="text-lg font-semibold">{data.medianDOM} days</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Price Reductions</span>
          <span className="text-lg font-semibold text-blue-400">{data.priceReductions}</span>
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-zinc-800">
          <span className="text-sm text-gray-400">Median Price</span>
          <span className="text-lg font-semibold text-teal-400">
            ${(data.medianPrice / 1000).toFixed(0)}k
          </span>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const FeedsTab: React.FC = () => {
  const [selectedZip, setSelectedZip] = useState('all');

  // Filter market data based on selected ZIP
  const filteredMarketData = selectedZip === 'all'
    ? mockData.marketActivityByZip
    : mockData.marketActivityByZip.filter(item => item.zip === selectedZip);

  // Custom Tooltip for Chart
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: { value: number; payload: { month: string } }[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 shadow-lg">
          <p className="text-sm text-gray-400">{payload[0].payload.month}</p>
          <p className="text-lg font-semibold text-teal-400">
            ${(payload[0].value / 1000).toFixed(0)}k
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Market Feeds</h2>
          <p className="text-gray-400">Housing trends, DOM, price movements, and inventory levels</p>
        </div>
        <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm font-medium transition-colors">
          Refresh Data
        </button>
      </div>

      {/* ZIP Filter */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Filter by ZIP:</label>
          <select
            value={selectedZip}
            onChange={(e) => setSelectedZip(e.target.value)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All ZIP Codes</option>
            <option value="27609">27609 - Raleigh</option>
            <option value="27613">27613 - Durham</option>
            <option value="27601">27601 - Cary</option>
            <option value="27617">27617 - Raleigh North</option>
            <option value="27615">27615 - Raleigh West</option>
          </select>
        </div>
      </div>

      {/* Market Activity Cards */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Market Activity by ZIP</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMarketData.map((item) => (
            <MarketCard key={item.zip} data={item} />
          ))}
        </div>
      </div>

      {/* Price Trend Chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Property Value Trend (6 Months)</h3>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mockData.propertyValueTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="month" 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9CA3AF"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="avgValue" 
              stroke="#00D1D1" 
              strokeWidth={3}
              dot={{ fill: '#00D1D1', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Market Indicators Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Key Market Indicators</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Listings */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Home className="text-red-400" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.marketIndicators.totalListings.value}</p>
                <p className="text-sm text-gray-400">Total Listings</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingUp size={16} />
              <span>+{mockData.marketIndicators.totalListings.change}% vs last month</span>
            </div>
          </div>

          {/* Average DOM */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Calendar className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.marketIndicators.avgDOM.value}</p>
                <p className="text-sm text-gray-400">Avg DOM</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingDown size={16} />
              <span>{mockData.marketIndicators.avgDOM.change} days (better)</span>
            </div>
          </div>

          {/* Price Reductions */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <DollarSign className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.marketIndicators.priceReductions.value}</p>
                <p className="text-sm text-gray-400">Price Reductions</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-red-400">
              <TrendingUp size={16} />
              <span>+{mockData.marketIndicators.priceReductions.change} vs last week</span>
            </div>
          </div>

          {/* Months Supply */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Home className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockData.marketIndicators.monthsSupply.value}</p>
                <p className="text-sm text-gray-400">Months Supply</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-teal-400">
              <span>{mockData.marketIndicators.monthsSupply.status}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Market Activity</h3>
        <div className="space-y-3">
          {mockData.recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-b-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 bg-${activity.color}-400 rounded-full`}></div>
                <div>
                  <p className="text-sm font-medium">
                    {activity.type === 'new' && 'New Listing'}
                    {activity.type === 'reduction' && 'Price Reduction'}
                    {activity.type === 'sold' && 'Sold'}
                    {' - '}{activity.address}
                  </p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${
                activity.type === 'new' || activity.type === 'sold' 
                  ? 'text-teal-400' 
                  : 'text-yellow-400'
              }`}>
                {activity.value < 0 ? '' : '$'}
                {Math.abs(activity.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedsTab;