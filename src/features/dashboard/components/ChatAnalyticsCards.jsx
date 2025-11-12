// src/features/dashboard/components/ChatAnalyticsCards.jsx

import React from "react";
import { MessageSquare, Zap, Target, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ChatAnalyticsCards = ({ stats = {} }) => {
    // Default values if stats properties are missing
    const {
        totalConversations = 0,
        activeChats = 0,
        avgResponseTime = "0 min",
        conversionRate = "0%",
        totalLeads = 0,
        successfulOrders = 0
    } = stats;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Total Conversations */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-indigo-500 dark:border-indigo-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Conversations
                    </CardTitle>
                    <MessageSquare className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        {totalConversations}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {activeChats} active now
                    </p>
                </CardContent>
            </Card>

            {/* Avg Response Time */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-blue-500 dark:border-blue-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Avg Response Time
                    </CardTitle>
                    <Zap className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {avgResponseTime}
                    </div>
                    <p className="text-xs text-green-500 dark:text-green-400 mt-1">
                        12% faster than last week
                    </p>
                </CardContent>
            </Card>

            {/* Total Leads */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-purple-500 dark:border-purple-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Total Leads
                    </CardTitle>
                    <Target className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {totalLeads}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        From chat interactions
                    </p>
                </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow border-l-4 border-green-500 dark:border-green-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Conversion Rate
                    </CardTitle>
                    <Activity className="h-4 w-4 text-green-500 dark:text-green-400" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {conversionRate}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {successfulOrders} successful orders
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};