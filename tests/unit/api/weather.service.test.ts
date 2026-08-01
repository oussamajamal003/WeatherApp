import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WeatherService } from '../../../src/api/weather.service';
import { weatherApiClient } from '../../../src/api/client';
import { AirQualityService } from '../../../src/api/air-quality.service';
import { UVService } from '../../../src/api/uv.service';
import { ValidationError, FeatureUnavailableError } from '../../../src/api/errors';
import { API_ENDPOINTS } from '../../../src/api/endpoints';

vi.mock('../../../src/api/client', () => ({
  weatherApiClient: {
    get: vi.fn(),
  },
}));

vi.mock('../../../src/api/air-quality.service', () => ({
  AirQualityService: {
    getAirPollution: vi.fn(),
  },
}));

vi.mock('../../../src/api/uv.service', () => ({
  UVService: {
    getUVIndex: vi.fn(),
  },
}));

describe('WeatherService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('aggregates weather, aqi, and uv data successfully', async () => {
      const mockWeatherResponse = {
        data: {
          weather: [{ main: 'Clear', description: 'clear sky' }],
          main: { temp: 20.5, feels_like: 21, humidity: 50, pressure: 1012 },
          wind: { speed: 5, deg: 180 },
          visibility: 10000,
          sys: { sunrise: 1700000000, sunset: 1700040000, country: 'US' },
          dt: 1700020000,
          name: 'Test City',
        },
      };

      vi.mocked(weatherApiClient.get).mockResolvedValue(mockWeatherResponse);
      vi.mocked(AirQualityService.getAirPollution).mockResolvedValue(2);
      vi.mocked(UVService.getUVIndex).mockResolvedValue(5);

      const result = await WeatherService.getCurrentWeather({ lat: 10, lon: 20 });

      expect(weatherApiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.weather, {
        params: { lat: 10, lon: 20, units: 'metric', lang: 'en' },
      });
      expect(AirQualityService.getAirPollution).toHaveBeenCalledWith(10, 20);
      expect(UVService.getUVIndex).toHaveBeenCalledWith(10, 20);

      expect(result.temperature).toBe(21); // rounded
      expect(result.condition).toBe('clear');
      expect(result.airQuality).toBe(2);
      expect(result.uvIndex).toBe(5);
      expect(result.locationName).toBe('Test City');
    });

    it('falls back to default AQI and UV if sub-services fail', async () => {
      const mockWeatherResponse = {
        data: {
          weather: [{ main: 'Rain', description: 'light rain' }],
          main: { temp: 20, feels_like: 20, humidity: 50, pressure: 1012 },
          wind: { speed: 5, deg: 180 },
          visibility: 10000,
          sys: { sunrise: 1700000000, sunset: 1700040000, country: 'US' },
          dt: 1700020000,
          name: 'Test City',
        },
      };

      vi.mocked(weatherApiClient.get).mockResolvedValue(mockWeatherResponse);
      vi.mocked(AirQualityService.getAirPollution).mockRejectedValue(new Error('Network'));
      vi.mocked(UVService.getUVIndex).mockRejectedValue(new FeatureUnavailableError());

      const result = await WeatherService.getCurrentWeather({ lat: 10, lon: 20 });
      
      expect(result.condition).toBe('rain');
      expect(result.airQuality).toBe(1); // default fallback
      expect(result.uvIndex).toBeUndefined(); // fallback for FeatureUnavailableError
    });

    it('throws ValidationError for invalid inputs', async () => {
      await expect(WeatherService.getCurrentWeather({ lat: 91, lon: 0 })).rejects.toThrow(ValidationError);
      // @ts-expect-error testing invalid unit
      await expect(WeatherService.getCurrentWeather({ lat: 0, lon: 0, units: 'invalid' })).rejects.toThrow(ValidationError);
    });
  });

  describe('getForecast', () => {
    it('returns raw forecast response data', async () => {
      const mockForecastResponse = {
        data: {
          list: [
            {
              dt: 1700000000,
              dt_txt: '2023-11-15 12:00:00',
              main: { temp: 15, temp_max: 16, temp_min: 10 },
              weather: [{ main: 'Clouds', description: 'few clouds' }],
              pop: 0.2,
            }
          ]
        }
      };

      vi.mocked(weatherApiClient.get).mockResolvedValue(mockForecastResponse);

      const result = await WeatherService.getForecast({ lat: 10, lon: 20 });

      expect(result).toEqual(mockForecastResponse.data);
    });
  });
});
