import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/app/(store)/useAuthStore";

// Extend AxiosRequestConfig to include the custom _retry property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_ORIGIN;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Global refresh in-flight promise to avoid race conditions
let refreshPromise: Promise<string | null> | null = null;

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/auth/new-accesstoken`,
      {},
      { withCredentials: true }
    );
    console.log(
      "the resposne of the refreshAccessToken#########################################",
      response
    );
    const { accessToken, expiresIn } = response.data;
    if (!accessToken) {
      throw new Error("No accessToken in refresh response");
    }
    useAuthStore.getState().setToken(accessToken, expiresIn || 15 * 60);
    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    useAuthStore.getState().clearAuth(); 
    window.location.href = "/"; 
    return null;
  }
};


api.interceptors.request.use(
  async (config) => {

     const { _hasHydrated } = useAuthStore.getState();
    if (!_hasHydrated) {
      await new Promise(resolve => {
        const interval = setInterval(() => {
          if (useAuthStore.getState()._hasHydrated) {
            clearInterval(interval);
            resolve(null);
          }
        }, 10);
      });
    }
    
    const { token, tokenExpiry } = useAuthStore.getState();
    const isExpired = token && tokenExpiry && Date.now() >= tokenExpiry;
    console.log("TOKEN: ", token);
    console.log("EXPIRY: ", tokenExpiry);
    console.log("IS EXPIRED:", isExpired);
    if (isExpired) {
      console.log("inside the isExpired statement", isExpired , "and", refreshPromise)
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newToken = await refreshPromise;
      if (newToken && config.headers) {
        config.headers.Authorization = `Bearer ${newToken}`;
      }
    } else if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if (status === 401) {
      useAuthStore.getState().clearAuth();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);
