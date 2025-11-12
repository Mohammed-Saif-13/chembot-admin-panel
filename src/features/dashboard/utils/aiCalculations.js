// src/features/dashboard/utils/aiCalculations.js

// Calculate order predictions based on conversation trends
export const calculateOrderPrediction = (conversationData) => {
  if (!conversationData || conversationData.length === 0) {
    return { prediction: 0, trend: "stable", percentage: 0, confidence: 0 };
  }

  const avgConversations =
    conversationData.reduce((sum, day) => sum + day.conversations, 0) /
    conversationData.length;

  const recentAvg =
    conversationData
      .slice(-3)
      .reduce((sum, day) => sum + day.conversations, 0) / 3;
  const previousAvg =
    conversationData
      .slice(0, 3)
      .reduce((sum, day) => sum + day.conversations, 0) / 3;

  const trendPercentage = ((recentAvg - previousAvg) / previousAvg) * 100;

  const conversionRate = 0.3;
  const predictedOrders = Math.round(avgConversations * 7 * conversionRate);

  let trend = "stable";
  if (trendPercentage > 10) trend = "up";
  else if (trendPercentage < -10) trend = "down";

  return {
    prediction: predictedOrders,
    trend,
    percentage: Math.abs(trendPercentage).toFixed(1),
    confidence: 85,
  };
};

// Calculate revenue predictions based on historical data
export const calculateRevenuePrediction = (revenueData) => {
  if (!revenueData || revenueData.length === 0) {
    return { prediction: 0, trend: "stable", growth: 0, confidence: 0 };
  }

  const avgRevenue =
    revenueData.reduce((sum, day) => sum + day.revenue, 0) / revenueData.length;

  const recentAvg =
    revenueData.slice(-3).reduce((sum, day) => sum + day.revenue, 0) / 3;
  const previousAvg =
    revenueData.slice(0, 3).reduce((sum, day) => sum + day.revenue, 0) / 3;

  const growthRate = ((recentAvg - previousAvg) / previousAvg) * 100;

  const predictedRevenue = Math.round(avgRevenue * 7 * (1 + growthRate / 100));

  let trend = "stable";
  if (growthRate > 5) trend = "up";
  else if (growthRate < -5) trend = "down";

  return {
    prediction: predictedRevenue,
    trend,
    growth: growthRate.toFixed(1),
    confidence: 82,
  };
};

// Analyze customer behavior patterns from chat data
export const analyzeCustomerBehavior = (recentChats) => {
  if (!recentChats || recentChats.length === 0) {
    return {
      peakHour: "N/A",
      avgResponseTime: 0,
      satisfactionRate: 0,
      totalInteractions: 0,
    };
  }

  const hourDistribution = {};
  recentChats.forEach((chat) => {
    const date = new Date(chat.timestamp);
    const hour = date.getHours();
    hourDistribution[hour] = (hourDistribution[hour] || 0) + 1;
  });

  const peakHour = Object.keys(hourDistribution).reduce(
    (a, b) => (hourDistribution[a] > hourDistribution[b] ? a : b),
    "10"
  );

  const avgResponseTime =
    recentChats.reduce((sum, chat) => {
      const responseTime = parseInt(chat.responseTime) || 0;
      return sum + responseTime;
    }, 0) / recentChats.length;

  const satisfiedChats = recentChats.filter(
    (chat) => chat.status === "completed" || chat.status === "converted"
  ).length;
  const satisfactionRate = (satisfiedChats / recentChats.length) * 100;

  return {
    peakHour: `${peakHour}:00 - ${parseInt(peakHour) + 1}:00`,
    avgResponseTime: Math.round(avgResponseTime),
    satisfactionRate: satisfactionRate.toFixed(1),
    totalInteractions: recentChats.length,
  };
};

// Generate stock alerts from low stock products
export const generateStockAlerts = (products) => {
  if (!products || products.length === 0) {
    return [];
  }

  const criticalThreshold = 100;
  const warningThreshold = 200;

  const alerts = products
    .filter((product) => product.stock < warningThreshold)
    .map((product) => ({
      name: product.name,
      currentStock: product.stock,
      status: product.stock < criticalThreshold ? "critical" : "warning",
      recommendedOrder: Math.max(500 - product.stock, 0),
    }))
    .sort((a, b) => a.currentStock - b.currentStock)
    .slice(0, 3);

  return alerts;
};

