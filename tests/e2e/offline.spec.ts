import { test, expect } from '@playwright/test';
import { mockWeatherAPI } from './mock-api';

test.describe('Offline Journey', () => {
  test.beforeEach(async ({ page }) => {
    await mockWeatherAPI(page);
    await page.goto('/search');
  });

  test('offline banner appears when network drops', async ({ page, context }) => {
    // Search and load a city first to populate cache
    const searchInput = page.getByTestId('search-input-main');
    await searchInput.pressSequentially('London', { delay: 50 });
    const option = page.getByRole('option', { name: /London/i }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    await expect(page.getByText(/clear sky/i)).toBeVisible();

    // Simulate going offline
    await context.setOffline(true);
    await page.evaluate(() => window.dispatchEvent(new Event('offline')));
    
    // Check if the offline banner appears
    const offlineBanner = page.getByText(/You are currently offline/i);
    await expect(offlineBanner).toBeVisible();

    // Cached weather remains visible
    await expect(page.getByText(/clear sky/i)).toBeVisible();

    // Come back online
    await context.setOffline(false);
    await page.evaluate(() => {
      window.dispatchEvent(new Event('online'));
    });
    
    // Check if the toast appears
    await expect(page.getByText(/Connection restored/i)).toBeVisible();
  });
});
