// src/pages/ChatLogsPage.jsx

import React, { useState, useMemo } from "react";
import { MessageSquare, TrendingUp, TrendingDown, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ChatFilters from "@/features/chatLogs/components/ChatFilters";
import ChatTable from "@/features/chatLogs/components/ChatTable";
import ChatDetailModal from "@/features/chatLogs/components/ChatDetailModal";
import { dummyChatLogs } from "@/features/chatLogs/data/dummyChatLogs";

const ChatLogsPage = () => {
    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        sentiment: "all",
        date: ""
    });

    const [selectedChat, setSelectedChat] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter chat logs
    const filteredChats = useMemo(() => {
        return dummyChatLogs.filter(chat => {
            const matchesSearch = chat.customerName.toLowerCase().includes(filters.search.toLowerCase()) ||
                chat.productDiscussed.toLowerCase().includes(filters.search.toLowerCase());
            const matchesStatus = filters.status === "all" || chat.status === filters.status;
            const matchesSentiment = filters.sentiment === "all" || chat.sentiment === filters.sentiment;
            const matchesDate = !filters.date || chat.startTime.includes(filters.date);

            return matchesSearch && matchesStatus && matchesSentiment && matchesDate;
        });
    }, [filters]);

    // Calculate stats
    const stats = useMemo(() => {
        return {
            total: dummyChatLogs.length,
            completed: dummyChatLogs.filter(c => c.status === "completed").length,
            active: dummyChatLogs.filter(c => c.status === "active").length,
            dropped: dummyChatLogs.filter(c => c.status === "dropped").length,
            positive: dummyChatLogs.filter(c => c.sentiment === "positive").length,
            totalRevenue: dummyChatLogs.reduce((sum, chat) => sum + chat.orderValue, 0)
        };
    }, []);

    const handleViewChat = (chat) => {
        setSelectedChat(chat);
        setIsModalOpen(true);
    };

    const handleExport = () => {
        // CSV export logic here
        console.log("Exporting chat logs...");
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                    Chat Logs
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    View and analyze all customer chat conversations
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Total Chats
                        </CardTitle>
                        <MessageSquare className="h-4 w-4 text-indigo-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            {stats.total}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            All conversations
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Conversion Rate
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {((stats.completed / stats.total) * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {stats.completed} completed
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Drop Rate
                        </CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {((stats.dropped / stats.total) * 100).toFixed(1)}%
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {stats.dropped} dropped
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Revenue Generated
                        </CardTitle>
                        <Users className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            ₹{stats.totalRevenue.toLocaleString()}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            From chat orders
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters Section */}
            <ChatFilters
                filters={filters}
                onFilterChange={setFilters}
                onExport={handleExport}
            />

            {/* Chat Table */}
            <ChatTable
                chats={filteredChats}
                onViewChat={handleViewChat}
            />

            {/* Chat Detail Modal */}
            <ChatDetailModal
                chat={selectedChat}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ChatLogsPage;