import React, { useState } from 'react';
import {
    Lightbulb,
    AlertCircle,
    CheckCircle2,
    TrendingUp,
    ChevronRight,
    Sparkles
} from 'lucide-react';

const SmartRecommendationsCard = ({ recommendations }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    if (!recommendations || recommendations.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Smart Recommendations
                    </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                    No recommendations at this time. All systems operating optimally.
                </p>
            </div>
        );
    }

    const getTypeIcon = (type) => {
        switch (type) {
            case 'critical':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case 'opportunity':
                return <TrendingUp className="w-5 h-5 text-green-500" />;
            case 'improvement':
                return <Sparkles className="w-5 h-5 text-blue-500" />;
            default:
                return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
        }
    };

    const getPriorityBadge = (priority) => {
        const styles = {
            high: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
            medium: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
            low: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
        };

        return (
            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${styles[priority] || styles.low}`}>
                {priority.toUpperCase()}
            </span>
        );
    };

    const getCardBorder = (type) => {
        switch (type) {
            case 'critical':
                return 'border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/5';
            case 'warning':
                return 'border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/5';
            case 'opportunity':
                return 'border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/5';
            case 'improvement':
                return 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-900/5';
            default:
                return 'border-l-4 border-l-gray-500 bg-gray-50 dark:bg-gray-900/5';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <Lightbulb className="w-6 h-6 text-indigo-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Smart Recommendations
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            AI-powered actionable insights
                        </p>
                    </div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    {recommendations.length} {recommendations.length === 1 ? 'Action' : 'Actions'}
                </span>
            </div>

            <div className="space-y-3">
                {recommendations.map((recommendation, index) => (
                    <div
                        key={index}
                        className={`rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all ${getCardBorder(recommendation.type)}`}
                    >
                        <div
                            className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5">
                                    {getTypeIcon(recommendation.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {recommendation.title}
                                        </h3>
                                        {getPriorityBadge(recommendation.priority)}
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        {recommendation.description}
                                    </p>

                                    {expandedIndex === index && (
                                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <ChevronRight className="w-4 h-4" />
                                                    <span className="font-medium">Recommended Action:</span>
                                                    <span>{recommendation.action}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <ChevronRight
                                    className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 mt-0.5 ${expandedIndex === index ? 'rotate-90' : ''
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {recommendations.filter(r => r.priority === 'high').length}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">High Priority</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                            {recommendations.filter(r => r.priority === 'medium').length}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Medium Priority</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {recommendations.filter(r => r.priority === 'low').length}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Low Priority</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmartRecommendationsCard;