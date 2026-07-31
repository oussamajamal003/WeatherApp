import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { setupInterceptors } from './interceptors';

/**
 * The base Axios client for standard OpenWeather API endpoints (e.g. data/2.5).
 */
export const weatherApiClient = setupInterceptors(
  axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
);

/**
 * The Axios client for OpenWeather Geocoding API endpoints (e.g. geo/1.0).
 * OpenWeather has a separate base URL for their Geo API.
 */
export const geoApiClient = setupInterceptors(
  axios.create({
    baseURL: API_CONFIG.GEO_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
);
