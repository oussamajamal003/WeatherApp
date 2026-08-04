import { test, expect } from '@playwright/test';

test.describe('Settings Journey', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/settings');
  });

  test('change units and they persist', async ({ page }) => {
    // Change temperature unit to Fahrenheit
    const fahrenheitBtn = page.getByRole('button', { name: /°F/i });
    await fahrenheitBtn.click();
    
    // Change wind speed unit to mph
    const mphBtn = page.getByRole('button', { name: /mph/i });
    await mphBtn.click();

    // Reload and check if the selected classes/attributes remain
    await page.reload();
    
    // The button for Fahrenheit should remain selected
    await expect(fahrenheitBtn).toHaveClass(/bg-surface/);
    await expect(mphBtn).toHaveClass(/bg-surface/);
  });
});
