
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { getUvLabel } from '../../../utils/formatters/weather';

export interface UVIndexProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function UVIndex({ value, isLoading, ...props }: UVIndexProps) {
  const formattedValue = value !== undefined ? `${value} - ${getUvLabel(value).label}` : undefined;

  return (
    <MetricItem
      icon={METRIC_ICONS.uvIndex}
      label="UV Index"
      value={formattedValue}
      isLoading={isLoading}
      {...props}
    />
  );
}
