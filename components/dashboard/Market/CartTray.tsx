import React, { useState } from 'react';
import { ShoppingCart, Trash2, FileText, Database, CheckCircle, X, Download } from 'lucide-react';

export default function CartTray() {
  const [cartItems, setCartItems] = useState<Array<{
    id: number;
    name: string;
    market: string;
    quarter: string;
    records: number;
    format: string;
    pricing: string;
  }>>([
    {
      id: 1,
      name: 'Raleigh Q4 2025 - Equity Refinance Pack',
      market: 'Raleigh-Durham',
      quarter: 'Q4-2025',
      records: 8421,
      format: 'Report + CSV',
      pricing: 'Custom'
    },
    {
      id: 2,
      name: 'Seattle Q4 2025 - Luxury Market Intelligence',
      market: 'Seattle',
      quarter: 'Q4-2025',
      records: 2156,
      format: 'Report + CSV',
      pricing: 'Custom'
    }
  ]);

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    company: string;
    notes: string;
    attachPDF: boolean;
    attachCSV: boolean;
  }>({
    name: '',
    email: '',
    company: '',
    notes: '',
    attachPDF: true,
    attachCSV: true
  });

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
    setCheckoutStep('form');
  };

  const submitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const closeModal = () => {
    setShowCheckoutModal(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      notes: '',
      attachPDF: true,
      attachCSV: true
    });
  };

  const totalPacks = cartItems.length;
  const totalRecords = cartItems.reduce((sum, item) => sum + item.records, 0);

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🛒 Shopping Cart</h1>
          <p className="text-gray-400">Review your selected data packs and complete your order</p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-16 text-center">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-600" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Browse our data packs and add items to get started</p>
            <button className="px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold">
              Browse Data Packs
            </button>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-3 gap-6">
            {/* Cart Items - 2 columns */}
            <div className="col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Cart Items ({cartItems.length})</h3>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                >
                  Clear All
                </button>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#19F6FF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-[#19F6FF]" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-base font-bold text-white mb-2">{item.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{item.market}</span>
                        <span>•</span>
                        <span>{item.quarter}</span>
                        <span>•</span>
                        <span>{item.records.toLocaleString()} records</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-gray-800 rounded-full text-xs font-medium text-white">
                          {item.format}
                        </span>
                        <span className="px-3 py-1 bg-[#19F6FF]/10 text-[#19F6FF] rounded-full text-xs font-bold border border-[#19F6FF]/30">
                          {item.pricing}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary - 1 column */}
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 sticky top-8">
                <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Total Packs</span>
                    <span className="text-lg font-bold text-white">{totalPacks}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Total Records</span>
                    <span className="text-lg font-bold text-white">{totalRecords.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-lg">
                    <span className="text-sm font-semibold text-white">Total Price</span>
                    <span className="text-xl font-bold text-[#19F6FF]">Custom Quote</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-4 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold text-lg mb-3"
                >
                  Proceed to Checkout
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Our team will contact you with pricing within 24 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Checkout Modal */}
        {showCheckoutModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full">
              {checkoutStep === 'form' ? (
                /* Checkout Form */
                <form onSubmit={submitCheckout} className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Complete Your Order</h2>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                        placeholder="Company Inc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white resize-none"
                        placeholder="Any special requirements or questions..."
                      />
                    </div>

                    <div className="p-4 bg-gray-800/50 rounded-lg">
                      <div className="text-sm font-medium text-white mb-3">File Attachments:</div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.attachPDF}
                            onChange={(e) => setFormData({...formData, attachPDF: e.target.checked})}
                            className="w-5 h-5 rounded border-gray-600 text-[#19F6FF] focus:ring-[#19F6FF]"
                          />
                          <span className="text-sm text-gray-300">Include PDF Reports</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.attachCSV}
                            onChange={(e) => setFormData({...formData, attachCSV: e.target.checked})}
                            className="w-5 h-5 rounded border-gray-600 text-[#19F6FF] focus:ring-[#19F6FF]"
                          />
                          <span className="text-sm text-gray-300">Include CSV Datasets</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-bold border border-gray-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                    >
                      Submit Order
                    </button>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">Order Submitted Successfully!</h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for your order. Our team will review your request and contact you within 24 hours with pricing and next steps.
                  </p>

                  <div className="bg-gray-800/50 rounded-lg p-6 mb-6 text-left">
                    <h3 className="text-sm font-semibold text-white mb-3">Order Summary:</h3>
                    <div className="space-y-2 text-sm text-gray-300">
                      <div className="flex justify-between">
                        <span>Total Packs:</span>
                        <span className="font-semibold">{totalPacks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Records:</span>
                        <span className="font-semibold">{totalRecords.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Contact Email:</span>
                        <span className="font-semibold">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Company:</span>
                        <span className="font-semibold">{formData.company}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      closeModal();
                      clearCart();
                    }}
                    className="w-full px-6 py-3 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-bold"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}