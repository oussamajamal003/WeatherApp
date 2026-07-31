
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface SunsetProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time: string;
}

export function Sunset({ time, ...props }: SunsetProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.sunset}
      label="Sunset"
      value={time}
      {...props}
    />
  );
}
