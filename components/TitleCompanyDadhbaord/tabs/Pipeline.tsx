import React, { useState } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

// ==================== MOCK DATA ====================
const mockData = {
  // Churn Prediction Matrix (Heatmap Data)
  churnPredictionMatrix: [
    // Loan Age × Equity Level = Churn Probability
    { loanAge: '0-12 months', equity0_100: 15, equity100_200: 25, equity200_300: 35, equity300_400: 45, equity400plus: 55 },
    { loanAge: '12-18 months', equity0_100: 22, equity100_200: 35, equity200_300: 52, equity300_400: 68, equity400plus: 75 },
    { loanAge: '18-24 months', equity0_100: 35, equity100_200: 48, equity200_300: 78, equity300_400: 82, equity400plus: 88 },
    { loanAge: '24-36 months', equity0_100: 42, equity100_200: 58, equity200_300: 85, equity300_400: 91, equity400plus: 94 },
    { loanAge: '36-48 months', equity0_100: 38, equity100_200: 52, equity200_300: 72, equity300_400: 78, equity400plus: 85 },
    { loanAge: '48+ months', equity0_100: 28, equity100_200: 38, equity200_300: 55, equity300_400: 62, equity400plus: 72 }
  ],

  // Transaction Pipeline Details
  pipelineDetails: [
    {
      id: 1,
      zip: '27609',
      address: '123 Oak Street',
      loanAge: 22,
      equity: 285000,
      churnProbability: 85,
      transactionType: 'Refinance',
      estimatedDate: '2025-12-15',
      confidence: 87,
      dealSize: 425000
    },
    {
      id: 2,
      zip: '27613',
      address: '456 Elm Avenue',
      loanAge: 28,
      equity: 405000,
      churnProbability: 91,
      transactionType: 'Sale',
      estimatedDate: '2025-12-20',
      confidence: 92,
      dealSize: 580000
    },
    {
      id: 3,
      zip: '27601',
      address: '789 Pine Boulevard',
      loanAge: 18,
      equity: 220000,
      churnProbability: 78,
      transactionType: 'Refinance',
      estimatedDate: '2025-12-28',
      confidence: 82,
      dealSize: 395000
    },
    {
      id: 4,
      zip: '27617',
      address: '234 Maple Court',
      loanAge: 24,
      equity: 368000,
      churnProbability: 88,
      transactionType: 'Sale',
      estimatedDate: '2026-01-05',
      confidence: 89,
      dealSize: 512000
    },
    {
      id: 5,
      zip: '27609',
      address: '567 Cedar Lane',
      loanAge: 31,
      equity: 312000,
      churnProbability: 89,
      transactionType: 'Refinance',
      estimatedDate: '2026-01-10',
      confidence: 85,
      dealSize: 445000
    },
    {
      id: 6,
      zip: '27613',
      address: '890 Birch Drive',
      loanAge: 15,
      equity: 198000,
      churnProbability: 68,
      transactionType: 'Sale',
      estimatedDate: '2026-01-15',
      confidence: 72,
      dealSize: 372000
    },
    {
      id: 7,
      zip: '27601',
      address: '123 Willow Way',
      loanAge: 12,
      equity: 145000,
      churnProbability: 55,
      transactionType: 'Refinance',
      estimatedDate: '2026-01-20',
      confidence: 68,
      dealSize: 298000
    },
    {
      id: 8,
      zip: '27617',
      address: '456 Spruce Street',
      loanAge: 26,
      equity: 487000,
      churnProbability: 94,
      transactionType: 'Sale',
      estimatedDate: '2026-01-25',
      confidence: 95,
      dealSize: 625000
    }
  ],

  // Pipeline Summary Stats
  pipelineSummary: {
    totalPipeline: 487,
    highConfidence: 142,
    mediumConfidence: 212,
    lowConfidence: 133,
    avgChurnProbability: 76,
    avgConfidence: 82,
    totalValue: 187450000
  }
};

// ==================== INTERFACES ====================
interface PipelineDetail {
  id: number;
  zip: string;
  address: string;
  loanAge: number;
  equity: number;
  churnProbability: number;
  transactionType: string;
  estimatedDate: string;
  confidence: number;
  dealSize: number;
}

