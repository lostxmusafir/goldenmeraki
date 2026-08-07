import { apiClient } from './apiClient';
import type { Banner } from '../types/banner.types';

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

export const bannerService = {
  async getBanners(): Promise<Banner[]> {
    try {
      const response = await apiClient.get('/settings/banners');
      const setting = unwrapData<any>(response);
      return Array.isArray(setting.value) ? setting.value : [];
    } catch (error) {
      return [
        {
          id: 'ban-1',
          title: 'Sacred Crystal Trees',
          subtitle: 'Hand-Twisted Wire & Natural Gemstones',
          image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
          link: '/category/trees-decor',
          status: 'active',
          position: 1
        }
      ];
    }
  },

  async saveBanner(banner: Partial<Banner> & { id?: string }): Promise<Banner> {
    const items = await this.getBanners();
    let saved: Banner;
    if (banner.id) {
      const index = items.findIndex((b) => b.id === banner.id);
      if (index !== -1) {
        items[index] = { ...items[index], ...banner } as Banner;
        saved = items[index];
      } else {
        throw new Error('Banner not found');
      }
    } else {
      saved = {
        id: `ban-${Date.now()}`,
        title: banner.title || 'Untitled Banner',
        subtitle: banner.subtitle || '',
        image: banner.image || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
        link: banner.link || '/category/all',
        status: banner.status || 'active',
        position: items.length + 1
      };
      items.push(saved);
    }

    await apiClient.patch('/settings', { key: 'banners', value: items });
    return saved;
  },

  async deleteBanner(id: string): Promise<void> {
    const items = await this.getBanners();
    const next = items.filter((b) => b.id !== id);
    await apiClient.patch('/settings', { key: 'banners', value: next });
  }
};
