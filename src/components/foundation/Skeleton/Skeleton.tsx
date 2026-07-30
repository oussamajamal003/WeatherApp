import * as React from 'react';
import { cn } from '../../../utils/cn';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('animate-pulse rounded-md bg-subtle/20', className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = 'Skeleton';
