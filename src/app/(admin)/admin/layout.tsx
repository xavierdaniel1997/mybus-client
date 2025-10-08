// src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      {/* <aside style={{ width: "250px", background: "#333", color: "#fff", padding: "1rem" }}>
        <h2 style={{ marginBottom: "2rem" }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem" }}>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link href="/admin/buses">Buses</Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link href="/admin/bookings">Bookings</Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main content */}
      {/* <main style={{ flex: 1, padding: "2rem" }}>
        {children}
      </main> */}
    </div>
  );
}
