import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useGeolocation } from '../../hooks/use-geolocation';
import { useClearActiveLocation } from '../../hooks/use-active-location';
import { IconButton } from '../foundation/Button/IconButton';
import { useTranslation } from 'react-i18next';

export const Header = React.memo(function Header() {
  const { requestLocation } = useGeolocation();
  const navigate = useNavigate();
  const clearActiveLocation = useClearActiveLocation();
  const { t } = useTranslation();

  const handleUseMyLocation = () => {
    clearActiveLocation();
    requestLocation();
    navigate('/'); // Ensure they are on Home page to see it
  };

  return (
    <header className="w-full bg-surface/80 backdrop-blur-xl border-b border-border-subtle h-[52px] md:h-[64px] lg:h-[56px] shrink-0">
      <div className="h-full w-full max-w-[1280px] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-between">
        <Link to="/" className="font-display text-text text-h4 lg:text-h3 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 -ml-2 rtl:-ml-0 rtl:-mr-2">
          WeatherApp
        </Link>
        
        <div className="flex items-center gap-4">
          <IconButton
            onClick={handleUseMyLocation}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10"
            aria-label={t('emptyStates.useLocation')}
            title={t('emptyStates.useLocation')}
          >
            <MapPin aria-hidden="true" />
          </IconButton>

          {/* Placeholder for global search on Tablet/Desktop */}
          <div className="hidden md:flex items-center bg-background rounded-full px-6 py-2.5 border border-border focus-within:border-primary transition-colors min-w-[200px] max-w-[300px] w-full">
            <Search aria-hidden="true" className="w-5 h-5 text-muted mr-3 rtl:mr-0 rtl:ml-3 shrink-0" />
            <input 
              type="search" 
              aria-label={t('search.placeholder')}
              placeholder={t('search.placeholder')}
              className="bg-transparent border-none outline-none text-text text-body w-full placeholder:text-muted"
            />
          </div>
        </div>
      </div>
    </header>
  );
});
