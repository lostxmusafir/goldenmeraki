import { useCallback, useEffect, useState } from 'react';
import type { AdminProduct, CreateProductDTO, UpdateProductDTO } from '../types/product.types';
import { productService } from '../services/product.service';

export function useProducts() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('all');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getProducts({ page, limit, search, categoryId, status });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, categoryId, status]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const createProduct = async (dto: CreateProductDTO) => {
    const created = await productService.createProduct(dto);
    await fetchProducts();
    return created;
  };

  const updateProduct = async (id: string, dto: UpdateProductDTO) => {
    const updated = await productService.updateProduct(id, dto);
    await fetchProducts();
    return updated;
  };

  const deleteProduct = async (id: string) => {
    await productService.deleteProduct(id);
    await fetchProducts();
  };

  return {
    products,
    total,
    page,
    limit,
    totalPages,
    search,
    categoryId,
    status,
    loading,
    error,
    setSearch,
    setCategoryId,
    setStatus,
    setPage,
    createProduct,
    updateProduct,
    deleteProduct,
    refetch: fetchProducts
  };
}
