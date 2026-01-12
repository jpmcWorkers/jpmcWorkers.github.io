import { getCollection } from 'astro:content';
import type { GetStaticPathsResult } from 'astro';

/**
 * Generates static paths for all folder routes in the image collection
 * This function is used by Astro's getStaticPaths to pre-render all folder pages
 * 
 * @returns Array of path objects for all folders in the image collection
 * Each path includes params (for routing) and props (for page rendering)
 * 
 * @example
 * Returns paths like:
 * [
 *   { params: { slug: "Business Cards" }, props: { folderPath: "Business Cards" } },
 *   { params: { slug: "Business Cards/clean-card" }, props: { folderPath: "Business Cards/clean-card" } },
 *   ...
 * ]
 */
export async function getImageFolderPaths(): Promise<GetStaticPathsResult> {
  // Get all image entries from the collection
  const allImageEntries = await getCollection('images');
  
  // Filter to only folders (entries that represent folders, not individual files)
  const folderEntries = allImageEntries.filter((entry) => entry.data.isFolder);
  
  // Generate static paths for each folder
  // For catch-all routes [...slug], the slug should be the full path as a string
  // Astro will handle URL encoding when generating the actual URLs
  return folderEntries.map((entry) => ({
    params: { slug: entry.data.relativePath },
    props: { folderPath: entry.data.relativePath },
  }));
}
