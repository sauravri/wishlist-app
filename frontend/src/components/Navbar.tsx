"use client";

import Link from "next/link"; //for client side navigation
import { usePathname } from "next/navigation";
import { Home, Heart, User } from "lucide-react";

// Define navigation items with their respective names, paths, and icons
const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Wishlist", href: "/wishlist", icon: Heart },
  { name: "Profile", href: "/profile", icon: User },
];

// Navbar component definition
export default function Navbar() {
  const pathname = usePathname(); // Get the current pathname for active link highlighting

  return (
    // Navbar container
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-2 flex justify-center md:justify-start md:px-10">
      <ul className="flex space-x-6">
        {/* Map through navigation items and render each as a list item */}
        {navItems.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link href={href}>
              <span
                // Highlight the active link based on the current pathname
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  pathname === href ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                {/* Render the icon and name for each navigation item */}
                <Icon size={20} />
                <span className="hidden md:inline">{name}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
