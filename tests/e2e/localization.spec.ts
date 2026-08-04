import { test, expect } from '@playwright/test';

test.describe('Localization Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('switches language and changes text direction', async ({ page }) => {
    // Check initial language (English)
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    
    // Select Arabic language
    const arabicBtn = page.getByRole('button', { name: /العربية/i });
    await expect(arabicBtn).toBeVisible();
    await arabicBtn.click();

    // Verify HTML dir changes to RTL
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    
    // Switch back to English
    const englishBtn = page.getByRole('button', { name: /^EN$/i });
    await englishBtn.click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('language persists across reloads', async ({ page }) => {
    const arabicBtn = page.getByRole('button', { name: /العربية/i });
    await arabicBtn.click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });
});
