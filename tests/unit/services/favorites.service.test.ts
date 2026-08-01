import { describe, it, expect, beforeEach } from 'vitest';
import { FavoritesService, FAVORITES_STORAGE_KEY } from '../../../src/services/favorites.service';
import { storage } from '../../../src/utils/storage';
import type { Location } from '../../../src/types/weather';

describe('FavoritesService', () => {
  const mockLocation: Location = {
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB'
  };

  const mockLocation2: Location = {
    name: 'Paris',
    lat: 48.8566,
    lon: 2.3522,
    country: 'FR'
  };

  beforeEach(() => {
    storage.remove(FAVORITES_STORAGE_KEY);
  });

  it('should return empty array when no favorites exist', () => {
    expect(FavoritesService.getFavorites()).toEqual([]);
  });

  it('should add a favorite and generate an ID', () => {
    const favorites = FavoritesService.addFavorite(mockLocation);
    expect(favorites).toHaveLength(1);
    expect(favorites[0].name).toBe('London');
    expect(favorites[0].id).toBe('51.5074--0.1278');
    expect(favorites[0].addedAt).toBeDefined();
    
    // Verify persistence
    expect(storage.get(FAVORITES_STORAGE_KEY)).toEqual(favorites);
  });

  it('should not add duplicate favorites', () => {
    FavoritesService.addFavorite(mockLocation);
    const favorites = FavoritesService.addFavorite(mockLocation);
    
    expect(favorites).toHaveLength(1);
  });

  it('should prepend new favorites to the beginning of the list', () => {
    FavoritesService.addFavorite(mockLocation);
    const favorites = FavoritesService.addFavorite(mockLocation2);
    
    expect(favorites).toHaveLength(2);
    expect(favorites[0].name).toBe('Paris');
    expect(favorites[1].name).toBe('London');
  });

  it('should remove a favorite by ID', () => {
    FavoritesService.addFavorite(mockLocation);
    const id = FavoritesService.generateId(mockLocation.lat, mockLocation.lon);
    
    const favorites = FavoritesService.removeFavorite(id);
    expect(favorites).toHaveLength(0);
    expect(storage.get(FAVORITES_STORAGE_KEY)).toEqual([]);
  });

  it('should correctly identify if a location is a favorite', () => {
    const id = FavoritesService.generateId(mockLocation.lat, mockLocation.lon);
    const id2 = FavoritesService.generateId(mockLocation2.lat, mockLocation2.lon);

    FavoritesService.addFavorite(mockLocation);
    
    expect(FavoritesService.isFavorite(id)).toBe(true);
    expect(FavoritesService.isFavorite(id2)).toBe(false);
  });

  it('should clear all favorites', () => {
    FavoritesService.addFavorite(mockLocation);
    FavoritesService.addFavorite(mockLocation2);
    
    FavoritesService.clearFavorites();
    expect(FavoritesService.getFavorites()).toEqual([]);
  });
});
