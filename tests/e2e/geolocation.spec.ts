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

  test('handles geolocation denied', async ({ page, context }) => {
    // Clear permissions to explicitly simulate denial
    await context.clearPermissions();
    // Denying geolocation (Playwright does not easily block, but if we don't grant, it prompts or blocks)
    // Actually, context.grantPermissions with empty array blocks it if requested?
    // Let's test the manual search fallback directly
    
    await page.goto('/');
    
    // Playwright clearPermissions defaults to 'prompt', so we must click the button
    // to trigger the prompt which immediately denies.
    const useLocationBtn = page.getByRole('button', { name: /Use My Location/i });
    try {
      await useLocationBtn.click({ timeout: 5000 });
    } catch {
      // Ignore "element detached from the DOM" which occurs when the prompt denies immediately
      // and unmounts the Welcome component mid-click.
    }
    
    // Wait for the fallback search page to appear
    const searchInput = page.getByTestId('search-input-main');
    await expect(searchInput).toBeVisible();
    // Should render search page inside /
  });
});
