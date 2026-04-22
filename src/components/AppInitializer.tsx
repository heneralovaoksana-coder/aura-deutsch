"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { getTelegramUser } from "@/lib/telegram";

export default function AppInitializer() {
  const initUser = useAppStore((state) => state.initUser);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const checkUser = setInterval(() => {
      if (typeof window !== "undefined" && window.Telegram?.WebApp) {
        const tgUser = getTelegramUser();
        
        if (tgUser?.id) {
          initUser(tgUser).then(() => setInitialized(true));
          clearInterval(checkUser);
          clearTimeout(timeoutId);
        }
      }
    }, 100);

    // Timeout after 3 seconds for local testing (fallback)
    timeoutId = setTimeout(() => {
      clearInterval(checkUser);
      // Only set fallback if we still haven't found a telegramId in the store
      const currentTgId = useAppStore.getState().telegramId;
      if (!currentTgId) {
        initUser({ id: 123456789, first_name: "Local", last_name: "Tester" }).then(() => setInitialized(true));
      }
    }, 3000);

    return () => {
      clearInterval(checkUser);
      clearTimeout(timeoutId);
    };
  }, [initUser]);

  return null;
}
