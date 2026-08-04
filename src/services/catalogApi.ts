import axios from 'axios';
import { API_BASE_URL } from '../config/api.config';

import type { ProductCategoryOption } from '../types/category';
import type { Product, InventoryStatusType } from '../types/product';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  timestamp: string;
  data: T;
}

function unwrap<T>(payload: ApiEnvelope<T> | T | undefined | null): T | null {
  if (!payload) return null;

  if (typeof payload === 'object' && 'data' in payload && payload !== null) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

export interface CatalogCategory extends ProductCategoryOption {
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

function normalizeCategory(raw: any): CatalogCategory {
  const slug = raw?.slug ?? raw?.id ?? '';

  return {
    id: slug,
    name: raw?.name ?? 'Category',
    icon: raw?.icon ?? 'Sparkles',
    color: raw?.color ?? 'from-slate-500 to-slate-700',
    slug,
    description: raw?.description ?? '',
    image: raw?.image ?? '',
    isActive: raw?.isActive !== false
  };
}

export function normalizeProduct(raw: any): Product {
  const rawCategory = raw?.category;
  const categoryValue =
    (typeof rawCategory === 'string' && rawCategory) ||
    rawCategory?.slug ||
    raw?.categorySlug ||
    'all';

  const rawImages = Array.isArray(raw?.images) ? raw.images.filter(Boolean) : [];
  const fallbackImage = raw?.image ?? rawImages[0] ?? '';

  const stock = Number(raw?.stock ?? 10);
  let inventoryStatus: InventoryStatusType = raw?.inventoryStatus;
  if (!inventoryStatus) {
    inventoryStatus = stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK';
  }

  const specSource =
    raw?.specifications && typeof raw.specifications === 'object' && !Array.isArray(raw.specifications)
      ? raw.specifications
      : raw?.attributes && typeof raw.attributes === 'object' && !Array.isArray(raw.attributes)
        ? raw.attributes
        : {};

  return {
    id: String(raw?._id ?? raw?.id ?? `${raw?.slug ?? 'product'}-${Math.random()}`),
    name: raw?.title ?? raw?.name ?? 'Product',
    category: categoryValue,
    subCategory: raw?.subCategory ?? '',
    intention: raw?.intention ?? '',
    chakra: raw?.chakra ?? '',
    price: Number(raw?.price ?? 0),
    originalPrice: Number(raw?.originalPrice ?? raw?.discountPrice ?? raw?.price ?? 0),
    stock,
    inventoryStatus,
    rating: Number(raw?.ratings?.average ?? raw?.rating ?? 5),
    reviewsCount: Number(raw?.ratings?.count ?? raw?.reviewsCount ?? 12),
    badge: raw?.badge ?? '',
    image: fallbackImage,
    images: rawImages.length > 0 ? rawImages : fallbackImage ? [fallbackImage] : [],
    certificate: raw?.certificate ?? 'Certified',
    description: raw?.description ?? '',
    weights: Array.isArray(raw?.weights) ? raw.weights : [],
    stone: raw?.stone ?? '',
    tags: Array.isArray(raw?.tags) ? raw.tags : [],
    benefits: Array.isArray(raw?.benefits) ? raw.benefits : [],
    specifications: Object.fromEntries(
      Object.entries(specSource).map(([key, value]) => [key, String(value)])
    ),
    slug: raw?.slug ?? String(raw?._id ?? raw?.id ?? '')
  };
}

export async function getCategories(): Promise<CatalogCategory[]> {
  const response = await api.get('/categories');
  const payload = unwrap<any>(response.data);
  const data = Array.isArray(payload) ? payload : payload?.items ?? [];
  return data.map(normalizeCategory);
}

export async function getCategoryBySlug(slug: string): Promise<CatalogCategory | null> {
  try {
    const response = await api.get(`/categories/slug/${slug}`);
    const payload = unwrap<any>(response.data);
    if (payload) return normalizeCategory(payload);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
  return null;
}

export interface ProductsResponse {
  products: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null;
}

export async function getProducts(params?: Record<string, unknown>): Promise<ProductsResponse> {
  const response = await api.get('/products', { params });
  const payload = unwrap<any>(response.data);
  const products = Array.isArray(payload) ? payload : payload?.products ?? [];

  return {
    products: products.map(normalizeProduct),
    meta: payload?.meta ?? null
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await api.get(`/products/slug/${slug}`);
    const payload = unwrap<any>(response.data);
    if (payload) return normalizeProduct(payload);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
  return null;
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const response = await api.get('/products/featured');
  const payload = unwrap<any[]>(response.data);
  const products = Array.isArray(payload) ? payload : [];

  return products.slice(0, limit).map(normalizeProduct);
}
