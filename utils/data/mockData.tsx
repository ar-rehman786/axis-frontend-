// Realtor/Investor Dashboard Mock Data

export const realtorMockData = {
  // KPIs (5 cards)
  kpis: {
    totalProperties: 1247,
    highEquity: 687,        // Properties with >50% equity
    saleReady: 312,         // High churn probability
    avgPropertyValue: 385000,
    medianDOM: 42           // Days on Market
  },

  // KPI Changes (for trend indicators)
  kpiChanges: {
    totalProperties: { value: 12, type: 'positive' },
    highEquity: { value: 8, type: 'positive' },
    saleReady: { value: 15, type: 'positive' },
    avgPropertyValue: { value: 2.3, type: 'positive' },
    medianDOM: { value: -5, type: 'positive' }  // Lower DOM is better
  },

  // Property Value by ZIP (Bar Chart Data)
  propertyValuesByZip: [
    { zip: '27609', avgValue: 425000, count: 342 },
    { zip: '27613', avgValue: 398000, count: 287 },
    { zip: '27601', avgValue: 365000, count: 298 },
    { zip: '27617', avgValue: 442000, count: 198 },
    { zip: '27615', avgValue: 312000, count: 122 }
  ],

  // Equity Distribution (Histogram Data)
  equityDistribution: [
    { range: '$0-100k', count: 125, color: '#FF6B6B' },
    { range: '$100-200k', count: 287, color: '#FFD166' },
    { range: '$200-300k', count: 342, color: '#00D1D1' },
    { range: '$300-400k', count: 298, color: '#00B8B8' },
    { range: '$400-500k', count: 142, color: '#008F8F' },
    { range: '$500k+', count: 53, color: '#006666' }
  ],

  // Investment Opportunities Table
  investmentOpportunities: [
    {
      id: 1,
      address: '123 Oak Street',
      city: 'Raleigh',
      zip: '27609',
      propertyValue: 425000,
      equity: 285000,
      equityPercent: 67,
      ltv: 33,
      churnProbability: 85,
      churnRisk: 'High',
      opportunityType: 'Pre-listing Contact',
      ownerName: 'John Davidson',
      loanAge: 28,
      apsScore: 82,
      lastContact: null,
      notes: 'Owner-occupied, stable equity growth'
    },
    {
      id: 2,
      address: '456 Elm Avenue',
      city: 'Durham',
      zip: '27613',
      propertyValue: 580000,
      equity: 405000,
      equityPercent: 70,
      ltv: 30,
      churnProbability: 72,
      churnRisk: 'Medium',
      opportunityType: 'Acquisition Target',
      ownerName: 'Sarah Mitchell',
      loanAge: 42,
      apsScore: 88,
      lastContact: '2024-10-15',
      notes: 'High equity, long-term hold potential'
    },
    {
      id: 3,
      address: '789 Pine Boulevard',
      city: 'Cary',
      zip: '27601',
      propertyValue: 395000,
      equity: 220000,
      equityPercent: 56,
      ltv: 44,
      churnProbability: 68,
      churnRisk: 'Medium',
      opportunityType: 'Equity Partner',
      ownerName: 'Mike Rodriguez',
      loanAge: 36,
      apsScore: 74,
      lastContact: null,
      notes: 'Potential cash-out refi candidate'
    },
    {
      id: 4,
      address: '234 Maple Court',
      city: 'Raleigh',
      zip: '27617',
      propertyValue: 512000,
      equity: 368000,
      equityPercent: 72,
      ltv: 28,
      churnProbability: 91,
      churnRisk: 'Very High',
      opportunityType: 'Immediate Contact',
      ownerName: 'Jennifer Lee',
      loanAge: 22,
      apsScore: 91,
      lastContact: null,
      notes: 'Prime listing opportunity, recent rate drop'
    },
    {
      id: 5,
      address: '567 Cedar Lane',
      city: 'Durham',
      zip: '27609',
      propertyValue: 445000,
      equity: 312000,
      equityPercent: 70,
      ltv: 30,
      churnProbability: 78,
      churnRisk: 'High',
      opportunityType: 'Pre-listing Contact',
      ownerName: 'Robert Thompson',
      loanAge: 31,
      apsScore: 85,
      lastContact: '2024-11-01',
      notes: 'Sent initial email, awaiting response'
    },
    {
      id: 6,
      address: '890 Birch Drive',
      city: 'Cary',
      zip: '27613',
      propertyValue: 372000,
      equity: 198000,
      equityPercent: 53,
      ltv: 47,
      churnProbability: 62,
      churnRisk: 'Medium',
      opportunityType: 'Nurture',
      ownerName: 'Emily Carter',
      loanAge: 45,
      apsScore: 68,
      lastContact: null,
      notes: 'Monitor for equity growth'
    },
    {
      id: 7,
      address: '123 Willow Way',
      city: 'Raleigh',
      zip: '27615',
      propertyValue: 298000,
      equity: 145000,
      equityPercent: 49,
      ltv: 51,
      churnProbability: 55,
      churnRisk: 'Low',
      opportunityType: 'Watch List',
      ownerName: 'David Kim',
      loanAge: 52,
      apsScore: 58,
      lastContact: null,
      notes: 'Approaching equity threshold'
    },
    {
      id: 8,
      address: '456 Spruce Street',
      city: 'Durham',
      zip: '27601',
      propertyValue: 625000,
      equity: 487000,
      equityPercent: 78,
      ltv: 22,
      churnProbability: 88,
      churnRisk: 'Very High',
      opportunityType: 'Immediate Contact',
      ownerName: 'Lisa Anderson',
      loanAge: 19,
      apsScore: 94,
      lastContact: null,
      notes: 'Ultra-high equity, prime target'
    },
    {
      id: 9,
      address: '789 Ash Avenue',
      city: 'Cary',
      zip: '27617',
      propertyValue: 438000,
      equity: 285000,
      equityPercent: 65,
      ltv: 35,
      churnProbability: 74,
      churnRisk: 'High',
      opportunityType: 'Acquisition Target',
      ownerName: 'Mark Wilson',
      loanAge: 34,
      apsScore: 79,
      lastContact: '2024-10-28',
      notes: 'Expressed interest in selling within 6 months'
    },
    {
      id: 10,
      address: '234 Poplar Place',
      city: 'Raleigh',
      zip: '27609',
      propertyValue: 392000,
      equity: 245000,
      equityPercent: 62,
      ltv: 38,
      churnProbability: 69,
      churnRisk: 'Medium',
      opportunityType: 'Pre-listing Contact',
      ownerName: 'Amy Chen',
      loanAge: 38,
      apsScore: 72,
      lastContact: null,
      notes: 'Good equity position, stable market'
    }
  ],

  // Property Data Grid (Full Dataset - 50 records)
  propertyDataGrid: [
    // First 10 same as above, then additional 40
    {
      id: 11,
      address: '567 Hickory Hill',
      city: 'Durham',
      zip: '27613',
      propertyValue: 485000,
      equity: 328000,
      equityPercent: 68,
      ltv: 32,
      loanAge: 26,
      apsScore: 83,
      churnProbability: 76,
      ownerName: 'Brian Foster'
    },
    {
      id: 12,
      address: '890 Magnolia Drive',
      city: 'Raleigh',
      zip: '27601',
      propertyValue: 356000,
      equity: 198000,
      equityPercent: 56,
      ltv: 44,
      loanAge: 41,
      apsScore: 67,
      churnProbability: 63,
      ownerName: 'Rachel Green'
    },
    // ... (add 38 more similar records)
  ],

  // Churn Risk Distribution
  churnRiskBreakdown: [
    { risk: 'Very High', count: 87, percent: 7, color: '#FF0000' },
    { risk: 'High', count: 312, percent: 25, color: '#FF6B6B' },
    { risk: 'Medium', count: 487, percent: 39, color: '#FFD166' },
    { risk: 'Low', count: 298, percent: 24, color: '#00D1D1' },
    { risk: 'Very Low', count: 63, percent: 5, color: '#9CA3AF' }
  ],

  // Market Activity by ZIP
  marketActivityByZip: [
    { 
      zip: '27609', 
      activeListings: 142, 
      medianDOM: 38, 
      priceReductions: 18,
      medianPrice: 425000,
      trend: 'Hot Market'
    },
    { 
      zip: '27613', 
      activeListings: 98, 
      medianDOM: 42, 
      priceReductions: 15,
      medianPrice: 398000,
      trend: 'Stable'
    },
    { 
      zip: '27601', 
      activeListings: 87, 
      medianDOM: 45, 
      priceReductions: 22,
      medianPrice: 365000,
      trend: 'Cooling'
    },
    { 
      zip: '27617', 
      activeListings: 54, 
      medianDOM: 32, 
      priceReductions: 12,
      medianPrice: 442000,
      trend: 'Very Hot'
    },
    { 
      zip: '27615', 
      activeListings: 76, 
      medianDOM: 51, 
      priceReductions: 28,
      medianPrice: 312000,
      trend: 'Buyer\'s Market'
    }
  ],

  // Opportunity Types Summary
  opportunityTypesSummary: [
    { type: 'Immediate Contact', count: 87, avgEquity: 368000, priority: 'Urgent' },
    { type: 'Pre-listing Contact', count: 198, avgEquity: 285000, priority: 'High' },
    { type: 'Acquisition Target', count: 156, avgEquity: 312000, priority: 'High' },
    { type: 'Equity Partner', count: 124, avgEquity: 220000, priority: 'Medium' },
    { type: 'Nurture', count: 342, avgEquity: 185000, priority: 'Low' },
    { type: 'Watch List', count: 340, avgEquity: 145000, priority: 'Monitor' }
  ],

  // ROI Calculator Data (for investment analysis)
  roiScenarios: [
    {
      scenario: 'Quick Flip',
      purchasePrice: 425000,
      rehabCost: 35000,
      holdingTime: '3-6 months',
      estimatedARV: 495000,
      roi: 7.6,
      annualizedROI: 15.2
    },
    {
      scenario: 'Buy & Hold',
      purchasePrice: 425000,
      rehabCost: 15000,
      holdingTime: '5 years',
      estimatedAppreciation: 5.2,
      cashFlow: 850,
      roi: 12.3,
      annualizedROI: 12.3
    },
    {
      scenario: 'Wholesale',
      purchasePrice: 425000,
      assignmentFee: 15000,
      holdingTime: '0-1 month',
      roi: 3.5,
      annualizedROI: 42
    }
  ],

  // Market Trends (for charts)
  propertyValueTrend: [
    { month: 'Jun 2024', avgValue: 365000 },
    { month: 'Jul 2024', avgValue: 372000 },
    { month: 'Aug 2024', avgValue: 378000 },
    { month: 'Sep 2024', avgValue: 381000 },
    { month: 'Oct 2024', avgValue: 385000 },
    { month: 'Nov 2024', avgValue: 385000 }
  ],

  // Contact Status Breakdown
  contactStatus: [
    { status: 'Not Contacted', count: 892, percent: 71.5 },
    { status: 'Email Sent', count: 198, percent: 15.9 },
    { status: 'Phone Call Made', count: 87, percent: 7.0 },
    { status: 'Meeting Scheduled', count: 42, percent: 3.4 },
    { status: 'Under Contract', count: 18, percent: 1.4 },
    { status: 'Closed Deal', count: 10, percent: 0.8 }
  ]
};