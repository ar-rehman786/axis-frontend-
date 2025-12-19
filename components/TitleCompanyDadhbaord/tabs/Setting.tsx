import React, { ComponentType, ReactNode, useState } from 'react';
import { User, Bell, Lock, Database, Mail, Palette, Globe } from 'lucide-react';

type SettingSectionProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  children: ReactNode;
};
const SettingsTab = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [notifications, setNotifications] = useState({
    newProperties: true,
    priceChanges: false,
    contactResponses: true,
    weeklyReport: true
  });

const SettingSection = ({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  children: React.ReactNode;
}) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-teal-500/10 rounded-lg">
          <Icon className="text-teal-400" size={24} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Settings</h2>
        <p className="text-gray-400">Manage your account, preferences, and integrations</p>
      </div>

      {/* Settings Navigation */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'profile'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'notifications'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'security'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveSection('data')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'data'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Data Sources
          </button>
          <button
            onClick={() => setActiveSection('appearance')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === 'appearance'
                ? 'bg-teal-500 text-white'
                : 'text-gray-400 hover:bg-zinc-800'
            }`}
          >
            Appearance
          </button>
        </div>
      </div>

      {/* Profile Settings */}
      {activeSection === 'profile' && (
        <SettingSection icon={User} title="Profile Information">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Investor"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="john@investorhub.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                type="text"
                defaultValue="Investment Group LLC"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full bg-teal-500 hover:bg-teal-600 rounded-lg py-3 font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </SettingSection>
      )}

      {/* Notification Settings */}
      {activeSection === 'notifications' && (
        <SettingSection icon={Bell} title="Notification Preferences">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <div>
                <p className="font-medium">New Properties Alert</p>
                <p className="text-sm text-gray-400">Get notified when new high-equity properties are added</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.newProperties}
                  onChange={(e) => setNotifications({...notifications, newProperties: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-zinc-700 peer-checked:bg-teal-500 rounded-full transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <div>
                <p className="font-medium">Price Changes</p>
                <p className="text-sm text-gray-400">Alert when property values change significantly</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.priceChanges}
                  onChange={(e) => setNotifications({...notifications, priceChanges: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-zinc-700 peer-checked:bg-teal-500 rounded-full transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-zinc-800">
              <div>
                <p className="font-medium">Contact Responses</p>
                <p className="text-sm text-gray-400">Notify when owners respond to outreach</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.contactResponses}
                  onChange={(e) => setNotifications({...notifications, contactResponses: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-zinc-700 peer-checked:bg-teal-500 rounded-full transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-gray-400">Receive weekly market summary via email</p>
              </div>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={notifications.weeklyReport}
                  onChange={(e) => setNotifications({...notifications, weeklyReport: e.target.checked})}
                  className="sr-only peer"
                />
                <div className="w-full h-full bg-zinc-700 peer-checked:bg-teal-500 rounded-full transition-colors cursor-pointer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>
        </SettingSection>
      )}

      {/* Security Settings */}
      {activeSection === 'security' && (
        <SettingSection icon={Lock} title="Security & Privacy">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <button className="w-full bg-teal-500 hover:bg-teal-600 rounded-lg py-3 font-medium transition-colors">
              Update Password
            </button>
            
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <h4 className="font-medium mb-3">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-400 mb-4">Add an extra layer of security to your account</p>
              <button className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </SettingSection>
      )}

      {/* Data Sources Settings */}
      {activeSection === 'data' && (
        <SettingSection icon={Database} title="Data Sources & Integrations">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <Database className="text-teal-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Public Records</p>
                  <p className="text-sm text-gray-400">Connected • Last sync: 2 hours ago</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm transition-colors">
                Configure
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
                  <Globe className="text-teal-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">MLS Feed</p>
                  <p className="text-sm text-gray-400">Connected • Real-time updates</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-sm transition-colors">
                Configure
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-500/10 rounded-lg flex items-center justify-center">
                  <Mail className="text-gray-400" size={20} />
                </div>
                <div>
                  <p className="font-medium">Email Integration</p>
                  <p className="text-sm text-gray-400">Not connected</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm transition-colors">
                Connect
              </button>
            </div>
          </div>
        </SettingSection>
      )}

      {/* Appearance Settings */}
      {activeSection === 'appearance' && (
        <SettingSection icon={Palette} title="Appearance & Display">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                <button className="p-4 bg-zinc-800 border-2 border-teal-500 rounded-lg text-center">
                  <div className="w-full h-20 bg-black rounded mb-2"></div>
                  <span className="text-sm">Dark</span>
                </button>
                <button className="p-4 bg-zinc-800 border-2 border-transparent hover:border-zinc-600 rounded-lg text-center">
                  <div className="w-full h-20 bg-white rounded mb-2"></div>
                  <span className="text-sm">Light</span>
                </button>
                <button className="p-4 bg-zinc-800 border-2 border-transparent hover:border-zinc-600 rounded-lg text-center">
                  <div className="w-full h-20 bg-gradient-to-br from-black to-white rounded mb-2"></div>
                  <span className="text-sm">Auto</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Default View</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Grid View</option>
                <option>Table View</option>
                <option>Map View</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Items Per Page</label>
              <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
        </SettingSection>
      )}
    </div>
  );
};

export default SettingsTab;