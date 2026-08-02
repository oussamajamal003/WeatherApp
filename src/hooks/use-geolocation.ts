import { useContext } from 'react';
import { GeolocationContext, type GeolocationContextValue } from '../context/GeolocationContext';

export function useGeolocation(): GeolocationContextValue {
  const context = useContext(GeolocationContext);
  if (context === undefined) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
}

