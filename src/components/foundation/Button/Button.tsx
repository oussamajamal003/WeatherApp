import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';
import { Spinner } from '../Spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-transparent hover:bg-surface hover:text-foreground',
        ghost: 'hover:bg-surface hover:text-foreground',
      },
      size: {
        sm: 'h-8 px-3 text-[13px] gap-[6px]',
        md: 'h-10 px-4 text-[14px] gap-[8px]',
        lg: 'h-12 px-6 text-[15px] gap-[8px]',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-disabled={isLoading || props.disabled}
        data-loading={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Spinner
              size={size === 'lg' ? 'md' : 'sm'}
              variant={variant === 'primary' || variant === 'destructive' ? 'white' : 'primary'}
              className="mr-2"
            />
            <span aria-hidden="true" className="opacity-0">
              {children}
            </span>
            <span className="sr-only">Loading</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';
