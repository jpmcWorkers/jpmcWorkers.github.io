#!/usr/bin/env node

/**
 * Simple link validation script for local development
 * Usage: node scripts/test-links.js [url]
 */

import { chromium } from '@playwright/test';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_URL = 'http://localhost:4321/workers.github.io';
const TEST_URL = process.argv[2] || DEFAULT_URL;

async function quickLinkCheck(url) {
  console.log(`🔍 Starting quick link check for: ${url}`);
  
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Navigate to the main page
    console.log('📄 Loading homepage...');
    const response = await page.goto(url);
    
    if (response.status() !== 200) {
      console.error(`❌ Homepage returned ${response.status()}`);
      return;
    }
    
    console.log('✅ Homepage loaded successfully');
    
    // Find all internal links with proper URL normalization
    console.log('🔗 Discovering internal links...');
    const links = await page.locator('a[href]').all();
    const internalLinks = [];
    
    for (const link of links) {
      const href = await link.getAttribute('href');
      const text = (await link.textContent()).trim();
      
      // Normalize internal links
      let normalizedHref = null;
      if (href) {
        if (href.startsWith('./')) {
          normalizedHref = href.replace('./', '/');
        } else if (href.startsWith('/')) {
          normalizedHref = href;
        } else if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          normalizedHref = '/' + href;
        }
      }
      
      if (normalizedHref) {
        internalLinks.push({ href: normalizedHref, text });
      }
    }
    
    console.log(`📊 Found ${internalLinks.length} internal links to test`);
    
    // Test each internal link
    const results = [];
    for (const { href, text } of internalLinks) {
      try {
        const fullUrl = url + href;
        console.log(`Testing: ${href} -> ${fullUrl}`);
        const linkResponse = await page.goto(fullUrl);
        const status = linkResponse.status();
        
        if (status === 200) {
          console.log(`✅ ${href} - OK`);
          results.push({ href, text, status: 'OK' });
        } else if (status === 301 || status === 302) {
          console.log(`🔄 ${href} - Redirect (${status})`);
          results.push({ href, text, status: `Redirect (${status})` });
        } else {
          console.log(`❌ ${href} - Error (${status})`);
          results.push({ href, text, status: `Error (${status})` });
        }
      } catch (error) {
        console.log(`❌ ${href} - ${error.message}`);
        results.push({ href, text, status: `Error: ${error.message}` });
      }
    }
    
    // Summary
    const okCount = results.filter(r => r.status === 'OK').length;
    const redirectCount = results.filter(r => r.status.includes('Redirect')).length;
    const errorCount = results.filter(r => r.status.includes('Error')).length;
    
    console.log('\n📋 SUMMARY:');
    console.log(`✅ Working links: ${okCount}`);
    console.log(`🔄 Redirects: ${redirectCount}`);
    console.log(`❌ Broken links: ${errorCount}`);
    
    if (errorCount > 0) {
      console.log('\n💥 BROKEN LINKS:');
      results
        .filter(r => r.status.includes('Error'))
        .forEach(r => console.log(`  - ${r.href} (${r.text}): ${r.status}`));
    }
    
    console.log(`\n🎉 Quick link check completed! ${errorCount === 0 ? 'All links working!' : `${errorCount} issues found.`}`);
    
  } catch (error) {
    console.error('💥 Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run the check
quickLinkCheck(TEST_URL).catch(console.error);
