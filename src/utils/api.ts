import type { AxiosResponse } from 'axios';
import type { APIResponse } from '../types/api';

/**
 * Parses a raw Axios response into the standardized APIResponse wrapper.
 */
export function parseApiResponse<T>(response: AxiosResponse<T>): APIResponse<T> {
  return {
    data: response.data,
    meta: {
      timestamp: Date.now(),
      // Custom OpenWeather logic could go here, e.g. checking response headers
      // for cache status if needed.
    },
  };
}

/**
 * Builds a query string from a parameters object.
 * (Primarily useful if making manual fetch requests, though Axios handles this internally).
 */
export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const urlParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      urlParams.append(key, String(value));
    }
  });
  
  const queryString = urlParams.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Normalizes an API URL to ensure there are no double slashes,
 * except for the protocol separator.
 */
export function normalizeUrl(url: string): string {
  return url.replace(/([^:]\/)\/+/g, '$1');
}
