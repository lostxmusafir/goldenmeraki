export type RecoveryStatus = 'Pending' | 'Recovered' | 'Expired' | 'Ignored';

export interface CartItemProduct {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface ShippingAddressInfo {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
}

export interface AdminAbandonedCart {
  _id: string;
  cartId: string;
  customerName?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  shippingAddress?: ShippingAddressInfo;
  products: CartItemProduct[];
  cartTotal: number;
  lastActivity: string;
  recoveryStatus: RecoveryStatus;
  recoveryCount: number;
  source: string;
  createdAt: string;
  updatedAt: string;
}
