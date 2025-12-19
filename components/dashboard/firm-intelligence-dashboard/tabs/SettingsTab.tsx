import React, { useState } from 'react';
import { Settings, Bell, Shield, Users, Database } from 'lucide-react';

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    emailAlerts: true,
    performanceAlerts: true,
    complianceAlerts: true,
    teamNotifications: false,
    autoAssignment: true,
    cooldownPeriod: 30,
    minScore: 70,
    autoReports: false
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Settings</h2>

      {/* Notification Settings */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-[#00D4D4]" />
          <h3 className="text-lg font-bold text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Email Alerts</span>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Performance Alerts</span>
            <input
              type="checkbox"
              checked={settings.performanceAlerts}
              onChange={(e) => setSettings({...settings, performanceAlerts: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Compliance Alerts</span>
            <input
              type="checkbox"
              checked={settings.complianceAlerts}
              onChange={(e) => setSettings({...settings, complianceAlerts: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Team Notifications</span>
            <input
              type="checkbox"
              checked={settings.teamNotifications}
              onChange={(e) => setSettings({...settings, teamNotifications: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
        </div>
      </div>

      {/* Team Settings */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-[#00D4D4]" />
          <h3 className="text-lg font-bold text-white">Team Management</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Auto-Assignment</span>
            <input
              type="checkbox"
              checked={settings.autoAssignment}
              onChange={(e) => setSettings({...settings, autoAssignment: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Minimum Agent Score</label>
            <input
              type="number"
              value={settings.minScore}
              onChange={(e) => setSettings({...settings, minScore: parseInt(e.target.value)})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-32"
            />
          </div>
        </div>
      </div>

      {/* Compliance Settings */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-[#00D4D4]" />
          <h3 className="text-lg font-bold text-white">Compliance</h3>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Cooldown Period (days)</label>
            <input
              type="number"
              value={settings.cooldownPeriod}
              onChange={(e) => setSettings({...settings, cooldownPeriod: parseInt(e.target.value)})}
              className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white w-32"
            />
          </div>
        </div>
      </div>

      {/* Data Settings */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Database className="w-5 h-5 text-[#00D4D4]" />
          <h3 className="text-lg font-bold text-white">Data & Reports</h3>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="text-sm text-gray-300">Auto-Generate Reports</span>
            <input
              type="checkbox"
              checked={settings.autoReports}
              onChange={(e) => setSettings({...settings, autoReports: e.target.checked})}
              className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-[#00D4D4]"
            />
          </label>
        </div>
      </div>

      <button className="px-6 py-3 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold">
        Save Settings
      </button>
    </div>
  );
}