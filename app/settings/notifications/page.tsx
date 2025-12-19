"use client";
import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Smartphone, Clock, Zap, Check, AlertCircle, Users, DollarSign, Shield } from 'lucide-react';

type ChannelKey = 'email' | 'sms' | 'push' | 'inApp';
type EventChannelKey = 'email' | 'sms' | 'push';

type ChannelSettings = {
  enabled: boolean;
  frequency: 'instant' | 'daily' | 'weekly';
};

type ChannelsState = Record<ChannelKey, ChannelSettings>;

type NotificationEvent = {
  id: string;
  name: string;
  description: string;
} & Record<EventChannelKey, boolean>;

type EventCategory = {
  id: string;
  name: string;
  icon: any;
  enabled: boolean;
  events: NotificationEvent[];
};

const NotificationsSettings = () => {
  const [channels, setChannels] = useState<ChannelsState>({
    email: { enabled: true, frequency: 'instant' },
    sms: { enabled: false, frequency: 'instant' },
    push: { enabled: true, frequency: 'instant' },
    inApp: { enabled: true, frequency: 'instant' }
  });

  const [eventCategories, setEventCategories] = useState<EventCategory[]>([
    {
      id: 'leads',
      name: 'Lead Activities',
      icon: Users,
      enabled: true,
      events: [
        { id: 'new_lead', name: 'New lead assigned', description: 'When a new lead is assigned to you', email: true, sms: false, push: true },
        { id: 'lead_contacted', name: 'Lead contacted', description: 'When a lead is contacted', email: true, sms: false, push: false },
        { id: 'lead_converted', name: 'Lead converted', description: 'When a lead becomes a client', email: true, sms: true, push: true }
      ]
    },
    {
      id: 'applications',
      name: 'Application Updates',
      icon: DollarSign,
      enabled: true,
      events: [
        { id: 'app_submitted', name: 'Application submitted', description: 'When client submits application', email: true, sms: false, push: true },
        { id: 'app_approved', name: 'Application approved', description: 'When application is approved', email: true, sms: true, push: true },
        { id: 'app_rejected', name: 'Application rejected', description: 'When application is rejected', email: true, sms: false, push: true }
      ]
    },
    {
      id: 'system',
      name: 'System Alerts',
      icon: Shield,
      enabled: true,
      events: [
        { id: 'system_error', name: 'System error', description: 'Critical system errors', email: true, sms: true, push: true },
        { id: 'maintenance', name: 'Maintenance notice', description: 'Scheduled maintenance alerts', email: true, sms: false, push: false },
        { id: 'security', name: 'Security alert', description: 'Security-related notifications', email: true, sms: true, push: true }
      ]
    }
  ]);

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '07:00',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  });

  const toggleChannel = (channel: ChannelKey) => {
    setChannels({
      ...channels,
      [channel]: {
        ...channels[channel],
        enabled: !channels[channel].enabled
      }
    });
  };

  const toggleEventNotification = (categoryId: string, eventId: string, channel: EventChannelKey) => {
    setEventCategories(eventCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          events: category.events.map(event => {
            if (event.id === eventId) {
              return {
                ...event,
                [channel]: !event[channel]
              };
            }
            return event;
          })
        };
      }
      return category;
    }));
  };

  const toggleCategory = (categoryId: string) => {
    setEventCategories(eventCategories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          enabled: !category.enabled,
          events: category.events.map(event => ({
            ...event,
            email: !category.enabled,
            sms: !category.enabled,
            push: !category.enabled
          }))
        };
      }
      return category;
    }));
  };

  const getChannelIcon = (channel: ChannelKey) => {
    switch(channel) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'push': return Smartphone;
      case 'inApp': return Bell;
      default: return Bell;
    }
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Notification Settings</h2>
          <p className="text-[#9CA3AF]">Manage how and when you receive notifications</p>
        </div>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
          Save Preferences
        </button>
      </div>

      {/* Notification Channels */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Notification Channels</h3>
        <div className="grid grid-cols-4 gap-6">
          {(Object.entries(channels) as [ChannelKey, ChannelSettings][]).map(([channel, settings]) => {
            const Icon = getChannelIcon(channel);
            return (
              <div key={channel} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${settings.enabled ? 'bg-[#00D1D1]/20' : 'bg-gray-700'} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${settings.enabled ? 'text-[#00D1D1]' : 'text-gray-400'}`} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold capitalize">{channel}</h4>
                      <p className="text-[#9CA3AF] text-xs">Frequency: {settings.frequency}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.enabled}
                      onChange={() => toggleChannel(channel)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D1D1]"></div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event Categories */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Event Categories</h3>
        <div className="space-y-6">
          {eventCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#00D1D1]" />
                    <h4 className="text-white font-semibold text-lg">{category.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${category.enabled ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {category.enabled ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${category.enabled ? 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30' : 'bg-[#00D1D1] text-white hover:bg-[#00B8B8]'}`}
                  >
                    {category.enabled ? 'Disable All' : 'Enable All'}
                  </button>
                </div>

                <div className="space-y-3">
                  {category.events.map((event) => (
                    <div key={event.id} className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h5 className="text-white font-medium">{event.name}</h5>
                          <p className="text-[#9CA3AF] text-sm">{event.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <input
                              type="checkbox"
                              checked={event.email}
                              onChange={() => toggleEventNotification(category.id, event.id, 'email')}
                              className="w-4 h-4 accent-[#00D1D1]"
                            />
                          </label>
                          <label className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <input
                              type="checkbox"
                              checked={event.sms}
                              onChange={() => toggleEventNotification(category.id, event.id, 'sms')}
                              className="w-4 h-4 accent-[#00D1D1]"
                            />
                          </label>
                          <label className="flex items-center gap-2">
                            <Smartphone className="w-4 h-4 text-gray-400" />
                            <input
                              type="checkbox"
                              checked={event.push}
                              onChange={() => toggleEventNotification(category.id, event.id, 'push')}
                              className="w-4 h-4 accent-[#00D1D1]"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white text-xl font-semibold">Quiet Hours</h3>
            <p className="text-[#9CA3AF]">Set times when you don't want to receive notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={quietHours.enabled}
              onChange={() => setQuietHours({...quietHours, enabled: !quietHours.enabled})}
              className="sr-only peer" 
            />
            <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D1D1]"></div>
          </label>
        </div>

        {quietHours.enabled && (
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-2">Start Time</label>
              <input
                type="time"
                value={quietHours.start}
                onChange={(e) => setQuietHours({...quietHours, start: e.target.value})}
                className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-2">End Time</label>
              <input
                type="time"
                value={quietHours.end}
                onChange={(e) => setQuietHours({...quietHours, end: e.target.value})}
                className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
              />
            </div>
            <div>
              <label className="block text-[#9CA3AF] text-sm mb-2">Days</label>
              <div className="flex flex-wrap gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <label key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={quietHours.days.includes(day)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setQuietHours({...quietHours, days: [...quietHours.days, day]});
                        } else {
                          setQuietHours({...quietHours, days: quietHours.days.filter(d => d !== day)});
                        }
                      }}
                      className="hidden"
                    />
                    <span className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${quietHours.days.includes(day) ? 'bg-[#00D1D1] text-white' : 'bg-[#2A2A2A] text-gray-400 hover:bg-gray-700'}`}>
                      {day}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Preview */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Notification Preview</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#00D1D1]/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-[#00D1D1]" />
              </div>
              <div>
                <h4 className="text-white font-semibold">New Lead Assigned</h4>
                <p className="text-[#9CA3AF] text-sm">Sarah Johnson - $425,000 loan</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm">A new lead has been assigned to you. Please contact within 24 hours.</p>
          </div>
          
          <div className="p-4 bg-[#2A2A2A] rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h4 className="text-white font-semibold">Application Approved</h4>
                <p className="text-[#9CA3AF] text-sm">Michael Chen - Refinance</p>
              </div>
            </div>
            <p className="text-[#9CA3AF] text-sm">The application has been approved. Please proceed with closing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSettings;