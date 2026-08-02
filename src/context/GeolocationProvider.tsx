import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { GeolocationService } from '../services/geolocation.service';
import type { Coordinates, PermissionStatusState } from '../types/geolocation';
import { GeolocationContext, type GeolocationContextValue } from './GeolocationContext';

interface GeolocationProviderProps {
  children: ReactNode;
}

export function GeolocationProvider({ children }: GeolocationProviderProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatusState>('prompt');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const requestLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const coords = await GeolocationService.getCurrentPosition();
      setCoordinates(coords);
      setPermissionStatus('granted'); // If it succeeds, it's granted
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      // If error is permission denied, we should update the permission status
      if (err && typeof err === 'object' && 'code' in err) {
        const status = await GeolocationService.checkPermission();
        if (status === 'denied') {
          setPermissionStatus('denied');
        }
      } else {
         const status = await GeolocationService.checkPermission();
         setPermissionStatus(status);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initialize permission state and set up listener if supported
  useEffect(() => {
    let permission: PermissionStatus | null = null;

    const checkInitialPermission = async () => {
      const status = await GeolocationService.checkPermission();
      setPermissionStatus(status);

      if (status === 'granted') {
        // If already granted, we can proactively request location
        requestLocation();
      }

      // Try to set up a listener
      if ('permissions' in navigator) {
        try {
          permission = await navigator.permissions.query({ name: 'geolocation' });
          permission.onchange = () => {
            const newState = permission?.state as PermissionStatusState;
            setPermissionStatus(newState);
            if (newState === 'granted') {
              requestLocation();
            } else if (newState === 'denied') {
              setCoordinates(null);
            }
          };
        } catch {
          // Ignore, some browsers don't support this
        }
      }
    };

    checkInitialPermission();

    return () => {
      if (permission) {
        permission.onchange = null;
      }
    };
  }, [requestLocation]);


  const value: GeolocationContextValue = {
    coordinates,
    permissionStatus,
    isLoading,
    error,
    requestLocation,
  };

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  );
}
