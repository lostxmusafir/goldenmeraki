import { useCallback, useEffect, useState } from 'react';
import type { Banner } from '../types/banner.types';
import { bannerService } from '../services/banner.service';

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBanners = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bannerService.getBanners();
      setBanners(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const saveBanner = async (banner: Partial<Banner> & { id?: string }) => {
    const saved = await bannerService.saveBanner(banner);
    await fetchBanners();
    return saved;
  };

  const deleteBanner = async (id: string) => {
    await bannerService.deleteBanner(id);
    await fetchBanners();
  };

  return {
    banners,
    loading,
    saveBanner,
    deleteBanner,
    refetch: fetchBanners
  };
}
