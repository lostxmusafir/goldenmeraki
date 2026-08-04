import { apiClient } from './apiClient';
import type { AdminUser, AuthResponse, LoginCredentials } from '../types/auth.types';
import { tokenStorage } from '../utils/tokenStorage';

function normalizeUser(user: any): AdminUser {
  const role = user?.role === 'editor' ? 'editor' : user?.role === 'user' ? 'user' : 'admin';

  return {
    id: user?._id ?? user?.id ?? '',
    name: user?.name ?? user?.email ?? 'Admin User',
    email: user?.email ?? '',
    role,
    avatar: user?.avatar ?? '',
    createdAt: user?.createdAt ?? new Date().toISOString()
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password
    });

    const payload = response.data?.data ?? response.data;
    const accessToken = payload?.tokens?.accessToken ?? payload?.accessToken ?? payload?.token;
    const refreshToken = payload?.tokens?.refreshToken ?? payload?.refreshToken;
    const user = normalizeUser(payload?.user);

    if (!accessToken || !refreshToken) {
      throw new Error('Invalid authentication response from the server');
    }

    tokenStorage.setToken(accessToken);
    tokenStorage.setRefreshToken(refreshToken);
    tokenStorage.setUser(user);

    return {
      user,
      token: accessToken,
      refreshToken
    };
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore logout failures and clear local storage anyway.
    }

    tokenStorage.clear();
  },

  async getProfile(): Promise<AdminUser> {
    const token = tokenStorage.getToken();
    if (!token) {
      throw new Error('Unauthenticated');
    }

    const response = await apiClient.get('/auth/me');

    const payload = response.data?.data ?? response.data;
    const user = normalizeUser(payload);
    tokenStorage.setUser(user);
    return user;
  },

  async refreshToken(): Promise<{ token: string }> {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post('/auth/refresh', {
      refreshToken
    });

    const nextToken = response.data?.tokens?.accessToken ?? response.data?.accessToken ?? response.data?.token;
    if (!nextToken) {
      throw new Error('Failed to refresh token');
    }

    tokenStorage.setToken(nextToken);
    return { token: nextToken };
  }
};
