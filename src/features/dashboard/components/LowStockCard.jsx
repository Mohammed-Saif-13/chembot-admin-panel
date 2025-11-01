/**
 * LowStockCard Component
 * Displays products with low or out of stock status
 * Warning alerts for inventory management
 */

import React from "react";
import { AlertTriangle, Package } from "lucide-react";
import { getStatusColorClasses } from "@/lib/utils";

export const LowStockCard = ({ products }) => {
  // ==================== EMPTY STATE ====================
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 dark:text-slate-400">
        <Package className="h-12 w-12 mx-auto mb-2 opacity-50 text-green-500" />
        <p className="text-sm font-medium text-green-600 dark:text-green-400">
          All products are well stocked! ✓
        </p>
      </div>
    );
  }

  // ==================== RENDER ====================
  return (
    <div className="space-y-2">
      {products.map((product) => (
        <div
          key={product.id}
          className={`flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-md ${
            product.status === "Out of Stock"
              ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20"
              : "border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20"
          }`}
        >
          {/* Left: Product Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Warning Icon */}
            <div
              className={`flex-shrink-0 ${
                product.status === "Out of Stock"
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 dark:text-slate-50 truncate">
                {product.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ID: {product.id}
              </p>
            </div>
          </div>

          {/* Right: Stock Info */}
          <div className="text-right ml-3 flex-shrink-0">
            <p
              className={`font-bold ${
                product.status === "Out of Stock"
                  ? "text-red-600 dark:text-red-400"
                  : "text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {product.stock} {product.unit}
            </p>
            <span
              className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColorClasses(
                product.status
              )}`}
            >
              {product.status}
            </span>
          </div>
        </div>
      ))}

      {/* Summary Footer */}
      {products.length > 0 && (
        <div className="pt-3 border-t dark:border-slate-700 mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              Total Low Stock Items
            </span>
            <span className="font-semibold text-red-600 dark:text-red-400">
              {products.length} products
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
