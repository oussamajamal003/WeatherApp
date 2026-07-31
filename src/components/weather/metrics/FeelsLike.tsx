
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface FeelsLikeProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
  unit?: 'C' | 'F';
}

export function FeelsLike({ value, unit = 'C', ...props }: FeelsLikeProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.feelsLike}
      label="Feels Like"
      value={`${Math.round(value)}°${unit}`}
      {...props}
    />
  );
}
