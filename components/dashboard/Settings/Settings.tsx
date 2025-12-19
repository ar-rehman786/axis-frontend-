import React, { useState } from 'react';
import { Users, Bell, Lock, Palette, Link, Mail, MessageSquare, Zap, Database, CreditCard, Trash2, Plus, Check, Shield, Key, Download } from 'lucide-react';

interface Tab {
  id: 'users' | 'notifications' | 'security' | 'branding' | 'integrations' | 'automation' | 'billing';
  label: string;
  icon: React.ElementType;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

interface Integration {
  name: string;
  type: string;
  status: 'connected' | 'disconnected';
  icon: string;
  description: string;
}

interface BillingHistory {
  id: number;
  date: string;
  amount: string;
  status: string;
  invoice: string;
}

interface Role {
  icon: React.ElementType;
  name: string;
  desc: string;
  perms: string[];
}

interface NotificationItem {
  key: string;
  icon: React.ElementType;
  title: string;
  desc: string;
}

interface Session {
  device: string;
  location: string;
  time: string;
  current: boolean;
}

interface Campaign {
  name: string;
  trigger: string;
  emails: number;
  status: 'active' | 'paused';
  sent: number;
}

interface Workflow {
  trigger: string;
  action: string;
  active: boolean;
}

interface Plan {
  name: string;
  price: number;
  users: string;
  features: string[];
  current?: boolean;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'notifications' | 'security' | 'branding' | 'integrations' | 'automation' | 'billing'>('users');
  const [notifications, setNotifications] = useState<{
    email: boolean;
    sms: boolean;
    push: boolean;
    desktop: boolean;
  }>({
    email: true,
    sms: false,
    push: true,
    desktop: true
  });
  const [eventNotifications, setEventNotifications] = useState<Record<string, boolean>>({
    'New lead assigned': true,
    'Lead responded': true,
    'Document uploaded': true,
    'Application submitted': true,
    'Loan approved': true,
    'Rate lock expiring': true
  });

