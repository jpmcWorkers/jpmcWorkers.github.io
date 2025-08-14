import { test, expect } from '@playwright/test';
import { createNavigationHelper } from './utils/navigation.js';

// Configuration
const TIMEOUT_MS = 30000;

// Internal pages that should exist
const INTERNAL_PAGES = [
  '/',
  '/mission',
  '/join-us', 
  '/news',
  '/content',
  // Redirected pages (these should redirect, not load directly)
  '/qa',
  '/gender', 
  '/aeiou',
  '/issues',
  '/join_us',
];

// Pages that might not exist yet but are linked (allowed to be missing)
const ALLOWED_MISSING_PAGES = [
  '/issues-and-resources',
  '/images',
  '/contact',
  '/img/posters',
  '/rto_petition_status'
];

// External links to check (should return 200)
const EXTERNAL_LINKS = [
  'https://actionnetwork.org/forms/jpmcworkers-signup?source=website',
  'https://www.nlrb.gov/sites/default/files/attachments/pages/node-184/nlrb-flyer-627.pdf',
  'https://www.nlrb.gov/sites/default/files/attachments/pages/node-251/employee-rights-under-the-nlra-poster-11-x-17-version-pdf-2022.pdf',
  'https://www.gov.uk/browse/working/rights-trade-unions',
  'https://www.ada.gov/resources/disability-rights-guide/',
  'https://www.verywellhealth.com/americans-with-disabilities-act-5220487',
  'https://discord.gg/BZA3pxppq9',
  'https://www.youtube.com/@jpmcWorkers',
  'https://www.reddit.com/user/JPMCWorkers/',
  'https://bit.ly/jpmcworkers'
];

