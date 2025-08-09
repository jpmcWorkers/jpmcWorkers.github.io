import { test, expect } from '@playwright/test';
import { createNavigationHelper } from './utils/navigation.js';

test.describe('Debug Navigation', () => {
  test('Debug page structure and links', async ({ page }) => {
    const navHelper = createNavigationHelper(page);
    
    // Go to homepage
    await page.goto('/');
    
    // Check what's actually on the page
    console.log('\n🔍 DEBUGGING PAGE STRUCTURE');
    
    // Check for navigation elements
    const headerCount = await page.locator('header').count();
    const navCount = await page.locator('nav').count();
    const asideCount = await page.locator('aside').count();
    const mainCount = await page.locator('main').count();
    const sectionCount = await page.locator('section').count();
    
    console.log(`📊 PAGE ELEMENTS:`);
    console.log(`  - Headers: ${headerCount}`);
    console.log(`  - Nav elements: ${navCount}`);
    console.log(`  - Aside elements: ${asideCount}`);
    console.log(`  - Main elements: ${mainCount}`);
    console.log(`  - Section elements: ${sectionCount}`);
    
    // Check for all links
    const allLinks = await page.locator('a').count();
    console.log(`  - Total links: ${allLinks}`);
    
    // Test a few key pages that should exist
    const testPages = ['/', '/mission', '/join-us', '/news', '/content'];
    
    console.log(`\n🧪 TESTING KEY PAGES:`);
    for (const testPage of testPages) {
      const result = await navHelper.testLink(testPage, `Test: ${testPage}`);
      console.log(`  ${testPage}: ${result.status} ${result.error ? `(${result.error})` : ''}`);
    }
    
    // Get a sampling of links from the page
    console.log(`\n🔗 SAMPLE LINKS ON PAGE:`);
    const linkElements = await page.locator('a[href]').all();
    for (let i = 0; i < Math.min(10, linkElements.length); i++) {
      const href = await linkElements[i].getAttribute('href');
      const text = (await linkElements[i].textContent()).trim();
      const normalized = navHelper.normalizeUrl(href);
      console.log(`  "${text}" -> ${href} (normalized: ${normalized})`);
    }
    
    // This test always passes - it's just for debugging
    expect(true).toBe(true);
  });
});
