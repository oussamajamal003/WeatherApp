/**
 * Core API interfaces and types.
 */

export interface Coordinates {
  lat: number;
  lon: number;
}

export type Units = 'standard' | 'metric' | 'imperial';
export type Language = string;

export interface BaseAPIRequest {
  units?: Units;
  lang?: Language;
}

export interface WeatherRequest extends BaseAPIRequest, Coordinates {}
export interface ForecastRequest extends BaseAPIRequest, Coordinates {}

/**
 * Standardized API Error representation.
 */
export interface APIError {
  code: string;
  message: string;
  statusCode?: number;
  details?: unknown;
}

/**
 * Standardized generic API Response wrapper.
 */
export interface APIResponse<T> {
  data: T;
  meta?: {
    timestamp: number;
    cached?: boolean;
  };
}
