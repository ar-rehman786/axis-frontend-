import React, { useState } from 'react';
import { Target, MapPin, TrendingUp, AlertCircle, Filter, Search, Plus, X, User, DollarSign, Calendar, ChevronDown, CheckCircle, Clock } from 'lucide-react';

interface Opportunity {
  id: number;
  type: 'Equity Alert' | 'Refi Ready' | 'Churn Risk' | 'Market Shift' | 'New Lead';
  owner: string;
  ownerEmail: string;
  zip: string;
  equity: number;
  priority: 'High' | 'Medium' | 'Low';
  agent: string;
  status: 'Open' | 'Assigned' | 'In Progress' | 'Closed' | 'Lost';
  createdDate: string;
  lastContact: string;
  estimatedValue: number;
  notes: string;
  color: string;
  bg: string;
  border: string;
}

interface ZIPOpportunity {
  zip: string;
  count: number;
  avgEquity: string;
  momentum: 'High' | 'Stable' | 'Cooling';
  status: 'Hot' | 'Warm' | 'Cold';
  trend: string;
}

export default function OpportunitiesTab() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    {
      id: 1,
      type: 'Equity Alert',
      owner: 'Owner X123',
      ownerEmail: 'owner.x123@email.com',
      zip: '27609',
      equity: 325000,
      priority: 'High',
      agent: 'Unassigned',
      status: 'Open',
      createdDate: '2024-12-10',
      lastContact: 'Never',
      estimatedValue: 450000,
      notes: 'High equity homeowner, potential quick sale',
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30'
    },
    {
      id: 2,
      type: 'Refi Ready',
      owner: 'Owner Y456',
      ownerEmail: 'owner.y456@email.com',
      zip: '27613',
      equity: 285000,
      priority: 'Medium',
      agent: 'John D.',
      status: 'Assigned',
      createdDate: '2024-12-09',
      lastContact: '2024-12-11',
      estimatedValue: 380000,
      notes: 'Prime borrower, 18-month window',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30'
    },
    {
      id: 3,
      type: 'Churn Risk',
      owner: 'Owner Z789',
      ownerEmail: 'owner.z789@email.com',
      zip: '27601',
      equity: 412000,
      priority: 'High',
      agent: 'Sarah M.',
      status: 'In Progress',
      createdDate: '2024-12-08',
      lastContact: '2024-12-12',
      estimatedValue: 520000,
      notes: 'High LTV, behavior shift detected',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30'
    },
    {
      id: 4,
      type: 'Market Shift',
      owner: 'Owner A234',
      ownerEmail: 'owner.a234@email.com',
      zip: '27609',
      equity: 195000,
      priority: 'Low',
      agent: 'Mike R.',
      status: 'Assigned',
      createdDate: '2024-12-07',
      lastContact: '2024-12-10',
      estimatedValue: 275000,
      notes: 'Market momentum increasing in area',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30'
    },
    {
      id: 5,
      type: 'New Lead',
      owner: 'Owner B567',
      ownerEmail: 'owner.b567@email.com',
      zip: '27613',
      equity: 340000,
      priority: 'Medium',
      agent: 'Unassigned',
      status: 'Open',
      createdDate: '2024-12-11',
      lastContact: 'Never',
      estimatedValue: 425000,
      notes: 'New lead from marketing campaign',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30'
    }
  ]);

  const [zipOpportunities] = useState<ZIPOpportunity[]>([
    { zip: '27609', count: 342, avgEquity: '$285K', momentum: 'High', status: 'Hot', trend: '↑' },
    { zip: '27613', count: 198, avgEquity: '$412K', momentum: 'Stable', status: 'Warm', trend: '→' },
    { zip: '27601', count: 156, avgEquity: '$345K', momentum: 'Cooling', status: 'Cold', trend: '↓' }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterZIP, setFilterZIP] = useState<string>('all');

  const [formData, setFormData] = useState({
    type: 'New Lead' as Opportunity['type'],
    owner: '',
    ownerEmail: '',
    zip: '',
    equity: 0,
    priority: 'Medium' as Opportunity['priority'],
    estimatedValue: 0,
    notes: ''
  });

  const agents = ['Unassigned', 'John D.', 'Sarah M.', 'Mike R.', 'Lisa K.'];

  // Calculate stats
  const highPriorityCount = opportunities.filter(o => o.priority === 'High' && o.status !== 'Closed').length;
  const refiReadyCount = opportunities.filter(o => o.type === 'Refi Ready' && o.status !== 'Closed').length;
  const equityRichCount = opportunities.filter(o => o.equity > 300000 && o.status !== 'Closed').length;
  const activeZIPsCount = [...new Set(opportunities.map(o => o.zip))].length;
  const openOpportunitiesCount = opportunities.filter(o => o.status === 'Open').length;
  const totalEstimatedValue = opportunities
    .filter(o => o.status !== 'Closed' && o.status !== 'Lost')
    .reduce((sum, o) => sum + o.estimatedValue, 0);

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opp.zip.includes(searchQuery);
    const matchesType = filterType === 'all' || opp.type === filterType;
    const matchesPriority = filterPriority === 'all' || opp.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || opp.status === filterStatus;
    const matchesZIP = filterZIP === 'all' || opp.zip === filterZIP;
    
    return matchesSearch && matchesType && matchesPriority && matchesStatus && matchesZIP;
  });

  const handleAddOpportunity = () => {
    const typeColors: Record<string, { color: string; bg: string; border: string }> = {
      'Equity Alert': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
      'Refi Ready': { color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' },
      'Churn Risk': { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
      'Market Shift': { color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
      'New Lead': { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' }
    };

    const colors = typeColors[formData.type];

    const newOpportunity: Opportunity = {
      id: opportunities.length + 1,
      type: formData.type,
      owner: formData.owner,
      ownerEmail: formData.ownerEmail,
      zip: formData.zip,
      equity: formData.equity,
      priority: formData.priority,
      agent: 'Unassigned',
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0],
      lastContact: 'Never',
      estimatedValue: formData.estimatedValue,
      notes: formData.notes,
      ...colors
    };

    setOpportunities([...opportunities, newOpportunity]);
    setShowAddModal(false);
    setFormData({
      type: 'New Lead',
      owner: '',
      ownerEmail: '',
      zip: '',
      equity: 0,
      priority: 'Medium',
      estimatedValue: 0,
      notes: ''
    });
    alert('Opportunity added successfully!');
  };

  const handleAssignAgent = (oppId: number, agent: string) => {
    setOpportunities(opportunities.map(opp =>
      opp.id === oppId
        ? { ...opp, agent, status: agent === 'Unassigned' ? 'Open' : 'Assigned' }
        : opp
    ));
    alert(`Opportunity ${agent === 'Unassigned' ? 'unassigned' : `assigned to ${agent}`}!`);
  };

  const handleUpdateStatus = (oppId: number, status: Opportunity['status']) => {
    setOpportunities(opportunities.map(opp =>
      opp.id === oppId ? { ...opp, status } : opp
    ));
    alert(`Status updated to ${status}!`);
  };

  const openDetailsModal = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setShowDetailsModal(true);
  };

  const getPriorityBadge = (priority: string) => {
    const badges: Record<string, { bg: string; text: string; border: string }> = {
      High: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' },
      Medium: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      Low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' }
    };
    return badges[priority];
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; border: string }> = {
      Open: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
      Assigned: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
      'In Progress': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
      Closed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
      Lost: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
    };
    return badges[status];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Market Opportunities</h2>
          <p className="text-sm text-gray-400 mt-1">Track and manage leads across all markets</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Opportunity
        </button>
      </div>

      {/* Opportunity Stats */}
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div className="text-xs text-gray-400">High Priority</div>
          </div>
          <div className="text-2xl font-bold text-white">{highPriorityCount}</div>
          <div className="text-xs text-gray-500 mt-1">Active</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Refi Ready</div>
          </div>
          <div className="text-2xl font-bold text-white">{refiReadyCount}</div>
          <div className="text-xs text-gray-500 mt-1">Opportunities</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <div className="text-xs text-gray-400">Equity Rich</div>
          </div>
          <div className="text-2xl font-bold text-white">{equityRichCount}</div>
          <div className="text-xs text-gray-500 mt-1">&gt;$300K equity</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-purple-400" />
            <div className="text-xs text-gray-400">Active ZIPs</div>
          </div>
          <div className="text-2xl font-bold text-white">{activeZIPsCount}</div>
          <div className="text-xs text-gray-500 mt-1">Markets</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <div className="text-xs text-gray-400">Open</div>
          </div>
          <div className="text-2xl font-bold text-white">{openOpportunitiesCount}</div>
          <div className="text-xs text-gray-500 mt-1">Unassigned</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Est. Value</div>
          </div>
          <div className="text-2xl font-bold text-white">${(totalEstimatedValue / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-gray-500 mt-1">Pipeline</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search by owner, email, or ZIP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Types</option>
          <option value="Equity Alert">Equity Alert</option>
          <option value="Refi Ready">Refi Ready</option>
          <option value="Churn Risk">Churn Risk</option>
          <option value="Market Shift">Market Shift</option>
          <option value="New Lead">New Lead</option>
        </select>
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Status</option>
          <option value="Open">Open</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
          <option value="Lost">Lost</option>
        </select>
        <select
          value={filterZIP}
          onChange={(e) => setFilterZIP(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All ZIPs</option>
          {zipOpportunities.map(zip => (
            <option key={zip.zip} value={zip.zip}>{zip.zip}</option>
          ))}
        </select>
      </div>

      {/* Active Opportunities */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Active Opportunities ({filteredOpportunities.length})</h3>
        <div className="space-y-3">
          {filteredOpportunities.map((opp) => {
            const priorityBadge = getPriorityBadge(opp.priority);
            const statusBadge = getStatusBadge(opp.status);

            return (
              <div key={opp.id} className={`p-4 border ${opp.border} ${opp.bg} rounded-lg hover:border-[#00D4D4]/30 transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-10 h-10 ${opp.bg} rounded-lg flex items-center justify-center border ${opp.border}`}>
                      <Target className={`w-5 h-5 ${opp.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-bold ${opp.color}`}>{opp.type}</span>
                        <span className="text-sm text-gray-400">•</span>
                        <span className="text-sm text-gray-400">{opp.owner}</span>
                      </div>
                      <div className="text-xs text-gray-500">{opp.ownerEmail}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityBadge.bg} ${priorityBadge.text} ${priorityBadge.border}`}>
                      {opp.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                      {opp.status}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-4 text-sm mb-3">
                  <div>
                    <span className="text-gray-400">ZIP: </span>
                    <span className="text-white font-medium">{opp.zip}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Equity: </span>
                    <span className="text-white font-medium">${(opp.equity / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Est. Value: </span>
                    <span className="text-green-400 font-medium">${(opp.estimatedValue / 1000).toFixed(0)}K</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Created: </span>
                    <span className="text-white font-medium">{new Date(opp.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Contact: </span>
                    <span className="text-white font-medium">{opp.lastContact === 'Never' ? 'Never' : new Date(opp.lastContact).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Agent: </span>
                    <span className={`font-medium ${opp.agent === 'Unassigned' ? 'text-red-400' : 'text-[#00D4D4]'}`}>
                      {opp.agent}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={opp.agent}
                    onChange={(e) => handleAssignAgent(opp.id, e.target.value)}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                  >
                    {agents.map(agent => (
                      <option key={agent} value={agent}>{agent}</option>
                    ))}
                  </select>
                  <select
                    value={opp.status}
                    onChange={(e) => handleUpdateStatus(opp.id, e.target.value as Opportunity['status'])}
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                  >
                    <option value="Open">Open</option>
                    <option value="Assigned">Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                    <option value="Lost">Lost</option>
                  </select>
                  <button
                    onClick={() => openDetailsModal(opp)}
                    className="px-4 py-2 bg-[#00D4D4] text-black rounded hover:bg-[#00BCC9] transition-colors text-sm font-medium"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}

          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No opportunities found matching your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* ZIP Code Opportunities */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-gray-800">
          <h3 className="text-lg font-bold text-white">ZIP Code Opportunities</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">ZIP</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Count</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Avg Equity</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Momentum</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {zipOpportunities.map((item) => (
              <tr key={item.zip} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{item.zip}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{item.count}</td>
                <td className="px-6 py-4 text-sm text-gray-300">{item.avgEquity}</td>
                <td className="px-6 py-4 text-sm text-[#00D4D4]">{item.trend} {item.momentum}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Hot' ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
                    item.status === 'Warm' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30' :
                    'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add New Opportunity</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as Opportunity['type']})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="Equity Alert">Equity Alert</option>
                    <option value="Refi Ready">Refi Ready</option>
                    <option value="Churn Risk">Churn Risk</option>
                    <option value="Market Shift">Market Shift</option>
                    <option value="New Lead">New Lead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as Opportunity['priority']})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Owner Name *</label>
                <input
                  type="text"
                  required
                  value={formData.owner}
                  onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="Owner X123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Owner Email *</label>
                <input
                  type="email"
                  required
                  value={formData.ownerEmail}
                  onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="owner@email.com"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({...formData, zip: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="27609"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Equity ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.equity}
                    onChange={(e) => setFormData({...formData, equity: parseInt(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="325000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Est. Value ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({...formData, estimatedValue: parseInt(e.target.value)})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="450000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white resize-none"
                  placeholder="Additional information about this opportunity..."
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOpportunity}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Add Opportunity
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-3xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Opportunity Details</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 ${selectedOpportunity.bg} rounded-xl flex items-center justify-center border ${selectedOpportunity.border}`}>
                  <Target className={`w-8 h-8 ${selectedOpportunity.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${selectedOpportunity.color} mb-1`}>{selectedOpportunity.type}</h3>
                  <p className="text-gray-400">{selectedOpportunity.owner}</p>
                  <p className="text-sm text-gray-500">{selectedOpportunity.ownerEmail}</p>
                </div>
                <div className="flex gap-2">
                  {(() => {
                    const priorityBadge = getPriorityBadge(selectedOpportunity.priority);
                    const statusBadge = getStatusBadge(selectedOpportunity.status);
                    return (
                      <>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityBadge.bg} ${priorityBadge.text} ${priorityBadge.border}`}>
                          {selectedOpportunity.priority} Priority
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                          {selectedOpportunity.status}
                        </span>
                      </>
                    );
                  })()}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">ZIP Code</div>
                    <div className="text-lg font-bold text-white">{selectedOpportunity.zip}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Equity</div>
                    <div className="text-lg font-bold text-white">${selectedOpportunity.equity.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Estimated Value</div>
                    <div className="text-lg font-bold text-green-400">${selectedOpportunity.estimatedValue.toLocaleString()}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Assigned Agent</div>
                    <div className={`text-lg font-bold ${selectedOpportunity.agent === 'Unassigned' ? 'text-red-400' : 'text-[#00D4D4]'}`}>
                      {selectedOpportunity.agent}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Created Date</div>
                    <div className="text-lg font-bold text-white">{new Date(selectedOpportunity.createdDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Last Contact</div>
                    <div className="text-lg font-bold text-white">
                      {selectedOpportunity.lastContact === 'Never' ? 'Never' : new Date(selectedOpportunity.lastContact).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {selectedOpportunity.notes && (
                <div>
                  <div className="text-sm text-gray-400 mb-2">Notes</div>
                  <div className="p-4 bg-gray-800/50 rounded-lg text-gray-300">{selectedOpportunity.notes}</div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-800">
                <button
                  onClick={() => setShowDetailsModal(false)}
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