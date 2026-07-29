export type ID = string;

export type Nullable<T> = T | null;

export type ImagePath = string;

export interface BaseEntity {
  id: string | number;
}

export interface MoneyRange {
  min: number;
  max: number;
}
