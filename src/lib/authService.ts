import { API_BASE_URL, API_URLS } from "@/config/apiUrls";

export const getAccessToken = () => localStorage.getItem("accessToken");

export const login = async (emailOrUsername: string, password: string) => {
    try {
        console.log("#$ login", API_URLS.LOGIN_URL)
        const res = await fetch(API_URLS.LOGIN_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ emailOrUsername, password }),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error("Login failed:", errorText);
            throw new Error(`Login failed: ${res.status}`);
        }

        // Check if there's actually content in the response
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Invalid response format: expected JSON");
        }

        const data = await res.json();
        if (!data || !data.token) {
            throw new Error("Invalid response: missing access token");
        }

        localStorage.setItem("accessToken", data.token);
        if (data.refreshToken) {
            localStorage.setItem("refreshToken", data.refreshToken);
        }

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token available");

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  localStorage.setItem("accessToken", data.accessToken);
};

export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.href = "/login";
};

export const register = async (username: string, email: string, password: string, authorities: [string]) => {
  const res = await fetch(API_URLS.REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username,email, password, authorities }),
  });
  if(!res.ok) throw new Error("Registration Failed");
  return res.json();
};