import React from 'react';
import { SEARCH_CONSTANTS } from '../utils/constants';
import { cn } from '../../../utils/cn';
import { MapPin, Loader2 } from 'lucide-react';
import type { Location } from '../../../types/weather';
import { useTranslation } from 'react-i18next';

export interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  focusedIndex: number;
  suggestions: Location[] | undefined;
  isLoading: boolean;
  isError: boolean;
  onSelect: (location: Location) => void;
  onHover: (index: number) => void;
}

export const SearchDropdown = React.memo(function SearchDropdown({
  query,
  isOpen,
  focusedIndex,
  suggestions,
  isLoading,
  isError,
  onSelect,
  onHover,
}: SearchDropdownProps) {
  const { t } = useTranslation();

  if (!isOpen || query.trim().length < SEARCH_CONSTANTS.MIN_SEARCH_LENGTH) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute z-50 w-full mt-2 py-2 bg-surface border border-border rounded-xl shadow-lg',
        'animate-in fade-in slide-in-from-top-2 duration-200'
      )}
      role="listbox"
      id="search-suggestions"
    >
      {isLoading && (
        <div className="flex items-center justify-center py-6 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
          <span className="text-small">{t('search.searching')}</span>
        </div>
      )}

      {isError && (
        <div className="px-4 py-3 text-small text-destructive">
          {t('search.failedSuggestions')}
        </div>
      )}

      {!isLoading && !isError && suggestions?.length === 0 && (
        <div className="px-4 py-3 text-small text-muted-foreground">
          {t('search.noLocationsFound', { query })}
        </div>
      )}

      {!isLoading && !isError && suggestions && suggestions.length > 0 && (
        <ul className="flex flex-col">
          {suggestions.map((location, index) => {
            const isFocused = index === focusedIndex;
            const locationString = [
              location.name,
              location.state,
              location.country
            ]
              .filter(Boolean)
              .join(', ');

            return (
              <li
                key={`${location.lat}-${location.lon}`}
                role="option"
                aria-selected={isFocused}
                id={`suggestion-${index}`}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                  isFocused ? 'bg-surface-hover text-foreground' : 'text-body hover:bg-surface-hover hover:text-foreground'
                )}
                onClick={() => onSelect(location)}
                onMouseEnter={() => onHover(index)}
              >
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="truncate text-base font-medium">{locationString}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
