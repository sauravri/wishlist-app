import React from "react";
import Image from "next/image";

import { WishlistCardProps } from "@/types/wishlist-interfaces";

const WishlistCard: React.FC<WishlistCardProps> = ({
  item,
  onRemove,
  onEdit,
}) => {
  return (
    <div className="relative p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform duration-300">
      {/* Image Wrapper for Responsive Behavior */}
      <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden">
        <Image
          src={item.image || "/placeholder-image.jpg"}
          alt={item.name}
          width={150}
          height={150}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Item Details */}
      <div className="mt-4">
        <h3 className="text font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 font-medium mt-2">{item.brand}</p>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          onClick={() => onEdit(item)} // Pass the item as an argument
          className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={onRemove}
          className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishlistCard;
