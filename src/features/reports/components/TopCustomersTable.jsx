/**
 * TopCustomersTable Component
 * Displays top customers by revenue in a clean table format
 * Shows customer ranking, spending, and order count
 */

import React from "react";
import { Crown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const TopCustomersTable = ({ data }) => {
  /**
   * Get medal icon for top 3 customers
   * @param {number} index - Customer rank (0-based)
   * @returns {JSX.Element|null} - Medal icon or null
   */
  const getMedalIcon = (index) => {
    const medals = {
      0: "🥇", // Gold
      1: "🥈", // Silver
      2: "🥉", // Bronze
    };
    return medals[index] || null;
  };

  /**
   * Get rank background color
   * @param {number} index - Customer rank (0-based)
   * @returns {string} - Tailwind classes
   */
  const getRankColor = (index) => {
    if (index === 0)
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    if (index === 1)
      return "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300";
    if (index === 2)
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    return "bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
  };

  // ==================== EMPTY STATE ====================
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>No customer data available</p>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <div className="space-y-3">
      {data.map((customer, index) => (
        <div
          key={customer.customerId}
          className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
            index === 0
              ? "border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20"
              : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50"
          }`}
        >
          {/* Left: Rank & Customer Info */}
          <div className="flex items-center gap-4">
            {/* Rank Badge */}
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor(
                  index
                )}`}
              >
                {getMedalIcon(index) || `#${index + 1}`}
              </div>
            </div>

            {/* Customer Name & ID */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                  {customer.customerName}
                </p>
                {index === 0 && (
                  <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {customer.customerId}
              </p>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="text-right">
            {/* Total Spent */}
            <p className="font-bold text-lg text-green-600 dark:text-green-400">
              {formatCurrency(customer.totalSpent)}
            </p>
            {/* Total Orders */}
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {customer.totalOrders} order{customer.totalOrders > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      ))}

      {/* Summary Footer */}
      {data.length > 0 && (
        <div className="pt-3 border-t dark:border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Top {data.length} customers
            </span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Total:{" "}
              {formatCurrency(data.reduce((sum, c) => sum + c.totalSpent, 0))}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
