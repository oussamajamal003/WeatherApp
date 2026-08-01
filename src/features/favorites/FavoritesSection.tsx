import * as React from 'react';
import { useFavorites } from '../../hooks/use-favorites';
import { FavoriteCard } from '../../components/weather/cards/FavoriteCard';
import type { FavoriteLocation } from '../../types/favorites';
import { cn } from '../../utils/cn';

interface FavoritesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  onSelectFavorite?: (favorite: FavoriteLocation) => void;
  title?: string;
}

export function FavoritesSection({ 
  onSelectFavorite, 
  title = "Favorite Locations",
  className,
  ...props 
}: FavoritesSectionProps) {
  const { data: favorites = [], isLoading } = useFavorites();

  if (!isLoading && favorites.length === 0) {
    return null;
  }

  return (
    <section 
      aria-label="Favorite Locations" 
      className={cn("animate-in fade-in slide-in-from-bottom-4 duration-500", className)}
      {...props}
    >
      <h2 className="text-small font-medium text-muted-foreground uppercase tracking-wider mb-4">
        {title}
      </h2>
      
      {isLoading ? (
        <div className="text-body text-muted-foreground">Loading favorites...</div>
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
