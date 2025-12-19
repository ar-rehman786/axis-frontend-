'use client'
import React, { useState } from 'react';
import { Globe, Database, Shield, Zap, CheckCircle, Download, Lock } from 'lucide-react';
import Image from 'next/image';

export default function AccessPage() {
  const [showAccessForm, setShowAccessForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    title: '',
    phone: '',
    institutionType: '',
    message: ''
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Access request submitted:', formData);
    alert('Access request submitted! Our team will contact you within 24 hours.');
    setShowAccessForm(false);
    setFormData({
      fullName: '',
      email: '',
      company: '',
      title: '',
      phone: '',
      institutionType: '',
      message: ''
    });
  };

  const handleDownloadCompliance = () => {
    console.log('Downloading Compliance 3.0 Snapshot');
    alert('Compliance 3.0 Snapshot download started');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 bg-gradient-to-b from-[#00D4D4]/5 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Logo */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00D4D4]/20 blur-3xl rounded-full"></div>
              <div className="relative flex flex-col items-center">
                <Image
                  src="/axis-trade-market.jpeg"
                  alt="Axis Trade Market Logo"
                  width={80}
                  height={80}
                  className="relative rounded-full border border-gray-400/20"
                  priority
                />
                <h1 className="font-bold tracking-tight mt-2 text-xl sm:text-2xl">
                  <span className="text-white">AXIS</span>
                  <span className="text-[#00D4D4]">TRADE</span>
                </h1>
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              The AI-Native Global Ledger for
              <span className="block mt-2 sm:mt-3 bg-gradient-to-r from-[#00D4D4] to-[#00A8A8] bg-clip-text text-transparent">
                Verified Market Intelligence
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-4 sm:mb-6 px-2">
              Enterprise-grade platform combining real-time data verification, blockchain-secured ledgers, 
              and AI-powered analytics to deliver actionable intelligence across global markets.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-6 sm:mb-8 px-2">
              Built for institutional investors, financial services, and enterprise organizations 
              requiring the highest standards of data integrity and compliance.
            </p>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => setShowAccessForm(true)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-[#00D4D4]/20"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              Request Institutional Access
            </button>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Already have access? <a href="/login" className="text-[#00D4D4] hover:underline">Login here</a>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1 sm:gap-2">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#00D4D4]" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#00D4D4]" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Database className="w-3 h-3 sm:w-4 sm:h-4 text-[#00D4D4]" />
              <span>Blockchain Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">How It Works</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Four-step process from raw data to verified intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Step 1 */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl hover:border-[#00D4D4]/30 transition-all">
            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#00D4D4] rounded-lg sm:rounded-xl flex items-center justify-center text-black font-bold text-sm sm:text-base lg:text-xl">
              1
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00D4D4]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <Database className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#00D4D4]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Connect or Upload Data</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Integrate via API, SFTP, or manual upload. We support structured and unstructured data from 
              any source—CRM, financial systems, third-party feeds, or proprietary databases.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl hover:border-[#00D4D4]/30 transition-all">
            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#00D4D4] rounded-lg sm:rounded-xl flex items-center justify-center text-black font-bold text-sm sm:text-base lg:text-xl">
              2
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00D4D4]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#00D4D4]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Refinery, Verification & Ledger Scoring</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Our AI refinery cleanses, normalizes, and validates every data point. Blockchain-backed 
              ledger scoring ensures provenance and integrity at every step.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl hover:border-[#00D4D4]/30 transition-all">
            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#00D4D4] rounded-lg sm:rounded-xl flex items-center justify-center text-black font-bold text-sm sm:text-base lg:text-xl">
              3
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00D4D4]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#00D4D4]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Enrich & Correlate</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Cross-reference with global datasets, behavioral signals, and market indicators. 
              AI models detect patterns, anomalies, and opportunities in real-time.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl hover:border-[#00D4D4]/30 transition-all">
            <div className="absolute -top-3 sm:-top-4 left-4 sm:left-8 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-[#00D4D4] rounded-lg sm:rounded-xl flex items-center justify-center text-black font-bold text-sm sm:text-base lg:text-xl">
              4
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#00D4D4]/10 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 mt-2 sm:mt-4">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#00D4D4]" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Deliver Intelligence</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Access verified insights through dashboards, APIs, or automated reports. 
              Every data point is traceable, auditable, and ready for action.
            </p>
          </div>
        </div>
      </div>

      {/* Compliance Section */}
      <div className="border-y border-gray-900 bg-gradient-to-br from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#00D4D4]/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#00D4D4]" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Compliance 3.0</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed mb-4 sm:mb-6">
              Next-generation compliance framework combining regulatory standards, blockchain verification, 
              and AI-powered monitoring to ensure data integrity and regulatory adherence across jurisdictions.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 mb-8 sm:mb-12">
              Learn how our platform meets SOC 2, GDPR, CCPA, and industry-specific compliance requirements 
              while maintaining the highest standards of data security and privacy.
            </p>
            <button
              onClick={handleDownloadCompliance}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all border border-gray-700 flex items-center justify-center gap-2 sm:gap-3 mx-auto text-base sm:text-lg"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download Compliance 3.0 Snapshot
            </button>
          </div>
        </div>
      </div>

      {/* Who It's For Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Built for Institutions</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            Trusted by leading organizations worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Financial Services</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Banks, asset managers, and investment firms requiring verified market data, 
              risk analytics, and compliance-ready intelligence.
            </p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Enterprise Organizations</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Corporations needing real-time market intelligence, competitive analysis, 
              and strategic insights backed by verified data.
            </p>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800 rounded-xl sm:rounded-2xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Institutional Investors</h3>
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
              Hedge funds, private equity, and institutional traders requiring 
              high-frequency data with blockchain-verified provenance.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="border-t border-gray-900 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Request institutional access and our team will guide you through the onboarding process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setShowAccessForm(true)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 shadow-lg shadow-[#00D4D4]/20"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              Request Institutional Access
            </button>
            <a
              href="/login"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all border border-gray-700 text-base sm:text-lg text-center"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Access Request Form Modal */}
      {showAccessForm && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl sm:rounded-2xl max-w-2xl w-full p-4 sm:p-6 lg:p-8 my-4 sm:my-8 max-h-[90vh] overflow-y-auto ">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">Request Institutional Access</h2>
              <button
                onClick={() => setShowAccessForm(false)}
                className="text-gray-400 hover:text-white text-xl sm:text-2xl"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                    placeholder="Acme Corporation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                    placeholder="Chief Investment Officer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                    Institution Type *
                  </label>
                  <select
                    required
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base"
                  >
                    <option value="">Select type</option>
                    <option value="bank">Bank</option>
                    <option value="asset-manager">Asset Manager</option>
                    <option value="hedge-fund">Hedge Fund</option>
                    <option value="private-equity">Private Equity</option>
                    <option value="insurance">Insurance</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1 sm:mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-white focus:border-[#00D4D4] focus:outline-none text-sm sm:text-base resize-none"
                  placeholder="Tell us about your use case and requirements..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setShowAccessForm(false)}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all border border-gray-700 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-[#00D4D4] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-all text-sm sm:text-base"
                >
                  Submit Request
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-500 text-center">
                Our team will review your request and contact you within 24 hours.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}