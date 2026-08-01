import { describe, it, expect } from 'vitest';
import { StartupLocationService, StartupContext } from '../../../src/services/startup-location.service';

describe('StartupLocationService', () => {
  const mockLocation = { name: 'London', lat: 51.5, lon: -0.1, country: 'GB' };
  const mockFavorite = { name: 'Paris', lat: 48.8, lon: 2.3, country: 'FR' };
  const mockGeo = { name: 'New York', lat: 40.7, lon: -74.0, country: 'US' };

  const defaultContext: StartupContext = {
    activeLocation: null,
    geoCoordinates: null,
    isGeoLoading: false,
    geoError: null,
    geoPermissionStatus: 'prompt',
    firstFavorite: null,
    alwaysUseLocal: false,
  };

  describe('Default Priority (Always use local = false)', () => {
    it('should prioritize Active Location over Geolocation and Favorites', () => {
      const context = {
        ...defaultContext,
        activeLocation: mockLocation,
        geoCoordinates: mockGeo,
        firstFavorite: mockFavorite,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('active-location');
      expect(result.location).toEqual(mockLocation);
    });

    it('should fallback to Geolocation if Active Location is null', () => {
      const context = {
        ...defaultContext,
        geoCoordinates: mockGeo,
        firstFavorite: mockFavorite,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('geolocation');
      expect(result.location).toEqual(mockGeo);
    });

    it('should return loading state if Geolocation is loading', () => {
      const context = {
        ...defaultContext,
        isGeoLoading: true,
        geoPermissionStatus: 'granted' as const,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('loading-geolocation');
    });

    it('should show error state if Geolocation fails and no favorite exists', () => {
      const context = {
        ...defaultContext,
        geoError: new Error('Denied'),
        geoPermissionStatus: 'denied' as const,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('error-geolocation');
    });

    it('should fallback to first favorite if Geolocation fails', () => {
      const context = {
        ...defaultContext,
        geoError: new Error('Denied'),
        geoPermissionStatus: 'denied' as const,
        firstFavorite: mockFavorite,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('favorite');
      expect(result.location).toEqual(mockFavorite);
    });

    it('should show welcome screen if never prompted and no other locations exist', () => {
      const result = StartupLocationService.resolve(defaultContext);
      expect(result.type).toBe('welcome');
    });

    it('should fallback to search if not prompting and no locations exist', () => {
      const context = {
        ...defaultContext,
        geoPermissionStatus: 'granted' as const, // For example, granted but somehow geoCoordinates is null and not loading (edge case)
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('search');
    });
  });

  describe('Future Settings Priority (Always use local = true)', () => {
    it('should prioritize Geolocation over Active Location', () => {
      const context = {
        ...defaultContext,
        alwaysUseLocal: true,
        activeLocation: mockLocation,
        geoCoordinates: mockGeo,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('geolocation');
      expect(result.location).toEqual(mockGeo);
    });

    it('should return loading state if Geolocation is loading', () => {
      const context = {
        ...defaultContext,
        alwaysUseLocal: true,
        activeLocation: mockLocation,
        isGeoLoading: true,
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('loading-geolocation');
    });

    it('should fallback to Active Location if Geolocation is unavailable', () => {
      const context = {
        ...defaultContext,
        alwaysUseLocal: true,
        activeLocation: mockLocation,
        geoError: new Error('Denied'), // geo failed
      };
      const result = StartupLocationService.resolve(context);
      expect(result.type).toBe('active-location');
    });
  });
});
