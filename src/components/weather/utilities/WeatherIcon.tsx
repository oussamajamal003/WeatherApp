import { WEATHER_ICONS } from '../../../constants/weather-icons';
import type { WeatherCondition } from '../../../types/weather';
import { cn } from '../../../utils/cn';

export interface WeatherIconProps extends React.SVGProps<SVGSVGElement> {
  condition: WeatherCondition;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function WeatherIcon({ condition, size = 'md', className, ...props }: WeatherIconProps) {
  const Icon = WEATHER_ICONS[condition];
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Basic color mapping based on condition (can be overridden via className)
  const colorMap: Record<WeatherCondition, string> = {
    sunny: 'text-amber-500',
    clear: 'text-blue-300',
    partlyCloudy: 'text-amber-500/80',
    cloudy: 'text-muted',
    overcast: 'text-muted',
    rain: 'text-blue-500',
    drizzle: 'text-blue-400',
    thunderstorm: 'text-purple-500',
    snow: 'text-blue-200',
    mist: 'text-muted-foreground',
    fog: 'text-muted-foreground',
    haze: 'text-amber-500/50',
  };

  return (
    <Icon 
      className={cn(sizeClasses[size], colorMap[condition], className)} 
      {...props} 
    />
  );
}
