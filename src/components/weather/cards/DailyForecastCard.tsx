import * as React from 'react';
import { WeatherIcon } from '../utilities/WeatherIcon';
import type { DailyForecastData } from '../../../types/weather';
import { cn } from '../../../utils/cn';
import { formatTemperature } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';

export interface DailyForecastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: DailyForecastData;
  isToday?: boolean;
}

export const DailyForecastCard = React.memo(React.forwardRef<HTMLDivElement, DailyForecastCardProps>(
  ({ data, isToday, className, ...props }, ref) => {
    const { settings } = useSettings();
    return (
      <div 
        ref={ref}
        className={cn('flex items-center justify-between w-full py-2', className)}
        {...props}
      >
        <span className="text-body font-medium w-16 text-foreground">
          {isToday ? 'Today' : data.dayName}
        </span>
        
        <div className="flex items-center justify-center gap-2 w-20">
          <WeatherIcon condition={data.condition} size="sm" />
          {data.precipitationProbability > 0 && (
            <span className="text-caption font-medium text-blue-600 dark:text-blue-400 w-8">
              {data.precipitationProbability}%
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 flex-1 justify-end">
          <span className="text-body text-subtle w-8 text-right">
            {formatTemperature(data.lowTemp, settings.temperatureUnit, false)}
          </span>
          {/* Temperature bar placeholder */}
          <div className="h-1.5 w-24 bg-border rounded-full overflow-hidden relative opacity-50">
            <div 
              className="absolute h-full bg-primary/50 rounded-full" 
              style={{ left: '20%', right: '20%' }} // Just mock placement
            />
          </div>
          <span className="text-body font-medium text-foreground w-8 text-right">
            {formatTemperature(data.highTemp, settings.temperatureUnit, false)}
          </span>
        </div>
      </div>
    );
  }
));

DailyForecastCard.displayName = 'DailyForecastCard';
