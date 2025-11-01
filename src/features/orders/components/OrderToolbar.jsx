/**
 * OrderToolbar Component
 * Search, filter controls for orders
 * Includes: Search, Status filter, Payment filter, Date range filter
 */

import React, { useState } from "react";
import { Search, Filter, Calendar, X } from "lucide-react";

export const OrderToolbar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  onStatusFilter,
  paymentFilter,
  onPaymentFilter,
  dateRange,
  onDateRangeFilter,
  onClearFilters,
}) => {
  // ==================== LOCAL STATE ====================
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);

  // ==================== FILTER OPTIONS ====================
  const statusOptions = [
    "All",
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  const paymentOptions = ["All", "paid", "pending", "failed"];

  // ==================== HANDLERS ====================

  /**
   * Handle status filter selection
   * @param {string} status - Selected status
   */
  const handleStatusSelect = (status) => {
    onStatusFilter(status);
    setIsStatusOpen(false);
  };

  /**
   * Handle payment filter selection
   * @param {string} payment - Selected payment status
   */
  const handlePaymentSelect = (payment) => {
    onPaymentFilter(payment);
    setIsPaymentOpen(false);
  };

  /**
   * Handle date range apply
   */
  const handleDateApply = () => {
    setIsDateOpen(false);
  };

  /**
   * Check if any filters are active
   * @returns {boolean}
   */
  const hasActiveFilters = () => {
    return (
      searchQuery ||
      statusFilter !== "All" ||
      paymentFilter !== "All" ||
      dateRange.from ||
      dateRange.to
    );
  };

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
      {/* Search Bar */}
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by Order ID, customer name, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-10 w-full rounded-md border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Status Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
            statusFilter !== "All"
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300"
              : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          }`}
        >
          <Filter className="h-4 w-4" />
          <span className="capitalize">
            {statusFilter === "All" ? "Status" : statusFilter}
          </span>
        </button>

        {/* Status Dropdown Menu */}
        {isStatusOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsStatusOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 text-sm font-semibold border-b dark:border-slate-700">
                Filter by Status
              </div>
              <div className="py-1">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors capitalize ${
                      statusFilter === status
                        ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-semibold"
                        : ""
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Payment Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsPaymentOpen(!isPaymentOpen)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
            paymentFilter !== "All"
              ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300"
              : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          }`}
        >
          <Filter className="h-4 w-4" />
          <span className="capitalize">
            {paymentFilter === "All" ? "Payment" : paymentFilter}
          </span>
        </button>

        {/* Payment Dropdown Menu */}
        {isPaymentOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsPaymentOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 text-sm font-semibold border-b dark:border-slate-700">
                Filter by Payment
              </div>
              <div className="py-1">
                {paymentOptions.map((payment) => (
                  <button
                    key={payment}
                    onClick={() => handlePaymentSelect(payment)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors capitalize ${
                      paymentFilter === payment
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-300 font-semibold"
                        : ""
                    }`}
                  >
                    {payment}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Date Range Filter */}
      <div className="relative">
        <button
          onClick={() => setIsDateOpen(!isDateOpen)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
            dateRange.from || dateRange.to
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300"
              : "border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
          }`}
        >
          <Calendar className="h-4 w-4" />
          Date Range
        </button>

        {/* Date Range Dropdown */}
        {isDateOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDateOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 p-4">
              <div className="text-sm font-semibold mb-3 dark:text-slate-50">
                Select Date Range
              </div>

              {/* From Date */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) =>
                    onDateRangeFilter({ ...dateRange, from: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:[color-scheme:dark]"
                />
              </div>

              {/* To Date */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) =>
                    onDateRangeFilter({ ...dateRange, to: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:[color-scheme:dark]"
                />
              </div>

              {/* Apply Button */}
              <button
                onClick={handleDateApply}
                className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition-colors"
              >
                Apply
              </button>
            </div>
          </>
        )}
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters() && (
        <button
          onClick={onClearFilters}
          className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 underline whitespace-nowrap"
        >
          Clear All
        </button>
      )}
    </div>
  );
};
