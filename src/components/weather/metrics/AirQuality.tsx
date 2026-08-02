
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { getAqiLabel } from '../../../utils/formatters/weather';

export interface AirQualityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function AirQuality({ value, isLoading, ...props }: AirQualityProps) {
  const formattedValue = value !== undefined ? `${value} - ${getAqiLabel(value).label}` : undefined;
  
  return (
    <MetricItem
      icon={METRIC_ICONS.airQuality}
      label="Air Quality"
      value={formattedValue}
      isLoading={isLoading}
      {...props}
    />
  );
}
