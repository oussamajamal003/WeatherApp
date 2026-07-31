import * as React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '../../foundation/Button/Button';
import { cn } from '../../../utils/cn';

export interface FavoriteButtonProps extends React.ComponentProps<typeof Button> {
  isFavorite?: boolean;
}

export const FavoriteButton = React.forwardRef<HTMLButtonElement, FavoriteButtonProps>(
  ({ isFavorite = false, className, variant = 'ghost', size = 'sm', ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn('rounded-full aspect-square p-2', className)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        {...props}
      >
        <Heart 
          className={cn(
            'w-5 h-5 transition-colors',
            isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-foreground'
          )} 
        />
      </Button>
    );
  }
);

FavoriteButton.displayName = 'FavoriteButton';
