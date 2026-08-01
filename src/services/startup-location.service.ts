import type { Location } from '../types/weather';
import type { Coordinates } from '../types/geolocation';

export type StartupResolutionType = 
  | 'active-location' 
  | 'geolocation' 
  | 'favorite' 
  | 'search'
  | 'loading-geolocation'
  | 'error-geolocation'
  | 'welcome';

export interface StartupContext {
  activeLocation: Location | null;
  geoCoordinates: Coordinates | null;
  isGeoLoading: boolean;
  geoError: Error | null;
  geoPermissionStatus: PermissionState | 'prompt' | 'unknown';
  firstFavorite: Location | null;
  alwaysUseLocal?: boolean; // Future settings feature
}

export interface StartupResolution {
  type: StartupResolutionType;
  location: Coordinates | null;
}

export class StartupLocationService {
  /**
   * Resolves the startup location based on current state and priority rules.
   */
  static resolve(context: StartupContext): StartupResolution {
    const {
      activeLocation,
      geoCoordinates,
      isGeoLoading,
      geoError,
      firstFavorite,
      alwaysUseLocal = false,
    } = context;

    // 1. If "Always use my current location" is enabled (Future feature)
    if (alwaysUseLocal) {
      if (geoCoordinates) return { type: 'geolocation', location: geoCoordinates };
      if (isGeoLoading) return { type: 'loading-geolocation', location: null };
      if (activeLocation) return { type: 'active-location', location: activeLocation };
      if (firstFavorite) return { type: 'favorite', location: firstFavorite };
      return { type: 'search', location: null };
    }

    // 2. Default Priority (Last Viewed City takes precedence)
    if (activeLocation) {
      return { type: 'active-location', location: activeLocation };
    }

    // 3. Fallback to Geolocation if no Active Location exists
    if (geoCoordinates) {
      return { type: 'geolocation', location: geoCoordinates };
    }

    // If Geolocation is currently loading, wait for it
    if (isGeoLoading) {
      return { type: 'loading-geolocation', location: null };
    }

    // If Geolocation explicitly failed or is denied, show error state (unless we have a favorite fallback)
    if (geoError && !firstFavorite) {
       return { type: 'error-geolocation', location: null };
    }

    // 4. Fallback to First Favorite
    if (firstFavorite) {
      return { type: 'favorite', location: firstFavorite };
    }

    // 5. If we have never prompted for location, show welcome screen
    if (context.geoPermissionStatus === 'prompt' && !geoError) {
      return { type: 'welcome', location: null };
    }

    // 6. Fallback to Search Experience
    return { type: 'search', location: null };
  }
}
