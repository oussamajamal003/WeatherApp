import * as React from 'react';
import { CloudOff } from 'lucide-react';
import { Card, CardContent } from '../../foundation/Card/Card';
import { cn } from '../../../utils/cn';

export interface EmptyWeatherCardProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EmptyWeatherCard = React.forwardRef<HTMLDivElement, EmptyWeatherCardProps>(
  ({ message = 'No weather data available', size = 'md', className, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant="default"
        className={cn(
          'flex flex-col justify-center items-center text-center',
          size === 'sm' ? 'min-w-[160px] h-[200px]' : 'min-w-[260px] h-[280px]',
          className
        )}
        {...props}
      >
        <CardContent className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
          <CloudOff className="w-12 h-12 opacity-50" />
          <p className="text-body font-medium">{message}</p>
        </CardContent>
      </Card>
    );
  }
);

EmptyWeatherCard.displayName = 'EmptyWeatherCard';
