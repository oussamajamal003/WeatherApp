import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed';
  label?: React.ReactNode;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', label, ...props }, ref) => {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn(
            'inline-block w-[1px] min-h-[20px] self-stretch bg-border mx-2',
            variant === 'dashed' && 'border-l border-dashed border-border bg-transparent',
            className
          )}
          {...props}
        />
      );
    }

    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center w-full my-4', className)}
          {...props}
        >
          <div className={cn('flex-grow h-[1px]', variant === 'dashed' ? 'border-t border-dashed border-border' : 'bg-border')} />
          <span className="px-3 text-[11px] font-mono text-subtle tracking-[0.06em] uppercase">
            {label}
          </span>
          <div className={cn('flex-grow h-[1px]', variant === 'dashed' ? 'border-t border-dashed border-border' : 'bg-border')} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'w-full h-[1px] my-4',
          variant === 'dashed' ? 'border-t border-dashed border-border' : 'bg-border',
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
