import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFavorites, useToggleFavorite, useIsFavorite } from '../../../src/hooks/use-favorites';
import { FavoritesService, FAVORITES_STORAGE_KEY } from '../../../src/services/favorites.service';
import { storage } from '../../../src/utils/storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import type { Location } from '../../../src/types/weather';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockLocation: Location = {
  name: 'London',
  lat: 51.5074,
  lon: -0.1278,
  country: 'GB'
};

describe('use-favorites hooks', () => {
  beforeEach(() => {
    storage.remove(FAVORITES_STORAGE_KEY);
  });

  describe('useFavorites', () => {
    it('should return empty array initially', () => {
      const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() });
      expect(result.current.data).toEqual([]);
    });

    it('should return favorites if they exist in storage', () => {
      FavoritesService.addFavorite(mockLocation);
      const { result } = renderHook(() => useFavorites(), { wrapper: createWrapper() });
      
      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].name).toBe('London');
    });
  });

  describe('useIsFavorite', () => {
    it('should correctly identify favorites', () => {
      const id = FavoritesService.generateId(mockLocation.lat, mockLocation.lon);
      FavoritesService.addFavorite(mockLocation);

      const { result } = renderHook(() => useIsFavorite(id), { wrapper: createWrapper() });
      expect(result.current).toBe(true);
    });

    it('should return false for non-favorites', () => {
      const { result } = renderHook(() => useIsFavorite('unknown-id'), { wrapper: createWrapper() });
      expect(result.current).toBe(false);
    });
  });

  describe('useToggleFavorite', () => {
    it('should add a favorite when toggled if not present', async () => {
      const { result } = renderHook(() => useToggleFavorite(), { wrapper: createWrapper() });
      
      await act(async () => {
        await result.current.mutateAsync(mockLocation);
      });

      const favorites = FavoritesService.getFavorites();
      expect(favorites).toHaveLength(1);
      expect(favorites[0].name).toBe('London');
    });

    it('should remove a favorite when toggled if already present', async () => {
      FavoritesService.addFavorite(mockLocation);
      
      const { result } = renderHook(() => useToggleFavorite(), { wrapper: createWrapper() });
      
      await act(async () => {
        await result.current.mutateAsync(mockLocation);
      });

      const favorites = FavoritesService.getFavorites();
      expect(favorites).toHaveLength(0);
    });
  });
});
