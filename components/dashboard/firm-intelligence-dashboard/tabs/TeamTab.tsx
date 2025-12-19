import React, { useState } from 'react';
import { Users, TrendingUp, Award, Target, Plus, Edit2, Trash2, X, Mail, Phone, Calendar, DollarSign, BarChart3 } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  deals: number;
  pipeline: number;
  score: number;
  tier: string;
  revenue: number;
  joinDate: string;
  status: 'active' | 'inactive';
  color: string;
  bg: string;
  border: string;
  avatar?: string;
}

export default function TeamTab() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { 
      id: 1,
      name: 'John Davidson', 
      email: 'john.d@abcrealty.com',
      phone: '+1 (555) 123-4567',
      role: 'Senior Agent',
      deals: 12, 
      pipeline: 23,
      score: 92, 
      tier: 'Platinum',
      revenue: 2400000,
      joinDate: '2022-01-15',
      status: 'active',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30'
    },
    { 
      id: 2,
      name: 'Sarah Martinez', 
      email: 'sarah.m@abcrealty.com',
      phone: '+1 (555) 234-5678',
      role: 'Agent',
      deals: 8, 
      pipeline: 18,
      score: 78, 
      tier: 'Gold',
      revenue: 1600000,
      joinDate: '2022-06-20',
      status: 'active',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30'
    },
    { 
      id: 3,
      name: 'Mike Richardson', 
      email: 'mike.r@abcrealty.com',
      phone: '+1 (555) 345-6789',
      role: 'Agent',
      deals: 5, 
      pipeline: 12,
      score: 64, 
      tier: 'Silver',
      revenue: 1000000,
      joinDate: '2023-03-10',
      status: 'active',
      color: 'text-gray-400',
      bg: 'bg-gray-500/10',
      border: 'border-gray-500/30'
    },
    { 
      id: 4,
      name: 'Lisa Kim', 
      email: 'lisa.k@abcrealty.com',
      phone: '+1 (555) 456-7890',
      role: 'Junior Agent',
      deals: 3, 
      pipeline: 8,
      score: 52, 
      tier: 'Bronze',
      revenue: 600000,
      joinDate: '2023-09-05',
      status: 'active',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'score' | 'deals' | 'revenue'>('score');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Agent',
    joinDate: new Date().toISOString().split('T')[0]
  });

  // Calculate stats
  const totalAgents = teamMembers.filter(m => m.status === 'active').length;
  const totalDeals = teamMembers.reduce((sum, m) => sum + m.deals, 0);
  const totalPipeline = teamMembers.reduce((sum, m) => sum + m.pipeline, 0);
  const avgScore = Math.round(teamMembers.reduce((sum, m) => sum + m.score, 0) / teamMembers.length);
  const totalRevenue = teamMembers.reduce((sum, m) => sum + m.revenue, 0);

  // Filter and sort members
  const filteredMembers = teamMembers
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           member.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = filterTier === 'all' || member.tier === filterTier;
      return matchesSearch && matchesTier && member.status === 'active';
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'deals') return b.deals - a.deals;
      if (sortBy === 'revenue') return b.revenue - a.revenue;
      return 0;
    });

  const handleAddMember = () => {
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      deals: 0,
      pipeline: 0,
      score: 0,
      tier: 'Bronze',
      revenue: 0,
      joinDate: formData.joinDate,
      status: 'active',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30'
    };

    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Agent',
      joinDate: new Date().toISOString().split('T')[0]
    });
    alert('Team member added successfully!');
  };

  const handleEditMember = () => {
    if (!selectedMember) return;

    setTeamMembers(teamMembers.map(member => 
      member.id === selectedMember.id 
        ? { ...member, ...formData }
        : member
    ));
    setShowEditModal(false);
    setSelectedMember(null);
    alert('Team member updated successfully!');
  };

  const handleDeleteMember = (id: number) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.map(member => 
        member.id === id 
          ? { ...member, status: 'inactive' as const }
          : member
      ));
      alert('Team member removed successfully!');
    }
  };

  const openEditModal = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      joinDate: member.joinDate
    });
    setShowEditModal(true);
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, { color: string; bg: string; border: string }> = {
      Platinum: { color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
      Gold: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
      Silver: { color: 'text-gray-400', bg: 'bg-gray-500/10', border: 'border-gray-500/30' },
      Bronze: { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' }
    };
    return colors[tier] || colors.Bronze;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Team Management</h2>
          <p className="text-sm text-gray-400 mt-1">Manage your team members and track performance</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Team Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-blue-400" />
            <div className="text-xs text-gray-400">Total Agents</div>
          </div>
          <div className="text-2xl font-bold text-white">{totalAgents}</div>
          <div className="text-xs text-gray-500 mt-1">Active members</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Total Deals</div>
          </div>
          <div className="text-2xl font-bold text-white">{totalDeals}</div>
          <div className="text-xs text-gray-500 mt-1">Closed this quarter</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <div className="text-xs text-gray-400">Pipeline</div>
          </div>
          <div className="text-2xl font-bold text-white">{totalPipeline}</div>
          <div className="text-xs text-gray-500 mt-1">Active opportunities</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-5 h-5 text-yellow-400" />
            <div className="text-xs text-gray-400">Avg Score</div>
          </div>
          <div className="text-2xl font-bold text-white">{avgScore}</div>
          <div className="text-xs text-gray-500 mt-1">Team average</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Total Revenue</div>
          </div>
          <div className="text-2xl font-bold text-white">${(totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-gray-500 mt-1">This quarter</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-4 pr-4 py-2 text-white placeholder-gray-500"
          />
        </div>
        <select
          value={filterTier}
          onChange={(e) => setFilterTier(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">All Tiers</option>
          <option value="Platinum">Platinum</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="score">Sort by Score</option>
          <option value="name">Sort by Name</option>
          <option value="deals">Sort by Deals</option>
          <option value="revenue">Sort by Revenue</option>
        </select>
      </div>

      {/* Team Members Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredMembers.map((member) => {
          const tierColors = getTierColor(member.tier);
          
          return (
            <div key={member.id} className={`bg-gradient-to-br from-gray-900 to-gray-900/50 border ${member.border} rounded-xl p-6 hover:border-[#00D4D4]/30 transition-all`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${member.bg} flex items-center justify-center`}>
                    <span className={`text-xl font-bold ${member.color}`}>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${tierColors.bg} ${tierColors.color} ${tierColors.border}`}>
                    {member.tier}
                  </div>
                  <button
                    onClick={() => openEditModal(member)}
                    className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 pb-4 border-b border-gray-800">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-400">Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Closed Deals</div>
                  <div className="text-lg font-bold text-white">{member.deals}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Pipeline</div>
                  <div className="text-lg font-bold text-[#00D4D4]">{member.pipeline}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Score</div>
                  <div className="text-lg font-bold text-white">{member.score}</div>
                </div>
              </div>

              {/* Performance Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                  <span>Performance Score</span>
                  <span>{member.score}/100</span>
                </div>
                <div className="bg-gray-800 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] h-3 rounded-full transition-all"
                    style={{ width: `${member.score}%` }}
                  ></div>
                </div>
              </div>

              {/* Revenue */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <span className="text-sm text-gray-400">Total Revenue</span>
                <span className="text-lg font-bold text-green-400">${(member.revenue / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Performance Leaderboard */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-[#00D4D4]" />
          Performance Leaderboard
        </h3>
        <div className="space-y-3">
          {[...teamMembers]
            .filter(m => m.status === 'active')
            .sort((a, b) => b.score - a.score)
            .map((member, idx) => {
              const tierColors = getTierColor(member.tier);
              return (
                <div key={member.id} className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-lg">
                  <div className={`w-8 h-8 rounded-full ${
                    idx === 0 ? 'bg-yellow-500' : 
                    idx === 1 ? 'bg-gray-400' : 
                    idx === 2 ? 'bg-orange-600' : 
                    'bg-gray-700'
                  } flex items-center justify-center`}>
                    <span className="text-sm font-bold text-white">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{member.name}</div>
                    <div className="text-xs text-gray-400">{member.tier} • {member.deals} deals</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{member.score}</div>
                    <div className="text-xs text-gray-400">score</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Add Team Member</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option>Agent</option>
                    <option>Senior Agent</option>
                    <option>Junior Agent</option>
                    <option>Team Leader</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMember}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Team Member</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option>Agent</option>
                    <option>Senior Agent</option>
                    <option>Junior Agent</option>
                    <option>Team Leader</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate}
                    onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
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
                  onClick={handleEditMember}
                  className="flex-1 px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                >
                  Update Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}