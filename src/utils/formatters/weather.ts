import { UnitConversion } from '../unit-conversion';
import type { TemperatureUnit, WindSpeedUnit, PressureUnit } from '../../types/settings';

/**
 * Formats a temperature value.
 * @param value Temperature value
 * @param unit Temperature unit
 * @param includeLabel Whether to include C or F label
 * @returns Formatted temperature string, e.g., "24°C" or "24°"
 */
export function formatTemperature(value: number, unit: TemperatureUnit = 'celsius', includeLabel: boolean = true): string {
  const converted = UnitConversion.convertTemperature(value, unit);
  const unitLabel = unit === 'fahrenheit' ? 'F' : 'C';
  return `${Math.round(converted)}°${includeLabel ? unitLabel : ''}`;
}
/**
 * Formats wind speed.
 * @param speed Wind speed value
 * @param unit Unit
 * @returns Formatted wind speed string, e.g., "5.2 m/s"
 */
export function formatWindSpeed(speed: number, unit: WindSpeedUnit = 'ms'): string {
  const converted = UnitConversion.convertWindSpeed(speed, unit);
  let unitLabel = 'm/s';
  if (unit === 'kmh') unitLabel = 'km/h';
  if (unit === 'mph') unitLabel = 'mph';
  return `${converted.toFixed(1)} ${unitLabel}`;
}

/**
 * Formats visibility distance.
 * @param distance Distance in meters
 * @returns Formatted visibility string, e.g., "10 km"
 */
export function formatVisibility(distanceInMeters: number): string {
  if (distanceInMeters >= 1000) {
    return `${(distanceInMeters / 1000).toFixed(1).replace(/\.0$/, '')} km`;
  }
  return `${distanceInMeters} m`;
}

/**
 * Formats atmospheric pressure.
 * @param pressure Pressure in hPa
 * @param unit Unit
 * @returns Formatted pressure string, e.g., "1012 hPa"
 */
export function formatPressure(pressure: number, unit: PressureUnit = 'hpa'): string {
  const converted = UnitConversion.convertPressure(pressure, unit);
  let unitLabel = 'hPa';
  if (unit === 'mmhg') unitLabel = 'mmHg';
  if (unit === 'inhg') unitLabel = 'inHg';
  return `${Math.round(converted)} ${unitLabel}`;
}

/**
 * Formats a humidity percentage.
 * @param humidity Humidity percentage
 * @returns Formatted humidity string, e.g., "45%"
 */
export function formatHumidity(humidity: number): string {
  return `${Math.round(humidity)}%`;
}

/**
 * Formats a precipitation probability.
 * @param pop Probability percentage (0-100)
 * @returns Formatted probability string, e.g., "30%"
 */
export function formatPrecipitationProbability(pop: number): string {
  return `${Math.round(pop)}%`;
}

/**
 * Extracts and formats time from an ISO date string.
 * @param isoString Date string in ISO format
 * @param locale Locale (default: 'en-US')
 * @returns Formatted time, e.g., "6:30 AM"
 */
export function formatTime(isoString: string, locale: string = 'en-US'): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

/**
 * Extracts and formats date from an ISO date string.
 * @param isoString Date string in ISO format
 * @param locale Locale (default: 'en-US')
 * @returns Formatted date, e.g., "Oct 12"
 */
export function formatDate(isoString: string, locale: string = 'en-US'): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Translates an AQI index (1-5) to a readable label.
 * @param aqi Air Quality Index (1 = Good, 5 = Very Poor)
 * @returns Readable label and styling variant based on AQI
 */
export function getAqiLabel(aqi: number): { label: string; color: string } {
  switch (aqi) {
    case 1:
      return { label: 'Good', color: 'text-green-500' };
    case 2:
      return { label: 'Fair', color: 'text-yellow-500' };
    case 3:
      return { label: 'Moderate', color: 'text-orange-500' };
    case 4:
      return { label: 'Poor', color: 'text-red-500' };
    case 5:
      return { label: 'Very Poor', color: 'text-purple-500' };
    default:
      return { label: 'Unknown', color: 'text-muted-foreground' };
  }
}

/**
 * Translates a UV index to a readable label.
 * @param uv UV Index
 * @returns Readable label and styling variant based on UV Index
 */
export function getUvLabel(uv: number): { label: string; color: string } {
  if (uv < 3) return { label: 'Low', color: 'text-green-500' };
  if (uv < 6) return { label: 'Moderate', color: 'text-yellow-500' };
  if (uv < 8) return { label: 'High', color: 'text-orange-500' };
  if (uv < 11) return { label: 'Very High', color: 'text-red-500' };
  return { label: 'Extreme', color: 'text-purple-500' };
}
