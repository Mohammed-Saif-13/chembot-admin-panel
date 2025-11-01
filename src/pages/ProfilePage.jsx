/**
 * ProfilePage Component
 * View-only profile page - Display info and stats
 * Edit functionality is in Settings page
 */

import React from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Package,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// ==================== MAIN COMPONENT ====================
const ProfilePage = () => {
  const navigate = useNavigate();

  // Profile data (get from settings localStorage)
  const getProfileData = () => {
    const stored = localStorage.getItem("chembot_settings");
    if (stored) {
      try {
        const settings = JSON.parse(stored);
        return settings.profile;
      } catch {
        return {
          name: "Admin User",
          email: "admin@chembots.com",
          phone: "+91 98765 43210",
          role: "Administrator",
          profilePhoto: null,
        };
      }
    }
    return {
      name: "Admin User",
      email: "admin@chembots.com",
      phone: "+91 98765 43210",
      role: "Administrator",
      profilePhoto: null,
    };
  };

  const profileData = getProfileData();

  // Account stats (dummy - can be calculated)
  const accountStats = {
    totalOrders: 156,
    productsAdded: 47,
    customersManaged: 85,
    lastLogin: new Date().toISOString(),
    memberSince: "2024-06-15",
  };

  /**
   * Format date
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  /**
   * Format date and time
   */
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // ========== RENDER ==========
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-display">
            My Profile
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View your account information and activity
          </p>
        </div>
        {/* Edit in Settings Button */}
        <button
          onClick={() => navigate("/admin/settings")}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-2 transition-colors font-medium"
        >
          <Settings className="h-4 w-4" />
          Edit in Settings
        </button>
      </div>

      {/* Profile Header Card */}
      <Card className="rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 border-indigo-200 dark:border-indigo-900">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Profile Photo */}
            <div className="relative">
              {profileData.profilePhoto ? (
                <img
                  src={profileData.profilePhoto}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-slate-700"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  {profileData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-50 font-display">
                {profileData.name}
              </h2>
              <p className="text-lg text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                {profileData.role}
              </p>
              <div className="flex flex-col md:flex-row items-center gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profileData.email}
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  {profileData.phone}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Orders */}
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Orders Managed
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {accountStats.totalOrders}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Total orders processed
            </p>
          </CardContent>
        </Card>

        {/* Products Added */}
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Products Added
            </CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {accountStats.productsAdded}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Total products created
            </p>
          </CardContent>
        </Card>

        {/* Customers Managed */}
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Customers
            </CardTitle>
            <User className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {accountStats.customersManaged}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Active customers
            </p>
          </CardContent>
        </Card>

        {/* Member Since */}
        <Card className="rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Member Since
            </CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {new Date(accountStats.memberSince).toLocaleDateString("en-IN", {
                month: "short",
                year: "numeric",
              })}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {formatDate(accountStats.memberSince)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Account Information Card */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-indigo-600" />
            Account Information
          </CardTitle>
          <CardDescription>Your personal details (Read-only)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Full Name
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {profileData.name}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Role
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {profileData.role}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Email Address
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {profileData.email}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Phone Number
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {profileData.phone}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Last Login
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {formatDateTime(accountStats.lastLogin)}
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                Account Created
              </p>
              <p className="font-semibold text-slate-900 dark:text-slate-50">
                {formatDate(accountStats.memberSince)}
              </p>
            </div>
          </div>

          {/* Edit Reminder */}
          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
            <p className="text-sm text-indigo-700 dark:text-indigo-300">
              💡 To edit your profile information, upload photo, or change
              password, go to
              <button
                onClick={() => navigate("/admin/settings")}
                className="font-semibold underline ml-1 hover:text-indigo-900 dark:hover:text-indigo-100"
              >
                Settings → Profile & Security
              </button>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Card (Optional - Placeholder) */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            Recent Activity
          </CardTitle>
          <CardDescription>Your latest actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                action: "Added new product",
                item: "Nitric Acid",
                time: "2 hours ago",
              },
              {
                action: "Updated order status",
                item: "ORD-005",
                time: "5 hours ago",
              },
              {
                action: "Created customer",
                item: "Rajesh Kumar",
                time: "1 day ago",
              },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    {activity.action}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {activity.item}
                  </p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
