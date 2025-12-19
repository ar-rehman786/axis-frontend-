"use client"
import React, { useState } from 'react';
import { User, Shield, CheckCircle, AlertTriangle, MapPin, Home, Mail, Phone, Calendar, Edit2, RefreshCw, Download, TrendingUp, X } from 'lucide-react';

interface VerificationItem {
  id: number;
  type: string;
  status: 'Verified' | 'Pending' | 'Failed';
  description: string;
  lastChecked: string;
  source: string;
}

interface RiskMetric {
  id: number;
  type: string;
  level: 'Low' | 'Medium' | 'High';
  score: number;
  percentage: number;
  details: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  bg: string;
  border: string;
}

export default function ProfileTab() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState<VerificationItem | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const [ownerInfo, setOwnerInfo] = useState({
    name: 'John Davidson',
    ownerId: 'OWN-2024-5678',
    property: '123 Oak Street, Raleigh, NC',
    zip: '27609',
    email: 'john.davidson@email.com',
    phone: '+1 (555) 123-4567',
    dateAdded: '2022-06-15'
  });

  const [verificationItems, setVerificationItems] = useState<VerificationItem[]>([
    {
      id: 1,
      type: 'Owner Verification',
      status: 'Verified',
      description: 'Identity confirmed through multiple sources',
      lastChecked: '2024-12-13',
      source: 'Public Records + Credit Bureau'
    },
    {
      id: 2,
      type: 'Contact Integrity',
      status: 'Verified',
      description: 'Phone and email validated',
      lastChecked: '2024-12-13',
      source: 'Email Verification + Phone Ping'
    },
    {
      id: 3,
      type: 'Compliance Status',
      status: 'Verified',
      description: 'All regulatory requirements met',
      lastChecked: '2024-12-13',
      source: 'DNC Registry + TCPA Check'
    }
  ]);

  const [riskMetrics, setRiskMetrics] = useState<RiskMetric[]>([
    {
      id: 1,
      type: 'Credit Risk',
      level: 'Low',
      score: 742,
      percentage: 74,
      details: 'Excellent credit score',
      trend: 'down',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    },
    {
      id: 2,
      type: 'Churn Risk',
      level: 'Medium',
      score: 68,
      percentage: 68,
      details: 'Moderate likelihood to refinance/sell',
      trend: 'up',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20'
    },
    {
      id: 3,
      type: 'Contact Risk',
      level: 'Low',
      score: 100,
      percentage: 100,
      details: 'No contact restrictions',
      trend: 'stable',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20'
    }
  ]);

  const [riskSummary] = useState({
    overallLevel: 'Medium',
    recommendedAction: 'Monitor',
    lastUpdate: '2 days ago',
    nextUpdate: 'Dec 15',
    complianceScore: 95
  });

  const handleRefreshVerifications = () => {
    const updatedVerifications = verificationItems.map(item => ({
      ...item,
      lastChecked: new Date().toISOString().split('T')[0]
    }));
    setVerificationItems(updatedVerifications);
    alert('Verification status refreshed successfully!');
  };

  const handleEditOwnerInfo = () => {
    setShowEditModal(true);
  };

  const handleSaveOwnerInfo = () => {
    setShowEditModal(false);
    alert('Owner information updated successfully!');
  };

  const handleViewVerificationDetails = (verification: VerificationItem) => {
    setSelectedVerification(verification);
    setShowVerificationModal(true);
  };

  const handleExportProfile = () => {
    const profileData = {
      owner: ownerInfo,
      verifications: verificationItems,
      risks: riskMetrics,
      summary: riskSummary
    };
    console.log('Exporting profile:', profileData);
    alert('Profile exported successfully!');
  };

  const getRiskIcon = (level: string) => {
    if (level === 'Low') return '🟢';
    if (level === 'Medium') return '🟡';
    return '🔴';
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  return (
    <div className="space-y-6">
      {/* Section Title with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Owner Identity & Risk</h2>
          <p className="text-sm text-gray-400">Verification status and risk assessment</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefreshVerifications}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2 border border-gray-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExportProfile}
            className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Identity Card */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#00D4D4]/10 rounded-full flex items-center justify-center border border-[#00D4D4]/30">
              <User className="w-6 h-6 text-[#00D4D4]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Owner Information</h3>
              <p className="text-sm text-gray-400">Verified identity details</p>
            </div>
          </div>
          <button
            onClick={handleEditOwnerInfo}
            className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2 border border-gray-700"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-xs text-gray-400 mb-1">Owner Name</div>
            <div className="text-lg font-bold text-white">{ownerInfo.name}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Owner ID</div>
            <div className="text-lg font-bold text-[#00D4D4]">{ownerInfo.ownerId}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
              <Home className="w-3 h-3" />
              Property Address
            </div>
            <div className="text-base font-medium text-white">{ownerInfo.property}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1 flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              ZIP Code
            </div>
            <div className="text-base font-medium text-white">{ownerInfo.zip}</div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-3 gap-4">
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-gray-400" />
              <div className="text-xs text-gray-400">Email</div>
            </div>
            <div className="text-sm font-medium text-white">{ownerInfo.email}</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Phone className="w-4 h-4 text-gray-400" />
              <div className="text-xs text-gray-400">Phone</div>
            </div>
            <div className="text-sm font-medium text-white">{ownerInfo.phone}</div>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div className="text-xs text-gray-400">Added</div>
            </div>
            <div className="text-sm font-medium text-white">{new Date(ownerInfo.dateAdded).toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Verification Status</h3>
              <p className="text-sm text-gray-400">Identity and compliance checks</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#00D4D4] focus:ring-[#00D4D4]"
              />
              Auto-refresh
            </label>
          </div>
        </div>

        <div className="space-y-4">
          {verificationItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-green-500/5 border border-green-500/20 rounded-lg hover:border-green-500/40 transition-all cursor-pointer"
              onClick={() => handleViewVerificationDetails(item)}
            >
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{item.type}</div>
                  <div className="text-xs text-gray-400">{item.description}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="text-xs text-gray-500">
                      Last checked: {new Date(item.lastChecked).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500">•</div>
                    <div className="text-xs text-gray-500">Source: {item.source}</div>
                  </div>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                ✅ {item.status}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">All verification checks passed</span>
            </div>
            <span className="text-sm font-bold text-green-400">100% Complete</span>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/30">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Risk Assessment</h3>
            <p className="text-sm text-gray-400">Current risk indicators</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {riskMetrics.map((risk) => (
            <div key={risk.id} className={`p-5 border rounded-lg ${risk.bg} ${risk.border} hover:border-[#00D4D4]/30 transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-gray-400">{risk.type}</div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">{getTrendIcon(risk.trend)}</span>
                  <span className={`text-xs font-medium ${
                    risk.trend === 'up' ? 'text-red-400' : 
                    risk.trend === 'down' ? 'text-green-400' : 
                    'text-gray-400'
                  }`}>
                    {risk.trend === 'up' ? 'Rising' : risk.trend === 'down' ? 'Falling' : 'Stable'}
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <span className={`text-2xl font-bold ${risk.color}`}>{getRiskIcon(risk.level)} {risk.level}</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-gray-400">
                  Score: <span className="text-white font-medium">{risk.score}</span>
                </div>
                <div className="text-xs text-gray-400">
                  {risk.details}
                </div>
              </div>
              <div className="mt-3 bg-gray-800 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    risk.level === 'Low' ? 'bg-green-400' : 
                    risk.level === 'Medium' ? 'bg-yellow-400' : 
                    'bg-red-400'
                  }`}
                  style={{ width: `${risk.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Risk History Chart */}
        <div className="mt-6 p-5 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="text-sm font-medium text-white mb-4">Risk Trend (Last 6 Months)</div>
          <div className="flex items-end justify-between h-32 gap-2">
            {[52, 54, 58, 62, 65, 68].map((value, idx) => {
              const percentage = (value / 100) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative" style={{ height: `${percentage}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t transition-all group-hover:from-yellow-300 group-hover:to-yellow-400"></div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white whitespace-nowrap">
                        {value}%
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 font-medium">
                    {['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][idx]}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-xs text-gray-400 text-center">
            Churn risk showing gradual increase over past 6 months
          </div>
        </div>
      </div>

      {/* Risk Summary */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Risk Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Overall Risk Level</div>
            <div className="text-xl font-bold text-yellow-400">{riskSummary.overallLevel}</div>
            <div className="text-xs text-gray-500 mt-1">Primarily due to churn indicators</div>
          </div>
          <div className="p-4 bg-[#00D4D4]/5 border border-[#00D4D4]/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Recommended Action</div>
            <div className="text-xl font-bold text-[#00D4D4]">{riskSummary.recommendedAction}</div>
            <div className="text-xs text-gray-500 mt-1">Weekly check-ins advised</div>
          </div>
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Last Risk Update</div>
            <div className="text-xl font-bold text-white">{riskSummary.lastUpdate}</div>
            <div className="text-xs text-gray-500 mt-1">Next update: {riskSummary.nextUpdate}</div>
          </div>
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="text-xs text-gray-400 mb-2">Compliance Score</div>
            <div className="text-xl font-bold text-green-400">{riskSummary.complianceScore}/100</div>
            <div className="text-xs text-gray-500 mt-1">All checks passed</div>
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Strong Verification Status</div>
                <div className="text-xs text-gray-400">All identity and compliance checks passed. Owner is fully verified with no red flags.</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Monitor Churn Indicators</div>
                <div className="text-xs text-gray-400">Churn risk at 68% requires active monitoring. Recent behavior changes suggest potential refinancing or selling activity.</div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
              <div>
                <div className="text-sm font-medium text-white mb-1">Excellent Credit Profile</div>
                <div className="text-xs text-gray-400">Credit score of 742 indicates low credit risk. Owner maintains strong financial discipline.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Owner Info Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Owner Information</h2>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Owner Name</label>
                  <input
                    type="text"
                    value={ownerInfo.name}
                    onChange={(e) => setOwnerInfo({...ownerInfo, name: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Owner ID</label>
                  <input
                    type="text"
                    value={ownerInfo.ownerId}
                    disabled
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Property Address</label>
                <input
                  type="text"
                  value={ownerInfo.property}
                  onChange={(e) => setOwnerInfo({...ownerInfo, property: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">ZIP Code</label>
                  <input
                    type="text"
                    value={ownerInfo.zip}
                    onChange={(e) => setOwnerInfo({...ownerInfo, zip: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email</label>
                  <input
                    type="email"
                    value={ownerInfo.email}
                    onChange={(e) => setOwnerInfo({...ownerInfo, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    value={ownerInfo.phone}
                    onChange={(e) => setOwnerInfo({...ownerInfo, phone: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveOwnerInfo}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Details Modal */}
      {showVerificationModal && selectedVerification && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Verification Details</h2>
              <button onClick={() => setShowVerificationModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center border border-green-500/30">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{selectedVerification.type}</h3>
                  <p className="text-gray-400">{selectedVerification.description}</p>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold border border-green-500/30">
                  ✅ {selectedVerification.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Verification Source</div>
                  <div className="text-sm font-medium text-white">{selectedVerification.source}</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-xs text-gray-400 mb-2">Last Checked</div>
                  <div className="text-sm font-medium text-white">
                    {new Date(selectedVerification.lastChecked).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="text-sm font-medium text-white mb-2">Verification History</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Initial verification</span>
                    <span className="text-white">Jun 15, 2022</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Last refresh</span>
                    <span className="text-white">{new Date(selectedVerification.lastChecked).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Status</span>
                    <span className="text-green-400 font-medium">All checks passed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={() => setShowVerificationModal(false)}
                  className="w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}