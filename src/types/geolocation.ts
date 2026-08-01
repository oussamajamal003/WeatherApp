export interface Coordinates {
  lat: number;
  lon: number;
}

export type PermissionStatusState = 'prompt' | 'granted' | 'denied';

export interface GeolocationState {
  coordinates: Coordinates | null;
  permissionStatus: PermissionStatusState;
  isLoading: boolean;
  error: Error | null;
}
