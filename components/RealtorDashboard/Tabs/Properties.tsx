const propertyData = {
    id: 1,                        // Unique ID
    address: '123 Oak Street',    // Property address
    city: 'Raleigh',             // City name
    zip: '27609',                // ZIP code
    propertyValue: 425000,       // Total property value (dollars)
    equity: 285000,              // Equity amount (dollars)
    equityPercent: 67,           // Equity percentage (%)
    churnProbability: 85,        // Churn probability (0-100)
    ownerName: 'John Davidson',  // Owner name
    apsScore: 82                 // APS Score (0-100)
};
// PropertyCard Component
const Property = ({ property = propertyData }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-teal-500/50 transition-all">
        <div className="flex items-start justify-between mb-3">
            <div>
                <h4 className="font-semibold text-lg mb-1">{property.address}</h4>
                <p className="text-sm text-gray-400">{property.city}, {property.zip}</p>
            </div>
            <span className={`px-2 py-1 rounded text-xs font-medium ${property.churnProbability > 80 ? 'bg-red-500/20 text-red-400' :
                    property.churnProbability > 60 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-teal-500/20 text-teal-400'
                }`}>
                {property.churnProbability}% Churn
            </span>
        </div>

        <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Property Value:</span>
                <span className="font-medium">${(property.propertyValue / 1000).toFixed(0)}k</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Equity:</span>
                <span className="font-medium text-teal-400">${(property.equity / 1000).toFixed(0)}k ({property.equityPercent}%)</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">Owner:</span>
                <span className="font-medium">{property.ownerName}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-gray-400">APS Score:</span>
                <span className="font-medium">{property.apsScore}/100</span>
            </div>
        </div>

        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2 text-sm font-medium transition-colors">
            View Details
        </button>
    </div>
);

// Sample Property Data (from mockData.investmentOpportunities)
const sampleProperties = [
    {
        id: 1,
        address: '123 Oak Street',
        city: 'Raleigh',
        zip: '27609',
        propertyValue: 425000,
        equity: 285000,
        equityPercent: 67,
        churnProbability: 85,
        ownerName: 'John Davidson',
        apsScore: 82
    },
    {
        id: 2,
        address: '456 Elm Avenue',
        city: 'Durham',
        zip: '27613',
        propertyValue: 580000,
        equity: 405000,
        equityPercent: 70,
        churnProbability: 72,
        ownerName: 'Sarah Mitchell',
        apsScore: 88
    },
    {
        id: 3,
        address: '789 Pine Boulevard',
        city: 'Cary',
        zip: '27601',
        propertyValue: 395000,
        equity: 220000,
        equityPercent: 56,
        churnProbability: 68,
        ownerName: 'Mike Rodriguez',
        apsScore: 74
    },
    {
        id: 4,
        address: '234 Maple Court',
        city: 'Raleigh',
        zip: '27617',
        propertyValue: 512000,
        equity: 368000,
        equityPercent: 72,
        churnProbability: 91,
        ownerName: 'Jennifer Lee',
        apsScore: 91
    },
    {
        id: 5,
        address: '567 Cedar Lane',
        city: 'Durham',
        zip: '27609',
        propertyValue: 445000,
        equity: 312000,
        equityPercent: 70,
        churnProbability: 78,
        ownerName: 'Robert Thompson',
        apsScore: 85
    },
    {
        id: 6,
        address: '890 Birch Drive',
        city: 'Cary',
        zip: '27613',
        propertyValue: 372000,
        equity: 198000,
        equityPercent: 53,
        churnProbability: 62,
        ownerName: 'Emily Carter',
        apsScore: 68
    },
    {
        id: 7,
        address: '123 Willow Way',
        city: 'Raleigh',
        zip: '27615',
        propertyValue: 298000,
        equity: 145000,
        equityPercent: 49,
        churnProbability: 55,
        ownerName: 'David Kim',
        apsScore: 58
    },
    {
        id: 8,
        address: '456 Spruce Street',
        city: 'Durham',
        zip: '27601',
        propertyValue: 625000,
        equity: 487000,
        equityPercent: 78,
        churnProbability: 88,
        ownerName: 'Lisa Anderson',
        apsScore: 94
    }
];

// Demo Component showing PropertyCards
const PropertyCardDemo = () => {
    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-5">Property Cards</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sampleProperties.map(property => (
                        <Property key={property.id} property={property} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PropertyCardDemo;