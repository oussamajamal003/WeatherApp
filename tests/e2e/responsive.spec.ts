import { test, expect } from '@playwright/test';

test.describe('Responsive Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/search');
  });

  test('no horizontal scrolling on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    
    // Evaluate if document scroll width exceeds viewport width
    const isScrollable = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    
    expect(isScrollable).toBeFalsy();
  });

  test('mobile bottom navigation appears on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const nav = page.locator('nav').last();
    // Ensure navigation exists, on mobile it's at the bottom typically
    await expect(nav).toBeVisible();
  });
});
