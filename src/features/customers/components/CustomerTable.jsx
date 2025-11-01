/**
 * CustomerTable Component
 * Displays customers in a table format with status badges
 * Supports click to view customer details and order history
 */

import React from "react";
import { Eye, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

export const CustomerTable = ({ customers, onViewDetails }) => {
  /**
   * Get status badge color classes
   * @param {string} status - Customer status
   * @returns {string} - Tailwind CSS classes
   */
  const getStatusColor = (status) => {
    const colors = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    };
    return (
      colors[status] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    );
  };

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

  // ==================== EMPTY STATE ====================
  if (customers.length === 0) {
    return (
      <div className="border rounded-lg dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Customer ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Contact</TableHead>
              <TableHead className="hidden lg:table-cell">Company</TableHead>
              <TableHead className="text-center">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[100px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={8}
                className="text-center py-8 text-slate-500"
              >
                <Users className="h-12 w-12 mx-auto mb-2 text-slate-400" />
                <p>No customers found matching your search criteria.</p>
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
            <TableHead className="w-[100px]">Customer ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Contact</TableHead>
            <TableHead className="hidden lg:table-cell">Company</TableHead>
            <TableHead className="text-center">Orders</TableHead>
            <TableHead className="text-right">Total Spent</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              className="hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              {/* Customer ID */}
              <TableCell className="font-bold text-indigo-600 dark:text-indigo-400">
                {customer.id}
              </TableCell>

              {/* Customer Name */}
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-900 dark:text-slate-50">
                    {customer.name}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 md:hidden">
                    {customer.phone}
                  </span>
                </div>
              </TableCell>

              {/* Contact Info (Hidden on mobile) */}
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col text-sm">
                  <span className="text-slate-700 dark:text-slate-300">
                    {customer.phone}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {customer.email}
                  </span>
                </div>
              </TableCell>

              {/* Company (Hidden on tablet) */}
              <TableCell className="hidden lg:table-cell text-slate-600 dark:text-slate-400">
                {customer.company}
              </TableCell>

              {/* Total Orders */}
              <TableCell className="text-center font-semibold text-blue-600 dark:text-blue-400">
                {customer.totalOrders}
              </TableCell>

              {/* Total Spent */}
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                {formatCurrency(customer.totalSpent)}
              </TableCell>

              {/* Status Badge */}
              <TableCell className="text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </TableCell>

              {/* Actions */}
              {/* Actions */}
              <TableCell className="text-center">
                <button
                  onClick={() => onViewDetails(customer)}
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
