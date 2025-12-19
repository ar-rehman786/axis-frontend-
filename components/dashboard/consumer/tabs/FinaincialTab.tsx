import React, { useState } from 'react';
import { DollarSign, TrendingUp, Building, Calendar, MapPin, History, Calculator, Download, RefreshCw, Edit2, X, ChevronDown, ChevronUp } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  event: string;
  amount: string;
  type: 'loan' | 'appreciation' | 'paydown' | 'current';
  icon: string;
  details: string;
}

interface LoanDetail {
  label: string;
  value: string | number;
  editable: boolean;
}

interface MarketMetric {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function FinancialTab() {
  const [showEditEquity, setShowEditEquity] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [expandedTimeline, setExpandedTimeline] = useState(true);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<TimelineEvent | null>(null);

  const [equityData, setEquityData] = useState({
    propertyValue: 425000,
    loanBalance: 245000,
    equity: 180000,
    equityPercent: 42,
    ltv: 58
  });

  const [loanDetails, setLoanDetails] = useState<LoanDetail[]>([
    { label: 'Loan Date', value: '06/15/2022', editable: false },
    { label: 'Loan Age', value: '30 months', editable: false },
    { label: 'Interest Rate', value: '4.25%', editable: true },
    { label: 'Loan Type', value: 'Conventional', editable: true },
    { label: 'Lender', value: 'Wells Fargo', editable: true },
    { label: 'Monthly Payment', value: '$1,285', editable: false }
  ]);

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([
    {
      id: 1,
      date: '2022-06',
      event: 'Loan originated',
      amount: '$245k',
      type: 'loan',
      icon: '🏦',
      details: 'Original loan amount at 4.25% interest rate'
    },
    {
      id: 2,
      date: '2024-01',
      event: 'Equity +$45k (market appreciation)',
      amount: '+$45k',
      type: 'appreciation',
      icon: '📈',
      details: 'Property value increased due to strong market conditions'
    },
    {
      id: 3,
      date: '2024-06',
      event: 'Equity +$18k (paydown)',
      amount: '+$18k',
      type: 'paydown',
      icon: '💰',
      details: 'Principal reduction through regular monthly payments'
    },
    {
      id: 4,
      date: '2024-11',
      event: 'Current equity',
      amount: '$180k',
      type: 'current',
      icon: '✅',
      details: 'Current equity position after 30 months'
    }
  ]);

  const [marketMetrics] = useState<MarketMetric[]>([
    { label: 'Market Tier', value: 'Prime', change: 'Top 25%' },
    { label: 'ZIP Momentum', value: 'High', change: '+8.5% YoY', trend: 'up' },
    { label: 'Comparable Sales', value: '$420K - $450K', change: 'Last 90 days' },
    { label: 'Appreciation (YoY)', value: '+8.5%', trend: 'up' },
    { label: 'Market Condition', value: 'Balanced', trend: 'stable' }
  ]);

  const [calculatorValues, setCalculatorValues] = useState({
    newPropertyValue: 425000,
    newLoanBalance: 245000,
    newInterestRate: 4.25
  });

  const calculateEquity = () => {
    const equity = calculatorValues.newPropertyValue - calculatorValues.newLoanBalance;
    const equityPercent = Math.round((equity / calculatorValues.newPropertyValue) * 100);
    const ltv = Math.round((calculatorValues.newLoanBalance / calculatorValues.newPropertyValue) * 100);
    
    setEquityData({
      propertyValue: calculatorValues.newPropertyValue,
      loanBalance: calculatorValues.newLoanBalance,
      equity: equity,
      equityPercent: equityPercent,
      ltv: ltv
    });
    
    alert('Equity recalculated successfully!');
  };

  const handleRefreshMarketData = () => {
    alert('Market data refreshed successfully!');
  };

  const handleExportFinancial = () => {
    const financialData = {
      equity: equityData,
      loan: loanDetails,
      timeline: timelineEvents,
      market: marketMetrics
    };
    console.log('Exporting financial data:', financialData);
    alert('Financial data exported successfully!');
  };

  const handleUpdateEquity = () => {
    setShowEditEquity(false);
    calculateEquity();
  };

  const handleViewTimelineDetails = (event: TimelineEvent) => {
    setSelectedTimelineEvent(event);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = (trend?: string) => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Section Title with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Equity & Financial Profile</h2>
          <p className="text-sm text-gray-400">Complete financial position and loan details</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCalculator(true)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 border border-gray-700"
          >
            <Calculator className="w-4 h-4" />
            Calculator
          </button>
          <button
            onClick={handleRefreshMarketData}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExportFinancial}
            className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Equity Snapshot */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Equity Snapshot</h3>
              <p className="text-sm text-gray-400">Current position as of December 2024</p>
            </div>
          </div>
          <button
            onClick={() => setShowEditEquity(true)}
            className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2 border border-gray-700"
          >
            <Edit2 className="w-4 h-4" />
            Update
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">Property Value</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(equityData.propertyValue)}</div>
            <div className="text-xs text-gray-500 mt-1">Current market value</div>
          </div>

