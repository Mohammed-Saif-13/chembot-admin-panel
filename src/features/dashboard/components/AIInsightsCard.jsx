import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    Minus,
    AlertTriangle,
    Users,
    DollarSign,
    Brain,
    Target,
    Clock
} from 'lucide-react';

const AIInsightsCard = ({ insights }) => {
    if (!insights) return null;

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="w-4 h-4 text-green-500" />;
            case 'down':
                return <TrendingDown className="w-4 h-4 text-red-500" />;
            default:
                return <Minus className="w-4 h-4 text-gray-500" />;
        }
    };

    const getTrendColor = (trend) => {
        switch (trend) {
            case 'up':
                return 'text-green-500';
            case 'down':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const getSentimentColor = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'negative':
                return 'text-red-500 bg-red-500/10 border-red-500/20';
            default:
                return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/10 rounded-lg">
                        <Brain className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            AI Insights & Predictions
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Smart analytics powered by machine learning
                        </p>
                    </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated now
                </div>
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg mt-0.5">
                                <Target className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Order Prediction
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    Next 7 days forecast
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {insights.orderPrediction?.prediction || 0}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        orders
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(insights.orderPrediction?.trend)}`}>
                                {getTrendIcon(insights.orderPrediction?.trend)}
                                <span>{insights.orderPrediction?.percentage}%</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {insights.orderPrediction?.confidence}% confidence
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-500/10 rounded-lg mt-0.5">
                                <DollarSign className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                    Revenue Forecast
                                </h3>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    Next 7 days projection
                                </p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ₹{(insights.revenuePrediction?.prediction || 0).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor(insights.revenuePrediction?.trend)}`}>
                                {getTrendIcon(insights.revenuePrediction?.trend)}
                                <span>{insights.revenuePrediction?.growth}%</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {insights.revenuePrediction?.confidence}% confidence
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-lg mt-0.5">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                Customer Behavior Insights
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        Peak Hours
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {insights.customerBehavior?.peakHour || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        Avg Response
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {insights.customerBehavior?.avgResponseTime || 0}s
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        Satisfaction Rate
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {insights.customerBehavior?.satisfactionRate || 0}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                        Total Chats
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {insights.customerBehavior?.totalInteractions || 0}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {insights.stockAlerts && insights.stockAlerts.length > 0 && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-lg border border-orange-200 dark:border-orange-800">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-orange-500/10 rounded-lg mt-0.5">
                                <AlertTriangle className="w-5 h-5 text-orange-500" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                                    Critical Stock Alerts
                                </h3>
                                <div className="space-y-2">
                                    {insights.stockAlerts.slice(0, 3).map((alert, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {alert.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Stock: {alert.currentStock} units
                                                </p>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${alert.status === 'critical'
                                                    ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400'
                                                    : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                                                }`}>
                                                {alert.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className={`p-4 rounded-lg border ${getSentimentColor(insights.sentiment?.overall)}`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                                Customer Sentiment
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                                Based on recent conversations
                            </p>
                            <div className="flex items-center gap-4">
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Positive</p>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {insights.sentiment?.positive || 0}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Neutral</p>
                                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                                        {insights.sentiment?.neutral || 0}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Negative</p>
                                    <p className="text-lg font-bold text-red-600 dark:text-red-400">
                                        {insights.sentiment?.negative || 0}%
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`text-3xl font-bold capitalize ${insights.sentiment?.overall === 'positive' ? 'text-green-500' :
                                insights.sentiment?.overall === 'negative' ? 'text-red-500' :
                                    'text-yellow-500'
                            }`}>
                            {insights.sentiment?.overall || 'N/A'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIInsightsCard;