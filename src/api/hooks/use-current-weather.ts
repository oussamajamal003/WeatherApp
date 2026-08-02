import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../weather.service';
import { QUERY_KEYS } from '../query-keys';
import type { WeatherRequest } from '../../types/api';
import { useSettings } from '../../hooks/use-settings';

export function useCurrentWeather(request: WeatherRequest, options?: { enabled?: boolean }) {
  const { lat, lon } = request;
  const { settings } = useSettings();
  const units = 'metric';
  const lang = settings.language;

  return useQuery({
    queryKey: QUERY_KEYS.weather(lat, lon, units, lang),
    queryFn: () => WeatherService.getCurrentWeather({ lat, lon, units, lang }),
    enabled: options?.enabled ?? true,
  });
}
