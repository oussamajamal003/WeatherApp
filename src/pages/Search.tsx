import * as React from 'react';
import { SearchBar, LocationBadge, WeatherCard } from '../components/weather';
import { mockCurrentWeather } from '../mocks/weather';

export function Search() {
  const [query, setQuery] = React.useState('');

  return (
    <div className="flex flex-col gap-8 w-full max-w-3xl mx-auto p-4 md:p-8">
      <section aria-label="Search Locations">
        <h1 className="text-h2 font-display mb-6 text-foreground">Search Locations</h1>
        <SearchBar 
          value={query}
          onChange={setQuery}
          onClear={() => setQuery('')}
          placeholder="Search for a city or airport..."
        />
      </section>

      {!query && (
        <section aria-label="Recent Searches" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Recent Searches
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            <LocationBadge location="London, UK" />
            <LocationBadge location="Tokyo, Japan" />
            <LocationBadge location="Sydney, Australia" />
            <LocationBadge location="Paris, France" />
          </div>

          <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Saved Locations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Reusing WeatherCard compactly to display saved locations */}
            <WeatherCard data={mockCurrentWeather} size="sm" variant="glass" />
            <WeatherCard data={{...mockCurrentWeather, locationName: 'London, UK', temperature: 62}} size="sm" variant="glass" />
            <WeatherCard data={{...mockCurrentWeather, locationName: 'Tokyo, Japan', temperature: 85, condition: 'sunny'}} size="sm" variant="glass" />
          </div>
        </section>
      )}

      {query && (
        <section aria-label="Search Results">
          <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Results for "{query}"
          </h2>
          <div className="flex flex-col gap-4">
             {/* Mock search results */}
            <WeatherCard data={{...mockCurrentWeather, locationName: `${query} City`}} size="md" variant="solid" />
          </div>
        </section>
      )}
    </div>
  );
}
