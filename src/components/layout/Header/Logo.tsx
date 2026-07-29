export function Logo({ className = 'h-12 sm:h-16 md:h-20 lg:h-24 max-h-24' }: { className?: string }) {
  return (
    <img
      src="/golden-meraki-logo.png"
      alt="Golden Meraki Logo"
      className={`${className} object-contain select-none`}
    />
  );
}

