import api from "../BaseApis";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function LoginApi(payload: LoginPayload) {
  try {
    const response = await api.post("/auth/login", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
}
