"use client"
import React, { useState } from 'react';
import { Shield, Key, Users, Plus, Trash2, Edit, Check } from 'lucide-react';

type NewRole = {
  name: string;
  description: string;
  permissions: string[];
};

const RolesSettings = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full system access and control',
      userCount: 2,
      permissions: [
        'Manage all users',
        'Configure system settings',
        'Access all reports',
        'Modify roles & permissions',
        'View all data',
        'Export any data'
      ]
    },
    {
      id: 2,
      name: 'Manager',
      description: 'Team oversight and management',
      userCount: 4,
      permissions: [
        'View team performance',
        'Access team reports',
        'Manage team members',
        'Approve applications',
        'View all leads',
        'Export team data'
      ]
    },
    {
      id: 3,
      name: 'Loan Officer',
      description: 'Standard loan officer access',
      userCount: 12,
      permissions: [
        'View assigned leads',
        'Contact clients',
        'Submit applications',
        'Upload documents',
        'View own reports',
        'Export own data'
      ]
    },
    {
      id: 4,
      name: 'Processor',
      description: 'Loan processing access',
      userCount: 6,
      permissions: [
        'View assigned loans',
        'Upload documents',
        'Process applications',
        'Communicate with clients',
        'Basic reporting',
        'Limited data export'
      ]
    }
  ]);

  const allPermissions = [
    'Manage users',
    'Manage roles',
    'View all leads',
    'Edit all leads',
    'Export data',
    'System configuration',
    'Billing management',
    'API access',
    'Advanced reporting',
    'Audit logs',
    'Email templates',
    'Marketing campaigns'
  ];

  const [newRole, setNewRole] = useState<NewRole>({
    name: '',
    description: '',
    permissions: []
  });

  const handlePermissionToggle = (roleId: number, permission: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        const hasPermission = role.permissions.includes(permission);
        return {
          ...role,
          permissions: hasPermission 
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission]
        };
      }
      return role;
    }));
  };

  const handleCreateRole = () => {
    if (newRole.name.trim()) {
      const newRoleObj = {
        id: roles.length + 1,
        name: newRole.name,
        description: newRole.description,
        userCount: 0,
        permissions: newRole.permissions
      };
      setRoles([...roles, newRoleObj]);
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  return (
    <div className="space-y-6 p-14">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Roles & Permissions</h2>
          <p className="text-[#9CA3AF]">Manage user roles and system permissions</p>
        </div>
        <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Role
        </button>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#00D1D1]/30 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1D1] to-[#00B8B8] flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-xl">{role.name}</h3>
                    <p className="text-[#9CA3AF] text-sm">{role.userCount} users</p>
                  </div>
                </div>
                <p className="text-[#9CA3AF] text-sm">{role.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2">Permissions</h4>
              <div className="flex flex-wrap gap-2">
                {role.permissions.slice(0, 4).map((permission, idx) => (
                  <span key={idx} className="px-3 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded-full text-xs">
                    {permission}
                  </span>
                ))}
                {role.permissions.length > 4 && (
                  <span className="px-3 py-1 bg-[#2A2A2A] text-[#9CA3AF] rounded-full text-xs">
                    +{role.permissions.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-[#9CA3AF] text-sm">{role.permissions.length} permissions</span>
              <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Matrix */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Permissions Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Permission</th>
                {roles.map((role) => (
                  <th key={role.id} className="text-center py-3 px-4 text-[#9CA3AF] font-semibold">{role.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allPermissions.map((permission, idx) => (
                <tr key={idx} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                  <td className="py-3 px-4 text-white">{permission}</td>
                  {roles.map((role) => (
                    <td key={role.id} className="py-3 px-4 text-center">
                      <div className="flex justify-center">
                        <input
                          type="checkbox"
                          checked={role.permissions.includes(permission)}
                          onChange={() => handlePermissionToggle(role.id, permission)}
                          className="w-5 h-5 accent-[#00D1D1] cursor-pointer"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create New Role */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
        <h3 className="text-white text-xl font-semibold mb-4">Create New Role</h3>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
              placeholder="e.g., Analyst, Support"
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
          <div>
            <label className="block text-[#9CA3AF] text-sm mb-2">Description</label>
            <input
              type="text"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              placeholder="Brief description of role"
              className="w-full px-4 py-3 bg-[#2A2A2A] text-white rounded-lg border border-gray-700 focus:border-[#00D1D1] outline-none"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[#9CA3AF] text-sm mb-3">Select Permissions</label>
          <div className="grid grid-cols-3 gap-3">
            {allPermissions.map((permission, idx) => (
              <label key={idx} className="flex items-center gap-2 p-3 bg-[#2A2A2A] rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={newRole.permissions.includes(permission)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] });
                    } else {
                      setNewRole({ ...newRole, permissions: newRole.permissions.filter(p => p !== permission) });
                    }
                  }}
                  className="w-4 h-4 accent-[#00D1D1]"
                />
                <span className="text-white text-sm">{permission}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCreateRole}
            disabled={!newRole.name.trim()}
            className="px-6 py-3 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesSettings;