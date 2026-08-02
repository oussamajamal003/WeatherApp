
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatHumidity } from '../../../utils/formatters/weather';

export interface HumidityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function Humidity({ value, isLoading, ...props }: HumidityProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.humidity}
      label="Humidity"
      value={value !== undefined ? formatHumidity(value) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
