import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

import { useCurrentWeather } from '../../../src/api/hooks/use-current-weather';
import { useForecast } from '../../../src/api/hooks/use-forecast';
import { WeatherService } from '../../../src/api/weather.service';
import type { WeatherData } from '../../../src/types/weather';
import { SettingsProvider } from '../../../src/context/SettingsContext';

// Mock the services
vi.mock('../../../src/api/weather.service.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../../src/api/weather.service.ts')>();
  return {
    ...actual,
    WeatherService: {
      getCurrentWeather: vi.fn(),
      getForecast: vi.fn(),
    },
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <SettingsProvider>
        {children}
      </SettingsProvider>
    </QueryClientProvider>
  );
  return Wrapper;
};

describe('API Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useCurrentWeather fetches and returns data', async () => {
    const mockData: Partial<WeatherData> = {
      temperature: 20,
      condition: 'clear',
    };
    
    vi.mocked(WeatherService.getCurrentWeather).mockResolvedValue(mockData as WeatherData);

    const { result } = renderHook(() => useCurrentWeather({ lat: 10, lon: 20 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(WeatherService.getCurrentWeather).toHaveBeenCalledWith({ lat: 10, lon: 20, units: 'metric', lang: 'en' });
  });

  it('useForecast fetches and transforms data', async () => {
    const mockRawData = {
      list: [
        {
          dt: 1700000000,
          dt_txt: '2023-11-15 12:00:00',
          main: { temp: 15, temp_max: 16, temp_min: 10 },
          weather: [{ main: 'Clouds', description: 'few clouds' }],
          pop: 0.2,
        }
      ]
    };
    
    // @ts-expect-error mocking partial raw response
    vi.mocked(WeatherService.getForecast).mockResolvedValue(mockRawData);

    const { result } = renderHook(() => useForecast({ lat: 10, lon: 20 }), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.hourly).toHaveLength(1);
    expect(result.current.data?.daily).toHaveLength(1);
    expect(result.current.data?.daily[0].highTemp).toBe(16);
    expect(WeatherService.getForecast).toHaveBeenCalledWith({ lat: 10, lon: 20, units: 'metric', lang: 'en' });
  });
});
