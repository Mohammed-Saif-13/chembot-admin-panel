/**
 * ProductSalesChart Component
 * Interactive bar chart showing top products by revenue
 * Horizontal bars for better readability with long product names
 */

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export const ProductSalesChart = ({ data, height = 350 }) => {
  // ==================== COLORS ====================
  /**
   * Gradient colors for bars
   * Different color for each product
   */
  const COLORS = [
    '#10b981', // Green
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#06b6d4', // Cyan
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#f97316', // Orange
    '#6366f1', // Indigo
  ];

  /**
   * Custom tooltip for chart
   * Shows product details on hover
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {data.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Revenue: <span className="font-bold text-green-600 dark:text-green-400">
              ₹{data.revenue.toLocaleString('en-IN')}
            </span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quantity: <span className="font-semibold">{data.quantity} {data.unit}</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Orders: <span className="font-semibold">{data.orders}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  /**
   * Format Y-axis labels (product names)
   * Truncate long names
   */
  const formatYAxis = (value) => {
    if (value.length > 20) {
      return value.substring(0, 18) + '...';
    }
    return value;
  };

  // ==================== RENDER ====================
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
      >
        {/* Grid lines */}
        <CartesianGrid 
          strokeDasharray="3 3" 
          className="stroke-slate-200 dark:stroke-slate-700"
          horizontal={false}
        />
        
        {/* X-axis (Revenue) */}
        <XAxis 
          type="number"
          className="text-xs dark:fill-slate-400"
          stroke="#94a3b8"
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
        />
        
        {/* Y-axis (Product Names) */}
        <YAxis 
          type="category"
          dataKey="name"
          className="text-xs dark:fill-slate-400"
          stroke="#94a3b8"
          tickFormatter={formatYAxis}
          width={90}
        />
        
        {/* Tooltip on hover */}
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
        
        {/* Revenue bars with gradient colors */}
        <Bar 
          dataKey="revenue" 
          radius={[0, 8, 8, 0]}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};