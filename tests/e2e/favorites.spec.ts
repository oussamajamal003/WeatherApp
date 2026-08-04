import { test, expect } from '@playwright/test';
import { mockWeatherAPI } from './mock-api';

test.describe('Favorites Journey', () => {
  test.beforeEach(async ({ page }) => {
    await mockWeatherAPI(page);
    // Clear localStorage before each test
    await page.goto('/search');
  });

  test('add city to favorites and it persists', async ({ page }) => {
    // Search and select London
    const searchInput = page.getByTestId('search-input-main');
    await searchInput.pressSequentially('London', { delay: 50 });
    const option = page.getByRole('option', { name: /London/i }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();

    // Weather card loads, click Favorite toggle
    const favoriteToggle = page.getByTestId('favorite-toggle');
    await expect(favoriteToggle).toBeVisible();
    await favoriteToggle.click();

    // Go back to search list by clearing search (or navigating back to /search)
    await page.goto('/search');

    // Verify it's in the favorites list
    const favoriteCard = page.getByText('London', { exact: true }).first();
    await expect(favoriteCard).toBeVisible();

    // Reload page to check persistence
    await page.reload();
    await expect(favoriteCard).toBeVisible();
  });

  test('remove city from favorites', async ({ page }) => {
    // Step 1: Add favorite
    const searchInput = page.getByTestId('search-input-main');
    await searchInput.pressSequentially('London', { delay: 50 });
    const option = page.getByRole('option', { name: /London/i }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();

    const favoriteToggle = page.getByTestId('favorite-toggle');
    await expect(favoriteToggle).toBeVisible();
    await favoriteToggle.click();

    // Clear search or go to search page to see favorites
    await page.goto('/search');

    // Remove it by clicking the toggle button directly on the list card
    const removeToggle = page.getByTestId('favorite-toggle').first();
    await expect(removeToggle).toBeVisible();
    await removeToggle.click();

    // Verify it's removed
    const favoriteCardTitle = page.getByText('London', { exact: true }).first();
    await expect(favoriteCardTitle).not.toBeVisible();
    await expect(page.getByText(/No favorites yet/i)).toBeVisible();
  });
});
