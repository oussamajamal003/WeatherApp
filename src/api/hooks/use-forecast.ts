import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../weather.service';
import { QUERY_KEYS } from '../query-keys';
import type { ForecastRequest } from '../../types/api';
import { mapForecastResponse } from '../../mappers/forecast.mapper';
import { useSettings } from '../../hooks/use-settings';

export function useForecast(request: ForecastRequest, options?: { enabled?: boolean }) {
  const { lat, lon } = request;
  const { settings } = useSettings();
  const units = 'metric';
  const lang = settings.language;

  return useQuery({
    queryKey: QUERY_KEYS.forecast(lat, lon, units, lang),
    queryFn: () => WeatherService.getForecast({ lat, lon, units, lang }),
    enabled: options?.enabled ?? true,
    select: mapForecastResponse,
  });
}
