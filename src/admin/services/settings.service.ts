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
        storeName: 'GoldenMeraki',
        storeEmail: 'contact@goldenmeraki.com',
        supportPhone: '+91 99999 99999',
        currency: 'INR',
        taxRate: 18,
        shippingFee: 100,
        freeShippingThreshold: 1500,
        maintenanceMode: false
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
