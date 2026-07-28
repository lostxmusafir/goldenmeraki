import React from 'react';

export const GoldenMerakiLogo = ({ className = "h-14 sm:h-16 md:h-20" }) => {
  return (
    <img 
      src="/golden-meraki-logo.png" 
      alt="Golden Meraki Logo" 
      className={`${className} object-contain select-none`}
    />
  );
};