  const tabs: Tab[] = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'branding', label: 'Branding', icon: Palette },
    { id: 'integrations', label: 'Integrations', icon: Link },
    { id: 'automation', label: 'Automation', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  const users: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', status: 'active', lastLogin: '2 hours ago' },
    { id: 2, name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Manager', status: 'active', lastLogin: '5 hours ago' },
    { id: 3, name: 'Mike Johnson', email: 'mike.j@company.com', role: 'Loan Officer', status: 'active', lastLogin: '1 day ago' },
    { id: 4, name: 'Sarah Chen', email: 'sarah.c@company.com', role: 'Loan Officer', status: 'inactive', lastLogin: '1 week ago' }
  ];

  const integrations: Integration[] = [
    { name: 'Encompass LOS', type: 'LOS', status: 'connected', icon: '🏢', description: 'Loan origination system' },
    { name: 'Gmail', type: 'Email', status: 'connected', icon: '📧', description: 'Email provider' },
    { name: 'Twilio', type: 'SMS/Calls', status: 'connected', icon: '📱', description: 'Communication platform' },
    { name: 'Zillow API', type: 'Real Estate', status: 'disconnected', icon: '🏠', description: 'Property data' },
    { name: 'Salesforce', type: 'CRM', status: 'disconnected', icon: '☁️', description: 'Customer management' },
    { name: 'Google Calendar', type: 'Calendar', status: 'connected', icon: '📅', description: 'Schedule sync' }
  ];

  const billingHistory: BillingHistory[] = [
    { id: 1, date: 'Nov 22, 2025', amount: '$299.00', status: 'Paid', invoice: 'INV-2025-011' },
    { id: 2, date: 'Oct 22, 2025', amount: '$299.00', status: 'Paid', invoice: 'INV-2025-010' },
    { id: 3, date: 'Sep 22, 2025', amount: '$299.00', status: 'Paid', invoice: 'INV-2025-009' },
    { id: 4, date: 'Aug 22, 2025', amount: '$299.00', status: 'Paid', invoice: 'INV-2025-008' }
  ];

  const Toggle = ({ checked, onChange }: {
    checked: boolean;
    onChange: () => void;
  }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
      <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
    </label>
  );

  return (
    <div className="p-6 bg-black min-h-screen w-[800px] overflow-hidden">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your system configuration and preferences</p>
      </div>


<div className="relative">
  <div className="flex gap-1 mb-6 border-b border-gray-800 overflow-x-auto 
      [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0
      [scrollbar-width:none] [-ms-overflow-style:none]">
    {tabs.map((tab: Tab) => {
      const Icon = tab.icon;
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
            activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Icon className="w-4 h-4" />
          {tab.label}
        </button>
      );
    })}
  </div>
</div>

      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Team Members</h2>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add User
            </button>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-neutral-800">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Last Login</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr key={user.id} className="border-b border-gray-800 hover:bg-neutral-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs font-medium">{user.role}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-400">{user.lastLogin}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button className="px-2 py-1 bg-neutral-800 text-white rounded hover:bg-gray-700 text-xs">Edit</button>
                        <button className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Roles & Permissions</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, name: 'Admin', desc: 'Full system access', perms: ['All features', 'User management', 'System settings'] },
                { icon: Key, name: 'Manager', desc: 'Team oversight', perms: ['View all leads', 'Reports access', 'Team performance'] },
                { icon: Users, name: 'Loan Officer', desc: 'Standard access', perms: ['Assigned leads', 'Contact clients', 'Upload docs'] }
              ].map((role: Role, idx: number) => (
                <div key={idx} className="p-3 bg-neutral-800 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <role.icon className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-white font-medium text-sm">{role.name}</h4>
                  </div>
                  <p className="text-gray-400 text-xs mb-2">{role.desc}</p>
                  <ul className="space-y-1">
                    {role.perms.map((p, i) => (
                      <li key={i} className="flex items-center gap-1 text-gray-400 text-xs">
                        <Check className="w-3 h-3 text-green-400" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              {[
                { key: 'email', icon: Mail, title: 'Email Notifications', desc: 'Receive updates via email' },
                { key: 'sms', icon: MessageSquare, title: 'SMS Notifications', desc: 'Get text alerts for urgent items' },
                { key: 'push', icon: Bell, title: 'Push Notifications', desc: 'Browser and mobile push alerts' },
                { key: 'desktop', icon: Database, title: 'Desktop Notifications', desc: 'System tray notifications' }
              ].map((item: NotificationItem) => (
                <div key={item.key} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h4 className="text-white font-medium text-sm">{item.title}</h4>
                      <p className="text-gray-400 text-xs">{item.desc}</p>
                    </div>
                  </div>
                  <Toggle checked={notifications[item.key as keyof typeof notifications]} onChange={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Event Notifications</h3>
            <div className="space-y-2">
              {Object.entries(eventNotifications).map(([event, checked]: [string, boolean]) => (
                <div key={event} className="flex items-center justify-between p-2 bg-neutral-800 rounded-lg">
                  <span className="text-white text-sm">{event}</span>
                  <input type="checkbox" checked={checked} onChange={() => setEventNotifications({...eventNotifications, [event]: !checked})} className="w-4 h-4 accent-cyan-500 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-white text-sm font-medium mb-1 block">Password Policy</label>
                <select className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm">
                  <option>Strong (12+ chars, special chars required)</option>
                  <option>Medium (8+ chars, numbers required)</option>
                  <option>Basic (6+ chars minimum)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                <div>
                  <p className="text-white font-medium text-sm">Require 2FA for all users</p>
                  <p className="text-gray-400 text-xs">Enhanced security via SMS or authenticator app</p>
                </div>
                <Toggle checked={true} onChange={() => {}} />
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">Session Timeout</label>
                <select className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                </select>
              </div>

              <div>
                <label className="text-white text-sm font-medium mb-1 block">IP Whitelist</label>
                <textarea className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm" rows={2} placeholder="Enter IP addresses (one per line)" />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-gray-700 text-sm">Reset</button>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium">Save Changes</button>
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Active Sessions</h3>
            <div className="space-y-2">
              {[
                { device: 'Chrome on Windows', location: 'Karachi, PK', time: 'Current session', current: true },
                { device: 'Safari on iPhone', location: 'Karachi, PK', time: '2 hours ago', current: false }
              ].map((session: Session, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <p className="text-white font-medium text-sm">{session.device}</p>
                    <p className="text-gray-400 text-xs">{session.location} • {session.time}</p>
                  </div>
                  {session.current ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Current</span>
                  ) : (
                    <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30 text-xs">Revoke</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'branding' && (
        <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-4">Brand Customization</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-1 block">Company Logo</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Palette className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-white text-sm">Click to upload logo</p>
                <p className="text-gray-400 text-xs">PNG or SVG (max 2MB)</p>
              </div>
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-1 block">Company Name</label>
              <input type="text" defaultValue="Axis Trade Market" className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm mb-3" />
              <label className="text-white text-sm font-medium mb-1 block">Primary Color</label>
              <div className="flex gap-2">
                <input type="color" defaultValue="#00D1D1" className="w-12 h-10 bg-neutral-800 rounded-lg cursor-pointer border-0" />
                <input type="text" defaultValue="#00D1D1" className="flex-1 px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-white text-sm font-medium mb-1 block">Email Signature</label>
            <textarea className="w-full px-3 py-2 bg-neutral-800 text-white rounded-lg border border-gray-700 focus:border-cyan-500 outline-none text-sm" rows={3} defaultValue={"Best regards,\n[Your Name]\nAxis Trade Market"} />
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-gray-700 text-sm">Reset</button>
            <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium">Save Changes</button>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="grid grid-cols-2 gap-4">
          {integrations.map((integration: Integration, idx: number) => (
            <div key={idx} className="bg-neutral-900 border border-gray-800 rounded-xl p-4 hover:border-cyan-500/30 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{integration.icon}</span>
                  <div>
                    <h4 className="text-white font-medium text-sm">{integration.name}</h4>
                    <p className="text-gray-400 text-xs">{integration.type}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${integration.status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {integration.status}
                </span>
              </div>
              <p className="text-gray-400 text-xs mb-3">{integration.description}</p>
              <button className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${integration.status === 'connected' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}>
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'automation' && (
        <div className="space-y-4">
          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold">Marketing Automation</h3>
              <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Campaign
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Welcome Sequence', trigger: 'New lead', emails: 3, status: 'active' as const, sent: 1250 },
                { name: 'Nurture Campaign', trigger: 'Lead not contacted 7 days', emails: 5, status: 'active' as const, sent: 890 },
                { name: 'Re-engagement', trigger: 'No response 30 days', emails: 2, status: 'paused' as const, sent: 450 }
              ].map((campaign: Campaign, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div>
                    <h4 className="text-white font-medium text-sm">{campaign.name}</h4>
                    <p className="text-gray-400 text-xs">Trigger: {campaign.trigger} • {campaign.emails} emails • {campaign.sent} sent</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {campaign.status}
                    </span>
                    <button className="px-3 py-1 bg-neutral-700 text-white rounded text-xs hover:bg-gray-600">Edit</button>
                    <button className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Workflow Triggers</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { trigger: 'Lead Score > 80', action: 'Notify loan officer', active: true },
                { trigger: 'Document uploaded', action: 'Send confirmation email', active: true },
                { trigger: 'Application submitted', action: 'Create task for review', active: false },
                { trigger: 'Rate lock expiring', action: 'Send reminder to client', active: true }
              ].map((workflow: Workflow, idx: number) => (
                <div key={idx} className="p-3 bg-neutral-800 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium text-xs">{workflow.trigger}</p>
                    <p className="text-gray-400 text-xs">{workflow.action}</p>
                  </div>
                  <Toggle checked={workflow.active} onChange={() => {}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'billing' && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/30 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Current Plan</p>
              <h3 className="text-2xl font-bold text-white mb-1">Pro</h3>
              <p className="text-cyan-400 font-medium">$299/month</p>
            </div>
            <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Users</p>
              <h3 className="text-2xl font-bold text-white mb-1">4/10</h3>
              <p className="text-gray-400 text-xs">Active users</p>
            </div>
            <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs mb-1">Next Billing</p>
              <h3 className="text-lg font-bold text-white mb-1">Dec 22, 2025</h3>
              <p className="text-gray-400 text-xs">Auto-renew enabled</p>
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Payment Method</h3>
            <div className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-white font-medium text-sm">•••• •••• •••• 4242</p>
                  <p className="text-gray-400 text-xs">Expires 12/2026</p>
                </div>
              </div>
              <button className="px-3 py-1 bg-neutral-700 text-white rounded text-sm hover:bg-gray-600">Update</button>
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Billing History</h3>
            <div className="space-y-2">
              {billingHistory.map((item: BillingHistory) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-neutral-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-white text-sm">{item.date}</span>
                    <span className="text-gray-400 text-sm">{item.invoice}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium text-sm">{item.amount}</span>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">{item.status}</span>
                    <button className="p-1 text-gray-400 hover:text-white"><Download className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-neutral-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Available Plans</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: 'Starter', price: 99, users: '3 users', features: ['Basic CRM', 'Email support', '1 integration'] },
                { name: 'Pro', price: 299, users: '10 users', features: ['Advanced CRM', 'Priority support', '5 integrations', 'Automation'], current: true },
                { name: 'Enterprise', price: 599, users: 'Unlimited', features: ['Full suite', '24/7 support', 'Unlimited integrations'] }
              ].map((plan: Plan, idx: number) => (
                <div key={idx} className={`p-4 rounded-lg border ${plan.current ? 'bg-cyan-500/10 border-cyan-500' : 'bg-neutral-800 border-gray-700'}`}>
                  <h4 className="text-white font-semibold">{plan.name}</h4>
                  <p className="text-2xl font-bold text-white my-2">${plan.price}<span className="text-sm text-gray-400">/mo</span></p>
                  <p className="text-gray-400 text-xs mb-3">{plan.users}</p>
                  <ul className="space-y-1 mb-3">
                    {plan.features.map((f, i) => (
                      <li key={i} className="text-gray-400 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-400" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2 rounded-lg text-sm font-medium ${plan.current ? 'bg-cyan-500/20 text-cyan-400 cursor-default' : 'bg-cyan-500 text-white hover:bg-cyan-600'}`}>
                    {plan.current ? 'Current Plan' : 'Upgrade'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;