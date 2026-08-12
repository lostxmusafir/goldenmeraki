import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { ImagePath } from '../../types/common';
import { getImageUrl } from '../../utils/image';

export interface GalleryProps {
  images: ImagePath[];
  productName?: string;
  video?: string;
}

export function Gallery({ images, productName = 'Product', video }: GalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Total items = images + video (if exists)
  const hasVideo = Boolean(video);
  const totalItems = images.length + (hasVideo ? 1 : 0);
  const videoIndex = images.length; // Video is always last

  const isShowingVideo = hasVideo && activeIndex === videoIndex;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
  };

  const handleVideoToggle = () => {
    const videoEl = document.getElementById('product-video') as HTMLVideoElement;
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play();
      setIsVideoPlaying(true);
    } else {
      videoEl.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Main Display */}
      <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
        {isShowingVideo ? (
          <video
            id="product-video"
            src={video}
            className="h-full w-full object-contain bg-black"
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => setIsVideoPlaying(false)}
            onEnded={() => setIsVideoPlaying(false)}
          />
        ) : (
          <img
            src={getImageUrl(images[activeIndex] || '')}
            alt={`${productName} – Image ${activeIndex + 1}`}
            className="h-full w-full object-cover transition-all duration-300"
          />
        )}

        {/* Navigation Arrows */}
        {totalItems > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-700 shadow-sm backdrop-blur-sm transition hover:bg-white"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
          {activeIndex + 1} / {totalItems}
        </div>
      </div>

      {/* Thumbnail Strip */}
      {totalItems > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {images.map((img, index) => (
            <button
              key={`img-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                activeIndex === index
                  ? 'border-slate-950 shadow-md ring-2 ring-slate-950/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={getImageUrl(img)}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}

          {/* Video Thumbnail */}
          {hasVideo && (
            <button
              type="button"
              onClick={() => setActiveIndex(videoIndex)}
              className={`group relative h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                activeIndex === videoIndex
                  ? 'border-slate-950 shadow-md ring-2 ring-slate-950/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <div className="h-full w-full bg-slate-900 flex items-center justify-center">
                <Play className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent py-0.5">
                <span className="block text-center text-[8px] font-bold text-white uppercase tracking-wider">
                  Video
                </span>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}