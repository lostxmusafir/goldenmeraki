import { getImageUrl } from '../../../utils/image';

export function Logo({ className = 'h-12 sm:h-16 md:h-20 lg:h-24 max-h-24' }: { className?: string }) {
  return (
    <img
      src={getImageUrl('/golden-meraki-logo.svg')}
      alt="Golden Meraki Logo"
      className={`${className} object-contain select-none`}
    />
  );
}

