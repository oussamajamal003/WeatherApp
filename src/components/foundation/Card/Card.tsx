import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const cardVariants = cva(
  'text-foreground transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary aria-disabled:opacity-50 aria-disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-surface shadow-sm border border-transparent',
        elevated: 'bg-surface shadow-md border border-border/50',
        glass: 'bg-white/40 dark:bg-surface backdrop-blur-md dark:backdrop-blur-none border border-white/20 dark:border-border/50 shadow-sm dark:shadow-md',
        outlined: 'bg-transparent border border-border',
      },
      padding: {
        compact: 'p-8', // 16px
        standard: 'p-12', // 24px
        spacious: 'p-16', // 32px
      },
      radius: {
        compact: 'rounded-lg', // 12px
        standard: 'rounded-xl', // 16px
        hero: 'rounded-2xl', // 24px
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] hover:shadow-md active:scale-[0.98] motion-reduce:transform-none hover:border-primary/50 aria-pressed:border-primary aria-pressed:ring-1 aria-pressed:ring-primary',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'standard',
      radius: 'standard',
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  isDisabled?: boolean;
  isSelected?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, radius, interactive, isDisabled, isSelected, ...props }, ref) => {
    // If it's interactive, we should ideally render a button or add role="button"
    const isClickable = interactive || props.onClick;
    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable && !isDisabled ? 0 : undefined}
        aria-disabled={isDisabled}
        aria-pressed={isClickable ? isSelected : undefined}
        className={cn(cardVariants({ variant, padding, radius, interactive: !!isClickable, className }))}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-3 mb-8', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-h3', className)} {...props} />
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-body text-subtle', className)} {...props} />
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-8 mt-auto', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';
