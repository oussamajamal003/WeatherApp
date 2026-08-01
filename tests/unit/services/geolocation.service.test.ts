import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeolocationService } from '../../../src/services/geolocation.service';
import { GeolocationError } from '../../../src/api/errors';

describe('GeolocationService', () => {
  const mockGeolocation = {
    getCurrentPosition: vi.fn(),
  };

  const mockPermissions = {
    query: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal('navigator', {
      geolocation: mockGeolocation,
      permissions: mockPermissions,
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  describe('getCurrentPosition', () => {
    it('returns coordinates on success', async () => {
      mockGeolocation.getCurrentPosition.mockImplementationOnce((successCallback) => {
        successCallback({
          coords: { latitude: 40.7128, longitude: -74.0060 },
        });
      });

      const result = await GeolocationService.getCurrentPosition();
      expect(result).toEqual({ lat: 40.7128, lon: -74.0060 });
    });

    it('throws GeolocationError on failure', async () => {
      mockGeolocation.getCurrentPosition.mockImplementation((_, errorCallback) => {
        errorCallback({ code: 1, PERMISSION_DENIED: 1 });
      });

      await expect(GeolocationService.getCurrentPosition()).rejects.toThrow(GeolocationError);
      await expect(GeolocationService.getCurrentPosition()).rejects.toThrow('Location access was denied');
    });

    it('throws GeolocationError if navigator.geolocation is unsupported', async () => {
      vi.stubGlobal('navigator', {});
      await expect(GeolocationService.getCurrentPosition()).rejects.toThrow('Geolocation is not supported');
    });
  });

  describe('checkPermission', () => {
    it('returns state if navigator.permissions is supported', async () => {
      mockPermissions.query.mockResolvedValueOnce({ state: 'granted' });
      const status = await GeolocationService.checkPermission();
      expect(status).toBe('granted');
    });

    it('returns prompt if navigator.permissions is unsupported', async () => {
      vi.stubGlobal('navigator', {});
      const status = await GeolocationService.checkPermission();
      expect(status).toBe('prompt');
    });

    it('returns prompt if query throws an error', async () => {
      mockPermissions.query.mockRejectedValueOnce(new Error('Not supported'));
      const status = await GeolocationService.checkPermission();
      expect(status).toBe('prompt');
    });
  });
});
