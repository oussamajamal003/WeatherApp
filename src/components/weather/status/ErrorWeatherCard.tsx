import * as React from 'react';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { cn } from '../../../utils/cn';
import { useTranslation } from 'react-i18next';

export interface ErrorWeatherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  onRetry?: () => void;
}

export const ErrorWeatherCard = React.forwardRef<HTMLDivElement, ErrorWeatherCardProps>(
  ({ error, size = 'md', onRetry, className, ...props }, ref) => {
    const { t } = useTranslation();
    const displayError = error || t('errors.failedLoadWeather');

    return (
      <Card
        ref={ref}
        variant="elevated"
        className={cn(
          'flex flex-col justify-center items-center text-center border-destructive/50 bg-destructive/5',
          size === 'sm' ? 'min-w-[160px] h-[200px]' : 'min-w-[260px] h-[280px]',
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col items-center justify-center h-full gap-4 text-destructive">
          <AlertCircle className="w-10 h-10" />
          <p className="text-small font-medium">{displayError}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-caption font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity mt-2"
            >
              {t('errors.retry')}
            </button>
          )}
        </CardContent>
      </Card>
    );
  }
);

ErrorWeatherCard.displayName = 'ErrorWeatherCard';
