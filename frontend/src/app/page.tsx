"use client"; // This directive tells Next.js that this file is a client component, meaning it will run in the browser. It's required when using React hooks or browser-specific APIs.

import { useState, useEffect } from "react"; // Importing React hooks for managing state and side effects.
import WishlistCard from "@/components/WishlistCard"; // Importing a custom component to display individual wishlist items.

interface WishlistItem {
  id: number; // Unique identifier for the item.
  name: string; // Name of the item.
  brand: string; // Brand of the item.
  image: string; // URL of the item's image.
}

interface WishlistSection {
  id: number; // Unique identifier for the section.
  name: string; // Name of the section.
  items: WishlistItem[]; // Array of items in this section.
}

export default function WishlistPage() {
  // ✅ State for Wishlist Sections
  const [sections, setSections] = useState<WishlistSection[]>(() => {
    // Initialize state with data from localStorage if available, otherwise start with an empty array.
    if (typeof window !== "undefined") {
      const savedSections = localStorage.getItem("wishlistSections");
      return savedSections ? JSON.parse(savedSections) : [];
    }
    return [];
  });

  // State variables for managing form inputs and selected section.
  const [newSectionName, setNewSectionName] = useState(""); // Input for new section name.
  const [selectedSection, setSelectedSection] = useState<number | null>(null); // Selected section ID for adding items.
  const [newItemName, setNewItemName] = useState(""); // Input for new item name.
  const [newItemBrand, setNewItemBrand] = useState(""); // Input for new item brand.
  const [newItemImage, setNewItemImage] = useState(""); // Input for new item image URL.

  // ✅ Save Sections to Local Storage
  useEffect(() => {
    // Whenever the sections state changes, save it to localStorage.
    localStorage.setItem("wishlistSections", JSON.stringify(sections));
  }, [sections]);

  // ✅ Function to Add a New Section
  const addNewSection = () => {
    if (!newSectionName) return; // Do nothing if the input is empty.

    const newSection: WishlistSection = {
      id: sections.length + 1, // Generate a new ID based on the current number of sections.
      name: newSectionName, // Use the input value as the section name.
      items: [], // Start with an empty list of items.
    };

    setSections([...sections, newSection]); // Add the new section to the state.
    setNewSectionName(""); // Clear the input field.
  };

  // ✅ Function to Add New Item to a Specific Section
  const addNewItem = () => {
    // Ensure all inputs are filled and a section is selected.
    if (
      !newItemName ||
      !newItemBrand ||
      !newItemImage ||
      selectedSection === null
    )
      return;

    const newItem: WishlistItem = {
      id: Date.now(), // Use the current timestamp as a unique ID.
      name: newItemName, // Use the input value as the item name.
      brand: newItemBrand, // Use the input value as the item brand.
      image: newItemImage, // Use the input value as the item image URL.
    };

    // Update the sections state by adding the new item to the selected section.
    setSections((prevSections) =>
      prevSections.map(
        (section) =>
          section.id === selectedSection
            ? { ...section, items: [...section.items, newItem] } // Add the new item to the section's items array.
            : section // Leave other sections unchanged.
      )
    );

    // Reset input fields and selected section.
    setNewItemName("");
    setNewItemBrand("");
    setNewItemImage("");
    setSelectedSection(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist</h1>

      {/* ✅ Form to Add New Sections */}
      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Section Name (e.g., Nike Wishlist)" // Placeholder text for the input field.
          value={newSectionName} // Bind the input value to the state.
          onChange={(e) => setNewSectionName(e.target.value)} // Update the state when the input changes.
          className="p-2 border rounded" // Styling for the input field.
        />
        <button
          onClick={addNewSection} // Call the function to add a new section when clicked.
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600" // Styling for the button.
        >
          Add Section
        </button>
      </div>

      {/* ✅ Form to Add Items to a Specific Section */}
      <div className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Product Name" // Placeholder text for the input field.
          value={newItemName} // Bind the input value to the state.
          onChange={(e) => setNewItemName(e.target.value)} // Update the state when the input changes.
          className="p-2 border rounded" // Styling for the input field.
        />
        <input
          type="text"
          placeholder="Brand Name" // Placeholder text for the input field.
          value={newItemBrand} // Bind the input value to the state.
          onChange={(e) => setNewItemBrand(e.target.value)} // Update the state when the input changes.
          className="p-2 border rounded" // Styling for the input field.
        />
        <input
          type="text"
          placeholder="Image URL" // Placeholder text for the input field.
          value={newItemImage} // Bind the input value to the state.
          onChange={(e) => setNewItemImage(e.target.value)} // Update the state when the input changes.
          className="p-2 border rounded" // Styling for the input field.
        />

        {/* ✅ Select Wishlist Section */}
        <select
          value={selectedSection ?? ""} // Bind the selected value to the state.
          onChange={(e) => setSelectedSection(Number(e.target.value))} // Update the state when the selection changes.
          className="p-2 border rounded" // Styling for the dropdown.
        >
          <option value="">Select Section</option> {/* Default option */}
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.name} {/* Display the section name */}
            </option>
          ))}
        </select>

        <button
          onClick={addNewItem} // Call the function to add a new item when clicked.
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" // Styling for the button.
        >
          Add to Wishlist
        </button>
      </div>

      {/* ✅ Display Sections with Wishlist Items */}
      {sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {section.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <WishlistCard key={item.id} item={item} onRemove={() => {}} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* The "use client" directive at the top of the file is specific to Next.js 13+ when using the App Router. It indicates that this file is a client component, meaning it will run on the client side (in the browser) rather than on the server.

Why is "use client" used here?
React Hooks or Browser-Specific APIs:

If the component uses React hooks like useState, useEffect, or interacts with browser-specific APIs (e.g., window, document), it must run on the client side. Server components cannot use these features.
Interactivity:

The WishlistCard component is interactive because it accepts an onRemove function as a prop. This function likely triggers some user interaction (e.g., clicking a button to remove an item). Interactivity requires the component to run in the browser.
Rendering Behavior:

Server components are static and optimized for server-side rendering (SSR). Since WishlistCard is dynamic and depends on user actions, it needs to be a client component.
What happens without "use client"?
If you omit "use client", Next.js will treat the file as a server component by default. This would cause errors if you try to use client-only features like hooks or event handlers.

Summary
The "use client" directive ensures that WishlistCard runs in the browser, enabling interactivity and the use of client-side features. */