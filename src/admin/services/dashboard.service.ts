import { apiClient } from './apiClient';

export interface DashboardOverview {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

export interface LowStockProduct {
  _id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
}

export interface AdminStatsResponse {
  overview: DashboardOverview;
  recentOrders: any[];
  lowStockProducts: LowStockProduct[];
}

export const dashboardService = {
  async getAdminStats(): Promise<AdminStatsResponse> {
    const response = await apiClient.get('/dashboard/stats');
    return response.data?.data !== undefined ? response.data.data : response.data;
  }
};
