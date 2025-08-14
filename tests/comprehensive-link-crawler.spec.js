import { test, expect } from '@playwright/test';
import { createNavigationHelper } from './utils/navigation.js';

test.describe('Comprehensive Link Crawler', () => {
  const visitedUrls = new Set();
  const internalUrls = new Set();
  const brokenLinks = [];
  let navHelper;
  
  test.beforeEach(async ({ page }) => {
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
    navHelper = createNavigationHelper(page);
  });

  test('Crawl all internal pages and validate links', async ({ page }) => {
    const urlsToCrawl = ['/'];
    
    // Function to extract all internal links from a page
    async function extractInternalLinks(currentUrl) {
      const links = await page.locator('a[href]').all();
      const foundUrls = [];
      
      for (const link of links) {
        const href = await link.getAttribute('href');
        const linkText = (await link.textContent()).trim();
        
        if (!href) continue;
        
        // Normalize the URL
        let fullUrl;
        if (href.startsWith('http')) {
          // External link - skip for internal crawling
          if (!href.includes(baseUrl.replace('http://localhost:4321', ''))) {
            continue;
          }
          fullUrl = href;
        } else if (href.startsWith('/')) {
          // Absolute internal path
          fullUrl = baseUrl + href;
        } else if (href.startsWith('./')) {
          // Relative path
          const cleanHref = href.replace('./', '/');
          fullUrl = baseUrl + cleanHref;
        } else if (!href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          // Relative path without ./
          fullUrl = baseUrl + '/' + href;
        } else {
          // Skip anchors, mailto, tel links
          continue;
        }
        
        // Convert back to path for consistency
        const urlPath = fullUrl.replace(baseUrl, '') || '/';
        
        if (!visitedUrls.has(urlPath)) {
          foundUrls.push({ url: urlPath, text: linkText, source: currentUrl });
          internalUrls.add(urlPath);
        }
      }
      
      return foundUrls;
    }

    // Function to test a URL and collect its links
    async function crawlPage(urlPath) {
      if (visitedUrls.has(urlPath)) {
        return [];
      }
      
      visitedUrls.add(urlPath);
      console.log(`Crawling: ${urlPath}`);
      
      try {
        const response = await page.goto(urlPath);
        
        // Check for 404 or other errors
        if (response.status() === 404) {
          brokenLinks.push({
            url: urlPath,
            status: 404,
            error: 'Page not found'
          });
          return [];
        }
        
        if (response.status() >= 400) {
          brokenLinks.push({
            url: urlPath,
            status: response.status(),
            error: `HTTP ${response.status()}`
          });
          return [];
        }
        
        // Wait for page to load
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Check for 404 content even if status is 200
        const pageContent = await page.textContent('body');
        if (pageContent.includes('404') && pageContent.includes('not found')) {
          brokenLinks.push({
            url: urlPath,
            status: response.status(),
            error: 'Page contains 404 content'
          });
        }
        
        // Extract all links from this page
        return await extractInternalLinks(urlPath);
        
      } catch (error) {
        console.error(`Error crawling ${urlPath}:`, error.message);
        brokenLinks.push({
          url: urlPath,
          status: 'ERROR',
          error: error.message
        });
        return [];
      }
    }

    // Start crawling from the homepage
    while (urlsToCrawl.length > 0) {
      const currentUrl = urlsToCrawl.shift();
      const newUrls = await crawlPage(currentUrl);
      
      // Add newly found URLs to the crawl queue
      for (const { url } of newUrls) {
        if (!visitedUrls.has(url) && !urlsToCrawl.includes(url)) {
          urlsToCrawl.push(url);
        }
      }
      
      // Limit crawling to prevent infinite loops (adjust as needed)
      if (visitedUrls.size > 50) {
        console.log('Limiting crawl to first 50 pages');
        break;
      }
    }
    
    // Report results
    console.log(`\n=== CRAWL SUMMARY ===`);
    console.log(`Total pages crawled: ${visitedUrls.size}`);
    console.log(`Total internal URLs found: ${internalUrls.size}`);
    console.log(`Broken links found: ${brokenLinks.length}`);
    
    if (visitedUrls.size > 0) {
      console.log(`\nPages successfully crawled:`);
      [...visitedUrls].sort().forEach(url => console.log(`  ✓ ${url}`));
    }
    
    if (brokenLinks.length > 0) {
      console.log(`\n❌ BROKEN LINKS FOUND:`);
      brokenLinks.forEach(link => {
        console.log(`  - ${link.url} (${link.status}): ${link.error}`);
      });
    }
    
    // Assert that no broken links were found
    expect(brokenLinks.length).toBe(0);
    
    // Assert that we found a reasonable number of pages (adjust threshold as needed)
    expect(visitedUrls.size).toBeGreaterThan(5);
  });

  test('Verify all navigation menu links work', async ({ page }) => {
    await page.goto('/');
    
    // Test desktop navigation using helper
    const results = await navHelper.testLinksBySelector('nav:not(#mobile-menu) a', 'desktop navigation links');
    
    // Assert no broken links
    navHelper.assertNobrokenLinks(results, expect);
    
    // Print summary
    navHelper.printSummary(results);
  });

  test('Verify sidebar navigation links work', async ({ page }) => {
    await page.goto('/');
    
    // Test sidebar navigation using helper
    const results = await navHelper.testLinksBySelector('aside a, .sidebar a', 'sidebar navigation links');
    
    // Assert no broken links (if any sidebar links exist)
    if (results.length > 0) {
      navHelper.assertNobrokenLinks(results, expect);
      navHelper.printSummary(results);
    } else {
      console.log('No sidebar navigation links found - this is okay');
    }
  });

  test('Verify footer links work', async ({ page }) => {
    await page.goto('/');
    
    // Test footer navigation using helper
    const results = await navHelper.testLinksBySelector('footer a', 'footer links');
    
    // Assert no broken links (if any footer links exist)
    if (results.length > 0) {
      navHelper.assertNobrokenLinks(results, expect);
      navHelper.printSummary(results);
    } else {
      console.log('No footer links found - this is okay');
    }
  });

  test('Test What Can I Do menu links', async ({ page }) => {
    await page.goto('/');
    
    // First test links to resources and content sections
    const sectionResults = await navHelper.testLinksBySelector('a[href*="resources"], a[href*="content"]', 'What Can I Do section links');
    
    if (sectionResults.length > 0) {
      navHelper.assertNobrokenLinks(sectionResults, expect);
      console.log('✅ What Can I Do section links work');
      
      // Navigate to the content page to test its internal links
      await navHelper.goto('/content');
      
      // Test links within the content page
      const contentResults = await navHelper.testLinksBySelector('main a, section a', 'content page links');
      
      if (contentResults.length > 0) {
        navHelper.assertNobrokenLinks(contentResults, expect);
        navHelper.printSummary(contentResults);
      }
    } else {
      console.log('No What Can I Do links found');
    }
  });
});
