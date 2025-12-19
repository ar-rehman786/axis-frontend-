import api from "./BaseApis";

export interface ReportUploadResponse {
    id: string;
    original_filename: string;
    status: string;
    created_at: string;
    message: string;
}

export interface ReportStatus {
    id: string;
    original_filename: string;
    status: string;
    created_at: string;
    completed_at: string | null;
    error_message: string | null;
}

export const ReportsApi = {
    async uploadReport(file: File): Promise<ReportUploadResponse> {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await api.post("/api/v1/reports/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Report upload failed" };
        }
    },

    async getReportStatus(reportId: string): Promise<ReportStatus> {
        try {
            const response = await api.get(`/api/v1/reports/status/${reportId}`);
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch report status" };
        }
    },

    async downloadReport(reportId: string): Promise<Blob> {
        try {
            const response = await api.get(`/api/v1/reports/download/${reportId}`, {
                responseType: "blob",
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to download report" };
        }
    },

    async downloadReportPDF(reportId: string): Promise<Blob> {
        try {
            const response = await api.get(`/api/v1/reports/download/${reportId}/pdf`, {
                responseType: "blob",
            });
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to download PDF report" };
        }
    },

    async listReports(): Promise<ReportStatus[]> {
        try {
            const response = await api.get("/api/v1/reports/list");
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { message: "Failed to fetch reports list" };
        }
    },
};
