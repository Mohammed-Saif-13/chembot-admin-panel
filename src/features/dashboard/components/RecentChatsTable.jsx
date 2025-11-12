// src/features/dashboard/components/RecentChatsTable.jsx

import React from "react";
import { MessageSquare } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ChatStatusBadge = ({ status }) => {
    const statusStyles = {
        Completed:
            "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        Active: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        Pending:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        Dropped: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
        <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
};

export const RecentChatsTable = ({ chats }) => {
    return (
        <Card className="rounded-xl shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
                    <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Recent Chat Sessions
                </CardTitle>
                <CardDescription>Latest customer conversations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                {/* Empty State Check */}
                {!chats || chats.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                        <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-sm font-medium">No recent chats</p>
                        <p className="text-xs mt-1">Chat sessions will appear here</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Chat ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {chats.map((chat) => (
                                <TableRow key={chat.id}>
                                    <TableCell className="font-medium text-indigo-600 dark:text-indigo-400">
                                        {chat.id}
                                    </TableCell>
                                    <TableCell className="font-medium dark:text-slate-200">
                                        {chat.customer}
                                    </TableCell>
                                    <TableCell className="text-sm dark:text-slate-300">
                                        {chat.product}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <ChatStatusBadge status={chat.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
};