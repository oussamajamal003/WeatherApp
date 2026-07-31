import * as React from 'react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { Skeleton } from '../../foundation/Skeleton/Skeleton';
import { Spinner } from '../../foundation/Spinner/Spinner';
import { cn } from '../../../utils/cn';

export interface LoadingWeatherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingWeatherCard = React.forwardRef<HTMLDivElement, LoadingWeatherCardProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="glass"
        className={cn(
          'flex flex-col justify-center items-center gap-4 relative',
          size === 'sm' ? 'min-w-[160px] h-[200px]' : 'min-w-[260px] h-[280px]',
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col items-center justify-center h-full w-full opacity-50">
          <Spinner size="lg" variant="muted" className="mb-4" />
          <Skeleton className="w-3/4 h-8 mb-2" />
          <Skeleton className="w-1/2 h-4" />
        </CardContent>
      </Card>
    );
  }
);

LoadingWeatherCard.displayName = 'LoadingWeatherCard';
