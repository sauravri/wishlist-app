"use client";
import { useState, useEffect } from "react";
import WishlistCard from "@/components/WishlistCard";
import SectionDashboard from "@/components/SectionDashboard";

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

export default function WishlistPage() {
  const [sections, setSections] = useState<WishlistSection[]>([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemBrand, setNewItemBrand] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [selectedSection, setSelectedSection] = useState<WishlistSection | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("wishlistSections");
      if (savedSections) setSections(JSON.parse(savedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlistSections", JSON.stringify(sections));
  }, [sections]);

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

  const addNewItem = () => {
    if (!newItemName || !newItemBrand || !newItemImage || selectedSectionId === null) return;

    const newItem: WishlistItem = {
      id: Date.now(),
      name: newItemName,
      brand: newItemBrand,
      image: newItemImage,
    };

    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === selectedSectionId
          ? { ...section, items: [...section.items, newItem] }
          : section
      )
    );

    setNewItemName("");
    setNewItemBrand("");
    setNewItemImage("");
    setSelectedSectionId(null);
  };

  const removeItem = (sectionId: number, itemId: number) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, items: section.items.filter((item) => item.id !== itemId) }
          : section
      )
    );
  };

  const removeSection = (sectionId: number) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Section Name (e.g., Nike Wishlist)"
          value={newSectionName}
          onChange={(e) => setNewSectionName(e.target.value)}
          className="p-2 border rounded"
        />
        <button onClick={addNewSection} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          Add Section
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Product Name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Brand Name"
          value={newItemBrand}
          onChange={(e) => setNewItemBrand(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItemImage}
          onChange={(e) => setNewItemImage(e.target.value)}
          className="p-2 border rounded"
        />

        <select
          value={selectedSectionId ?? ""}
          onChange={(e) => setSelectedSectionId(Number(e.target.value))}
          className="p-2 border rounded"
        >
          <option value="">Select Section</option>
          {sections.length > 0 ? (
            sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.name}
              </option>
            ))
          ) : (
            <option disabled>Loading...</option>
          )}
        </select>

        <button onClick={addNewItem} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Add to Wishlist
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="cursor-pointer p-4 border rounded-lg shadow-md hover:bg-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.name}</h2>
          <button onClick={() => removeSection(section.id)} className="mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            X
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <WishlistCard key={item.id} item={item} onRemove={() => removeItem(section.id, item.id)} onEdit={() => {}} />
            ))}
          </div>
        </div>
      ))}
      {selectedSection && <SectionDashboard section={selectedSection} onClose={() => setSelectedSection(null)} onRemoveItem={removeItem} />}
    </div>
  );
}
