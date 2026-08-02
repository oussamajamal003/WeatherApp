
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatTemperature } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';
import { useTranslation } from 'react-i18next';

export interface TemperatureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  label?: string;
  isLoading?: boolean;
}

export function Temperature({ value, label, isLoading, ...props }: TemperatureProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  
  return (
    <MetricItem
      icon={METRIC_ICONS.temperature}
      label={label || t('weather.temperature')}
      value={value !== undefined ? formatTemperature(value, settings.temperatureUnit) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
