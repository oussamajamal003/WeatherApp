import React from 'react';
import { MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderSearch } from './HeaderSearch';

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
        <Link to="/" className="font-display font-semibold text-text text-xl md:text-2xl tracking-tight hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-2 -ml-2 rtl:-ml-0 rtl:-mr-2 flex items-center">
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

          {/* Global search on Tablet/Desktop */}
          <div className="hidden md:block w-full min-w-[200px] max-w-[300px]">
            <HeaderSearch />
          </div>
        </div>
      </div>
    </header>
  );
});
