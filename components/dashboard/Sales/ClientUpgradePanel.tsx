import React, { useState, useEffect } from 'react';
import { TrendingUp, Filter, Search, ChevronRight, CheckCircle, Clock, XCircle, DollarSign, Users } from 'lucide-react';

export default function ClientUpgradePanel() {
  const [selectedTier, setSelectedTier] = useState<'all' | 'Brokerage' | 'Lender Pro' | 'Institutional'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected'>('all');
  const [selectedQuarter, setSelectedQuarter] = useState<'all' | 'Q4-2025' | 'Q1-2026' | 'Q2-2026'>('Q4-2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  // Upgrade Statistics
  const upgradeStats: {
    totalOpportunities: number;
    pendingReview: number;
    approved: number;
    inProgress: number;
    completed: number;
    rejected: number;
    totalRevenue: number;
    avgDealSize: number;
    conversionRate: number;
  } = {
    totalOpportunities: 847,
    pendingReview: 234,
    approved: 156,
    inProgress: 89,
    completed: 312,
    rejected: 56,
    totalRevenue: 2847000,
    avgDealSize: 8945,
    conversionRate: 68
  };

  // Client Upgrade Opportunities
  const upgradeOpportunities: Array<{
    id: number;
    clientName: string;
    currentTier: string;
    targetTier: string;
    status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
    priority: 'high' | 'medium' | 'low';
    requestDate: string;
    potentialRevenue: number;
    currentSpend: number;
    uplift: number;
    contact: string;
    email: string;
    phone: string;
    reason: string;
    quarter: string;
    probability: number;
  }> = [
    {
      id: 1,
      clientName: 'Coastal Lending Group',
      currentTier: 'Brokerage',
      targetTier: 'Lender Pro',
      status: 'pending',
      priority: 'high',
      requestDate: '2024-12-01',
      potentialRevenue: 9588,
      currentSpend: 3588,
      uplift: 6000,
      contact: 'Sarah Mitchell',
      email: 'sarah@coastallending.com',
      phone: '(555) 123-4567',
      reason: 'Need advanced analytics and more user seats',
      quarter: 'Q4-2025',
      probability: 85
    },
    {
      id: 2,
      clientName: 'Summit Financial Services',
      currentTier: 'Lender Pro',
      targetTier: 'Institutional',
      status: 'approved',
      priority: 'high',
      requestDate: '2024-11-28',
      potentialRevenue: 45000,
      currentSpend: 9588,
      uplift: 35412,
      contact: 'Michael Chen',
      email: 'mchen@summitfs.com',
      phone: '(555) 234-5678',
      reason: 'Enterprise features and unlimited API access',
      quarter: 'Q4-2025',
      probability: 92
    },
    {
      id: 3,
      clientName: 'Metro Mortgage Partners',
      currentTier: 'Brokerage',
      targetTier: 'Lender Pro',
      status: 'in-progress',
      priority: 'medium',
      requestDate: '2024-12-03',
      potentialRevenue: 9588,
      currentSpend: 3588,
      uplift: 6000,
      contact: 'Jennifer Rodriguez',
      email: 'jrodriguez@metromortgage.com',
      phone: '(555) 345-6789',
      reason: 'Team growth requires more user seats',
      quarter: 'Q4-2025',
      probability: 72
    },
    {
      id: 4,
      clientName: 'Prime Rate Solutions',
      currentTier: 'Lender Pro',
      targetTier: 'Institutional',
      status: 'pending',
      priority: 'high',
      requestDate: '2024-12-05',
      potentialRevenue: 45000,
      currentSpend: 9588,
      uplift: 35412,
      contact: 'David Park',
      email: 'dpark@primerate.com',
      phone: '(555) 456-7890',
      reason: 'White-label requirements and custom integrations',
      quarter: 'Q1-2026',
      probability: 78
    },
    {
      id: 5,
      clientName: 'Gateway Lending Corp',
      currentTier: 'Brokerage',
      targetTier: 'Lender Pro',
      status: 'completed',
      priority: 'low',
      requestDate: '2024-11-15',
      potentialRevenue: 9588,
      currentSpend: 3588,
      uplift: 6000,
      contact: 'Lisa Thompson',
      email: 'lthompson@gatewaylending.com',
      phone: '(555) 567-8901',
      reason: 'Access to advanced refi prediction tools',
      quarter: 'Q4-2025',
      probability: 100
    }
  ];

  // Animate stats
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setAnimatedStats(prev => {
//         const newStats = {};
//         Object.keys(upgradeStats).forEach(key => {
//           const target = upgradeStats[key];
//           const current = prev[key] || 0;
//           newStats[key] = current < target ? Math.min(current + Math.ceil(target / 20), target) : target;
//         });
//         return newStats;
//       });
//     }, 50);
//     return () => clearInterval(timer);
//   }, []);

useEffect(() => {
  const timer = setInterval(() => {
    setAnimatedStats(prev => {
      const newStats: Record<string, number> = {};

      Object.keys(upgradeStats).forEach((key: string) => {
        const target = upgradeStats[key as keyof typeof upgradeStats] as number;
        const current = (prev as Record<string, number>)[key] || 0;

        newStats[key] =
          current < target
            ? Math.min(current + Math.ceil(target / 20), target)
            : target;
      });

      return newStats;
    });
  }, 50);

  return () => clearInterval(timer);
}, []);


//   const getStatusBadge = (status) => {
//     const badges = {
//       pending: { icon: Clock, bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'Pending Review' },
//       approved: { icon: CheckCircle, bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Approved' },
//       'in-progress': { icon: TrendingUp, bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'In Progress' },
//       completed: { icon: CheckCircle, bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Completed' },
//       rejected: { icon: XCircle, bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Rejected' }
//     };
//     return badges[status];
//   };

const getStatusBadge = (
  status: "pending" | "approved" | "in-progress" | "completed" | "rejected"
) => {
  const badges: Record<
    "pending" | "approved" | "in-progress" | "completed" | "rejected",
    {
      icon: any;
      bg: string;
      text: string;
      border: string;
      label: string;
    }
  > = {
    pending: {
      icon: Clock,
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
      label: "Pending Review",
    },
    approved: {
      icon: CheckCircle,
      bg: "bg-teal-500/10",
      text: "text-teal-400",
      border: "border-teal-500/30",
      label: "Approved",
    },
    "in-progress": {
      icon: TrendingUp,
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
      label: "In Progress",
    },
    completed: {
      icon: CheckCircle,
      bg: "bg-teal-500/10",
      text: "text-teal-400",
      border: "border-teal-500/30",
      label: "Completed",
    },
    rejected: {
      icon: XCircle,
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
      label: "Rejected",
    },
  };

  return badges[status];
};


//   const getPriorityBadge = (priority) => {
//     const badges = {
//       high: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
//       medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
//       low: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' }
//     };
//     return badges[priority];
//   };

const getPriorityBadge = (priority: "high" | "medium" | "low") => {
  const badges: Record<
    "high" | "medium" | "low",
    { bg: string; text: string; border: string }
  > = {
    high: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/30",
    },
    medium: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      border: "border-yellow-500/30",
    },
    low: {
      bg: "bg-teal-500/10",
      text: "text-teal-400",
      border: "border-teal-500/30",
    },
  };

  return badges[priority];
};

  const filteredOpportunities = upgradeOpportunities.filter((opp: {
    id: number;
    clientName: string;
    currentTier: string;
    targetTier: string;
    status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
    priority: 'high' | 'medium' | 'low';
    requestDate: string;
    potentialRevenue: number;
    currentSpend: number;
    uplift: number;
    contact: string;
    email: string;
    phone: string;
    reason: string;
    quarter: string;
    probability: number;
  }) => {
    const matchesTier = selectedTier === 'all' || opp.targetTier === selectedTier;
    const matchesStatus = selectedStatus === 'all' || opp.status === selectedStatus;
    const matchesQuarter = selectedQuarter === 'all' || opp.quarter === selectedQuarter;
    const matchesSearch = searchQuery === '' || 
      opp.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesStatus && matchesQuarter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📈 Client Upgrade Pipeline</h1>
          <p className="text-gray-400">Track and manage tier upgrade opportunities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Opportunities</div>
            <div className="text-3xl font-bold text-white">{animatedStats.totalOpportunities  || 0}</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Pending Review</div>
            <div className="text-3xl font-bold text-yellow-400">{animatedStats.pendingReview || 0}</div>
            <div className="text-xs text-gray-500 mt-1">Awaiting approval</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">In Progress</div>
            <div className="text-3xl font-bold text-blue-400">{animatedStats.inProgress || 0}</div>
            <div className="text-xs text-gray-500 mt-1">Active upgrades</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Revenue</div>
            <div className="text-3xl font-bold text-red-400">${((animatedStats.totalRevenue || 0) / 1000).toFixed(0)}k</div>
            <div className="text-xs text-gray-500 mt-1">From upgrades</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Conversion Rate</div>
            <div className="text-3xl font-bold text-purple-400">{animatedStats.conversionRate || 0}%</div>
            <div className="text-xs text-gray-500 mt-1">Success rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients or contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#19F6FF]" />
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value as 'all' | 'Brokerage' | 'Lender Pro' | 'Institutional')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Tiers</option>
                <option value="Brokerage">Brokerage</option>
                <option value="Lender Pro">Lender Pro</option>
                <option value="Institutional">Institutional</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>

              <select
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value as 'all' | 'Q4-2025' | 'Q1-2026' | 'Q2-2026')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Quarters</option>
                <option value="Q4-2025">Q4 2025</option>
                <option value="Q1-2026">Q1 2026</option>
                <option value="Q2-2026">Q2 2026</option>
              </select>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">Upgrade Opportunities ({filteredOpportunities.length})</h3>
          </div>

          {filteredOpportunities.map((opp: {
        id: number;
        clientName: string;
        currentTier: string;
        targetTier: string;
        status: 'pending' | 'approved' | 'in-progress' | 'completed' | 'rejected';
        priority: 'high' | 'medium' | 'low';
        requestDate: string;
        potentialRevenue: number;
        currentSpend: number;
        uplift: number;
        contact: string;
        email: string;
        phone: string;
        reason: string;
        quarter: string;
        probability: number;
      }) => {
            const statusBadge = getStatusBadge(opp.status as any);
            const priorityBadge = getPriorityBadge(opp.priority as any);
            const StatusIcon = statusBadge.icon;
            
            return (
              <div key={opp.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#19F6FF] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-bold text-white">{opp.clientName}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusBadge.label}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityBadge.bg} ${priorityBadge.text} ${priorityBadge.border} uppercase`}>
                        {opp.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{opp.currentTier} → {opp.targetTier}</span>
                      <span>•</span>
                      <span>Requested: {opp.requestDate}</span>
                      <span>•</span>
                      <span>Q: {opp.quarter}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-400 mb-1">${opp.potentialRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Potential ARR</div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 mb-4">
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Current Spend</div>
                    <div className="text-sm font-bold text-white">${opp.currentSpend.toLocaleString()}</div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Uplift</div>
                    <div className="text-sm font-bold text-red-400">+${opp.uplift.toLocaleString()}</div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="text-xs text-gray-400 mb-1">Probability</div>
                    <div className="text-sm font-bold text-white">{opp.probability}%</div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-lg col-span-3">
                    <div className="text-xs text-gray-400 mb-1">Contact</div>
                    <div className="text-sm font-medium text-white">{opp.contact}</div>
                    <div className="text-xs text-gray-500">{opp.email}</div>
                  </div>
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg mb-4">
                  <div className="text-xs text-gray-400 mb-1">Reason for Upgrade:</div>
                  <div className="text-sm text-white">{opp.reason}</div>
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center gap-2">
                    Review Details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {opp.status === 'pending' && (
                    <>
                      <button className="px-4 py-2 bg-teal-500/20 text-teal-400 border border-teal-500/30 rounded-lg hover:bg-teal-500/30 transition-colors font-medium text-sm">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors font-medium text-sm">
                        Reject
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                    Contact Client
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export Pipeline Report
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Schedule Review Meeting
          </button>
        </div>
      </div>
    </div>
  );
}