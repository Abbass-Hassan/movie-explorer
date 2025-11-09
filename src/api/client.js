import axios from 'axios';
import { API_BASE_URL } from '../constants/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const { method, url } = config;
    console.log(`[API] Request: ${method?.toUpperCase()} ${url}`);
    return config;
  },
  (error) => {
    console.error('[API] Request error:', error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API] Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(
        `[API] Response error: ${error.response.status} ${error.response.config?.url}`,
        error.response.data,
      );
    } else {
      console.error('[API] Network or server error:', error.message);
    }
    return Promise.reject(error);
  },
);

