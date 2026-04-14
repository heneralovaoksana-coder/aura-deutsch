/**
 * Telegram Web App SDK helpers
 * Wraps Telegram WebApp API calls with safe fallbacks for browser dev
 */

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void;
    notificationOccurred: (type: "error" | "success" | "warning") => void;
    selectionChanged: () => void;
  };
  MainButton: {
    show: () => void;
    hide: () => void;
    setText: (text: string) => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
    isVisible: boolean;
  };
  BackButton: {
    show: () => void;
    hide: () => void;
    onClick: (fn: () => void) => void;
    offClick: (fn: () => void) => void;
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    button_color?: string;
  };
  colorScheme: "light" | "dark";
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name: string;
      last_name?: string;
      username?: string;
      photo_url?: string;
    };
  };
}

// ─── Safe accessor ────────────────────────────────────────────────
function getTWA(): TelegramWebApp | null {
  if (typeof window !== "undefined" && window.Telegram?.WebApp) {
    return window.Telegram.WebApp;
  }
  return null;
}

// ─── Initialize app ───────────────────────────────────────────────
export function initTWA(): void {
  const twa = getTWA();
  if (twa) {
    twa.ready();
    twa.expand(); // Full-screen mode
  }
}

// ─── Haptic feedback shortcuts ────────────────────────────────────
export const haptic = {
  /** Light tap — for button presses */
  tap: () => getTWA()?.HapticFeedback.impactOccurred("light"),
  /** Medium — for selections */
  select: () => getTWA()?.HapticFeedback.impactOccurred("medium"),
  /** Heavy — for achievements */
  heavy: () => getTWA()?.HapticFeedback.impactOccurred("heavy"),
  /** Success notification */
  success: () => getTWA()?.HapticFeedback.notificationOccurred("success"),
  /** Error notification */
  error: () => getTWA()?.HapticFeedback.notificationOccurred("error"),
  /** Selection changed */
  tick: () => getTWA()?.HapticFeedback.selectionChanged(),
};

// ─── User info from Telegram ──────────────────────────────────────
export function getTelegramUser() {
  const twa = getTWA();
  return twa?.initDataUnsafe?.user ?? null;
}

// ─── Main Button control ──────────────────────────────────────────
export function setMainButton(text: string, onClick: () => void): void {
  const twa = getTWA();
  if (!twa) return;
  twa.MainButton.setText(text);
  twa.MainButton.onClick(onClick);
  twa.MainButton.show();
}

export function hideMainButton(onClick?: () => void): void {
  const twa = getTWA();
  if (!twa) return;
  if (onClick) twa.MainButton.offClick(onClick);
  twa.MainButton.hide();
}
