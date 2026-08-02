import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARTIFACTS_DIR = "C:\\Users\\ouss0\\.gemini\\antigravity-ide\\brain\\9edc8057-1125-4fbd-a983-75b1909ca856";

(async () => {
  console.log("Starting Puppeteer...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log("Navigating to http://localhost:5173...");
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });

  // Select a button and a card to hover
  const buttonSelector = 'button:has-text("Search Manually"), button:has-text("Use My Location"), a[href="/search"]';
  // Note: we can just find the first button
  const fallbackButton = 'button';

  console.log("Setting prefers-reduced-motion: reduce");
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  
  // Wait a moment for styles to apply
  await new Promise(r => setTimeout(r, 500));
  
  // Take screenshot for reduced motion
  const reducedMotionPath = path.join(ARTIFACTS_DIR, 'reduced-motion.png');
  await page.screenshot({ path: reducedMotionPath });
  console.log(`Saved screenshot: ${reducedMotionPath}`);

  // Hover over a button to check if transform is applied
  const btn = await page.$(fallbackButton);
  if (btn) {
    await btn.hover();
    await new Promise(r => setTimeout(r, 300)); // wait for transition
    const transformReduce = await page.evaluate(el => window.getComputedStyle(el).transform, btn);
    console.log(`[Reduced Motion] Hover Button Transform: ${transformReduce}`);
  }

  console.log("Setting prefers-reduced-motion: no-preference");
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  
  await new Promise(r => setTimeout(r, 500));
  
  // Take screenshot for normal motion
  const normalMotionPath = path.join(ARTIFACTS_DIR, 'normal-motion.png');
  await page.screenshot({ path: normalMotionPath });
  console.log(`Saved screenshot: ${normalMotionPath}`);

  if (btn) {
    await btn.hover();
    await new Promise(r => setTimeout(r, 300)); // wait for transition
    const transformNormal = await page.evaluate(el => window.getComputedStyle(el).transform, btn);
    console.log(`[Normal Motion] Hover Button Transform: ${transformNormal}`);
  }

  await browser.close();
  console.log("Done.");
})();
