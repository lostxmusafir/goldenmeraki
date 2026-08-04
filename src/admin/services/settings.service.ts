import { apiClient } from './apiClient';
import type { SystemSettings } from '../types/settings.types';

const unwrapData = <T>(response: any): T => {
  return response.data?.data !== undefined ? response.data.data : response.data;
};

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    try {
      const response = await apiClient.get('/settings/system');
      return unwrapData<any>(response).value;
    } catch (error) {
      return {
        siteName: 'GoldenMeraki',
        siteEmail: 'contact@goldenmeraki.com',
        contactPhone: '+91 99999 99999',
        currency: 'INR',
        metaTitle: 'GoldenMeraki - Crystal Trees & Natural Gemstones',
        metaDescription: 'Discover beautifully handcrafted sacred crystal trees, raw gemstone clusters, energy bracelets, and silver jewelry at GoldenMeraki.',
        socialInstagram: 'https://instagram.com/goldenmeraki',
        socialFacebook: 'https://facebook.com/goldenmeraki',
        socialPinterest: 'https://pinterest.com/goldenmeraki'
      };
    }
  },

  async updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    const current = await this.getSettings();
    const updated = { ...current, ...settings };
    const response = await apiClient.patch('/settings', { key: 'system', value: updated });
    return unwrapData<any>(response).value;
  }
};
