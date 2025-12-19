import React, { useState } from 'react';
import { Package, CheckCircle, Clock, XCircle, Download, FileText, Eye, TrendingUp } from 'lucide-react';

export default function PackDetailModal() {
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'delivered' | 'processing' | 'cancelled'>('all');

  // Order History
  const orders = [
    {
      id: 'ORD-2024-1234',
      date: '2024-12-08',
      packs: ['Raleigh Q4 2025 - Equity Refinance Pack', 'Phoenix Q4 2025 - High-Equity Leads'],
      status: 'delivered',
      totalRecords: 15210,
      deliveryDate: '2024-12-08',
      price: 'Paid'
    },
    {
      id: 'ORD-2024-1233',
      date: '2024-12-05',
      packs: ['Atlanta Q4 2025 - First-Time Buyer Database'],
      status: 'processing',
      totalRecords: 12456,
      deliveryDate: '2024-12-10',
      price: 'Processing'
    },
    {
      id: 'ORD-2024-1232',
      date: '2024-12-01',
      packs: ['Seattle Q4 2025 - Luxury Market Intelligence'],
      status: 'delivered',
      totalRecords: 2156,
      deliveryDate: '2024-12-02',
      price: 'Paid'
    },
    {
      id: 'ORD-2024-1231',
      date: '2024-11-28',
      packs: ['Dallas Q3 2025 - Commercial Property Leads', 'Miami Q4 2025 - International Buyer Pool'],
      status: 'delivered',
      totalRecords: 9099,
      deliveryDate: '2024-11-29',
      price: 'Paid'
    },
    {
      id: 'ORD-2024-1230',
      date: '2024-11-25',
      packs: ['Phoenix Q4 2025 - High-Equity Leads'],
      status: 'cancelled',
      totalRecords: 0,
      deliveryDate: null,
      price: 'Refunded'
    }
  ];

  const getStatusBadge = (status: 'delivered' | 'processing' | 'cancelled'): { icon: any, bg: string, text: string, border: string, label: string } => {
    const badges = {
      delivered: { icon: CheckCircle, bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', label: 'Delivered' },
      processing: { icon: Clock, bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Processing' },
      cancelled: { icon: XCircle, bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', label: 'Cancelled' }
    };
    return badges[status];
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const stats = {
    totalOrders: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    processing: orders.filter(o => o.status === 'processing').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalSpent: 47850
  };

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">📦 My Orders & Downloads</h1>
          <p className="text-gray-400">Track your purchased data packs and manage downloads</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Orders</div>
            <div className="text-3xl font-bold text-white">{stats.totalOrders}</div>
            <div className="text-xs text-gray-500 mt-1">All time</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Delivered</div>
            <div className="text-3xl font-bold text-green-400">{stats.delivered}</div>
            <div className="text-xs text-gray-500 mt-1">Complete</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Processing</div>
            <div className="text-3xl font-bold text-blue-400">{stats.processing}</div>
            <div className="text-xs text-gray-500 mt-1">In progress</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Cancelled</div>
            <div className="text-3xl font-bold text-red-400">{stats.cancelled}</div>
            <div className="text-xs text-gray-500 mt-1">Refunded</div>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5">
            <div className="text-xs text-gray-400 mb-2">Total Spent</div>
            <div className="text-3xl font-bold text-purple-400">${(stats.totalSpent / 1000).toFixed(0)}k</div>
            <div className="text-xs text-gray-500 mt-1">Investment</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">Filter by Status:</span>
            <div className="flex gap-2">
              {[
                { id: 'all', label: 'All Orders' },
                { id: 'delivered', label: 'Delivered' },
                { id: 'processing', label: 'Processing' },
                { id: 'cancelled', label: 'Cancelled' }
              ].map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedStatus(filter.id as 'all' | 'delivered' | 'processing' | 'cancelled')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedStatus === filter.id
                      ? 'bg-[#19F6FF] text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Order History ({filteredOrders.length})</h3>

          {filteredOrders.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-16 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold text-white mb-2">No orders found</h4>
              <p className="text-gray-400">Try adjusting your filters</p>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const statusBadge = getStatusBadge(order.status as 'delivered' | 'processing' | 'cancelled');
              const StatusIcon = statusBadge.icon;
              
              return (
                <div
                  key={order.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-white">Order {order.id}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border} flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusBadge.label}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Ordered on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white mb-1">{order.price}</div>
                      <div className="text-xs text-gray-400">{order.packs.length} pack{order.packs.length > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Total Packs</div>
                      <div className="text-2xl font-bold text-white">{order.packs.length}</div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Total Records</div>
                      <div className="text-2xl font-bold text-white">{order.totalRecords.toLocaleString()}</div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Delivery Date</div>
                      <div className="text-base font-bold text-white">
                        {order.deliveryDate || 'TBD'}
                      </div>
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-xs text-gray-400 mb-1">Price</div>
                      <div className="text-base font-bold text-[#19F6FF]">{order.price}</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-400 mb-2">Included Packs:</div>
                    <div className="flex flex-wrap gap-2">
                      {order.packs.map((pack, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white">
                          {pack}
                        </span>
                      ))}
                    </div>
                  </div>

                  {order.status === 'delivered' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Files
                      </button>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2 border border-gray-700">
                        <Eye className="w-4 h-4" />
                        View Report
                      </button>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                        Track Order
                      </button>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm flex items-center gap-2 border border-gray-700">
                        <FileText className="w-4 h-4" />
                        View Invoice
                      </button>
                    </div>
                  )}

                  {order.status === 'processing' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors font-medium text-sm">
                        Track Order
                      </button>
                      <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                        Contact Support
                      </button>
                    </div>
                  )}

                  {order.status === 'cancelled' && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-sm text-red-400">
                        This order was cancelled and refunded. If you have any questions, please contact support.
                      </p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Need Help?</h3>
              <p className="text-gray-400">
                Questions about your orders or having trouble downloading? We're here to help.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
                Contact Support
              </button>
              <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}