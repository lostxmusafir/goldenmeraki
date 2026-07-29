import type { Dispatch, SetStateAction } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer/Footer';
import { Hero } from '../components/home/Hero';
import { OfferBanner } from '../components/home/OfferBanner';
import { TopCategories } from '../components/home/TopCategories';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';
import type { Product } from '../types/product';

export interface CommonPageProps {
  cartCount: number;
  wishlistCount: number;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAccount: () => void;
  onOpenQuiz: () => void;
  onOpenBuilder: () => void;
  onOpenCanvas: () => void;
  onSelectProduct: (product: Product) => void;
}

export interface HomePageProps extends CommonPageProps {
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: string[];
}

export function HomePage({
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
}: HomePageProps) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
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
        <Hero />
        <OfferBanner />
        <TopCategories />
        <TrendingProducts onAddToCart={onAddToCart} onToggleWishlist={onToggleWishlist} wishlist={wishlist} />
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
