/**
 * Initial Settings Data
 * Default configuration for admin settings
 * This will be saved to localStorage and synced with backend
 */

export const initialSettings = {
  // ==================== ADMIN PROFILE ====================
  profile: {
    name: "Admin User",
    email: "admin@chembots.com",
    phone: "+91 98765 43210",
    role: "Administrator",
    profilePhoto: null, // URL or base64
  },

  // ==================== GOOGLE SHEETS CONFIG ====================
  googleSheets: {
    apiKey: "",
    sheetId: "",
    autoSync: false,
    syncFrequency: "30", // minutes (5, 10, 30, 60)
    lastSyncTime: null,
  },

  // ==================== APPEARANCE ====================
  appearance: {
    theme: "light", // light, dark, system
    accentColor: "#4f46e5", // Indigo
    fontSize: "medium", // small, medium, large
    compactMode: false,
  },

  // ==================== NOTIFICATIONS ====================
  notifications: {
    email: {
      enabled: true,
      newOrders: true,
      lowStock: true,
      paymentUpdates: true,
    },
    sms: {
      enabled: false,
      orderStatus: false,
      criticalAlerts: true,
    },
    whatsapp: {
      enabled: false,
      dailyReports: false,
      weeklySummary: false,
    },
  },

  // ==================== BUSINESS SETTINGS ====================
  business: {
    companyName: "Vijay Chemicals",
    address: {
      street: "Industrial Area, Phase 2",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411019",
    },
    gstNumber: "",
    taxPercentage: 10,
    defaultShippingCost: 500,
    currency: "INR", // INR, USD
    businessHours: {
      from: "09:00",
      to: "18:00",
    },
  },
};
