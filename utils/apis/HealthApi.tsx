import api from "./BaseApis";

export interface HealthResponse {
    status: string;
    version: string;
    timestamp: string;
}

export const HealthApi = {
    async checkHealth(): Promise<HealthResponse> {
        try {
            const response = await api.get("/api/v1/ingest/health");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Health check failed" };
        }
    },
};
