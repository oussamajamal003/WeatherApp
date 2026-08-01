import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ActiveLocationService, ACTIVE_LOCATION_STORAGE_KEY } from '../../../src/services/active-location.service';
import { storage } from '../../../src/utils/storage';

vi.mock('../../../src/utils/storage', () => ({
  storage: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

describe('ActiveLocationService', () => {
  const mockLocation = { name: 'London', lat: 51.5, lon: -0.1, country: 'GB' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retrieve active location from storage', () => {
    vi.mocked(storage.get).mockReturnValue(mockLocation);
    const result = ActiveLocationService.getActiveLocation();
    expect(storage.get).toHaveBeenCalledWith(ACTIVE_LOCATION_STORAGE_KEY, null);
    expect(result).toEqual(mockLocation);
  });

  it('should set active location in storage', () => {
    ActiveLocationService.setActiveLocation(mockLocation);
    expect(storage.set).toHaveBeenCalledWith(ACTIVE_LOCATION_STORAGE_KEY, mockLocation);
  });

  it('should clear active location from storage', () => {
    ActiveLocationService.clearActiveLocation();
    expect(storage.remove).toHaveBeenCalledWith(ACTIVE_LOCATION_STORAGE_KEY);
  });
});
