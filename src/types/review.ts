import type { BaseEntity } from './common';

export interface Review extends BaseEntity {
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  productName: string;
}

export interface BlogPost extends BaseEntity {
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  image: string;
}

