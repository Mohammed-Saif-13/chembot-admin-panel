import React, { useMemo } from 'react';

// NAMED IMPORTS - Existing Components
import { ChatAnalyticsCards } from '../features/dashboard/components/ChatAnalyticsCards';
import { ConversationTrendChart } from '../features/dashboard/components/ConversationTrendChart';
import { EngagementChart } from '../features/dashboard/components/EngagementChart';
import { RecentChatsTable } from '../features/dashboard/components/RecentChatsTable';
import { TopQueriesCard } from '../features/dashboard/components/TopQueriesCard';
import { RevenueChart } from '../features/dashboard/components/RevenueChart';
import { LowStockCard } from '../features/dashboard/components/LowStockCard';
import { TopProductsCard } from '../features/dashboard/components/TopProductsCard';

// DEFAULT IMPORTS - New AI Components
import AIInsightsCard from '../features/dashboard/components/AIInsightsCard';
import SmartRecommendationsCard from '../features/dashboard/components/SmartRecommendationsCard';

// Data & Utils
import { calculateAllInsights } from '../features/dashboard/utils/aiCalculations';
import {
  dashboardData,
  chatAnalyticsData,
  conversationData,
  engagementData,
  recentChats,
  topQueries,
  revenueData,
  lowStockProducts,
  topProducts
} from '../features/dashboard/data/chatAnalyticsData';

const DashboardPage = () => {
  const aiInsights = useMemo(() => {
    return calculateAllInsights(dashboardData);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          ChemBot Connect Analytics & Insights
        </p>
      </div>

      {/* Chat Analytics Cards */}
      <ChatAnalyticsCards stats={chatAnalyticsData.stats} />

      {/* AI Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIInsightsCard insights={aiInsights} />
        <SmartRecommendationsCard recommendations={aiInsights?.recommendations || []} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversationTrendChart data={conversationData} />
        <EngagementChart data={engagementData} />
      </div>

      {/* Revenue and Products Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={revenueData} />
        </div>
        <div className="space-y-6">
          <LowStockCard products={lowStockProducts} />
          <TopProductsCard products={topProducts} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentChatsTable chats={recentChats} />
        <TopQueriesCard queries={topQueries} />
      </div>
    </div>
  );
};

export default DashboardPage;