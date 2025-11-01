/**
 * Authentication Service
 * Handles login, logout, and token management
 */

import { apiService } from './api';
import { API_CONFIG, STORAGE_KEYS } from '@/config/config';

export const authService = {
  /**
   * Login user
   * @param {Object} credentials - Email and password
   * @returns {Promise} User data and token
   */
  login: async (credentials) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      
      if (response.success && response.data.token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      }
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Logout user
   * @returns {Promise} Logout confirmation
   */
  logout: async () => {
    try {
      await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      
      return {
        success: true,
      };
    } catch (error) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DATA);
      
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} User data
   */
  getProfile: async () => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.AUTH.PROFILE);
      
      if (response.success) {
        localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data));
      }
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get stored user data
   * @returns {Object|null} User data
   */
  getUser: () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  /**
   * Get auth token
   * @returns {string|null} Token
   */
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },
};