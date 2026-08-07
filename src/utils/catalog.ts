import { CATEGORIES } from '../data/navigation';
import type { Product, ProductCategoryId } from '../types/product';

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function productSlug(product: Product): string {
  const rawSlug = product.slug?.trim() || product.name?.trim() || '';
  return rawSlug ? slugify(rawSlug) : slugify(product.name);
}

export function categorySlug(categoryId: ProductCategoryId): string {
  return categoryId;
}

export function findCategoryBySlug(slug: string) {
  return CATEGORIES.find((category) => category.id === slug);
}

export function getCategoryTitle(slug: string): string {
  const category = findCategoryBySlug(slug);
  return category?.name ?? 'Collection';
}

export function formatCurrency(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}
