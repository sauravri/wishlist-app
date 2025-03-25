"use client"; // This directive tells Next.js that this file is a client component, meaning it will run in the browser. It's required when using React hooks or browser-specific APIs.

/////////////////////////////////////////////
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to StyleList</h1>
      <p className="text-lg text-gray-600 mb-6">Your personal wishlist for clothing & accessories.</p>
      <Link href="/wishlist">
        <button className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Go to Wishlist
        </button>
      </Link>
    </div>
  );
}

/////////////////////////////////////////////

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
