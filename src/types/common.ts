export type ID = string;

export type Nullable<T> = T | null;

export type ImagePath = string;

export interface BaseEntity {
  id: ID;
}

export interface MoneyRange {
  min: number;
  max: number;
}

