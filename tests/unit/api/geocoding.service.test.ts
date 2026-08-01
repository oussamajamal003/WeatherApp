import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeocodingService } from '../../../src/api/geocoding.service';
import { geoApiClient } from '../../../src/api/client';
import { ValidationError } from '../../../src/api/errors';
import { API_ENDPOINTS } from '../../../src/api/endpoints';

vi.mock('../../../src/api/client', () => ({
  geoApiClient: {
    get: vi.fn(),
  },
}));

describe('GeocodingService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCoordinatesByLocationName', () => {
    it('returns formatted locations on success', async () => {
      const mockResponse = {
        data: [
          {
            name: 'London',
            local_names: { en: 'London' },
            lat: 51.5074,
            lon: -0.1278,
            country: 'GB',
            state: 'England',
          },
        ],
      };

      vi.mocked(geoApiClient.get).mockResolvedValue(mockResponse);

      const result = await GeocodingService.getCoordinatesByLocationName('London');
      
      expect(geoApiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.directGeocoding, {
        params: { q: 'London', limit: 5 },
      });
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        name: 'London',
        localNames: { en: 'London' },
        lat: 51.5074,
        lon: -0.1278,
        country: 'GB',
        state: 'England',
      });
    });

    it('throws ValidationError for empty city name', async () => {
      await expect(GeocodingService.getCoordinatesByLocationName('')).rejects.toThrow(ValidationError);
      await expect(GeocodingService.getCoordinatesByLocationName(' ')).rejects.toThrow(ValidationError);
      expect(geoApiClient.get).not.toHaveBeenCalled();
    });
  });

  describe('getLocationNameByCoordinates', () => {
    it('returns formatted locations on success', async () => {
      const mockResponse = {
        data: [
          {
            name: 'London',
            lat: 51.5074,
            lon: -0.1278,
            country: 'GB',
          },
        ],
      };

      vi.mocked(geoApiClient.get).mockResolvedValue(mockResponse);

      const result = await GeocodingService.getLocationNameByCoordinates(51.5074, -0.1278);
      
      expect(geoApiClient.get).toHaveBeenCalledWith(API_ENDPOINTS.reverseGeocoding, {
        params: { lat: 51.5074, lon: -0.1278, limit: 1 },
      });
      expect(result[0].name).toBe('London');
    });

    it('throws ValidationError for invalid coordinates', async () => {
      await expect(GeocodingService.getLocationNameByCoordinates(91, 0)).rejects.toThrow(ValidationError);
      await expect(GeocodingService.getLocationNameByCoordinates(0, 181)).rejects.toThrow(ValidationError);
      expect(geoApiClient.get).not.toHaveBeenCalled();
    });
  });
});
