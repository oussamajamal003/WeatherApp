import { storage } from '../utils/storage';
import type { Location } from '../types/weather';
import type { FavoriteLocation } from '../types/favorites';

export const FAVORITES_STORAGE_KEY = 'weatherapp_favorites';

export class FavoritesService {
  /**
   * Generates a stable ID for a location based on coordinates
   */
  static generateId(lat: number, lon: number): string {
    return `${lat.toFixed(4)}-${lon.toFixed(4)}`;
  }

  /**
   * Retrieves the current list of favorites.
   */
  static getFavorites(): FavoriteLocation[] {
    const favorites = storage.get<FavoriteLocation[]>(FAVORITES_STORAGE_KEY, []);
    return Array.isArray(favorites) ? favorites : [];
  }

  /**
   * Adds a new location to favorites. Prevents duplicates.
   * Returns the updated favorites array.
   */
  static addFavorite(location: Location): FavoriteLocation[] {
    const current = this.getFavorites();
    const id = this.generateId(location.lat, location.lon);
    
    // Prevent duplicate entries
    if (current.some(fav => fav.id === id)) {
      return current;
    }
    
    const newFavorite: FavoriteLocation = {
      ...location,
      id,
      addedAt: Date.now(),
    };

    // Add to the beginning of the list
    const updated = [newFavorite, ...current];
    storage.set(FAVORITES_STORAGE_KEY, updated);
    return updated;
  }

  /**
   * Removes a specific favorite by its ID.
   * Returns the updated favorites array.
   */
  static removeFavorite(id: string): FavoriteLocation[] {
    const current = this.getFavorites();
    const updated = current.filter((item) => item.id !== id);
    storage.set(FAVORITES_STORAGE_KEY, updated);
    return updated;
  }

  /**
   * Checks if a specific location ID is currently a favorite.
   */
  static isFavorite(id: string): boolean {
    const current = this.getFavorites();
    return current.some((item) => item.id === id);
  }

  /**
   * Clears all favorites.
   */
  static clearFavorites(): void {
    storage.remove(FAVORITES_STORAGE_KEY);
  }
}
