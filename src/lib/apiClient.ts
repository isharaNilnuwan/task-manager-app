import axios from "axios";
import { getAccessToken, refreshToken, logout } from "./authService";
import { API_BASE_URL } from "@/config/apiUrls";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await refreshToken();
        return apiClient(error.config); // Retry failed request
      } catch {
        logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
