import React, { useState } from "react";
import { Menu, Bell, Settings, LogOut, User, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "@/hooks/useTheme";
import { useProfile } from "@/hooks/useProfile";

const Header = ({ onMenuClick, isCollapsed }) => {
  const { theme, toggleTheme } = useTheme();
  const profile = useProfile();
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("rememberedEmail");
    navigate("/login");
  };

  // ✅ CORRECT - Conflict resolved
  const handleProfileClick = () => {
    navigate("/admin/profile");
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm z-30 transition-all duration-200 ease-out",
        "left-0",
        isCollapsed ? "lg:left-16" : "lg:left-64"
      )}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Left Section: Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-slate-800 dark:text-slate-200"
            onClick={onMenuClick}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Right Section: Theme Toggle, Notifications, User Dropdown */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Theme Toggle Button with Tooltip */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-800 dark:text-slate-200 rounded-full relative"
              onClick={toggleTheme}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Tooltip */}
            {showTooltip && (
              <div className="absolute top-full mt-2 right-0 px-2 py-1 bg-slate-900 dark:bg-slate-700 text-white text-xs rounded whitespace-nowrap z-50">
                Switch to {theme === "light" ? "Dark" : "Light"} Mode
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-800 dark:text-slate-200 rounded-full"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* User Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0"
              >
                <Avatar className="h-9 w-9 border-2 border-indigo-500/50">
                  {profile.profilePhoto && (
                    <AvatarImage
                      src={profile.profilePhoto}
                      alt={profile.name}
                    />
                  )}
                  <AvatarFallback className="bg-indigo-600 text-white dark:bg-indigo-500 text-sm font-semibold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 dark:bg-slate-800 dark:border-slate-700"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none dark:text-slate-50">
                    {profile.name}
                  </p>
                  <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                    {profile.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                className="cursor-pointer dark:hover:bg-slate-700 dark:text-slate-50"
                onClick={handleProfileClick}
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer dark:hover:bg-slate-700 dark:text-slate-50"
                onClick={handleSettingsClick}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="dark:bg-slate-700" />
              <DropdownMenuItem
                className="cursor-pointer dark:hover:bg-slate-700 dark:text-slate-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;