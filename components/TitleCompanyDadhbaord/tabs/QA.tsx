import React, { useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Search } from 'lucide-react';

// ==================== MOCK DATA ====================
const mockData = {
  // QA Metrics
  qaMetrics: {
    validRecords: { value: 1189, total: 1247, status: 'good' },
    dataWarnings: { value: 42, status: 'warning' },
    criticalErrors: { value: 16, status: 'error' },
    completionRate: { value: 95.4, status: 'good' }
  },

  // Issue Counts by Type
  issueCounts: {
    all: 58,
    missing: 24,
    invalid: 18,
    duplicate: 16
  },

  // Issues Table Data
  issues: [
    {
      id: 1,
      status: 'error',
      issueType: 'Missing Data',
      record: '123 Oak Street',
      field: 'Property Value',
      description: 'Required field is empty',
      detected: '2 hours ago',
      action: 'Fix'
    },
    {
      id: 2,
      status: 'error',
      issueType: 'Invalid Format',
      record: '456 Elm Avenue',
      field: 'ZIP Code',
      description: 'Invalid ZIP format: "2760"',
      detected: '3 hours ago',
      action: 'Fix'
    },
    {
      id: 3,
      status: 'error',
      issueType: 'Missing Data',
      record: '789 Pine Boulevard',
      field: 'Owner Name',
      description: 'Owner information is missing',
      detected: '5 hours ago',
      action: 'Fix'
    },
    {
      id: 4,
      status: 'error',
      issueType: 'Invalid Format',
      record: '234 Maple Court',
      field: 'Phone Number',
      description: 'Invalid phone format: "555-123"',
      detected: '6 hours ago',
      action: 'Fix'
    },
    {
      id: 5,
      status: 'warning',
      issueType: 'Duplicate',
      record: '567 Cedar Lane',
      field: 'Address',
      description: 'Possible duplicate with record #342',
      detected: '1 day ago',
      action: 'Review'
    },
    {
      id: 6,
      status: 'warning',
      issueType: 'Data Warning',
      record: '890 Birch Drive',
      field: 'Equity Percent',
      description: 'Unusually high equity: 98%',
      detected: '1 day ago',
      action: 'Verify'
    },
    {
      id: 7,
      status: 'warning',
      issueType: 'Duplicate',
      record: '123 Willow Way',
      field: 'Owner Name',
      description: 'Similar name found in record #156',
      detected: '1 day ago',
      action: 'Review'
    },
    {
      id: 8,
      status: 'warning',
      issueType: 'Data Warning',
      record: '456 Spruce Street',
      field: 'Property Value',
      description: 'Value significantly below market average',
      detected: '2 days ago',
      action: 'Verify'
    },
    {
      id: 9,
      status: 'valid',
      issueType: 'Valid',
      record: '789 Ash Avenue',
      field: 'All Fields',
      description: 'Passed all validation checks',
      detected: '2 days ago',
      action: 'None'
    },
    {
      id: 10,
      status: 'valid',
      issueType: 'Valid',
      record: '234 Poplar Place',
      field: 'All Fields',
      description: 'Passed all validation checks',
      detected: '3 days ago',
      action: 'None'
    }
  ],

  // Validation Rules
  validationRules: [
    {
      id: 1,
      name: 'Required Fields Check',
      description: 'Address, Value, Equity must not be empty',
      status: 'active',
      totalChecks: 1247,
      passed: 1223,
      failed: 24
    },
    {
      id: 2,
      name: 'Format Validation',
      description: 'ZIP codes, phone numbers, emails must be valid',
      status: 'active',
      totalChecks: 1247,
      passed: 1229,
      failed: 18
    },
    {
      id: 3,
      name: 'Duplicate Detection',
      description: 'Identify duplicate addresses or owner names',
      status: 'active',
      totalChecks: 1247,
      passed: 1231,
      failed: 16
    },
    {
      id: 4,
      name: 'Range Validation',
      description: 'Values must be within expected ranges',
      status: 'active',
      totalChecks: 1247,
      passed: 1205,
      failed: 42
    }
  ]
};

// ==================== INTERFACES ====================
interface QAMetricCardProps {
  title: string;
  value: string | number;
  status: 'good' | 'warning' | 'error';
  icon: React.ElementType;
}

interface Issue {
  id: number;
  status: 'error' | 'warning' | 'valid';
  issueType: string;
  record: string;
  field: string;
  description: string;
  detected: string;
  action: string;
}

interface ValidationRule {
  id: number;
  name: string;
  description: string;
  status: string;
  totalChecks: number;
  passed: number;
  failed: number;
}

