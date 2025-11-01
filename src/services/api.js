/**
 * API Service
 * Axios instance with interceptors for authentication and error handling
 */

import axios from 'axios';
import { API_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from '@/config/config';

/**
 * Create axios instance with base configuration
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Adds authentication token to all requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and errors globally
 */
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const { response } = error;

    if (!response) {
      return Promise.reject({
        message: ERROR_MESSAGES.NETWORK_ERROR,
        code: 'NETWORK_ERROR',
      });
    }

    switch (response.status) {
      case 401:
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER_DATA);
        window.location.href = '/login';
        return Promise.reject({
          message: ERROR_MESSAGES.UNAUTHORIZED,
          code: 'UNAUTHORIZED',
        });

      case 403:
        return Promise.reject({
          message: ERROR_MESSAGES.FORBIDDEN,
          code: 'FORBIDDEN',
        });

      case 404:
        return Promise.reject({
          message: ERROR_MESSAGES.NOT_FOUND,
          code: 'NOT_FOUND',
        });

      case 422:
        return Promise.reject({
          message: ERROR_MESSAGES.VALIDATION_ERROR,
          code: 'VALIDATION_ERROR',
          errors: response.data.errors || {},
        });

      case 500:
        return Promise.reject({
          message: ERROR_MESSAGES.SERVER_ERROR,
          code: 'SERVER_ERROR',
        });

      default:
        return Promise.reject({
          message: response.data?.message || ERROR_MESSAGES.GENERIC_ERROR,
          code: 'UNKNOWN_ERROR',
        });
    }
  }
);

/**
 * HTTP Methods
 */
export const apiService = {
  /**
   * GET request
   */
  get: (url, config = {}) => {
    return api.get(url, config);
  },

  /**
   * POST request
   */
  post: (url, data = {}, config = {}) => {
    return api.post(url, data, config);
  },

  /**
   * PUT request
   */
  put: (url, data = {}, config = {}) => {
    return api.put(url, data, config);
  },

  /**
   * PATCH request
   */
  patch: (url, data = {}, config = {}) => {
    return api.patch(url, data, config);
  },

  /**
   * DELETE request
   */
  delete: (url, config = {}) => {
    return api.delete(url, config);
  },
};

export default api;