/**
 * DashboardPage Component
 * Main dashboard with stats, charts, recent orders, low stock alerts
 * Complete overview of business operations
 */

import React, { useMemo } from "react";
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Import dashboard components
import { TopProductsCard } from "../features/dashboard/components/TopProductsCard";
import { LowStockCard } from "../features/dashboard/components/LowStockCard";
import { RevenueChart } from "../features/reports/components/RevenueChart"; // ✅ Reuse from Reports

// Import calculation utilities
import {
  calculateDashboardStats,
  getRecentOrders,
  getTopProducts,
  getLowStockProducts,
  getDailyRevenue,
} from "../features/dashboard/utils/dashboardCalculations";

// Import data
import { initialOrders } from "../features/orders/data/initialOrders";
import { initialCustomers } from "../features/customers/data/initialCustomers";
import { initialProducts } from "../features/products/data/initialProducts";
import { formatCurrency, getStatusColorClasses } from "@/lib/utils";

// ==================== STATUS BADGE COMPONENT ====================
const StatusBadge = ({ status }) => {
  const colorClass = getStatusColorClasses(status);
  return (
    <span
      className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block capitalize ${colorClass}`}
    >
      {status}
    </span>
  );
};

// ==================== MAIN COMPONENT ====================
const DashboardPage = () => {
  // ========== MEMOIZED CALCULATIONS ==========
  const dashboardData = useMemo(() => {
    return {
      stats: calculateDashboardStats(
        initialOrders,
        initialCustomers,
        initialProducts
      ),
      recentOrders: getRecentOrders(initialOrders),
      topProducts: getTopProducts(initialOrders),
      lowStockProducts: getLowStockProducts(initialProducts),
      dailyRevenue: getDailyRevenue(initialOrders),
    };
  }, []);

  // ========== RENDER ==========
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Welcome back! Here's your business overview
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              {dashboardData.stats.totalOrders}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {dashboardData.stats.pendingOrders} pending
            </p>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-slate-50">
              {dashboardData.stats.totalCustomers}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {dashboardData.stats.activeCustomers} active
            </p>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Products in Stock
            </CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold dark:text-slate-50">
              {dashboardData.stats.totalProducts}
            </div>
            <p className="text-xs text-red-500 dark:text-red-400 mt-1">
              {dashboardData.stats.lowStockProducts} low stock
            </p>
          </CardContent>
        </Card>

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
              {formatCurrency(dashboardData.stats.totalRevenue)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              From paid orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Revenue Trend (Last 7 Days)
            </CardTitle>
            <CardDescription>Daily revenue performance</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart data={dashboardData.dailyRevenue} height={280} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-indigo-600" />
              Top Selling Products
            </CardTitle>
            <CardDescription>Best performers by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <TopProductsCard products={dashboardData.topProducts} />
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest 5 orders placed</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dashboardData.recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                    <TableCell className="text-center">
                      <StatusBadge status={order.orderStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Low Stock Alerts
            </CardTitle>
            <CardDescription>Products needing restock</CardDescription>
          </CardHeader>
          <CardContent>
            <LowStockCard products={dashboardData.lowStockProducts} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
