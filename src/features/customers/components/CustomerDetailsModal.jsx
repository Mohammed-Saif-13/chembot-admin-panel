/**
 * CustomerDetailsModal Component
 * Displays full customer details including order history
 * Shows customer info, contact details, address, and all orders placed
 */

import React from "react";
import {
  X,
  User,
  MapPin,
  Phone,
  Mail,
  Building,
  ShoppingCart,
  Trash2,
  Calendar,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const CustomerDetailsModal = ({
  isOpen,
  onClose,
  customer,
  customerOrders,
  onDeleteCustomer,
}) => {
  /**
   * Format date
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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

  /**
   * Get status badge color
   * @param {string} status - Customer/Order status
   * @returns {string} - Tailwind classes
   */
  const getStatusColor = (status) => {
    const colors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
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
   * Get payment status color
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

  /**
   * Handle customer deletion
   */
  const handleDelete = () => {
    onDeleteCustomer(customer.id);
    onClose();
  };

  // ==================== GUARD CLAUSE ====================
  if (!isOpen || !customer) return null;

  // ==================== RENDER ====================
  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col my-8">
        {/* ========== HEADER ========== */}
        <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-indigo-600" />
            <div>
              <h2 className="text-xl font-bold dark:text-slate-50">
                Customer Details
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {customer.id}
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
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* Status & Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Status
              </p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold capitalize ${getStatusColor(
                  customer.status
                )}`}
              >
                {customer.status}
              </span>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Total Orders
              </p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {customer.totalOrders}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Total Spent
              </p>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">
                {formatCurrency(customer.totalSpent)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Joined Date
              </p>
              <p className="text-sm font-medium dark:text-slate-50">
                {formatDate(customer.joinedDate)}
              </p>
            </div>
          </div>

          {/* Customer Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div className="border dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-lg dark:text-slate-50">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Name</p>
                  <p className="font-medium dark:text-slate-50">
                    {customer.name}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="font-medium dark:text-slate-50">
                    {customer.phone}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Email</p>
                  <p className="font-medium dark:text-slate-50">
                    {customer.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Company & Address */}
            <div className="border dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Building className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-lg dark:text-slate-50">
                  Company & Address
                </h3>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Company</p>
                  <p className="font-medium dark:text-slate-50">
                    {customer.company}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 dark:text-slate-400">Address</p>
                  <p className="font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {customer.address.street}
                    <br />
                    {customer.address.city}, {customer.address.state}
                    <br />
                    PIN: {customer.address.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes (if any) */}
          {customer.notes && (
            <div className="border dark:border-slate-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2 dark:text-slate-50">Notes</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {customer.notes}
              </p>
            </div>
          )}

          {/* Order History Section */}
          <div className="border dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              <h3 className="font-semibold text-lg dark:text-slate-50">
                Order History ({customerOrders.length})
              </h3>
            </div>

            {/* Orders List */}
            {customerOrders.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No orders placed yet</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border dark:border-slate-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-indigo-600 dark:text-indigo-400">
                          {order.id}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateTime(order.createdAt)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(order.totalAmount)}
                        </p>
                        <div className="flex gap-1 mt-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {order.orderStatus}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${getPaymentColor(
                              order.paymentStatus
                            )}`}
                          >
                            {order.paymentStatus}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Products in order */}
                    <div className="mt-2 pt-2 border-t dark:border-slate-700">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                        Products:
                      </p>
                      <div className="space-y-1">
                        {order.products.map((product, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-slate-700 dark:text-slate-300"
                          >
                            • {product.name} - {product.quantity} {product.unit}{" "}
                            × {formatCurrency(product.price)}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ========== FOOTER ========== */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border-t dark:border-slate-700 px-6 py-4 flex items-center justify-between rounded-b-xl">
          <button
            onClick={handleDelete}
            className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2 font-medium"
          >
            <Trash2 className="h-4 w-4" />
            Delete Customer
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
