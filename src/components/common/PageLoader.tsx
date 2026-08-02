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
          {/* Subtle spinning golden ring around the outside (does not touch or alter the logo) */}
          {variant === 'category' && <div className="golden-orbit-ring" />}

          {/* Clean ambient golden aura behind the logo for product page */}
          {variant === 'product' && <div className="product-ambient-aura" />}

          {/* Exact, original, untouched logo image */}
          <img 
            src={getImageUrl('/golden-meraki-logo.png')} 
            alt="Golden Meraki" 
            className={`exact-brand-logo ${variant}`} 
          />
        </div>
      </div>
    </div>
  );
}
