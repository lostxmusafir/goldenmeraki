export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  status: 'published' | 'draft';
  publishedAt: string;
}

export interface CreateBlogDTO {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  status: 'published' | 'draft';
}

export type UpdateBlogDTO = Partial<CreateBlogDTO>;
