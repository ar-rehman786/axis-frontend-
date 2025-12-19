'use client'
import { useRouter } from "next/navigation";
type StatsType = {
  totalUsers: number;
  activeUsers: number;
  demoAccounts: number;
  totalRevenue: number;
  apiCalls: number;
  storageUsed: number;
};


import React, { useState, useEffect } from 'react';

import {
  Shield, Users, Activity, Database, Settings, Key, Clock,
  Grid3x3, Building2, TrendingUp, ShoppingCart, FileText, MapPin,
  UserPlus, Mail, Lock, Calendar, Eye, Trash2, Download,
  BarChart3, AlertTriangle, CheckCircle, XCircle, Copy, RefreshCw,
  Zap, Server, Globe, Crown, Search, Filter
} from 'lucide-react';
import { apiClient } from "@/app/lib/api";
import axios from "axios";

export default function Super_Admin() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('overview');

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoRole, setDemoRole] = useState('');
  const [responseEmail, setResponseEmail] = useState('');
  const [responsePassword, setResponsePassword] = useState('');
  const [responseRole, setResponseRole] = useState('');
  //   const [generatedDemo, setGeneratedDemo] = useState(null);
  const [generatedDemo, setGeneratedDemo] = useState<{ password: string;[key: string]: any } | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [stats, setStats] = useState<StatsType>({
    totalUsers: 0,
    activeUsers: 0,
    demoAccounts: 0,
    totalRevenue: 0,
    apiCalls: 0,
    storageUsed: 0,
  });

  useEffect(() => {
    const targets: StatsType = {
      totalUsers: 1247,
      activeUsers: 892,
      demoAccounts: 34,
      totalRevenue: 2847500,
      apiCalls: 15678234,
      storageUsed: 847,
    };

    const timer = setInterval(() => {
      setStats((prev: StatsType) => {
        const updated: StatsType = { ...prev };

        (Object.keys(targets) as (keyof StatsType)[]).forEach((key) => {
          const current = prev[key];
          const target = targets[key];

          updated[key] =
            current < target
              ? Math.min(current + Math.ceil(target / 20), target)
              : target;
        });

        return updated;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Available Dashboards
  const dashboards = [
    {
      id: 'Realtor',
      title: 'Realtor',
      description: 'Property listings, market feeds & client management',
      icon: BarChart3,
      color: 'bg-cyan-500',
      users: 420,
      status: 'active',
      lastAccess: 'Just now',
      path: '/dashboard/Realtor',
    },
    {
      id: 'Title',
      title: 'Title Company',
      description: 'Title pipeline, document management & closing coordination',
      icon: BarChart3,
      color: 'bg-emerald-500',
      users: 210,
      status: 'active',
      lastAccess: '1 min ago',
      path: '/dashboard/Title',
    },
    {
      id: 'lender',
      title: 'Lender Intelligence',
      icon: Grid3x3,
      color: 'bg-blue-500',
      users: 342,
      status: 'active',
      lastAccess: '2 mins ago',
      path: '/dashboard/lender',
    },
    {
      id: 'institutional',
      title: 'Institutional Intelligence',
      icon: Building2,
      color: 'bg-purple-500',
      users: 156,
      status: 'active',
      lastAccess: '5 mins ago',
      path: '/dashboard/institutional',
    },
    {
      id: 'sales',
      title: 'Sales Command Suite',
      icon: TrendingUp,
      color: 'bg-yellow-500',
      users: 234,
      status: 'active',
      lastAccess: '1 min ago',
      path: '/dashboard/sales',
    },
    {
      id: 'marketplace',
      title: 'Data Pack Marketplace',
      icon: ShoppingCart,
      color: 'bg-green-500',
      users: 189,
      status: 'active',
      lastAccess: '3 mins ago',
      path: '/dashboard/marketplace',
    },
    {
      id: 'reports',
      title: 'Analytics PDF Viewer',
      icon: FileText,
      color: 'bg-red-500',
      users: 267,
      status: 'active',
      lastAccess: '4 mins ago',
      path: '/dashboard/Reports',
    },
    {
      id: 'geo',
      title: 'City/ZIP Intelligence',
      icon: MapPin,
      color: 'bg-teal-500',
      users: 198,
      status: 'active',
      lastAccess: '6 mins ago',
      path: '/dashboard/geo',
    },
  ];

  // Demo Accounts Data
  const [demoAccounts, setDemoAccounts] = useState([
    {
      id: 1,
      email: 'a8f3k9@axistrademarket.ai',
      role: 'Master Admin (Read-Only)',
      created: '2024-12-08',
      expires: '2024-12-13',
      status: 'active',
      lastLogin: '2 hours ago',
      loginCount: 23
    },
    {
      id: 2,
      email: 'b2j5m7@axistrademarket.ai',
      role: 'Institutional Reviewer',
      created: '2024-12-07',
      expires: '2024-12-12',
      status: 'active',
      lastLogin: '5 hours ago',
      loginCount: 45
    },
    {
      id: 3,
      email: 'c9n1p4@axistrademarket.ai',
      role: 'Master Admin (Read-Only)',
      created: '2024-12-06',
      expires: '2024-12-11',
      status: 'expiring',
      lastLogin: '1 day ago',
      loginCount: 67
    }
  ]);

  // Recent Activities
  const recentActivities = [
    { id: 1, type: 'login', user: 'john@company.com', action: 'Logged into Lender Dashboard', time: '2 mins ago' },
    { id: 2, type: 'access', user: 'Demo User (a8f3k9)', action: 'Accessed Institutional Intelligence', time: '5 mins ago' },
    { id: 3, type: 'export', user: 'sarah@bank.com', action: 'Exported Market Report', time: '8 mins ago' },
    { id: 4, type: 'create', user: 'Admin', action: 'Created new demo account', time: '15 mins ago' },
    { id: 5, type: 'update', user: 'mike@hedge.com', action: 'Updated API settings', time: '23 mins ago' }
  ];

  // System Health
  const systemHealth = [
    { name: 'API Gateway', status: 'healthy', uptime: '99.98%', response: '45ms' },
    { name: 'Database Cluster', status: 'healthy', uptime: '99.99%', response: '12ms' },
    { name: 'Auth Service', status: 'healthy', uptime: '99.97%', response: '23ms' },
    { name: 'Storage Service', status: 'warning', uptime: '98.45%', response: '156ms' },
    { name: 'Analytics Engine', status: 'healthy', uptime: '99.95%', response: '67ms' }
  ];

  // Generate Demo Account
  // const generateDemoAccount = async() => {
  //   if (!demoRole) {
  //     alert('Please select a role');
  //     return;
  //   }
  const generateDemoAccount = async () => {
    if (!demoRole) {
      alert('Please select a role');
      return;
    }

    try {
      const superAdminToken = localStorage.getItem('accessToken')

      const res = await axios.post(
        'http://localhost:8080/demo/create',
        { email: 'axis@gmail.com', role: demoRole },
        {
          headers: {
            Authorization: `Bearer ${superAdminToken}`,
          },
        }
      );

      console.log('Demo account created:', res.data);
      setResponseEmail(res.data.email)
      setResponsePassword(res.data.password)
      setResponseRole(res.data.role)
      
    } catch (err: any) {
      console.error(
        'Error creating demo account:',
        err.response?.data || err
      );
      throw err;
    }
  };


  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const deleteDemoAccount = (id: any) => {
    if (confirm('Are you sure you want to delete this demo account?')) {
      setDemoAccounts(demoAccounts.filter(acc => acc.id !== id));
      alert('Demo account deleted successfully');
    }
  };

  const extendDemoAccount = (id: any) => {
    setDemoAccounts(demoAccounts.map(acc => {
      if (acc.id === id) {
        const newExpiry = new Date(acc.expires);
        newExpiry.setDate(newExpiry.getDate() + 5);
        return { ...acc, expires: newExpiry.toISOString().split('T')[0], status: 'active' };
      }
      return acc;
    }));
    alert('Demo account extended by 5 days');
  };

  const getStatusBadge = (
    status: 'active' | 'expiring' | 'expired' | 'healthy' | 'warning'
  ) => {
    const badges: Record<
      'active' | 'expiring' | 'expired' | 'healthy' | 'warning',
      { bg: string; text: string; border: string; icon: any }
    > = {
      active: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
      expiring: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: Clock },
      expired: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', icon: XCircle },
      healthy: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', icon: CheckCircle },
      warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: AlertTriangle }
    };

    return badges[status] || badges.active;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-900 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#00D4D4] to-[#00A8A8] rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Super Admin Control Panel</h1>
                <p className="text-sm text-gray-400">Master dashboard with full system access</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-green-400">All Systems Operational</span>
                </div>
              </div>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-6 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-gray-400">Total Users</div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-5 h-5 text-green-400" />
              <div className="text-xs text-gray-400">Active Users</div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.activeUsers.toLocaleString()}</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Key className="w-5 h-5 text-purple-400" />
              <div className="text-xs text-gray-400">Demo Accounts</div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.demoAccounts}</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
              <div className="text-xs text-gray-400">Revenue</div>
            </div>
            <div className="text-2xl font-bold text-white">${(stats.totalRevenue / 1000000).toFixed(2)}M</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-orange-400" />
              <div className="text-xs text-gray-400">API Calls</div>
            </div>
            <div className="text-2xl font-bold text-white">{(stats.apiCalls / 1000000).toFixed(1)}M</div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Database className="w-5 h-5 text-teal-400" />
              <div className="text-xs text-gray-400">Storage</div>
            </div>
            <div className="text-2xl font-bold text-white">{stats.storageUsed} GB</div>
          </div>
        </div>

        {/* Generate Demo Access */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-[#00D4D4]/10 to-[#00A8A8]/5 border border-[#00D4D4]/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#00D4D4]/20 rounded-xl flex items-center justify-center">
                  <UserPlus className="w-7 h-7 text-[#00D4D4]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Generate Demo Access</h3>
                  <p className="text-sm text-gray-400">Create temporary access for clients and reviewers</p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoModal(true)}

                className="px-6 py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all flex items-center gap-2"
              >
                <Key className="w-5 h-5" />
                Generate Demo Account
              </button>
            </div>
          </div>
        </div>

        {/* All Dashboards Access */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">All Dashboards</h2>
          <div className="grid grid-cols-3 gap-4">
            {dashboards.map((dashboard) => {
              const Icon = dashboard.icon;
              const statusBadge = getStatusBadge(dashboard.status as any);
              const StatusIcon = statusBadge.icon;

              const handleNavigate = () => {
                if (dashboard.path) {
                  router.push(dashboard.path);
                }
              };

              return (
                <div
                  key={dashboard.id}
                  onClick={handleNavigate}      // poora card clickable
                  className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#00D4D4]/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${dashboard.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1`}>
                      <StatusIcon className="w-3 h-3" />
                      {dashboard.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00D4D4] transition-colors">
                    {dashboard.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-gray-400">
                      <Users className="w-4 h-4 inline mr-1" />
                      {dashboard.users} users
                    </div>
                    <div className="text-gray-500 text-xs">{dashboard.lastAccess}</div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleNavigate(); }} // button click bhi navigate kare, but stop event bubbling
                      className="flex-1 px-3 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors text-sm font-medium"
                    >
                      Access
                    </button>
                    <button
                      className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Demo Accounts Management */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Demo Accounts Management</h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="expiring">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800/50 border-b border-gray-700">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Created</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Expires</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Last Login</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {demoAccounts.map((account) => {
                  const statusBadge = getStatusBadge(account.status as any);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <tr key={account.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-white">{account.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">{account.role}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">{account.created}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-400">{account.expires}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1 w-fit`}>
                          <StatusIcon className="w-3 h-3" />
                          {account.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-400">
                          <div>{account.lastLogin}</div>
                          <div className="text-xs text-gray-600">{account.loginCount} logins</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => extendDemoAccount(account.id)}
                            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                            title="Extend by 5 days"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(account.email)}
                            className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                            title="Copy email"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteDemoAccount(account.id)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/30"
                            title="Delete account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                    <div className="w-8 h-8 bg-[#00D4D4]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Activity className="w-4 h-4 text-[#00D4D4]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{activity.user}</div>
                      <div className="text-sm text-gray-400">{activity.action}</div>
                      <div className="text-xs text-gray-600 mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">System Health</h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="space-y-4">
                {systemHealth.map((service, idx) => {
                  const statusBadge = getStatusBadge(service.status as any);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <div key={idx} className="pb-4 border-b border-gray-800 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Server className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-white">{service.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {service.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Uptime: {service.uptime}</span>
                        <span>Response: {service.response}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-2xl w-full p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Generate Demo Access</h2>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  setDemoRole('');
                  setGeneratedDemo(null);
                }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {!generatedDemo ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Role *
                  </label>
                  <select
                    value={demoRole}
                    onChange={(e) => setDemoRole(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  >
                    <option value="">Choose role...</option>
                    {/* <option value="">Master Admin (Read-Only)</option> */}
                    <option value="INSTITUTIONAL">Institutional Reviewer</option>
                    <option value="BROKERAGE">BROKERAGE</option>
                    <option value="REALTOR">REALTOR</option>
                    <option value="CONSUMER">CONSUMER</option>
                    <option value="DEMO">DEMO</option>
                  </select>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-300">
                      <div className="font-medium mb-1">Auto-generated credentials:</div>
                      <ul className="space-y-1 text-blue-200">
                        <li>• Email: {responseEmail}</li>
                        <li>• Password: {responsePassword}</li>
                        <li>• Role: {responseRole}</li>
                        <li>• Expiry: 5 days from creation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={generateDemoAccount}
                  disabled={!demoRole}
                  className="w-full px-6 py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Demo Account
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                    <span className="text-lg font-bold text-green-400">Demo Account Created!</span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Email Address</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={generatedDemo.email}
                          readOnly
                          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedDemo.email)}
                          className="p-2 bg-gray-800 rounded hover:bg-gray-700 border border-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 mb-1">Temporary Password</div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          //   value={generatedDemo.password}
                          value={generatedDemo?.password ?? ""}

                          readOnly
                          className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white font-mono"
                        />
                        <button
                          onClick={() => copyToClipboard(generatedDemo.password)}
                          className="p-2 bg-gray-800 rounded hover:bg-gray-700 border border-gray-700"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Role</div>
                        <div className="text-sm font-medium text-white">{generatedDemo.role}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-1">Expires On</div>
                        <div className="text-sm font-medium text-white">{generatedDemo.expires}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDemoModal(false);
                      setDemoRole('');
                      setGeneratedDemo(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 border border-gray-700"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setDemoRole('');
                      setGeneratedDemo(null);
                    }}
                    className="flex-1 px-6 py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9]"
                  >
                    Generate Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}