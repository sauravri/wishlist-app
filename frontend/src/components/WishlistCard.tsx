"use client"; // usage explained at the end

import React from "react";
import Image from "next/image";

// Define the structure of a WishlistItem object using an interface
interface WishlistItem {
    id: number; // Unique identifier for the item
    name: string; // Name of the item
    brand: string; // Brand of the item
    image: string; // URL of the item's image
}

// Define a functional component named WishlistCard
// It takes two props: 
// 1. `item` - an object of type WishlistItem
// 2. `onRemove` - a function to handle removing an item by its ID
export default function WishlistCard({ item, onRemove }: { item: WishlistItem; onRemove: (id: number) => void }) {
    return (
        // Card container with styling
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
            {/* Display the item's image using the Next.js Image component */}
            <Image
                src={item.image} // Image source URL
                alt={item.name} // Alternative text for accessibility
                width={100} // Image width
                height={100} // Image height
                className="object-cover rounded-md" // Styling for the image
            />
            <div>
                {/* Display the item's name */}
                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
                {/* Display the item's brand */}
                <p className="text-sm text-gray-600">{item.brand}</p>
                {/* Button to view more details about the item */}
                <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    View Details
                </button>
                {/* Button to remove the item from the wishlist */}
                <button
                    onClick={() => onRemove(item.id)} // Call the onRemove function with the item's ID when clicked
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Remove
                </button>
            </div>
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