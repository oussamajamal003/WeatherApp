export const API_ENDPOINTS = {
  weather: '/weather',
  forecast: '/forecast',
  directGeocoding: '/direct',
  reverseGeocoding: '/reverse',
  airPollution: '/air_pollution',
  uvIndex: '/uvi' // Maintained for backwards compatibility, but marked as unsupported
} as const;
