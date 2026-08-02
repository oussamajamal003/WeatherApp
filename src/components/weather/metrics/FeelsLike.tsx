
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTemperature } from '../../../utils/formatters/weather';

export interface FeelsLikeProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  unit?: 'C' | 'F';
  isLoading?: boolean;
}

export function FeelsLike({ value, unit = 'C', isLoading, ...props }: FeelsLikeProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.feelsLike}
      label="Feels Like"
      value={value !== undefined ? formatTemperature(value, unit) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
