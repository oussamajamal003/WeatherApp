import { useQuery } from '@tanstack/react-query';
import { AirQualityService } from '../air-quality.service';
import { QUERY_KEYS } from '../query-keys';

export function useAirQuality(lat: number, lon: number, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.airQuality(lat, lon),
    queryFn: () => AirQualityService.getAirPollution(lat, lon),
    enabled: options?.enabled ?? true,
  });
}
