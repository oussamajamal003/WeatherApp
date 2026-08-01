/**
 * Raw OpenWeather API response models for Geocoding.
 */

export interface OpenWeatherGeoResponse {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
