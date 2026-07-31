
import { METRIC_ICONS } from '../../../constants/weather-icons';
import { MetricItem, type MetricItemProps } from './MetricItem';

export interface MoonPhaseProps extends Omit<MetricItemProps, 'icon' | 'label' | 'value'> {
  phase: string;
}

export function MoonPhase({ phase, ...props }: MoonPhaseProps) {
  return (
    <MetricItem
      icon={METRIC_ICONS.moonPhase}
      label="Moon Phase"
      value={phase}
      {...props}
    />
  );
}
