import type { BaseEntity } from './common';

export interface Subcategory extends BaseEntity {
  id: string;
  name: string;
}

export interface TaxonomyCategory extends BaseEntity {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface ProductCategoryOption extends BaseEntity {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface IntentionOption extends BaseEntity {
  id: string;
  label: string;
  color: string;
}

export interface ChakraOption extends BaseEntity {
  id: string;
  name: string;
  stone: string;
  color: string;
}
