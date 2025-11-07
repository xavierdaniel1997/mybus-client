"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaBusAlt } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-10 pb-6 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FaBusAlt size={28} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">MyBus</h2>
          </div>
          <p className="text-sm leading-relaxed">
            MyBus helps you explore and book comfortable bus journeys
            across India. Reliable, affordable, and easy — travel the
            smarter way with MyBus.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><a href="/routes" className="hover:text-blue-400 transition">Routes</a></li>
            <li><a href="/offers" className="hover:text-blue-400 transition">Offers</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MdEmail className="text-blue-400" /> support@mybus.com
            </li>
            <li className="flex items-center gap-2">
              <MdPhone className="text-blue-400" /> +91 98765 43210
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-400 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MyBus. All rights reserved.
      </div>
    </footer>
  );
}
