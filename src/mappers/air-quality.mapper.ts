import type { OpenWeatherAirPollutionResponse } from '../api/models';

/**
 * Transforms OpenWeather API air pollution response into our internal AQI value.
 */
export function mapAirQualityResponse(data: OpenWeatherAirPollutionResponse): number {
  // Default to 1 (Good) if not available, though OpenWeather always returns a list
  return data.list[0]?.main?.aqi ?? 1;
}
