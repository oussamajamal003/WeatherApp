import { weatherApiClient } from './client';
import { validateCoordinates } from './validators';
import { mapApiError, ValidationError } from './errors';
import { parseApiResponse } from '../utils/api';
import { API_ENDPOINTS } from './endpoints';
import type { OpenWeatherAirPollutionResponse } from './models';

/**
 * Service responsible for fetching Air Quality Index data.
 */
export const AirQualityService = {
  /**
   * Fetches the current Air Quality Index (AQI) for a specific location.
   * AQI ranges from 1 (Good) to 5 (Very Poor).
   * 
   * @param lat - Latitude
   * @param lon - Longitude
   * @returns The AQI value
   */
  async getAirPollution(lat: number, lon: number): Promise<number> {
    const validation = validateCoordinates(lat, lon);
    if (!validation.success) {
      throw new ValidationError(validation.error);
    }

    try {
      const response = await weatherApiClient.get<OpenWeatherAirPollutionResponse>(API_ENDPOINTS.airPollution, {
        params: { lat, lon }
      });
      
      const apiResponse = parseApiResponse(response);
      
      // Default to 1 (Good) if not available, though OpenWeather always returns a list
      return apiResponse.data.list[0]?.main?.aqi ?? 1;
    } catch (error) {
      throw mapApiError(error);
    }
  }
};
