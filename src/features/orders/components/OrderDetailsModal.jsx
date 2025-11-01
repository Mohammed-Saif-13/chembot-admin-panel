/**
 * OrderDetailsModal Component
 * Displays full order details including customer info, products, payment, shipping
 * Allows status update and order deletion
 */

import React, { useState } from "react";
import {
  X,
  Package,
  User,
  MapPin,
  CreditCard,
  Calendar,
  Trash2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus,
  onDeleteOrder,
}) => {
  // ==================== LOCAL STATE ====================
  const [selectedStatus, setSelectedStatus] = useState(
    order?.orderStatus || "pending"
  );

  // ==================== HANDLERS ====================

  /**
   * Handle status update
   */
  const handleStatusUpdate = () => {
    if (selectedStatus !== order.orderStatus) {
      onUpdateStatus(order.id, selectedStatus);
      onClose();
    }
  };

  /**
   * Handle order deletion
   */
  const handleDelete = () => {
    onDeleteOrder(order.id);
    onClose();
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
      month: "long",
      year: "numeric",
    });
    const timeStr = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr} at ${timeStr}`;
  };

  /**
   * Get status badge color
   * @param {string} status - Order status
   * @returns {string} - Tailwind classes
   */
  const getStatusColor = (status) => {
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
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  /**
   * Get payment status badge color
   * @param {string} status - Payment status
   * @returns {string} - Tailwind classes
   */
  const getPaymentColor = (status) => {
    const colors = {
      paid: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      pending:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      failed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // ==================== GUARD CLAUSE ====================
  if (!isOpen || !order) return null;

  // ==================== RENDER ====================
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* ========== HEADER ========== */}
        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <Package className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-bold dark:text-slate-50">
                Order Details
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {order.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ========== CONTENT ========== */}
<div className="p-6 space-y-6 overflow-y-auto">
          {/* Status & Date Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Order Status
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Payment Status
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getPaymentColor(
                  order.paymentStatus
                )}`}
              >
                {order.paymentStatus}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Order Date
              </p>
              <p className="text-sm font-medium dark:text-slate-50">
                {formatDateTime(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Customer Information */}
          <div className="border dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <User className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg dark:text-slate-50">
                Customer Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500 dark:text-slate-400">Name</p>
                <p className="font-medium dark:text-slate-50">
                  {order.customerName}
                </p>
              </div>
              <div>
                <p className="text-slate-500 dark:text-slate-400">Phone</p>
                <p className="font-medium dark:text-slate-50">
                  {order.customerPhone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-slate-500 dark:text-slate-400">Email</p>
                <p className="font-medium dark:text-slate-50">
                  {order.customerEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Products List */}
          <div className="border dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg dark:text-slate-50">
                Products ({order.products.length})
              </h3>
            </div>
            <div className="space-y-2">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-medium dark:text-slate-50">
                      {product.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {product.quantity} {product.unit} ×{" "}
                      {formatCurrency(product.price)}
                    </p>
                  </div>
                  <p className="font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(product.total)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="border dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg dark:text-slate-50">
                Shipping Address
              </h3>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}
              <br />
              PIN: {order.shippingAddress.pincode}
            </p>
          </div>

          {/* Payment & Pricing */}
          <div className="border dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg dark:text-slate-50">
                Payment Details
              </h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Payment Method
                </span>
                <span className="font-medium dark:text-slate-50">
                  {order.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Subtotal
                </span>
                <span className="dark:text-slate-50">
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Tax (10%)
                </span>
                <span className="dark:text-slate-50">
                  {formatCurrency(order.tax)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  Shipping
                </span>
                <span className="dark:text-slate-50">
                  {formatCurrency(order.shipping)}
                </span>
              </div>
              <div className="border-t dark:border-slate-600 pt-2 mt-2 flex justify-between text-lg font-bold">
                <span className="dark:text-slate-50">Total Amount</span>
                <span className="text-green-600 dark:text-green-400">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          {/* Notes (if any) */}
          {order.notes && (
            <div className="border dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 dark:text-slate-50">Notes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {order.notes}
              </p>
            </div>
          )}

          {/* Update Status Section */}
          <div className="border-t dark:border-slate-700 pt-4">
            <h3 className="font-semibold mb-3 dark:text-slate-50">
              Update Order Status
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                disabled={selectedStatus === order.orderStatus}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>

        {/* ========== FOOTER ========== */}
        <div className="sticky bottom-0 bg-slate-50 dark:bg-slate-900/50 border-t dark:border-slate-700 px-6 py-4 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Delete Order
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
