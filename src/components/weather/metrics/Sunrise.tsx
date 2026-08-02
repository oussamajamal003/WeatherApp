import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTime } from '../../../utils/formatters/weather';
import { useTranslation } from 'react-i18next';

export interface SunriseProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time?: string;
  isLoading?: boolean;
}

export function Sunrise({ time, isLoading, ...props }: SunriseProps) {
  const { t } = useTranslation();
  return (
    <MetricItem
      icon={METRIC_ICONS.sunrise}
      label={t('weather.sunrise')}
      value={time ? formatTime(time) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
