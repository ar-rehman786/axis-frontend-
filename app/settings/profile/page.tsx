"use client";
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Upload } from 'lucide-react';

type Profile = {
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  bio: string;
  avatar: string | null;
};

type ProfileField = Exclude<keyof Profile, 'avatar'>;

const ProfileSettings = () => {
  const [profile, setProfile] = useState<Profile>({
    name: 'John Smith',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    title: 'Senior Loan Officer',
    department: 'Mortgage Lending',
    location: 'New York, NY',
    bio: 'Senior loan officer with 10+ years of experience in mortgage lending. Specialized in first-time homebuyer programs and refinancing.',
    avatar: null
  });

  const handleInputChange = (field: ProfileField, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        const result = ev.target?.result;
        setProfile({ ...profile, avatar: typeof result === 'string' ? result : null });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* Profile Overview */}
      <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center text-white text-2xl font-bold">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                profile.name.split(' ').map(n => n[0]).join('')
              )}
            </div>
            <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#00D1D1] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#00B8B8] transition-colors">
              <Camera className="w-4 h-4 text-white" />
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2">{profile.name}</h3>
            <p className="text-[#00D1D1] font-semibold mb-1">{profile.title}</p>
            <p className="text-[#9CA3AF] mb-4">{profile.department}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-white">{profile.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-white">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-white">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Personal Information</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Job Title</label>
            <input
              type="text"
              value={profile.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Department</label>
            <input
              type="text"
              value={profile.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#9CA3AF] text-sm mb-2">Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
            Update Profile
          </button>
        </div>
      </div>

      {/* Account Security */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Account Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
            <div>
              <h4 className="text-white font-semibold">Change Password</h4>
              <p className="text-[#9CA3AF] text-sm">Last changed 30 days ago</p>
            </div>
            <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
              Change
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg">
            <div>
              <h4 className="text-white font-semibold">Two-Factor Authentication</h4>
              <p className="text-[#9CA3AF] text-sm">Add an extra layer of security</p>
            </div>
            <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
              Enable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;