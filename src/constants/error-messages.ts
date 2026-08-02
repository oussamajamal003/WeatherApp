export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect. Please check your internet connection and try again.',
  TIMEOUT: 'The request took too long. Please try again later.',
  NOT_FOUND: 'City not found. Try searching for another city.',
  OFFLINE: 'You are currently offline. Displayed data is cached and live updates are temporarily unavailable.',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  GENERIC: 'An unexpected error occurred. Please try again.',
  GEOLOCATION_DENIED: 'Location access denied. Please enable location permissions in your browser or search for a city manually.',
  UNABLE_TO_LOAD: 'Unable to Load Data',
} as const;

export const RECOVERY_ACTIONS = {
  RETRY: 'Retry',
  RETRYING: 'Retrying...',
  SEARCH_AGAIN: 'Search Again',
  CLEAR_SEARCH: 'Clear Search',
  USE_LOCATION: 'Use My Location',
  GO_HOME: 'Go Home',
} as const;
