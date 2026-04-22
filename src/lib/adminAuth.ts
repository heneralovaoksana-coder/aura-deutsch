// ─── Admin Panel Authentication ───────────────────────────────────
// Add your Telegram IDs here to grant admin access.
// You can find your Telegram ID by messaging @userinfobot on Telegram.

export const ADMIN_TELEGRAM_IDS: string[] = [
  // "123456789",  // ← Replace with YOUR real Telegram ID
];

// Secret URL segment for admin panel access
export const ADMIN_SECRET = "aura-control";

export function isAdmin(telegramId: string | null): boolean {
  if (!telegramId) return false;
  // If no admins configured yet, allow anyone (for initial setup)
  if (ADMIN_TELEGRAM_IDS.length === 0) return true;
  return ADMIN_TELEGRAM_IDS.includes(telegramId);
}
