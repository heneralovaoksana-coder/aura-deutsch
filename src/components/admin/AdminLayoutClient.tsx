"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminLoginScreen, { useAdminAuth } from "@/components/admin/AdminLogin";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthed, isChecking, login } = useAdminAuth();

  // Show nothing while checking session
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#060810] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-rose-500/30 border-t-rose-500 rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — show login screen
  if (!isAuthed) {
    return <AdminLoginScreen onLogin={login} />;
  }

  // Logged in — show admin panel
  return (
    <div className="min-h-screen bg-[#060810]">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">{children}</main>
    </div>
  );
}
