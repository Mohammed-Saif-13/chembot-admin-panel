/**
 * Product Toolbar Component
 * Search, filter, and settings controls
 */

import React, { useState } from 'react';
import { Search, ListFilter, Settings2, X } from 'lucide-react';

export const ProductToolbar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  onFilterSelect,
  showOutOfStock,
  setShowOutOfStock,
  onClearFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleFilterSelect = (status) => {
    onFilterSelect(status);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name, formula, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-9 w-full rounded-md border border-slate-300 bg-slate-100 dark:bg-slate-800 dark:border-slate-700 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
            statusFilter !== 'All'
              ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
              : 'border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800'
          }`}
        >
          <ListFilter className="h-4 w-4" />
          {statusFilter === 'All' ? 'Filter' : statusFilter}
        </button>

        {isFilterOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 text-sm font-semibold border-b dark:border-slate-700">
                Filter by Status
              </div>
              <div className="py-1">
                {['All', 'Active', 'Low Stock', 'Out of Stock'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleFilterSelect(status)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                      statusFilter === status
                        ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 font-semibold'
                        : ''
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

      {/* Settings Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800 transition-colors"
        >
          <Settings2 className="h-4 w-4" />
        </button>

        {isSettingsOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsSettingsOpen(false)} />
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden">
              <div className="px-3 py-2 text-sm font-semibold border-b dark:border-slate-700">
                Display Options
              </div>
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Show Out of Stock
                  </span>
                  <button
                    onClick={() => setShowOutOfStock(!showOutOfStock)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showOutOfStock ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showOutOfStock ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Clear Filters */}
      {(searchQuery || statusFilter !== 'All') && (
        <button
          onClick={onClearFilters}
          className="px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 underline"
        >
          Clear All
        </button>
      )}
    </div>
  );
};