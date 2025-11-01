import React, { useState, useMemo } from "react";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
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

import { useOrders } from "../features/orders/hooks/useOrders";
import { OrderTable } from "../features/orders/components/OrderTable";
import { OrderToolbar } from "../features/orders/components/OrderToolbar";
import { OrderDetailsModal } from "../features/orders/components/OrderDetailsModal";
import { UI_CONFIG } from "../config/config";
import { formatCurrency } from "@/lib/utils";

/**
 * Notification Component
 * Displays success/error messages
 */
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

/**
 * Statistic Card Component
 * Reusable card for displaying metrics
 */
const StatCard = ({ title, value, description, icon: Icon, iconColor }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {title}
      </CardTitle>
      <Icon className={`h-4 w-4 ${iconColor}`} />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold dark:text-slate-50">{value}</div>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
        {description}
      </p>
    </CardContent>
  </Card>
);

/**
 * OrdersPage Component
 * Main orders management interface with search, filters, and pagination
 */
const OrdersPage = () => {
  // ========== HOOKS ==========
  const {
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
    handleStatusFilter,
    handlePaymentFilter,
    handleDateRangeFilter,
    handleUpdateStatus,
    handleDeleteOrder,
    clearFilters,
  } = useOrders();

  // ========== LOCAL STATE ==========
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // ========== MEMOIZED STATISTICS ==========
  const statistics = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) =>
        order.paymentStatus === "paid" ? sum + order.totalAmount : sum,
      0
    );

    const pendingCount = orders.filter(
      (order) => order.orderStatus === "pending"
    ).length;

    const totalProductsSold = orders.reduce(
      (sum, order) =>
        sum + order.products.length,
      0
    );

    return { totalRevenue, pendingCount, totalProductsSold };
  }, [orders]);

  // ========== EVENT HANDLERS ==========
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), UI_CONFIG.NOTIFICATION_DURATION);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const onUpdateStatus = (orderId, newStatus) => {
    handleUpdateStatus(orderId, newStatus, showNotification);
  };

  const onDeleteOrder = (orderId) => {
    handleDeleteOrder(orderId, (message) => {
      showNotification(message);
      setIsDetailsModalOpen(false);
    });
  };

  // ========== RENDER ==========
  return (
    <div className="space-y-8">
      {/* Notification */}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            Orders Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage customer orders from WhatsApp •{" "}
            {orders.length.toLocaleString()} total orders
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={orders.length.toLocaleString()}
          description="All time orders"
          icon={ShoppingCart}
          iconColor="text-indigo-500"
        />
        <StatCard
          title="Pending Orders"
          value={statistics.pendingCount.toLocaleString()}
          description="Needs processing"
          icon={Package}
          iconColor="text-yellow-500"
        />
        <StatCard
          title="Products Sold"
          value={statistics.totalProductsSold.toLocaleString()}
          description="Total units"
          icon={TrendingUp}
          iconColor="text-green-500"
        />
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(statistics.totalRevenue)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Paid orders only
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={onUpdateStatus}
        onDeleteOrder={onDeleteOrder}
      />

      {/* Orders Table Card */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            View and manage customer orders placed via WhatsApp. Showing{" "}
            {filteredOrders.length} of {totalFilteredOrders.toLocaleString()}{" "}
            orders
            {totalFilteredOrders !== orders.length &&
              ` (filtered from ${orders.length.toLocaleString()} total)`}
            .
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Toolbar - Search & Filters */}
          <OrderToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilter={handleStatusFilter}
            paymentFilter={paymentFilter}
            onPaymentFilter={handlePaymentFilter}
            dateRange={dateRange}
            onDateRangeFilter={handleDateRangeFilter}
            onClearFilters={clearFilters}
          />

          {/* Orders Table */}
          <OrderTable
            orders={filteredOrders}
            onViewDetails={handleViewDetails}
          />

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-4">
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
                {totalFilteredOrders.toLocaleString()} total
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

export default OrdersPage;
