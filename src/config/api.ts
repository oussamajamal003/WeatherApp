import { env } from './env';

/**
 * Centralized API configuration.
 */
export const API_CONFIG = {
  // Base URLs mapped from validated environment variables
  BASE_URL: env.OPENWEATHER_BASE_URL,
  GEO_URL: env.OPENWEATHER_GEO_URL,
  
  // Timeout in milliseconds (e.g., 10 seconds)
  TIMEOUT: 10000,
  
  // Default API parameters
  DEFAULT_PARAMS: {
    appid: env.OPENWEATHER_API_KEY,
    units: 'metric', // Can be 'standard', 'metric', or 'imperial'
    lang: 'en',
  },
  
  // Rate limiting boundaries (for potential future client-side throttling)
  RATE_LIMITS: {
    MAX_REQUESTS_PER_MINUTE: 60,
  }
} as const;
