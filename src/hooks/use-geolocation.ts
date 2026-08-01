import { useContext } from 'react';
import { GeolocationContext } from '../context/GeolocationProvider';
import type { GeolocationContextValue } from '../context/GeolocationProvider';

export function useGeolocation(): GeolocationContextValue {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
}

