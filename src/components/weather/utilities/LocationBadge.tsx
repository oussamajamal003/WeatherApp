import * as React from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '../../foundation/Badge/Badge';
import { cn } from '../../../utils/cn';

export interface LocationBadgeProps extends React.ComponentProps<typeof Badge> {
  location: string;
  isCurrentLocation?: boolean;
}

export function LocationBadge({ 
  location, 
  isCurrentLocation = false, 
  className,
  variant = 'neutral',
  ...props 
}: LocationBadgeProps) {
  return (
    <Badge 
      variant={variant}
      className={cn('gap-2', className)} 
      {...props}
    >
      <MapPin className="w-3.5 h-3.5" />
      <span>{location}</span>
      {isCurrentLocation && (
        <span className="sr-only"> (Current Location)</span>
      )}
    </Badge>
  );
}
