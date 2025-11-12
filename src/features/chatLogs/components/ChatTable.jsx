// src/features/chatLogs/components/ChatTable.jsx

import React from "react";
import { MessageSquare, Clock, Eye, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ChatTable = ({ chats, onViewChat }) => {
    const getStatusBadge = (status) => {
        const variants = {
            completed: { variant: "success", className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
            active: { variant: "default", className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
            dropped: { variant: "destructive", className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" }
        };
        return variants[status] || variants.active;
    };

    const getSentimentIcon = (sentiment) => {
        const icons = {
            positive: <TrendingUp className="h-4 w-4 text-green-500" />,
            neutral: <Minus className="h-4 w-4 text-yellow-500" />,
            negative: <TrendingDown className="h-4 w-4 text-red-500" />
        };
        return icons[sentiment] || icons.neutral;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Chat ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Sentiment</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Order Value</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {chats.map((chat) => (
                        <TableRow key={chat.id}>
                            <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                                {chat.id}
                            </TableCell>
                            <TableCell>
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-slate-100">
                                        {chat.customerName}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {chat.customerPhone}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{chat.productDiscussed}</TableCell>
                            <TableCell>
                                <div className="text-sm">
                                    <div>{formatDate(chat.startTime)}</div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {formatTime(chat.startTime)}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3 text-slate-400" />
                                    <span className="text-sm">{chat.duration}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {getSentimentIcon(chat.sentiment)}
                                    <span className="text-xs capitalize">{chat.sentiment}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge className={getStatusBadge(chat.status).className}>
                                    {chat.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                {chat.orderValue > 0 ? (
                                    <span className="font-semibold text-green-600 dark:text-green-400">
                                        ₹{chat.orderValue.toLocaleString()}
                                    </span>
                                ) : (
                                    <span className="text-slate-400">-</span>
                                )}
                            </TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onViewChat(chat)}
                                >
                                    <Eye className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ChatTable;