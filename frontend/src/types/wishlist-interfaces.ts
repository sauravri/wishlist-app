// for better organization

export interface WishlistItem {
  id: number;
  name: string;
  brand: string;
  image: string; // No 'undefined' here!
}
export interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onEdit: (updatedItem: WishlistItem) => void;
}
export interface WishlistSection {
  id: number;
  name: string;
  items: WishlistItem[];
}

export interface SectionDashboardProps {
  section: WishlistSection;
  onClose: () => void;
  onRenameSection: (sectionId: number, newName: string) => void;
  onRemoveItem: (sectionId: number, itemId: number) => void;
  onEditItem: (sectionId: number, updatedItem: WishlistItem) => void; // ✅ Fixed type definition
}