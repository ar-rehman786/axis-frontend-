import React, { useState } from 'react';
import { Map, Layers, TrendingUp, Home, DollarSign, Filter, ZoomIn, ZoomOut } from 'lucide-react';

type Metric = 'price' | 'demand' | 'supply' | 'transactions';

type ZipData = {
  zip: string;
  name: string;
  price: number;
  priceChange: number;
  inventory: number;
  avgDays: number;
  demand: number;
  supply: number;
  transactions: number;
  coords: { x: number; y: number };
};

export default function ZIPHeatmap() {
  const [selectedMetric, setSelectedMetric] = useState<Metric>('price');
  const [selectedZip, setSelectedZip] = useState<ZipData | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const zipCodes: ZipData[] = [
    {
      zip: '27560',
      name: 'Morrisville',
      price: 485000,
      priceChange: 12.5,
      inventory: 234,
      avgDays: 22,
      demand: 95,
      supply: 35,
      transactions: 156,
      coords: { x: 35, y: 25 }
    },
    {
      zip: '27587',
      name: 'Wake Forest',
      price: 425000,
      priceChange: 9.8,
      inventory: 312,
      avgDays: 28,
      demand: 88,
      supply: 42,
      transactions: 198,
      coords: { x: 55, y: 20 }
    },
    {
      zip: '27709',
      name: 'Durham West',
      price: 395000,
      priceChange: 7.2,
      inventory: 289,
      avgDays: 31,
      demand: 82,
      supply: 48,
      transactions: 167,
      coords: { x: 25, y: 45 }
    },
    {
      zip: '27713',
      name: 'Durham Central',
      price: 365000,
      priceChange: 6.5,
      inventory: 345,
      avgDays: 35,
      demand: 78,
      supply: 55,
      transactions: 189,
      coords: { x: 30, y: 60 }
    },
    {
      zip: '27617',
      name: 'Raleigh North',
      price: 515000,
      priceChange: 14.2,
      inventory: 198,
      avgDays: 19,
      demand: 98,
      supply: 28,
      transactions: 212,
      coords: { x: 50, y: 35 }
    },
    {
      zip: '27615',
      name: 'Raleigh Northeast',
      price: 445000,
      priceChange: 10.5,
      inventory: 267,
      avgDays: 25,
      demand: 90,
      supply: 38,
      transactions: 178,
      coords: { x: 65, y: 40 }
    },
    {
      zip: '27518',
      name: 'Cary',
      price: 495000,
      priceChange: 11.8,
      inventory: 223,
      avgDays: 23,
      demand: 93,
      supply: 32,
      transactions: 201,
      coords: { x: 40, y: 50 }
    },
    {
      zip: '27519',
      name: 'Cary West',
      price: 505000,
      priceChange: 13.1,
      inventory: 189,
      avgDays: 21,
      demand: 96,
      supply: 30,
      transactions: 187,
      coords: { x: 35, y: 55 }
    },
    {
      zip: '27513',
      name: 'Cary North',
      price: 475000,
      priceChange: 10.9,
      inventory: 245,
      avgDays: 26,
      demand: 89,
      supply: 40,
      transactions: 165,
      coords: { x: 45, y: 45 }
    },
    {
      zip: '27606',
      name: 'Raleigh Central',
      price: 385000,
      priceChange: 8.3,
      inventory: 298,
      avgDays: 30,
      demand: 84,
      supply: 50,
      transactions: 176,
      coords: { x: 55, y: 50 }
    }
  ];

  const getHeatColor = (value: number, metric: Metric): string => {
    if (metric === 'price') {
      if (value >= 500000) return '#EF4444'; // Red - Very High
      if (value >= 450000) return '#F97316'; // Orange - High
      if (value >= 400000) return '#F59E0B'; // Yellow - Medium
      return '#10B981'; // Green - Low
    }
    if (metric === 'demand') {
      if (value >= 90) return '#EF4444';
      if (value >= 80) return '#F97316';
      if (value >= 70) return '#F59E0B';
      return '#10B981';
    }
    if (metric === 'supply') {
      if (value >= 50) return '#10B981'; // High supply = Good
      if (value >= 40) return '#F59E0B';
      if (value >= 30) return '#F97316';
      return '#EF4444'; // Low supply = Bad
    }
    return '#19F6FF';
  };

  const getMetricValue = (zip: ZipData, metric: Metric): number => {
    switch (metric) {
      case 'price': return zip.price;
      case 'demand': return zip.demand;
      case 'supply': return zip.supply;
      case 'transactions': return zip.transactions;
      default: return zip.price;
    }
  };

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.25, 0.5));

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">🗺️ ZIP Code Heatmap</h1>
          <p className="text-gray-400">Interactive heat map showing market metrics by ZIP code</p>
        </div>

        {/* Controls */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Layers className="w-5 h-5 text-[#19F6FF]" />
                <span className="text-sm font-semibold text-white">Metric:</span>
                <div className="flex gap-2">
                  {([
                    { id: 'price', label: 'Median Price', icon: DollarSign },
                    { id: 'demand', label: 'Demand Score', icon: TrendingUp },
                    { id: 'supply', label: 'Supply Level', icon: Home },
                    { id: 'transactions', label: 'Transactions', icon: Map },
                  ] as const).map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <button
                        key={metric.id}
                        onClick={() => setSelectedMetric(metric.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          selectedMetric === metric.id
                            ? 'bg-[#19F6FF] text-black'
                            : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {metric.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 border border-gray-700"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
              <span className="text-sm font-medium text-white w-16 text-center">{(zoomLevel * 100).toFixed(0)}%</span>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 2}
                className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 border border-gray-700"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Heat Scale:</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-green-500"></div>
                <span className="text-xs text-gray-400">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-yellow-500"></div>
                <span className="text-xs text-gray-400">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-orange-500"></div>
                <span className="text-xs text-gray-400">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-red-500"></div>
                <span className="text-xs text-gray-400">Very High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          <div 
            className="relative bg-gray-800 rounded-lg overflow-hidden"
            style={{ 
              height: '600px',
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease'
            }}
          >
            {/* Map Grid Background */}
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>

            {/* ZIP Code Markers */}
            {zipCodes.map((zip) => {
              const value = getMetricValue(zip, selectedMetric);
              const color = getHeatColor(value, selectedMetric);
              const isSelected = selectedZip?.zip === zip.zip;
              
              return (
                <div
                  key={zip.zip}
                  onClick={() => setSelectedZip(zip)}
                  className="absolute cursor-pointer transition-all hover:z-50"
                  style={{
                    left: `${zip.coords.x}%`,
                    top: `${zip.coords.y}%`,
                    transform: isSelected ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%)'
                  }}
                >
                  {/* Pulse Effect */}
                  {isSelected && (
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{ backgroundColor: color, opacity: 0.3 }}
                    ></div>
                  )}
                  
                  {/* Marker */}
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-white"
                    style={{ backgroundColor: color }}
                  >
                    <span className="text-xs font-bold text-white">{zip.zip}</span>
                  </div>

                  {/* Label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 whitespace-nowrap">
                    <div className="bg-gray-900 border border-gray-700 rounded px-2 py-1">
                      <div className="text-xs font-bold text-white">{zip.name}</div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Map Labels */}
            <div className="absolute top-4 left-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3">
              <div className="text-xs font-bold text-white mb-1">Raleigh-Durham Metro</div>
              <div className="text-xs text-gray-400">North Carolina</div>
            </div>
          </div>
        </div>

        {/* Selected ZIP Details */}
        {selectedZip && (
          <div className="bg-gradient-to-r from-[#19F6FF]/10 to-[#00BCC9]/10 border border-[#19F6FF]/30 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">ZIP Code {selectedZip.zip}</h3>
                <p className="text-gray-400">{selectedZip.name}</p>
              </div>
              <button
                onClick={() => setSelectedZip(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-5 gap-4">
              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Median Price</div>
                <div className="text-xl font-bold text-white">${(selectedZip.price / 1000).toFixed(0)}k</div>
                <div className="text-xs text-green-400 mt-1">+{selectedZip.priceChange}%</div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Inventory</div>
                <div className="text-xl font-bold text-white">{selectedZip.inventory}</div>
                <div className="text-xs text-gray-500 mt-1">Active</div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Avg Days</div>
                <div className="text-xl font-bold text-white">{selectedZip.avgDays}</div>
                <div className="text-xs text-gray-500 mt-1">On market</div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Demand Score</div>
                <div className="text-xl font-bold text-white">{selectedZip.demand}</div>
                <div className="text-xs text-gray-500 mt-1">Out of 100</div>
              </div>

              <div className="p-4 bg-gray-900/50 rounded-lg">
                <div className="text-xs text-gray-400 mb-1">Transactions</div>
                <div className="text-xl font-bold text-white">{selectedZip.transactions}</div>
                <div className="text-xs text-gray-500 mt-1">Last 90 days</div>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 bg-[#19F6FF] text-black rounded-lg hover:bg-[#00BCC9] transition-colors font-medium text-sm">
                View Full Report
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium text-sm border border-gray-700">
                Export Data
              </button>
            </div>
          </div>
        )}

        {/* ZIP Code List */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">All ZIP Codes ({zipCodes.length})</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {zipCodes.map((zip) => {
              const value = getMetricValue(zip, selectedMetric);
              const color = getHeatColor(value, selectedMetric);
              
              return (
                <div
                  key={zip.zip}
                  onClick={() => setSelectedZip(zip)}
                  className="p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-lg cursor-pointer transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: color }}
                    >
                      {zip.zip.slice(-3)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{zip.zip} - {zip.name}</div>
                      <div className="text-xs text-gray-400">
                        {selectedMetric === 'price' && `$${(zip.price / 1000).toFixed(0)}k`}
                        {selectedMetric === 'demand' && `Demand: ${zip.demand}`}
                        {selectedMetric === 'supply' && `Supply: ${zip.supply}`}
                        {selectedMetric === 'transactions' && `${zip.transactions} txns`}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    Click to view
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-[#19F6FF] text-black font-bold rounded-lg hover:bg-[#00BCC9] transition-colors">
            Export Heatmap
          </button>
          <button className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
            Download ZIP Data
          </button>
        </div>
      </div>
    </div>
  );
}