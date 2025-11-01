/**
 * BusinessSettings Component
 * Business information and operational settings
 * Company details, tax, shipping, business hours
 */

import React, { useState } from "react";
import {
  Building,
  MapPin,
  CreditCard,
  DollarSign,
  Clock,
  Save,
} from "lucide-react";

export const BusinessSettings = ({ settings, onUpdateBusiness }) => {
  // ==================== STATE ====================
  const [businessForm, setBusinessForm] = useState({
    companyName: settings.business.companyName,
    address: { ...settings.business.address },
    gstNumber: settings.business.gstNumber,
    taxPercentage: settings.business.taxPercentage,
    defaultShippingCost: settings.business.defaultShippingCost,
    currency: settings.business.currency,
    businessHours: { ...settings.business.businessHours },
  });

  // ==================== HANDLERS ====================

  /**
   * Handle form change
   */
  const handleChange = (field, value) => {
    setBusinessForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Handle nested address change
   */
  const handleAddressChange = (field, value) => {
    setBusinessForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }));
  };

  /**
   * Handle business hours change
   */
  const handleHoursChange = (field, value) => {
    setBusinessForm((prev) => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [field]: value,
      },
    }));
  };

  /**
   * Save business settings
   */
  const handleSave = () => {
    onUpdateBusiness(businessForm);
  };

  // ==================== RENDER ====================
  return (
    <div className="space-y-6">
      {/* Company Information Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Building className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Company Information
          </h3>
        </div>

        <div className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={businessForm.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Enter company name"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* GST Number */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <CreditCard className="inline h-4 w-4 mr-1" />
              GST Number (Optional)
            </label>
            <input
              type="text"
              value={businessForm.gstNumber}
              onChange={(e) => handleChange("gstNumber", e.target.value)}
              placeholder="Enter GST number"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Business Address Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Business Address
          </h3>
        </div>

        <div className="space-y-4">
          {/* Street */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={businessForm.address.street}
              onChange={(e) => handleAddressChange("street", e.target.value)}
              placeholder="Enter street address"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                City
              </label>
              <input
                type="text"
                value={businessForm.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="Enter city"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                State
              </label>
              <input
                type="text"
                value={businessForm.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                placeholder="Enter state"
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Pincode
            </label>
            <input
              type="text"
              value={businessForm.address.pincode}
              onChange={(e) => handleAddressChange("pincode", e.target.value)}
              placeholder="Enter pincode"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Financial Settings Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Financial Settings
          </h3>
        </div>

        <div className="space-y-4">
          {/* Tax Percentage */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Default Tax Percentage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={businessForm.taxPercentage}
              onChange={(e) =>
                handleChange("taxPercentage", parseFloat(e.target.value))
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Applied to all orders by default
            </p>
          </div>

          {/* Default Shipping Cost */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Default Shipping Cost (₹)
            </label>
            <input
              type="number"
              min="0"
              value={businessForm.defaultShippingCost}
              onChange={(e) =>
                handleChange("defaultShippingCost", parseInt(e.target.value))
              }
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Default shipping charge for orders
            </p>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Currency
            </label>
            <select
              value={businessForm.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD (US Dollar)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Business Hours Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Business Hours
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Opening Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Opening Time
            </label>
            <input
              type="time"
              value={businessForm.businessHours.from}
              onChange={(e) => handleHoursChange("from", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Closing Time */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Closing Time
            </label>
            <input
              type="time"
              value={businessForm.businessHours.to}
              onChange={(e) => handleHoursChange("to", e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Operational hours: {businessForm.businessHours.from} -{" "}
          {businessForm.businessHours.to}
        </p>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full sm:w-auto px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors font-medium"
      >
        <Save className="h-4 w-4" />
        Save Business Settings
      </button>
    </div>
  );
};
