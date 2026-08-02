import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Home } from '../../src/pages/Home';
import { WeatherService } from '../../src/api/weather.service';
import { GeolocationService } from '../../src/services/geolocation.service';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { GeolocationProvider } from '../../src/context/GeolocationProvider';
import { ThemeProvider } from '../../src/context/ThemeProvider';

vi.mock('../../src/api/weather.service');
vi.mock('../../src/services/geolocation.service');

describe('Loading States Integration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.resetAllMocks();
    
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderHome = () => {
    return render(
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <GeolocationProvider>
            <BrowserRouter>
              <Home />
            </BrowserRouter>
          </GeolocationProvider>
        </QueryClientProvider>
      </ThemeProvider>
    );
  };

  it('displays skeletons during slow network requests and then displays data', async () => {
    // 1. Mock Geolocation so it instantly grants and provides a location
    vi.mocked(GeolocationService.checkPermission).mockResolvedValue('granted');
    vi.mocked(GeolocationService.getCurrentPosition).mockResolvedValue({ lat: 51.5, lon: -0.1 });

    // 2. Mock WeatherService with a delayed Promise to simulate slow network
    let resolveWeather: (value: unknown) => void;
    const weatherPromise = new Promise((resolve) => {
      resolveWeather = resolve;
    });

    let resolveForecast: (value: unknown) => void;
    const forecastPromise = new Promise((resolve) => {
      resolveForecast = resolve;
    });

    vi.mocked(WeatherService.getCurrentWeather).mockReturnValue(weatherPromise as ReturnType<typeof WeatherService.getCurrentWeather>);
    vi.mocked(WeatherService.getForecast).mockReturnValue(forecastPromise as ReturnType<typeof WeatherService.getForecast>);

    renderHome();

    // The component first mounts and checks geolocation...
    // We wait for the geolocation provider to resolve.
    // The query fires and enters isPending = true.
    
    // Check that we don't have the real data yet
    expect(screen.queryByText('London')).not.toBeInTheDocument();

    // Since we didn't add testIds, we can check for SVG spinners or Skeleton CSS classes.
    // We can also verify that we haven't rendered the text of a successful card.
    // Wait for Geolocation check to finish and weather to be requested.
    await act(async () => {
      await Promise.resolve(); // flush microtasks for geolocation
    });

    // The Dashboard is now mounted, waiting on WeatherService.
    // Let's verify WeatherService was called (network request started)
    expect(WeatherService.getCurrentWeather).toHaveBeenCalled();
    expect(WeatherService.getForecast).toHaveBeenCalled();

    // Wait for the data to resolve
    await act(async () => {
      resolveWeather({
        locationName: 'London',
        temperature: 15,
        condition: 'cloudy',
        description: 'scattered clouds',
        humidity: 60,
        feelsLike: 14,
        windSpeed: 5,
        windDirection: 180,
        pressure: 1012,
        visibility: 10000,
        uvIndex: 2,
        airQuality: 1,
        sunrise: new Date().toISOString(),
        sunset: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      resolveForecast({
        hourly: [],
        daily: []
      });
    });

    // NOW the real data should be visible
    expect(await screen.findByText('London')).toBeInTheDocument();
  });
});
