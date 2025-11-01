/**
 * GoogleSheetsSettings Component
 * Google Sheets API configuration
 * API Key, Sheet ID, Auto-sync settings, Test connection
 */

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Key,
  Link,
  RefreshCw,
  Save,
  CheckCircle,
  Loader2,
} from "lucide-react";

export const GoogleSheetsSettings = ({
  settings,
  onUpdateSheets,
  onTestConnection,
}) => {
  // ==================== STATE ====================
  const [sheetsForm, setSheetsForm] = useState({
    apiKey: settings.googleSheets.apiKey,
    sheetId: settings.googleSheets.sheetId,
    autoSync: settings.googleSheets.autoSync,
    syncFrequency: settings.googleSheets.syncFrequency,
  });

  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  // ==================== HANDLERS ====================

  /**
   * Handle form input change
   */
  const handleChange = (field, value) => {
    setSheetsForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setTestResult(null); // Clear test result on change
  };

  /**
   * Save Google Sheets configuration
   */
  const handleSave = () => {
    onUpdateSheets(sheetsForm);
  };

  /**
   * Test Google Sheets connection
   */
  const handleTestConnection = () => {
    setIsTesting(true);
    setTestResult(null);

    onTestConnection(
      (message) => {
        // Success
        setTestResult({ type: "success", message });
        setIsTesting(false);
      },
      (message) => {
        // Error
        setTestResult({ type: "error", message });
        setIsTesting(false);
      }
    );
  };

  /**
   * Format last sync time
   */
  const formatLastSync = () => {
    if (!settings.googleSheets.lastSyncTime) return "Never synced";

    const date = new Date(settings.googleSheets.lastSyncTime);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ==================== RENDER ====================
  return (
    <div className="space-y-6">
      {/* API Configuration Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            API Configuration
          </h3>
        </div>

        <div className="space-y-4">
          {/* API Key Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Key className="inline h-4 w-4 mr-1" />
              Google Sheets API Key
            </label>
            <input
              type="password"
              value={sheetsForm.apiKey}
              onChange={(e) => handleChange("apiKey", e.target.value)}
              placeholder="Enter your Google Sheets API Key"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Get your API key from Google Cloud Console
            </p>
          </div>

          {/* Sheet ID Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Link className="inline h-4 w-4 mr-1" />
              Google Sheet ID
            </label>
            <input
              type="text"
              value={sheetsForm.sheetId}
              onChange={(e) => handleChange("sheetId", e.target.value)}
              placeholder="Enter your Google Sheet ID"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Found in your Google Sheets URL after /d/
            </p>
          </div>

          {/* Test Connection Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !sheetsForm.apiKey || !sheetsForm.sheetId}
              className="px-4 py-2 border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTesting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  Test Connection
                </>
              )}
            </button>

            {/* Test Result */}
            {testResult && (
              <div
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  testResult.type === "success"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {testResult.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sync Settings Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <RefreshCw className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Sync Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Auto-Sync Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="font-medium dark:text-slate-50">Enable Auto-Sync</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Automatically sync products from Google Sheets
              </p>
            </div>
            <button
              onClick={() => handleChange("autoSync", !sheetsForm.autoSync)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                sheetsForm.autoSync
                  ? "bg-indigo-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  sheetsForm.autoSync ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Sync Frequency */}
          {sheetsForm.autoSync && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sync Frequency
              </label>
              <select
                value={sheetsForm.syncFrequency}
                onChange={(e) => handleChange("syncFrequency", e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="5">Every 5 minutes</option>
                <option value="10">Every 10 minutes</option>
                <option value="30">Every 30 minutes</option>
                <option value="60">Every 1 hour</option>
              </select>
            </div>
          )}

          {/* Last Sync Time */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                Last Sync:
              </span>
              <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                {formatLastSync()}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
          >
            <Save className="h-4 w-4" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
