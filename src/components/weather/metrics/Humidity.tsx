
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface HumidityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
}

export function Humidity({ value, ...props }: HumidityProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.humidity}
      label="Humidity"
      value={`${Math.round(value)}%`}
      {...props}
    />
  );
}
