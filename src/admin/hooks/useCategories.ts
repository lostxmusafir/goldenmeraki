import { useCallback, useEffect, useState } from 'react';
import type { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../types/category.types';
import { categoryService } from '../services/category.service';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await categoryService.getCategories({ page, limit, search });
      setCategories(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const createCategory = async (dto: CreateCategoryDTO) => {
    const created = await categoryService.createCategory(dto);
    await fetchCategories();
    return created;
  };

  const updateCategory = async (id: string, dto: UpdateCategoryDTO) => {
    const updated = await categoryService.updateCategory(id, dto);
    await fetchCategories();
    return updated;
  };

  const deleteCategory = async (id: string) => {
    await categoryService.deleteCategory(id);
    await fetchCategories();
  };

  return {
    categories,
    total,
    page,
    limit,
    totalPages,
    search,
    loading,
    error,
    setSearch,
    setPage,
    createCategory,
    updateCategory,
    deleteCategory,
    refetch: fetchCategories
  };
}
