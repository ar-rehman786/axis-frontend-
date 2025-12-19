'use client';

import React from 'react';
import { User, Mail, Phone, Key, Globe } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-[#9CA3AF]">Manage your account and preferences</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-[#00D1D1]/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-[#00D1D1]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
              <p className="text-[#9CA3AF]">Update your profile details</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white focus:border-[#00D1D1] focus:outline-none"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <div className="flex gap-3">
                <input
                  type="email"
                  className="flex-1 px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white focus:border-[#00D1D1] focus:outline-none"
                  placeholder="Enter your email"
                />
                <button className="px-4 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap">
                  Verify Email
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg text-white focus:border-[#00D1D1] focus:outline-none"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="pt-4">
              <button className="px-6 py-3 bg-[#00D1D1] text-white font-semibold rounded-lg hover:bg-[#00B8B8] transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#00D1D1]/20 rounded-lg flex items-center justify-center">
              <Key className="w-6 h-6 text-[#00D1D1]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Security</h2>
              <p className="text-[#9CA3AF]">Manage your account security</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Two-Factor Authentication</h3>
                <p className="text-[#9CA3AF] text-sm">Add an extra layer of security</p>
              </div>
              <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
                Enable
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
              <div>
                <h3 className="text-white font-semibold">Change Password</h3>
                <p className="text-[#9CA3AF] text-sm">Update your password regularly</p>
              </div>
              <button className="px-4 py-2 border border-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#00D1D1]/20 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-[#00D1D1]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
              <p className="text-[#9CA3AF]">Configure your notification preferences</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">Email Notifications</h3>
                <p className="text-[#9CA3AF] text-sm">Receive important updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D1D1]"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold">SMS Alerts</h3>
                <p className="text-[#9CA3AF] text-sm">Get important alerts via SMS</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D1D1]"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;