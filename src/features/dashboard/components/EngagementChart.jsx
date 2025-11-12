// src/features/dashboard/components/EngagementChart.jsx

import React from "react";
import { Activity } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-3">
                <p className="font-semibold text-slate-900 dark:text-slate-50">
                    {payload[0].name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Count: <span className="font-bold">{payload[0].value}</span>
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    Percentage:{" "}
                    <span className="font-bold">{payload[0].payload.percent}%</span>
                </p>
            </div>
        );
    }
    return null;
};

export const EngagementChart = ({ data = [] }) => {
    // SAFETY CHECK - agar data nahi hai toh empty array use karo
    if (!data || data.length === 0) {
        return (
            <Card className="rounded-xl shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                        <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        Engagement Distribution
                    </CardTitle>
                    <CardDescription>Chat completion status breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-[280px] text-slate-500 dark:text-slate-400">
                        No engagement data available
                    </div>
                </CardContent>
            </Card>
        );
    }

    const dataWithPercent = data.map((item) => {
        const total = data.reduce((sum, i) => sum + i.value, 0);
        return {
            ...item,
            percent: ((item.value / total) * 100).toFixed(1),
        };
    });

    return (
        <Card className="rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                    <Activity className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Engagement Distribution
                </CardTitle>
                <CardDescription>Chat completion status breakdown</CardDescription>
            </CardHeader>
            <CardContent
                onMouseDown={(e) => e.preventDefault()}
                onFocus={(e) => e.preventDefault()}
                tabIndex={-1}
                style={{ outline: 'none' }}
            >
                <div style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie
                                data={dataWithPercent}
                                cx="50%"
                                cy="50%"
                                label={false}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {dataWithPercent.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomPieTooltip />} />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: "10px",
                                    fontSize: "14px",
                                }}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};