import * as React from 'react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { WeatherIcon } from '../utilities/WeatherIcon';
import { Temperature } from '../metrics/Temperature';
import type { WeatherData } from '../../../types/weather';
import { cn } from '../../../utils/cn';
import { LoadingWeatherCard } from '../status/LoadingWeatherCard';
import { ErrorWeatherCard } from '../status/ErrorWeatherCard';
import { formatDate } from '../../../utils/formatters/weather';

export interface WeatherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data?: WeatherData;
  isLoading?: boolean;
  error?: Error | null;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'glass' | 'solid' | 'minimal';
  selected?: boolean;
  theme?: 'light' | 'dark';
  elevation?: 0 | 1 | 2 | 3;
}


export const WeatherCard = React.forwardRef<HTMLDivElement, WeatherCardProps>(
  ({ data, isLoading, error, size = 'md', variant = 'glass', selected = false, theme, elevation = 2, className, ...props }, ref) => {
    
    // Map size to padding/radius
    const paddingMap = {
      sm: 'compact',
      md: 'standard',
      lg: 'spacious'
    } as const;

    const radiusMap = {
      sm: 'standard', // 16px
      md: 'hero', // 24px (mapped to radius-xl usually but Card has hero)
      lg: 'hero'
    } as const;
    
    // Map variant to foundation variant
    const cardVariant = variant === 'glass' ? 'glass' 
                      : variant === 'minimal' ? 'outlined' 
                      : 'elevated'; // solid -> elevated

    const elevationClass = `shadow-[var(--shadow-elevation-${elevation})]`;

    if (isLoading) {
      return <LoadingWeatherCard size={size} className={className} />;
    }

    if (error) {
      return <ErrorWeatherCard error={error.message} size={size} className={className} onRetry={() => {}} />
    }

    if (!data) return null;

    return (
      <Card
        ref={ref}
        variant={cardVariant}
        padding={paddingMap[size]}
        radius={radiusMap[size]}
        isSelected={selected}
        interactive
        className={cn(
          'flex flex-col justify-between animate-in fade-in duration-500',
          size === 'sm' ? 'min-w-[160px]' : 'min-w-[260px]',
          theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : '',
          elevation > 0 && elevationClass,
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col h-full gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <span className="text-small font-medium text-foreground">{data.locationName}</span>
              {size !== 'sm' && (
                <span className="text-caption text-subtle">Updated {formatDate(data.updatedAt)}</span>
              )}
            </div>
            <WeatherIcon condition={data.condition} size={size === 'sm' ? 'sm' : 'md'} />
          </div>
          
          <div className="flex flex-col mt-auto pt-4">
            <Temperature 
              value={data.temperature} 
              size={size === 'sm' ? 'lg' : 'lg'} 
              className="text-displayL" // override default size for big display
              label="" // hide label for the main temp display
            />
            <span className="text-body text-foreground">{data.description}</span>
            
            {size !== 'sm' && (
              <div className="flex items-center gap-4 mt-4 text-caption text-subtle">
                <span>H: {Math.round(data.temperature + 4)}°</span>
                <span>L: {Math.round(data.temperature - 6)}°</span>
                {data.humidity !== undefined && (
                <span className="ml-auto text-blue-600 dark:text-blue-400 font-medium">💧 {data.humidity}%</span>
              )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

WeatherCard.displayName = 'WeatherCard';
