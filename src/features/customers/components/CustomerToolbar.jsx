/**
 * CustomerToolbar Component
 * Search and filter controls for customers
 * Includes: Search bar and Status filter
 */

import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

export const CustomerToolbar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  onStatusFilter,
  onClearFilters,
}) => {
  // ==================== LOCAL STATE ====================
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // ==================== FILTER OPTIONS ====================
  const statusOptions = ["All", "active", "inactive"];

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
   * Check if any filters are active
   * @returns {boolean}
   */
  const hasActiveFilters = () => {
    return searchQuery || statusFilter !== "All";
  };

  // ==================== RENDER ====================
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
      {/* Search Bar */}
      <div className="relative flex-1 w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by id, name, phone, email, or company..."
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
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsStatusOpen(false)}
            />

            {/* Dropdown */}
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
