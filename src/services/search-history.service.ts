import { storage } from '../utils/storage';
import { SEARCH_CONSTANTS } from '../features/search/utils/constants';
import type { SearchHistoryItem } from '../features/search/types';
import type { Location } from '../types/weather';

export class SearchHistoryService {
  /**
   * Retrieves the current search history.
   */
  static getHistory(): SearchHistoryItem[] {
    const history = storage.get<SearchHistoryItem[]>(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY, []);
    return Array.isArray(history) ? history : [];
  }

  /**
   * Adds a new search to the history. Removes duplicates and enforces the maximum limit.
   * Returns the updated history array.
   */
  static addSearch(location: Location): SearchHistoryItem[] {
    const current = this.getHistory();
    const id = `${location.lat.toFixed(4)}-${location.lon.toFixed(4)}`;
    
    // Remove if it already exists to avoid duplicates
    const filtered = current.filter((item) => item.id !== id);
    
    const newItem: SearchHistoryItem = {
      ...location,
      id,
      timestamp: Date.now(),
    };

    // Add to beginning, respect max length
    const updated = [newItem, ...filtered].slice(0, SEARCH_CONSTANTS.MAX_RECENT_SEARCHES);
    
    storage.set(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY, updated);
    return updated;
  }

  /**
   * Removes a specific search by its ID.
   * Returns the updated history array.
   */
  static removeSearch(id: string): SearchHistoryItem[] {
    const current = this.getHistory();
    const updated = current.filter((item) => item.id !== id);
    storage.set(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY, updated);
    return updated;
  }

  /**
   * Clears the entire search history.
   */
  static clearHistory(): void {
    storage.remove(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY);
  }
}
