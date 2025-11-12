// src/features/dashboard/data/chatAnalyticsData.js

// Conversation trend data for charts
export const conversationData = [
  { day: "Mon", conversations: 45, leads: 18, orders: 12 },
  { day: "Tue", conversations: 52, leads: 22, orders: 15 },
  { day: "Wed", conversations: 48, leads: 19, orders: 14 },
  { day: "Thu", conversations: 61, leads: 25, orders: 18 },
  { day: "Fri", conversations: 55, leads: 21, orders: 16 },
  { day: "Sat", conversations: 43, leads: 17, orders: 13 },
  { day: "Sun", conversations: 38, leads: 15, orders: 11 },
];

// Revenue data for charts
export const revenueData = [
  { day: "Mon", revenue: 45000 },
  { day: "Tue", revenue: 52000 },
  { day: "Wed", revenue: 48000 },
  { day: "Thu", revenue: 61000 },
  { day: "Fri", revenue: 55000 },
  { day: "Sat", revenue: 43000 },
  { day: "Sun", revenue: 38000 },
];

// Recent chats data with sentiment
export const recentChats = [
  {
    id: "CH-001",
    customer: "Ramesh Kumar",
    product: "Sodium Chloride",
    status: "completed",
    time: "2 min ago",
    sentiment: "positive",
    responseTime: "25",
    timestamp: "2024-01-20T10:30:00Z",
  },
  {
    id: "CH-002",
    customer: "Priya Sharma",
    product: "Sulfuric Acid",
    status: "active",
    time: "5 min ago",
    sentiment: "neutral",
    responseTime: "18",
    timestamp: "2024-01-20T10:27:00Z",
  },
  {
    id: "CH-003",
    customer: "Amit Patel",
    product: "Hydrochloric Acid",
    status: "pending",
    time: "12 min ago",
    sentiment: "positive",
    responseTime: "32",
    timestamp: "2024-01-20T10:20:00Z",
  },
  {
    id: "CH-004",
    customer: "Sneha Desai",
    product: "Nitric Acid",
    status: "completed",
    time: "25 min ago",
    sentiment: "positive",
    responseTime: "22",
    timestamp: "2024-01-20T10:07:00Z",
  },
  {
    id: "CH-005",
    customer: "Rajiv Singh",
    product: "Acetic Acid",
    status: "dropped",
    time: "1 hour ago",
    sentiment: "negative",
    responseTime: "45",
    timestamp: "2024-01-20T09:32:00Z",
  },
  {
    id: "CH-006",
    customer: "Anjali Verma",
    product: "Phosphoric Acid",
    status: "completed",
    time: "1 hour ago",
    sentiment: "positive",
    responseTime: "28",
    timestamp: "2024-01-20T09:30:00Z",
  },
  {
    id: "CH-007",
    customer: "Vikram Rao",
    product: "Calcium Carbonate",
    status: "converted",
    time: "2 hours ago",
    sentiment: "positive",
    responseTime: "20",
    timestamp: "2024-01-20T08:32:00Z",
  },
  {
    id: "CH-008",
    customer: "Meera Joshi",
    product: "Potassium Nitrate",
    status: "completed",
    time: "3 hours ago",
    sentiment: "neutral",
    responseTime: "35",
    timestamp: "2024-01-20T07:32:00Z",
  },
];

// Low stock products data
export const lowStockProducts = [
  { name: "Sodium Chloride", stock: 45, category: "Salts" },
  { name: "Sulfuric Acid", stock: 78, category: "Acids" },
  { name: "Nitric Acid", stock: 120, category: "Acids" },
  { name: "Acetic Acid", stock: 89, category: "Acids" },
  { name: "Hydrochloric Acid", stock: 156, category: "Acids" },
];

// Top products data
export const topProducts = [
  { name: "Sodium Chloride", sales: 234, revenue: 45000 },
  { name: "Sulfuric Acid", sales: 189, revenue: 52000 },
  { name: "Hydrochloric Acid", sales: 156, revenue: 38000 },
  { name: "Nitric Acid", sales: 142, revenue: 41000 },
  { name: "Acetic Acid", sales: 128, revenue: 35000 },
];

// Top queries data
export const topQueries = [
  { query: "Product pricing", count: 89 },
  { query: "Stock availability", count: 67 },
  { query: "Delivery time", count: 54 },
  { query: "Product specifications", count: 42 },
  { query: "Bulk discounts", count: 31 },
];

// Engagement data for pie chart
export const engagementData = [
  { name: "Completed", value: 118, color: "#10b981" },
  { name: "In Progress", value: 38, color: "#3b82f6" },
  { name: "Dropped", value: 186, color: "#ef4444" },
];

// Main chat analytics data (for existing components)
export const chatAnalyticsData = {
  stats: {
    totalConversations: 342,
    activeChats: 28,
    avgResponseTime: "2.3 min",
    conversionRate: "34.5%",
    totalLeads: 156,
    successfulOrders: 118,
  },
  conversationTrend: conversationData,
  engagementData: engagementData,
  recentChats: recentChats,
  topQueries: topQueries,
};

// Dashboard data for AI calculations
export const dashboardData = {
  conversationData,
  revenueData,
  recentChats,
  lowStockProducts,
  topProducts,
  topQueries,
  engagementData,
};
