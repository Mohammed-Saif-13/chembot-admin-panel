import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  FlaskConical,
  Users,
  LineChart,
  Settings,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
    section: "Core Management",
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
    section: "Core Management",
  },
  {
    name: "Products (Sheets)",
    path: "/admin/products",
    icon: FlaskConical,
    section: "Core Management",
  },
  {
    name: "Customers",
    path: "/admin/customers",
    icon: Users,
    section: "Core Management",
  },
  {
    name: "Chat Logs",
    path: "/admin/chatlogs",
    icon: MessageSquare,
    section: "Core Management",
  },
  {
    name: "Reports & History",
    path: "/admin/reports",
    icon: LineChart,
    section: "Reporting & Tools",
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
    section: "Reporting & Tools",
  },
];

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const { pathname } = useLocation();
  let currentSection = "";

  return (
    <div
      className={cn(
        "flex lg:flex flex-col fixed h-full bg-slate-900 border-r border-slate-700 shadow-xl z-20 transition-all duration-200 ease-out transform-gpu",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo/Header Area */}
      <div className="flex items-center justify-center h-16 border-b border-slate-700 shrink-0">
        {!isCollapsed ? (
          <h1 className="text-xl font-bold text-slate-100">
            <FlaskConical className="inline w-5 h-5 mr-2 text-indigo-500" />
            ChemBot Admin
          </h1>
        ) : (
          <FlaskConical className="w-6 h-6 text-indigo-500" />
        )}
      </div>

      {/* Navigation Area - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.path === "/admin/dashboard"
              ? pathname === "/admin/dashboard" || pathname === "/admin" || pathname === "/admin/"
              : pathname.startsWith(item.path);

          const renderSectionHeader = item.section !== currentSection;
          if (renderSectionHeader) {
            currentSection = item.section;
          }

          return (
            <div key={item.path}>
              {/* Section Header */}
              {renderSectionHeader && !isCollapsed && (
                <h6 className="px-3 pt-4 pb-1 text-xs font-semibold text-slate-400 uppercase tracking-wider select-none">
                  {item.section}
                </h6>
              )}

              {/* Navigation Button */}
              <Button
                asChild
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full h-10 justify-start text-sm transition-colors rounded-lg",
                  isCollapsed ? "px-0 justify-center" : "px-3",
                  isActive
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                    : "text-slate-200 hover:bg-slate-800 hover:text-white"
                )}
                title={isCollapsed ? item.name : ""}
              >
                <Link
                  to={item.path}
                  className={cn(
                    "w-full h-full flex items-center",
                    isCollapsed ? "justify-center" : ""
                  )}
                >
                  <item.icon
                    className={cn("w-4 h-4 shrink-0", !isCollapsed && "mr-3")}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </Link>
              </Button>
            </div>
          );
        })}
      </nav>

      {/* Footer / Profile Link */}
      <div className="p-4 border-t border-slate-800 shrink-0 space-y-2">
        <Button
          asChild
          variant={pathname.startsWith("/admin/profile") ? "default" : "ghost"}
          className={cn(
            "w-full h-10 justify-start text-sm transition-colors rounded-lg",
            isCollapsed ? "px-0 justify-center" : "px-3",
            pathname.startsWith("/admin/profile")
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
              : "text-slate-200 hover:bg-slate-800 hover:text-white"
          )}
          title={isCollapsed ? "Admin Profile" : ""}
        >
          <Link
            to="/admin/profile"
            className={cn(
              "w-full h-full flex items-center",
              isCollapsed ? "justify-center" : ""
            )}
          >
            <UserCircle
              className={cn("w-4 h-4 shrink-0", !isCollapsed && "mr-3")}
            />
            {!isCollapsed && <span className="truncate">Admin Profile</span>}
          </Link>
        </Button>

        {/* Collapse Toggle - Desktop Only */}
        <Button
          onClick={onToggleCollapse}
          variant="ghost"
          className={cn(
            "hidden lg:flex w-full h-10 text-sm text-slate-200 hover:bg-slate-800 hover:text-white rounded-lg transition-colors",
            isCollapsed ? "px-0 justify-center" : "px-3 justify-start"
          )}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-3" />
              <span>Collapse</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;