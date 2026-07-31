import * as React from 'react';
import { Navigation } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface LocationIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
}

export function LocationIndicator({ isActive = true, className, ...props }: LocationIndicatorProps) {
  return (
    <div 
      className={cn(
        'flex items-center justify-center rounded-full bg-primary/10 p-2',
        className
      )}
      title="Current Location"
      {...props}
    >
      <Navigation 
        className={cn(
          'w-4 h-4',
          isActive ? 'text-primary fill-primary' : 'text-muted-foreground'
        )} 
      />
    </div>
  );
}