          <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-lg hover:border-red-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">Loan Balance</div>
            <div className="text-2xl font-bold text-white">{formatCurrency(equityData.loanBalance)}</div>
            <div className="text-xs text-gray-500 mt-1">Outstanding principal</div>
          </div>

          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">Equity Amount</div>
            <div className="text-2xl font-bold text-green-400">{formatCurrency(equityData.equity)}</div>
            <div className="text-xs text-green-500 mt-1">{equityData.equityPercent}% of property value</div>
          </div>

          <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all">
            <div className="text-xs text-gray-400 mb-2">LTV Ratio</div>
            <div className="text-2xl font-bold text-white">{equityData.ltv}%</div>
            <div className="text-xs text-gray-500 mt-1">Loan-to-Value</div>
          </div>
        </div>

        {/* Visual Equity Bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Equity Distribution</span>
            <span>{equityData.equityPercent}% Equity | {equityData.ltv}% Loan</span>
          </div>
          <div className="flex h-8 rounded-lg overflow-hidden border border-gray-700">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center transition-all" 
              style={{ width: `${equityData.equityPercent}%` }}
            >
              <span className="text-xs font-bold text-white">{formatCurrency(equityData.equity)} Equity</span>
            </div>
            <div 
              className="bg-gradient-to-r from-gray-600 to-gray-700 flex items-center justify-center transition-all" 
              style={{ width: `${equityData.ltv}%` }}
            >
              <span className="text-xs font-bold text-white">{formatCurrency(equityData.loanBalance)} Loan</span>
            </div>
          </div>
        </div>

        {/* Equity Growth Indicator */}
        <div className="mt-4 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Equity Growth Since Origin</span>
            </div>
            <div className="text-lg font-bold text-green-400">+{formatCurrency(equityData.equity)}</div>
          </div>
          <div className="mt-2 text-xs text-gray-400">From $0 to {formatCurrency(equityData.equity)} in 30 months</div>
        </div>
      </div>

