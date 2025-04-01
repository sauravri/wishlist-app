"use client";

import WishlistCard from "@/components/WishlistCard";
import { SectionDashboardProps } from "@/types/wishlist-interfaces";
import { useState, useEffect } from "react";
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

  // 🔄 Sync state when the section updates
  useEffect(() => {
    setNewName(section.name);
  }, [section.name]); // Listen for section name updates

  const handleRename = () => {
    if (!newName.trim()) return;

    onRenameSection(section.id, newName); // 🔥 Update Parent State
    setIsEditing(false); // Exit edit mode
  };
  
  const [currentSection, setCurrentSection] = useState(section);

  // 🔄 Update local state when `section` changes
  useEffect(() => {
    setCurrentSection(section);
  }, [section]);
   



  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg p-6 relative">
        {/* Header with Section name + Edit Button + Back Button */}
        <div className="flex justify-between items-center mb-6">
          {/* Section Name Edit Logic */}
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRename()} // Enter key renames
                onBlur={handleRename} // Blur confirms rename
                autoFocus
                className="text-2xl font-bold text-gray-800 border-b border-gray-400 outline-none"
              />
            ) : (
              <>
                <h2 className="text-4xl font-bold text-gray-800">{newName}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <FiEdit size={22} />
                </button>
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
          {currentSection.items.length > 0 ? (
            currentSection.items.map((item) => (
              <WishlistCard
                key={item.id}
                item={item}
                onRemove={() => onRemoveItem(currentSection.id, item.id)}
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
