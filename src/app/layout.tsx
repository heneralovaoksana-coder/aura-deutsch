import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/ui/BottomNav";
import ComingSoon from "@/components/ComingSoon";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Deutsch — Learn German",
  description: "Gamified German learning platform in Telegram. Earn ZBT rewards while mastering German.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <meta name="theme-color" content="#0C0F14" />
        {/* Telegram Web App SDK */}
        <script src="https://telegram.org/js/telegram-web-app.js" async />
      </head>
      <body className="font-inter antialiased bg-bg-deep text-text-primary min-h-screen">
        {/* <ComingSoon /> */}
        <div id="root" className="relative">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
