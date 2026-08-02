import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { getAqiLabel } from '../../../utils/formatters/weather';
import { useTranslation } from 'react-i18next';

export interface AirQualityProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function AirQuality({ value, isLoading, ...props }: AirQualityProps) {
  const { t } = useTranslation();
  const formattedValue = value !== undefined ? `${value} - ${getAqiLabel(value).label}` : undefined;
  
  return (
    <MetricItem
      icon={METRIC_ICONS.airQuality}
      label={t('weather.airQuality')}
      value={formattedValue}
      isLoading={isLoading}
      {...props}
    />
  );
}
