import { test, expect } from '@playwright/test';

test.describe('Theme Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage to start fresh
    await page.goto('/settings');
  });

  test('toggles light and dark themes', async ({ page }) => {
    // Find theme toggle buttons (radio group or similar in settings)
    const lightThemeBtn = page.getByRole('button', { name: /Light/i });
    const darkThemeBtn = page.getByRole('button', { name: /Dark/i });

    // Click dark theme
    await darkThemeBtn.click();
    // HTML tag should have 'dark' class
    await expect(page.locator('html')).toHaveClass(/dark/);

    // Click light theme
    await lightThemeBtn.click();
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('theme selection persists across reload', async ({ page }) => {
    const darkThemeBtn = page.getByRole('button', { name: /Dark/i });
    await darkThemeBtn.click();
    await expect(page.locator('html')).toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});
