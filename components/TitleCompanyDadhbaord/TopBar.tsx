'use client'
import React, { useState } from 'react'

export default function TopBar() {
    const [selectedMarket, setSelectedMarket] = useState('Raleigh');
    const [selectedPeriod, setSelectedPeriod] = useState('Q4 2025');

    return (
        <>
            <div className="bg-zinc-900 border-b border-zinc-800 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <h2 className="text-xl font-semibold">Title Dashboard</h2>

                        {/* Market Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">Market:</label>
                            <select
                                value={selectedMarket}
                                onChange={(e) => setSelectedMarket(e.target.value)}
                                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Raleigh">Raleigh</option>
                                <option value="Durham">Durham</option>
                                <option value="Charlotte">Charlotte</option>
                                <option value="Cary">Cary</option>
                            </select>
                        </div>

                        {/* Period Selector */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">Period:</label>
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="Q4 2025">Q4 2025</option>
                                <option value="Q3 2025">Q3 2025</option>
                                <option value="Q2 2025">Q2 2025</option>
                                <option value="Q1 2025">Q1 2025</option>
                            </select>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg text-sm font-medium transition-colors">
                            Forecast Report
                        </button>
                        <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-sm font-medium transition-colors">
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
