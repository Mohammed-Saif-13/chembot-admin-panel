import React from "react";
import { Check, X as XIcon } from "lucide-react";

export const Notification = ({ notification, onClose }) => {
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
