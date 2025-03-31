"use client";
import { useState } from "react";
import Image from "next/image";

interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  image: string;
}

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onEdit: (updatedItem: WishlistItem) => void;
}

export default function WishlistCard({ item, onRemove, onEdit }: WishlistCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedBrand, setEditedBrand] = useState(item.brand);
  const [editedImage, setEditedImage] = useState(item.image);

  const handleSave = () => {
    onEdit({
      ...item,
      name: editedName,
      brand: editedBrand,
      image: editedImage,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      {isEditing ? (
        <div className="flex flex-col gap-2 w-full">
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={editedBrand}
            onChange={(e) => setEditedBrand(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={editedImage}
            onChange={(e) => setEditedImage(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      ) : (
        <>
          <Image
            src={item.image}
            alt={item.name}
            width={100}
            height={100}
            className="object-cover rounded-md"
          />
          <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
          <p className="text-sm text-gray-600">{item.brand}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={onRemove}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
}
