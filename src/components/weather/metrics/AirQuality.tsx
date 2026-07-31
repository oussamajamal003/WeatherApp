
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface AirQualityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
}

export function AirQuality({ value, ...props }: AirQualityProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.airQuality}
      label="Air Quality"
      value={value.toString()}
      {...props}
    />
  );
}