// Analyze sentiment trends from chat data
export const analyzeSentiment = (recentChats) => {
  if (!recentChats || recentChats.length === 0) {
    return { positive: 0, neutral: 0, negative: 0, overall: "neutral" };
  }

  const sentimentCount = {
    positive: 0,
    neutral: 0,
    negative: 0,
  };

  recentChats.forEach((chat) => {
    if (chat.sentiment) {
      sentimentCount[chat.sentiment]++;
    }
  });

  const total = recentChats.length;
  const positivePercent = (sentimentCount.positive / total) * 100;
  const negativePercent = (sentimentCount.negative / total) * 100;

  let overall = "neutral";
  if (positivePercent > 60) overall = "positive";
  else if (negativePercent > 30) overall = "negative";

  return {
    positive: positivePercent.toFixed(1),
    neutral: ((sentimentCount.neutral / total) * 100).toFixed(1),
    negative: negativePercent.toFixed(1),
    overall,
  };
};

// Generate smart recommendations based on all insights
export const generateRecommendations = (insights) => {
  const recommendations = [];

  if (insights.orderPrediction) {
    if (insights.orderPrediction.trend === "up") {
      recommendations.push({
        type: "opportunity",
        priority: "high",
        title: "Increase Inventory",
        description: `Orders predicted to increase by ${insights.orderPrediction.percentage}%. Consider stocking up popular items.`,
        action: "Review inventory levels",
      });
    } else if (insights.orderPrediction.trend === "down") {
      recommendations.push({
        type: "warning",
        priority: "medium",
        title: "Engagement Campaign",
        description: `Order trend declining. Launch promotional campaigns to boost engagement.`,
        action: "Plan marketing campaign",
      });
    }
  }

  if (insights.stockAlerts && insights.stockAlerts.length > 0) {
    insights.stockAlerts.forEach((alert) => {
      if (alert.status === "critical") {
        recommendations.push({
          type: "critical",
          priority: "high",
          title: `Low Stock: ${alert.name}`,
          description: `Only ${alert.currentStock} units left. Immediate restocking required.`,
          action: `Order ${alert.recommendedOrder} units`,
        });
      }
    });
  }

  if (insights.customerBehavior) {
    if (insights.customerBehavior.avgResponseTime > 30) {
      recommendations.push({
        type: "improvement",
        priority: "medium",
        title: "Reduce Response Time",
        description: `Average response time is ${insights.customerBehavior.avgResponseTime}s. Optimize chatbot responses.`,
        action: "Review chatbot performance",
      });
    }

    if (parseFloat(insights.customerBehavior.satisfactionRate) < 70) {
      recommendations.push({
        type: "warning",
        priority: "high",
        title: "Improve Customer Satisfaction",
        description: `Satisfaction rate at ${insights.customerBehavior.satisfactionRate}%. Review customer feedback.`,
        action: "Analyze chat logs",
      });
    }
  }

  if (insights.sentiment) {
    if (insights.sentiment.overall === "negative") {
      recommendations.push({
        type: "critical",
        priority: "high",
        title: "Address Customer Concerns",
        description: `${insights.sentiment.negative}% negative sentiment detected. Immediate action needed.`,
        action: "Review negative feedback",
      });
    } else if (insights.sentiment.overall === "positive") {
      recommendations.push({
        type: "opportunity",
        priority: "low",
        title: "Leverage Positive Feedback",
        description: `${insights.sentiment.positive}% positive sentiment. Great time to collect testimonials.`,
        action: "Request customer reviews",
      });
    }
  }

  if (insights.revenuePrediction) {
    if (insights.revenuePrediction.trend === "up") {
      recommendations.push({
        type: "opportunity",
        priority: "medium",
        title: "Revenue Growth Opportunity",
        description: `Revenue growing at ${insights.revenuePrediction.growth}%. Scale operations accordingly.`,
        action: "Plan capacity expansion",
      });
    }
  }

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return recommendations.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
};

// Calculate all AI insights (main function)
export const calculateAllInsights = (dashboardData) => {
  const orderPrediction = calculateOrderPrediction(
    dashboardData.conversationData
  );
  const revenuePrediction = calculateRevenuePrediction(
    dashboardData.revenueData
  );
  const customerBehavior = analyzeCustomerBehavior(dashboardData.recentChats);
  const stockAlerts = generateStockAlerts(dashboardData.lowStockProducts);
  const sentiment = analyzeSentiment(dashboardData.recentChats);

  const insights = {
    orderPrediction,
    revenuePrediction,
    customerBehavior,
    stockAlerts,
    sentiment,
  };

  const recommendations = generateRecommendations(insights);

  return {
    ...insights,
    recommendations,
  };
};
