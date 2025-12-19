import api from "./BaseApis";

export interface MarketPulseResponse {
    status: string;
    total_markets: number;
    total_records: number;
    avg_aps_score: number;
    avg_churn_index: number;
    high_opportunity_markets: number;
    medium_opportunity_markets: number;
    low_opportunity_markets: number;
    top_markets: Array<{
        city: string;
        state: string;
        avg_aps_score: number;
        total_records: number;
        market_type: string;
    }>;
    timestamp: string;
}

export interface ZipInsight {
    zip_code: string;
    market_type: string;
    median_equity_pct: number;
    median_ltv_pct: number;
    median_equity_dollar: number;
    churn_potential: string;
    opportunity_class: string;
    record_count: number;
}

export interface TopOpportunity {
    property_id: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    est_value: number;
    total_loan_bal: number;
    equity: number;
    equity_pct: number;
    ltv: number;
    aps_score: number;
    tier: string;
}

export interface MarketIntelResponse {
    message?: string;
    market_intel_id?: number;
    report_id?: string;
    city: string;
    state: string;
    zip_code?: string | null;
    total_records?: number;
    summary: {
        total_records?: number;
        median_ltv: number;
        median_equity_pct: number;
        median_equity_dollar: number;
        median_loan_age: number;
        median_aps_score: number;
        median_churn_index: number;
        median_velocity_index: number;
        refi_opportunity_count: number;
        refi_opportunity_pct: number;
        market_type: string;
    };
    tier_distribution: Record<string, number>;
    zip_insights: ZipInsight[];
    top_opportunities?: TopOpportunity[];
    narrative: string;
    created_at: string;
    processed_at?: string;
}

export const MarketIntelApi = {
    async getMarketPulse(): Promise<MarketPulseResponse> {
        try {
            const response = await api.get("/v1/pulse");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch market pulse" };
        }
    },

    async generateMarketIntel(
        city: string,
        reportId?: string
    ): Promise<MarketIntelResponse> {
        try {
            const params: any = { city };
            if (reportId) params.report_id = reportId;

            const response = await api.post("/v1/market-intel", null, { params });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to generate market intel" };
        }
    },

    async getMarketIntel(city: string): Promise<MarketIntelResponse> {
        try {
            const response = await api.get("/v1/market-intel", {
                params: { city },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch market intel" };
        }
    },
};
