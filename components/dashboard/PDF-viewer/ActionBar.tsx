import React, { useState } from 'react';
import { Download, Share2, Printer, Mail, Copy, Bookmark, MessageSquare, FileText, Link2, Highlighter } from 'lucide-react';

export default function ActionBar() {
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAnnotationPanel, setShowAnnotationPanel] = useState(false);
  const [annotations, setAnnotations] = useState<Array<{
    id: number;
    page: number;
    type: string;
    text: string;
    color: string;
    author: string;
    date: string;
  }>>([
    { id: 1, page: 5, type: 'note', text: 'Important data point', color: 'yellow', author: 'John Doe', date: '2024-12-08' },
    { id: 2, page: 12, type: 'highlight', text: 'Key finding', color: 'green', author: 'Jane Smith', date: '2024-12-07' },
    { id: 3, page: 18, type: 'comment', text: 'Review this section', color: 'blue', author: 'Mike Johnson', date: '2024-12-06' }
  ]);
  const [bookmarks, setBookmarks] = useState<Array<{
    id: number;
    page: number;
    title: string;
    date: string;
  }>>([
    { id: 1, page: 3, title: 'Executive Summary', date: '2024-12-08' },
    { id: 2, page: 15, title: 'Market Analysis', date: '2024-12-07' },
    { id: 3, page: 28, title: 'Regional Breakdown', date: '2024-12-06' }
  ]);

  const [shareEmail, setShareEmail] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleDownload = (format: string): void => {
    console.log(`Downloading as ${format}`);
  };

  const handleShare = (): void => {
    console.log('Sharing with:', shareEmail);
    setShowShareModal(false);
    setShareEmail('');
    setShareMessage('');
  };

  const handleCopyLink = (): void => {
    navigator.clipboard.writeText('https://axis-trademarket.ai/pdf/q4-2025-report');
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handlePrint = (): void => {
    window.print();
  };

  const addBookmark = (): void => {
    const newBookmark = {
      id: bookmarks.length + 1,
      page: Math.floor(Math.random() * 42) + 1,
      title: 'New Bookmark',
      date: new Date().toISOString().split('T')[0]
    };
    setBookmarks([...bookmarks, newBookmark]);
  };

  const removeBookmark = (id: number): void => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const stats = {
    downloads: 145,
    shares: 67,
    prints: 34,
    annotations: annotations.length,
    bookmarks: bookmarks.length
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🛠️ Document Actions & Tools</h1>
          <p className="text-gray-400">Advanced tools for document management and collaboration</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Download className="w-5 h-5 text-[#19F6FF]" />
              <div className="text-xs text-gray-400">Downloads</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.downloads}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Share2 className="w-5 h-5 text-green-400" />
              <div className="text-xs text-gray-400">Shares</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.shares}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Printer className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-gray-400">Prints</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.prints}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-yellow-400" />
              <div className="text-xs text-gray-400">Annotations</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.annotations}</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Bookmark className="w-5 h-5 text-purple-400" />
              <div className="text-xs text-gray-400">Bookmarks</div>
            </div>
            <div className="text-3xl font-bold text-white">{stats.bookmarks}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-4 gap-4">
            <button
              onClick={() => handleDownload('pdf')}
              className="p-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-[#19F6FF]/20 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-[#19F6FF]" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Download PDF</div>
                <div className="text-xs text-gray-400">Original format</div>
              </div>
            </button>

            <button
              onClick={() => setShowShareModal(true)}
              className="p-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Share Document</div>
                <div className="text-xs text-gray-400">Email or link</div>
              </div>
            </button>

            <button
              onClick={handlePrint}
              className="p-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Printer className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">Print</div>
                <div className="text-xs text-gray-400">Physical copy</div>
              </div>
            </button>

            <button
              onClick={handleCopyLink}
              className="p-6 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl transition-all flex flex-col items-center gap-3"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Link2 className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-center">
                <div className="text-sm font-bold text-white">
                  {copySuccess ? 'Copied!' : 'Copy Link'}
                </div>
                <div className="text-xs text-gray-400">Share URL</div>
              </div>
            </button>
          </div>
        </div>

        {/* Download Options */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Download Options</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => handleDownload('pdf')}
              className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-red-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">PDF Format</div>
                <div className="text-xs text-gray-400">Original document</div>
              </div>
            </button>

            <button
              onClick={() => handleDownload('docx')}
              className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Word Format</div>
                <div className="text-xs text-gray-400">Editable .docx</div>
              </div>
            </button>

            <button
              onClick={() => handleDownload('txt')}
              className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg transition-all flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Text Format</div>
                <div className="text-xs text-gray-400">Plain text .txt</div>
              </div>
            </button>
          </div>
        </div>

        {/* Bookmarks */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Bookmarks ({bookmarks.length})</h3>
            <button
              onClick={addBookmark}
              className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm"
            >
              Add Bookmark
            </button>
          </div>

          <div className="space-y-2">
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm font-bold text-white">{bookmark.title}</div>
                    <div className="text-xs text-gray-400">Page {bookmark.page} • Added {bookmark.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors text-xs font-medium">
                    Go to Page
                  </button>
                  <button
                    onClick={() => removeBookmark(bookmark.id)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Annotations */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Annotations ({annotations.length})</h3>
            <button
              onClick={() => setShowAnnotationPanel(!showAnnotationPanel)}
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700"
            >
              {showAnnotationPanel ? 'Hide Panel' : 'Show Panel'}
            </button>
          </div>

          {showAnnotationPanel && (
            <div className="space-y-2">
              {annotations.map((annotation) => (
                <div
                  key={annotation.id}
                  className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${annotation.color}-400`}></div>
                      <span className="text-xs font-medium text-gray-400 uppercase">{annotation.type}</span>
                    </div>
                    <span className="text-xs text-gray-500">Page {annotation.page}</span>
                  </div>
                  <p className="text-sm text-white mb-2">{annotation.text}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{annotation.author}</span>
                    <span>{annotation.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Share Document</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                    placeholder="colleague@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white resize-none"
                    placeholder="Add a message..."
                  />
                </div>

                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="text-sm font-medium text-white mb-2">Share Link:</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value="https://axis-trademarket.ai/pdf/q4-2025-report"
                      readOnly
                      className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border border-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}