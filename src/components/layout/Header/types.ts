import type { Dispatch, SetStateAction } from 'react';
import type { Product } from '../../../types/product';
import type { NavigationCategory } from '../../../types/navigation';

export interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onOpenQuiz: () => void;
  onOpenBuilder: () => void;
  onOpenCanvas: () => void;
  onSelectProduct: (product: Product) => void;
}

export interface HeaderSearchBarProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export interface HeaderActionsProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenBuilder: () => void;
}

export interface DesktopNavProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onOpenBuilder: () => void;
  onOpenQuiz: () => void;
}

export interface MobileNavProps {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onOpenQuiz: () => void;
  onOpenBuilder: () => void;
}

export interface MegaMenuProps {
  activeCategoryTab: NavigationCategory;
  setActiveCategoryTab: Dispatch<SetStateAction<NavigationCategory>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onClose: () => void;
}

