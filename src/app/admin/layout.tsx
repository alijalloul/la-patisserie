import { AdminNav, AdminNavLink } from "./_components/AdminNav";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" flex-grow flex flex-col">
      <AdminNav>
        <AdminNavLink href="/admin">Dashboard</AdminNavLink>
        <AdminNavLink href="/admin/products">Products</AdminNavLink>
        <AdminNavLink href="/admin/users">Users</AdminNavLink>
        <AdminNavLink href="/admin/orders">Orders</AdminNavLink>
      </AdminNav>

      <div className="container my-6">{children}</div>
    </div>
  );
}
