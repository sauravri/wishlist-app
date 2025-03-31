"use client";

import WishlistCard from "@/components/WishlistCard";
import { SectionDashboardProps } from "@/types/wishlist-interfaces";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { FiEdit } from "react-icons/fi"; // Pencil Icon

export default function SectionDashboard({
  section,
  onClose,
  onRenameSection,
  onRemoveItem,
  onEditItem,
}: SectionDashboardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(section.name);

  const handleRename = () => {
    if (newName.trim()) {
      onRenameSection(section.id, newName.trim());
      setIsEditing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 relative">
        {/* Header with Section name + Edit Button + Back Button */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex justify-between items-center mb-6">
            {/* Logic for Section Name Edit */}
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename()} // pressing Enter key to confirm rename
                onBlur={handleRename}
                autoFocus
                className="text-2xl font-bold text-gray-800 border-b border-gray-400 outline-none"
              />
            ) : (
                /* If not editing then show this */
              <>
                <span className="flex items-center space-x-2">
                  {/* Section Name */}
                  <h2 className="text-2xl font-bold text-gray-800">
                    {section.name}
                  </h2>
                  
                  {/* Edit Button */}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    {/* ✏️ Pencil Icon */}
                    <FiEdit size={15} />
                  </button>
                </span>
              </>
            )}
          </div>

          {/* Back button */}
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
