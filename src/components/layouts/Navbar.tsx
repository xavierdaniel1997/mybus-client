"use client";

import Image from "next/image";
import {useState} from "react";
import {
  FaBars,
  FaTimes,
  FaTicketAlt,
  FaHeadset,
  FaUser,
  FaAngleDown,
  FaBusAlt,
} from "react-icons/fa";
import mybuslogo from "../../../public/mybuslogo.png";
import Link from "next/link";
import AuthDialog from "../common/AuthDialog";
import {useAuthStore} from "@/app/(store)/useAuthStore";
import {IoLogOut} from "react-icons/io5";
import { handleApiError } from "@/lib/utils/handleApiError";
import { api } from "@/lib/api";
import { useAuthDialogStore } from "@/app/(store)/useAuthDialogStore";

interface NavbarProps {
  isAdmin?: boolean;
}

export default function Navbar({isAdmin = false}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropDown, setOpenDropDown] = useState(false)

  const {user, clearAuth} = useAuthStore();
  const { open, openDialog, closeDialog } = useAuthDialogStore();


  const handleToggleDropDown = () => {
    setOpenDropDown(!openDropDown)
  }

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
    <nav
      className={`bg-gray-100 shadow-md sticky top-0 z-50 ${
        isAdmin ? "py-2" : "py-3"
      }`}
    >
      <div className={`max-w-7xl mx-auto px-6 lg:px-8`}>
        
        {/* Navbar Container */}
        <div className={`flex justify-between items-center h-16`}>
          {/* Logo Section */}
          <Link href="/">
          {/* <Image
            src={mybuslogo}
            alt="MyBusGo Logo"
            width={0}
            height={0}
            priority
             className="w-14 h-14 md:w-20 md:h-20 object-cover object-center"
          /> */}
          <div className="flex items-center gap-2 mb-3">
                      <FaBusAlt size={28} className="text-blue-500" />
                      <h2 className="text-xl font-bold text-gray-700">MyBus</h2>
                    </div>
</Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdmin && (
              <>
                <Link
                  href="/booking"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  <FaTicketAlt className="mr-1" />
                  My Bookings
                </Link>
                <Link
                  href="#"
                  className="flex items-center text-gray-700 hover:text-blue-600 transition"
                >
                  <FaHeadset className="mr-1" />
                  Help
                </Link>
              </>
            )}
            {user ? (
              <div>
                <div className="flex items-center text-gray-700 gap-1">
                  <button className="cursor-pointer" onClick={handleToggleDropDown}>Hi, {user?.firstName}</button>
                  <FaAngleDown />
                </div>
                {openDropDown && <div className="absolute top-20  text-gray-700 bg-gray-100 py-2 px-4">
                  <ul>
                    <button className="flex items-center gap-3 p-2 cursor-pointer"
                    onClick={handleLogout}
                    >
                      <span className="text-lg">
                        <IoLogOut />
                      </span>
                      <li className="">Logout</li>
                    </button>
                    <button className="flex items-center gap-3 p-2">
                      <span className="text-lg">
                        <FaUser />
                      </span>
                      <li className="">Profile</li>
                    </button>
                  </ul>
                </div>}
              </div>
            ) : (
              <button
                className="cursor-pointer flex items-center text-gray-700 hover:text-blue-600 transition"
                // onClick={() => setIsDialogOpen(true)}
                onClick={() => openDialog()}
              >
                <FaUser className="mr-2" />
                Login/Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {/* {!isAdmin && mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4 animate-fade-in">
            <Link
              href="/booking"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaTicketAlt className="mr-2" /> My Bookings
            </Link>
            <Link
              href="#"
              className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
            >
              <FaHeadset className="mr-2" /> Help
            </Link>
            <button
              className="cursor-pointer flex items-center text-gray-700 hover:text-blue-600 transition"
              onClick={() => openDialog()}
            >
              <FaUser className="mr-2" /> Sign In
            </button>
          </div>
        )} */}

        {/* Mobile Menu */}
{!isAdmin && mobileMenuOpen && (
  <div className="md:hidden mt-2 space-y-2 pb-4">
    {user ? (
      <>
        <Link
          href="/booking"
          className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
        >
          <FaBusAlt className="mr-2" /> My Bookings
        </Link>

        <Link
          href="/profile"
          className="flex items-center text-gray-700 hover:text-blue-600 transition px-2 py-2"
        >
          <FaUser className="mr-2" /> Profile
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center text-left text-gray-700 hover:text-red-600 transition px-2 py-2"
        >
          <IoLogOut className="mr-2 text-lg" /> Logout
        </button>
      </>
    ) : (
      <>
        <button
          onClick={openDialog}
          className="w-full flex items-center text-left text-gray-700 hover:text-blue-600 transition px-2 py-2"
        >
          <FaUser className="mr-2" /> Sign In / Login
        </button>
      </>
    )}
  </div>
)}

      </div>
      {/* <AuthDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} /> */}
      <AuthDialog open={open} onOpenChange={(v) => (v ? openDialog() : closeDialog())} />
    </nav>
  );
}
