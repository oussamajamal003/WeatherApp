import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useGeolocation } from '../../../src/hooks/use-geolocation';
import { GeolocationProvider } from '../../../src/context/GeolocationProvider';
import { GeolocationService } from '../../../src/services/geolocation.service';

vi.mock('../../../src/services/geolocation.service', () => ({
  GeolocationService: {
    checkPermission: vi.fn(),
    getCurrentPosition: vi.fn(),
  },
}));

describe('useGeolocation and GeolocationProvider', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <GeolocationProvider>{children}</GeolocationProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('initializes with prompt state if checkPermission returns prompt', async () => {
    vi.mocked(GeolocationService.checkPermission).mockResolvedValue('prompt');

    const { result } = renderHook(() => useGeolocation(), { wrapper });

    expect(result.current.permissionStatus).toBe('prompt');
    expect(result.current.coordinates).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('automatically requests location if checkPermission returns granted', async () => {
    vi.mocked(GeolocationService.checkPermission).mockResolvedValue('granted');
    vi.mocked(GeolocationService.getCurrentPosition).mockResolvedValue({ lat: 10, lon: 20 });

    const { result } = renderHook(() => useGeolocation(), { wrapper });

    await waitFor(() => {
      expect(result.current.coordinates).toEqual({ lat: 10, lon: 20 });
    });
    
    expect(result.current.permissionStatus).toBe('granted');
    expect(result.current.isLoading).toBe(false);
  });

  it('handles requestLocation success', async () => {
    vi.mocked(GeolocationService.checkPermission).mockResolvedValue('prompt');
    vi.mocked(GeolocationService.getCurrentPosition).mockResolvedValue({ lat: 30, lon: 40 });

    const { result } = renderHook(() => useGeolocation(), { wrapper });

    act(() => {
      result.current.requestLocation();
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.coordinates).toEqual({ lat: 30, lon: 40 });
    });

    expect(result.current.permissionStatus).toBe('granted');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles requestLocation failure and updates permission status', async () => {
    vi.mocked(GeolocationService.checkPermission).mockResolvedValue('prompt');
    vi.mocked(GeolocationService.getCurrentPosition).mockRejectedValue(new Error('Failed'));

    const { result } = renderHook(() => useGeolocation(), { wrapper });

    act(() => {
      result.current.requestLocation();
    });

    await waitFor(() => {
      expect(result.current.error).toBeInstanceOf(Error);
    });

    expect(result.current.coordinates).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it('throws an error when used outside GeolocationProvider', () => {
    // Suppress console.error for expected error boundary
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => renderHook(() => useGeolocation())).toThrow(
      'useGeolocation must be used within a GeolocationProvider'
    );
    
    consoleSpy.mockRestore();
  });
});
