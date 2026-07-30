import * as React from 'react';
import { cn } from '../../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, isInvalid, ...props }, ref) => {
    return (
      <div className="relative inline-block w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-subtle pointer-events-none flex items-center justify-center w-4 h-4">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-subtle',
            'hover:border-border-hover', // Ensure this exists in theme, or just use border-foreground/30
            'focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-disabled',
            icon && 'pl-9',
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
      className={cn('text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)}
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
      className={cn('text-[13px] text-subtle', isInvalid && 'text-destructive', className)}
      {...props}
    />
  )
);
HelperText.displayName = 'HelperText';
