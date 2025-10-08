import Link from "next/link";

export default function SideBar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Buses", path: "/admin/buses" },
    { name: "Bookings", path: "/admin/bookings" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <aside className="fixed top-12 left-0 h-[calc(100vh-3rem)] w-64 border-r shadow-sm p-6 bg-gray-100 text-gray-600">
      <h2 className="text-xl font-semibold mb-8">Admin Panel</h2>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
