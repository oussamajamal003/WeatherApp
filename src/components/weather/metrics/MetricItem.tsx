import * as React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { Skeleton } from '../../foundation/Skeleton/Skeleton';

export interface MetricItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: LucideIcon;
  label: string;
  value?: React.ReactNode;
  isLoading?: boolean;
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
}

export const MetricItem = React.memo(function MetricItem({ 
  icon: Icon, 
  label, 
  value, 
  isLoading = false,
  orientation = 'vertical',
  size = 'md',
  className,
  ...props
}: MetricItemProps) {
  
  const isHorizontal = orientation === 'horizontal';
  
  const sizeClasses = {
    sm: {
      icon: 'w-4 h-4',
      label: 'text-caption',
      value: 'text-label',
      gap: isHorizontal ? 'gap-2' : 'gap-1',
    },
    md: {
      icon: 'w-5 h-5',
      label: 'text-small',
      value: 'text-body',
      gap: isHorizontal ? 'gap-3' : 'gap-2',
    },
    lg: {
      icon: 'w-6 h-6',
      label: 'text-body',
      value: 'text-h4',
      gap: isHorizontal ? 'gap-4' : 'gap-3',
    },
  };
  
  const currentSize = sizeClasses[size];

  return (
    <div 
      className={cn(
        'flex',
        isHorizontal ? 'flex-row items-center' : 'flex-col items-start',
        currentSize.gap,
        className
      )}
      {...props}
    >
      <div className={cn(
        'flex items-center text-muted-foreground',
        isHorizontal ? 'gap-2' : 'gap-2 mb-1'
      )}>
        <Icon className={currentSize.icon} aria-hidden="true" />
        <span className={currentSize.label}>{label}</span>
      </div>
      {isLoading ? (
        <Skeleton className={cn('rounded-md', isHorizontal ? 'h-5 w-12' : 'h-7 w-16')} />
      ) : (
        <span className={cn('text-foreground font-medium', currentSize.value)}>
          {value !== undefined && value !== null ? value : 'N/A'}
        </span>
      )}
    </div>
  );
});
