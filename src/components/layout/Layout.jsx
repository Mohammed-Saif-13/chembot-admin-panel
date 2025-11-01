import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { cn } from "@/lib/utils";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-40 transition-all duration-200 ease-out",
          isCollapsed ? "w-16" : "w-64",
          {
            "-translate-x-full lg:translate-x-0": !isSidebarOpen,
            "translate-x-0": isSidebarOpen,
          }
        )}
      >
        <Sidebar isCollapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Main Content Wrapper */}
      {/* Main Content Wrapper */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-200",
          isCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Header (Fixed) */}
        <Header onMenuClick={toggleSidebar} isCollapsed={isCollapsed} />

        {/* Content Area - Header ke neeche */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 mt-16">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;
