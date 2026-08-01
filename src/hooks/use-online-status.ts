import { useSyncExternalStore } from 'react';
import { NetworkService } from '../services/network.service';

export function useOnlineStatus(): boolean {
  return useSyncExternalStore(
    NetworkService.subscribe,
    () => NetworkService.isOnline,
    () => true // Fallback for server-side rendering
  );
}
