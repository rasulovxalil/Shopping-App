import AdminLayout from "@/AdminPanel/layout/AdminLayout";

export default function AdminRouteLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
