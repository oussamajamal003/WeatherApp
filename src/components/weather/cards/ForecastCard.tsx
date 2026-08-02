import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../foundation/Card/Card';
import { cn } from '../../../utils/cn';
import { Skeleton } from '../../foundation/Skeleton/Skeleton';
import { ErrorWeatherCard } from '../status/ErrorWeatherCard';

export interface ForecastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
  isLoading?: boolean;
  error?: Error | null;
}

export const ForecastCard = React.forwardRef<HTMLDivElement, ForecastCardProps>(
  ({ title, icon, isLoading, error, children, className, ...props }, ref) => {
    return (
      <Card ref={ref} variant="glass" className={cn('w-full', className)} {...props}>
        <CardHeader className="mb-4">
          <div className="flex items-center gap-2 text-muted-foreground border-b border-border/50 pb-4">
            {icon && <div className="w-4 h-4">{icon}</div>}
            <CardTitle className="text-small font-medium uppercase tracking-wider">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="py-4">
              <ErrorWeatherCard error={error.message} size="md" className="border-none shadow-none bg-transparent h-auto p-0" onRetry={() => {}} />
            </div>
          ) : isLoading ? (
            <div className="flex flex-col gap-4 py-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full opacity-75" />
              <Skeleton className="h-12 w-full opacity-50" />
            </div>
          ) : (
            children
          )}
        </CardContent>
      </Card>
    );
  }
);

ForecastCard.displayName = 'ForecastCard';
