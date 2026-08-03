import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { CategoryBanner } from '../components/category/CategoryBanner';
import { FilterSidebar } from '../components/category/FilterSidebar';
import { FilterDrawer } from '../components/category/FilterDrawer';
import { ProductGrid } from '../components/category/ProductGrid';
import { SortBar } from '../components/category/SortBar';
import { categorySlug } from '../utils/catalog';
import type { Product } from '../types/product';
import type { CommonPageProps } from './HomePage';
import { getCategories, getProducts, type CatalogCategory } from '../services/catalogApi';

export interface CategoryPageProps extends CommonPageProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
  slug: string;
}

export function CategoryPage({
  slug,
  cartCount,
  wishlistCount,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenQuiz,
  onOpenBuilder,
  onOpenCanvas,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist
}: CategoryPageProps) {
  const [intention, setIntention] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const location = useLocation();
  const navigate = useNavigate();
  const [maxPrice, setMaxPrice] = useState(25000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [categories, setCategories] = useState<CatalogCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadCatalog = async () => {
      try {
        setLoading(true);
        const [categoryResponse, productResponse] = await Promise.all([
          getCategories(),
          getProducts({ limit: 100 })
        ]);

        if (!isActive) return;

        setCategories(categoryResponse);
        setProducts(productResponse.products);
        setError(null);
      } catch (catalogError) {
        if (!isActive) return;
        console.error('Failed to load categories/products', catalogError);
        setError('Unable to load the catalog right now.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadCatalog();

    return () => {
      isActive = false;
    };
  }, []);

  const category = categories.find((item) => item.slug === slug || item.id === slug) ?? null;
  const categoryId = category?.slug ?? category?.id ?? (slug === 'all' ? 'all' : slug);

  const handleCategoryChange = (action: SetStateAction<string>) => {
    const nextCategory = typeof action === 'function' ? action(categoryId) : action;
    setSelectedCategory(nextCategory);
    navigate(`/category/${nextCategory}`);
  };

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return products
      .filter((product) => {
        if (categoryId === 'all') return true;
        return product.category === categoryId || product.category === slug || product.category === category?.id;
      })
      .filter((product) => (intention === 'all' ? true : product.intention === intention))
      .filter((product) => product.price <= maxPrice)
      .filter((product) => {
        if (!query) return true;
        return [product.name, product.description, (product.tags || []).join(' ')].some((value) => value.toLowerCase().includes(query));
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return (b.reviewsCount || 0) - (a.reviewsCount || 0);
      });
  }, [categoryId, category?.id, intention, maxPrice, products, searchTerm, slug, sortBy]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const intent = params.get('intent') ?? 'all';
    setIntention(intent);
  }, [location.search]);

  if (!loading && !category && slug !== 'all') {
    return <Navigate to="/category/all" replace />;
  }

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <Header
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        onOpenAccount={onOpenAccount}
        onOpenQuiz={onOpenQuiz}
        onOpenBuilder={onOpenBuilder}
        onOpenCanvas={onOpenCanvas}
        onSelectProduct={onSelectProduct}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-slate-500">
          <Link to="/" className="transition-colors hover:text-slate-950">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-950">{category?.name ?? 'All Products'}</span>
        </nav>

        <CategoryBanner
          slug={categorySlug(categoryId)}
          title={category?.name}
          description={category?.description}
          image={category?.image}
        />

        {loading ? (
          <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-10 text-center text-sm text-slate-600">
            Loading products from the API...
          </div>
        ) : null}

        {!loading && error ? (
          <div className="mt-10 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-10 text-center text-sm text-amber-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <>
            <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_1fr]">
              <div className="hidden lg:block">
                <FilterSidebar
                  categories={categories}
                  category={categoryId}
                  setCategory={handleCategoryChange}
                  intention={intention}
                  setIntention={setIntention}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>

              <div className="space-y-5">
                <div className="flex flex-col gap-3 lg:hidden">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <SortBar sortBy={sortBy} onChange={setSortBy} count={filteredProducts.length} />
                    </div>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(true)}
                      className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300"
                      aria-label="Open filters"
                    >
                      <Filter className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <SortBar sortBy={sortBy} onChange={setSortBy} count={filteredProducts.length} />
                </div>

                <ProductGrid products={visibleProducts} wishlist={wishlist} onToggleWishlist={onToggleWishlist} onAddToCart={onAddToCart} />

                {visibleCount < filteredProducts.length ? (
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={() => setVisibleCount((count) => count + 12)}
                      className="rounded-full bg-slate-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-800"
                    >
                      Load more
                    </button>
                  </div>
                ) : null}
              </div>
            </div>

            <FilterDrawer
              open={mobileFiltersOpen}
              onClose={() => setMobileFiltersOpen(false)}
              categories={categories}
              category={categoryId}
              setCategory={handleCategoryChange}
              intention={intention}
              setIntention={setIntention}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
