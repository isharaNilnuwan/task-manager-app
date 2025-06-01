export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export const API_URLS = {
  LOGIN_URL: `${API_BASE_URL}/api/auth/login`,
  REGISTER_URL: `${API_BASE_URL}/api/auth/register`,
  // Add more endpoints here
};