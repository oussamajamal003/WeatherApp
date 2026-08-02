import { createContext } from 'react';
import type { GeolocationState } from '../types/geolocation';

export interface GeolocationContextValue extends GeolocationState {
  requestLocation: () => Promise<void>;
}

export const GeolocationContext = createContext<GeolocationContextValue | undefined>(undefined);
