
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface TemperatureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
  unit?: 'C' | 'F';
  label?: string;
}

export function Temperature({ value, unit = 'C', label = 'Temperature', ...props }: TemperatureProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.temperature}
      label={label}
      value={`${Math.round(value)}°${unit}`}
      {...props}
    />
  );
}
