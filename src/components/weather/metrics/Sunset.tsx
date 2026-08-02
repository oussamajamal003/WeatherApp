
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTime } from '../../../utils/formatters/weather';

export interface SunsetProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time?: string;
  isLoading?: boolean;
}

export function Sunset({ time, isLoading, ...props }: SunsetProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.sunset}
      label="Sunset"
      value={time ? formatTime(time) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
