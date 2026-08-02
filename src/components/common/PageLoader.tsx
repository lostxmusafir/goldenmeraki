import React from 'react';
import { getImageUrl } from '../../utils/image';
import './PageLoader.css';

interface PageLoaderProps {
  variant?: 'splash' | 'category' | 'product';
}

export function PageLoader({ variant = 'splash' }: PageLoaderProps) {
  return (
    <div className={`page-loader-container ${variant}`}>
      <div className="page-loader-content">
        <div className={`loader-logo-wrapper ${variant}`}>
          {/* Orbiting golden ring effect for category transition */}
          {variant === 'category' && <div className="golden-orbit-ring" />}

          {/* Luxury Gemstone Light Flare & Aura for Product Page */}
          {variant === 'product' && (
            <div className="product-luxury-card">
              <div className="gem-glow-aura" />
              <div className="gem-shimmer-ray" />
              <div className="sparkle-stars">
                <span className="star s-top">✨</span>
                <span className="star s-bottom">✨</span>
              </div>
            </div>
          )}

          {/* Base faded logo */}
          <img 
            src={getImageUrl('/golden-meraki-logo.png')} 
            alt="Loading..." 
            className="loader-logo base-logo" 
          />
          {/* Colored logo that animates according to variant */}
          <img 
            src={getImageUrl('/golden-meraki-logo.png')} 
            alt="Loading..." 
            className={`loader-logo colored-logo ${variant}`} 
          />
        </div>
      </div>
    </div>
  );
}
