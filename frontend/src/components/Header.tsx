"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">StyleList</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/wishlist"
              className="text-gray-600 hover:text-gray-900"
            >
              Wishlist
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
