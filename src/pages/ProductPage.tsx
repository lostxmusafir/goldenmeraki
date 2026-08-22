import { Link, Navigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Gallery } from '../components/product/Gallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductTabs } from '../components/product/ProductTabs';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { categorySlug } from '../utils/catalog';
import type { Product } from '../types/product';
import type { CommonPageProps } from './HomePage';
import { useEffect, useState } from 'react';
import { getProductBySlug, getProducts } from '../services/catalogApi';
import { SEOHead } from '../components/seo/SEOHead';
import { getBreadcrumbSchema, getProductSchema } from '../utils/seoSchemas';
import { getImageUrl } from '../utils/image';

export interface ProductPageProps extends CommonPageProps {
  slug: string;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity?: number) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

export function ProductPage({
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
  onBuyNow,
  onToggleWishlist,
  wishlist
}: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const [currentProduct, productResponse] = await Promise.all([
          getProductBySlug(slug),
          getProducts({ limit: 20 })
        ]);

        if (!isActive) return;

        setProduct(currentProduct);
        setRelatedProducts(
          (productResponse.products ?? [])
            .filter((item) => item.id !== currentProduct?.id)
            .filter((item) => currentProduct && (item.category === currentProduct.category || item.intention === currentProduct.intention))
            .slice(0, 4)
        );
        setError(null);
      } catch (catalogError) {
        if (!isActive) return;
        console.error('Failed to load product', catalogError);
        setError('Unable to load this product right now.');
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isActive = false;
    };
  }, [slug]);

  if (loading) {
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
        <main className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-slate-600">Loading product...</main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/category/all" replace />;
  }

  const canonicalUrl = `https://goldenmerakigems.com/product/${slug}`;
  const categoryName = typeof product.category === 'string' ? product.category : (product.category as any)?.name || 'Crystals';

  const seoTitle = product.seoTitle || `${product.name} | Natural ${categoryName} | Golden Meraki Gems`;
  const seoDesc =
    product.seoDescription ||
    (product.description && product.description.length > 10
      ? product.description.slice(0, 155).trim() + '...'
      : `Buy certified natural ${product.name} gemstone at Golden Meraki Gems. Pure energetic crystal for manifestation, intention & protection.`);
  const ogImg = product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : undefined;

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: categoryName, url: `/category/${categorySlug(product.category)}` },
    { name: product.name, url: `/product/${slug}` },
  ];

  const productSchemas = [getProductSchema(product, canonicalUrl), getBreadcrumbSchema(breadcrumbs)];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SEOHead
        title={seoTitle}
        description={seoDesc}
        keywords={product.seoKeywords || `${product.name}, ${categoryName}, natural crystal, healing gemstone`}
        canonicalUrl={canonicalUrl}
        ogType="product"
        ogImage={ogImg}
        jsonLd={productSchemas}
      />
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

      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-slate-500">
            <Link to="/" className="transition-colors hover:text-slate-950">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/category/${categorySlug(product.category)}`} className="transition-colors hover:text-slate-950">
              Collection
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-950">{product.name}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Gallery images={product.images} productName={product.name} video={product.video} />
            <ProductInfo
              product={product}
              wishlist={wishlist}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          <div className="mt-10">
            <ProductTabs product={product} />
          </div>
        </div>

        <RelatedProducts products={relatedProducts} />
      </main>

      <Footer />
    </div>
  );
}
