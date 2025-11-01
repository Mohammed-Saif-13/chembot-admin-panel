/**
 * useSettings Hook
 * Manages application settings state
 * Syncs with localStorage for persistence
 */

import { useState, useEffect } from "react";
import { initialSettings } from "../data/initialSettings";

const STORAGE_KEY = "chembot_settings";

export const useSettings = () => {
  // ==================== STATE ====================
  /**
   * Initialize settings from localStorage or use defaults
   */
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error("Error parsing settings:", error);
        return initialSettings;
      }
    }
    return initialSettings;
  });

  // ==================== SYNC TO LOCALSTORAGE ====================
  /**
   * Save settings to localStorage whenever they change
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }, [settings]);

  // ==================== UPDATE FUNCTIONS ====================

  /**
   * Update profile settings
   * @param {Object} profileData - Updated profile data
   * @param {Function} onSuccess - Success callback
   */
  const updateProfile = (profileData, onSuccess) => {
    try {
      setSettings((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...profileData,
        },
      }));
      onSuccess?.("Profile updated successfully!");
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  /**
   * Change password (placeholder - actual implementation would call API)
   * @param {Object} passwordData - { currentPassword, newPassword }
   * @param {Function} onSuccess - Success callback
   */
  const changePassword = (passwordData, onSuccess) => {
    // TODO: Implement actual password change API call
    // For now, just simulate success
    setTimeout(() => {
      onSuccess?.("Password changed successfully!");
    }, 500);
  };

  /**
   * Update Google Sheets configuration
   * @param {Object} sheetsData - Updated sheets config
   * @param {Function} onSuccess - Success callback
   */
  const updateGoogleSheets = (sheetsData, onSuccess) => {
    try {
      setSettings((prev) => ({
        ...prev,
        googleSheets: {
          ...prev.googleSheets,
          ...sheetsData,
        },
      }));
      onSuccess?.("Google Sheets configuration saved!");
    } catch (error) {
      console.error("Update sheets error:", error);
    }
  };

  /**
   * Test Google Sheets connection
   * @param {Function} onSuccess - Success callback
   * @param {Function} onError - Error callback
   */
  const testSheetsConnection = (onSuccess, onError) => {
    // TODO: Implement actual API test
    // Simulate test
    setTimeout(() => {
      if (settings.googleSheets.apiKey && settings.googleSheets.sheetId) {
        setSettings((prev) => ({
          ...prev,
          googleSheets: {
            ...prev.googleSheets,
            lastSyncTime: new Date().toISOString(),
          },
        }));
        onSuccess?.("Connection successful! ✓");
      } else {
        onError?.("Please enter API Key and Sheet ID");
      }
    }, 1000);
  };

  /**
   * Update appearance settings
   * @param {Object} appearanceData - Updated appearance config
   * @param {Function} onSuccess - Success callback
   */
  const updateAppearance = (appearanceData, onSuccess) => {
    try {
      setSettings((prev) => ({
        ...prev,
        appearance: {
          ...prev.appearance,
          ...appearanceData,
        },
      }));
      onSuccess?.("Appearance settings saved!");
    } catch (error) {
      console.error("Update appearance error:", error);
    }
  };

  /**
   * Update notification preferences
   * @param {Object} notificationData - Updated notification config
   * @param {Function} onSuccess - Success callback
   */
  const updateNotifications = (notificationData, onSuccess) => {
    try {
      setSettings((prev) => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          ...notificationData,
        },
      }));
      onSuccess?.("Notification preferences saved!");
    } catch (error) {
      console.error("Update notifications error:", error);
    }
  };

  /**
   * Update business settings
   * @param {Object} businessData - Updated business config
   * @param {Function} onSuccess - Success callback
   */
  const updateBusiness = (businessData, onSuccess) => {
    try {
      setSettings((prev) => ({
        ...prev,
        business: {
          ...prev.business,
          ...businessData,
        },
      }));
      onSuccess?.("Business settings saved!");
    } catch (error) {
      console.error("Update business error:", error);
    }
  };

  /**
   * Reset all settings to defaults
   * @param {Function} onSuccess - Success callback
   */
  const resetSettings = (onSuccess) => {
    if (
      window.confirm("Are you sure you want to reset all settings to default?")
    ) {
      setSettings(initialSettings);
      onSuccess?.("Settings reset to default!");
    }
  };

  // ==================== RETURN ====================
  return {
    // Current settings
    settings,

    // Update functions
    updateProfile,
    changePassword,
    updateGoogleSheets,
    testSheetsConnection,
    updateAppearance,
    updateNotifications,
    updateBusiness,
    resetSettings,
  };
};