// ==================== COMPONENTS ====================
const QAMetricCard: React.FC<QAMetricCardProps> = ({ title, value, status, icon: Icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good': return 'text-green-400 bg-green-500/10';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10';
      case 'error': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${getStatusColor()}`}>
          <Icon size={24} />
        </div>
        <span className={`text-2xl font-bold ${
          status === 'good' ? 'text-green-400' :
          status === 'warning' ? 'text-yellow-400' :
          'text-red-400'
        }`}>
          {value}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const QATab: React.FC = () => {
  const [selectedIssue, setSelectedIssue] = useState<'all' | 'missing' | 'invalid' | 'duplicate'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter issues based on selected type and search query
  const filteredIssues = mockData.issues.filter(issue => {
    const matchesType = selectedIssue === 'all' || 
      (selectedIssue === 'missing' && issue.issueType === 'Missing Data') ||
      (selectedIssue === 'invalid' && issue.issueType === 'Invalid Format') ||
      (selectedIssue === 'duplicate' && issue.issueType === 'Duplicate');

    const matchesSearch = searchQuery === '' ||
      issue.record.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.issueType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'error': return <XCircle className="text-red-400" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'valid': return <CheckCircle className="text-green-400" size={20} />;
      default: return null;
    }
  };

  const getIssueTypeBadge = (issueType: string) => {
    if (issueType === 'Missing Data' || issueType === 'Invalid Format') {
      return 'bg-red-500/20 text-red-400';
    } else if (issueType === 'Duplicate' || issueType === 'Data Warning') {
      return 'bg-yellow-500/20 text-yellow-400';
    } else if (issueType === 'Valid') {
      return 'bg-green-500/20 text-green-400';
    }
    return 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-1">Quality Assurance</h2>
          <p className="text-gray-400">Data validation, accuracy checks, and issue resolution</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
          <RefreshCw size={18} />
          <span className="font-medium">Run All Checks</span>
        </button>
      </div>

      {/* QA Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <QAMetricCard
          title="Valid Records"
          value={mockData.qaMetrics.validRecords.value.toLocaleString()}
          status="good"
          icon={CheckCircle}
        />
        <QAMetricCard
          title="Data Warnings"
          value={mockData.qaMetrics.dataWarnings.value}
          status="warning"
          icon={AlertTriangle}
        />
        <QAMetricCard
          title="Critical Errors"
          value={mockData.qaMetrics.criticalErrors.value}
          status="error"
          icon={XCircle}
        />
        <QAMetricCard
          title="Completion Rate"
          value={`${mockData.qaMetrics.completionRate.value}%`}
          status="good"
          icon={CheckCircle}
        />
      </div>

      {/* Issue Filter */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <label className="text-sm font-medium">Filter by Issue Type:</label>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedIssue('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIssue === 'all'
                  ? 'bg-teal-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              All Issues ({mockData.issueCounts.all})
            </button>
            <button
              onClick={() => setSelectedIssue('missing')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIssue === 'missing'
                  ? 'bg-teal-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              Missing Data ({mockData.issueCounts.missing})
            </button>
            <button
              onClick={() => setSelectedIssue('invalid')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIssue === 'invalid'
                  ? 'bg-teal-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              Invalid Format ({mockData.issueCounts.invalid})
            </button>
            <button
              onClick={() => setSelectedIssue('duplicate')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedIssue === 'duplicate'
                  ? 'bg-teal-500 text-white'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              Duplicates ({mockData.issueCounts.duplicate})
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search by address, record ID, or issue type..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing <span className="text-white font-medium">{filteredIssues.length}</span> of{' '}
        <span className="text-white font-medium">{mockData.issues.length}</span> issues
      </div>

      {/* Issues Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-800/50">
              <tr className="text-left text-sm text-gray-400">
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Issue Type</th>
                <th className="p-4 font-medium">Record</th>
                <th className="p-4 font-medium">Field</th>
                <th className="p-4 font-medium">Description</th>
                <th className="p-4 font-medium">Detected</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredIssues.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No issues found matching your criteria
                  </td>
                </tr>
              ) : (
                filteredIssues.map((issue) => (
                  <tr key={issue.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="p-4">
                      {getStatusIcon(issue.status)}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${getIssueTypeBadge(issue.issueType)}`}>
                        {issue.issueType}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{issue.record}</td>
                    <td className="p-4">{issue.field}</td>
                    <td className="p-4 text-gray-400">{issue.description}</td>
                    <td className="p-4 text-gray-400">{issue.detected}</td>
                    <td className="p-4">
                      {issue.action !== 'None' ? (
                        <button className="text-teal-400 hover:text-teal-300">{issue.action}</button>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Rules */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Active Validation Rules</h3>
        <div className="space-y-3">
          {mockData.validationRules.map((rule: ValidationRule) => (
            <div key={rule.id} className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-b-0">
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle className="text-green-400" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-xs text-gray-400">{rule.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs">
                    <span className="text-green-400">✓ {rule.passed} passed</span>
                    <span className="text-red-400">✗ {rule.failed} failed</span>
                    <span className="text-gray-400">
                      ({((rule.passed / rule.totalChecks) * 100).toFixed(1)}% success rate)
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-sm text-teal-400 font-medium">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Summary Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-white">
              {mockData.qaMetrics.validRecords.total}
            </p>
            <p className="text-sm text-gray-400">Total Records</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">
              {mockData.qaMetrics.validRecords.value}
            </p>
            <p className="text-sm text-gray-400">Valid Records</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400">
              {mockData.qaMetrics.dataWarnings.value}
            </p>
            <p className="text-sm text-gray-400">Warnings</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-400">
              {mockData.qaMetrics.criticalErrors.value}
            </p>
            <p className="text-sm text-gray-400">Critical Errors</p>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg font-medium transition-colors">
          Fix All Auto-Correctable Issues
        </button>
        <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors">
          Export Issue Report
        </button>
        <button className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors">
          Mark All as Reviewed
        </button>
      </div>
    </div>
  );
};

export default QATab;