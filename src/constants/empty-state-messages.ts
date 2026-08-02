export const EMPTY_STATE_MESSAGES = {
  SEARCH_HISTORY: {
    TITLE: 'No Recent Searches',
    MESSAGE: 'Cities you search for will appear here for quick access.',
  },
  FAVORITES: {
    TITLE: 'No Favorites Yet',
    MESSAGE: 'Search for cities and tap the heart icon to add them to your favorites.',
    ACTION: 'Search Locations',
  },
  FIRST_LAUNCH: {
    TITLE: 'Welcome to WeatherApp',
    MESSAGE: 'To get started, search for a city or use your current location.',
    ACTION_SEARCH: 'Search Cities',
    ACTION_LOCATION: 'Use My Location',
  },
  DEFAULT: {
    TITLE: 'No Data Found',
    MESSAGE: 'There is currently no data to display.',
  }
} as const;
