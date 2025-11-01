/**
 * Product Service
 * Handles all product-related API calls
 */

import { apiService } from './api';
import { API_CONFIG } from '@/config/config';

export const productService = {
  /**
   * Get all products with optional filters
   * @param {Object} params - Query parameters (search, status, page, limit)
   * @returns {Promise} Product list with pagination data
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, {
        params,
      });
      return {
        success: true,
        data: response.data || [],
        meta: response.meta || {},
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Get single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} Product data
   */
  getById: async (id) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id));
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
   * Create new product
   * @param {Object} data - Product data
   * @returns {Promise} Created product
   */
  create: async (data) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.PRODUCTS.BASE, data);
      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        errors: error.errors || {},
      };
    }
  },

  /**
   * Update existing product
   * @param {string} id - Product ID
   * @param {Object} data - Updated product data
   * @returns {Promise} Updated product
   */
  update: async (id, data) => {
    try {
      const response = await apiService.put(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id), data);
      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        errors: error.errors || {},
      };
    }
  },

  /**
   * Delete product
   * @param {string} id - Product ID
   * @returns {Promise} Deletion confirmation
   */
  delete: async (id) => {
    try {
      const response = await apiService.delete(API_CONFIG.ENDPOINTS.PRODUCTS.BY_ID(id));
      return {
        success: true,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Sync products from Google Sheets
   * @returns {Promise} Sync result
   */
  syncFromSheets: async () => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.PRODUCTS.SYNC);
      return {
        success: true,
        data: response.data,
        message: response.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};