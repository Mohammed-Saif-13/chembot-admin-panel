// src/features/dashboard/components/ConversationTrendChart.jsx

import React from "react";
import { TrendingUp } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
                <p className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    {label}
                </p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-bold">{entry.value}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export const ConversationTrendChart = ({ data = [] }) => {
    // SAFETY CHECK
    if (!data || data.length === 0) {
        return (
            <Card className="rounded-xl shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                        <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Conversation Trends (Last 7 Days)
                    </CardTitle>
                    <CardDescription>
                        Daily conversations, leads, and orders
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[280px] text-slate-500 dark:text-slate-400">
                        No conversation data available
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                    <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    Conversation Trends (Last 7 Days)
                </CardTitle>
                <CardDescription>
                    Daily conversations, leads, and orders
                </CardDescription>
            </CardHeader>
            <CardContent
                onMouseDown={(e) => e.preventDefault()}
                onFocus={(e) => e.preventDefault()}
                tabIndex={-1}
                style={{ outline: "none" }}
            >
                <div style={{ userSelect: "none", WebkitUserSelect: "none" }}>
                    <ResponsiveContainer width="100%" height={280}>
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
                            <Legend
                                wrapperStyle={{
                                    paddingTop: "10px",
                                    fontSize: "14px",
                                }}
                                iconType="line"
                            />
                            <Line
                                type="monotone"
                                dataKey="conversations"
                                stroke="#6366f1"
                                strokeWidth={3}
                                name="Conversations"
                                dot={{ fill: "#6366f1", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="leads"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                name="Leads"
                                dot={{ fill: "#8b5cf6", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="orders"
                                stroke="#10b981"
                                strokeWidth={3}
                                name="Orders"
                                dot={{ fill: "#10b981", r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};