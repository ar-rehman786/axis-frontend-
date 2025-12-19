import api from "./BaseApis";

export interface IngestPayload {
    market: string;
    file_url: string;
    schema_version?: string;
    alias_map?: Record<string, string>;
    chunk_rows?: number;
}

export interface IngestResponse {
    job_id: string;
    status: string;
    message: string;
    created_at: string;
}

export interface JobStatus {
    job_id: string;
    status: string;
    market: string;
    progress: {
        processed: number;
        total: number;
        failed: number;
    };
    feed_counts: Record<string, number>;
    created_at: string;
    completed_at: string | null;
    original_url: string;
}

export interface JobFeedsResponse {
    job_id: string;
    feed_counts: Record<string, number>;
    total_feeds: number;
}

export interface JobReportResponse {
    message: string;
    job_id: string;
    feed: string;
    note: string;
}

export const IngestApi = {
    async ingestData(payload: IngestPayload): Promise<IngestResponse> {
        try {
            const response = await api.post("/api/v1/ingest/ingest", payload);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Data ingestion failed" };
        }
    },

    async getJobStatus(jobId: string): Promise<JobStatus> {
        try {
            const response = await api.get(`/api/v1/ingest/job/${jobId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch job status" };
        }
    },

    async getJobFeeds(jobId: string): Promise<JobFeedsResponse> {
        try {
            const response = await api.get("/api/v1/ingest/feeds", {
                params: { job_id: jobId },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch job feeds" };
        }
    },

    async getJobReport(jobId: string, feed: string): Promise<JobReportResponse> {
        try {
            const response = await api.get("/api/v1/ingest/report", {
                params: { job_id: jobId, feed },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch job report" };
        }
    },
};
