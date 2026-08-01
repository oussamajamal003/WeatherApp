import type { OpenWeatherWeatherItem } from './weather';

/**
 * Raw OpenWeather API response models for Forecast.
 */

export interface OpenWeatherForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
    humidity: number;
    temp_kf?: number;
  };
  weather: OpenWeatherWeatherItem[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: {
    '3h'?: number;
  };
  snow?: {
    '3h'?: number;
  };
  sys: {
    pod: 'd' | 'n';
  };
  dt_txt: string;
}

export interface OpenWeatherForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: OpenWeatherForecastItem[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
