import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FavoritesService } from '../services/favorites.service';
import type { Location } from '../types/weather';
import type { FavoriteLocation } from '../types/favorites';
import { useEffect } from 'react';
import { useToast } from './useToast';
import { useTranslation } from 'react-i18next';

const FAVORITES_QUERY_KEY = ['favorites'];

/**
 * Hook to retrieve the list of favorite locations.
 * Automatically synchronizes with other tabs that modify localStorage.
 */
export function useFavorites() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: FAVORITES_QUERY_KEY,
    queryFn: () => FavoritesService.getFavorites(),
    initialData: () => FavoritesService.getFavorites(), // Load instantly from localStorage
  });

  // Listen to storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'weatherapp_favorites') {
        queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [queryClient]);

  return query;
}

/**
 * Hook to quickly check if a location is a favorite by its ID.
 */
export function useIsFavorite(id: string): boolean {
  const { data: favorites } = useFavorites();
  return favorites?.some(fav => fav.id === id) ?? false;
}

/**
 * Hook to toggle the favorite status of a location.
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (location: Location) => {
      const id = FavoritesService.generateId(location.lat, location.lon);
      if (FavoritesService.isFavorite(id)) {
        return FavoritesService.removeFavorite(id);
      } else {
        return FavoritesService.addFavorite(location);
      }
    },
    onMutate: async (location: Location) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: FAVORITES_QUERY_KEY });
      
      const previousFavorites = queryClient.getQueryData<FavoriteLocation[]>(FAVORITES_QUERY_KEY) || [];
      const id = FavoritesService.generateId(location.lat, location.lon);
      const isFav = previousFavorites.some(f => f.id === id);
      
      const nextFavorites = isFav
        ? previousFavorites.filter(f => f.id !== id)
        : [{ ...location, id, favoritedAt: Date.now() }, ...previousFavorites];
        
      queryClient.setQueryData(FAVORITES_QUERY_KEY, nextFavorites);
      
      return { previousFavorites };
    },
    onError: (_err, _location, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(FAVORITES_QUERY_KEY, context.previousFavorites);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FAVORITES_QUERY_KEY });
    },
    onSuccess: (_, location) => {
      const id = FavoritesService.generateId(location.lat, location.lon);
      const isFav = FavoritesService.isFavorite(id);
      if (isFav) {
        toast.success(t('toasts.addedFavorite', { name: location.name }));
      } else {
        toast.success(t('toasts.removedFavorite', { name: location.name }));
      }
    }
  });
}
