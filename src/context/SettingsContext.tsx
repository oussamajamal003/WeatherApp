/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect, useState, useCallback } from 'react';
import type { AppSettings } from '../types/settings';
import { SettingsService, SETTINGS_STORAGE_KEY } from '../services/settings.service';
import '../i18n/config';
import { useTranslation } from 'react-i18next';

export interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettingsState] = useState<AppSettings>(() => {
    SettingsService.cleanupLegacyKeys();
    return SettingsService.getSettings();
  });
  const { i18n } = useTranslation();

  // Sync i18n and RTL
  useEffect(() => {
    const lang = settings.language;
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [settings.language, i18n]);

  // Listen to cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === SETTINGS_STORAGE_KEY) {
        setSettingsState(SettingsService.getSettings());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettingsState(prev => {
      const updated = { ...prev, ...newSettings };
      SettingsService.saveSettings(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    SettingsService.resetSettings();
    setSettingsState(SettingsService.getSettings());
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
