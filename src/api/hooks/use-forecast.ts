import { useQuery } from '@tanstack/react-query';
import { WeatherService } from '../weather.service';
import { QUERY_KEYS } from '../query-keys';
import type { ForecastRequest } from '../../types/api';
import { mapForecastResponse } from '../../mappers/forecast.mapper';

export function useForecast(request: ForecastRequest, options?: { enabled?: boolean }) {
  const { lat, lon, units = 'metric', lang = 'en' } = request;

  return useQuery({
    queryKey: QUERY_KEYS.forecast(lat, lon, units, lang),
    queryFn: () => WeatherService.getForecast({ lat, lon, units, lang }),
    enabled: options?.enabled ?? true,
    select: mapForecastResponse,
  });
}
