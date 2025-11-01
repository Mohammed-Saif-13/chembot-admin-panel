/**
 * ReportsPage Component
 * Interactive sales analytics and reports dashboard
 * Features: Date range filter, revenue charts, product analytics, top customers
 */

import React, { useState, useMemo } from "react";
import {
  Calendar,
  Download,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Package,
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

// Import report components
import { RevenueChart } from "../features/reports/components/RevenueChart";
import { ProductSalesChart } from "../features/reports/components/ProductSalesChart";
import { OrderStatusChart } from "../features/reports/components/OrderStatusChart";
import { TopCustomersTable } from "../features/reports/components/TopCustomersTable";

// Import calculation utilities
import {
  calculateDailyRevenue,
  calculateProductSales,
  calculateOrderStatusDistribution,
  calculateTopCustomers,
  calculateSummaryStats,
  filterOrdersByDateRange,
} from "../features/reports/utils/reportCalculations";

// Import data
import { initialOrders } from "../features/orders/data/initialOrders";
import { initialCustomers } from "../features/customers/data/initialCustomers";
import { formatCurrency } from "@/lib/utils";
import { UI_CONFIG } from "../config/config";

// ==================== INLINE NOTIFICATION ====================
/**
 * Notification Component
 * @param {Object} notification - { message, type }
 * @param {Function} onClose - Close callback
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

// ==================== MAIN COMPONENT ====================
const ReportsPage = () => {
  // ========== STATE ==========
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const [notification, setNotification] = useState(null);

  // ========== NOTIFICATION HANDLER ==========
  /**
   * Show notification message
   * @param {string} message - Message to display
   * @param {string} type - 'success' or 'error'
   */
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), UI_CONFIG.NOTIFICATION_DURATION);
  };

  // ========== MEMOIZED DATA CALCULATIONS ==========
  /**
   * Filter orders based on date range
   */
  const filteredOrders = useMemo(() => {
    return filterOrdersByDateRange(initialOrders, dateRange.from, dateRange.to);
  }, [dateRange]);

  /**
   * Calculate all report data
   */
  const reportData = useMemo(() => {
    return {
      dailyRevenue: calculateDailyRevenue(filteredOrders, 7),
      productSales: calculateProductSales(filteredOrders),
      orderStatus: calculateOrderStatusDistribution(filteredOrders),
      topCustomers: calculateTopCustomers(filteredOrders, initialCustomers),
      summary: calculateSummaryStats(filteredOrders),
    };
  }, [filteredOrders]);

  // ========== EVENT HANDLERS ==========

  /**
   * Handle date range change
   */
  const handleDateChange = (field, value) => {
    setDateRange((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Clear date filters
   */
  const handleClearFilters = () => {
    setDateRange({ from: "", to: "" });
    showNotification("Filters cleared - showing all data");
  };

  /**
   * Export report (Placeholder)
   */
  const handleExportReport = () => {
    showNotification("Export feature coming soon!");
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
            Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Sales insights and performance metrics
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportReport}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors text-sm font-medium shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Date Range Filter Card */}
      <Card className="shadow-lg border-indigo-200 dark:border-indigo-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-600" />
            Date Range Filter
          </CardTitle>
          <CardDescription>
            Select date range to filter reports (leave empty for all data)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
            {/* From Date */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateRange.from}
                onChange={(e) => handleDateChange("from", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:[color-scheme:dark]"
              />
            </div>

            {/* To Date */}
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateRange.to}
                onChange={(e) => handleDateChange("to", e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:[color-scheme:dark]"
              />
            </div>

            {/* Clear Button */}
            {(dateRange.from || dateRange.to) && (
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Clear Filters
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(reportData.summary.totalRevenue)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              From {reportData.summary.paidOrdersCount} paid orders
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Orders
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-slate-50">
              {reportData.summary.totalOrders}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              All orders in period
            </p>
          </CardContent>
        </Card>

        {/* Completed Orders */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Completed Orders
            </CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {reportData.summary.completedOrders}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>

        {/* Average Order Value */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Avg. Order Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(Math.round(reportData.summary.averageOrderValue))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Per order average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="rounded-xl shadow-lg lg:col-span-2">
          <CardHeader>
            <CardTitle>Daily Revenue Trend</CardTitle>
            <CardDescription>
              Revenue performance over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart data={reportData.dailyRevenue} height={320} />
          </CardContent>
        </Card>

        {/* Product Sales Chart */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Top Products by Revenue</CardTitle>
            <CardDescription>
              Best selling products in selected period
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportData.productSales.length > 0 ? (
              <ProductSalesChart data={reportData.productSales} height={400} />
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No product sales data available</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Status Chart */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle>Order Status Distribution</CardTitle>
            <CardDescription>
              Breakdown of orders by current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reportData.orderStatus.length > 0 ? (
              <OrderStatusChart data={reportData.orderStatus} height={400} />
            ) : (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No order status data available</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Customers Card */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle>Top 5 Customers by Revenue</CardTitle>
          <CardDescription>
            Highest spending customers in selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TopCustomersTable data={reportData.topCustomers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
