import api from "./BaseApis";



export interface FeedDetectionResponse {
    detected_feed: string;
    confidence: number;
    filename: string;
    total_rows: number;
    matched_columns: string[];
    feed_config: {
        name: string;
        description: string;
        pricing_tier: string;
    };
}

export interface FeedStatsResponse {
    total_feeds_processed: number;
    feed_breakdown: Record<string, number>;
    total_records: number;
    avg_records_per_feed: number;
}

export interface FeedConfig {
    feed_type: string;
    name: string;
    description: string;
    pricing_tier: string;
    page_count: number;
    required_columns?: string[];
    analysis_blocks?: string[];
}

export const FeedsApi = {
    async detectFeed(file: File): Promise<FeedDetectionResponse> {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post("/api/v1/feeds/detect", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Feed detection failed" };
        }
    },

    async getFeedStats(): Promise<FeedStatsResponse> {
        try {
            const response = await api.get("/api/v1/feeds/stats");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch feed stats" };
        }
    },

    async getFeedConfigs(): Promise<FeedConfig[]> {
        try {
            const response = await api.get("/api/v1/feeds/config");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch feed configs" };
        }
    },

    async getFeedConfig(feedType: string): Promise<FeedConfig> {
        try {
            const response = await api.get(`/api/v1/feeds/config/${feedType}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch feed config" };
        }
    },
};
