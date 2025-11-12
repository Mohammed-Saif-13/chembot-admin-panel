// src/features/dashboard/components/TopQueriesCard.jsx

import React from "react";
import { Target } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

export const TopQueriesCard = ({ queries }) => {
    return (
        <Card className="rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                    <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    Top Customer Queries
                </CardTitle>
                <CardDescription>Most asked questions</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {queries.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                                    {index + 1}
                                </div>
                                <span className="font-medium text-slate-900 dark:text-slate-50">
                                    {item.query}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                {item.count} times
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};