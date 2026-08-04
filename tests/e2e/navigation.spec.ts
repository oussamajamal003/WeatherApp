import { test, expect } from '@playwright/test';

test.describe('Navigation Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigate through main sections', async ({ page }) => {
    // We are on home
    await expect(page).toHaveURL(/.*(?:$|\/)/);
    
    // Go to Search
    const searchNav = page.getByRole('link', { name: /^Search$/i }).filter({ visible: true }).first();
    await searchNav.click();
    await expect(page).toHaveURL(/.*\/search/);
    await expect(page.getByRole('heading', { name: /Search Locations/i })).toBeVisible();

    // Go to Settings
    const settingsNav = page.getByRole('link', { name: /Settings/i }).filter({ visible: true }).first();
    await settingsNav.click();
    await expect(page).toHaveURL(/.*\/settings/);
    await expect(page.getByRole('heading', { name: /Settings/i })).toBeVisible();

    // Go to About
    const aboutNav = page.getByRole('link', { name: /About/i }).filter({ visible: true }).first();
    await aboutNav.click();
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { name: 'WeatherApp', level: 1 })).toBeVisible();

    // Browser Back
    await page.goBack();
    await expect(page).toHaveURL(/.*\/settings/);

    // Browser Forward
    await page.goForward();
    await expect(page).toHaveURL(/.*\/about/);
  });
});
