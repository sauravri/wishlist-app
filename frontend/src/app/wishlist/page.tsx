"use client";

import WishlistCard from "@/components/WishlistCard";

export default function WishlistPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WishlistCard />
        <WishlistCard />
        <WishlistCard />
      </div>
    </div>
  );
}
