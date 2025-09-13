import got from "got";
import * as cheerio from "cheerio";

export interface LinkMetadata {
  title: string;
  description: string;
  image?: string;
  url: string;
  domain: string;
  publishedDate?: string;
  // Additional fields from SitePreview
  canonicalUrl?: string;
  siteName?: string;
  type?: string;
  images?: string[];
  favicon?: string;
  themeColor?: string;
  lang?: string;
}

export type SitePreview = {
  url: string;
  canonicalUrl?: string;
  title?: string;
  description?: string;
  siteName?: string;
  type?: string;
  images?: string[];
  image?: string;
  favicon?: string;
  themeColor?: string;
  lang?: string;
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

// More realistic headers that indicate we're just looking for metadata
const METADATA_HEADERS = {
  "user-agent": UA,
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "accept-language": "en-US,en;q=0.5",
  "accept-encoding": "gzip, deflate, br",
  "dnt": "1",
  "connection": "keep-alive",
  "upgrade-insecure-requests": "1",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "cache-control": "max-age=0"
};

function absUrl(href?: string | null, base?: string): string | undefined {
  if (!href) return undefined;
  try {
    return new URL(href, base).toString();
  } catch {
    return undefined;
  }
}

function pick<T>(...vals: (T | undefined)[]): T | undefined {
  return vals.find((v) => v !== undefined && v !== null);
}

function metaProp($: cheerio.CheerioAPI, prop: string) {
  return $(`meta[property="${prop}"]`).attr("content")?.trim();
}

function metaName($: cheerio.CheerioAPI, name: string) {
  return $(`meta[name="${name}"]`).attr("content")?.trim();
}

function getAllOgImages($: cheerio.CheerioAPI, base: string) {
  const imgs = new Set<string>();
  $(`meta[property="og:image"], meta[property="og:image:secure_url"]`).each(
    (_, el) => {
      const c = $(el).attr("content");
      const u = absUrl(c, base);
      if (u) imgs.add(u);
    }
  );
  // Fallback to twitter:image
  const tw = metaName($, "twitter:image");
  const twAbs = absUrl(tw, base);
  if (twAbs) imgs.add(twAbs);

  return Array.from(imgs);
}

function getFavicon($: cheerio.CheerioAPI, base: string): string | undefined {
  const rels = [
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
    'link[rel="apple-touch-icon"]',
    'link[rel="mask-icon"]'
  ];
  for (const sel of rels) {
    const href = $(sel).attr("href");
    const u = absUrl(href, base);
    if (u) return u;
  }
  // fallback to /favicon.ico
  try {
    const u = new URL(base);
    u.pathname = "/favicon.ico";
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return undefined;
  }
}

function parseJsonLd(
  $: cheerio.CheerioAPI,
  base: string
): Partial<SitePreview> {
  const out: Partial<SitePreview> = {};
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).contents().text().trim();
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        if (typeof node !== "object" || !node) continue;
        const t = node["@type"];
        // Prefer WebPage/WebSite/Organization nodes
        if (t === "WebPage" || t === "WebSite" || t === "Organization") {
          out.title = out.title ?? node.name;
          out.description = out.description ?? node.description;
          const img =
            (typeof node.image === "string" ? node.image : undefined) ??
            (Array.isArray(node.image) ? node.image[0] : undefined);
          if (img) {
            const abs = absUrl(img, base);
            if (abs) {
              out.images = out.images ?? [];
              if (!out.images.includes(abs)) out.images.push(abs);
            }
          }
        }
        if (node.inLanguage && typeof node.inLanguage === "string") {
          out.lang = out.lang ?? node.inLanguage;
        }
      }
    } catch {
      // ignore malformed JSON-LD
    }
  });
  return out;
}

// Try to fetch metadata with different strategies
async function fetchWithFallback(url: string): Promise<{ html: string; finalUrl: string }> {
  const strategies = [
    // Strategy 1: Full request with realistic headers
    async () => {
      const res = await got(url, {
        headers: METADATA_HEADERS,
        followRedirect: true,
        timeout: { request: 8000 },
        https: { rejectUnauthorized: true },
        retry: { limit: 1 }
      });
      return { html: res.body, finalUrl: res.url ?? url };
    },
    
    // Strategy 2: HEAD request first, then GET if successful
    async () => {
      try {
        await got.head(url, {
          headers: METADATA_HEADERS,
          timeout: { request: 5000 },
          https: { rejectUnauthorized: true }
        });
        
        const res = await got(url, {
          headers: METADATA_HEADERS,
          followRedirect: true,
          timeout: { request: 8000 },
          https: { rejectUnauthorized: true }
        });
        return { html: res.body, finalUrl: res.url ?? url };
      } catch {
        throw new Error("HEAD request failed");
      }
    },
    
    // Strategy 3: Minimal headers, just user agent
    async () => {
      const res = await got(url, {
        headers: { "user-agent": UA },
        followRedirect: true,
        timeout: { request: 8000 },
        https: { rejectUnauthorized: true }
      });
      return { html: res.body, finalUrl: res.url ?? url };
    },
    
    // Strategy 4: Try with different user agent
    async () => {
      const res = await got(url, {
        headers: { 
          "user-agent": "Mozilla/5.0 (compatible; LinkPreview/1.0; +https://example.com/bot)",
          "accept": "text/html"
        },
        followRedirect: true,
        timeout: { request: 8000 },
        https: { rejectUnauthorized: true }
      });
      return { html: res.body, finalUrl: res.url ?? url };
    }
  ];

  for (const strategy of strategies) {
    try {
      return await strategy();
    } catch (error) {
      console.log(`Strategy failed for ${url}:`, error.message);
      continue;
    }
  }
  
  throw new Error(`All strategies failed for ${url}`);
}

