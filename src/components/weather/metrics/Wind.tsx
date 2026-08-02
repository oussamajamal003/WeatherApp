import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatWindSpeed } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';
import { useTranslation } from 'react-i18next';

export interface WindProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  speed?: number;
  direction?: number;
  isLoading?: boolean;
}

export function Wind({ speed, direction, isLoading, ...props }: WindProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  // A simple formatter for demonstration, in a real app you might map direction degrees to N/S/E/W
  const formattedDirection = direction !== undefined ? ` ${direction}°` : '';
  
  return (
    <MetricItem
      icon={METRIC_ICONS.wind}
      label={t('weather.wind')}
      value={speed !== undefined ? `${formatWindSpeed(speed, settings.windSpeedUnit)}${formattedDirection}` : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
