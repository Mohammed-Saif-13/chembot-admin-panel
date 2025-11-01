/**
 * RevenueChart Component
 * Interactive line chart showing daily revenue trend
 * Uses Recharts library for visualization
 */

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export const RevenueChart = ({ data, height = 300 }) => {
  /**
   * Custom tooltip for chart
   * Shows formatted revenue on hover
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {payload[0].payload.day}
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {payload[0].payload.formattedRevenue}
          </p>
        </div>
      );
    }
    return null;
  };

  // ==================== RENDER ====================
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
        
        {/* X-axis (Days) */}
        <XAxis 
          dataKey="day" 
          className="text-xs dark:fill-slate-400"
          stroke="#94a3b8"
        />
        
        {/* Y-axis (Revenue) */}
        <YAxis 
          className="text-xs dark:fill-slate-400"
          stroke="#94a3b8"
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
        />
        
        {/* Tooltip on hover */}
        <Tooltip content={<CustomTooltip />} />
        
        {/* Legend */}
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="line"
        />
        
        {/* Revenue line */}
        <Line
          type="monotone"
          dataKey="revenue"
          name="Daily Revenue"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
          activeDot={{ r: 7 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};