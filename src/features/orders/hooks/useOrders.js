/**
 * useOrders Hook
 * Manages order state, filtering, search, pagination and CRUD operations
 */

import { useState, useMemo, useEffect } from "react";
import { initialOrders } from "../data/initialOrders";
import { useDebounce } from "../../../hooks/useDebounce";

export const useOrders = () => {
  // ==================== STATE ====================
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Debounce search query (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Auto-reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter, paymentFilter, dateRange]);

  // ==================== FILTERED ORDERS ====================
  const filteredOrders = useMemo(() => {
    let results = [];

    // Apply all filters
    results = orders.filter((order) => {
      // Search filter (Order ID, Customer Name, Phone)
      let matchesSearch = true;
      if (debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.trim();
        const orderId = (order.id || "").toString();
        const customerName = (order.customerName || "").toString();
        const customerPhone = (order.customerPhone || "").toString();

        // Normalize phone numbers (remove spaces for comparison)
        const normalizedQuery = query.replace(/\s+/g, "");
        const normalizedPhone = customerPhone.replace(/\s+/g, "");

        matchesSearch =
          orderId.toLowerCase().includes(query.toLowerCase()) ||
          customerName.toLowerCase().includes(query.toLowerCase()) ||
          normalizedPhone.includes(normalizedQuery);
      }

      // Status filter
      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;

      // Payment filter
      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      // Date range filter
      let matchesDate = true;
      if (dateRange.from && dateRange.to) {
        const orderDate = new Date(order.createdAt);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        matchesDate = orderDate >= fromDate && orderDate <= toDate;
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });

    // Pagination calculation
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return results.slice(startIndex, endIndex);
  }, [
    debouncedSearchQuery,
    orders,
    statusFilter,
    paymentFilter,
    dateRange,
    currentPage,
    itemsPerPage,
  ]);

  // Calculate total filtered orders (before pagination)
  const totalFilteredOrders = useMemo(() => {
    return orders.filter((order) => {
      let matchesSearch = true;
      if (debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.trim();
        const orderId = (order.id || "").toString();
        const customerName = (order.customerName || "").toString();
        const customerPhone = (order.customerPhone || "").toString();

        // Normalize phone numbers (remove spaces for comparison)
        const normalizedQuery = query.replace(/\s+/g, "");
        const normalizedPhone = customerPhone.replace(/\s+/g, "");

        matchesSearch =
          orderId.toLowerCase().includes(query.toLowerCase()) ||
          customerName.toLowerCase().includes(query.toLowerCase()) ||
          normalizedPhone.includes(normalizedQuery);
      }

      const matchesStatus =
        statusFilter === "All" || order.orderStatus === statusFilter;

      const matchesPayment =
        paymentFilter === "All" || order.paymentStatus === paymentFilter;

      let matchesDate = true;
      if (dateRange.from && dateRange.to) {
        const orderDate = new Date(order.createdAt);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        matchesDate = orderDate >= fromDate && orderDate <= toDate;
      }

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    }).length;
  }, [debouncedSearchQuery, orders, statusFilter, paymentFilter, dateRange]);

  const totalPages = Math.ceil(totalFilteredOrders / itemsPerPage);

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Generate new order ID
   * Format: ORD-XXX (auto-increment)
   */
  const generateOrderId = () => {
    const lastId = orders[orders.length - 1]?.id || "ORD-000";
    const num = parseInt(lastId.split("-")[1]) + 1;
    return `ORD-${num.toString().padStart(3, "0")}`;
  };

  /**
   * Calculate order totals
   * @param {Array} products - Array of products with quantity and price
   * @returns {Object} - { subtotal, tax, shipping, total }
   */
  const calculateTotals = (products, shippingCost = 0) => {
    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const tax = Math.round(subtotal * 0.1); // 10% tax
    const shipping = shippingCost;
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
  };

  // ==================== CRUD OPERATIONS ====================

  /**
   * Create new order
   * @param {Object} orderData - Order form data
   * @param {Function} onSuccess - Success callback
   */
  const handleCreateOrder = (orderData, onSuccess) => {
    try {
      const newOrder = {
        id: generateOrderId(),
        ...orderData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setOrders([newOrder, ...orders]);
      onSuccess?.("Order created successfully!");
    } catch (error) {
      console.error("Create order error:", error);
    }
  };

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} newStatus - New status
   * @param {Function} onSuccess - Success callback
   */
  const handleUpdateStatus = (orderId, newStatus, onSuccess) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              orderStatus: newStatus,
              updatedAt: new Date().toISOString(),
            }
          : order
      );

      setOrders(updatedOrders);
      onSuccess?.(`Order status updated to ${newStatus}!`);
    } catch (error) {
      console.error("Update status error:", error);
    }
  };

  /**
   * Update entire order
   * @param {string} orderId - Order ID
   * @param {Object} updatedData - Updated order data
   * @param {Function} onSuccess - Success callback
   */
  const handleUpdateOrder = (orderId, updatedData, onSuccess) => {
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              ...updatedData,
              updatedAt: new Date().toISOString(),
            }
          : order
      );

      setOrders(updatedOrders);
      onSuccess?.("Order updated successfully!");
    } catch (error) {
      console.error("Update order error:", error);
    }
  };

  /**
   * Delete order
   * @param {string} orderId - Order ID
   * @param {Function} onSuccess - Success callback
   */
  const handleDeleteOrder = (orderId, onSuccess) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        setOrders(orders.filter((order) => order.id !== orderId));
        onSuccess?.("Order deleted successfully!");
      } catch (error) {
        console.error("Delete order error:", error);
      }
    }
  };

  // ==================== FILTER ACTIONS ====================

  /**
   * Set order status filter
   * @param {string} status - Status to filter by
   */
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  /**
   * Set payment status filter
   * @param {string} status - Payment status to filter by
   */
  const handlePaymentFilter = (status) => {
    setPaymentFilter(status);
  };

  /**
   * Set date range filter
   * @param {Object} range - { from: 'YYYY-MM-DD', to: 'YYYY-MM-DD' }
   */
  const handleDateRangeFilter = (range) => {
    setDateRange(range);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setDateRange({ from: "", to: "" });
    setCurrentPage(1);
  };

  // ==================== RETURN ====================
  return {
    // State
    orders,
    filteredOrders,
    searchQuery,
    setSearchQuery,
    statusFilter,
    paymentFilter,
    dateRange,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalFilteredOrders,

    // Actions
    handleCreateOrder,
    handleUpdateStatus,
    handleUpdateOrder,
    handleDeleteOrder,
    handleStatusFilter,
    handlePaymentFilter,
    handleDateRangeFilter,
    clearFilters,

    // Helpers
    calculateTotals,
  };
};
