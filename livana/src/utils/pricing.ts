import type { Product } from '../types/product';

// Base catalog prices represent the smallest size; larger sizes get a volume discount.
const SIZE_PRICE_MULTIPLIERS: Record<string, number> = {
  '10ml': 1,
  '30ml': 2.5,
  '50ml': 4,
  '100ml': 7.5,
};

const PRICE_ROUNDING_UNIT = 5000;

const roundPrice = (amount: number) => Math.round(amount / PRICE_ROUNDING_UNIT) * PRICE_ROUNDING_UNIT;

export const buildSizePricing = (basePrice: number, sizeOptions: string[]) =>
  sizeOptions.reduce<Record<string, number>>((pricing, size) => {
    pricing[size] = roundPrice(basePrice * (SIZE_PRICE_MULTIPLIERS[size] ?? 1));
    return pricing;
  }, {});

export const getDefaultSize = (product: Product) => product.sizeOptions[0] ?? '';

export const getProductPrice = (product: Product, size = getDefaultSize(product)) =>
  product.sizePrices[size] ?? product.price;

export const getProductOriginalPrice = (product: Product, size = getDefaultSize(product)) =>
  product.sizeOriginalPrices?.[size] ?? (size === getDefaultSize(product) ? product.originalPrice : undefined);
