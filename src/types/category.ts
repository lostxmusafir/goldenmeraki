import type { BaseEntity } from './common';

export interface Subcategory extends BaseEntity {
  name: string;
}

export interface TaxonomyCategory extends BaseEntity {
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface ProductCategoryOption extends BaseEntity {
  name: string;
  icon: string;
  color: string;
}

export interface IntentionOption extends BaseEntity {
  label: string;
  color: string;
}

export interface ChakraOption extends BaseEntity {
  name: string;
  stone: string;
  color: string;
}

