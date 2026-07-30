import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full font-semibold tracking-[0.02em] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        accent: 'bg-accent text-accent-foreground',
        success: 'bg-green-500/15 text-green-700 dark:text-green-400',
        warning: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
        error: 'bg-destructive/15 text-destructive',
        info: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
        neutral: 'bg-surface text-subtle border border-border',
      },
      size: {
        sm: 'py-0.5 px-2 text-[11px]',
        md: 'py-1 px-2.5 text-[12px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props}>
        {dot && (
          <span
            className={cn(
              'mr-1.5 h-[5px] w-[5px] rounded-full',
              // Use current text color for the dot to match the badge foreground
              'bg-current'
            )}
            aria-hidden="true"
          />
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = 'Badge';
