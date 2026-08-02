import { Link } from 'react-router-dom';
import { useGeolocation } from '../hooks/use-geolocation';
import { useFavorites } from '../hooks/use-favorites';
import { useActiveLocation } from '../hooks/use-active-location';
import { StartupLocationService } from '../services/startup-location.service';
import { SearchPage } from '../features/search/SearchPage';
import { 
  WeatherCard, 
  ForecastCard, 
  HourlyForecastCard, 
  DailyForecastCard,
  UVIndex, 
  Sunrise, 
  Sunset, 
  Wind, 
  Humidity, 
  FeelsLike, 
  Pressure, 
  Visibility, 
  AirQuality, 
  MoonPhase
} from '../components/weather';
import { Card, CardContent } from '../components/foundation/Card/Card';
import { useCurrentWeather } from '../api/hooks/use-current-weather';
import { useForecast } from '../api/hooks/use-forecast';
import { MapPin, Loader2 } from 'lucide-react';
import type { Coordinates } from '../types/geolocation';

function WeatherDashboard({ coordinates }: { coordinates: Coordinates }) {
  const { data: currentWeather, isPending: isWeatherLoading, error: weatherError } = useCurrentWeather({
    lat: coordinates.lat,
    lon: coordinates.lon,
  });

  const { data: forecast, isPending: isForecastLoading, error: forecastError } = useForecast({
    lat: coordinates.lat,
    lon: coordinates.lon,
    units: 'metric',
  });

  console.log('[WeatherDashboard] Render:', {
    isWeatherLoading,
    weatherError: !!weatherError,
    hasWeather: !!currentWeather,
    isForecastLoading,
    forecastError: !!forecastError,
    hasForecast: !!forecast,
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      {/* Hero Section */}
      <section aria-label="Current Weather">
        <WeatherCard 
          data={currentWeather}
          isLoading={isWeatherLoading}
          error={weatherError}
          size="lg" 
          variant="glass" 
          className="w-full"
        />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main forecasts) */}
        <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-2">
          
          {/* Hourly Forecast */}
          <section aria-label="Hourly Forecast">
            <ForecastCard title="Hourly Forecast" isLoading={isForecastLoading} error={forecastError}>
              {forecast?.hourly && forecast.hourly.length > 0 && (
                <div className="flex overflow-x-auto pb-2 gap-6 scrollbar-hide snap-x">
                  {forecast.hourly.map((hour, index) => (
                    <div key={index} className="snap-start shrink-0">
                      <HourlyForecastCard data={hour} />
                    </div>
                  ))}
                </div>
              )}
            </ForecastCard>
          </section>
          
          {/* Daily Forecast */}
          <section aria-label="5-Day Forecast">
            <ForecastCard title="5-Day Forecast" isLoading={isForecastLoading} error={forecastError}>
              {forecast?.daily && forecast.daily.length > 0 && (
                <div className="flex flex-col gap-2">
                  {forecast.daily.map((day, index) => (
                    <div key={index}>
                      <DailyForecastCard data={day} isToday={index === 0} />
                      {index < forecast.daily.length - 1 && (
                        <hr className="border-border/50 my-1" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ForecastCard>
          </section>

        </div>

        {/* Right Column (Metrics Grid) */}
        <div className="flex flex-col gap-6 md:col-span-1 lg:col-span-1">
          <section aria-label="Weather Details" className="grid grid-cols-2 gap-4">
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <FeelsLike value={currentWeather?.feelsLike} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <UVIndex value={currentWeather?.uvIndex} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Wind speed={currentWeather?.windSpeed} direction={currentWeather?.windDirection} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Humidity value={currentWeather?.humidity} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Visibility value={currentWeather?.visibility} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact">
              <CardContent className="h-full flex flex-col justify-center">
                <Pressure value={currentWeather?.pressure} size="md" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-col justify-center">
                <AirQuality value={currentWeather?.airQuality} size="md" orientation="horizontal" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-row items-center justify-between">
                <Sunrise time={currentWeather?.sunrise} size="sm" isLoading={isWeatherLoading} />
                <Sunset time={currentWeather?.sunset} size="sm" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
            <Card variant="glass" padding="compact" className="col-span-2">
              <CardContent className="h-full flex flex-col justify-center">
                <MoonPhase phase={currentWeather?.moonPhase} size="md" orientation="horizontal" isLoading={isWeatherLoading} />
              </CardContent>
            </Card>
          </section>
        </div>
        
      </div>
    </div>
  );
}

export function Home() {
  const { coordinates: geoCoordinates, permissionStatus: geoPermissionStatus, isLoading: isGeoLoading, error: geoError, requestLocation } = useGeolocation();
  const { data: favorites = [] } = useFavorites();
  const { data: activeLocation = null } = useActiveLocation();
  
  const firstFavorite = favorites.length > 0 ? favorites[0] : null;

  const resolution = StartupLocationService.resolve({
    activeLocation,
    geoCoordinates,
    isGeoLoading,
    geoError,
    geoPermissionStatus,
    firstFavorite,
  });

  if (resolution.type === 'active-location' || resolution.type === 'geolocation' || resolution.type === 'favorite') {
    if (resolution.location) {
      return <WeatherDashboard coordinates={{ lat: resolution.location.lat, lon: resolution.location.lon }} />;
    }
  }

  if (resolution.type === 'loading-geolocation') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4 animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <MapPin className="w-8 h-8" />
        </div>
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-h3 font-display">Local Weather</h1>
          <p className="text-body text-muted-foreground">
            WeatherApp uses your location to provide accurate, real-time weather forecasts for your area.
          </p>
        </div>
        <div className="flex items-center gap-3 text-primary mt-4">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Locating...</span>
        </div>
      </div>
    );
  }

  if (resolution.type === 'error-geolocation') {
    return (
      <div className="flex flex-col w-full animate-in fade-in duration-500 gap-8">
        <div className="max-w-3xl mx-auto w-full px-4 pt-8 flex flex-col gap-4">
          <div className="bg-secondary/50 rounded-xl p-6 flex flex-col md:flex-row items-center gap-4 text-center md:text-left border border-border">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-body font-medium text-text mb-1">
                {geoPermissionStatus === 'denied' ? 'Location Access Blocked' : 'Location Error'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {geoPermissionStatus === 'denied' 
                  ? 'To use your current location, please enable Location permission for this site in your browser settings.'
                  : geoError?.message || 'Unable to retrieve your location.'}
              </p>
            </div>
            <button
              onClick={requestLocation}
              disabled={isGeoLoading}
              className="mt-4 md:mt-0 whitespace-nowrap bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-5 py-2.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Retry Location
            </button>
          </div>
        </div>
        <SearchPage />
      </div>
    );
  }

  if (resolution.type === 'welcome') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4 animate-in fade-in duration-500">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <MapPin className="w-8 h-8" />
        </div>
        
        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="text-h3 font-display">Local Weather</h1>
          <p className="text-body text-muted-foreground">
            WeatherApp uses your location to provide accurate, real-time weather forecasts for your area.
          </p>
        </div>
  
        <div className="flex flex-col items-center gap-4 mt-4 w-full max-w-xs">
          <button
            onClick={requestLocation}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Use My Location
          </button>
          
          <span className="text-sm text-muted-foreground uppercase tracking-wider">or</span>
          
          <Link
            to="/search"
            className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium px-6 py-3 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring text-center"
          >
            Search Manually
          </Link>
        </div>
      </div>
    );
  }

  // Fallback (resolution.type === 'search')
  return <SearchPage />;
}
