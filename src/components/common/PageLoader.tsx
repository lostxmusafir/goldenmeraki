import React from 'react';
import { getImageUrl } from '../../utils/image';
import './PageLoader.css';

export function PageLoader() {
  return (
    <div className="page-loader-container">
      <div className="page-loader-content">
        <div className="loader-logo-wrapper">
          {/* Base faded logo */}
          <img
            src={getImageUrl('/golden-meraki-logo.png')}
            alt="Loading..."
            className="loader-logo base-logo"
          />
          {/* Colored logo that wipes in */}
          <img
            src={getImageUrl('/golden-meraki-logo.png')}
            alt="Loading..."
            className="loader-logo colored-logo"
          />
          {/* Shimmer sweep effect */}
          <div className="shimmer-sweep"></div>
        </div>
      </div>
    </div>
  );
}
