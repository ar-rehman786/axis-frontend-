"use client"
import React, { useState } from 'react';
import { Target, Phone, Mail, Calendar, Clock, AlertCircle, CheckCircle, TrendingUp, LucideIcon } from 'lucide-react';

interface FollowUpStep {
  step: number;
  title: string;
  timing: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green';
}

export default function ActionsTab() {
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null);

  const followUpSteps: FollowUpStep[] = [
    {
      step: 1,
      title: 'Initial contact: Equity awareness email',
      timing: 'Week 1',
      description: 'Soft introduction focusing on market trends and owner\'s equity position',
      icon: Mail,
      color: 'blue'
    },
    {
      step: 2,
      title: 'Week 2: Market update + comp analysis',
      timing: 'Week 2',
      description: 'Provide local market insights and comparable property analysis',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      step: 3,
      title: 'Week 4: Personalized valuation offer',
      timing: 'Week 4',
      description: 'Offer complimentary home valuation and consultation',
      icon: Calendar,
      color: 'green'
    }
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' }
  };

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Suggested Actions</h2>
        <p className="text-sm text-gray-400">AI-recommended engagement strategy</p>
      </div>

      {/* Recommended Agent Engagement */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
            <Target className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Recommended Agent Engagement</h3>
            <p className="text-sm text-gray-400">Optimal outreach timing and approach</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Priority Level</div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-3xl">🟡</div>
              <div className="text-2xl font-bold text-yellow-400">Medium</div>
            </div>
            <div className="text-xs text-gray-500">Active monitoring required</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Contact Window</div>
            <div className="text-2xl font-bold text-white mb-2">7-14 days</div>
            <div className="text-xs text-gray-500">Optimal timeframe</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Engagement Type</div>
            <div className="text-2xl font-bold text-[#00D4D4] mb-2">Consultative</div>
            <div className="text-xs text-gray-500">Soft approach</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Success Probability</div>
            <div className="text-2xl font-bold text-green-400 mb-2">64%</div>
            <div className="text-xs text-gray-500">Based on signals</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <div className="text-sm font-medium text-white">Primary Focus</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Equity position awareness</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Market opportunity timing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-300">Refinance window education</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-purple-400" />
              <div className="text-sm font-medium text-white">Recommended Tone</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Consultative, non-pushy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Educational and informative</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Value-focused messaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Follow-up Strategy */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
            <Calendar className="w-6 h-6 text-[#00D4D4]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Follow-up Strategy</h3>
            <p className="text-sm text-gray-400">3-step engagement sequence</p>
          </div>
        </div>

        <div className="space-y-4">
          {followUpSteps.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedStrategy === item.step;
            const currentColorClass = colorClasses[item.color];

            return (
              <div
                key={item.step}
                onClick={() => setSelectedStrategy(isSelected ? null : item.step)}
                className={`p-5 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? `${currentColorClass.bg} ${currentColorClass.border}`
                    : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isSelected ? currentColorClass.bg : 'bg-gray-800'
                  } border ${isSelected ? currentColorClass.border : 'border-gray-700'}`}>
                    <Icon className={`w-6 h-6 ${isSelected ? currentColorClass.text : 'text-gray-400'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${isSelected ? currentColorClass.text : 'text-gray-400'}`}>
                          Step {item.step}
                        </span>
                        <h4 className="text-base font-bold text-white">{item.title}</h4>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isSelected ? `${currentColorClass.bg} ${currentColorClass.text} border ${currentColorClass.border}` : 'bg-gray-800 text-gray-400'
                      }`}>
                        {item.timing}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{item.description}</p>
                    
                    {isSelected && (
                      <div className="mt-4 pt-4 border-t border-gray-700">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-xs">
                            <div className="text-gray-400 mb-2">Talking Points:</div>
                            <ul className="space-y-1">
                              {item.step === 1 && (
                                <>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">Current equity: $180K</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">Market appreciation trends</span>
                                  </li>
                                </>
                              )}
                              {item.step === 2 && (
                                <>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">Comparable sales: $420K-$450K</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">ZIP momentum analysis</span>
                                  </li>
                                </>
                              )}
                              {item.step === 3 && (
                                <>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">Free valuation service</span>
                                  </li>
                                  <li className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                    <span className="text-gray-300">Personalized consultation</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                          <div className="text-xs">
                            <div className="text-gray-400 mb-2">Expected Response:</div>
                            <div className="text-gray-300">
                              {item.step === 1 && 'Email open rate ~45%, click rate ~12%'}
                              {item.step === 2 && 'Engagement increase, potential reply'}
                              {item.step === 3 && 'Conversion to consultation ~25%'}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Refi Timing */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
            <Clock className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Refi Timing</h3>
            <p className="text-sm text-gray-400">Refinancing window and monitoring</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Optimal Window</div>
            <div className="text-2xl font-bold text-green-400 mb-1">Q2 2025</div>
            <div className="text-sm text-gray-500">6-9 months from now</div>
          </div>

          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Rate Watch Threshold</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">3.75%</div>
            <div className="text-sm text-gray-500">Target rate for savings</div>
          </div>

          <div className="p-5 bg-purple-500/5 border border-purple-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Estimated Savings</div>
            <div className="text-2xl font-bold text-purple-400 mb-1">$285/mo</div>
            <div className="text-sm text-gray-500">At target rate</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
            <div className="text-sm font-medium text-white mb-4">Current Situation</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Rate</span>
                <span className="text-white font-medium">4.25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Current Payment</span>
                <span className="text-white font-medium">$1,285/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining Balance</span>
                <span className="text-white font-medium">$245,000</span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="text-sm font-medium text-white mb-4">Potential Refi at 3.75%</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">New Rate</span>
                <span className="text-green-400 font-medium">3.75%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">New Payment</span>
                <span className="text-green-400 font-medium">$1,000/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Monthly Savings</span>
                <span className="text-green-400 font-bold">$285/mo</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <div className="text-sm text-gray-300">
              <span className="font-medium text-white">Monitoring Recommendation:</span> Set up automated rate alerts when market rates approach 3.75%. Owner has strong credit (742) and equity position ($180K) for favorable refi terms.
            </div>
          </div>
        </div>
      </div>

      {/* Listing Preparation Window */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
            <AlertCircle className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Listing Preparation Window</h3>
            <p className="text-sm text-gray-400">Property sale timing assessment</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Current Status</div>
            <div className="text-2xl font-bold text-red-400 mb-1">Not Ready</div>
            <div className="text-sm text-gray-500">Medium churn risk</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Churn Risk Level</div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">68%</div>
            <div className="text-sm text-gray-500">Medium</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Re-evaluate Date</div>
            <div className="text-2xl font-bold text-white mb-1">Q3 2025</div>
            <div className="text-sm text-gray-500">Sep-Oct 2025</div>
          </div>

          <div className="p-5 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Prep Actions</div>
            <div className="text-2xl font-bold text-gray-400 mb-1">None</div>
            <div className="text-sm text-gray-500">At this time</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="text-sm font-medium text-white mb-3">Why Not Recommended Now:</div>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                <div className="text-sm text-gray-300">Churn risk is medium (68%) - not yet high enough to warrant immediate listing prep</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                <div className="text-sm text-gray-300">Recent auto loan inquiry suggests potential financial changes - wait for clarity</div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2"></div>
                <div className="text-sm text-gray-300">Refi window (Q2 2025) is more likely scenario than listing at this time</div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="text-sm font-medium text-white mb-3">Monitoring Triggers for Listing:</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                <span className="text-sm text-gray-300">Churn risk increases above 80%</span>
                <span className="text-xs text-gray-500">Currently: 68%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                <span className="text-sm text-gray-300">Intent level reaches 75+</span>
                <span className="text-xs text-gray-500">Currently: 64</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded">
                <span className="text-sm text-gray-300">Online search activity spikes</span>
                <span className="text-xs text-gray-500">Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Summary */}
      <div className="bg-gradient-to-br from-[#00D4D4]/10 to-[#00A8A8]/5 border border-[#00D4D4]/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">📋 Action Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-black/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Immediate Actions (Next 7 Days)</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Send equity awareness email</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Set up rate watch alerts</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-black/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Medium-term (30-90 Days)</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Follow 3-step engagement sequence</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-300">Monitor churn indicators</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}