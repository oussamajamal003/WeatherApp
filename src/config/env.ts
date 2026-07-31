import { ConfigurationError } from '../api/errors';

/**
 * Centralized environment configuration.
 * Validates and exposes environment variables with strict typing.
 * Fails fast during application startup if required secrets are missing.
 */

function requireEnvVar(key: string, value: string | undefined): string {
  if (value === undefined || value === null || value.trim() === '') {
    throw new ConfigurationError(`Missing required environment variable: ${key}`);
  }
  return value;
}

const getEnvConfig = () => {
  return {
    OPENWEATHER_API_KEY: requireEnvVar('VITE_OPENWEATHER_API_KEY', import.meta.env.VITE_OPENWEATHER_API_KEY),
    OPENWEATHER_BASE_URL: requireEnvVar('VITE_OPENWEATHER_BASE_URL', import.meta.env.VITE_OPENWEATHER_BASE_URL),
    OPENWEATHER_GEO_URL: requireEnvVar('VITE_OPENWEATHER_GEO_URL', import.meta.env.VITE_OPENWEATHER_GEO_URL),
  };
};

export const env = getEnvConfig();
