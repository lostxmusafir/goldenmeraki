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

          {/* Product Page Halo & Sparkles effect */}
          {variant === 'product' && (
            <>
              <div className="golden-product-halo" />
              <div className="product-sparkles">
                <span className="sparkle s1">✦</span>
                <span className="sparkle s2">✦</span>
                <span className="sparkle s3">✦</span>
                <span className="sparkle s4">✦</span>
              </div>
            </>
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
