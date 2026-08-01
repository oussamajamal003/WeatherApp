import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SearchHistoryService } from '../../../src/services/search-history.service';
import { storage } from '../../../src/utils/storage';
import { SEARCH_CONSTANTS } from '../../../src/features/search/utils/constants';
import type { Location } from '../../../src/types/weather';

vi.mock('../../../src/utils/storage', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('SearchHistoryService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2023-01-01'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const loc1: Location = { lat: 10, lon: 20, name: 'London', country: 'UK' };
  const loc2: Location = { lat: 30, lon: 40, name: 'Paris', country: 'FR' };
  const loc1Id = '10.0000-20.0000';
  const loc2Id = '30.0000-40.0000';

  it('getHistory handles missing or corrupted data', () => {
    vi.mocked(storage.get).mockReturnValue(null);
    expect(SearchHistoryService.getHistory()).toEqual([]);

    vi.mocked(storage.get).mockReturnValue({ some: 'garbage' });
    expect(SearchHistoryService.getHistory()).toEqual([]);
  });

  it('addSearch prevents duplicates and brings existing to front', () => {
    const existingHistory = [
      { ...loc2, id: loc2Id, timestamp: 1 },
      { ...loc1, id: loc1Id, timestamp: 2 }
    ];
    vi.mocked(storage.get).mockReturnValue(existingHistory);

    const result = SearchHistoryService.addSearch(loc1);

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(loc1Id);
    expect(result[1].id).toBe(loc2Id);
    expect(result[0].timestamp).toBe(Date.now());
  });

  it('addSearch enforces maximum history size', () => {
    const fullHistory = Array.from({ length: 10 }, (_, i) => ({
      lat: i,
      lon: i,
      name: `City ${i}`,
      country: 'US',
      id: `${i}.0000-${i}.0000`,
      timestamp: i
    }));
    vi.mocked(storage.get).mockReturnValue(fullHistory);

    const newLoc: Location = { lat: 99, lon: 99, name: 'New City', country: 'US' };
    const result = SearchHistoryService.addSearch(newLoc);

    expect(result).toHaveLength(10);
    expect(result[0].name).toBe('New City');
    // The oldest/last item should be dropped
    expect(result.some(item => item.name === 'City 9')).toBe(false);
  });

  it('removeSearch removes a specific search', () => {
    const existingHistory = [
      { ...loc1, id: loc1Id, timestamp: 1 },
      { ...loc2, id: loc2Id, timestamp: 2 }
    ];
    vi.mocked(storage.get).mockReturnValue(existingHistory);

    const result = SearchHistoryService.removeSearch(loc1Id);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(loc2Id);
    expect(storage.set).toHaveBeenCalledWith(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY, result);
  });

  it('clearHistory clears all searches', () => {
    SearchHistoryService.clearHistory();
    expect(storage.remove).toHaveBeenCalledWith(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY);
  });
});
