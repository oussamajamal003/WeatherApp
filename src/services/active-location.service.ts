import { storage } from '../utils/storage';
import type { Location } from '../types/weather';

export const ACTIVE_LOCATION_STORAGE_KEY = 'weatherapp_active_location';

export class ActiveLocationService {
  /**
   * Retrieves the current active location (Last Viewed City).
   */
  static getActiveLocation(): Location | null {
    return storage.get<Location | null>(ACTIVE_LOCATION_STORAGE_KEY, null);
  }

  /**
   * Sets the new active location.
   */
  static setActiveLocation(location: Location): void {
    storage.set(ACTIVE_LOCATION_STORAGE_KEY, location);
  }

  /**
   * Clears the active location.
   */
  static clearActiveLocation(): void {
    storage.remove(ACTIVE_LOCATION_STORAGE_KEY);
  }
}
