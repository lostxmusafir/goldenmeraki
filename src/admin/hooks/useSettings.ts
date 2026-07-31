import { useCallback, useEffect, useState } from 'react';
import type { SystemSettings } from '../types/settings.types';
import { settingsService } from '../services/settings.service';

export function useSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await settingsService.getSettings();
      setSettings(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    const updated = await settingsService.updateSettings(newSettings);
    setSettings(updated);
    return updated;
  };

  return {
    settings,
    loading,
    updateSettings,
    refetch: fetchSettings
  };
}
