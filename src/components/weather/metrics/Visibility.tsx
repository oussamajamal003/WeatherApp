import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatVisibility } from '../../../utils/formatters/weather';
import { useTranslation } from 'react-i18next';

export interface VisibilityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function Visibility({ value, isLoading, ...props }: VisibilityProps) {
  const { t } = useTranslation();
  return (
    <MetricItem
      icon={METRIC_ICONS.visibility}
      label={t('weather.visibility')}
      value={value !== undefined ? formatVisibility(value) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