// ==================== MAIN COMPONENT ====================
const PipelineTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'refinance' | 'sale'>('all');
  const [filterConfidence, setFilterConfidence] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  // Filter pipeline details
  const filteredPipeline = mockData.pipelineDetails.filter(item => {
    const matchesSearch = searchQuery === '' ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zip.includes(searchQuery);

    const matchesType = filterType === 'all' ||
      (filterType === 'refinance' && item.transactionType === 'Refinance') ||
      (filterType === 'sale' && item.transactionType === 'Sale');

    const matchesConfidence = filterConfidence === 'all' ||
      (filterConfidence === 'high' && item.confidence >= 85) ||
      (filterConfidence === 'medium' && item.confidence >= 70 && item.confidence < 85) ||
      (filterConfidence === 'low' && item.confidence < 70);

    return matchesSearch && matchesType && matchesConfidence;
  });

  const getChurnColor = (probability: number) => {
    if (probability >= 85) return 'bg-red-500/50';
    if (probability >= 70) return 'bg-orange-500/40';
    if (probability >= 50) return 'bg-yellow-500/30';
    return 'bg-green-500/20';
  };

  const getChurnLabel = (probability: number) => {
    if (probability >= 85) return { text: 'Very High', color: 'text-red-400' };
    if (probability >= 70) return { text: 'High', color: 'text-orange-400' };
    if (probability >= 50) return { text: 'Medium', color: 'text-yellow-400' };
    return { text: 'Low', color: 'text-green-400' };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Transaction Pipeline</h2>
        <p className="text-gray-400">Track predicted transactions and churn patterns</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-teal-400">{mockData.pipelineSummary.totalPipeline}</p>
          <p className="text-sm text-gray-400">Total Pipeline</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-green-400">{mockData.pipelineSummary.highConfidence}</p>
          <p className="text-sm text-gray-400">High Confidence</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-yellow-400">{mockData.pipelineSummary.mediumConfidence}</p>
          <p className="text-sm text-gray-400">Medium Confidence</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-gray-400">{mockData.pipelineSummary.lowConfidence}</p>
          <p className="text-sm text-gray-400">Low Confidence</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-teal-400">{mockData.pipelineSummary.avgChurnProbability}%</p>
          <p className="text-sm text-gray-400">Avg Churn</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-2xl font-bold text-teal-400">
            ${(mockData.pipelineSummary.totalValue / 1000000).toFixed(0)}M
          </p>
          <p className="text-sm text-gray-400">Total Value</p>
        </div>
      </div>

      {/* Churn Prediction Matrix (Heatmap) */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Churn Prediction Matrix</h3>
        <p className="text-sm text-gray-400 mb-4">Loan Age × Equity Level = Churn Probability (%)</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400">
                <th className="text-left pb-3 pr-4">Loan Age</th>
                <th className="pb-3 px-2">$0-100k</th>
                <th className="pb-3 px-2">$100-200k</th>
                <th className="pb-3 px-2">$200-300k</th>
                <th className="pb-3 px-2">$300-400k</th>
                <th className="pb-3 px-2">$400k+</th>
              </tr>
            </thead>
            <tbody>
              {mockData.churnPredictionMatrix.map((row, idx) => (
                <tr key={idx}>
                  <td className="py-2 pr-4 font-medium text-gray-300">{row.loanAge}</td>
                  <td className="py-2 px-2">
                    <div className={`${getChurnColor(row.equity0_100)} rounded p-2 text-center font-semibold`}>
                      {row.equity0_100}%
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className={`${getChurnColor(row.equity100_200)} rounded p-2 text-center font-semibold`}>
                      {row.equity100_200}%
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className={`${getChurnColor(row.equity200_300)} rounded p-2 text-center font-semibold`}>
                      {row.equity200_300}%
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className={`${getChurnColor(row.equity300_400)} rounded p-2 text-center font-semibold`}>
                      {row.equity300_400}%
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className={`${getChurnColor(row.equity400plus)} rounded p-2 text-center font-semibold`}>
                      {row.equity400plus}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/20 rounded"></div>
            <span className="text-gray-400">Low (0-50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/30 rounded"></div>
            <span className="text-gray-400">Medium (50-70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500/40 rounded"></div>
            <span className="text-gray-400">High (70-85%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/50 rounded"></div>
            <span className="text-gray-400">Very High (85%+)</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by address or ZIP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Types</option>
            <option value="refinance">Refinance Only</option>
            <option value="sale">Sale Only</option>
          </select>

          <select
            value={filterConfidence}
            onChange={(e) => setFilterConfidence(e.target.value as any)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">All Confidence</option>
            <option value="high">High (85%+)</option>
            <option value="medium">Medium (70-85%)</option>
            <option value="low">Low (&lt;70%)</option>
          </select>
        </div>
      </div>

      {/* Pipeline Details Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800/50">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4 font-medium">Address</th>
                <th className="p-4 font-medium">ZIP</th>
                <th className="p-4 font-medium">Loan Age</th>
                <th className="p-4 font-medium">Equity</th>
                <th className="p-4 font-medium">Churn Prob.</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Est. Date</th>
                <th className="p-4 font-medium">Confidence</th>
                <th className="p-4 font-medium">Deal Size</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredPipeline.map((item: PipelineDetail) => {
                const churnLabel = getChurnLabel(item.churnProbability);
                return (
                  <tr key={item.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="p-4 font-medium">{item.address}</td>
                    <td className="p-4">{item.zip}</td>
                    <td className="p-4">{item.loanAge} mo</td>
                    <td className="p-4 text-teal-400">${(item.equity / 1000).toFixed(0)}k</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${churnLabel.color} bg-opacity-10`}>
                        {item.churnProbability}% {churnLabel.text}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.transactionType === 'Refinance' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-purple-500/20 text-purple-400'
                      }`}>
                        {item.transactionType}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400">{item.estimatedDate}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {item.confidence >= 85 ? (
                          <CheckCircle size={16} className="text-green-400" />
                        ) : (
                          <AlertCircle size={16} className="text-yellow-400" />
                        )}
                        <span>{item.confidence}%</span>
                      </div>
                    </td>
                    <td className="p-4 font-semibold">${(item.dealSize / 1000).toFixed(0)}k</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PipelineTab;