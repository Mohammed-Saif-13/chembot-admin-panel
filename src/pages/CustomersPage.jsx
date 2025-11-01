/**
 * CustomersPage Component
 * Main customers management page
 * Handles customer listing, filtering, searching, and viewing order history
 */

import React, { useState } from "react";
import {
  Users,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Check,
  X as XIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useCustomers } from "../features/customers/hooks/useCustomers";
import { CustomerTable } from "../features/customers/components/CustomerTable";
import { CustomerToolbar } from "../features/customers/components/CustomerToolbar";
import { CustomerDetailsModal } from "../features/customers/components/CustomerDetailsModal";
import { UI_CONFIG } from "../config/config";
import { formatCurrency } from "@/lib/utils";

// ==================== INLINE NOTIFICATION ====================
const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {notification.type === "success" ? (
          <Check className="h-5 w-5" />
        ) : (
          <XIcon className="h-5 w-5" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const CustomersPage = () => {
  // ========== HOOKS ==========
  const {
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
    handleStatusFilter,
    handleDeleteCustomer,
    clearFilters,
    getCustomerOrders,
  } = useCustomers();

  // ========== LOCAL STATE ==========
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // ========== NOTIFICATION HANDLER ==========
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), UI_CONFIG.NOTIFICATION_DURATION);
  };

  // ========== EVENT HANDLERS ==========
  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsModalOpen(true);
  };

  const onDeleteCustomer = (customerId) => {
    handleDeleteCustomer(customerId, (message) => {
      showNotification(message);
      setIsDetailsModalOpen(false);
    });
  };

  // ========== STATISTICS CALCULATION ==========
  const calculateTotalRevenue = () => {
    return customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  };

  const getActiveCustomersCount = () => {
    return customers.filter((customer) => customer.status === "active").length;
  };

  const getTotalOrdersCount = () => {
    return customers.reduce((sum, customer) => sum + customer.totalOrders, 0);
  };

  const getAverageOrderValue = () => {
    const totalOrders = getTotalOrdersCount();
    if (totalOrders === 0) return 0;
    return calculateTotalRevenue() / totalOrders;
  };

  // ========== RENDER ==========
  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Customers Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage customer database from WhatsApp •{" "}
            {customers.length.toLocaleString()} total customers
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Customers */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-slate-50">
              {customers.length}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All registered customers
            </p>
          </CardContent>
        </Card>

        {/* Active Customers */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Active Customers
            </CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {getActiveCustomersCount()}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Orders
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {getTotalOrdersCount()}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              From all customers
            </p>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(Math.round(getAverageOrderValue()))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Per order average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details Modal */}
      <CustomerDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        customer={selectedCustomer}
        customerOrders={
          selectedCustomer ? getCustomerOrders(selectedCustomer.id) : []
        }
        onDeleteCustomer={onDeleteCustomer}
      />

      {/* Customers Table Card */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>All Customers</CardTitle>
          <CardDescription>
            View customer details and order history. Showing{" "}
            {filteredCustomers.length} of{" "}
            {totalFilteredCustomers.toLocaleString()} customers
            {totalFilteredCustomers !== customers.length &&
              ` (filtered from ${customers.length.toLocaleString()} total)`}
            .
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Toolbar - Search & Filters */}
          <CustomerToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilter={handleStatusFilter}
            onClearFilters={clearFilters}
          />

          {/* Customers Table */}
          <CustomerTable
            customers={filteredCustomers}
            onViewDetails={handleViewDetails}
          />

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
              {/* Items Per Page Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Show
                </span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  per page
                </span>
              </div>

              {/* Page Info */}
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Page {currentPage} of {totalPages} •{" "}
                {totalFilteredCustomers.toLocaleString()} total
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>

                    {currentPage > 2 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(1)}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage > 3 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(currentPage - 1)}
                          className="cursor-pointer"
                        >
                          {currentPage - 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationLink isActive>{currentPage}</PaginationLink>
                    </PaginationItem>

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(currentPage + 1)}
                          className="cursor-pointer"
                        >
                          {currentPage + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {currentPage < totalPages - 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}

                    {currentPage < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => setCurrentPage(totalPages)}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomersPage;
