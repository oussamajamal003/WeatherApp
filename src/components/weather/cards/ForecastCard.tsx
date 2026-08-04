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
  type?: 'hourly' | 'daily' | 'default';
}

export const ForecastCard = React.forwardRef<HTMLDivElement, ForecastCardProps>(
  ({ title, icon, isLoading, error, type = 'default', children, className, ...props }, ref) => {
    return (
      <Card ref={ref} variant="glass" interactive className={cn('w-full', className)} {...props}>
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
            type === 'hourly' ? (
              <div className="flex overflow-hidden pb-2 gap-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex flex-col items-center justify-center gap-4 min-w-[64px] shrink-0">
                    <Skeleton className="h-4 w-12" />
                    <div className="flex flex-col items-center gap-1">
                      <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-8" />
                  </div>
                ))}
              </div>
            ) : type === 'daily' ? (
              <div className="flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-8 w-8 rounded-full mx-auto" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-5 w-8" />
                      <Skeleton className="h-5 w-8 opacity-60" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full opacity-75" />
                <Skeleton className="h-12 w-full opacity-50" />
              </div>
            )
          ) : (
            <div className="animate-in fade-in duration-500">{children}</div>
          )}
        </CardContent>
      </Card>
    );
  }
);

ForecastCard.displayName = 'ForecastCard';
