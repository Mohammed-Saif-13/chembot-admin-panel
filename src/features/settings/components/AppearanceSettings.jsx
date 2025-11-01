/**
 * AppearanceSettings Component
 * Theme toggle (Light/Dark), Accent color, Font size
 * Visual customization options
 */

import React, { useState } from "react";
import { Palette, Sun, Moon, Type, Save } from "lucide-react";

export const AppearanceSettings = ({ settings, onUpdateAppearance }) => {
  // ==================== STATE ====================
  const [appearanceForm, setAppearanceForm] = useState({
    theme: settings.appearance.theme,
    fontSize: settings.appearance.fontSize,
    compactMode: settings.appearance.compactMode,
  });

  // ==================== HANDLERS ====================

  /**
   * Handle form change
   */
  const handleChange = (field, value) => {
    setAppearanceForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Save appearance settings
   */
  const handleSave = () => {
    onUpdateAppearance(appearanceForm);
  };

  // ==================== RENDER ====================
  return (
    <div className="space-y-6">
      {/* Theme Settings Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Theme Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Theme Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Theme Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Light Theme */}
              <button
                onClick={() => handleChange("theme", "light")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  appearanceForm.theme === "light"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-400"
                }`}
              >
                <Sun
                  className={`h-8 w-8 mx-auto mb-2 ${
                    appearanceForm.theme === "light"
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    appearanceForm.theme === "light"
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Light Mode
                </p>
              </button>

              {/* Dark Theme */}
              <button
                onClick={() => handleChange("theme", "dark")}
                className={`p-4 border-2 rounded-lg transition-all ${
                  appearanceForm.theme === "dark"
                    ? "border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-slate-300 dark:border-slate-600 hover:border-indigo-400"
                }`}
              >
                <Moon
                  className={`h-8 w-8 mx-auto mb-2 ${
                    appearanceForm.theme === "dark"
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    appearanceForm.theme === "dark"
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Dark Mode
                </p>
              </button>
            </div>
          </div>

          {/* Current Theme Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Current theme:</strong>{" "}
              {appearanceForm.theme === "light" ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        </div>
      </div>

      {/* Display Settings Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Type className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Display Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Font Size
            </label>
            <select
              value={appearanceForm.fontSize}
              onChange={(e) => handleChange("fontSize", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="small">Small</option>
              <option value="medium">Medium (Recommended)</option>
              <option value="large">Large</option>
            </select>
          </div>

          {/* Compact Mode Toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
            <div>
              <p className="font-medium dark:text-slate-50">Compact Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Reduce spacing for dense information display
              </p>
            </div>
            <button
              onClick={() =>
                handleChange("compactMode", !appearanceForm.compactMode)
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                appearanceForm.compactMode
                  ? "bg-indigo-600"
                  : "bg-slate-300 dark:bg-slate-600"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  appearanceForm.compactMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
          >
            <Save className="h-4 w-4" />
            Save Appearance
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <h3 className="font-semibold text-lg dark:text-slate-50 mb-3">
          Preview
        </h3>
        <div className="space-y-2">
          <p
            className={`${
              appearanceForm.fontSize === "small"
                ? "text-sm"
                : appearanceForm.fontSize === "large"
                ? "text-lg"
                : "text-base"
            } dark:text-slate-300`}
          >
            Sample text with current font size
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Font size: {appearanceForm.fontSize} | Compact:{" "}
            {appearanceForm.compactMode ? "On" : "Off"}
          </p>
        </div>
      </div>
    </div>
  );
};
