"use client"
import React from 'react';
import { Globe, TrendingUp, CreditCard, DollarSign, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export default function CrossMarketTab() {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Cross-Market Influence</h2>
        <p className="text-sm text-gray-400">External market factors and their impact</p>
      </div>

      {/* Macro Changes Impact */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Macro Changes Impact</h3>
            <p className="text-sm text-gray-400">National and regional economic factors</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Interest Rate */}
          <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400">Interest Rate</div>
              <ArrowUp className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">+0.25%</div>
            <div className="text-sm text-red-400 font-medium mb-3">Negative Impact</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>• Current: 7.25%</div>
              <div>• Previous: 7.00%</div>
              <div>• Change: Last 30 days</div>
            </div>
          </div>

          {/* Housing Market */}
          <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400">Housing Market</div>
              <Minus className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">Stable</div>
            <div className="text-sm text-yellow-400 font-medium mb-3">Neutral Impact</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>• Inventory: Normal</div>
              <div>• Sales: Steady</div>
              <div>• Prices: Balanced</div>
            </div>
          </div>

          {/* Local Job Market */}
          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs text-gray-400">Local Job Market</div>
              <ArrowUp className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">Strong</div>
            <div className="text-sm text-green-400 font-medium mb-3">Positive Impact</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>• Unemployment: 3.2%</div>
              <div>• Job Growth: +2.8%</div>
              <div>• Wage Growth: +4.1%</div>
            </div>
          </div>
        </div>

        {/* Overall Market Impact Score */}
        <div className="mt-6 p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm font-medium text-white mb-1">Overall Market Impact Score</div>
              <div className="text-xs text-gray-400">Combined effect on owner's position</div>
            </div>
            <div className="text-3xl font-bold text-yellow-400">6.5<span className="text-lg text-gray-400">/10</span></div>
          </div>
          <div className="bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full" style={{ width: '65%' }}></div>
          </div>
        </div>
      </div>

      {/* Credit Shifts */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center border border-purple-500/30">
            <CreditCard className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Credit Shifts</h3>
            <p className="text-sm text-gray-400">Recent credit profile changes</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Credit Score */}
          <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Credit Score Change</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-4xl font-bold text-white">742</div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-red-400">
                  <ArrowDown className="w-4 h-4" />
                  <span className="text-sm font-bold">-8</span>
                </div>
                <div className="text-xs text-gray-500">from last month</div>
              </div>
            </div>
            <div className="space-y-2 mt-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Previous</span>
                <span className="text-white">750</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Current</span>
                <span className="text-white font-bold">742</span>
              </div>
            </div>
          </div>

          {/* New Credit */}
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">New Credit Activity</div>
            <div className="text-4xl font-bold text-white mb-2">1</div>
            <div className="text-sm text-blue-400 font-medium mb-3">Recent Inquiry</div>
            <div className="space-y-2 mt-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-xs text-gray-300">Auto loan inquiry</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-500">Date: Nov 28, 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-500">Type: Hard inquiry</span>
              </div>
            </div>
          </div>

          {/* Credit Utilization */}
          <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Credit Utilization</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-4xl font-bold text-white">32%</div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-orange-400">
                  <ArrowUp className="w-4 h-4" />
                  <span className="text-sm font-bold">+4%</span>
                </div>
                <div className="text-xs text-gray-500">from 28%</div>
              </div>
            </div>
            <div className="mt-3 bg-gray-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-3 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <div className="text-xs text-gray-400 mt-2">Still in "Good" range (&lt;35%)</div>
          </div>
        </div>

        {/* Credit Change Analysis */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Score Impact Factors</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Hard Inquiry</span>
                <span className="text-sm text-red-400">-5 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Utilization Increase</span>
                <span className="text-sm text-red-400">-3 pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">On-time Payments</span>
                <span className="text-sm text-green-400">+0 pts</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Recovery Timeline</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Inquiry Impact</span>
                <span className="text-sm text-white">3-6 months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Expected Recovery</span>
                <span className="text-sm text-green-400">~748-752</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Action Needed</span>
                <span className="text-sm text-yellow-400">Monitor</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Crypto/Equity Impacts */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
            <DollarSign className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Crypto/Equity Impacts</h3>
            <p className="text-sm text-gray-400">Investment portfolio and market exposure</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Crypto Exposure */}
          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Crypto Exposure</div>
            <div className="text-3xl font-bold text-white mb-2">Low</div>
            <div className="text-sm text-gray-400 mb-3">No Detected Holdings</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-400">Bitcoin: None detected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-400">Ethereum: None detected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                <span className="text-xs text-gray-400">Other: None detected</span>
              </div>
            </div>
          </div>

          {/* Stock Portfolio */}
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Stock Portfolio</div>
            <div className="text-3xl font-bold text-white mb-2">Moderate</div>
            <div className="text-sm text-blue-400 mb-3">~$85K Estimated</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Index Funds</span>
                <span className="text-white">~$60K</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Individual Stocks</span>
                <span className="text-white">~$20K</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Bonds</span>
                <span className="text-white">~$5K</span>
              </div>
            </div>
          </div>

          {/* Market Volatility */}
          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-3">Market Volatility Impact</div>
            <div className="text-3xl font-bold text-white mb-2">Minimal</div>
            <div className="text-sm text-green-400 mb-3">Low Risk Exposure</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Risk Level</span>
                <span className="text-green-400">Low</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Diversification</span>
                <span className="text-green-400">Good</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Stress Impact</span>
                <span className="text-green-400">Minimal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Analysis */}
        <div className="mt-6 p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-medium text-white mb-1">Overall Financial Health</div>
              <div className="text-xs text-gray-400">Diversification and stability score</div>
            </div>
            <div className="text-3xl font-bold text-green-400">8.2<span className="text-lg text-gray-400">/10</span></div>
          </div>
          <div className="bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full" style={{ width: '82%' }}></div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-gray-400 mb-1">Liquidity</div>
              <div className="text-white font-medium">Strong</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Risk Profile</div>
              <div className="text-white font-medium">Conservative</div>
            </div>
            <div>
              <div className="text-gray-400 mb-1">Net Worth Trend</div>
              <div className="text-green-400 font-medium">↑ Growing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Influence Summary */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
            <TrendingUp className="w-6 h-6 text-[#00D4D4]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Market Influence Summary</h3>
            <p className="text-sm text-gray-400">Key takeaways and recommendations</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Interest Rate Environment</div>
                <div className="text-xs text-gray-400">Recent rate increase (+0.25%) creates pressure for refinancing consideration. Owner should monitor for rate drops below 3.75% to maximize savings potential of ~$285/month.</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Credit Score Impact</div>
                <div className="text-xs text-gray-400">Minor credit score decrease (-8 points) due to auto loan inquiry. Score should recover to 748-752 range within 3-6 months with continued on-time payments.</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Financial Stability</div>
                <div className="text-xs text-gray-400">Strong local job market and moderate stock portfolio provide good financial foundation. Low crypto exposure reduces volatility risk. Overall position is stable despite minor credit changes.</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Action Recommendation</div>
                <div className="text-xs text-gray-400">Monitor credit utilization and continue current payment patterns. Stay alert for refinancing opportunities in Q2 2025. Consider consultative outreach focusing on equity position and market timing.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}