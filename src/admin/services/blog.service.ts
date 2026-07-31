import type { Blog, CreateBlogDTO, UpdateBlogDTO } from '../types/blog.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';
import { mockStorage } from './mockData';

export const blogService = {
  async getBlogs(params: PaginationParams = {}): Promise<PaginatedResponse<Blog>> {
    await new Promise((res) => setTimeout(res, 300));
    let items = mockStorage.getBlogs();

    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }

    const page = params.page || 1;
    const limit = params.limit || 10;
    const total = items.length;
    const totalPages = Math.ceil(total / limit) || 1;

    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      total,
      page,
      limit,
      totalPages
    };
  },

  async createBlog(dto: CreateBlogDTO): Promise<Blog> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getBlogs();
    const newBlog: Blog = {
      id: `blog-${Date.now()}`,
      title: dto.title,
      slug: dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: dto.excerpt,
      content: dto.content,
      coverImage: dto.coverImage || 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
      author: dto.author || 'Admin',
      status: dto.status,
      publishedAt: new Date().toISOString()
    };

    items.unshift(newBlog);
    mockStorage.setBlogs(items);
    return newBlog;
  },

  async updateBlog(id: string, dto: UpdateBlogDTO): Promise<Blog> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getBlogs();
    const index = items.findIndex((b) => b.id === id);
    if (index === -1) throw new Error('Blog post not found');

    const updated: Blog = {
      ...items[index],
      ...dto
    };

    items[index] = updated;
    mockStorage.setBlogs(items);
    return updated;
  },

  async deleteBlog(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const items = mockStorage.getBlogs();
    const next = items.filter((b) => b.id !== id);
    mockStorage.setBlogs(next);
  }
};
