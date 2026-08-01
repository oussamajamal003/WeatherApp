type NetworkListener = (isOnline: boolean) => void;

class NetworkServiceImpl {
  private listeners: Set<NetworkListener> = new Set();
  private _isOnline: boolean;

  constructor() {
    this._isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

    if (typeof window !== 'undefined') {
      window.addEventListener('online', this.handleOnline);
      window.addEventListener('offline', this.handleOffline);
    }
  }

  public get isOnline(): boolean {
    // Re-check navigator in case it changed without event firing
    if (typeof navigator !== 'undefined') {
      this._isOnline = navigator.onLine;
    }
    return this._isOnline;
  }

  private handleOnline = () => {
    this._isOnline = true;
    this.notifyListeners(true);
  };

  private handleOffline = () => {
    this._isOnline = false;
    this.notifyListeners(false);
  };

  private notifyListeners(status: boolean) {
    this.listeners.forEach((listener) => listener(status));
  }

  /**
   * Subscribes to network status changes.
   * Returns an unsubscribe function.
   */
  public subscribe = (listener: NetworkListener): () => void => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
}

export const NetworkService = new NetworkServiceImpl();
