"use client"
import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, XCircle, RefreshCw, Sparkles } from 'lucide-react';
import { FeedsApi, FeedDetectionResponse } from '@/utils/apis/FeedsApi';
import { ReportsApi } from '@/utils/apis/ReportsApi';

export default function NewUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [detection, setDetection] = useState<FeedDetectionResponse | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleFileSelection = async (file: File) => {
    setSelectedFile(file);
    setDetection(null);
    setError(null);

    // Auto-detect feed type
    await detectFeed(file);
  };

  const detectFeed = async (file: File) => {
    try {
      setDetecting(true);
      setError(null);
      const result = await FeedsApi.detectFeed(file);
      setDetection(result);
    } catch (err: any) {
      setError(err.message || 'Feed detection failed');
      console.error('Detection error:', err);
    } finally {
      setDetecting(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError(null);
      const result = await ReportsApi.uploadReport(selectedFile);
      setUploadResult(result);
      alert('Upload successful! Report ID: ' + result.id);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setDetection(null);
    setUploadResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">New Upload</h1>
          <p className="text-gray-400">Upload CSV files for processing and analysis</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetUpload}
            className="px-4 py-2 bg-[#2A2A2A] text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="px-6 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                Start Upload
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400" />
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Upload Success */}
      {uploadResult && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-bold text-white">Upload Successful!</h3>
          </div>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Report ID</p>
              <p className="text-white font-mono">{uploadResult.id}</p>
            </div>
            <div>
              <p className="text-gray-400">Filename</p>
              <p className="text-white">{uploadResult.original_filename}</p>
            </div>
            <div>
              <p className="text-gray-400">Status</p>
              <p className="text-green-400 font-semibold">{uploadResult.status}</p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
        <h3 className="text-white text-lg font-semibold mb-4">Upload File</h3>
        <div
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
              ? 'border-[#00D1D1] bg-[#00D1D1]/10'
              : 'border-gray-700 bg-[#1A1A1A] hover:border-gray-600'
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-[#00D1D1] mx-auto mb-4" />

          {selectedFile ? (
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <FileText className="w-10 h-10 text-[#00D1D1]" />
                <div className="text-left">
                  <h4 className="text-white font-semibold text-lg">{selectedFile.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'CSV'}
                  </p>
                </div>
              </div>
              <button
                onClick={resetUpload}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                Remove File
              </button>
            </div>
          ) : (
            <>
              <h4 className="text-white text-xl font-semibold mb-2">
                Drop your CSV file here
              </h4>
              <p className="text-gray-400 mb-6">
                or click to browse from your computer
              </p>
              <label className="px-6 py-3 bg-[#00D1D1] text-white font-semibold rounded-lg hover:bg-[#00B8B8] transition-colors cursor-pointer inline-block">
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileSelect}
                />
                Select File
              </label>
              <p className="text-gray-400 text-sm mt-4">
                Supported formats: CSV, XLSX, XLS (Max 50MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Feed Detection Results */}
      {detecting && (
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#00D1D1] animate-spin" />
            <h3 className="text-white text-lg font-semibold">Detecting feed type...</h3>
          </div>
        </div>
      )}

      {detection && (
        <div className="bg-gradient-to-br from-[#00D1D1]/10 to-[#00B8B8]/5 border border-[#00D1D1]/30 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-[#00D1D1]" />
            <h3 className="text-white text-lg font-semibold">Feed Detection Results</h3>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Detected Feed Type</p>
              <h4 className="text-2xl font-bold text-[#00D1D1]">{detection.detected_feed}</h4>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Confidence</p>
              <h4 className="text-2xl font-bold text-green-400">{(detection.confidence * 100).toFixed(1)}%</h4>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Total Rows</p>
              <h4 className="text-2xl font-bold text-white">{detection.total_rows.toLocaleString()}</h4>
            </div>
            <div className="bg-black/30 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-1">Pricing Tier</p>
              <h4 className="text-2xl font-bold text-yellow-400">{detection.feed_config.pricing_tier}</h4>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">Feed Information</h4>
            <p className="text-lg text-white mb-1">{detection.feed_config.name}</p>
            <p className="text-gray-400">{detection.feed_config.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-2">Matched Columns ({detection.matched_columns.length})</h4>
            <div className="flex flex-wrap gap-2">
              {detection.matched_columns.map((col, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#00D1D1]/20 text-[#00D1D1] rounded-full text-sm border border-[#00D1D1]/30"
                >
                  {col}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}