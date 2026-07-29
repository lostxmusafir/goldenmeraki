import { memo, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { Product } from '../../types/product';

export interface GalleryProps {
  product: Product;
}

export const Gallery = memo(function Gallery({ product }: GalleryProps) {
  const images = useMemo(
    () => (product.images?.length ? product.images : [product.image]),
    [product.images, product.image]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-sm">
        <img src={images[activeIndex]} alt={product.name} className="aspect-square w-full object-cover" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 backdrop-blur-md">
          <ZoomIn className="h-3.5 w-3.5" />
          Tap to inspect
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1))}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition-all ${
                activeIndex === index ? 'border-slate-950 ring-1 ring-slate-950' : 'border-slate-200'
              }`}
            >
              <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1))}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          aria-label="Next image"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

