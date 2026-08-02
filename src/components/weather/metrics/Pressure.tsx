import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

import { formatPressure } from '../../../utils/formatters/weather';
import { useSettings } from '../../../hooks/use-settings';
import { useTranslation } from 'react-i18next';

export interface PressureProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  value?: number;
  isLoading?: boolean;
}

export function Pressure({ value, isLoading, ...props }: PressureProps) {
  const { settings } = useSettings();
  const { t } = useTranslation();
  
  return (
    <MetricItem
      icon={METRIC_ICONS.pressure}
      label={t('weather.pressure')}
      value={value !== undefined ? formatPressure(value, settings.pressureUnit) : undefined}
      isLoading={isLoading}
      {...props}
    />
  );
}
