
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface VisibilityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
  unit?: string;
}

export function Visibility({ value, unit = 'km', ...props }: VisibilityProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.visibility}
      label="Visibility"
      value={`${value} ${unit}`}
      {...props}
    />
  );
}
