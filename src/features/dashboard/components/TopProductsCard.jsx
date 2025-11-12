/**
 * TopProductsCard Component
 * Displays top 5 selling products with revenue bars
 * Compact card design for dashboard
 */

import React from "react";
import { TrendingUp, Package } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const TopProductsCard = ({ products }) => {
  // ==================== EMPTY STATE ====================
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No sales data available</p>
      </div>
    );
  }

  // Find max revenue for scaling bars (MOVED HERE - after null check)
  const maxRevenue = products.length > 0 ? products[0].revenue : 1;

  // ==================== RENDER ====================
  return (
    <div className="space-y-3">
      {products.map((product, index) => {
        const barWidth = (product.revenue / maxRevenue) * 100;

        return (
          <div key={index} className="space-y-1">
            {/* Product Info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  #{index + 1}
                </span>
                <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
                  {product.name}
                </span>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400 ml-2 whitespace-nowrap">
                {formatCurrency(product.revenue)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${index === 0
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : index === 1
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500"
                      : index === 2
                        ? "bg-gradient-to-r from-purple-500 to-pink-500"
                        : "bg-gradient-to-r from-slate-400 to-slate-500"
                    }`}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                {product.quantity} {product.unit}
              </span>
            </div>
          </div>
        );
      })}

      {/* Summary Footer */}
      <div className="pt-3 border-t dark:border-slate-700 mt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Top 5 Products
          </span>
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Total:{" "}
            {formatCurrency(products.reduce((sum, p) => sum + p.revenue, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};