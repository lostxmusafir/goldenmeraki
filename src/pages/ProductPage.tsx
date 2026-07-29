import { Link, Navigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Gallery } from '../components/product/Gallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductTabs } from '../components/product/ProductTabs';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { findProductBySlug, getRelatedProducts, categorySlug } from '../utils/catalog';
import type { Product } from '../types/product';
import type { CommonPageProps } from './HomePage';
import { useState } from 'react';

export interface ProductPageProps extends CommonPageProps {
  slug: string;
  onAddToCart: (product: Product) => void;
  onBuyNow: (product: Product) => void;
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
  const product = findProductBySlug(slug);

  if (!product) {
    return <Navigate to="/category/all" replace />;
  }

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
            <Gallery product={product} />
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

        <RelatedProducts products={getRelatedProducts(product)} />
      </main>

      <Footer />
    </div>
  );
}
