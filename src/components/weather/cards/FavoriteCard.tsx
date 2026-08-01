import * as React from 'react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { WeatherIcon } from '../utilities/WeatherIcon';
import { Temperature } from '../metrics/Temperature';
import { ToggleFavoriteButton } from '../buttons/ToggleFavoriteButton';
import { useCurrentWeather } from '../../../api/hooks/use-current-weather';
import type { FavoriteLocation } from '../../../types/favorites';
import { cn } from '../../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface FavoriteCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  favorite: FavoriteLocation;
  onSelect?: (favorite: FavoriteLocation) => void;
}

export const FavoriteCard = React.forwardRef<HTMLDivElement, FavoriteCardProps>(
  ({ favorite, onSelect, className, ...props }, ref) => {
    
    // Automatically fetch and maintain fresh weather data for this favorite!
    const { data: weather, isLoading, isError } = useCurrentWeather({
      lat: favorite.lat,
      lon: favorite.lon
    });

    const handleClick = () => {
      if (onSelect) {
        onSelect(favorite);
      }
    };

    return (
      <Card
        ref={ref}
        variant="elevated"
        padding="standard"
        radius="standard"
        interactive={!!onSelect}
        onClick={handleClick}
        className={cn(
          'flex flex-col justify-between min-w-[240px] w-full cursor-pointer relative group',
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col h-full gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1 flex-1 pr-4">
              <span className="text-body font-medium text-foreground line-clamp-1">
                {favorite.name}
              </span>
              <span className="text-caption text-subtle">
                {favorite.country}
              </span>
            </div>
            
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
              <ToggleFavoriteButton location={favorite} size="sm" />
            </div>
          </div>
          
          <div className="flex flex-col mt-auto pt-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : isError || !weather ? (
              <div className="text-caption text-destructive py-2">
                Failed to load weather
              </div>
            ) : (
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <Temperature 
                    value={weather.temperature} 
                    size="md" 
                    className="text-h3 font-display" 
                    label="" 
                  />
                  <span className="text-caption text-foreground capitalize mt-1">
                    {weather.description}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <WeatherIcon condition={weather.condition} size="md" />
                  <span className="text-[10px] text-subtle">
                    Updated {weather.updatedAt}
                  </span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

FavoriteCard.displayName = 'FavoriteCard';
