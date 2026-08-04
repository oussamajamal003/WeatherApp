import type { OpenWeatherCurrentResponse, OpenWeatherWeatherItem } from '../api/models';
import type { WeatherData, WeatherCondition } from '../types/weather';

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
 * Maps the OpenWeather Current Response to the internal WeatherData domain model.
 */
export function mapWeatherResponse(
  data: OpenWeatherCurrentResponse,
  uvIndex?: number,
  airQuality?: number
): WeatherData {
  return {
    condition: mapCondition(data.weather),
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    windDirection: data.wind.deg,
    pressure: data.main.pressure,
    visibility: data.visibility,
    uvIndex: uvIndex,
    airQuality: airQuality ?? 1,
    sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
    sunset: new Date(data.sys.sunset * 1000).toISOString(),
    moonPhase: 'Unknown', // OpenWeather free tier doesn't provide moon phase
    description: data.weather[0]?.description || 'clear',
    locationName: data.name,
    weatherUpdatedAt: new Date(data.dt * 1000).toISOString(),
  };
}
