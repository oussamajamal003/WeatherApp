import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

export const iconButtonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shrink-0 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-border bg-transparent hover:bg-surface hover:text-foreground',
        ghost: 'bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground',
      },
      size: {
        sm: 'w-11 h-11 [&_svg]:w-5 [&_svg]:h-5', // 44px target, 20px icon
        md: 'w-12 h-12 [&_svg]:w-6 [&_svg]:h-6', // 48px target, 24px icon
        lg: 'w-14 h-14 [&_svg]:w-7 [&_svg]:h-7', // 56px target, 28px icon
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'sm',
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = 'IconButton';
