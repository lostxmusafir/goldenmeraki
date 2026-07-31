import type { Category } from '../types/category.types';
import type { AdminProduct } from '../types/product.types';
import type { AdminOrder } from '../types/order.types';
import type { Customer } from '../types/customer.types';
import type { Blog } from '../types/blog.types';
import type { Subscriber } from '../types/newsletter.types';
import type { ContactMessage } from '../types/contact.types';
import type { Banner } from '../types/banner.types';
import type { SystemSettings } from '../types/settings.types';

const STORAGE_KEYS = {
  CATEGORIES: 'gm_admin_categories_v2',
  PRODUCTS: 'gm_admin_products_v2',
  ORDERS: 'gm_admin_orders_v2',
  CUSTOMERS: 'gm_admin_customers_v2',
  BLOGS: 'gm_admin_blogs_v2',
  SUBSCRIBERS: 'gm_admin_subscribers_v2',
  CONTACTS: 'gm_admin_contacts_v2',
  BANNERS: 'gm_admin_banners_v2',
  SETTINGS: 'gm_admin_settings_v2'
};

const initialCategories: Category[] = [];
const initialProducts: AdminProduct[] = [];
const initialOrders: AdminOrder[] = [];
const initialCustomers: Customer[] = [];
const initialBlogs: Blog[] = [];
const initialSubscribers: Subscriber[] = [];
const initialContacts: ContactMessage[] = [];
const initialBanners: Banner[] = [];

const initialSettings: SystemSettings = {
  siteName: 'GoldenMeraki',
  siteEmail: 'support@goldenmeraki.com',
  contactPhone: '+91 98765 00000',
  currency: 'INR',
  metaTitle: 'GoldenMeraki | Authentic Gemstone Jewelry & Healing Crystals',
  metaDescription: 'Shop handcrafted crystal bracelets, necklaces, rings, and raw stones for energy balancing.',
  socialInstagram: 'https://instagram.com/goldenmeraki',
  socialFacebook: 'https://facebook.com/goldenmeraki',
  socialPinterest: 'https://pinterest.com/goldenmeraki'
};

function getStoredData<T>(key: string, fallback: T): T {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

function setStoredData<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export const mockStorage = {
  getCategories: () => getStoredData(STORAGE_KEYS.CATEGORIES, initialCategories),
  setCategories: (data: Category[]) => setStoredData(STORAGE_KEYS.CATEGORIES, data),

  getProducts: () => getStoredData(STORAGE_KEYS.PRODUCTS, initialProducts),
  setProducts: (data: AdminProduct[]) => setStoredData(STORAGE_KEYS.PRODUCTS, data),

  getOrders: () => getStoredData(STORAGE_KEYS.ORDERS, initialOrders),
  setOrders: (data: AdminOrder[]) => setStoredData(STORAGE_KEYS.ORDERS, data),

  getCustomers: () => getStoredData(STORAGE_KEYS.CUSTOMERS, initialCustomers),
  setCustomers: (data: Customer[]) => setStoredData(STORAGE_KEYS.CUSTOMERS, data),

  getBlogs: () => getStoredData(STORAGE_KEYS.BLOGS, initialBlogs),
  setBlogs: (data: Blog[]) => setStoredData(STORAGE_KEYS.BLOGS, data),

  getSubscribers: () => getStoredData(STORAGE_KEYS.SUBSCRIBERS, initialSubscribers),
  setSubscribers: (data: Subscriber[]) => setStoredData(STORAGE_KEYS.SUBSCRIBERS, data),

  getContacts: () => getStoredData(STORAGE_KEYS.CONTACTS, initialContacts),
  setContacts: (data: ContactMessage[]) => setStoredData(STORAGE_KEYS.CONTACTS, data),

  getBanners: () => getStoredData(STORAGE_KEYS.BANNERS, initialBanners),
  setBanners: (data: Banner[]) => setStoredData(STORAGE_KEYS.BANNERS, data),

  getSettings: () => getStoredData(STORAGE_KEYS.SETTINGS, initialSettings),
  setSettings: (data: SystemSettings) => setStoredData(STORAGE_KEYS.SETTINGS, data)
};
