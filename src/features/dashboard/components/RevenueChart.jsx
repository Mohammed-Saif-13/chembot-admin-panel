// src/features/dashboard/components/RevenueChart.jsx

import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
                <p className="font-semibold text-slate-900 dark:text-slate-50 mb-1">
                    {label}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                    Revenue:{" "}
                    <span className="font-bold">
                        ₹{payload[0].value.toLocaleString("en-IN")}
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

export const RevenueChart = ({ data = [], height = 300 }) => {
    // SAFETY CHECK
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700" style={{ height }}>
                <p className="text-slate-500 dark:text-slate-400">No revenue data available</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
                <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-slate-200 dark:stroke-slate-700"
                />
                <XAxis
                    dataKey="day"
                    className="text-slate-600 dark:text-slate-400"
                    tick={{ fill: "currentColor" }}
                    style={{ fontSize: "12px" }}
                />
                <YAxis
                    className="text-slate-600 dark:text-slate-400"
                    tick={{ fill: "currentColor" }}
                    style={{ fontSize: "12px" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};