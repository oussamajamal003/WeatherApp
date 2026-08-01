import { GeolocationError } from '../api/errors';
import type { Coordinates, PermissionStatusState } from '../types/geolocation';

export class GeolocationService {
  /**
   * Promisified wrapper around navigator.geolocation.getCurrentPosition
   */
  static async getCurrentPosition(): Promise<Coordinates> {
    if (!('geolocation' in navigator)) {
      throw new GeolocationError('Geolocation is not supported by this browser.');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          reject(GeolocationService.mapBrowserError(error));
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  /**
   * Helper to check current permission status if supported.
   * Note: Safari does not fully support navigator.permissions.query for geolocation.
   */
  static async checkPermission(): Promise<PermissionStatusState> {
    if (!('permissions' in navigator)) {
      return 'prompt'; // Fallback for unsupported browsers
    }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      return result.state as PermissionStatusState;
    } catch {
      // Some browsers throw an error when querying 'geolocation' permission
      return 'prompt';
    }
  }

  /**
   * Maps browser GeolocationPositionError to our custom GeolocationError
   */
  private static mapBrowserError(error: GeolocationPositionError): GeolocationError {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return new GeolocationError('Location access was denied. Please enable permissions in your browser.', error);
      case error.POSITION_UNAVAILABLE:
        return new GeolocationError('Location information is unavailable.', error);
      case error.TIMEOUT:
        return new GeolocationError('The request to get user location timed out.', error);
      default:
        return new GeolocationError('An unknown error occurred while getting location.', error);
    }
  }
}
