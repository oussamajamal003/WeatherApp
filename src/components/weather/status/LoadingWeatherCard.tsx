import * as React from 'react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { Skeleton } from '../../foundation/Skeleton/Skeleton';
import { cn } from '../../../utils/cn';

export interface LoadingWeatherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingWeatherCard = React.forwardRef<HTMLDivElement, LoadingWeatherCardProps>(
  ({ size = 'md', className, ...props }, ref) => {
    const paddingMap = {
      sm: 'compact',
      md: 'standard',
      lg: 'spacious'
    } as const;

    const radiusMap = {
      sm: 'standard',
      md: 'hero',
      lg: 'hero'
    } as const;

    return (
      <Card
        ref={ref}
        variant="glass"
        padding={paddingMap[size]}
        radius={radiusMap[size]}
        className={cn(
          'flex flex-col justify-between animate-in fade-in duration-500',
          size === 'sm' ? 'min-w-[160px]' : 'min-w-[260px]',
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col h-full gap-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-32" />
              {size !== 'sm' && (
                <Skeleton className="h-3 w-24 opacity-60" />
              )}
            </div>
            <Skeleton className={cn("rounded-full", size === 'sm' ? "w-8 h-8" : "w-12 h-12")} />
          </div>
          
          <div className="flex flex-col mt-auto pt-4 gap-2">
            <Skeleton className="h-16 w-24" />
            <Skeleton className="h-5 w-32 opacity-80" />
            
            {size !== 'sm' && (
              <div className="flex items-center gap-4 mt-4">
                <Skeleton className="h-4 w-16 opacity-60" />
                <Skeleton className="h-4 w-16 opacity-60" />
                <Skeleton className="h-4 w-12 ml-auto opacity-60" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

LoadingWeatherCard.displayName = 'LoadingWeatherCard';
