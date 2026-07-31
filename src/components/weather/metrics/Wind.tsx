
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface WindProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  speed: number;
  direction?: number;
  unit?: string;
}

export function Wind({ speed, direction, unit = 'km/h', ...props }: WindProps) {
  // A simple formatter for demonstration, in a real app you might map direction degrees to N/S/E/W
  const formattedDirection = direction !== undefined ? ` ${direction}°` : '';
  
  return (
    <MetricItem
      icon={METRIC_ICONS.wind}
      label="Wind"
      value={`${Math.round(speed)} ${unit}${formattedDirection}`}
      {...props}
    />
  );
}
