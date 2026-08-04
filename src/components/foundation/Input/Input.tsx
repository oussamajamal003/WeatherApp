import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconClassName?: string;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, iconClassName, isInvalid, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        {icon && (
          <div className={cn("absolute top-1/2 -translate-y-1/2 text-subtle pointer-events-none flex items-center justify-center", 
            iconClassName || "left-6 w-8 h-8"
          )}>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-20 w-full rounded-md border border-border bg-surface px-6 py-4 text-body text-foreground transition-colors',
            'file:border-0 file:bg-transparent file:text-body file:font-medium',
            'placeholder:text-subtle',
            'hover:border-border-hover',
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-disabled',
            icon && 'pl-20',
            isInvalid && 'border-destructive focus-visible:ring-destructive/15 focus-visible:border-destructive hover:border-destructive',
            className
          )}
          ref={ref}
          aria-invalid={isInvalid}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-label text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

export interface HelperTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  isInvalid?: boolean;
}

export const HelperText = React.forwardRef<HTMLParagraphElement, HelperTextProps>(
  ({ className, isInvalid, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-small text-subtle', isInvalid && 'text-destructive', className)}
      {...props}
    />
  )
);
HelperText.displayName = 'HelperText';
