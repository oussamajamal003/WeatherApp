import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ActiveLocationService, ACTIVE_LOCATION_STORAGE_KEY } from '../services/active-location.service';
import type { Location } from '../types/weather';
import { useEffect } from 'react';

const ACTIVE_LOCATION_QUERY_KEY = ['active-location'];

/**
 * Hook to retrieve the current active location (Last Viewed City).
 * Synchronizes with other tabs that modify localStorage.
 */
export function useActiveLocation() {
  const queryClient = useQueryClient();
  
  const query = useQuery({
    queryKey: ACTIVE_LOCATION_QUERY_KEY,
    queryFn: () => ActiveLocationService.getActiveLocation(),
    initialData: () => ActiveLocationService.getActiveLocation(), // Load instantly from localStorage
  });

  // Listen to storage events from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === ACTIVE_LOCATION_STORAGE_KEY) {
        queryClient.invalidateQueries({ queryKey: ACTIVE_LOCATION_QUERY_KEY });
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [queryClient]);

  return query;
}

/**
 * Hook to update the active location.
 */
export function useSetActiveLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (location: Location) => {
      ActiveLocationService.setActiveLocation(location);
      return location;
    },
    onMutate: async (location: Location) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ACTIVE_LOCATION_QUERY_KEY });
      const previousLocation = queryClient.getQueryData<Location | null>(ACTIVE_LOCATION_QUERY_KEY);
      queryClient.setQueryData(ACTIVE_LOCATION_QUERY_KEY, location);
      return { previousLocation };
    },
    onError: (_err, _location, context) => {
      if (context?.previousLocation !== undefined) {
        queryClient.setQueryData(ACTIVE_LOCATION_QUERY_KEY, context.previousLocation);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ACTIVE_LOCATION_QUERY_KEY });
    }
  });
}

/**
 * Hook to clear the active location (e.g. when explicitly requesting geolocation).
 */
export function useClearActiveLocation() {
  const queryClient = useQueryClient();

  return () => {
    ActiveLocationService.clearActiveLocation();
    queryClient.setQueryData(ACTIVE_LOCATION_QUERY_KEY, null);
  };
}
