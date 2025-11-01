/**
 * OrderTable Component
 * Displays orders in a table format with status badges
 * Supports click to view order details
 */

import React from "react";
import { Eye, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";

export const OrderTable = ({ orders, onViewDetails }) => {
  /**
   * Get status badge color classes for order status
   * @param {string} status - Order status
   * @returns {string} - Tailwind CSS classes
   */
  const getOrderStatusColor = (status) => {
    const colors = {
      pending:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      processing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      shipped:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      delivered:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  /**
   * Get payment status badge color classes
   * @param {string} status - Payment status
   * @returns {string} - Tailwind CSS classes
   */
  const getPaymentStatusColor = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      pending:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

  /**
   * Format date and time
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date and time
   */
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateStr = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}, ${timeStr}`;
  };

  // ==================== EMPTY STATE ====================
  if (orders.length === 0) {
    return (
      <div className="border rounded-lg dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center hidden lg:table-cell">
                Payment
              </TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="hidden xl:table-cell">
                Date & Time
              </TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-slate-500"
              >
                <Package className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                <p>No orders found matching your search criteria.</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  // ==================== TABLE WITH DATA ====================
  return (
    <div className="border rounded-lg dark:border-slate-800 overflow-x-auto">
      <Table>
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Products</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-center hidden lg:table-cell">
              Payment
            </TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="hidden xl:table-cell">Date & Time</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {/* Order ID */}
              <TableCell className="font-bold text-indigo-600 dark:text-indigo-400">
                {order.id}
              </TableCell>

              {/* Customer Info */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {order.customerPhone}
                  </span>
                </div>
              </TableCell>

              {/* Products Count (Hidden on mobile) */}
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">
                    {order.products.length} item
                    {order.products.length > 1 ? "s" : ""}
                  </span>
                </div>
              </TableCell>

              {/* Total Amount */}
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                {formatCurrency(order.totalAmount)}
              </TableCell>

              {/* Payment Status (Hidden on tablet) */}
              <TableCell className="text-center hidden lg:table-cell">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getPaymentStatusColor(
                    order.paymentStatus
                  )}`}
                >
                  {order.paymentStatus}
                </span>
              </TableCell>

              {/* Order Status */}
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getOrderStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </TableCell>

              {/* Date & Time (Hidden on small screens) */}
              <TableCell className="hidden xl:table-cell text-sm text-slate-600 dark:text-slate-400">
                {formatDateTime(order.createdAt)}
              </TableCell>

              {/* Actions */}
              {/* Actions */}
              <TableCell className="text-center">
                <button
                  onClick={() => onViewDetails(order)}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
