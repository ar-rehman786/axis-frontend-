import React, { useState } from 'react';
import { Bell, Phone, Mail, FileText, DollarSign, TrendingUp, User, Calendar, AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';

// Mock Data for Feeds
type LeadType = 'hot' | 'warm' | 'cold';

type Lead = {
  id: number;
  name: string;
  source: string;
  score: number;
  type: LeadType;
  time: string;
  status: string;
  phone: string;
  equity: string;
};

const leadFeedData: Lead[] = [
  { id: 1, name: 'Sarah Johnson', source: 'Website Form', score: 85, type: 'hot', time: '2 mins ago', status: 'new', phone: '(555) 123-4567', equity: '$425k' },
  { id: 2, name: 'Michael Chen', source: 'Realtor Referral', score: 72, type: 'warm', time: '15 mins ago', status: 'contacted', phone: '(555) 234-5678', equity: '$380k' },
  { id: 3, name: 'Emily Rodriguez', source: 'Facebook Ad', score: 65, type: 'warm', time: '1 hour ago', status: 'qualified', phone: '(555) 345-6789', equity: '$295k' },
  { id: 4, name: 'David Thompson', source: 'Google Ads', score: 45, type: 'cold', time: '2 hours ago', status: 'nurturing', phone: '(555) 456-7890', equity: '$185k' }
];

type ActivityType = 'call' | 'email' | 'document' | 'meeting' | 'sms' | 'note';

type Activity = {
  id: number;
  type: ActivityType;
  user: string;
  action: string;
  target: string;
  time: string;
  duration?: string;
  outcome?: string;
  subject?: string;
  status?: string;
  size?: string;
  date?: string;
  message?: string;
  note?: string;
};

const activityFeedData: Activity[] = [
  { id: 1, type: 'call', user: 'John Smith', action: 'called', target: 'Sarah Johnson', time: '10 mins ago', duration: '12:34', outcome: 'Interested' },
  { id: 2, type: 'email', user: 'Lisa Wang', action: 'sent email to', target: 'Michael Chen', time: '25 mins ago', subject: 'Refinance Options', status: 'opened' },
  { id: 3, type: 'document', user: 'Sarah Johnson', action: 'uploaded', target: 'Income Statement', time: '1 hour ago', size: '2.4 MB' },
  { id: 4, type: 'meeting', user: 'John Smith', action: 'scheduled meeting with', target: 'Emily Rodriguez', time: '2 hours ago', date: 'Nov 25, 2:00 PM' },
  { id: 5, type: 'sms', user: 'Lisa Wang', action: 'sent SMS to', target: 'David Thompson', time: '3 hours ago', message: 'Follow-up reminder' },
  { id: 6, type: 'note', user: 'John Smith', action: 'added note for', target: 'Sarah Johnson', time: '4 hours ago', note: 'Very interested in cash-out refi' }
];

type MarketImpact = 'positive' | 'negative' | 'neutral' | 'warning';

type Market = {
  id: number;
  type: string;
  title: string;
  description: string;
  time: string;
  impact: MarketImpact;
  source: string;
};

const marketFeedData: Market[] = [
  { id: 1, type: 'rate', title: 'Fed Rate Decision', description: 'Federal Reserve holds rates steady at 5.25-5.50%', time: '1 hour ago', impact: 'neutral', source: 'Fed Reserve' },
  { id: 2, type: 'housing', title: 'Housing Inventory Up', description: 'Raleigh-Durham inventory increased 8.5% month-over-month', time: '3 hours ago', impact: 'positive', source: 'MLS Data' },
  { id: 3, type: 'economic', title: 'Job Market Strong', description: 'Unemployment drops to 3.7%, boosting homebuyer confidence', time: '5 hours ago', impact: 'positive', source: 'BLS' },
  { id: 4, type: 'regulation', title: 'New Disclosure Rule', description: 'CFPB announces updated TRID requirements effective Q1 2026', time: '1 day ago', impact: 'warning', source: 'CFPB' }
];

type RefiPriority = 'high' | 'medium';

type RefiOpportunity = {
  id: number;
  name: string;
  reason: string;
  equity: string;
  ltv: string;
  rate: string;
  time: string;
  priority: RefiPriority;
};

const refiOpportunityData: RefiOpportunity[] = [
  { id: 1, name: 'Robert Williams', reason: 'Equity Threshold', equity: '$425k', ltv: '52%', rate: '6.5%', time: 'Today', priority: 'high' },
  { id: 2, name: 'Jennifer Martinez', reason: 'Loan Age Milestone', equity: '$380k', ltv: '58%', rate: '7.2%', time: 'Today', priority: 'high' },
  { id: 3, name: 'Thomas Anderson', reason: 'Credit Score Improved', equity: '$295k', ltv: '65%', rate: '6.8%', time: 'Yesterday', priority: 'medium' },
  { id: 4, name: 'Patricia Garcia', reason: 'Rate Drop Opportunity', equity: '$340k', ltv: '60%', rate: '7.5%', time: '2 days ago', priority: 'medium' }
];

type TriggerStatus = 'completed' | 'pending' | 'alert';

type AutomatedTrigger = {
  id: number;
  type: string;
  client: string;
  message: string;
  time: string;
  status: TriggerStatus;
};

const automatedTriggersData: AutomatedTrigger[] = [
  { id: 1, type: 'birthday', client: 'James Wilson', message: 'Birthday message sent', time: '8:00 AM', status: 'completed' },
  { id: 2, type: 'anniversary', client: 'Mary Brown', message: 'Loan anniversary - 2 years', time: '9:30 AM', status: 'completed' },
  { id: 3, type: 'followup', client: 'John Davis', message: 'Follow-up reminder triggered', time: '11:00 AM', status: 'pending' },
  { id: 4, type: 'ratelock', client: 'Susan Miller', message: 'Rate lock expires in 3 days', time: '2:00 PM', status: 'alert' }
];

const Feeds = () => {
  const [activeTab, setActiveTab] = useState('leads');

  const tabs = [
    { id: 'leads', label: 'Lead Feed', icon: User, count: leadFeedData.length },
    { id: 'activity', label: 'Activity Feed', icon: Bell, count: activityFeedData.length },
    { id: 'market', label: 'Market Intelligence', icon: TrendingUp, count: marketFeedData.length },
    { id: 'refi', label: 'Refi Opportunities', icon: DollarSign, count: refiOpportunityData.length },
    { id: 'triggers', label: 'Automated Triggers', icon: Clock, count: automatedTriggersData.length }
  ];

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Real-time Feeds</h1>
        <p className="text-[#9CA3AF]">Monitor all activity, leads, and market intelligence in real-time</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-800">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all relative ${
                activeTab === tab.id
                  ? 'text-[#00D1D1] border-b-2 border-[#00D1D1]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
              <span className={`ml-1 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-[#00D1D1]/20 text-[#00D1D1]' : 'bg-[#2A2A2A] text-[#9CA3AF]'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lead Feed Tab */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Incoming Leads</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
                Auto-Assign
              </button>
            </div>
          </div>

          {leadFeedData.map((lead) => (
            <div key={lead.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#00D1D1]/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center text-white font-bold text-lg">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">{lead.name}</h3>
                      <p className="text-[#9CA3AF] text-sm">{lead.source}</p>
                    </div>
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      lead.type === 'hot' ? 'bg-red-500/20 text-red-400' :
                      lead.type === 'warm' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {lead.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Lead Score</p>
                      <p className="text-white font-semibold text-lg">{lead.score}/100</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Phone</p>
                      <p className="text-white font-semibold">{lead.phone}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Equity</p>
                      <p className="text-[#00D1D1] font-semibold">{lead.equity}</p>
                    </div>
                    <div>
                      <p className="text-[#9CA3AF] text-xs mb-1">Status</p>
                      <p className="text-white font-semibold capitalize">{lead.status}</p>
                    </div>
                  </div>

                  <p className="text-[#9CA3AF] text-sm">⏱ {lead.time}</p>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                  <button className="p-3 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity Feed Tab */}
      {activeTab === 'activity' && (
        <div className="space-y-3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Team Activity Timeline</h2>
            <p className="text-[#9CA3AF] text-sm">Track all interactions and updates in real-time</p>
          </div>

          {activityFeedData.map((activity) => {
            const icons: Record<ActivityType, React.ReactNode> = {
              call: <Phone className="w-5 h-5" />,
              email: <Mail className="w-5 h-5" />,
              document: <FileText className="w-5 h-5" />,
              meeting: <Calendar className="w-5 h-5" />,
              sms: <MessageSquare className="w-5 h-5" />,
              note: <FileText className="w-5 h-5" />
            };

            return (
              <div key={activity.id} className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00D1D1]/20 flex items-center justify-center text-[#00D1D1]">
                    {icons[activity.type]}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-white mb-1">
                      <span className="font-semibold">{activity.user}</span>
                      <span className="text-[#9CA3AF]"> {activity.action} </span>
                      <span className="font-semibold">{activity.target}</span>
                    </p>
                    
                    {activity.duration && (
                      <p className="text-[#9CA3AF] text-sm">Duration: {activity.duration} • {activity.outcome}</p>
                    )}
                    {activity.subject && (
                      <p className="text-[#9CA3AF] text-sm">Subject: {activity.subject} • Status: {activity.status}</p>
                    )}
                    {activity.size && (
                      <p className="text-[#9CA3AF] text-sm">File size: {activity.size}</p>
                    )}
                    {activity.date && (
                      <p className="text-[#9CA3AF] text-sm">Scheduled: {activity.date}</p>
                    )}
                    {activity.message && (
                      <p className="text-[#9CA3AF] text-sm">{activity.message}</p>
                    )}
                    {activity.note && (
                      <p className="text-[#9CA3AF] text-sm">"{activity.note}"</p>
                    )}
                    
                    <p className="text-[#9CA3AF] text-xs mt-2">⏱ {activity.time}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Market Intelligence Tab */}
      {activeTab === 'market' && (
        <div className="space-y-4">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Market Intelligence</h2>
            <p className="text-[#9CA3AF] text-sm">Stay informed on rates, housing trends, and regulatory changes</p>
          </div>

          {marketFeedData.map((news) => (
            <div key={news.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  news.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                  news.impact === 'negative' ? 'bg-red-500/20 text-red-400' :
                  news.impact === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  <TrendingUp className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">{news.title}</h3>
                      <p className="text-[#9CA3AF]">{news.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-4 ${
                      news.impact === 'positive' ? 'bg-green-500/20 text-green-400' :
                      news.impact === 'negative' ? 'bg-red-500/20 text-red-400' :
                      news.impact === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {news.impact.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                    <span>Source: {news.source}</span>
                    <span>•</span>
                    <span>⏱ {news.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refi Opportunities Tab */}
      {activeTab === 'refi' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Refinance Opportunities</h2>
              <p className="text-[#9CA3AF] text-sm">Clients ready for refinancing based on equity, rates, and timing</p>
            </div>
            <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
              Export List
            </button>
          </div>

          {refiOpportunityData.map((opp) => (
            <div key={opp.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#00D1D1]/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center text-white font-bold">
                    {opp.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-semibold text-lg">{opp.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        opp.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {opp.priority.toUpperCase()} PRIORITY
                      </span>
                    </div>
                    <p className="text-[#9CA3AF] text-sm mb-3">{opp.reason}</p>
                    
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-[#9CA3AF] text-xs">Equity</p>
                        <p className="text-[#00D1D1] font-semibold">{opp.equity}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs">LTV</p>
                        <p className="text-white font-semibold">{opp.ltv}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs">Current Rate</p>
                        <p className="text-white font-semibold">{opp.rate}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF] text-xs">Triggered</p>
                        <p className="text-white font-semibold">{opp.time}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="px-5 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
                    Contact Now
                  </button>
                  <button className="px-5 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Automated Triggers Tab */}
      {activeTab === 'triggers' && (
        <div className="space-y-3">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white mb-2">Automated Triggers</h2>
            <p className="text-[#9CA3AF] text-sm">System-generated events and automated communications</p>
          </div>

          {automatedTriggersData.map((trigger) => {
            const statusConfig: Record<TriggerStatus, {
              bg: string;
              text: string;
              icon: React.ComponentType<{ className?: string }>;
            }> = {
              completed: { bg: 'bg-green-500/20', text: 'text-green-400', icon: CheckCircle },
              pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', icon: Clock },
              alert: { bg: 'bg-red-500/20', text: 'text-red-400', icon: AlertCircle }
            };

            const config = statusConfig[trigger.status];
            const StatusIcon = config.icon;

            return (
              <div key={trigger.id} className="bg-[#1A1A1A] border border-gray-800 rounded-lg p-5 hover:border-gray-700 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-10 h-10 rounded-full ${config.bg} ${config.text} flex items-center justify-center`}>
                      <StatusIcon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-white font-semibold">{trigger.client}</h3>
                        <span className="text-[#9CA3AF] text-sm">• {trigger.time}</span>
                      </div>
                      <p className="text-[#9CA3AF] text-sm">{trigger.message}</p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
                    {trigger.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Feeds;