test.describe('Link Validation Tests', () => {
  let navHelper;
  
  test.beforeEach(async ({ page }) => {
    // Set a reasonable timeout for navigation
    page.setDefaultTimeout(TIMEOUT_MS);
    page.setDefaultNavigationTimeout(TIMEOUT_MS);
    
    // Create navigation helper
    navHelper = createNavigationHelper(page);
  });

     test('Homepage loads without 404 errors', async ({ page }) => {
     const response = await page.goto('/');
     expect(response.status()).toBe(200);
    
    // Check that the page doesn't show a 404 error message
    await expect(page).not.toHaveText('404');
    await expect(page).not.toHaveText('Page not found');
    await expect(page).not.toHaveText('Not Found');
    
    // Verify key content is present
    await expect(page.locator('h1')).toContainText('JPMC');
    await expect(page.locator('h1')).toContainText('WORKERS');
    await expect(page.locator('h1')).toContainText('ALLIANCE');
  });

  test.describe('Internal Pages', () => {
    for (const pagePath of INTERNAL_PAGES) {
      test(`${pagePath} loads successfully without 404`, async ({ page }) => {
        const result = await navHelper.testLink(pagePath, `Page: ${pagePath}`);
        
        // Should not be an error
        expect(result.status).not.toBe('ERROR');
        
        // Should be OK or REDIRECT
        expect(['OK', 'REDIRECT']).toContain(result.status);
        
        // If redirected, log the final URL
        if (result.status === 'REDIRECT') {
          console.log(`${pagePath} redirected to: ${result.finalUrl}`);
        }
        
        // Verify basic layout elements are present (indicating successful page load)
        const hasHeader = await page.locator('header').count() > 0;
        const hasNav = await page.locator('nav').count() > 0;
        const hasMain = await page.locator('main').count() > 0 || await page.locator('section').count() > 0;
        
        expect(hasHeader || hasNav || hasMain).toBe(true);
      });
    }
  });

  test('All navigation links are functional', async ({ page }) => {
    await page.goto('/');
    
    // Try different selectors to find navigation links
    const headerResults = await navHelper.testLinksBySelector('header a', 'header links');
    const navResults = await navHelper.testLinksBySelector('nav a', 'nav links');
    const asideResults = await navHelper.testLinksBySelector('aside a', 'sidebar links');
    
    // Combine all results
    const allResults = [...headerResults, ...navResults, ...asideResults];
    
    if (allResults.length > 0) {
      // Assert no broken links (with tolerance for known missing pages)
      navHelper.assertNobrokenLinksWithTolerance(allResults, expect, ALLOWED_MISSING_PAGES);
      
      // Print summary
      const summary = navHelper.printSummary(allResults);
      console.log(`Total navigation links tested: ${allResults.length}`);
    } else {
      console.log('⚠️  No navigation links found with selectors: header a, nav a, aside a');
      // This might be okay if the navigation is dynamic or uses a different structure
    }
  });

  test('All content area links are functional', async ({ page }) => {
    await page.goto('/');
    
    // Test content area links using helper
    const results = await navHelper.testLinksBySelector('main a, section a, .container a', 'content area links');
    
    // Assert no broken links (with tolerance for known missing pages)
    navHelper.assertNobrokenLinksWithTolerance(results, expect, ALLOWED_MISSING_PAGES);
    
    // Print summary
    const summary = navHelper.printSummary(results);
    
    // Ensure we found some links to test
    expect(results.length).toBeGreaterThan(0);
  });

  test.describe('External Links Accessibility', () => {
    // Test external links to ensure they're accessible (but don't navigate to them in tests)
         test('External links have proper attributes', async ({ page }) => {
       await page.goto('/');
      
      const externalLinks = await page.locator('a[href^="http"]').all();
      
      for (const link of externalLinks) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        console.log(`Checking external link: ${href}`);
        
        // External links should typically open in new tab/window for better UX
        if (!href.includes('actionnetwork.org')) { // ActionNetwork might want same tab
          expect(target).toBe('_blank');
          expect(rel).toContain('noopener');
        }
      }
    });
  });

  test('Sitemap accessibility', async ({ page }) => {
    // Test that the sitemap exists and is accessible
    const sitemapResponse = await page.goto('/sitemap-index.xml');
    expect(sitemapResponse.status()).toBe(200);
    
    // Check sitemap content
    const content = await page.content();
    expect(content).toContain('<sitemapindex');
    expect(content).toContain('sitemap-0.xml');
  });

  test('404 page exists and works correctly', async ({ page }) => {
    // Test that a genuinely non-existent page shows 404
    const response = await page.goto('/this-page-definitely-does-not-exist-12345');
    expect(response.status()).toBe(404);
    
    // Should show the custom 404 page
    await expect(page.locator('body')).toContainText('404');
  });

  test('All redirects work correctly', async ({ page }) => {
    const redirects = [
      { from: '/qa', to: '/resources/qa' },
      { from: '/gender', to: '/resources/gender' },
      { from: '/aeiou', to: '/resources/aeiou' },
      { from: '/issues', to: '/resources/issues' },
      { from: '/join_us', to: '/resources/join-us' },
    ];
    
    for (const redirect of redirects) {
      console.log(`Testing redirect: ${redirect.from} -> ${redirect.to}`);
      
      // Test the redirect source
      const redirectResult = await navHelper.testLink(redirect.from, `Redirect: ${redirect.from}`);
      expect(redirectResult.status).toBe('REDIRECT');
      
      // Test the redirect destination
      const destinationResult = await navHelper.testLink(redirect.to, `Destination: ${redirect.to}`);
      expect(destinationResult.status).toBe('OK');
    }
  });

     test('Images and assets load correctly', async ({ page }) => {
     await page.goto('/');
    
    // Check that key images load
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      const alt = await img.getAttribute('alt');
      
      console.log(`Checking image: ${src} (alt: "${alt}")`);
      
      // Verify image has alt text for accessibility
      expect(alt).toBeTruthy();
      
      // Check that image is not broken (has natural dimensions)
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      const naturalHeight = await img.evaluate(el => el.naturalHeight);
      
      expect(naturalWidth).toBeGreaterThan(0);
      expect(naturalHeight).toBeGreaterThan(0);
    }
  });
});
