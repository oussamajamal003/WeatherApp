import * as React from 'react';
import { Star } from 'lucide-react';
import { useToggleFavorite, useIsFavorite } from '../../../hooks/use-favorites';
import { FavoritesService } from '../../../services/favorites.service';
import type { Location } from '../../../types/weather';
import { cn } from '../../../utils/cn';
import { IconButton } from '../../foundation/Button/IconButton';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMutation.mutate(location);
    if (onToggle) {
      onToggle(!isFavorite);
    }
  };

  return (
    <IconButton
      type="button"
      onClick={handleToggle}
      disabled={toggleMutation.isPending}
      size={size}
      className={cn(
        isFavorite 
          ? 'text-yellow-500 hover:text-yellow-600 hover:bg-yellow-500/10' 
          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
        className
      )}
      aria-label={isFavorite ? t('favorites.removeName', { name: location.name }) : t('favorites.addName', { name: location.name })}
      aria-pressed={isFavorite}
      title={isFavorite ? t('favorites.remove') : t('favorites.add')}
      {...props}
    >
      <Star className={cn(isFavorite && 'fill-current')} />
    </IconButton>
  );
}
