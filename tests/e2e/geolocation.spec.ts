import { test, expect } from '@playwright/test';
import { mockWeatherAPI } from './mock-api';

test.describe('Geolocation Journey', () => {
  test.beforeEach(async ({ page }) => {
    await mockWeatherAPI(page);
  });

  test('handles geolocation granted', async ({ page, context }) => {
    // Grant geolocation permissions
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ latitude: 51.5074, longitude: -0.1278 }); // London
    
    await page.goto('/');
    
    // GeolocationProvider automatically fetches location if permission is granted on mount
    // but in some Playwright versions/browsers we might still see the Welcome screen if it's slow.
    const useLocationBtn = page.getByRole('button', { name: /Use My Location/i });
    try {
      await useLocationBtn.click({ timeout: 2000 });
    } catch {
      // Ignore if unmounted
    }

    // Weather dashboard should load with current location data
    await expect(page.getByText(/London|Your Location/i).first()).toBeVisible({ timeout: 10000 });
  });

  test('handles geolocation denied', async ({ page }) => {
    // Force geolocation to return PERMISSION_DENIED immediately
    await page.addInitScript(() => {
      const mockGeolocation = {
        getCurrentPosition: (success: unknown, error: (err: GeolocationPositionError) => void) => {
          if (error) {
            error({
              code: 1, // PERMISSION_DENIED
              message: 'User denied geolocation',
              PERMISSION_DENIED: 1,
              POSITION_UNAVAILABLE: 2,
              TIMEOUT: 3
            } as GeolocationPositionError);
          }
        },
        watchPosition: () => {},
        clearWatch: () => {}
      };

      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
        configurable: true,
        writable: true
      });

      // Also mock permissions API for browsers that rely on checkPermission()
      if (navigator.permissions && navigator.permissions.query) {
        const originalQuery = navigator.permissions.query;
        navigator.permissions.query = async (params: PermissionDescriptor) => {
          if (params.name === 'geolocation') {
            return { state: 'denied', onchange: null } as unknown as PermissionStatus;
          }
          return originalQuery.call(navigator.permissions, params);
        };
      }
    });

    await page.goto('/');
    
    const useLocationBtn = page.getByRole('button', { name: /Use My Location/i });
    try {
      await useLocationBtn.click({ timeout: 5000 });
    } catch {
      // Ignore if unmounted
    }
    
    // Wait for the fallback search page to appear
    const searchInput = page.getByTestId('search-input-main');
    await expect(searchInput).toBeVisible();
    // Should render search page inside /
  });
});
