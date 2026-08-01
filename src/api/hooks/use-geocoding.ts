import { useQuery } from '@tanstack/react-query';
import { GeocodingService } from '../geocoding.service';
import { QUERY_KEYS } from '../query-keys';

export function useDirectGeocoding(query: string, limit?: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.geocode(query),
    queryFn: () => GeocodingService.getCoordinatesByLocationName(query, limit),
    enabled: Boolean(query) && (options?.enabled ?? true),
  });
}

export function useReverseGeocoding(lat: number, lon: number, limit?: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.reverseGeocode(lat, lon),
    queryFn: () => GeocodingService.getLocationNameByCoordinates(lat, lon, limit),
    enabled: options?.enabled ?? true,
  });
}
