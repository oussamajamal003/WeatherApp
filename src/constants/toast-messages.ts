export const TOAST_MESSAGES = {
  CONNECTION_RESTORED: 'Connection restored',
  HISTORY_CLEARED: 'Search history cleared',
  FAVORITE_ADDED: (city: string) => `⭐ Added "${city}" to Favorites.`,
  FAVORITE_REMOVED: (city: string) => `🗑️ Removed "${city}" from Favorites.`,
  THEME_CHANGED: (theme: string) => `Theme changed to ${theme}`,
  WEATHER_REFRESHED: 'Weather data refreshed',
} as const;
