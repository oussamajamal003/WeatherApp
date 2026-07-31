/**
 * Lightweight, centralized validation layer for the API foundation.
 * Designed behind a small abstraction to allow future replacement with schema
 * validation libraries (like Zod) without changing the public API.
 */

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Ensures a value is not empty or undefined.
 */
export function validateRequired<T>(value: T | undefined | null, fieldName: string): ValidationResult<T> {
  if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
    return { success: false, error: `${fieldName} is required.` };
  }
  return { success: true, data: value as T };
}

/**
 * Validates geographical coordinates.
 * Latitude must be between -90 and 90.
 * Longitude must be between -180 and 180.
 */
export function validateCoordinates(lat: number, lon: number): ValidationResult<{ lat: number; lon: number }> {
  if (typeof lat !== 'number' || isNaN(lat) || lat < -90 || lat > 90) {
    return { success: false, error: 'Invalid latitude. Must be a number between -90 and 90.' };
  }
  
  if (typeof lon !== 'number' || isNaN(lon) || lon < -180 || lon > 180) {
    return { success: false, error: 'Invalid longitude. Must be a number between -180 and 180.' };
  }

  return { success: true, data: { lat, lon } };
}

/**
 * Validates a city name search query.
 */
export function validateCityName(city: string): ValidationResult<string> {
  const result = validateRequired(city, 'City name');
  if (!result.success) return result;
  
  if (city.trim().length < 2) {
    return { success: false, error: 'City name must be at least 2 characters long.' };
  }
  
  return { success: true, data: city.trim() };
}

/**
 * Validates the measurement units parameter.
 */
export function validateUnits(units: string): ValidationResult<'standard' | 'metric' | 'imperial'> {
  const validUnits = ['standard', 'metric', 'imperial'];
  if (!validUnits.includes(units)) {
    return { 
      success: false, 
      error: `Invalid units: '${units}'. Must be one of: ${validUnits.join(', ')}.` 
    };
  }
  return { success: true, data: units as 'standard' | 'metric' | 'imperial' };
}

/**
 * Validates the language parameter (ISO 639-1).
 */
export function validateLanguage(lang: string): ValidationResult<string> {
  const result = validateRequired(lang, 'Language');
  if (!result.success) return result;
  
  // Basic check for ISO 639-1 code (e.g., 'en', 'fr', 'pt_br')
  if (lang.length < 2 || lang.length > 5) {
    return { success: false, error: 'Language code must be 2 to 5 characters long.' };
  }
  
  return { success: true, data: lang.toLowerCase() };
}
