"use client";

import { useState, useEffect } from "react";
import SectionDashboard from "@/components/SectionDashboard";
import { Plus, FolderOpen } from "lucide-react";

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

export default function Dashboard() {
  const [sections, setSections] = useState<WishlistSection[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [selectedSection, setSelectedSection] =
    useState<WishlistSection | null>(null);

  // Load sections from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("wishlistSections");
      if (savedSections) setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save sections to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("wishlistSections", JSON.stringify(sections));
  }, [sections]);

  // Add a new section
  const addNewSection = () => {
    if (!newSectionName.trim()) return;

    const newSection: WishlistSection = {
      id: Date.now(),
      name: newSectionName,
      items: [],
    };

    setSections([...sections, newSection]);
    setNewSectionName("");
  };

  // Remove a section by ID
  const removeSection = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId)
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        My Wishlist
      </h1>

      {/* Add Section Input */}
      <div className="flex items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter new section name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          className="p-2 border rounded w-full dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={addNewSection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-2"
        >
          <Plus size={16} /> Add Section
        </button>
      </div>

      {/* Wishlist Sections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="p-4 border rounded-lg shadow-md bg-white dark:bg-gray-900 dark:text-white transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setSelectedSection(section)}
          >
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{section.name}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSection(section.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                X
              </button>
            </div>
            {/* Section Details */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {section.items.length} items
            </p>
            <FolderOpen size={40} className="mt-4 text-blue-400" />
          </div>
        ))}
      </div>

      {/* Section Dashboard Overlay */}
      {selectedSection && (
        <SectionDashboard
          section={selectedSection}
          onClose={() => setSelectedSection(null)}
          onRemoveItem={() => {}}
          onEditItem={() => {}}
        />
      )}
    </div>
  );
}
