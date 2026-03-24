export type ProductCategory = 'sleep' | 'relax' | 'focus' | 'fresh' | 'other';

export type ProductSizePricing = Record<string, number>;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  sizeOptions: string[];
  sizePrices: ProductSizePricing;
  sizeOriginalPrices?: ProductSizePricing;
  category: ProductCategory;
  scentNotes: string[];
  isFeatured?: boolean;
  rating?: number;
  imageUrl: string;
  galleryImages?: string[];
}
