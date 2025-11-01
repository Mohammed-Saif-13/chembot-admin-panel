/**
 * Application Configuration
 * Centralized configuration for the entire application
 * All constants, endpoints, and settings are defined here
 */

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost/api',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      PROFILE: '/auth/profile',
    },
    PRODUCTS: {
      BASE: '/products',
      SYNC: '/products/sync',
      BY_ID: (id) => `/products/${id}`,
    },
    ORDERS: {
      BASE: '/orders',
      BY_ID: (id) => `/orders/${id}`,
      INVOICE: (id) => `/orders/invoice/${id}`,
    },
    CUSTOMERS: {
      BASE: '/customers',
      BY_ID: (id) => `/customers/${id}`,
    },
    DASHBOARD: {
      STATS: '/dashboard/stats',
      CHARTS: '/dashboard/charts',
    },
    REPORTS: {
      SALES: '/reports/sales',
      PRODUCTS: '/reports/products',
      CUSTOMERS: '/reports/customers',
    },
  },
};

/**
 * Application Information
 */
export const APP_CONFIG = {
  NAME: import.meta.env.VITE_APP_NAME || 'ChemBot Admin',
  VERSION: '1.0.0',
  DESCRIPTION: 'Chemical Inventory Management System',
  COMPANY: 'ChemBot',
};

/**
 * Pagination Settings
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
};

/**
 * Product Configuration
 */
export const PRODUCT_CONFIG = {
  LOW_STOCK_THRESHOLD: 500,
  OUT_OF_STOCK: 0,
  UNITS: ['Kg', 'L', 'g', 'mL', 'mg', 'pcs'],
  STATUS: {
    ACTIVE: 'Active',
    LOW_STOCK: 'Low Stock',
    OUT_OF_STOCK: 'Out of Stock',
  },
};

/**
 * Order Configuration
 */
export const ORDER_CONFIG = {
  STATUS: {
    PENDING: 'Pending',
    PROCESSING: 'Processing',
    SHIPPED: 'Shipped',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
  },
  PAYMENT_METHODS: ['Cash', 'Card', 'UPI', 'Net Banking', 'Cheque'],
};

/**
 * Validation Rules
 */
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[6-9]\d{9}$/,
  PRICE_MIN: 0,
  PRICE_MAX: 999999,
  STOCK_MIN: 0,
  STOCK_MAX: 999999,
};

/**
 * Date/Time Formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'DD MMM YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'DD MMM YYYY, hh:mm A',
  API: 'YYYY-MM-DD HH:mm:ss',
};

/**
 * UI Configuration
 */
export const UI_CONFIG = {
  NOTIFICATION_DURATION: 3000,
  DEBOUNCE_DELAY: 500,
  ANIMATION_DURATION: 300,
  MODAL_Z_INDEX: 50,
  DROPDOWN_Z_INDEX: 40,
  HEADER_Z_INDEX: 30,
};

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language',
};

/**
 * Routes
 */
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CUSTOMERS: '/customers',
  REPORTS: '/reports',
  SETTINGS: '/settings',
  PROFILE: '/profile',
};

/**
 * Export/Import Configuration
 */
export const EXPORT_CONFIG = {
  EXCEL_FILENAME: 'chembot_export',
  CSV_FILENAME: 'chembot_export',
  PDF_FILENAME: 'chembot_report',
  MAX_EXPORT_ROWS: 10000,
};

/**
 * Google Sheets Configuration
 */
export const GOOGLE_SHEETS_CONFIG = {
  API_KEY: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY || '',
  SHEET_ID: import.meta.env.VITE_GOOGLE_SHEET_ID || '',
  SYNC_INTERVAL: 300000,
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'Resource not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  PRODUCT_ADDED: 'Product added successfully.',
  PRODUCT_UPDATED: 'Product updated successfully.',
  PRODUCT_DELETED: 'Product deleted successfully.',
  ORDER_CREATED: 'Order created successfully.',
  ORDER_UPDATED: 'Order status updated successfully.',
  SYNC_SUCCESS: 'Data synced successfully from Google Sheets.',
  LOGIN_SUCCESS: 'Login successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
};

/**
 * Table Column Configurations
 */
export const TABLE_COLUMNS = {
  PRODUCTS: [
    { key: 'id', label: 'ID', sortable: true, width: '100px' },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'formula', label: 'Formula', sortable: false },
    { key: 'stock', label: 'Stock', sortable: true, align: 'right' },
    { key: 'price', label: 'Price', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true, align: 'center' },
    { key: 'actions', label: 'Actions', sortable: false, align: 'center', width: '80px' },
  ],
  ORDERS: [
    { key: 'id', label: 'Order ID', sortable: true },
    { key: 'customer', label: 'Customer', sortable: true },
    { key: 'products', label: 'Products', sortable: false },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right' },
    { key: 'status', label: 'Status', sortable: true, align: 'center' },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false, align: 'center' },
  ],
};

/**
 * Permission Levels
 */
export const PERMISSIONS = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff',
  VIEWER: 'viewer',
};

/**
 * Feature Flags
 */
export const FEATURES = {
  GOOGLE_SHEETS_SYNC: true,
  EXCEL_EXPORT: true,
  PDF_EXPORT: true,
  DARK_MODE: true,
  EMAIL_NOTIFICATIONS: false,
  SMS_NOTIFICATIONS: false,
};