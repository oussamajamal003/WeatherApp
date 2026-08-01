import { weatherApiClient } from './client';
import { validateCoordinates, validateLanguage, validateUnits } from './validators';
import { mapApiError, ValidationError, FeatureUnavailableError } from './errors';
import { parseApiResponse } from '../utils/api';
import { AirQualityService } from './air-quality.service';
import { UVService } from './uv.service';
import { API_ENDPOINTS } from './endpoints';
import type { OpenWeatherCurrentResponse, OpenWeatherForecastResponse, OpenWeatherWeatherItem } from './models';
import type { WeatherData, WeatherCondition } from '../types/weather';
import type { WeatherRequest, ForecastRequest } from '../types/api';

/**
 * Maps OpenWeather API weather conditions to our internal domain type.
 */
export function mapCondition(weatherItems: OpenWeatherWeatherItem[]): WeatherCondition {
  if (!weatherItems || weatherItems.length === 0) return 'clear';
  
  const main = weatherItems[0].main.toLowerCase();
  const desc = weatherItems[0].description.toLowerCase();
  
  if (main === 'clear') return 'clear';
  if (main === 'clouds') {
    if (desc.includes('few') || desc.includes('scattered')) return 'partlyCloudy';
    if (desc.includes('overcast')) return 'overcast';
    return 'cloudy';
  }
  if (main === 'rain') return 'rain';
  if (main === 'drizzle') return 'drizzle';
  if (main === 'thunderstorm') return 'thunderstorm';
  if (main === 'snow') return 'snow';
  if (main === 'mist') return 'mist';
  if (main === 'fog') return 'fog';
  if (main === 'haze') return 'haze';
  
  return 'clear'; // fallback
}

/**
 * Service responsible for fetching Current Weather and Forecasts.
 */
export const WeatherService = {
  /**
   * Fetches the current weather for a specific location.
   * Aggregates UV Index and Air Quality data to return a fully populated WeatherData object.
   * 
   * @param request - The WeatherRequest object (lat, lon, units, lang)
   * @returns Fully populated WeatherData object
   */
  async getCurrentWeather(request: WeatherRequest): Promise<WeatherData> {
    const { lat, lon, units = 'metric', lang = 'en' } = request;
    
    const coordValidation = validateCoordinates(lat, lon);
    if (!coordValidation.success) throw new ValidationError(coordValidation.error);
    
    const unitValidation = validateUnits(units);
    if (!unitValidation.success) throw new ValidationError(unitValidation.error);

    const langValidation = validateLanguage(lang);
    if (!langValidation.success) throw new ValidationError(langValidation.error);

    try {
      // Fetch core weather data, AQI, and UV in parallel to optimize speed
      const [weatherRes, airQuality, uvIndex] = await Promise.all([
        weatherApiClient.get<OpenWeatherCurrentResponse>(API_ENDPOINTS.weather, {
          params: { lat, lon, units, lang }
        }),
        AirQualityService.getAirPollution(lat, lon).catch(() => 1), // Fallback if AQI fails
        UVService.getUVIndex(lat, lon).catch((err) => {
          if (err instanceof FeatureUnavailableError) return undefined;
          return undefined; // Assume missing if other error occurs during aggregation
        })
      ]);
      
      const apiResponse = parseApiResponse(weatherRes);
      const data = apiResponse.data;

      return {
        condition: mapCondition(data.weather),
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg,
        pressure: data.main.pressure,
        visibility: data.visibility,
        uvIndex,
        airQuality,
        sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
        sunset: new Date(data.sys.sunset * 1000).toISOString(),
        moonPhase: 'Unknown', // OpenWeather free tier doesn't provide moon phase
        description: data.weather[0]?.description || 'clear',
        locationName: data.name,
        updatedAt: new Date(data.dt * 1000).toISOString(),
      };
    } catch (error) {
      throw mapApiError(error);
    }
  },

  /**
   * Fetches the 5-day forecast for a specific location.
   * 
   * @param request - The ForecastRequest object (lat, lon, units, lang)
   * @returns Object containing hourly and daily forecast arrays
   */
  async getForecast(request: ForecastRequest): Promise<OpenWeatherForecastResponse> {
    const { lat, lon, units = 'metric', lang = 'en' } = request;
    
    const coordValidation = validateCoordinates(lat, lon);
    if (!coordValidation.success) throw new ValidationError(coordValidation.error);

    const unitValidation = validateUnits(units);
    if (!unitValidation.success) throw new ValidationError(unitValidation.error);

    const langValidation = validateLanguage(lang);
    if (!langValidation.success) throw new ValidationError(langValidation.error);

    try {
      const response = await weatherApiClient.get<OpenWeatherForecastResponse>(API_ENDPOINTS.forecast, {
        params: { lat, lon, units, lang }
      });
      
      const apiResponse = parseApiResponse(response);
      const data = apiResponse.data;

      return data;
    } catch (error) {
      throw mapApiError(error);
    }
  }
};
