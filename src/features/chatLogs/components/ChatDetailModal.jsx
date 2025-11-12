// src/features/chatLogs/components/ChatDetailModal.jsx

import React from "react";
import { X, User, Bot, Clock, Package, Phone, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatDetailModal = ({ chat, isOpen, onClose }) => {
    if (!chat) return null;

    const getSentimentBadge = (sentiment) => {
        const variants = {
            positive: { icon: <TrendingUp className="h-4 w-4" />, className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
            neutral: { icon: <Minus className="h-4 w-4" />, className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
            negative: { icon: <TrendingDown className="h-4 w-4" />, className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" }
        };
        return variants[sentiment] || variants.neutral;
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle>Chat Details - {chat.id}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Customer Info Section */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Customer</p>
                                <p className="font-semibold text-sm">{chat.customerName}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Phone</p>
                                <p className="font-semibold text-sm flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {chat.customerPhone}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Product</p>
                                <p className="font-semibold text-sm flex items-center gap-1">
                                    <Package className="h-3 w-3" />
                                    {chat.productDiscussed}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Duration</p>
                                <p className="font-semibold text-sm flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {chat.duration}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Status:</span>
                                <Badge className={`capitalize ${chat.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        chat.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                            'bg-red-100 text-red-700'
                                    }`}>
                                    {chat.status}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">Sentiment:</span>
                                <Badge className={getSentimentBadge(chat.sentiment).className}>
                                    <span className="flex items-center gap-1">
                                        {getSentimentBadge(chat.sentiment).icon}
                                        {chat.sentiment}
                                    </span>
                                </Badge>
                            </div>
                            {chat.orderValue > 0 && (
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Order Value:</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        ₹{chat.orderValue.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Chat Messages Section */}
                    <div className="border border-slate-200 dark:border-slate-700 rounded-lg">
                        <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                            <h3 className="font-semibold text-sm">Conversation</h3>
                        </div>
                        <ScrollArea className="h-[300px] p-4">
                            <div className="space-y-3">
                                {chat.messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                                    >
                                        <div
                                            className={`max-w-[70%] rounded-lg px-4 py-2 ${message.sender === 'customer'
                                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                                                    : 'bg-indigo-600 text-white'
                                                }`}
                                        >
                                            <div className="flex items-center gap-2 mb-1">
                                                {message.sender === 'customer' ? (
                                                    <User className="h-3 w-3" />
                                                ) : (
                                                    <Bot className="h-3 w-3" />
                                                )}
                                                <span className="text-xs font-semibold">
                                                    {message.sender === 'customer' ? 'Customer' : 'ChemBot'}
                                                </span>
                                                <span className="text-xs opacity-75">{message.time}</span>
                                            </div>
                                            <p className="text-sm">{message.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ChatDetailModal;