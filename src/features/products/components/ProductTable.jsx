/**
 * Product Table Component
 * Displays products in a table format
 */

import React from 'react';
import { Edit } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { formatCurrency, getStatusColorClasses } from '../../../lib/utils';

export const ProductTable = ({ products, onEditClick }) => {
  // ✅ Limit to 100 rows for performance
  const displayProducts = products.slice(0, 100);
  const hasMore = products.length > 100;

  if (products.length === 0) {
    return (
      <div className="border rounded-lg dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="hidden sm:table-cell">Formula</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                No products found matching your search criteria.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Warning for large datasets */}
      {hasMore && (
        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-300">
            ⚠️ Showing first <strong>100</strong> of <strong>{products.length.toLocaleString()}</strong> products. 
            Use search or filters above to find specific items.
          </p>
        </div>
      )}

      <div className="border rounded-lg dark:border-slate-800">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead className="hidden sm:table-cell">Formula</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="w-[80px] text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                  {product.id}
                </TableCell>
                <TableCell className="font-semibold">{product.name}</TableCell>
                <TableCell className="hidden sm:table-cell text-slate-500">
                  {product.formula}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {product.stock} {product.unit}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${getStatusColorClasses(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onEditClick(product)}
                    className="text-indigo-600 hover:underline text-sm font-medium flex items-center gap-1 mx-auto"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};