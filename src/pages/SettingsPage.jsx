/**
 * SettingsPage Component
 * Main settings page with tab navigation
 * Manages all application settings - Profile, Sheets, Appearance, Notifications, Business
 */

import React, { useState } from "react";
import {
  User,
  FileSpreadsheet,
  Bell,
  Building,
  Check,
  X as XIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Import setting components
import { ProfileSettings } from "../features/settings/components/ProfileSettings";
import { GoogleSheetsSettings } from "../features/settings/components/GoogleSheetsSettings";
import { NotificationSettings } from "../features/settings/components/NotificationSettings";
import { BusinessSettings } from "../features/settings/components/BusinessSettings";

// Import settings hook
import { useSettings } from "../features/settings/hooks/useSettings";
import { UI_CONFIG } from "../config/config";

// ==================== INLINE NOTIFICATION ====================
/**
 * Notification Component
 * @param {Object} notification - { message, type }
 * @param {Function} onClose - Close callback
 */
const Notification = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-5">
      <div
        className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg ${
          notification.type === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
        }`}
      >
        {notification.type === "success" ? (
          <Check className="h-5 w-5" />
        ) : (
          <XIcon className="h-5 w-5" />
        )}
        <span className="font-medium">{notification.message}</span>
      </div>
    </div>
  );
};

// ==================== MAIN COMPONENT ====================
const SettingsPage = () => {
  // ========== HOOKS ==========
  const {
    settings,
    updateProfile,
    changePassword,
    updateGoogleSheets,
    testSheetsConnection,
    // updateAppearance,
    // updateNotifications,
    // updateBusiness,
  } = useSettings();

  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState(null);

  // ========== TAB CONFIGURATION ==========
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "sheets", label: "Google Sheets", icon: FileSpreadsheet },
    // { id: "appearance", label: "Appearance", icon: Palette },
    // { id: "notifications", label: "Notifications", icon: Bell },
    // { id: "business", label: "Business", icon: Building },
  ];

  // ========== NOTIFICATION HANDLER ==========
  /**
   * Show notification message
   * @param {string} message - Message to display
   * @param {string} type - 'success' or 'error'
   */
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), UI_CONFIG.NOTIFICATION_DURATION);
  };

  // ========== HANDLERS WITH NOTIFICATIONS ==========

  const handleUpdateProfile = (profileData) => {
    updateProfile(profileData, showNotification);
  };

  const handleChangePassword = (passwordData) => {
    changePassword(passwordData, showNotification);
  };

  const handleUpdateSheets = (sheetsData) => {
    updateGoogleSheets(sheetsData, showNotification);
  };

  const handleTestConnection = (onSuccess, onError) => {
    testSheetsConnection(
      (message) => {
        showNotification(message, "success");
        onSuccess?.(message);
      },
      (message) => {
        showNotification(message, "error");
        onError?.(message);
      }
    );
  };

//   const handleUpdateAppearance = (appearanceData) => {
//     updateAppearance(appearanceData, showNotification);
//   };

//   const handleUpdateNotifications = (notificationData) => {
//     updateNotifications(notificationData, showNotification);
//   };

//   const handleUpdateBusiness = (businessData) => {
//     updateBusiness(businessData, showNotification);
//   };

  // ========== RENDER ACTIVE TAB CONTENT ==========
  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <ProfileSettings
            settings={settings}
            onUpdateProfile={handleUpdateProfile}
            onChangePassword={handleChangePassword}
          />
        );
      case "sheets":
        return (
          <GoogleSheetsSettings
            settings={settings}
            onUpdateSheets={handleUpdateSheets}
            onTestConnection={handleTestConnection}
          />
        );
      //   case "appearance":
      //     return (
      //       <AppearanceSettings
      //         settings={settings}
      //         onUpdateAppearance={handleUpdateAppearance}
      //       />
      //     );
      case "notifications":
        return (
          <NotificationSettings
            settings={settings}
            onUpdateNotifications={handleUpdateNotifications}
          />
        );
      case "business":
        return (
          <BusinessSettings
            settings={settings}
            onUpdateBusiness={handleUpdateBusiness}
          />
        );
      default:
        return null;
    }
  };

  // ========== RENDER ==========
  return (
    <div className="space-y-8">
      {/* Notification Toast */}
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your account and application preferences
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 dark:border-slate-700">
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  isActive
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content Card */}
      <Card className="rounded-xl shadow-lg">
        <CardContent className="p-6">{renderTabContent()}</CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
