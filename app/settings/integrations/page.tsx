"use client";
import React, { useState } from 'react';
import { Link, Zap, Mail, MessageSquare, Home, CreditCard, Cloud, Database, Check, X, AlertCircle } from 'lucide-react';

type IntegrationStatus = 'connected' | 'disconnected' | 'pending';
type IntegrationCategory = 'LOS' | 'CRM' | 'Email' | 'Communication' | 'Real Estate' | 'Payment' | 'Calendar' | 'eSignature';

type Integration = {
  id: number;
  name: string;
  category: IntegrationCategory;
  icon: any;
  status: IntegrationStatus;
  description: string;
  lastSync: string;
  config: Record<string, string>;
};

const IntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      name: 'Encompass LOS',
      category: 'LOS',
      icon: Database,
      status: 'connected',
      description: 'Loan origination system integration',
      lastSync: '2 hours ago',
      config: { apiKey: '••••••••••••', url: 'https://api.encompass.com' }
    },
    {
      id: 2,
      name: 'Salesforce CRM',
      category: 'CRM',
      icon: Cloud,
      status: 'connected',
      description: 'Customer relationship management',
      lastSync: '15 minutes ago',
      config: { apiKey: '••••••••••••', instance: 'company.salesforce.com' }
    },
    {
      id: 3,
      name: 'Gmail',
      category: 'Email',
      icon: Mail,
      status: 'connected',
      description: 'Email provider integration',
      lastSync: '5 minutes ago',
      config: { email: 'notifications@company.com', account: 'connected' }
    },
    {
      id: 4,
      name: 'Twilio',
      category: 'Communication',
      icon: MessageSquare,
      status: 'disconnected',
      description: 'SMS and voice communications',
      lastSync: 'Never',
      config: { sid: '', token: '' }
    },
    {
      id: 5,
      name: 'Zillow API',
      category: 'Real Estate',
      icon: Home,
      status: 'connected',
      description: 'Property data and valuations',
      lastSync: '1 day ago',
      config: { apiKey: '••••••••••••', tier: 'premium' }
    },
    {
      id: 6,
      name: 'Stripe',
      category: 'Payment',
      icon: CreditCard,
      status: 'disconnected',
      description: 'Payment processing',
      lastSync: 'Never',
      config: { secretKey: '', publishableKey: '' }
    },
    {
      id: 7,
      name: 'Google Calendar',
      category: 'Calendar',
      icon: Zap,
      status: 'connected',
      description: 'Schedule synchronization',
      lastSync: '1 hour ago',
      config: { email: 'calendar@company.com', sync: 'bidirectional' }
    },
    {
      id: 8,
      name: 'DocuSign',
      category: 'eSignature',
      icon: Link,
      status: 'pending',
      description: 'Electronic signature platform',
      lastSync: 'Never',
      config: { accountId: '', environment: 'production' }
    }
  ]);

  const [activeIntegration, setActiveIntegration] = useState<Integration | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleConnectToggle = (id: number) => {
    setIntegrations(integrations.map(integration => {
      if (integration.id === id) {
        const newStatus = integration.status === 'connected' ? 'disconnected' : 'connected';
        return {
          ...integration,
          status: newStatus,
          lastSync: newStatus === 'connected' ? 'Just now' : 'Never'
        };
      }
      return integration;
    }));
  };

  const getStatusColor = (status: IntegrationStatus): string => {
    switch(status) {
      case 'connected': return 'bg-green-500/20 text-green-400';
      case 'disconnected': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getCategoryColor = (category: IntegrationCategory): string => {
    switch(category) {
      case 'LOS': return 'bg-blue-500/20 text-blue-400';
      case 'CRM': return 'bg-purple-500/20 text-purple-400';
      case 'Email': return 'bg-red-500/20 text-red-400';
      case 'Communication': return 'bg-green-500/20 text-green-400';
      case 'Real Estate': return 'bg-orange-500/20 text-orange-400';
      case 'Payment': return 'bg-indigo-500/20 text-indigo-400';
      case 'Calendar': return 'bg-yellow-500/20 text-yellow-400';
      case 'eSignature': return 'bg-cyan-500/20 text-cyan-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Integrations</h2>
          <p className="text-[#9CA3AF]">Connect third-party services and APIs</p>
        </div>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
          Add Custom Integration
        </button>
      </div>

      {/* Integration Statistics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Total Integrations</p>
          <h3 className="text-3xl font-bold text-white">{integrations.length}</h3>
          <p className="text-[#9CA3AF] text-sm mt-2">Available services</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Connected</p>
          <h3 className="text-3xl font-bold text-white">
            {integrations.filter(i => i.status === 'connected').length}
          </h3>
          <p className="text-green-400 text-sm font-semibold mt-2">Active</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Last Sync</p>
          <h3 className="text-3xl font-bold text-white">5 min</h3>
          <p className="text-yellow-400 text-sm font-semibold mt-2">Recent</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-xl p-6">
          <p className="text-[#9CA3AF] text-sm mb-2">Errors</p>
          <h3 className="text-3xl font-bold text-white">0</h3>
          <p className="text-red-400 text-sm font-semibold mt-2">All systems normal</p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-4 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div key={integration.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#00D1D1]/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{integration.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(integration.category)}`}>
                      {integration.category}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>

              <p className="text-[#9CA3AF] text-sm mb-4">{integration.description}</p>

              <div className="flex items-center justify-between text-sm text-[#9CA3AF] mb-4">
                <span>Last sync: {integration.lastSync}</span>
                <button 
                  onClick={() => setActiveIntegration(integration)}
                  className="text-[#00D1D1] hover:text-[#00B8B8] transition-colors"
                >
                  Configure
                </button>
              </div>

              <button
                onClick={() => handleConnectToggle(integration.id)}
                className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                  integration.status === 'connected'
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-[#00D1D1] text-white hover:bg-[#00B8B8]'
                }`}
              >
                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Configuration Panel */}
      {activeIntegration && (
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center">
                <activeIntegration.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-xl">{activeIntegration.name}</h3>
                <p className="text-[#9CA3AF]">{activeIntegration.description}</p>
              </div>
            </div>
            <button
              onClick={() => setActiveIntegration(null)}
              className="p-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter API key"
                className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-2">Webhook URL</label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-webhook.com"
                className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
          </div>

          <div className="bg-[#2A2A2A] rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <h4 className="text-white font-semibold">Configuration Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {Object.entries(activeIntegration.config).map(([key, value], idx) => (
                <div key={idx}>
                  <span className="text-[#9CA3AF]">{key}:</span>
                  <span className="text-white ml-2">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setActiveIntegration(null)}
              className="px-6 py-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* API Documentation */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">API Documentation</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-2">Base URL</h4>
            <code className="text-[#00D1D1] text-sm">https://api.yourcompany.com/v1</code>
          </div>
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-2">Authentication</h4>
            <p className="text-[#9CA3AF] text-sm mb-2">Use Bearer token for API requests:</p>
            <code className="text-[#00D1D1] text-sm">Authorization: Bearer YOUR_API_KEY</code>
          </div>
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <h4 className="text-white font-semibold mb-2">Rate Limits</h4>
            <p className="text-[#9CA3AF] text-sm">1000 requests per hour per API key</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSettings;