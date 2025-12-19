import React, { useState } from 'react';
import { FileText, Search, Filter, Calendar, Download, Eye, Star, Trash2, FolderOpen } from 'lucide-react';

export default function PDFListPanel() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'processing' | 'archived'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'downloads' | 'views'>('date');
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [selectedPDF, setSelectedPDF] = useState<{
    id: number;
    title: string;
    category: string;
    uploadDate: string;
    fileSize: string;
    pages: number;
    status: 'completed' | 'processing' | 'archived';
    downloads: number;
    views: number;
    description: string;
    tags: string[];
    thumbnail: string;
  } | null>(null);

  // PDF Documents
  const pdfDocuments: Array<{
    id: number;
    title: string;
    category: string;
    uploadDate: string;
    fileSize: string;
    pages: number;
    status: 'completed' | 'processing' | 'archived';
    downloads: number;
    views: number;
    description: string;
    tags: string[];
    thumbnail: string;
  }> = [
    {
      id: 1,
      title: 'Q4 2025 Market Analysis Report',
      category: 'Market Reports',
      uploadDate: '2024-12-08',
      fileSize: '4.2 MB',
      pages: 42,
      status: 'completed',
      downloads: 145,
      views: 892,
      description: 'Comprehensive market analysis for Q4 2025 including trends, forecasts, and insights',
      tags: ['Market', 'Q4', 'Analysis', 'Trends'],
      thumbnail: '📊'
    },
    {
      id: 2,
      title: 'Raleigh-Durham Property Intelligence',
      category: 'Property Reports',
      uploadDate: '2024-12-07',
      fileSize: '8.7 MB',
      pages: 68,
      status: 'completed',
      downloads: 234,
      views: 1456,
      description: 'Detailed property intelligence report for Raleigh-Durham market with ownership data',
      tags: ['Raleigh', 'Property', 'Intelligence', 'Ownership'],
      thumbnail: '🏘️'
    },
    {
      id: 3,
      title: 'Equity Refinance Opportunities Analysis',
      category: 'Opportunity Reports',
      uploadDate: '2024-12-06',
      fileSize: '5.8 MB',
      pages: 54,
      status: 'completed',
      downloads: 189,
      views: 1023,
      description: 'High-equity homeowners ready for refinance with detailed contact information',
      tags: ['Refinance', 'Equity', 'Opportunities', 'Leads'],
      thumbnail: '💰'
    },
    {
      id: 4,
      title: 'Phoenix Luxury Market Insights',
      category: 'Market Reports',
      uploadDate: '2024-12-05',
      fileSize: '6.4 MB',
      pages: 47,
      status: 'processing',
      downloads: 0,
      views: 234,
      description: 'Luxury real estate market analysis for Phoenix metropolitan area',
      tags: ['Phoenix', 'Luxury', 'Market', 'HNW'],
      thumbnail: '🏆'
    },
    {
      id: 5,
      title: 'Atlanta First-Time Buyer Database',
      category: 'Buyer Reports',
      uploadDate: '2024-12-04',
      fileSize: '12.3 MB',
      pages: 94,
      status: 'completed',
      downloads: 312,
      views: 1678,
      description: 'Pre-qualified first-time homebuyers with complete demographic and financial data',
      tags: ['Atlanta', 'First-Time', 'Buyers', 'Database'],
      thumbnail: '🏡'
    },
    {
      id: 6,
      title: 'Commercial Property Investment Report',
      category: 'Investment Reports',
      uploadDate: '2024-12-03',
      fileSize: '9.1 MB',
      pages: 72,
      status: 'completed',
      downloads: 167,
      views: 845,
      description: 'Commercial real estate investment opportunities with ROI analysis',
      tags: ['Commercial', 'Investment', 'CRE', 'ROI'],
      thumbnail: '🏢'
    },
    {
      id: 7,
      title: 'Seattle Tech Sector Employment Report',
      category: 'Market Reports',
      uploadDate: '2024-12-02',
      fileSize: '3.9 MB',
      pages: 38,
      status: 'archived',
      downloads: 456,
      views: 2134,
      description: 'Employment trends in Seattle tech sector affecting real estate demand',
      tags: ['Seattle', 'Tech', 'Employment', 'Trends'],
      thumbnail: '💻'
    },
    {
      id: 8,
      title: 'Miami International Buyer Analysis',
      category: 'Buyer Reports',
      uploadDate: '2024-12-01',
      fileSize: '7.6 MB',
      pages: 61,
      status: 'completed',
      downloads: 198,
      views: 934,
      description: 'International buyers targeting Miami real estate with investment profiles',
      tags: ['Miami', 'International', 'Buyers', 'Investment'],
      thumbnail: '🌎'
    }
  ];

  const toggleFavorite = (id: number): void => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const openPDF = (pdf: {
    id: number;
    title: string;
    category: string;
    uploadDate: string;
    fileSize: string;
    pages: number;
    status: 'completed' | 'processing' | 'archived';
    downloads: number;
    views: number;
    description: string;
    tags: string[];
    thumbnail: string;
  }): void => {
    setSelectedPDF(pdf);
  };

  const closePDF = (): void => {
    setSelectedPDF(null);
  };

  const getStatusBadge = (status: 'completed' | 'processing' | 'archived'): {
    bg: string;
    text: string;
    border: string;
    label: string;
  } => {
    const badges = {
      completed: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Ready' },
      processing: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Processing' },
      archived: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30', label: 'Archived' }
    };
    return badges[status];
  };

  const filteredPDFs = pdfDocuments.filter((pdf) => {
    const matchesCategory = selectedCategory === 'all' || pdf.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || pdf.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      pdf.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pdf.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const sortedPDFs = [...filteredPDFs].sort((a: any, b: any): number => {
    if (sortBy === 'date') return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'downloads') return b.downloads - a.downloads;
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });

  const stats = {
    total: pdfDocuments.length,
    completed: pdfDocuments.filter(p => p.status === 'completed').length,
    processing: pdfDocuments.filter(p => p.status === 'processing').length,
    archived: pdfDocuments.filter(p => p.status === 'archived').length
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📄 Document Library</h1>
          <p className="text-gray-400">Browse and manage your PDF reports and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Documents</div>
            <div className="text-3xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-gray-500 mt-1">In library</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Ready to View</div>
            <div className="text-3xl font-bold text-green-400">{stats.completed}</div>
            <div className="text-xs text-gray-500 mt-1">Available now</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Processing</div>
            <div className="text-3xl font-bold text-blue-400">{stats.processing}</div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Archived</div>
            <div className="text-3xl font-bold text-gray-400">{stats.archived}</div>
            <div className="text-xs text-gray-500 mt-1">Old documents</div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-[#19F6FF]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Categories</option>
                <option value="Market Reports">Market Reports</option>
                <option value="Property Reports">Property Reports</option>
                <option value="Opportunity Reports">Opportunity Reports</option>
                <option value="Buyer Reports">Buyer Reports</option>
                <option value="Investment Reports">Investment Reports</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'completed' | 'processing' | 'archived')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="all">All Status</option>
                <option value="completed">Ready</option>
                <option value="processing">Processing</option>
                <option value="archived">Archived</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'downloads' | 'views')}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm text-white"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="downloads">Sort by Downloads</option>
                <option value="views">Sort by Views</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-400">
            Showing {sortedPDFs.length} of {pdfDocuments.length} documents
          </div>
        </div>

        {/* PDF List */}
        <div className="space-y-4">
          {sortedPDFs.map((pdf, idx: number) => {
            const statusBadge = getStatusBadge(pdf.status);
            const isFavorite = favorites.includes(pdf.id);
            
            return (
              <div
                key={pdf.id}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-[#19F6FF] transition-all"
              >
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-gray-800 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                    {pdf.thumbnail}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{pdf.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}>
                            {statusBadge.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">{pdf.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {pdf.tags.map((tag: string, idx: number) => (
                            <span key={idx} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavorite(pdf.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isFavorite 
                            ? 'text-yellow-400 bg-yellow-500/10' 
                            : 'text-gray-500 hover:text-yellow-400 hover:bg-yellow-500/10'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${isFavorite ? 'fill-yellow-400' : ''}`} />
                      </button>
                    </div>

                    <div className="grid grid-cols-6 gap-4 mb-4">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Category</div>
                        <div className="text-sm font-medium text-white">{pdf.category}</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Upload Date</div>
                        <div className="text-sm font-medium text-white">{pdf.uploadDate}</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">File Size</div>
                        <div className="text-sm font-bold text-white">{pdf.fileSize}</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Pages</div>
                        <div className="text-sm font-bold text-white">{pdf.pages}</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Downloads</div>
                        <div className="text-sm font-bold text-green-400">{pdf.downloads}</div>
                      </div>

                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="text-xs text-gray-400 mb-1">Views</div>
                        <div className="text-sm font-bold text-blue-400">{pdf.views}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {pdf.status === 'completed' && (
                        <>
                          <button
                            onClick={() => openPDF(pdf)}
                            className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            View PDF
                          </button>
                          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2 border border-gray-700">
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </>
                      )}
                      {pdf.status === 'processing' && (
                        <button className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg cursor-not-allowed font-medium text-sm">
                          Processing...
                        </button>
                      )}
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                        Details
                      </button>
                      <button className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium text-sm flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sortedPDFs.length === 0 && (
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-16 text-center">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No documents found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* PDF Viewer Modal */}
        {selectedPDF && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{selectedPDF.title}</h3>
                  <p className="text-sm text-gray-400">{selectedPDF.pages} pages • {selectedPDF.fileSize}</p>
                </div>
                <button
                  onClick={closePDF}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* PDF Viewer Area */}
              <div className="flex-1 overflow-y-auto p-8 bg-gray-950">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-12 min-h-[800px]">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{selectedPDF.thumbnail}</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedPDF.title}</h2>
                    <p className="text-gray-600 text-lg">{selectedPDF.description}</p>
                  </div>
                  <div className="space-y-4 text-gray-800">
                    <p className="text-sm leading-relaxed">
                      This is a preview of the PDF document. In production, this would display the actual PDF content using a PDF rendering library.
                    </p>
                    <div className="grid grid-cols-2 gap-4 p-6 bg-gray-50 rounded">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Category</div>
                        <div className="font-semibold">{selectedPDF.category}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Upload Date</div>
                        <div className="font-semibold">{selectedPDF.uploadDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Downloads</div>
                        <div className="font-semibold">{selectedPDF.downloads}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Views</div>
                        <div className="font-semibold">{selectedPDF.views}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-6 border-t border-gray-800 flex gap-3">
                <button className="px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border border-gray-700">
                  Print
                </button>
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border border-gray-700">
                  Share
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}