import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';
import { useTranslation } from 'react-i18next';

export interface MoonPhaseProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  phase?: string;
  isLoading?: boolean;
}

export function MoonPhase({ phase, isLoading, ...props }: MoonPhaseProps) {
  const { t } = useTranslation();
  return (
    <MetricItem
      icon={METRIC_ICONS.moonPhase}
      label={t('weather.moonPhase')}
      value={phase !== undefined ? phase : 'Unknown'}
      isLoading={isLoading}
      {...props}
    />
  );
}
