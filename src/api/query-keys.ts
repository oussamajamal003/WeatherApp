export const QUERY_KEYS = {
  weather: (lat: number, lon: number, units: string, lang: string) =>
    ['weather', lat, lon, units, lang] as const,

  forecast: (lat: number, lon: number, units: string, lang: string) =>
    ['forecast', lat, lon, units, lang] as const,

  geocode: (query: string) =>
    ['geocode', query] as const,

  reverseGeocode: (lat: number, lon: number) =>
    ['reverse-geocode', lat, lon] as const,

  airQuality: (lat: number, lon: number) =>
    ['aqi', lat, lon] as const,
} as const;
