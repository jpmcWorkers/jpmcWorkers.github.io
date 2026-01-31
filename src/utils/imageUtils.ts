import type { CollectionEntry } from 'astro:content';

/**
 * Type for image collection entries
 */
type ImageEntry = CollectionEntry<'images'>;

/**
 * Interface for breadcrumb items
 */
export interface BreadcrumbItem {
  name: string;
  path: string;
}

/**
 * Builds a hierarchical structure from flat image entries
 * Groups entries by their parent paths to create a tree-like structure
 * 
 * @param entries - Array of image entries to organize
 * @returns Map of parent paths to their child entries
 */
export function buildImageHierarchy(
  entries: ImageEntry[]
): Map<string, ImageEntry[]> {
  const hierarchy = new Map<string, ImageEntry[]>();

  entries.forEach((entry) => {
    const parentPath = entry.data.parentPath || '';
    if (!hierarchy.has(parentPath)) {
      hierarchy.set(parentPath, []);
    }
    hierarchy.get(parentPath)!.push(entry);
  });

  return hierarchy;
}

/**
 * Filters image entries by their parent path
 * Returns only entries that belong to the specified folder path
 * 
 * @param entries - Array of image entries to filter
 * @param parentPath - Parent folder path to filter by (empty string for root level)
 * @returns Filtered array of entries matching the parent path
 */
export function filterEntriesByPath(
  entries: ImageEntry[],
  parentPath: string
): ImageEntry[] {
  return entries.filter((entry) => entry.data.parentPath === parentPath);
}

/**
 * Generates breadcrumb navigation items from a folder path
 * Creates an array of path segments with their corresponding URLs
 * 
 * @param folderPath - Full folder path (e.g., "Business Cards/clean-card")
 * @returns Array of breadcrumb items with names and paths
 * 
 * @example
 * getBreadcrumbs("Business Cards/clean-card")
 * // Returns: [
 * //   { name: "Images & Materials", path: "/image" },
 * //   { name: "Business Cards", path: "/image/Business Cards" },
 * //   { name: "clean-card", path: "/image/Business Cards/clean-card" }
 * // ]
 */
export function getBreadcrumbs(folderPath: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Images & Materials', path: '/image' },
  ];

  if (!folderPath || folderPath === '') {
    return breadcrumbs;
  }

  const segments = folderPath.split('/').filter(Boolean);
  let currentPath = '';

  segments.forEach((segment) => {
    currentPath = currentPath ? `${currentPath}/${segment}` : segment;
    // Encode each segment separately to preserve slashes in the path
    const encodedPath = currentPath.split('/').map(encodeURIComponent).join('/');
    breadcrumbs.push({
      name: segment,
      path: `/image/${encodedPath}`,
    });
  });

  return breadcrumbs;
}

/**
 * Resolves the full image path for display or download
 * Converts relative paths to absolute paths suitable for Astro's asset system
 * 
 * @param relativePath - Relative path from the images base directory
 * @returns Full path suitable for use with import.meta.glob or public URLs
 * 
 * @example
 * getImagePath("Business Cards/clean-card/preview.png")
 * // Returns: "/public/images/Business Cards/clean-card/preview.png"
 */
export function getImagePath(relativePath: string): string {
  return `/public/images/${relativePath}`;
}

/**
 * Encodes a folder path for use in URLs
 * Handles special characters and spaces in folder names
 * 
 * @param folderPath - Folder path to encode
 * @returns URL-encoded path with forward slashes preserved
 */
export function encodeFolderPath(folderPath: string): string {
  return folderPath
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

/**
 * Decodes a URL-encoded folder path
 * Converts URL-encoded segments back to their original form
 * 
 * @param encodedPath - URL-encoded path
 * @returns Decoded folder path
 */
export function decodeFolderPath(encodedPath: string): string {
  return encodedPath
    .split('/')
    .map((segment) => decodeURIComponent(segment))
    .join('/');
}
