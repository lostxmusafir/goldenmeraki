import { useCallback, useEffect, useState } from 'react';
import type { Blog, CreateBlogDTO, UpdateBlogDTO } from '../types/blog.types';
import { blogService } from '../services/blog.service';

export function useBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await blogService.getBlogs({ page, limit, search });
      setBlogs(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const createBlog = async (dto: CreateBlogDTO) => {
    const res = await blogService.createBlog(dto);
    await fetchBlogs();
    return res;
  };

  const updateBlog = async (id: string, dto: UpdateBlogDTO) => {
    const res = await blogService.updateBlog(id, dto);
    await fetchBlogs();
    return res;
  };

  const deleteBlog = async (id: string) => {
    await blogService.deleteBlog(id);
    await fetchBlogs();
  };

  return {
    blogs,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    setSearch,
    setPage,
    createBlog,
    updateBlog,
    deleteBlog,
    refetch: fetchBlogs
  };
}