      {/* Loan Details */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
            <Building className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Loan Details</h3>
            <p className="text-sm text-gray-400">Mortgage and financing information</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {loanDetails.map((detail, idx) => (
            <div key={idx} className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {detail.label === 'Loan Date' && <Calendar className="w-4 h-4 text-gray-400" />}
                  {detail.label === 'Loan Age' && <History className="w-4 h-4 text-gray-400" />}
                  {detail.label === 'Interest Rate' && <TrendingUp className="w-4 h-4 text-gray-400" />}
                  <div className="text-xs text-gray-400">{detail.label}</div>
                </div>
                {detail.editable && (
                  <Edit2 className="w-3 h-3 text-gray-500 cursor-pointer hover:text-[#00D4D4]" />
                )}
              </div>
              <div className={`text-lg font-bold ${
                detail.label === 'Interest Rate' ? 'text-[#00D4D4]' : 'text-white'
              }`}>
                {detail.value}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-400">Loan Status</span>
            </div>
            <span className="text-sm font-bold text-green-400">Current / No Delays</span>
          </div>
          <div className="mt-2 text-xs text-gray-500">100% on-time payment history (30 months)</div>
        </div>
      </div>

      {/* Market Position */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30">
            <MapPin className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Market Position</h3>
            <p className="text-sm text-gray-400">Property value context and trends</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Market Tier</div>
            <div className="text-2xl font-bold text-purple-400">Prime</div>
            <div className="text-xs text-gray-500 mt-1">Top 25% of market</div>
          </div>

          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-400">ZIP Momentum</div>
              <span className="text-xs text-green-400">↑</span>
            </div>
            <div className="text-2xl font-bold text-green-400">High</div>
            <div className="text-xs text-gray-500 mt-1">Strong appreciation</div>
          </div>

          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Comparable Sales</div>
            <div className="text-2xl font-bold text-white">$420K - $450K</div>
            <div className="text-xs text-gray-500 mt-1">Last 90 days</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-gray-400">Appreciation (YoY)</div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold text-green-400">+8.5%</div>
              <span className="text-xs text-gray-500">vs last year</span>
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Market Condition</div>
            <div className="flex items-center gap-2">
              <div className="text-xl font-bold text-yellow-400">Balanced</div>
              <span className="text-xs text-gray-500">Stable pricing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline of Changes */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
              <History className="w-6 h-6 text-[#00D4D4]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Timeline of Changes</h3>
              <p className="text-sm text-gray-400">Equity evolution and key events</p>
            </div>
          </div>
          <button
            onClick={() => setExpandedTimeline(!expandedTimeline)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {expandedTimeline ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {expandedTimeline && (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00D4D4] to-gray-800"></div>

            {/* Timeline Events */}
            <div className="space-y-6">
              {timelineEvents.map((event, idx) => (
                <div 
                  key={event.id} 
                  className="relative flex items-start gap-4 pl-14 cursor-pointer group"
                  onClick={() => handleViewTimelineDetails(event)}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 w-5 h-5 border-4 border-black rounded-full ${
                    event.type === 'current' ? 'bg-[#00D4D4]' : 'bg-gray-600'
                  } group-hover:bg-[#00D4D4] transition-all`}></div>
                  
                  {/* Event Content */}
                  <div className="flex-1 p-4 bg-gray-800/50 border border-gray-700 rounded-lg hover:border-[#00D4D4]/30 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{event.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-white">{event.event}</div>
                          <div className="text-xs text-gray-400">{event.date}</div>
                        </div>
                      </div>
                      <div className={`text-lg font-bold ${
                        event.amount.includes('+') ? 'text-green-400' : 
                        event.type === 'current' ? 'text-[#00D4D4]' : 
                        'text-white'
                      }`}>
                        {event.amount}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Financial Summary */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Financial Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Equity Growth (Since Origin)</div>
            <div className="text-2xl font-bold text-green-400">+{formatCurrency(equityData.equity)}</div>
            <div className="text-xs text-gray-500 mt-1">From $0 to {formatCurrency(equityData.equity)} in 30 months</div>
          </div>

          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Payment History</div>
            <div className="text-2xl font-bold text-green-400">100%</div>
            <div className="text-xs text-gray-500 mt-1">All payments on time (30 months)</div>
          </div>

          <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Home Equity Loan Potential</div>
            <div className="text-2xl font-bold text-purple-400">$144K</div>
            <div className="text-xs text-gray-500 mt-1">80% LTV limit ($340K - $196K current)</div>
          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Refi Potential Savings</div>
            <div className="text-2xl font-bold text-yellow-400">$285/mo</div>
            <div className="text-xs text-gray-500 mt-1">If rate drops to 3.75%</div>
          </div>
        </div>
      </div>

      {/* Equity Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
                  <Calculator className="w-6 h-6 text-[#00D4D4]" />
                </div>
                <h2 className="text-2xl font-bold text-white">Equity Calculator</h2>
              </div>
              <button onClick={() => setShowCalculator(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Property Value ($)</label>
                <input
                  type="number"
                  value={calculatorValues.newPropertyValue}
                  onChange={(e) => setCalculatorValues({...calculatorValues, newPropertyValue: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Loan Balance ($)</label>
                <input
                  type="number"
                  value={calculatorValues.newLoanBalance}
                  onChange={(e) => setCalculatorValues({...calculatorValues, newLoanBalance: parseInt(e.target.value)})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={calculatorValues.newInterestRate}
                  onChange={(e) => setCalculatorValues({...calculatorValues, newInterestRate: parseFloat(e.target.value)})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-lg font-bold"
                />
              </div>

              {/* Calculated Results */}
              <div className="p-5 bg-[#00D4D4]/5 border border-[#00D4D4]/20 rounded-lg">
                <div className="text-sm font-medium text-white mb-3">Calculated Results</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Equity Amount:</span>
                    <span className="text-lg font-bold text-green-400">
                      {formatCurrency(calculatorValues.newPropertyValue - calculatorValues.newLoanBalance)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">Equity Percentage:</span>
                    <span className="text-lg font-bold text-white">
                      {Math.round(((calculatorValues.newPropertyValue - calculatorValues.newLoanBalance) / calculatorValues.newPropertyValue) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">LTV Ratio:</span>
                    <span className="text-lg font-bold text-white">
                      {Math.round((calculatorValues.newLoanBalance / calculatorValues.newPropertyValue) * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowCalculator(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateEquity}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Equity Modal */}
      {showEditEquity && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Update Equity Information</h2>
              <button onClick={() => setShowEditEquity(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Property Value ($)</label>
                  <input
                    type="number"
                    value={calculatorValues.newPropertyValue}
                    onChange={(e) => setCalculatorValues({...calculatorValues, newPropertyValue: parseInt(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Loan Balance ($)</label>
                  <input
                    type="number"
                    value={calculatorValues.newLoanBalance}
                    onChange={(e) => setCalculatorValues({...calculatorValues, newLoanBalance: parseInt(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditEquity(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateEquity}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Update Equity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}