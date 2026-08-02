import * as React from 'react';
import { WeatherIcon } from '../utilities/WeatherIcon';
import type { HourlyForecastData } from '../../../types/weather';
import { cn } from '../../../utils/cn';
import { formatTime, formatTemperature } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';

export interface HourlyForecastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: HourlyForecastData;
}

export const HourlyForecastCard = React.memo(React.forwardRef<HTMLDivElement, HourlyForecastCardProps>(
  ({ data, className, ...props }, ref) => {
    const { settings } = useSettings();
    return (
      <div 
        ref={ref}
        className={cn('flex flex-col items-center justify-center gap-4 min-w-[64px]', className)}
        {...props}
      >
        <span className="text-small font-medium text-foreground">
          {formatTime(data.time.replace(' ', 'T'))}
        </span>
        
        <div className="flex flex-col items-center gap-1">
          <WeatherIcon condition={data.condition} size="md" />
          {data.precipitationProbability > 0 && (
            <span className="text-caption font-medium text-blue-600 dark:text-blue-400">
              {data.precipitationProbability}%
            </span>
          )}
        </div>
        
        <span className="text-body font-semibold text-foreground">
          {formatTemperature(data.temperature, settings.temperatureUnit, false)}
        </span>
      </div>
    );
  }
));

HourlyForecastCard.displayName = 'HourlyForecastCard';
