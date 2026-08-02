
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatPressure } from '../../../utils/formatters/weather';

export interface PressureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function Pressure({ value, isLoading, ...props }: PressureProps) {
  // Format pressure using formatter, but keep unit prop if needed, or rely on formatter
  // The formatter defaults to hPa but we can just use the formatter if it's there
  return (
    <MetricItem
      icon={METRIC_ICONS.pressure}
      label="Pressure"
      value={value !== undefined ? formatPressure(value) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
