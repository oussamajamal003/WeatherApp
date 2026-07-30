import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const alertVariants = cva(
  'relative flex w-full flex-col py-7 px-8 border-l-[3px] rounded-lg bg-surface shadow-sm [&>svg]:absolute [&>svg]:left-8 [&>svg]:top-8 [&>svg]:text-foreground [&>svg~*]:pl-14',
  {
    variants: {
      variant: {
        info: 'border-l-blue-500 text-foreground [&>svg]:text-blue-500',
        success: 'border-l-green-500 text-foreground [&>svg]:text-green-500',
        warning: 'border-l-amber-500 text-foreground [&>svg]:text-amber-500',
        error: 'border-l-destructive text-foreground [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
);
Alert.displayName = 'Alert';

export const AlertTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn('mb-2 text-small font-medium', className)}
      {...props}
    />
  )
);
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-small text-subtle', className)}
      {...props}
    />
  )
);
AlertDescription.displayName = 'AlertDescription';
