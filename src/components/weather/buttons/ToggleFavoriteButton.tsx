import * as React from 'react';
import { Star } from 'lucide-react';
import { useToggleFavorite, useIsFavorite } from '../../../hooks/use-favorites';
import { FavoritesService } from '../../../services/favorites.service';
import type { Location } from '../../../types/weather';
import { cn } from '../../../utils/cn';

interface ToggleFavoriteButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onToggle'> {
  location: Location;
  size?: 'sm' | 'md' | 'lg';
  onToggle?: (isNowFavorite: boolean) => void;
}

export function ToggleFavoriteButton({ 
  location, 
  size = 'md', 
  className,
  onToggle,
  ...props 
}: ToggleFavoriteButtonProps) {
  const toggleMutation = useToggleFavorite();
  const id = FavoritesService.generateId(location.lat, location.lon);
  const isFavorite = useIsFavorite(id);

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMutation.mutate(location);
    if (onToggle) {
      onToggle(!isFavorite);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={toggleMutation.isPending}
      className={cn(
        'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none p-2',
        isFavorite ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10' : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
        className
      )}
      aria-label={isFavorite ? `Remove ${location.name} from favorites` : `Add ${location.name} to favorites`}
      aria-pressed={isFavorite}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      {...props}
    >
      <Star className={cn(iconSizes[size], isFavorite && 'fill-current')} />
    </button>
  );
}
