"use client";
import { MdOutlineDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiGrid } from "react-icons/fi";

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

  // State variable for adding new item with link
  const [productLink, setProductLink] = useState("");

  // Layout Grid state variables
  const [layout, setLayout] = useState("grid-cols-3");
  const [showLayoutOptions, setShowLayoutOptions] = useState(false);

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
    setSections((prevSections) => {
      const updatedSections = prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
          : section
      );
  
      return [...updatedSections]; // 🔥 Force state change
    });
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
  
  const updatedSelectedSection = sections.find((s) => s.id === selectedSection?.id);


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

  //MARK: Return
  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Wishlist</h1>

      {/* Add Section */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter section name"
          style={{ fontStyle: "italic" }}
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
      <div className="mb-6 flex flex-col gap-2 bg-gray-50 p-4 rounded-lg shadow-md ">
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
          <option value="" style={{ fontStyle: "italic" }}>
            Select Section
          </option>
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

      {/* Layout Toggle Button */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <button
            onClick={() => setShowLayoutOptions(!showLayoutOptions)}
            className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full hover:bg-gray-400 transition"
          >
            <FiGrid size={16} />
          </button>

          {/* Dropdown for Layout Selection */}
          {showLayoutOptions && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2">
              <button
                onClick={() => setLayout("grid-cols-3")}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                3
              </button>
              <button
                onClick={() => setLayout("grid-cols-3")}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                4
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Sections Grid */}

      {/* Wishlist Sections */}
      <div className={`grid ${layout} gap-4 space-y-6`}>
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer relative group"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (!target.closest(".prevent-click"))
                setSelectedSection(section);
            }}
          >
            {/* Section Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{section.name}</h2>

              {/* Section Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSection(section.id);
                }}
                className="prevent-click bg-gray-400 text-xs text-white w-6 h-6 flex items-center justify-center rounded-full hover:bg-red-600 transition"
              >
                <MdOutlineDelete size={16} />
              </button>
            </div>

            {/* Product Images (Preview Only) */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {section.items.slice(0, 4).map((item) => (
                <Image
                  key={item.id}
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Section Modal */}
      {updatedSelectedSection  && (
        <SectionDashboard
          section={updatedSelectedSection }
          onClose={() => setSelectedSection(null)}
          onRemoveItem={removeItem}
          onEditItem={editItem}
          onRenameSection={renameSection}
        />
      )}
    </div>
  );
}
