import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, LocationBadge, WeatherCard, ToggleFavoriteButton } from '../../components/weather';
import { SearchDropdown } from './components/SearchDropdown';
import { useDebounce } from './hooks/useDebounce';
import { useSearchHistory } from './hooks/useSearchHistory';
import { SEARCH_CONSTANTS } from './utils/constants';
import { useDirectGeocoding } from '../../api/hooks/use-geocoding';
import { useCurrentWeather } from '../../api/hooks/use-current-weather';
import { useSetActiveLocation } from '../../hooks/use-active-location';
import { FavoritesSection } from '../favorites';
import { EmptyState } from '../../components/feedback/EmptyState';
import { ErrorState } from '../../components/feedback/ErrorState';
import type { Location } from '../../types/weather';
import { useDocumentTitle } from '../../hooks/use-document-title';
import { useToast } from '../../hooks/useToast';
import { EMPTY_STATE_MESSAGES } from '../../constants/empty-state-messages';
import { TOAST_MESSAGES } from '../../constants/toast-messages';
import { RECOVERY_ACTIONS } from '../../constants/error-messages';

export function SearchPage() {
  useDocumentTitle('WeatherApp | Search');
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [focusedIndex, setFocusedIndex] = React.useState(-1);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  const debouncedQuery = useDebounce(query, SEARCH_CONSTANTS.DEBOUNCE_MS);
  const { history, addSearch, clearHistory } = useSearchHistory();
  const setActiveLocation = useSetActiveLocation();
  const { toast } = useToast();

  const isGeocodingEnabled = isDropdownOpen && debouncedQuery.trim().length >= SEARCH_CONSTANTS.MIN_SEARCH_LENGTH;
  const { data: suggestions, isPending: isGeocodingLoading, isError: isGeocodingError } = useDirectGeocoding(
    debouncedQuery,
    5,
    { enabled: isGeocodingEnabled }
  );

  const { data: weatherData, isPending: isWeatherLoading, isError: isWeatherError, error: weatherError, refetch: refetchWeather } = useCurrentWeather(
    { lat: selectedLocation?.lat ?? 0, lon: selectedLocation?.lon ?? 0 },
    { enabled: !!selectedLocation }
  );

  const handleInputChange = React.useCallback((value: string) => {
    setQuery(value);
    setIsDropdownOpen(true);
    setFocusedIndex(-1);
    if (value.trim().length === 0) {
      setSelectedLocation(null);
    }
  }, []);

  const handleSelectLocation = React.useCallback((location: Location) => {
    setQuery(location.name);
    setIsDropdownOpen(false);
    setSelectedLocation(location);
    addSearch(location);
    setActiveLocation.mutate(location);
  }, [addSearch, setActiveLocation]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || !suggestions || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        handleSelectLocation(suggestions[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleClear = React.useCallback(() => {
    setQuery('');
    setSelectedLocation(null);
    setIsDropdownOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
      <section aria-label="Search Locations" className="relative">
        <h1 className="text-h2 font-display mb-6 text-foreground">Search Locations</h1>
        <SearchBar
          value={query}
          onChange={handleInputChange}
          onClear={handleClear}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => {
            // Delay closing to allow clicks on dropdown items
            setTimeout(() => setIsDropdownOpen(false), 200);
          }}
          placeholder="Search for a city or airport..."
          role="combobox"
          aria-expanded={isDropdownOpen}
          aria-controls="search-suggestions"
          aria-activedescendant={focusedIndex >= 0 ? `suggestion-${focusedIndex}` : undefined}
        />
        <SearchDropdown
          query={debouncedQuery}
          isOpen={isDropdownOpen}
          focusedIndex={focusedIndex}
          suggestions={suggestions}
          isLoading={isGeocodingLoading}
          isError={isGeocodingError}
          onSelect={handleSelectLocation}
          onHover={setFocusedIndex}
        />
      </section>

      {!selectedLocation && (
        <FavoritesSection 
          onSelectFavorite={(location) => {
            handleSelectLocation(location);
            navigate('/');
          }} 
          className="mb-8" 
        />
      )}

      {!selectedLocation && (
        <section aria-label="Recent Searches" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider">
              Recent Searches
            </h2>
            {history.length > 0 && (
              <button
                onClick={() => {
                  clearHistory();
                  toast.info(TOAST_MESSAGES.HISTORY_CLEARED);
                }}
                className="text-small text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          {history.length === 0 ? (
            <EmptyState 
              title={EMPTY_STATE_MESSAGES.SEARCH_HISTORY.TITLE} 
              message={EMPTY_STATE_MESSAGES.SEARCH_HISTORY.MESSAGE} 
            />
          ) : (
            <div className="flex flex-wrap gap-3 mb-8">
              {history.map((item) => (
                <LocationBadge
                  key={item.id}
                  location={`${item.name}${item.country ? `, ${item.country}` : ''}`}
                  onClick={() => handleSelectLocation(item)}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {selectedLocation && (
        <section aria-label="Search Results">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider">
              Results for "{selectedLocation.name}"
            </h2>
            <ToggleFavoriteButton 
              location={selectedLocation} 
              size="sm" 
              onToggle={(isNowFavorite) => {
                if (isNowFavorite) {
                  navigate('/');
                }
              }}
            />
          </div>
          <div className="flex flex-col gap-4" aria-live="polite" aria-busy={isWeatherLoading}>
            {isWeatherLoading && (
              <div className="p-8 text-center text-muted-foreground border border-border rounded-xl">
                Loading weather data...
              </div>
            )}
            {isWeatherError && !weatherData && (
              <ErrorState 
                error={weatherError} 
                isRetrying={isWeatherLoading}
                onRetry={() => refetchWeather()} 
                action={{
                  label: RECOVERY_ACTIONS.CLEAR_SEARCH,
                  onClick: handleClear
                }}
              />
            )}
            {weatherData && (
              <WeatherCard data={weatherData} size="md" variant="solid" />
            )}
          </div>
        </section>
      )}
    </div>
  );
}
