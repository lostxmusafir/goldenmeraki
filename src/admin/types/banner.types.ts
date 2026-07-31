export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  status: 'active' | 'inactive';
  position: number;
}
