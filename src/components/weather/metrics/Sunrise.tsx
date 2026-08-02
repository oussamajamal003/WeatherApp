
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTime } from '../../../utils/formatters/weather';

export interface SunriseProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time?: string;
  isLoading?: boolean;
}

export function Sunrise({ time, isLoading, ...props }: SunriseProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.sunrise}
      label="Sunrise"
      value={time ? formatTime(time) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
