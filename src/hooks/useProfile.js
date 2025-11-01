import { useState, useEffect } from "react";

const SETTINGS_KEY = "chembot_settings";

export const useProfile = () => {
  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@chembots.com",
    profilePhoto: null,
  });

  const [updateTrigger, setUpdateTrigger] = useState(0); // ✅ Force update state

  useEffect(() => {
    const loadProfile = () => {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        try {
          const settings = JSON.parse(stored);
          if (settings.profile) {
            setProfile({
              name: settings.profile.name || "Admin",
              email: settings.profile.email || "admin@chembots.com",
              profilePhoto: settings.profile.profilePhoto || null,
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      }
    };

    loadProfile();
  }, [updateTrigger]); // ✅ Reload when trigger changes

  useEffect(() => {
    const handleUpdate = () => {
      setUpdateTrigger((prev) => prev + 1); // ✅ Force reload
    };

    window.addEventListener("profileUpdated", handleUpdate);

    return () => {
      window.removeEventListener("profileUpdated", handleUpdate);
    };
  }, []);

  return profile;
};
