import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Clock, AlertCircle, Download, Trash2, File, Table } from 'lucide-react';

// Mock Data
const uploadHistory: Array<{
  id: number;
  fileName: string;
  uploadDate: string;
  status: 'completed' | 'processing' | 'failed';
  records: number;
  errors: number;
  user: string;
  size: string;
}> = [
  { 
    id: 1, 
    fileName: 'Q4_Leads_November.csv', 
    uploadDate: '2025-11-20 14:30', 
    status: 'completed', 
    records: 1247, 
    errors: 0, 
    user: 'John Smith',
    size: '2.4 MB'
  },
  { 
    id: 2, 
    fileName: 'Realtor_Referrals_Q3.xlsx', 
    uploadDate: '2025-11-18 09:15', 
    status: 'completed', 
    records: 856, 
    errors: 12, 
    user: 'Lisa Wang',
    size: '1.8 MB'
  },
  { 
    id: 3, 
    fileName: 'Property_Data_Update.csv', 
    uploadDate: '2025-11-15 16:45', 
    status: 'processing', 
    records: 0, 
    errors: 0, 
    user: 'Mike Johnson',
    size: '4.2 MB'
  },
  { 
    id: 4, 
    fileName: 'Client_Documents_Batch.zip', 
    uploadDate: '2025-11-12 11:20', 
    status: 'failed', 
    records: 0, 
    errors: 45, 
    user: 'Sarah Chen',
    size: '15.6 MB'
  }
];

const documentTypes: Array<{
  type: string;
  count: number;
  icon: string;
}> = [
  { type: '1003 Application', count: 234, icon: '📋' },
  { type: 'Income Verification', count: 189, icon: '💰' },
  { type: 'Credit Reports', count: 312, icon: '📊' },
  { type: 'Appraisals', count: 156, icon: '🏠' },
  { type: 'Closing Documents', count: 98, icon: '📝' },
  { type: 'Other', count: 67, icon: '📎' }
];

interface UploadsProps {
  // Add any props that the Uploads component might receive
}

