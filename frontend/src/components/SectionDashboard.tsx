"use client";
import { ArrowLeft } from "lucide-react";
import WishlistCard from "@/components/WishlistCard";
import { SectionDashboardProps } from "@/types/wishlist-interfaces";

export default function SectionDashboard({
  section,
  onClose,
  onRemoveItem,
  onEditItem,
}: SectionDashboardProps) {

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{section.name}</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
          >
            <ArrowLeft size={16} />
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {section.items.length > 0 ? (
            section.items.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={() => onRemoveItem(section.id, item.id)}
                onEdit={(updatedItem) => onEditItem(section.id, updatedItem)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No items in this section yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
