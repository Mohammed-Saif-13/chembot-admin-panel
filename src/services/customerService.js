/**
 * Customer Service
 * Handles all customer-related API calls
 * Similar pattern to productService and orderService for consistency
 */

import { apiService } from './api';
import { API_CONFIG } from '@/config/config';

export const customerService = {
  /**
   * Get all customers with optional filters
   * @param {Object} params - Query parameters (search, status, page, limit)
   * @returns {Promise} Customer list with pagination data
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.CUSTOMERS.BASE, {
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
   * Get single customer by ID
   * @param {string} id - Customer ID
   * @returns {Promise} Customer data with order history
   */
  getById: async (id) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.CUSTOMERS.BY_ID(id));
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
   * Create new customer
   * @param {Object} data - Customer data (name, email, phone, company, address)
   * @returns {Promise} Created customer
   */
  create: async (data) => {
    try {
      const response = await apiService.post(API_CONFIG.ENDPOINTS.CUSTOMERS.BASE, data);
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
   * Update existing customer
   * @param {string} id - Customer ID
   * @param {Object} data - Updated customer data
   * @returns {Promise} Updated customer
   */
  update: async (id, data) => {
    try {
      const response = await apiService.put(API_CONFIG.ENDPOINTS.CUSTOMERS.BY_ID(id), data);
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
   * Delete customer
   * @param {string} id - Customer ID
   * @returns {Promise} Deletion confirmation
   */
  delete: async (id) => {
    try {
      const response = await apiService.delete(API_CONFIG.ENDPOINTS.CUSTOMERS.BY_ID(id));
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
   * Get customer order history
   * @param {string} id - Customer ID
   * @returns {Promise} List of customer orders
   */
  getOrderHistory: async (id) => {
    try {
      const response = await apiService.get(`${API_CONFIG.ENDPOINTS.CUSTOMERS.BY_ID(id)}/orders`);
      return {
        success: true,
        data: response.data || [],
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};