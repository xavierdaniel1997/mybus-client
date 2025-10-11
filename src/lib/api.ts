import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/app/(store)/useAuthStore';

// Extend AxiosRequestConfig to include the custom _retry property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_ORIGIN;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Required for refresh token cookies, if used
});

// Function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/new-accesstoken`, {}, { withCredentials: true });
    const { accessToken, expiresIn } = response.data; // Adjust based on your API response
    useAuthStore.getState().setToken(accessToken, expiresIn || 15 * 60); // Default to 15 minutes if expiresIn not provided
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    useAuthStore.getState().clearAuth(); // Clear auth state on failure
    window.location.href = '/login'; // Redirect to login page
    throw error;
  }
};

// Axios request interceptor to add token and handle refresh
api.interceptors.request.use(
  async (config) => {
    const { token, tokenExpiry } = useAuthStore.getState();

    // Check if token exists and is expired
    if (token && tokenExpiry && Date.now() >= tokenExpiry) {
      // Token is expired, refresh it
      const newToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${newToken}`;
    } else if (token) {
      // Token is valid, add it to headers
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig; // Use extended type
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops
      try {
        const newToken = await refreshAccessToken();
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Retry the original request with new token
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);