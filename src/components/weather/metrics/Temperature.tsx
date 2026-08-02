
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTemperature } from '../../../utils/formatters/weather';

export interface TemperatureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  unit?: 'C' | 'F';
  label?: string;
  isLoading?: boolean;
}

export function Temperature({ value, unit = 'C', label = 'Temperature', isLoading, ...props }: TemperatureProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.temperature}
      label={label}
      value={value !== undefined ? formatTemperature(value, unit) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
