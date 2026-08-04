import { apiClient } from './apiClient';
import type { Blog, CreateBlogDTO, UpdateBlogDTO } from '../types/blog.types';
import type { PaginatedResponse, PaginationParams } from '../types/common.types';

const mapBlog = (item: any): Blog => ({
  id: item._id ?? item.id,
  title: item.title,
  slug: item.slug,
  excerpt: item.excerpt,
  content: item.content,
  coverImage: item.coverImage || 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80',
  author: item.author || 'Admin',
  status: item.isActive === false ? 'draft' : 'published',
  publishedAt: item.createdAt ?? item.publishedAt ?? new Date().toISOString()
});

export const blogService = {
  async getBlogs(params: PaginationParams = {}): Promise<PaginatedResponse<Blog>> {
    const response = await apiClient.get('/blogs', {
      params: { includeUnpublished: true }
    });
    const payload = response.data?.data ?? response.data;
    let items = (payload ?? []).map(mapBlog);

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
    const response = await apiClient.post('/blogs', {
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      coverImage: dto.coverImage,
      author: dto.author,
      isActive: dto.status === 'published'
    });
    return mapBlog(response.data?.data ?? response.data);
  },

  async updateBlog(id: string, dto: UpdateBlogDTO): Promise<Blog> {
    const response = await apiClient.patch(`/blogs/${id}`, {
      title: dto.title,
      excerpt: dto.excerpt,
      content: dto.content,
      coverImage: dto.coverImage,
      author: dto.author,
      isActive: dto.status !== undefined ? (dto.status === 'published') : undefined
    });
    return mapBlog(response.data?.data ?? response.data);
  },

  async deleteBlog(id: string): Promise<void> {
    await apiClient.delete(`/blogs/${id}`);
  }
};
