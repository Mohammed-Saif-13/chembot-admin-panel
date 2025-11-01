/**
 * useCustomers Hook
 * Manages customer state, filtering, search, pagination and operations
 */

import { useState, useMemo, useEffect } from "react";
import { initialCustomers } from "../data/initialCustomers";
import { initialOrders } from "@/features/orders/data/initialOrders";
import { useDebounce } from "../../../hooks/useDebounce";

export const useCustomers = () => {
  // ==================== STATE ====================
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  // Debounce search query (300ms delay)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Auto-reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter]);

  // ==================== FILTERED CUSTOMERS ====================
  const filteredCustomers = useMemo(() => {
    let results = [];

    // Apply all filters
    results = customers.filter((customer) => {
      // Search filter (Name, Email, Phone, Company, ID)
      let matchesSearch = true;
      if (debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.trim();
        const name = (customer.name || "").toString();
        const email = (customer.email || "").toString();
        const phone = (customer.phone || "").toString();
        const company = (customer.company || "").toString();
        const customerId = (customer.id || "").toString();

        // Normalize phone numbers (remove spaces for comparison)
        const normalizedQuery = query.replace(/\s+/g, "");
        const normalizedPhone = phone.replace(/\s+/g, "");

        matchesSearch =
          name.toLowerCase().includes(query.toLowerCase()) ||
          email.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          customerId.toLowerCase().includes(query.toLowerCase()) ||
          normalizedPhone.includes(normalizedQuery);
      }

      // Status filter
      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    // Pagination calculation
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return results.slice(startIndex, endIndex);
  }, [
    debouncedSearchQuery,
    customers,
    statusFilter,
    currentPage,
    itemsPerPage,
  ]);

  // Calculate total filtered customers (before pagination)
  const totalFilteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      let matchesSearch = true;
      if (debouncedSearchQuery.trim()) {
        const query = debouncedSearchQuery.trim();
        const name = (customer.name || "").toString();
        const email = (customer.email || "").toString();
        const phone = (customer.phone || "").toString();
        const company = (customer.company || "").toString();
        const customerId = (customer.id || "").toString();

        const normalizedQuery = query.replace(/\s+/g, "");
        const normalizedPhone = phone.replace(/\s+/g, "");

        matchesSearch =
          name.toLowerCase().includes(query.toLowerCase()) ||
          email.toLowerCase().includes(query.toLowerCase()) ||
          company.toLowerCase().includes(query.toLowerCase()) ||
          customerId.toLowerCase().includes(query.toLowerCase()) ||
          normalizedPhone.includes(normalizedQuery);
      }

      const matchesStatus =
        statusFilter === "All" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    }).length;
  }, [debouncedSearchQuery, customers, statusFilter]);

  const totalPages = Math.ceil(totalFilteredCustomers / itemsPerPage);

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Generate new customer ID
   * Format: CUST-XXX (auto-increment)
   */
  const generateCustomerId = () => {
    const lastId = customers[customers.length - 1]?.id || "CUST-000";
    const num = parseInt(lastId.split("-")[1]) + 1;
    return `CUST-${num.toString().padStart(3, "0")}`;
  };

  /**
   * Get customer order history by customer ID
   * @param {string} customerId - Customer ID
   * @returns {Array} - Array of orders for this customer
   */
  const getCustomerOrders = (customerId) => {
    return initialOrders.filter((order) => order.customerId === customerId);
  };

  /**
   * Calculate customer statistics
   * @param {string} customerId - Customer ID
   * @returns {Object} - { totalOrders, totalSpent, lastOrderDate }
   */
  const getCustomerStats = (customerId) => {
    const orders = getCustomerOrders(customerId);

    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => {
      if (order.paymentStatus === "paid") {
        return sum + order.totalAmount;
      }
      return sum;
    }, 0);

    const lastOrder = orders.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )[0];
    const lastOrderDate = lastOrder ? lastOrder.createdAt : null;

    return { totalOrders, totalSpent, lastOrderDate };
  };

  // ==================== CRUD OPERATIONS ====================

  /**
   * Create new customer
   * @param {Object} customerData - Customer form data
   * @param {Function} onSuccess - Success callback
   */
  const handleCreateCustomer = (customerData, onSuccess) => {
    try {
      const newCustomer = {
        id: generateCustomerId(),
        ...customerData,
        totalOrders: 0,
        totalSpent: 0,
        status: "active",
        joinedDate: new Date().toISOString(),
        lastOrderDate: null,
      };

      setCustomers([newCustomer, ...customers]);
      onSuccess?.("Customer added successfully!");
    } catch (error) {
      console.error("Create customer error:", error);
    }
  };

  /**
   * Update existing customer
   * @param {string} customerId - Customer ID
   * @param {Object} updatedData - Updated customer data
   * @param {Function} onSuccess - Success callback
   */
  const handleUpdateCustomer = (customerId, updatedData, onSuccess) => {
    try {
      const updatedCustomers = customers.map((customer) =>
        customer.id === customerId ? { ...customer, ...updatedData } : customer
      );

      setCustomers(updatedCustomers);
      onSuccess?.("Customer updated successfully!");
    } catch (error) {
      console.error("Update customer error:", error);
    }
  };

  /**
   * Delete customer
   * @param {string} customerId - Customer ID
   * @param {Function} onSuccess - Success callback
   */
  const handleDeleteCustomer = (customerId, onSuccess) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        setCustomers(
          customers.filter((customer) => customer.id !== customerId)
        );
        onSuccess?.("Customer deleted successfully!");
      } catch (error) {
        console.error("Delete customer error:", error);
      }
    }
  };

  /**
   * Toggle customer status (active/inactive)
   * @param {string} customerId - Customer ID
   * @param {Function} onSuccess - Success callback
   */
  const handleToggleStatus = (customerId, onSuccess) => {
    try {
      const updatedCustomers = customers.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              status: customer.status === "active" ? "inactive" : "active",
            }
          : customer
      );

      setCustomers(updatedCustomers);
      onSuccess?.("Customer status updated!");
    } catch (error) {
      console.error("Toggle status error:", error);
    }
  };

  // ==================== FILTER ACTIONS ====================

  /**
   * Set status filter
   * @param {string} status - Status to filter by
   */
  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setCurrentPage(1);
  };

  // ==================== RETURN ====================
  return {
    // State
    customers,
    filteredCustomers,
    searchQuery,
    setSearchQuery,
    statusFilter,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
    totalFilteredCustomers,

    // Actions
    handleCreateCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
    handleToggleStatus,
    handleStatusFilter,
    clearFilters,

    // Helpers
    getCustomerOrders,
    getCustomerStats,
  };
};
