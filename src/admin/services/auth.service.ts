import type { AdminUser, AuthResponse, LoginCredentials } from '../types/auth.types';
import { tokenStorage } from '../utils/tokenStorage';

const MOCK_ADMIN_USER: AdminUser = {
  id: 'admin-01',
  name: 'Manoj Admin',
  email: 'admin@goldenmeraki.com',
  role: 'super_admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  createdAt: '2026-01-01T00:00:00Z'
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((res) => setTimeout(res, 500));
    if (credentials.email === 'admin@goldenmeraki.com' && credentials.password === 'admin123') {
      const response: AuthResponse = {
        user: MOCK_ADMIN_USER,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now()
      };
      tokenStorage.setToken(response.token);
      tokenStorage.setRefreshToken(response.refreshToken);
      tokenStorage.setUser(response.user);
      return response;
    }
    
    // For easy testing, allow any valid email format with password length >= 6
    if (credentials.email.includes('@') && credentials.password.length >= 6) {
      const customUser: AdminUser = {
        ...MOCK_ADMIN_USER,
        email: credentials.email,
        name: credentials.email.split('@')[0] || 'Admin User'
      };
      const response: AuthResponse = {
        user: customUser,
        token: 'mock_jwt_token_' + Date.now(),
        refreshToken: 'mock_refresh_token_' + Date.now()
      };
      tokenStorage.setToken(response.token);
      tokenStorage.setRefreshToken(response.refreshToken);
      tokenStorage.setUser(response.user);
      return response;
    }

    throw new Error('Invalid email or password. (Default: admin@goldenmeraki.com / admin123)');
  },

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 200));
    tokenStorage.clear();
  },

  async getProfile(): Promise<AdminUser> {
    await new Promise((res) => setTimeout(res, 200));
    const user = tokenStorage.getUser();
    if (!user) {
      throw new Error('Unauthenticated');
    }
    return user;
  },

  async refreshToken(): Promise<{ token: string }> {
    await new Promise((res) => setTimeout(res, 200));
    const newToken = 'mock_jwt_token_refreshed_' + Date.now();
    tokenStorage.setToken(newToken);
    return { token: newToken };
  }
};
