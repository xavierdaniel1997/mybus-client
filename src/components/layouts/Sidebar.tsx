"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaGauge, FaBus, FaTicket, FaUsers} from "react-icons/fa6";
import mybuslogo from "../../../public/mybuslogo.png";

export default function SideBar() {
  const pathname = usePathname();

  const menuItems = [
    {name: "Dashboard", path: "/admin", icon: <FaGauge />},
    {name: "Buses", path: "/admin/buses", icon: <FaBus />},
    {name: "Bookings", path: "/admin/bookings", icon: <FaTicket />},
    {name: "Users", path: "/admin/users", icon: <FaUsers />},
  ];

  return (
    <aside className="fixed left-0 h-screen w-60 border-r bg-gray-100 text-gray-600 p-2">
      <div className="flex justify-center p-3">
        <Image
          src={mybuslogo}
          alt="MyBusGo Logo"
          width={70}
          height={70}
          priority
          className="object-cover object-center"
        />
      </div>
      <nav>
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-6 py-3 rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
