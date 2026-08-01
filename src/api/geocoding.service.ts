import { geoApiClient } from './client';
import { validateCoordinates, validateCityName } from './validators';
import { mapApiError, ValidationError } from './errors';
import { parseApiResponse } from '../utils/api';
import { API_ENDPOINTS } from './endpoints';
import type { OpenWeatherGeoResponse } from './models';
import type { Location } from '../types/weather';

/**
 * Service responsible for Geocoding (converting city names to coordinates and vice-versa).
 */
export const GeocodingService = {
  /**
   * Retrieves coordinates for a given city name.
   * 
   * @param city - City name (optionally with state and country code separated by comma)
   * @param limit - Maximum number of results to return
   * @returns Array of matching Location objects
   */
  async getCoordinatesByLocationName(city: string, limit = 5): Promise<Location[]> {
    const validation = validateCityName(city);
    if (!validation.success) {
      throw new ValidationError(validation.error);
    }

    try {
      const response = await geoApiClient.get<OpenWeatherGeoResponse[]>(API_ENDPOINTS.directGeocoding, {
        params: { q: validation.data, limit }
      });
      
      const apiResponse = parseApiResponse(response);
      return apiResponse.data.map(geo => ({
        name: geo.name,
        localNames: geo.local_names,
        lat: geo.lat,
        lon: geo.lon,
        country: geo.country,
        state: geo.state,
      }));
    } catch (error) {
      throw mapApiError(error);
    }
  },

  /**
   * Retrieves location details for given coordinates.
   * 
   * @param lat - Latitude
   * @param lon - Longitude
   * @param limit - Maximum number of results to return
   * @returns Array of matching Location objects
   */
  async getLocationNameByCoordinates(lat: number, lon: number, limit = 1): Promise<Location[]> {
    const validation = validateCoordinates(lat, lon);
    if (!validation.success) {
      throw new ValidationError(validation.error);
    }

    try {
      const response = await geoApiClient.get<OpenWeatherGeoResponse[]>(API_ENDPOINTS.reverseGeocoding, {
        params: { lat, lon, limit }
      });
      
      const apiResponse = parseApiResponse(response);
      return apiResponse.data.map(geo => ({
        name: geo.name,
        localNames: geo.local_names,
        lat: geo.lat,
        lon: geo.lon,
        country: geo.country,
        state: geo.state,
      }));
    } catch (error) {
      throw mapApiError(error);
    }
  }
};
