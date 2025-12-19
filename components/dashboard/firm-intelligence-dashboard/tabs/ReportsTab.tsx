import React from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

export default function ReportsTab() {
  const reports = [
    { 
      name: 'Team Performance Report', 
      date: '2024-12-01', 
      type: 'PDF', 
      size: '2.4 MB',
      category: 'Performance'
    },
    { 
      name: 'Revenue Analysis Q4', 
      date: '2024-12-08', 
      type: 'Excel', 
      size: '5.1 MB',
      category: 'Financial'
    },
    { 
      name: 'Market Opportunity Summary', 
      date: '2024-12-07', 
      type: 'PDF', 
      size: '1.8 MB',
      category: 'Market'
    },
    { 
      name: 'Compliance Audit Report', 
      date: '2024-12-06', 
      type: 'PDF', 
      size: '3.2 MB',
      category: 'Compliance'
    },
    { 
      name: 'Agent Activity Log', 
      date: '2024-12-05', 
      type: 'CSV', 
      size: '890 KB',
      category: 'Activity'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Reports & Analytics</h2>
        <button className="px-4 py-2 bg-[#00D4D4] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium">
          Generate Report
        </button>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <div className="text-xs text-gray-400">Total Reports</div>
          </div>
          <div className="text-2xl font-bold text-white">18</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-5 h-5 text-green-400" />
            <div className="text-xs text-gray-400">Downloads</div>
          </div>
          <div className="text-2xl font-bold text-white">342</div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-teal-400" />
            <div className="text-xs text-gray-400">This Month</div>
          </div>
          <div className="text-2xl font-bold text-white">5</div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Report Name</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Category</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Date</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Size</th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {reports.map((report, idx) => (
              <tr key={idx} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white">{report.name}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{report.category}</td>
                <td className="px-6 py-4 text-sm text-gray-400">{report.date}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30">
                    {report.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{report.size}</td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1 bg-[#00D4D4] text-black rounded hover:bg-[#00BCC9] transition-colors text-xs font-medium flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}