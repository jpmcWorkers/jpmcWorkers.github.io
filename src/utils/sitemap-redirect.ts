/**
 * Sitemap-based URL Redirect Utility
 * 
 * Fetches and parses the sitemap to get all valid URLs, then performs
 * case-insensitive matching and redirects to the correct URL if found.
 * 
 * This utility can be used on any page to handle case-insensitive redirects
 * based on the sitemap.
 */

/**
 * Extract URLs from sitemap XML using regex
 * Matches <loc>...</loc> tags in the XML
 * @param xmlContent - The XML content as a string
 * @returns Array of URL strings
 */
export function extractUrlsFromXml(xmlContent: string): string[] {
  const urlRegex = /<loc>(.*?)<\/loc>/gs;
  const urls: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(xmlContent)) !== null) {
    const url = match[1].trim();
    if (url) {
      urls.push(url);
    }
  }

  return urls;
}

/**
 * Extracts URI paths from full URLs, removing the domain
 * @param urls - Array of full URLs
 * @returns Array of URI paths
 */
export function extractUris(urls: string[]): string[] {
  return urls.map((url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.pathname;
    } catch {
      // If it's already a path, return as-is
      return url.startsWith('/') ? url : `/${url}`;
    }
  });
}

/**
 * Fetches and parses the sitemap to get all valid URLs
 * Falls back to empty array if sitemap cannot be loaded
 * @param sitemapPath - Path to the sitemap file (default: '/sitemap-0.xml')
 * @returns Promise resolving to array of valid URI paths
 */
export async function loadValidUrlsFromSitemap(sitemapPath: string = '/sitemap-0.xml'): Promise<string[]> {
  try {
    const response = await fetch(sitemapPath);
    
    if (!response.ok) {
      console.warn(`Could not load sitemap from ${sitemapPath}, falling back to empty array`);
      return [];
    }

    const xmlContent = await response.text();
    const fullUrls = extractUrlsFromXml(xmlContent);
    const uris = extractUris(fullUrls).sort();
    
    console.log(`✅ Loaded ${uris.length} valid URLs from sitemap`);
    return uris;
  } catch (error) {
    console.warn('Error loading sitemap:', error);
    return [];
  }
}

/**
 * Normalizes a URL path for comparison (lowercase, handles trailing slashes)
 * @param path - The URL path to normalize
 * @returns Normalized path for comparison
 */
function normalizePath(path: string): string {
  return path.toLowerCase().replace(/\/$/, '') || '/';
}

/**
 * Check if the current URL matches any valid URL (case-insensitive)
 * and redirect to the correct case if found
 * @param validUrls - Array of valid URL paths
 * @param currentPath - Current pathname (defaults to window.location.pathname)
 * @returns The matched URL if found, null otherwise
 */
export function findMatchingUrl(validUrls: string[], currentPath?: string): string | null {
  const path = currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '');
  const normalizedCurrentPath = normalizePath(path);
  
  // Find case-insensitive match
  const matchedUrl = validUrls.find((url: string) => {
    const normalizedUrl = normalizePath(url);
    return normalizedUrl === normalizedCurrentPath;
  });
  
  return matchedUrl && matchedUrl !== path ? matchedUrl : null;
}

/**
 * Performs a redirect to the matched URL if one is found
 * Preserves query string and hash
 * @param matchedUrl - The URL to redirect to
 * @param currentPath - Current pathname (optional, defaults to window.location.pathname)
 */
export function redirectToUrl(matchedUrl: string, currentPath?: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const path = currentPath ?? window.location.pathname;
  
  if (matchedUrl && matchedUrl !== path) {
    // Preserve query string and hash if present
    const newUrl = matchedUrl + window.location.search + window.location.hash;
    localStorage.setItem('redirectedFrom', path);
    console.log(`🔄 Redirecting to correct case: ${path} -> ${matchedUrl}`);
    window.location.replace(newUrl);
  }
}

/**
 * Main function: Loads sitemap, finds matching URL, and redirects if needed
 * This is the primary entry point for the redirect functionality
 * @param sitemapPath - Path to the sitemap file (default: '/sitemap-0.xml')
 * @param options - Configuration options
 * @param options.logResults - Whether to log results to console (default: true)
 * @param options.exposeGlobally - Whether to expose VALID_URLS on window object (default: true)
 * @returns Promise resolving to the matched URL if found, null otherwise
 */
export async function checkAndRedirect(
  sitemapPath: string = '/sitemap-0.xml',
  options: { logResults?: boolean; exposeGlobally?: boolean } = {}
): Promise<string | null> {
  const { logResults = true, exposeGlobally = true } = options;

  if (typeof window === 'undefined') {
    return null;
  }

  if (logResults) {
    console.log("🔍 Checking URL for redirect:", window.location.href);
  }

  // Load valid URLs from sitemap
  const VALID_URLS = await loadValidUrlsFromSitemap(sitemapPath);
  
  if (logResults) {
    console.log(`✅ VALID_URLS loaded: ${VALID_URLS.length} URLs`);
  }

  // Find matching URL
  const matchedUrl = findMatchingUrl(VALID_URLS);
  
  // Redirect if match found
  if (matchedUrl) {
    console.log(`🔄 Redirecting to correct case: ${window.location.pathname} -> ${matchedUrl}`);
    redirectToUrl(matchedUrl);
    return matchedUrl;
  }

  // Make VALID_URLS available globally for debugging
  if (exposeGlobally && typeof window !== 'undefined') {
    (window as any).VALID_URLS = VALID_URLS;
  }

  return null;
}

/**
 * Initialize the redirect functionality
 * This is a convenience function that can be called directly
 */
export async function initSitemapRedirect(): Promise<void> {
  await checkAndRedirect();
}
