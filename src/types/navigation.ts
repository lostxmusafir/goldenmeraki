import type { BaseEntity } from './common';

export interface NavigationSubcategory extends BaseEntity {
  id: string;
  name: string;
}

export interface NavigationCategory extends BaseEntity {
  id: string;
  name: string;
  icon: string;
  subcategories: NavigationSubcategory[];
}

export interface CategoryCard extends BaseEntity {
  id: string;
  name: string;
  count: string;
  image: string;
}
