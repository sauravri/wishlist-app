"use client";
import { ArrowLeft } from "lucide-react";
import WishlistCard from "@/components/WishlistCard";

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  image: string;
}

interface WishlistSection {
  id: number;
  name: string;
  items: WishlistItem[];
}

interface SectionDashboardProps {
  section: WishlistSection;
  onClose: () => void;
  onRemoveItem: (sectionId: number, itemId: number) => void;
}

export default function SectionDashboard({
  section,
  onClose,
  onRemoveItem,
}: SectionDashboardProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 h-3/4 relative">
        {/* Back button */}
        <button
          className="absolute top-4 left-4 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
          onClick={onClose}
        >
            <ArrowLeft size={24}/> 
        </button>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {section.name}
        </h2>

        {/* Product Title */}
        <div className="grid grid-cols- md:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onRemove={() => onRemoveItem(section.id, item.id)}
              onEdit={() => {}} // ✅ Remove item
            />
          ))}
        </div>
      </div>
    </div>
  );
}
