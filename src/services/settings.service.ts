import { storage } from '../utils/storage';
import type { AppSettings } from '../types/settings';

export const SETTINGS_STORAGE_KEY = 'weatherapp_settings';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'system',
  temperatureUnit: 'celsius',
  windSpeedUnit: 'ms',
  pressureUnit: 'hpa',
  language: 'en',
};

export const SettingsService = {
  /**
   * Retrieves current settings from local storage, merging with defaults.
   */
  getSettings(): AppSettings {
    const stored = storage.get<Partial<AppSettings>>(SETTINGS_STORAGE_KEY, {});
    return { ...DEFAULT_SETTINGS, ...stored };
  },

  /**
   * Updates settings in local storage.
   */
  saveSettings(newSettings: AppSettings): void {
    storage.set(SETTINGS_STORAGE_KEY, newSettings);
  },

  /**
   * Resets settings to default values.
   */
  resetSettings(): void {
    storage.remove(SETTINGS_STORAGE_KEY);
  },

  /**
   * Cleans up the legacy theme key if present
   */
  cleanupLegacyKeys(): void {
    storage.remove('weather-theme');
  }
};
