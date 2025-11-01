/**
 * NotificationSettings Component
 * Notification preferences - Email, SMS, WhatsApp
 * Toggle switches for different notification types
 */

import React, { useState } from "react";
import { Bell, Mail, MessageSquare, Save } from "lucide-react";

export const NotificationSettings = ({ settings, onUpdateNotifications }) => {
  // ==================== STATE ====================
  const [notificationForm, setNotificationForm] = useState({
    email: { ...settings.notifications.email },
    sms: { ...settings.notifications.sms },
    whatsapp: { ...settings.notifications.whatsapp },
  });

  // ==================== HANDLERS ====================

  /**
   * Toggle notification channel (email/sms/whatsapp)
   */
  const toggleChannel = (channel, field) => {
    setNotificationForm((prev) => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [field]: !prev[channel][field],
      },
    }));
  };

  /**
   * Save notification settings
   */
  const handleSave = () => {
    onUpdateNotifications(notificationForm);
  };

  // ==================== RENDER ====================
  return (
    <div className="space-y-6">
      {/* Email Notifications Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mail className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Email Notifications
          </h3>
        </div>

        <div className="space-y-3">
          {/* Enable Email Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="font-medium dark:text-slate-50">
                Enable Email Notifications
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Receive notifications via email
              </p>
            </div>
            <button
              onClick={() => toggleChannel("email", "enabled")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationForm.email.enabled
                  ? "bg-indigo-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationForm.email.enabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Email Notification Types */}
          {notificationForm.email.enabled && (
            <div className="ml-4 space-y-2 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
              {/* New Orders */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  New Orders
                </label>
                <button
                  onClick={() => toggleChannel("email", "newOrders")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.email.newOrders
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.email.newOrders
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Low Stock Alerts */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Low Stock Alerts
                </label>
                <button
                  onClick={() => toggleChannel("email", "lowStock")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.email.lowStock
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.email.lowStock
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Payment Updates */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Payment Updates
                </label>
                <button
                  onClick={() => toggleChannel("email", "paymentUpdates")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.email.paymentUpdates
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.email.paymentUpdates
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SMS Notifications Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            SMS Notifications
          </h3>
        </div>

        <div className="space-y-3">
          {/* Enable SMS Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="font-medium dark:text-slate-50">
                Enable SMS Notifications
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Receive notifications via SMS
              </p>
            </div>
            <button
              onClick={() => toggleChannel("sms", "enabled")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationForm.sms.enabled
                  ? "bg-indigo-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationForm.sms.enabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* SMS Notification Types */}
          {notificationForm.sms.enabled && (
            <div className="ml-4 space-y-2 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
              {/* Order Status Changes */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Order Status Changes
                </label>
                <button
                  onClick={() => toggleChannel("sms", "orderStatus")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.sms.orderStatus
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.sms.orderStatus
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Critical Alerts */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Critical Alerts
                </label>
                <button
                  onClick={() => toggleChannel("sms", "criticalAlerts")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.sms.criticalAlerts
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.sms.criticalAlerts
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Notifications Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            WhatsApp Notifications
          </h3>
        </div>

        <div className="space-y-3">
          {/* Enable WhatsApp Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="font-medium dark:text-slate-50">
                Enable WhatsApp Notifications
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Receive reports via WhatsApp
              </p>
            </div>
            <button
              onClick={() => toggleChannel("whatsapp", "enabled")}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notificationForm.whatsapp.enabled
                  ? "bg-indigo-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationForm.whatsapp.enabled
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* WhatsApp Notification Types */}
          {notificationForm.whatsapp.enabled && (
            <div className="ml-4 space-y-2 border-l-2 border-indigo-200 dark:border-indigo-800 pl-4">
              {/* Daily Reports */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Daily Reports
                </label>
                <button
                  onClick={() => toggleChannel("whatsapp", "dailyReports")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.whatsapp.dailyReports
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.whatsapp.dailyReports
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Weekly Summary */}
              <div className="flex items-center justify-between py-2">
                <label className="text-sm text-slate-700 dark:text-slate-300">
                  Weekly Summary
                </label>
                <button
                  onClick={() => toggleChannel("whatsapp", "weeklySummary")}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    notificationForm.whatsapp.weeklySummary
                      ? "bg-green-600"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                >
                  <span
                    className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      notificationForm.whatsapp.weeklySummary
                        ? "translate-x-5"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
      >
        <Save className="h-4 w-4" />
        Save Notification Preferences
      </button>
    </div>
  );
};
