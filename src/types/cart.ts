import type { Product } from './product';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discount: number;
  total: number;
}

