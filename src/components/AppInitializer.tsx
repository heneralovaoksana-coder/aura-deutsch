"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { getTelegramUser } from "@/lib/telegram";

export default function AppInitializer() {
  const initUser = useAppStore((state) => state.initUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    
    // Attempt to get user. If SDK is loading async, we might need a slight delay
    const checkUser = setInterval(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tgUser = getTelegramUser();
        
        // If testing in normal browser, fake a user to avoid breaking the app
        const fallbackUser = tgUser || { id: 123456789, first_name: "Local", last_name: "Tester" };
        
        initUser(fallbackUser).then(() => {
          setInitialized(true);
        });
        clearInterval(checkUser);
      }
    }, 100);

    // Timeout after 3 seconds to avoid infinite loop
    setTimeout(() => {
      clearInterval(checkUser);
      if (!initialized) {
        initUser({ id: 123456789, first_name: "Local", last_name: "Tester" });
        setInitialized(true);
      }
    }, 3000);

    return () => clearInterval(checkUser);
  }, [initUser, initialized]);

  return null;
}
