"use client";

import { useRouter } from "next/navigation";

export default function Homepage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
      {/* Hero Section */}
      <div className="text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Your Fashion Wishlist, Elevated
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Organize, track, and save your favorite fashion picks in one place.
        </p>
        
        {/* Get Started Button */}
        <button
          onClick={() => router.push("/wishlist")}
          className="mt-6 px-6 py-3 bg-white text-purple-600 font-semibold rounded-full text-lg shadow-md hover:bg-gray-100 transition-all"
        >
          Get Started
        </button>
      </div>
    </main>
  );
}
