'use client';

import React from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';

const Uploads = () => {
  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Data Uploads</h1>
        <p className="text-[#9CA3AF]">Upload and manage your data files</p>
      </div>

      {/* Upload Area */}
      <div className="bg-[#1A1A1A] border-2 border-dashed border-gray-700 rounded-xl p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-[#00D1D1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Upload className="w-10 h-10 text-[#00D1D1]" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3">Upload Your File</h2>
          <p className="text-[#9CA3AF] mb-6">
            Drag and drop files here or click to browse
          </p>
          
          <button className="px-6 py-3 bg-[#00D1D1] text-white font-semibold rounded-lg hover:bg-[#00B8B8] transition-colors">
            Select File
          </button>
          
          <div className="mt-8 text-sm text-gray-400">
            <p className="mb-2">Supported formats: CSV, XLSX, PDF</p>
            <p>Max file size: 50MB</p>
          </div>
        </div>
      </div>

      {/* Simple Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center">
          <FileText className="w-8 h-8 text-[#00D1D1] mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white mb-1">24</h3>
          <p className="text-gray-400 text-sm">Files Uploaded</p>
        </div>
        
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center">
          <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white mb-1">98%</h3>
          <p className="text-gray-400 text-sm">Success Rate</p>
        </div>
        
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 text-center">
          <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white mb-1">2.4 GB</h3>
          <p className="text-gray-400 text-sm">Total Data</p>
        </div>
      </div>
    </div>
  );
};

export default Uploads;