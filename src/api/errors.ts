import { isAxiosError } from 'axios';
import type { APIError as APIErrorType } from '../types/api';
import i18n from '../i18n/config';

/**
 * Base error class for all application errors.
 */
export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly details?: unknown;

  constructor(message: string, code: string, statusCode?: number, details?: unknown) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;

    // Fix prototype chain for extended Error classes in TypeScript
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public toJSON(): APIErrorType {
    return {
      code: this.code,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
    };
  }
}

/**
 * Specific error classes for different failure modes.
 */
class APIError extends AppError {
  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message, 'API_ERROR', statusCode, details);
  }
}

class NetworkError extends AppError {
  constructor(message = i18n.t('errors.networkError', 'Unable to connect. Please check your internet connection and try again.'), details?: unknown) {
    super(message, 'NETWORK_ERROR', undefined, details);
  }
}

class TimeoutError extends AppError {
  constructor(message = 'The request took too long. Please try again later.', details?: unknown) {
    super(message, 'TIMEOUT_ERROR', 408, details);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed.', details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class ConfigurationError extends AppError {
  constructor(message = 'Configuration error.', details?: unknown) {
    super(message, 'CONFIGURATION_ERROR', 500, details);
  }
}

export class GeolocationError extends AppError {
  constructor(message = i18n.t('errors.locationError', 'Geolocation failed.'), details?: unknown) {
    super(message, 'GEOLOCATION_ERROR', 400, details);
  }
}

class OfflineError extends AppError {
  constructor(message = i18n.t('emptyStates.offline', 'You are currently offline. Displayed data is cached and live updates are temporarily unavailable.'), details?: unknown) {
    super(message, 'OFFLINE_ERROR', 0, details);
  }
}

class ClientError extends AppError {
  constructor(message = 'A client-side error occurred.', statusCode = 400, details?: unknown) {
    super(message, 'CLIENT_ERROR', statusCode, details);
  }
}

/**
 * Thrown when an API feature (like UV Index) is not available under the current plan.
 */
export class FeatureUnavailableError extends AppError {
  constructor(message = 'This feature is unavailable with the current API subscription.') {
    super(message, 'FEATURE_UNAVAILABLE');
    this.name = 'FeatureUnavailableError';
  }
}

class AuthenticationError extends AppError {
  constructor(message = 'Invalid API key or unauthorized access.', details?: unknown) {
    super(message, 'AUTHENTICATION_ERROR', 401, details);
  }
}

class AuthorizationError extends AppError {
  constructor(message = 'Access forbidden. You do not have permission for this resource.', details?: unknown) {
    super(message, 'AUTHORIZATION_ERROR', 403, details);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'City not found. Try searching for another city.', details?: unknown) {
    super(message, 'NOT_FOUND', 404, details);
  }
}

class RateLimitError extends AppError {
  constructor(message = 'Rate limit exceeded. Please try again later.', details?: unknown) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429, details);
  }
}

class ServerError extends AppError {
  constructor(message = 'An internal server error occurred.', statusCode = 500, details?: unknown) {
    super(message, 'SERVER_ERROR', statusCode, details);
  }
}

/**
 * Maps raw Axios or generic errors to standardized AppErrors.
 */
export function mapApiError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error; // Already mapped
  }

  if (isAxiosError(error)) {
    if (error.code === 'ECONNABORTED') {
      return new TimeoutError(undefined, error.toJSON());
    }
    
    if (error.code === 'ERR_NETWORK' || !navigator.onLine) {
      if (!navigator.onLine) {
        return new OfflineError(undefined, error.toJSON());
      }
      return new NetworkError(undefined, error.toJSON());
    }

    if (!error.response) {
      return new NetworkError(undefined, error.toJSON());
    }

    const { status, data } = error.response;
    
    // Attempt to extract message from OpenWeather API response format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const apiMessage = (data as any)?.message || error.message;

    switch (status) {
      case 401:
        return new AuthenticationError(apiMessage, data);
      case 403:
        return new AuthorizationError(apiMessage, data);
      case 404:
        return new NotFoundError(undefined, data); // Force default user-friendly message
      case 429:
        return new RateLimitError(undefined, data); // Force default user-friendly message
      default:
        if (status >= 500) {
          return new ServerError(apiMessage, status, data);
        }
        if (status >= 400 && status < 500) {
          return new ClientError(apiMessage, status, data);
        }
        return new APIError(apiMessage, status, data);
    }
  }

  // Handle generic non-axios errors
  const genericMessage = error instanceof Error ? error.message : i18n.t('errors.generic', 'An unexpected error occurred. Please try again.');
  return new AppError(genericMessage, 'UNKNOWN_ERROR', undefined, error);
}
