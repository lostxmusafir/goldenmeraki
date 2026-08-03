export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface ShippingAddressInfo {
  street: string;
  city: string;
  state: string;
  country?: string;
  pincode: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  shippingAddress: ShippingAddressInfo;
  cartItems: OrderItem[];
  totalAmount: number;
  orderDate: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  source: string;
  orderNotes?: string;
  generatedWhatsappMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderDTO {
  customerName: string;
  phone: string;
  whatsapp: string;
  shippingAddress: ShippingAddressInfo;
  cartItems: OrderItem[];
  totalAmount: number;
  source?: string;
  orderNotes?: string;
}

export interface UpdateOrderStatusDTO {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}
