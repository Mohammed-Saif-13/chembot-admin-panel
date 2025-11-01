/**
 * Utility Functions
 * Core helper functions used across the application
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper precedence
 * @param {...(string|object|array)} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as Indian currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "₹0";
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Formats a date string to readable format
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type: 'short' | 'long' | 'time'
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = "short") {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (isNaN(dateObj.getTime())) {
    return "";
  }

  const options = {
    short: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    time: {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  };

  return dateObj.toLocaleDateString("en-IN", options[format] || options.short);
}

/**
 * Truncates text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export function truncateText(text, maxLength = 50) {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Generates a unique ID
 * @param {string} prefix - Optional prefix for the ID
 * @returns {string} Unique ID
 */
export function generateId(prefix = "") {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 9);
  return prefix
    ? `${prefix}-${timestamp}-${randomStr}`
    : `${timestamp}-${randomStr}`;
}

/**
 * Debounces a function call
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ""));
}

/**
 * Capitalizes first letter of each word
 * @param {string} text - Text to capitalize
 * @returns {string} Capitalized text
 */
export function capitalizeWords(text) {
  if (!text) return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Calculates product status based on stock level
 * @param {number} stock - Current stock level
 * @param {number} lowStockThreshold - Threshold for low stock warning
 * @returns {string} Status: 'Active' | 'Low Stock' | 'Out of Stock'
 */
export function calculateProductStatus(stock, lowStockThreshold = 500) {
  if (stock === 0) return "Out of Stock";
  if (stock < lowStockThreshold) return "Low Stock";
  return "Active";
}

/**
 * Gets status badge color classes
 * @param {string} status - Status value
 * @returns {string} Tailwind CSS classes for badge
 */
export function getStatusColorClasses(status) {
  const statusColors = {
    Active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "Low Stock":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "Out of Stock": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Processing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    Shipped:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    Delivered:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    statusColors[status] ||
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
  );
}

/**
 * Filters array of objects by search query
 * @param {Array} data - Array to filter
 * @param {string} query - Search query
 * @param {Array<string>} fields - Fields to search in
 * @returns {Array} Filtered array
 */
export function searchFilter(data, query, fields = []) {
  if (!query || !query.trim()) {
    return data;
  }

  const searchTerm = query.toLowerCase().trim();

  return data.filter((item) => {
    return fields.some((field) => {
      const value = item[field];
      return value && value.toString().toLowerCase().includes(searchTerm);
    });
  });
}

/**
 * Sorts array of objects by field
 * @param {Array} data - Array to sort
 * @param {string} field - Field to sort by
 * @param {string} order - Sort order: 'asc' | 'desc'
 * @returns {Array} Sorted array
 */
export function sortData(data, field, order = "asc") {
  return [...data].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (order === "asc") {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });
}

/**
 * Deep clones an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Safely gets nested object property
 * @param {Object} obj - Object to access
 * @param {string} path - Dot-separated path (e.g., 'user.address.city')
 * @param {*} defaultValue - Default value if path not found
 * @returns {*} Value at path or default value
 */
export function getNestedProperty(obj, path, defaultValue = null) {
  return (
    path.split(".").reduce((acc, part) => acc && acc[part], obj) || defaultValue
  );
}

/**
 * Removes empty values from object
 * @param {Object} obj - Object to clean
 * @returns {Object} Cleaned object
 */
export function removeEmptyValues(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
}

/**
 * Checks if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - Value to check
 * @returns {boolean} True if empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}