const Uploads: React.FC<UploadsProps> = () => {
  const [activeTab, setActiveTab] = useState<'bulk-import' | 'documents' | 'history'>('bulk-import');
  const [dragActive, setDragActive] = useState(false);

  const tabs: Array<{
    id: 'bulk-import' | 'documents' | 'history';
    label: string;
    icon: any;
  }> = [
    { id: 'bulk-import', label: 'Bulk Import', icon: Table },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'history', label: 'Upload History', icon: Clock }
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Data Uploads & Management</h1>
        <p className="text-[#9CA3AF]">Import leads, documents, and manage your data</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-gray-800">
        {tabs.map((tab: {
      id: 'bulk-import' | 'documents' | 'history';
      label: string;
      icon: any;
    }) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-[#00D1D1] border-b-2 border-[#00D1D1]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Bulk Import Tab */}
      {activeTab === 'bulk-import' && (
        <div className="space-y-6">
          {/* Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-[#00D1D1] bg-[#00D1D1]/10' 
                : 'border-gray-700 bg-[#1A1A1A] hover:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-16 h-16 text-[#00D1D1] mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">
              Drop your CSV or Excel file here
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              or click to browse from your computer
            </p>
            <button className="px-6 py-3 bg-[#00D1D1] text-white font-semibold rounded-lg hover:bg-[#00B8B8] transition-colors">
              Select File
            </button>
            <p className="text-[#9CA3AF] text-sm mt-4">
              Supported formats: CSV, XLSX, XLS (Max 50MB)
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Total Uploads</p>
              <h3 className="text-3xl font-bold text-white">247</h3>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Records Imported</p>
              <h3 className="text-3xl font-bold text-white">45.2K</h3>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Success Rate</p>
              <h3 className="text-3xl font-bold text-white">96.8%</h3>
            </div>
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
              <p className="text-[#9CA3AF] text-sm mb-2">Errors This Month</p>
              <h3 className="text-3xl font-bold text-white">142</h3>
            </div>
          </div>

          {/* Upload Instructions */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Upload Guidelines</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-[#00D1D1] font-semibold mb-3">Required Fields</h4>
                <ul className="space-y-2 text-[#9CA3AF]">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    First Name, Last Name
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Phone Number or Email
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Property Address
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    Loan Amount (optional)
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-[#00D1D1] font-semibold mb-3">Data Validation</h4>
                <ul className="space-y-2 text-[#9CA3AF]">
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Phone numbers: (555) 123-4567 format
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Emails: Valid email format
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Duplicates: Auto-detected & merged
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    Missing data: Flagged for review
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Field Mapping Preview */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Field Mapping Tool</h3>
            <p className="text-[#9CA3AF] mb-4">Map your CSV columns to system fields</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold w-40">First Name</span>
                <span className="text-[#9CA3AF]">→</span>
                <select className="flex-1 px-4 py-2 bg-black text-white rounded-lg border border-gray-700">
                  <option>Select Column</option>
                  <option>first_name</option>
                  <option>fname</option>
                  <option>FirstName</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold w-40">Last Name</span>
                <span className="text-[#9CA3AF]">→</span>
                <select className="flex-1 px-4 py-2 bg-black text-white rounded-lg border border-gray-700">
                  <option>Select Column</option>
                  <option>last_name</option>
                  <option>lname</option>
                  <option>LastName</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-[#2A2A2A] rounded-lg">
                <span className="text-white font-semibold w-40">Phone</span>
                <span className="text-[#9CA3AF]">→</span>
                <select className="flex-1 px-4 py-2 bg-black text-white rounded-lg border border-gray-700">
                  <option>Select Column</option>
                  <option>phone</option>
                  <option>phone_number</option>
                  <option>mobile</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button className="px-6 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                Save Mapping
              </button>
              <button className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold">
                Start Import
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Document Upload Area */}
          <div 
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
              dragActive 
                ? 'border-[#00D1D1] bg-[#00D1D1]/10' 
                : 'border-gray-700 bg-[#1A1A1A] hover:border-gray-600'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileText className="w-16 h-16 text-[#00D1D1] mx-auto mb-4" />
            <h3 className="text-white text-xl font-semibold mb-2">
              Upload Client Documents
            </h3>
            <p className="text-[#9CA3AF] mb-6">
              1003 Forms, Income Verification, Credit Reports, Appraisals
            </p>
            <button className="px-6 py-3 bg-[#00D1D1] text-white font-semibold rounded-lg hover:bg-[#00B8B8] transition-colors">
              Select Documents
            </button>
            <p className="text-[#9CA3AF] text-sm mt-4">
              Supported: PDF, DOC, DOCX, JPG, PNG (Max 25MB per file)
            </p>
          </div>

          {/* Document Types Grid */}
          <div className="grid grid-cols-3 gap-6">
            {documentTypes.map((doc: {
        type: string;
        count: number;
        icon: string;
      }) => (
              <div key={doc.type} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 hover:border-[#00D1D1]/30 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{doc.icon}</span>
                  <span className="text-2xl font-bold text-white">{doc.count}</span>
                </div>
                <h4 className="text-white font-semibold">{doc.type}</h4>
                <p className="text-[#9CA3AF] text-sm mt-1">Documents uploaded</p>
              </div>
            ))}
          </div>

          {/* Recent Documents */}
          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white text-lg font-semibold mb-4">Recent Documents</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah_Johnson_1003.pdf', type: 'Application', date: '2 hours ago', size: '1.2 MB' },
                { name: 'Income_Verification_Chen.pdf', type: 'Income', date: '5 hours ago', size: '890 KB' },
                { name: 'Credit_Report_Williams.pdf', type: 'Credit', date: '1 day ago', size: '2.4 MB' },
                { name: 'Appraisal_Martinez.pdf', type: 'Appraisal', date: '2 days ago', size: '3.1 MB' }
              ].map((doc: {
        name: string;
        type: string;
        date: string;
        size: string;
      }, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-[#2A2A2A] rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <File className="w-10 h-10 text-[#00D1D1]" />
                    <div>
                      <h4 className="text-white font-semibold">{doc.name}</h4>
                      <p className="text-[#9CA3AF] text-sm">{doc.type} • {doc.size} • {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-[#00D1D1] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-red-400 hover:bg-[#2A2A2A] rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Upload History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">Upload History</h2>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors">
                Export Log
              </button>
            </div>
          </div>

          <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 bg-[#2A2A2A]">
                  <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">File Name</th>
                  <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">Upload Date</th>
                  <th className="text-left py-4 px-6 text-[#9CA3AF] font-semibold">User</th>
                  <th className="text-right py-4 px-6 text-[#9CA3AF] font-semibold">Records</th>
                  <th className="text-right py-4 px-6 text-[#9CA3AF] font-semibold">Errors</th>
                  <th className="text-center py-4 px-6 text-[#9CA3AF] font-semibold">Status</th>
                  <th className="text-center py-4 px-6 text-[#9CA3AF] font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadHistory.map((upload: {
        id: number;
        fileName: string;
        uploadDate: string;
        status: 'completed' | 'processing' | 'failed';
        records: number;
        errors: number;
        user: string;
        size: string;
      }) => (
                  <tr key={upload.id} className="border-b border-gray-800 hover:bg-[#2A2A2A] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#00D1D1]" />
                        <div>
                          <p className="text-white font-semibold">{upload.fileName}</p>
                          <p className="text-[#9CA3AF] text-sm">{upload.size}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">{upload.uploadDate}</td>
                    <td className="py-4 px-6 text-white">{upload.user}</td>
                    <td className="py-4 px-6 text-right text-white font-semibold">
                      {upload.records > 0 ? upload.records.toLocaleString() : '-'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-semibold ${upload.errors > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {upload.errors}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold inline-flex items-center gap-1 ${
                        upload.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        upload.status === 'processing' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {upload.status === 'completed' && <CheckCircle className="w-4 h-4" />}
                        {upload.status === 'processing' && <Clock className="w-4 h-4" />}
                        {upload.status === 'failed' && <XCircle className="w-4 h-4" />}
                        {upload.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {upload.status === 'completed' && (
                          <button className="p-2 text-[#00D1D1] hover:bg-[#2A2A2A] rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        {upload.status === 'failed' && (
                          <button className="px-3 py-1 text-yellow-400 hover:bg-[#2A2A2A] rounded-lg transition-colors text-sm">
                            Retry
                          </button>
                        )}
                        <button className="p-2 text-red-400 hover:bg-[#2A2A2A] rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Uploads;