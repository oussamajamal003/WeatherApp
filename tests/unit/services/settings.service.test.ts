import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SettingsService, SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS } from '../../../src/services/settings.service';
import { storage } from '../../../src/utils/storage';

vi.mock('../../../src/utils/storage');

describe('SettingsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('getSettings returns default settings when storage is empty', () => {
    vi.mocked(storage.get).mockReturnValue({});
    
    const settings = SettingsService.getSettings();
    
    expect(storage.get).toHaveBeenCalledWith(SETTINGS_STORAGE_KEY, {});
    expect(settings).toEqual(DEFAULT_SETTINGS);
  });

  it('getSettings merges stored settings with defaults', () => {
    vi.mocked(storage.get).mockReturnValue({ theme: 'dark', temperatureUnit: 'fahrenheit' });
    
    const settings = SettingsService.getSettings();
    
    expect(settings).toEqual({
      ...DEFAULT_SETTINGS,
      theme: 'dark',
      temperatureUnit: 'fahrenheit'
    });
  });

  it('saveSettings updates storage', () => {
    const newSettings = { ...DEFAULT_SETTINGS, language: 'fr' as const };
    
    SettingsService.saveSettings(newSettings);
    
    expect(storage.set).toHaveBeenCalledWith(SETTINGS_STORAGE_KEY, newSettings);
  });

  it('resetSettings removes settings from storage', () => {
    SettingsService.resetSettings();
    
    expect(storage.remove).toHaveBeenCalledWith(SETTINGS_STORAGE_KEY);
  });

  it('cleanupLegacyKeys removes old theme key', () => {
    SettingsService.cleanupLegacyKeys();
    
    expect(storage.remove).toHaveBeenCalledWith('weather-theme');
  });
});
