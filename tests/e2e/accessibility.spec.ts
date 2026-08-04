import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Smoke Tests', () => {
  test('Home page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/');
    // Give it a moment to render content
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast', 'heading-order', 'aria-valid-attr-value'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Search page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/search');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast', 'heading-order', 'aria-valid-attr-value'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('Settings page should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast', 'heading-order', 'aria-valid-attr-value'])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
