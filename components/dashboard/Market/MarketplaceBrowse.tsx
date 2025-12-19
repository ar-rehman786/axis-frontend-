"use client"
import React, { useState, useEffect } from 'react';
import { Package, Star, TrendingUp, Download, ShoppingCart, Filter, Search } from 'lucide-react';
import { FeedsApi, FeedConfig } from '@/utils/apis/FeedsApi';

export default function MarketplaceBrowse() {
    const [feeds, setFeeds] = useState<FeedConfig[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'PREMIUM' | 'BASIC'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await FeedsApi.getFeedConfigs();
                setFeeds(data);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch feeds');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeeds();
    }, []);

    const getTierColor = (tier: string) => {
        switch (tier) {
            case 'PREMIUM':
                return 'from-yellow-500/20 to-orange-500/10 border-yellow-500/30 text-yellow-400';
            case 'BASIC':
                return 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400';
            default:
                return 'from-gray-500/20 to-gray-600/10 border-gray-500/30 text-gray-400';
        }
    };

    const filteredFeeds = feeds.filter(feed => {
        const matchesFilter = filter === 'all' || feed.pricing_tier === filter;
        const matchesSearch = feed.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            feed.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-12 h-12 text-[#00D1D1] animate-pulse mx-auto mb-4" />
                    <p className="text-white text-lg">Loading marketplace...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Feed Marketplace</h1>
                <p className="text-gray-400">Browse and discover available data feeds</p>
            </div>

            {/* Filters & Search */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search feeds..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-gray-700 rounded-lg text-white focus:border-[#00D1D1] outline-none"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'PREMIUM', 'BASIC'].map((tier) => (
                        <button
                            key={tier}
                            onClick={() => setFilter(tier as any)}
                            className={`px-4 py-3 rounded-lg transition-colors ${filter === tier
                                    ? 'bg-[#00D1D1] text-white'
                                    : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-gray-700'
                                }`}
                        >
                            {tier === 'all' ? 'All Feeds' : tier}
                        </button>
                    ))}
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
                    <p className="text-red-400">{error}</p>
                </div>
            )}

            {/* Feed Count */}
            <div className="mb-6">
                <p className="text-gray-400">
                    Showing {filteredFeeds.length} of {feeds.length} feeds
                </p>
            </div>

            {/* Feed Cards Grid */}
            <div className="grid grid-cols-3 gap-6">
                {filteredFeeds.map((feed) => (
                    <div
                        key={feed.feed_type}
                        className={`bg-gradient-to-br ${getTierColor(feed.pricing_tier)} border rounded-xl p-6 hover:scale-105 transition-transform cursor-pointer`}
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <Package className="w-6 h-6" />
                                    <h3 className="text-xl font-bold text-white">{feed.name}</h3>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${feed.pricing_tier === 'PREMIUM'
                                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                    }`}>
                                    {feed.pricing_tier}
                                </span>
                            </div>
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </div>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{feed.description}</p>

                        <div className="space-y-3 mb-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Pages:</span>
                                <span className="text-white font-semibold">{feed.page_count}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-400">Feed Type:</span>
                                <span className="text-white font-mono text-xs">{feed.feed_type}</span>
                            </div>
                        </div>

                        {feed.required_columns && feed.required_columns.length > 0 && (
                            <div className="mb-4">
                                <p className="text-xs text-gray-400 mb-2">Required Columns:</p>
                                <div className="flex flex-wrap gap-1">
                                    {feed.required_columns.slice(0, 3).map((col) => (
                                        <span key={col} className="px-2 py-1 bg-black/30 text-gray-300 text-xs rounded">
                                            {col}
                                        </span>
                                    ))}
                                    {feed.required_columns.length > 3 && (
                                        <span className="px-2 py-1 bg-black/30 text-gray-300 text-xs rounded">
                                            +{feed.required_columns.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2">
                            <button className="flex-1 px-4 py-2 bg-[#00D1D1] text-white rounded-lg hover:bg-[#00B8B8] transition-colors flex items-center justify-center gap-2 font-semibold">
                                <ShoppingCart className="w-4 h-4" />
                                Add to Cart
                            </button>
                            <button className="px-4 py-2 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors">
                                <Download className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredFeeds.length === 0 && (
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-12 text-center">
                    <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No feeds found</h3>
                    <p className="text-gray-400">Try adjusting your filters or search query</p>
                </div>
            )}

            {/* Stats Summary */}
            <div className="grid grid-cols-4 gap-6 mt-8">
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Total Feeds</p>
                    <h3 className="text-3xl font-bold text-white">{feeds.length}</h3>
                </div>
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Premium Feeds</p>
                    <h3 className="text-3xl font-bold text-yellow-400">
                        {feeds.filter(f => f.pricing_tier === 'PREMIUM').length}
                    </h3>
                </div>
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Basic Feeds</p>
                    <h3 className="text-3xl font-bold text-blue-400">
                        {feeds.filter(f => f.pricing_tier === 'BASIC').length}
                    </h3>
                </div>
                <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Avg Pages</p>
                    <h3 className="text-3xl font-bold text-[#00D1D1]">
                        {feeds.length > 0 ? Math.round(feeds.reduce((sum, f) => sum + f.page_count, 0) / feeds.length) : 0}
                    </h3>
                </div>
            </div>
        </div>
    );
}
