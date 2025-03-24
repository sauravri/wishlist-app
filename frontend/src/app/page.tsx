"use client";

import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to StyleList</h1>
      <p className="text-gray-600 mt-2">
        Your personal wishlist for clothing & accessories.
      </p>
      <Button label="Get Started" onClick={() => alert("Button Clicked!")} />
    </div>
  );
}
