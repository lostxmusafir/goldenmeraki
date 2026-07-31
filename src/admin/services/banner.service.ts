import type { Banner } from '../types/banner.types';
import { mockStorage } from './mockData';

export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    await new Promise((res) => setTimeout(res, 200));
    return mockStorage.getBanners();
  },

  async saveBanner(banner: Partial<Banner> & { id?: string }): Promise<Banner> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getBanners();
    if (banner.id) {
      const index = items.findIndex((b) => b.id === banner.id);
      if (index !== -1) {
        items[index] = { ...items[index], ...banner };
        mockStorage.setBanners(items);
        return items[index];
      }
    }

    const newBanner: Banner = {
      id: `ban-${Date.now()}`,
      title: banner.title || 'Untitled Banner',
      subtitle: banner.subtitle || '',
      image: banner.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
      link: banner.link || '/category/all',
      status: banner.status || 'active',
      position: items.length + 1
    };

    items.push(newBanner);
    mockStorage.setBanners(items);
    return newBanner;
  },

  async deleteBanner(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getBanners();
    const next = items.filter((b) => b.id !== id);
    mockStorage.setBanners(next);
  }
};
