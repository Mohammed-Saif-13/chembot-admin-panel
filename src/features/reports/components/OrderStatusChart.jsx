/**
 * OrderStatusChart Component
 * Interactive donut/pie chart showing order status distribution
 * Shows percentage and count for each status
 */

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export const OrderStatusChart = ({ data, height = 300 }) => {
  // ==================== COLORS ====================
  /**
   * Status-based colors
   * Matches the status badge colors from order components
   */
  const STATUS_COLORS = {
    pending: "#f59e0b", // Yellow/Amber
    processing: "#3b82f6", // Blue
    shipped: "#8b5cf6", // Purple
    delivered: "#10b981", // Green
    cancelled: "#ef4444", // Red
  };

  /**
   * Get color for status
   * @param {string} status - Order status
   * @returns {string} - Color hex code
   */
  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || "#94a3b8";
  };

  /**
   * Custom tooltip for pie chart
   * Shows status name, count, and percentage
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = payload[0].payload.total || data.value;
      const percentage = ((data.value / total) * 100).toFixed(1);

      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
            {data.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Orders: <span className="font-bold">{data.value}</span>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Percentage: <span className="font-bold">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  /**
   * Custom label for pie slices
   * Shows percentage on chart
   */
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is >= 5%
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  /**
   * Custom legend renderer
   * Shows colored boxes with status names
   */
  const renderLegend = (props) => {
    const { payload } = props;

    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-slate-600 dark:text-slate-400">
              {entry.value} ({entry.payload.value})
            </span>
          </div>
        ))}
      </div>
    );
  };

  // Calculate total for percentage
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map((item) => ({ ...item, total }));

  // ==================== RENDER ====================
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        {/* Donut Chart (innerRadius creates the hole) */}
        <Pie
          data={dataWithTotal}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomLabel}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
        >
          {dataWithTotal.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getStatusColor(entry.status)}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </Pie>

        {/* Tooltip on hover */}
        <Tooltip content={<CustomTooltip />} />

        {/* Legend */}
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  );
};
