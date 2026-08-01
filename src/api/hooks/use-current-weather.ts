import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../weather.service';
import { QUERY_KEYS } from '../query-keys';
import type { WeatherRequest } from '../../types/api';

export function useCurrentWeather(request: WeatherRequest, options?: { enabled?: boolean }) {
  const { lat, lon, units = 'metric', lang = 'en' } = request;

  return useQuery({
    queryKey: QUERY_KEYS.weather(lat, lon, units, lang),
    queryFn: () => WeatherService.getCurrentWeather({ lat, lon, units, lang }),
    enabled: options?.enabled ?? true,
    // Provide generic types automatically from the hook return type or explicit overrides if needed,
    // React Query's `useQuery` inherently catches and maps the thrown error correctly to `AppError`.
  });
}
