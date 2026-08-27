import { OutletId } from './outlet';

export type DietaryTag = 'veg' | 'non-veg' | 'egg';
export type SpiceLevel = 1 | 2 | 3;  // 1=mild, 2=medium, 3=hot

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategorySlug;
  description: string;
  price: number | null;
  image: string | null;
  imageAlt?: string;
  imagePosition?: string;
  dietary: DietaryTag;
  spiceLevel?: SpiceLevel;
  tags: ItemTag[];
  available: boolean;
  featured: boolean;
  bestseller: boolean;
  outletIds: OutletId[];
  allergens?: string[];
}

export type MenuCategorySlug = 'momos' | 'soups' | 'starters' | 'mains' | 'drinks';
export type ItemTag = 'bestseller' | 'new' | 'signature' | 'seasonal';

export interface MenuCategory {
  slug: MenuCategorySlug;
  label: string;
  description?: string;
  displayOrder: number;
}
