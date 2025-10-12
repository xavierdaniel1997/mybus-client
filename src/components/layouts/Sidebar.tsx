"use client";

import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaGauge, FaBus, FaTicket, FaUsers} from "react-icons/fa6";
import {IoLogOut, IoSettingsSharp} from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import mybuslogo from "../../../public/mybuslogo.png";
import { handleApiError } from "@/lib/utils/handleApiError";
import { api } from "@/lib/api";
import { useAuthStore } from "@/app/(store)/useAuthStore";

export default function SideBar() {
  const pathname = usePathname();
  const {clearAuth} = useAuthStore()

  const menuItems = [
    {name: "Dashboard", path: "/admin", icon: <FaGauge />},
    {name: "Buses", path: "/admin/buses", icon: <FaBus />},
    {name: "Bookings", path: "/admin/bookings", icon: <FaTicket />},
    {name: "Offers", path: "/admin/offers", icon: <BiSolidOffer/> },
    {name: "Users", path: "/admin/users", icon: <FaUsers />},
  ];

  const otherMenuItems = [
    {name: "Settings", path: "admin/settings", icon: <IoSettingsSharp/>},
    // {name: "Logout", path: "", icon: <FaBus />},
  ];

  const handleLogout = async () => {
      try{
        const response = await api.post("/auth/logout-user")
        if(response.status === 200){
          clearAuth()
        }
      }catch(error){
        handleApiError(error)
      }
    }

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
        <p className="py-2 text-gray-400 font-semibold">GENERAL</p>
        <ul className="space-y-0.5 px-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 px-6 py-2 rounded-md transition-colors duration-200 ${
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
        <p className="py-2 text-gray-400 font-semibold">OTHERS</p>
        <ul className="space-y-0.5">
          {otherMenuItems.map((item) => {
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
          <button className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 cursor-pointer w-full"
          onClick={handleLogout}>
            <span className="text-lg">
              <IoLogOut />
            </span>
            <li className="">Logout</li>
          </button>
        </ul>
      </nav>
    </aside>
  );
}
