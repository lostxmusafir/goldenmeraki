export type NotificationStatus = 'PENDING' | 'CONTACTED' | 'COMPLETED';

export interface AdminNotification {
  _id: string;
  productId: string;
  productTitle: string;
  customerName: string;
  phone?: string;
  whatsapp: string;
  email?: string;
  requestedSize?: string;
  requestedDate: string;
  status: NotificationStatus;
  notifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}
