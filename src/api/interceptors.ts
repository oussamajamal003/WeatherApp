import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { mapApiError } from './errors';
import { API_CONFIG } from '../config/api';

/**
 * Attaches request and response interceptors to an Axios instance.
 */
export function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  
  // Request Interceptor
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // Create params object if it doesn't exist
      if (!config.params) {
        config.params = {};
      }

      // Check if the request targets OpenWeather API
      const isWeatherAPI = config.baseURL === API_CONFIG.BASE_URL || config.baseURL === API_CONFIG.GEO_URL;

      // Automatically append the API key to every request targeting the configured weather API
      if (isWeatherAPI && !config.params.appid) {
        config.params.appid = API_CONFIG.DEFAULT_PARAMS.appid;
      }

      return config;
    },
    (error: AxiosError) => {
      // Request configuration errors
      return Promise.reject(mapApiError(error));
    }
  );

  // Response Interceptor
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Return the raw response - Services will parse this into APIResponse<T>
      return response;
    },
    (error: AxiosError | Error | unknown) => {
      // Centralized error mapping
      return Promise.reject(mapApiError(error));
    }
  );

  return axiosInstance;
}
