/**
 * Order Service
 * Handles all order-related API calls
 * Similar pattern to productService for consistency
 */

import { apiService } from "./api";
import { API_CONFIG } from "@/config/config";

export const orderService = {
  /**
   * Get all orders with optional filters
   * @param {Object} params - Query parameters (search, status, payment_status, date_from, date_to, page, limit)
   * @returns {Promise} Order list with pagination data
   */
  getAll: async (params = {}) => {
    try {
      const response = await apiService.get(API_CONFIG.ENDPOINTS.ORDERS.BASE, {
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
   * Get single order by ID
   * @param {string} id - Order ID
   * @returns {Promise} Order data with full details
   */
  getById: async (id) => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id)
      );
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
   * Create new order
   * @param {Object} data - Order data (customer, products, address, etc.)
   * @returns {Promise} Created order
   */
  create: async (data) => {
    try {
      const response = await apiService.post(
        API_CONFIG.ENDPOINTS.ORDERS.BASE,
        data
      );
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
   * Update existing order
   * @param {string} id - Order ID
   * @param {Object} data - Updated order data
   * @returns {Promise} Updated order
   */
  update: async (id, data) => {
    try {
      const response = await apiService.put(
        API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id),
        data
      );
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
   * Update order status only
   * @param {string} id - Order ID
   * @param {string} status - New status (pending, processing, shipped, delivered, cancelled)
   * @returns {Promise} Updated order
   */
  updateStatus: async (id, status) => {
    try {
      const response = await apiService.patch(
        API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id),
        {
          orderStatus: status,
        }
      );
      return {
        success: true,
        data: response.data,
        message: response.message || `Order status updated to ${status}`,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Delete order
   * @param {string} id - Order ID
   * @returns {Promise} Deletion confirmation
   */
  delete: async (id) => {
    try {
      const response = await apiService.delete(
        API_CONFIG.ENDPOINTS.ORDERS.BY_ID(id)
      );
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
   * Generate invoice for order (Optional - for future)
   * @param {string} id - Order ID
   * @returns {Promise} Invoice PDF URL or data
   */
  generateInvoice: async (id) => {
    try {
      const response = await apiService.get(
        API_CONFIG.ENDPOINTS.ORDERS.INVOICE(id)
      );
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
