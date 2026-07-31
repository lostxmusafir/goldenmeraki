import { ADMIN_STORAGE_KEYS } from '../constants/admin.constants';
import type { AdminUser } from '../types/auth.types';

export const tokenStorage = {
  getToken: (): string | null => {
    return localStorage.getItem(ADMIN_STORAGE_KEYS.AUTH_TOKEN);
  },
  setToken: (token: string): void => {
    localStorage.getItem(ADMIN_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.setItem(ADMIN_STORAGE_KEYS.AUTH_TOKEN, token);
  },
  getRefreshToken: (): string | null => {
    return localStorage.getItem(ADMIN_STORAGE_KEYS.REFRESH_TOKEN);
  },
  setRefreshToken: (token: string): void => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.REFRESH_TOKEN, token);
  },
  getUser: (): AdminUser | null => {
    const data = localStorage.getItem(ADMIN_STORAGE_KEYS.USER_DATA);
    if (!data) return null;
    try {
      return JSON.parse(data) as AdminUser;
    } catch {
      return null;
    }
  },
  setUser: (user: AdminUser): void => {
    localStorage.setItem(ADMIN_STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },
  clear: (): void => {
    localStorage.removeItem(ADMIN_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(ADMIN_STORAGE_KEYS.USER_DATA);
  }
};
