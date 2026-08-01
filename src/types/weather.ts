export type WeatherCondition = 
  | 'sunny'
  | 'clear'
  | 'partlyCloudy'
  | 'cloudy'
  | 'overcast'
  | 'rain'
  | 'drizzle'
  | 'thunderstorm'
  | 'snow'
  | 'mist'
  | 'fog'
  | 'haze';

export type TemperatureUnit = 'C' | 'F';

export interface WeatherData {
  condition: WeatherCondition;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  visibility: number;
  uvIndex?: number;
  airQuality: number;
  sunrise: string;
  sunset: string;
  moonPhase: string;
  description: string;
  locationName: string;
  updatedAt: string;
}

export interface HourlyForecastData {
  time: string;
  condition: WeatherCondition;
  temperature: number;
  precipitationProbability: number;
}

export interface DailyForecastData {
  date: string;
  dayName: string;
  condition: WeatherCondition;
  highTemp: number;
  lowTemp: number;
  precipitationProbability: number;
}

export interface Location {
  name: string;
  localNames?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
