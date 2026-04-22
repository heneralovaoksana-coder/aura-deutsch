import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin — Aura Deutsch",
  description: "Admin control panel for Aura Deutsch platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060810]">
      <AdminSidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
