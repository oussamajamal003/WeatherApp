
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatVisibility } from '../../../utils/formatters/weather';

export interface VisibilityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function Visibility({ value, isLoading, ...props }: VisibilityProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.visibility}
      label="Visibility"
      value={value !== undefined ? formatVisibility(value) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
