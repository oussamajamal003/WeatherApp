import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSearchHistory } from '../../../../src/features/search/hooks/useSearchHistory';
import { storage } from '../../../../src/utils/storage';
import { SEARCH_CONSTANTS } from '../../../../src/features/search/utils/constants';

vi.mock('../../../../src/utils/storage', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('useSearchHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockLocation = { lat: 10, lon: 20, name: 'London', country: 'UK' };

  it('should initialize with history from storage', () => {
    const mockHistory = [{ ...mockLocation, id: '10.0000-20.0000', timestamp: 123 }];
    vi.mocked(storage.get).mockReturnValue(mockHistory);

    const { result } = renderHook(() => useSearchHistory());

    expect(storage.get).toHaveBeenCalledWith(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY, []);
    expect(result.current.history).toEqual(mockHistory);
  });

  it('should add a search item and persist it', () => {
    vi.mocked(storage.get).mockReturnValue([]);
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.addSearch(mockLocation);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0].name).toBe('London');
    expect(storage.set).toHaveBeenCalled();
  });

  it('should clear history', () => {
    const mockHistory = [{ ...mockLocation, id: '10.0000-20.0000', timestamp: 123 }];
    vi.mocked(storage.get).mockReturnValue(mockHistory);
    
    const { result } = renderHook(() => useSearchHistory());

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toHaveLength(0);
    expect(storage.remove).toHaveBeenCalledWith(SEARCH_CONSTANTS.HISTORY_STORAGE_KEY);
  });
});
