/**
 * Test utilities for handling navigation and URL normalization
 */

export class NavigationHelper {
  constructor(page, baseUrl = 'http://localhost:4321/workers.github.io') {
    this.page = page;
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  /**
   * Normalize a URL/path for navigation
   * @param {string} href - The href attribute from a link
   * @returns {string} - Normalized URL
   */
  normalizeUrl(href) {
    if (!href) return null;
    
    // Skip external links, anchors, mailto, tel
    if (href.startsWith('http') || href.startsWith('#') || 
        href.startsWith('mailto:') || href.startsWith('tel:')) {
      return null;
    }
    
    // Handle different types of internal links
    if (href.startsWith('./')) {
      // Relative path with ./
      return href.replace('./', '/');
    } else if (href.startsWith('/')) {
      // Absolute path
      return href;
    } else if (href === '.') {
      // Current directory
      return '/';
    } else {
      // Relative path without ./
      return '/' + href;
    }
  }

  /**
   * Navigate to a URL using the normalized path
   * @param {string} path - The path to navigate to
   * @returns {Promise<Response>} - The navigation response
   */
  async goto(path) {
    const normalizedPath = this.normalizeUrl(path) || path;
    console.log(`Navigating to: ${normalizedPath}`);
    return await this.page.goto(normalizedPath);
  }

  /**
   * Extract and normalize all internal links from the current page
   * @returns {Promise<Array>} - Array of {href, text, normalizedPath} objects
   */
  async extractInternalLinks() {
    const links = await this.page.locator('a[href]').all();
    const internalLinks = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = (await link.textContent()).trim();
      const normalizedPath = this.normalizeUrl(href);
      
      if (normalizedPath) {
        internalLinks.push({
          href,
          text,
          normalizedPath
        });
      }
    }
    
    return internalLinks;
  }

  /**
   * Test a link and return the result
   * @param {string} path - Path to test
   * @param {string} linkText - Text of the link (for logging)
   * @returns {Promise<Object>} - Test result object
   */
  async testLink(path, linkText = '') {
    const normalizedPath = this.normalizeUrl(path) || path;
    
    try {
      const response = await this.goto(normalizedPath);
      const status = response.status();
      
      // Check for success, redirect, or error
      if (status === 200) {
        // Verify no 404 content on the page
        const pageContent = await this.page.textContent('body');
        if (pageContent.includes('404') && pageContent.includes('not found')) {
          return {
            path: normalizedPath,
            text: linkText,
            status: 'ERROR',
            error: 'Page contains 404 content'
          };
        }
        return {
          path: normalizedPath,
          text: linkText,
          status: 'OK',
          httpStatus: status
        };
      } else if (status === 301 || status === 302) {
        // Wait for redirect to complete
        await this.page.waitForLoadState('networkidle', { timeout: 5000 });
        return {
          path: normalizedPath,
          text: linkText,
          status: 'REDIRECT',
          httpStatus: status,
          finalUrl: this.page.url()
        };
      } else if (status === 404) {
        return {
          path: normalizedPath,
          text: linkText,
          status: 'ERROR',
          error: '404 Not Found',
          httpStatus: status
        };
      } else {
        return {
          path: normalizedPath,
          text: linkText,
          status: 'ERROR',
          error: `HTTP ${status}`,
          httpStatus: status
        };
      }
    } catch (error) {
      return {
        path: normalizedPath,
        text: linkText,
        status: 'ERROR',
        error: error.message
      };
    }
  }

  /**
   * Test multiple links and return results
   * @param {Array} links - Array of link objects with {href, text}
   * @returns {Promise<Array>} - Array of test results
   */
  async testLinks(links) {
    const results = [];
    
    for (const link of links) {
      const result = await this.testLink(link.href, link.text);
      results.push(result);
      
      // Log result
      if (result.status === 'OK') {
        console.log(`✅ ${result.path} - ${result.text}`);
      } else if (result.status === 'REDIRECT') {
        console.log(`🔄 ${result.path} - ${result.text} (${result.httpStatus}) -> ${result.finalUrl}`);
      } else {
        console.log(`❌ ${result.path} - ${result.text}: ${result.error}`);
      }
    }
    
    return results;
  }

  /**
   * Get links by selector and test them
   * @param {string} selector - CSS selector for links
   * @param {string} description - Description for logging
   * @returns {Promise<Array>} - Test results
   */
  async testLinksBySelector(selector, description = 'links') {
    console.log(`\n🔍 Testing ${description}...`);
    
    const linkElements = await this.page.locator(selector).all();
    const links = [];
    
    for (const element of linkElements) {
      const href = await element.getAttribute('href');
      const text = (await element.textContent()).trim();
      
      if (href) {
        links.push({ href, text });
      }
    }
    
    console.log(`Found ${links.length} ${description} to test`);
    return await this.testLinks(links);
  }

  /**
   * Assert that no links are broken
   * @param {Array} results - Test results from testLinks
   * @param {Function} expect - Playwright expect function
   */
  assertNobrokenLinks(results, expect) {
    const brokenLinks = results.filter(r => r.status === 'ERROR');
    
    if (brokenLinks.length > 0) {
      console.log(`\n❌ BROKEN LINKS FOUND (${brokenLinks.length}):`);
      brokenLinks.forEach(link => {
        console.log(`  - ${link.path} (${link.text}): ${link.error}`);
      });
    }
    
    expect(brokenLinks.length).toBe(0);
  }

  /**
   * Assert that no links are broken, but allow some tolerance for missing pages
   * @param {Array} results - Test results from testLinks
   * @param {Function} expect - Playwright expect function
   * @param {Array} allowedMissing - Array of paths that are allowed to be missing
   */
  assertNobrokenLinksWithTolerance(results, expect, allowedMissing = []) {
    const brokenLinks = results.filter(r => 
      r.status === 'ERROR' && !allowedMissing.includes(r.path)
    );
    
    if (brokenLinks.length > 0) {
      console.log(`\n❌ BROKEN LINKS FOUND (${brokenLinks.length}):`);
      brokenLinks.forEach(link => {
        console.log(`  - ${link.path} (${link.text}): ${link.error}`);
      });
    }

    // Also log allowed missing pages for reference
    const allowedMissingFound = results.filter(r => 
      r.status === 'ERROR' && allowedMissing.includes(r.path)
    );
    if (allowedMissingFound.length > 0) {
      console.log(`\n⚠️  ALLOWED MISSING PAGES (${allowedMissingFound.length}):`);
      allowedMissingFound.forEach(link => {
        console.log(`  - ${link.path} (${link.text}): ${link.error}`);
      });
    }
    
    expect(brokenLinks.length).toBe(0);
  }

  /**
   * Print a summary of test results
   * @param {Array} results - Test results
   */
  printSummary(results) {
    const okCount = results.filter(r => r.status === 'OK').length;
    const redirectCount = results.filter(r => r.status === 'REDIRECT').length;
    const errorCount = results.filter(r => r.status === 'ERROR').length;
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`✅ Working links: ${okCount}`);
    console.log(`🔄 Redirects: ${redirectCount}`);
    console.log(`❌ Broken links: ${errorCount}`);
    
    return { okCount, redirectCount, errorCount };
  }
}

/**
 * Helper function to create a NavigationHelper instance
 * @param {Page} page - Playwright page object
 * @param {string} baseUrl - Base URL for the site
 * @returns {NavigationHelper}
 */
export function createNavigationHelper(page, baseUrl) {
  return new NavigationHelper(page, baseUrl);
}
