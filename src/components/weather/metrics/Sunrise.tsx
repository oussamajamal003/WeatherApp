
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface SunriseProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time: string;
}

export function Sunrise({ time, ...props }: SunriseProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.sunrise}
      label="Sunrise"
      value={time}
      {...props}
    />
  );
}
