
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface PressureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value: number;
  unit?: string;
}

export function Pressure({ value, unit = 'hPa', ...props }: PressureProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.pressure}
      label="Pressure"
      value={`${Math.round(value)} ${unit}`}
      {...props}
    />
  );
}
