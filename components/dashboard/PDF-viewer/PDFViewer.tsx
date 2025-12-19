import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Share2, Printer, ChevronLeft, ChevronRight, Maximize2, BookOpen } from 'lucide-react';

export default function PDFViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState<'single' | 'double'>('single');

  // Sample PDF Document
  const document = {
    id: 1,
    title: 'Q4 2025 Market Analysis Report',
    totalPages: 42,
    fileSize: '4.2 MB',
    category: 'Market Reports',
    uploadDate: '2024-12-08',
    author: 'Axis TradeMarket AI',
    version: '1.0'
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, document.totalPages));
  };

  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const page = parseInt(e.target.value);
    if (page >= 1 && page <= document.totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Top Action Bar */}
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-1">{document.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>{document.category}</span>
              <span>•</span>
              <span>{document.totalPages} pages</span>
              <span>•</span>
              <span>{document.fileSize}</span>
              <span>•</span>
              <span>Updated: {document.uploadDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2 border border-gray-700">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2 border border-gray-700">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-gray-900/50 border-b border-gray-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Page Navigation */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Page</span>
              <input
                type="number"
                min="1"
                max={document.totalPages}
                value={currentPage}
                onChange={handlePageInput}
                className="w-16 bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-center text-sm text-white"
              />
              <span className="text-sm text-gray-400">of {document.totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === document.totalPages}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium text-white w-16 text-center">{zoom}%</span>
            
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <div className="w-px h-6 bg-gray-700 mx-2"></div>

            <button
              onClick={handleRotate}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
            >
              <RotateCw className="w-5 h-5" />
            </button>

            <button
              onClick={() => setViewMode(viewMode === 'single' ? 'double' : 'single')}
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              title={viewMode === 'single' ? 'Double Page View' : 'Single Page View'}
            >
              <BookOpen className="w-5 h-5" />
            </button>

            <button
              className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
              title="Fullscreen"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 overflow-auto bg-gray-950 p-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              transformOrigin: 'top center'
            }}
          >
            {/* PDF Page Content */}
            <div className="p-12 min-h-[1000px]">
              <div className="text-center mb-8">
                <div className="text-6xl mb-6">📊</div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{document.title}</h1>
                <p className="text-xl text-gray-600 mb-2">Page {currentPage} of {document.totalPages}</p>
                <p className="text-sm text-gray-500">Version {document.version} • {document.author}</p>
              </div>

              <div className="space-y-6 text-gray-800">
                <div className="border-l-4 border-[#19F6FF] pl-4">
                  <h2 className="text-2xl font-bold mb-2">Executive Summary</h2>
                  <p className="text-gray-600 leading-relaxed">
                    This comprehensive market analysis report provides detailed insights into the Q4 2025 real estate market trends, opportunities, and forecasts. The report includes data-driven analysis, market intelligence, and actionable recommendations for stakeholders.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Market Overview</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Current market conditions and key trends affecting real estate activity in major metropolitan areas.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Transaction volume analysis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Price trend indicators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Inventory levels and supply</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-bold mb-2">Key Findings</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Critical insights and data points that define the current market landscape and future outlook.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Demand patterns by segment</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Financing trends</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#19F6FF] mt-1">•</span>
                        <span>Regional variations</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">Data Insights</h3>
                  <p className="text-sm text-blue-800">
                    This report includes analysis of over 15,000 property transactions across 12 major markets, providing comprehensive market intelligence for real estate professionals.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Table of Contents</h2>
                  <div className="space-y-2">
                    {[
                      'Executive Summary',
                      'Market Overview',
                      'Regional Analysis',
                      'Transaction Trends',
                      'Price Analysis',
                      'Buyer Demographics',
                      'Inventory Levels',
                      'Financing Trends',
                      'Future Outlook',
                      'Recommendations',
                      'Appendix',
                      'Data Methodology'
                    ].map((section, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded transition-colors cursor-pointer">
                        <span className="text-gray-700">{section}</span>
                        <span className="text-gray-400 text-sm">Page {idx + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Indicator */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Viewing page {currentPage} of {document.totalPages} • {zoom}% zoom • {rotation}° rotation
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <div>Document loaded successfully</div>
          <div className="flex items-center gap-4">
            <span>View Mode: {viewMode === 'single' ? 'Single Page' : 'Double Page'}</span>
            <span>•</span>
            <span>Zoom: {zoom}%</span>
            <span>•</span>
            <span>Rotation: {rotation}°</span>
          </div>
        </div>
      </div>
    </div>
  );
}