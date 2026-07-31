import type { SystemSettings } from '../types/settings.types';
import { mockStorage } from './mockData';

export const settingsService = {
  async getSettings(): Promise<SystemSettings> {
    await new Promise((res) => setTimeout(res, 200));
    return mockStorage.getSettings();
  },

  async updateSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    await new Promise((res) => setTimeout(res, 300));
    const current = mockStorage.getSettings();
    const updated = { ...current, ...settings };
    mockStorage.setSettings(updated);
    return updated;
  }
};
