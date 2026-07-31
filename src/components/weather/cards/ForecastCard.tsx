import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../foundation/Card/Card';
import { cn } from '../../../utils/cn';

export interface ForecastCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  icon?: React.ReactNode;
}

export const ForecastCard = React.forwardRef<HTMLDivElement, ForecastCardProps>(
  ({ title, icon, children, className, ...props }, ref) => {
    return (
      <Card ref={ref} variant="glass" className={cn('w-full', className)} {...props}>
        <CardHeader className="mb-4">
          <div className="flex items-center gap-2 text-muted-foreground border-b border-border/50 pb-4">
            {icon && <div className="w-4 h-4">{icon}</div>}
            <CardTitle className="text-small font-medium uppercase tracking-wider">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  }
);

ForecastCard.displayName = 'ForecastCard';
