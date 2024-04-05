// Import necessary modules
import axios from 'axios';
import  refreshToken  from '../features/auth/authService' //Assume you have a function to refresh tokens

// Create Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: '/api', // Your API base URL
});

// Add request interceptor to handle token refresh
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        localStorage.setItem('accessToken', newToken);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // Handle refresh failure, e.g., redirect to login page
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
