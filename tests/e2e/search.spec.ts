import { test, expect } from '@playwright/test';
import { mockWeatherAPI } from './mock-api';

test.describe('Search Journey', () => {
  test.beforeEach(async ({ page }) => {
    await mockWeatherAPI(page);
    await page.goto('/search');
  });

  test('search page loads correctly', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Search Locations/i })).toBeVisible();
    await expect(page.getByTestId('search-input-main')).toBeVisible();
  });

  test('typing displays suggestions and debounces', async ({ page }) => {
    const searchInput = page.getByTestId('search-input-main');
    
    // Type to simulate user input (debounce triggers after typing stops)
    await searchInput.pressSequentially('Lon', { delay: 100 });
    
    // Suggestions should appear after debounce (API mock will return results)
    const suggestionsBox = page.getByTestId('search-suggestion-list');
    await expect(suggestionsBox).toBeVisible({ timeout: 10000 });
    
    await expect(async () => {
      expect(await page.getByRole('option').count()).toBeGreaterThan(0);
    }).toPass();
    await expect(page.getByRole('option', { name: /London/i }).first()).toBeVisible();
  });

  test('selecting a suggestion loads weather', async ({ page }) => {
    const searchInput = page.getByTestId('search-input-main');
    await searchInput.pressSequentially('London', { delay: 50 });
    
    // Click on London
    const option = page.getByRole('option', { name: /London/i }).first();
    await expect(option).toBeVisible({ timeout: 10000 });
    await option.click();
    
    // Ensure weather card loads
    await expect(page.getByRole('heading', { name: /London/i })).toBeVisible();
    // The forecast/weather details should become visible
    await expect(page.getByText(/clear sky/i)).toBeVisible();
  });

  test('keyboard navigation works in suggestions', async ({ page }) => {
    const searchInput = page.getByTestId('search-input-main');
    await searchInput.pressSequentially('Lon', { delay: 50 });
    
    await expect(page.getByTestId('search-suggestion-list')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('option').first()).toBeVisible();

    // Arrow down
    await searchInput.press('ArrowDown');
    // First option should have aria-selected=true or visually focused state
    const firstOption = page.getByRole('option').nth(0);
    await expect(firstOption).toHaveAttribute('aria-selected', 'true');

    // Enter to select
    await searchInput.press('Enter');
    
    // Ensure weather card loads
    await expect(page.getByText(/clear sky/i)).toBeVisible();
  });

  test('invalid city handling', async ({ page }) => {
    const searchInput = page.getByTestId('search-input-main');
    // Use a string that our API mock won't recognize or returns empty
    await searchInput.fill('xyz123invalidcity');
    
    // Should display no results
    await expect(page.getByText(/No locations found/i)).toBeVisible();
  });
});
