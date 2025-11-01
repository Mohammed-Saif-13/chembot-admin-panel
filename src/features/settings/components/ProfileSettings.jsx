/**
 * ProfileSettings Component
 * Enhanced with password visibility, strength meter, and unsaved changes warning
 */

import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Lock,
  Save,
  Camera,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export const ProfileSettings = ({
  settings,
  onUpdateProfile,
  onChangePassword,
}) => {
  // ==================== STATE ====================
  const [profileForm, setProfileForm] = useState({
    name: settings.profile.name,
    email: settings.profile.email,
    phone: settings.profile.phone,
  });

  // Track unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Separate state for photo
  const [tempPhoto, setTempPhoto] = useState(null);
  const [hasPhotoChanged, setHasPhotoChanged] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Current photo
  const currentPhoto = tempPhoto || settings.profile.profilePhoto;

  // ==================== PASSWORD STRENGTH CALCULATION ====================

  /**
   * Calculate password strength
   * @param {string} password
   * @returns {Object} { strength: 'weak'|'medium'|'strong', score: 0-100, feedback: string }
   */
  const calculatePasswordStrength = (password) => {
    if (!password) return { strength: "none", score: 0, feedback: "" };

    let score = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;

    // Character variety checks
    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/[0-9]/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 15;

    // Determine strength
    let strength = "weak";
    if (score >= 70) strength = "strong";
    else if (score >= 40) strength = "medium";

    // Feedback messages
    if (password.length < 8) feedback.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) feedback.push("Add uppercase letter");
    if (!/[0-9]/.test(password)) feedback.push("Add number");
    if (!/[^A-Za-z0-9]/.test(password)) feedback.push("Add special character");

    return {
      strength,
      score,
      feedback: feedback.join(" • "),
    };
  };

  const passwordStrength = calculatePasswordStrength(passwordForm.newPassword);

  // ==================== EFFECTS ====================

  /**
   * Detect unsaved changes in profile
   */
  useEffect(() => {
    const hasChanges =
      profileForm.name !== settings.profile.name ||
      profileForm.email !== settings.profile.email ||
      profileForm.phone !== settings.profile.phone ||
      hasPhotoChanged;

    setHasUnsavedChanges(hasChanges);
  }, [profileForm, hasPhotoChanged, settings.profile]);

  // ==================== HANDLERS ====================

  /**
   * Handle profile form input change
   */
  const handleProfileChange = (field, value) => {
    setProfileForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * Handle photo upload
   */
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a valid image (JPEG, PNG, WebP)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    // Read file and convert to base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setTempPhoto(base64String);
      setHasPhotoChanged(true);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Remove profile photo
   */
  const handleRemovePhoto = () => {
    setTempPhoto(null);
    setHasPhotoChanged(true);
  };

  /**
   * Handle password form input change
   */
  const handlePasswordChange = (field, value) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPasswordError("");
    setPasswordSuccess("");
  };

  /**
   * Save profile changes (including photo)
   */
  const handleSaveProfile = () => {
    onUpdateProfile({
      ...profileForm,
      profilePhoto: hasPhotoChanged ? tempPhoto : settings.profile.profilePhoto,
    });
    setHasPhotoChanged(false);
    setHasUnsavedChanges(false);

    // Trigger header update
    setTimeout(() => {
      window.dispatchEvent(new Event("profileUpdated"));
    }, 100);
  };

  /**
   * Change password with enhanced validation
   */
  const handleChangePassword = () => {
    // Clear previous messages
    setPasswordError("");
    setPasswordSuccess("");

    // Validation
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters");
      return;
    }

    // Enhanced validation
    if (!/[A-Z]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[0-9]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one number");
      return;
    }

    if (!/[^A-Za-z0-9]/.test(passwordForm.newPassword)) {
      setPasswordError("Password must contain at least one special character");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword === passwordForm.currentPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    // Call change password
    onChangePassword(passwordForm);

    // Show success and reset form
    setPasswordSuccess("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    // Clear success message after 5 seconds
    setTimeout(() => setPasswordSuccess(""), 5000);
  };

  /**
   * Get strength indicator color
   */
  const getStrengthColor = (strength) => {
    switch (strength) {
      case "strong":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "weak":
        return "bg-red-500";
      default:
        return "bg-slate-300";
    }
  };

  // ==================== RENDER ====================
  return (
    <div className="space-y-6">
      {/* Profile Photo & Information Combined Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Profile Information
          </h3>
        </div>

        {/* ⚠️ Unsaved Changes Warning */}
        {hasUnsavedChanges && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 rounded-lg animate-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                {/* <p className="font-semibold text-amber-900 dark:text-amber-300">
                  Unsaved Changes Detected
                </p> */}
                <p className="text-sm text-amber-800 dark:text-amber-400 mt-1">
                  You have made changes to your profile. Please click{" "}
                  <strong>"Save Profile Changes"</strong> button below to apply
                  these changes.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Photo Badge with Camera Icon */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              {/* Profile Photo Circle */}
              {currentPhoto ? (
                <img
                  src={currentPhoto}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-700 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg border-4 border-indigo-200 dark:border-indigo-700">
                  {profileForm.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}

              {/* Camera Icon Overlay */}
              <label className="absolute bottom-0 right-0 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg cursor-pointer transition-all group-hover:scale-110 transform">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Photo Info & Remove */}
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Profile Photo
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Click camera icon to upload. Max 5MB (JPEG, PNG, WebP)
              </p>
              {currentPhoto && (
                <button
                  onClick={handleRemovePhoto}
                  className="mt-2 text-sm text-red-600 dark:text-red-400 hover:underline font-medium"
                >
                  Remove Photo
                </button>
              )}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={profileForm.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Phone className="inline h-4 w-4 mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={profileForm.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Role
            </label>
            <input
              type="text"
              value={settings.profile.role}
              readOnly
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-100 dark:bg-slate-800 dark:text-slate-50 cursor-not-allowed"
            />
          </div>

          {/* Save Profile Button */}
          <button
            onClick={handleSaveProfile}
            disabled={!hasUnsavedChanges}
            className={`w-full sm:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium shadow-sm ${
              hasUnsavedChanges
                ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
                : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            }`}
          >
            <Save className="h-4 w-4" />
            Save Profile Changes
          </button>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="border dark:border-slate-700 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-5 w-5 text-indigo-600" />
          <h3 className="font-semibold text-lg dark:text-slate-50">
            Change Password
          </h3>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(e) =>
                  handlePasswordChange("currentPassword", e.target.value)
                }
                placeholder="Enter current password"
                className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                placeholder="Enter new password"
                className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {passwordForm.newPassword && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getStrengthColor(
                        passwordStrength.strength
                      )} transition-all duration-300`}
                      style={{ width: `${passwordStrength.score}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-semibold capitalize ${
                      passwordStrength.strength === "strong"
                        ? "text-green-600 dark:text-green-400"
                        : passwordStrength.strength === "medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {passwordStrength.strength === "none"
                      ? ""
                      : passwordStrength.strength}
                  </span>
                </div>
                {passwordStrength.feedback && (
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    💡 {passwordStrength.feedback}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
                placeholder="Re-enter new password"
                className="w-full px-4 py-2 pr-12 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {passwordError && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600 dark:text-red-400">
                  {passwordError}
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {passwordSuccess && (
            <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in slide-in-from-top-2">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {passwordSuccess}
                </p>
              </div>
            </div>
          )}

          {/* Password Requirements Info */}
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              Password Requirements:
            </p>
            <ul className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
              <li>• At least 8 characters long</li>
              <li>• At least one uppercase letter (A-Z)</li>
              <li>• At least one number (0-9)</li>
              <li>• At least one special character (!@#$%^&*)</li>
            </ul>
          </div>

          {/* Change Password Button */}
          <button
            onClick={handleChangePassword}
            disabled={
              !passwordForm.currentPassword ||
              !passwordForm.newPassword ||
              !passwordForm.confirmPassword
            }
            className={`w-full sm:w-auto px-6 py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium ${
              passwordForm.currentPassword &&
              passwordForm.newPassword &&
              passwordForm.confirmPassword
                ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer shadow-sm"
                : "bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed"
            }`}
          >
            <Lock className="h-4 w-4" />
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};
