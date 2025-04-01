"use client";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Image from "next/image";
import SectionDashboard from "@/components/SectionDashboard";

// import WishlistCard from "@/components/WishlistCard";

import { WishlistItem, WishlistSection } from "@/types/wishlist-interfaces";

export default function WishlistPage() {
  // State variables for wishlist management
  const [sections, setSections] = useState<WishlistSection[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [selectedSection, setSelectedSection] =
    useState<WishlistSection | null>(null);
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(
    null
  );
  const [productLink, setProductLink] = useState("");

  // Load wishlist sections from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("wishlistSections");
      if (savedSections) setSections(JSON.parse(savedSections));
    }
  }, []);

  // Save wishlist sections to localStorage
  useEffect(() => {
    localStorage.setItem("wishlistSections", JSON.stringify(sections));
  }, [sections]);

  // Add new section
  const addNewSection = () => {
    if (!newSectionName) return;
    const newSection: WishlistSection = {
      id: Date.now(),
      name: newSectionName,
      items: [],
    };
    setSections([...sections, newSection]);
    setNewSectionName("");
  };

  // Remove item from section
  const removeItem = (sectionId: number, itemId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.filter((item) => item.id !== itemId),
            }
          : section
      )
    );
  };

  // Remove section
  const removeSection = (sectionId: number) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId)
    );
  };

  // Edit an item in a section
  const editItem = (sectionId: number, updatedItem: WishlistItem) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
              ),
            }
          : section
      )
    );
  };
  // Rename Section
  const renameSection = (sectionId: number, newName: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, name: newName } : section
      )
    );
  };

  // MARK: Backend
  // Connecting the Frontend to Fetch Product Data (route.ts)
  const handleScrapeAndAdd = async () => {
    if (!productLink || selectedSectionId === null) return;

    try {
      const response = await fetch(
        `/api/scrape?url=${encodeURIComponent(productLink)}`
      );
      const data = await response.json();

      if (!data.productName || !data.productImage) {
        alert("Could not fetch product details.");
        return;
      }

      const newItem: WishlistItem = {
        id: Date.now(),
        name: data.productName,
        brand: data.productBrand || "Unknown",
        image: data.productImage,
        price: data.prodcutPrice,
      };

      setSections((prevSections) =>
        prevSections.map((section) =>
          section.id === selectedSectionId
            ? { ...section, items: [...section.items, newItem] }
            : section
        )
      );

      setProductLink(""); // Clear input field
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h1>

      {/* Add Section */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter section name"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={addNewSection}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          Add Section
        </button>
      </div>

      {/* Add Item Form */}
      <div className="mb-6 flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Add New Item</h2>

        <input
          type="text"
          placeholder="Product Link"
          style={{ fontStyle: "italic" }}
          value={productLink}
          onChange={(e) => setProductLink(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={selectedSectionId ?? ""}
          onChange={(e) => setSelectedSectionId(Number(e.target.value))}
          className="p-2 border rounded"
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleScrapeAndAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add to Wishlist
        </button>
      </div>

      {/* Wishlist Sections */}
      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 transition"
            onClick={() => setSelectedSection(section)} // 🔥 SectionDashboard onClick Handler
          >
            <div className="flex justify-between">
              <h2
                className="text-xl font-semibold mb-2"
                onClick={(e) => e.stopPropagation()} /* Stop propagation for section name. Fix: Prevent section onClick Event from Triggering on Child Elements

                The issue happens because clicking anywhere inside the <div> fires onClick, including on images and the delete button.
                
                ✅ Solution:
                Use onClick on a wrapper div and stop clicks from propagating from the child elements using e.stopPropagation(). */
              >
                {section.name}
              </h2>

              {/* Section delete button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🛑 Prevents the click from reaching the parent
                  removeSection(section.id);
                }}
                className="bg-gray-400 text-xs text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 transition "
              >
                <MdOutlineDelete size={20} />
              </button>
            </div>

            {/* Display product images only */}
            <div className="grid grid-cols-3 gap-2 items-center">
              {section.items.slice(0, 4).map((item) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  width={150}
                  height={150}
                  className="w-full h-48 object-cover rounded-md"
                  onClick={(e) => e.stopPropagation()} // 🛑 Prevents opening modal when clicking an image
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section Modal */}
      {selectedSection && (
        <SectionDashboard
          section={selectedSection}
          onClose={() => setSelectedSection(null)}
          onRemoveItem={removeItem}
          onEditItem={editItem}
          onRenameSection={renameSection}
        />
      )}
    </div>
  );
}
