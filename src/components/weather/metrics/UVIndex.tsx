
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface UVIndexProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
}

export function UVIndex({ value, ...props }: UVIndexProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.uvIndex}
      label="UV Index"
      value={value.toString()}
      {...props}
    />
  );
}
