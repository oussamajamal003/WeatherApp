import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const spinnerVariants = cva('animate-spin', {
  variants: {
    variant: {
      primary: 'text-primary',
      white: 'text-white',
      muted: 'text-subtle',
    },
    size: {
      sm: 'h-4 w-4', // 16px
      md: 'h-6 w-6', // 24px
      lg: 'h-9 w-9', // 36px
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

export function Spinner({ className, variant, size, ...props }: SpinnerProps) {
  // Map sizes to stroke widths per design spec
  const strokeWidth = size === 'sm' ? 1.5 : size === 'lg' ? 2.5 : 2;

  return (
    <Loader2
      className={cn(spinnerVariants({ variant, size, className }))}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...props}
    />
  );
}
