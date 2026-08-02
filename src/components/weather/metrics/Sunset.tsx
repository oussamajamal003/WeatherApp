import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTime } from '../../../utils/formatters/weather';
import { useTranslation } from 'react-i18next';

export interface SunsetProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  time?: string;
  isLoading?: boolean;
}

export function Sunset({ time, isLoading, ...props }: SunsetProps) {
  const { t } = useTranslation();
  return (
    <MetricItem
      icon={METRIC_ICONS.sunset}
      label={t('weather.sunset')}
      value={time ? formatTime(time) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