export async function fetchSitePreview(
  inputUrl: string
): Promise<SitePreview> {
  const { html, finalUrl } = await fetchWithFallback(inputUrl);
  const $ = cheerio.load(html);

  const baseHref = $("base[href]").attr("href");
  const base = absUrl(baseHref, finalUrl) ?? finalUrl;

  const ogTitle = metaProp($, "og:title");
  const twTitle = metaName($, "twitter:title");
  const docTitle = $("title").first().text().trim();
  const h1Title = $("h1").first().text().trim();

  const ogDesc = metaProp($, "og:description");
  const twDesc = metaName($, "twitter:description");
  const metaDesc = metaName($, "description");

  const siteName = metaProp($, "og:site_name");
  const ogType = metaProp($, "og:type");
  const ogUrl = metaProp($, "og:url");
  const canonical = $("link[rel='canonical']").attr("href");

  const themeColor = metaName($, "theme-color");
  const lang =
    $("html").attr("lang")?.trim() ??
    $("meta[http-equiv='content-language']").attr("content")?.trim();

  const images = getAllOgImages($, base);
  const favicon = getFavicon($, base);

  const jsonLd = parseJsonLd($, base);
  if (jsonLd.images?.length) {
    for (const img of jsonLd.images) {
      if (!images.includes(img)) images.push(img);
    }
  }

  const title = pick(
    ogTitle,
    twTitle,
    jsonLd.title,
    docTitle || undefined,
    h1Title || undefined
  );
  const description = pick(ogDesc, twDesc, jsonLd.description, metaDesc);
  const canonicalUrl = absUrl(pick(canonical, ogUrl), base);

  const preview: SitePreview = {
    url: finalUrl,
    canonicalUrl,
    title,
    description,
    siteName: siteName ?? new URL(finalUrl).hostname,
    type: ogType,
    images,
    image: images[0],
    favicon,
    themeColor: themeColor ?? jsonLd.themeColor,
    lang: lang ?? jsonLd.lang
  };

  return preview;
}

export async function fetchLinkMetadata(url: string): Promise<LinkMetadata> {
  try {
    const { html, finalUrl } = await fetchWithFallback(url);
    const $ = cheerio.load(html);
    const domain = new URL(finalUrl).hostname;

    const baseHref = $("base[href]").attr("href");
    const base = absUrl(baseHref, finalUrl) ?? finalUrl;

    const ogTitle = metaProp($, "og:title");
    const twTitle = metaName($, "twitter:title");
    const docTitle = $("title").first().text().trim();
    const h1Title = $("h1").first().text().trim();

    const ogDesc = metaProp($, "og:description");
    const twDesc = metaName($, "twitter:description");
    const metaDesc = metaName($, "description");

    const siteName = metaProp($, "og:site_name");
    const ogType = metaProp($, "og:type");
    const ogUrl = metaProp($, "og:url");
    const canonical = $("link[rel='canonical']").attr("href");

    const themeColor = metaName($, "theme-color");
    const lang =
      $("html").attr("lang")?.trim() ??
      $("meta[http-equiv='content-language']").attr("content")?.trim();

    const images = getAllOgImages($, base);
    const favicon = getFavicon($, base);

    const jsonLd = parseJsonLd($, base);
    if (jsonLd.images?.length) {
      for (const img of jsonLd.images) {
        if (!images.includes(img)) images.push(img);
      }
    }

    const title = pick(
      ogTitle,
      twTitle,
      jsonLd.title,
      docTitle || undefined,
      h1Title || undefined
    );
    const description = pick(ogDesc, twDesc, jsonLd.description, metaDesc);
    const canonicalUrl = absUrl(pick(canonical, ogUrl), base);

    // Extract published date
    const publishedMatch = metaProp($, "article:published_time") || 
                          metaName($, "date") ||
                          metaName($, "article:published");
    
    return {
      title: title || 'Untitled',
      description: description || 'No description available',
      image: images[0],
      url: finalUrl,
      domain,
      publishedDate: publishedMatch,
      // Additional fields
      canonicalUrl,
      siteName: siteName ?? domain,
      type: ogType,
      images,
      favicon,
      themeColor: themeColor ?? jsonLd.themeColor,
      lang: lang ?? jsonLd.lang
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);
    
    // Try to extract basic info from URL for paywalled sites
    const domain = new URL(url).hostname;
    let fallbackTitle = 'Unable to load';
    let fallbackDescription = 'Failed to fetch article metadata';
    
    // Special handling for known paywalled sites
    if (domain.includes('barrons.com')) {
      fallbackTitle = 'Barron\'s Article';
      fallbackDescription = 'Article from Barron\'s (subscription required)';
    } else if (domain.includes('wsj.com')) {
      fallbackTitle = 'Wall Street Journal Article';
      fallbackDescription = 'Article from The Wall Street Journal (subscription required)';
    } else if (domain.includes('ft.com')) {
      fallbackTitle = 'Financial Times Article';
      fallbackDescription = 'Article from Financial Times (subscription required)';
    } else if (domain.includes('nytimes.com')) {
      fallbackTitle = 'New York Times Article';
      fallbackDescription = 'Article from The New York Times (subscription may be required)';
    }
    
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      url,
      domain,
    };
  }
}

