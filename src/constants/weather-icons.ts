import { 
  Sun, 
  CloudSun, 
  Cloud, 
  Cloudy, 
  CloudRain, 
  CloudDrizzle, 
  CloudLightning, 
  Snowflake, 
  Wind,
  Droplets,
  Eye,
  Thermometer,
  ThermometerSun,
  Gauge,
  Sunrise,
  Sunset,
  Moon,
  CloudFog
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { WeatherCondition } from '../types/weather';

export const WEATHER_ICONS: Record<WeatherCondition, LucideIcon> = {
  sunny: Sun,
  clear: Moon, // Or Sun, depending on time of day, but typically clear is moon at night. We'll default to Sun or Moon. Let's use Sun for sunny, Moon for clear.
  partlyCloudy: CloudSun,
  cloudy: Cloud,
  overcast: Cloudy,
  rain: CloudRain,
  drizzle: CloudDrizzle,
  thunderstorm: CloudLightning,
  snow: Snowflake,
  mist: CloudFog,
  fog: CloudFog,
  haze: CloudFog
};

export const METRIC_ICONS = {
  temperature: Thermometer,
  feelsLike: ThermometerSun,
  humidity: Droplets,
  wind: Wind,
  pressure: Gauge,
  visibility: Eye,
  uvIndex: Sun,
  airQuality: Wind,
  sunrise: Sunrise,
  sunset: Sunset,
  moonPhase: Moon
};
