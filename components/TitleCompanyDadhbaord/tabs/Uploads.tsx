import React, { ChangeEvent, DragEvent, useState } from 'react';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';

type UploadedFile = {
  id: number;
  name: string;
  size: string;
  status: "uploading" | "complete";
  progress: number;
};

const UploadTab = () => {
//   const [uploadedFiles, setUploadedFiles] = useState([]);
const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const [isDragging, setIsDragging] = useState(false);

const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setIsDragging(true);
};

const handleDragLeave = () => {
  setIsDragging(false);
};

const handleDrop = (e: DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  setIsDragging(false);

  const files = Array.from(e.dataTransfer.files);
  handleFiles(files);
};

const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
  const files = Array.from(e.target.files || []);
  handleFiles(files);
};

const handleFiles = (files: File[]) => {
  const newFiles: UploadedFile[] = files.map(file => ({
    id: Date.now() + Math.random(),
    name: file.name,
    size: (file.size / 1024).toFixed(2) + " KB",
    status: "uploading",
    progress: 0,
  }));

//   setUploadedFiles(prev => [...prev, ...newFiles]);
setUploadedFiles(prev => [...prev, ...newFiles]);


  // Simulate upload progress
  newFiles.forEach(file => {
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;

      if (progress > 100) {
        clearInterval(interval);
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === file.id
              ? { ...f, status: "complete", progress: 100 }
              : f
          )
        );
      } else {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === file.id
              ? { ...f, progress }
              : f
          )
        );
      }
    }, 200);
  });
};

const removeFile = (id: number) => {
  setUploadedFiles(prev => prev.filter(f => f.id !== id));
};


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-1">Upload Data</h2>
        <p className="text-gray-400">Import property data, owner information, or market feeds</p>
      </div>

      {/* Upload Instructions */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
        <h3 className="text-blue-400 font-medium mb-2">Supported File Types</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• CSV files with property data (address, value, equity, owner info)</li>
          <li>• Excel files (.xlsx, .xls) with multiple sheets</li>
          <li>• JSON files from MLS or public records</li>
          <li>• Maximum file size: 50MB per file</li>
        </ul>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
          isDragging
            ? 'border-teal-500 bg-teal-500/5'
            : 'border-zinc-700 bg-zinc-900/50 hover:border-zinc-600'
        }`}
      >
        <Upload className="mx-auto mb-4 text-teal-400" size={48} />
        <h3 className="text-lg font-semibold mb-2">Drop files here to upload</h3>
        <p className="text-sm text-gray-400 mb-4">or click to browse from your computer</p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="hidden"
          id="file-upload"
          accept=".csv,.xlsx,.xls,.json"
        />
        <label
          htmlFor="file-upload"
          className="inline-block px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg cursor-pointer transition-colors font-medium"
        >
          Select Files
        </label>
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Uploaded Files ({uploadedFiles.length})</h3>
          <div className="space-y-3">
            {uploadedFiles.map(file => (
              <div key={file.id} className="bg-zinc-800/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <File className="text-teal-400" size={20} />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'complete' ? (
                      <CheckCircle className="text-green-400" size={20} />
                    ) : (
                      <AlertCircle className="text-yellow-400" size={20} />
                    )}
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                {file.status === 'uploading' && (
                  <div className="w-full bg-zinc-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-300"
                      style={{width: `${file.progress}%`}}
                    ></div>
                  </div>
                )}
                {file.status === 'complete' && (
                  <p className="text-xs text-green-400 mt-2">✓ Upload complete</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Mapping Section */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Column Mapping</h3>
        <p className="text-sm text-gray-400 mb-4">
          Map your CSV columns to our system fields
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Address Field</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Select column...</option>
              <option>Column A - Address</option>
              <option>Column B - Street Address</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Property Value</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Select column...</option>
              <option>Column C - Value</option>
              <option>Column D - Assessed Value</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Equity Amount</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Select column...</option>
              <option>Column E - Equity</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Owner Name</label>
            <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option>Select column...</option>
              <option>Column F - Owner</option>
            </select>
          </div>
        </div>

        <button className="mt-6 w-full bg-teal-500 hover:bg-teal-600 rounded-lg py-3 font-medium transition-colors">
          Process & Import Data
        </button>
      </div>

      {/* Recent Uploads */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Uploads</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <div>
                <p className="text-sm font-medium">charlotte_properties_nov2024.csv</p>
                <p className="text-xs text-gray-400">Uploaded on Nov 20, 2024 - 1,247 records</p>
              </div>
            </div>
            <button className="text-sm text-teal-400 hover:text-teal-300">View Data</button>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <div>
                <p className="text-sm font-medium">owner_contacts_oct2024.xlsx</p>
                <p className="text-xs text-gray-400">Uploaded on Oct 15, 2024 - 892 records</p>
              </div>
            </div>
            <button className="text-sm text-teal-400 hover:text-teal-300">View Data</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTab;