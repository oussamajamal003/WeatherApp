import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTemperature } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';
import { useTranslation } from 'react-i18next';

export interface FeelsLikeProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function FeelsLike({ value, isLoading, ...props }: FeelsLikeProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  
  return (
    <MetricItem
      icon={METRIC_ICONS.feelsLike}
      label={t('weather.feelsLike')}
      value={value !== undefined ? formatTemperature(value, settings.temperatureUnit) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
