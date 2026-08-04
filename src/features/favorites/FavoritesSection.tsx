import * as React from 'react';
import { useFavorites } from '../../hooks/use-favorites';
import { FavoriteCard, FavoriteCardSkeleton } from '../../components/weather/cards/FavoriteCard';
import { EmptyState } from '../../components/feedback/EmptyState';
import { useNavigate } from 'react-router-dom';
import type { FavoriteLocation } from '../../types/favorites';
import { cn } from '../../utils/cn';
import { useTranslation } from 'react-i18next';

interface FavoritesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectFavorite?: (favorite: FavoriteLocation) => void;
  onSearchClick?: () => void;
  title?: string;
}

export function FavoritesSection({ 
  onSelectFavorite, 
  onSearchClick,
  title,
  className,
  ...props 
}: FavoritesSectionProps) {
  const { data: favorites = [], isLoading } = useFavorites();
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!isLoading && favorites.length === 0) {
    return (
      <EmptyState 
        title={t('emptyStates.noFavorites')}
        message={t('emptyStates.addFavoritesDesc')}
        action={{
          label: t('emptyStates.searchLocations'),
          onClick: () => {
            if (onSearchClick) {
              onSearchClick();
            } else {
              navigate('/search');
            }
          }
        }}
      />
    );
  }

  const sectionTitle = title || t('navigation.favorites');

  return (
    <section 
      aria-label={sectionTitle} 
      className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", className)}
      {...props}
    >
      <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider mb-4">
        {sectionTitle}
      </h2>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FavoriteCardSkeleton />
          <FavoriteCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <FavoriteCard 
              key={fav.id} 
              favorite={fav} 
              onSelect={onSelectFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
