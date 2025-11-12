// src/features/chatLogs/components/ChatFilters.jsx

import React from "react";
import { Search, Filter, Calendar, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ChatFilters = ({ filters, onFilterChange, onExport }) => {
    return (
        <div className="bg-white dark:bg-slate-950 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                        type="text"
                        placeholder="Search customer..."
                        value={filters.search}
                        onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
                        className="pl-10"
                    />
                </div>

                {/* Status Filter */}
                <Select
                    value={filters.status}
                    onValueChange={(value) => onFilterChange({ ...filters, status: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="dropped">Dropped</SelectItem>
                    </SelectContent>
                </Select>

                {/* Sentiment Filter */}
                <Select
                    value={filters.sentiment}
                    onValueChange={(value) => onFilterChange({ ...filters, sentiment: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="All Sentiments" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Sentiments</SelectItem>
                        <SelectItem value="positive">Positive</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="negative">Negative</SelectItem>
                    </SelectContent>
                </Select>

                {/* Date Range */}
                <Input
                    type="date"
                    value={filters.date}
                    onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
                    className="dark:text-slate-200"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onFilterChange({ search: "", status: "all", sentiment: "all", date: "" })}
                >
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onExport}
                >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                </Button>
            </div>
        </div>
    );
};

export default ChatFilters;