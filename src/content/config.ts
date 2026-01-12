import { defineCollection, z } from 'astro:content';
import { glob, } from 'astro/loaders';
import path from 'path';
import fs from 'fs/promises';
import sizeOf from 'image-size';



/**
 * Recursively scans a directory and builds entries for all files and folders
 * @param dirPath - Full path to the directory to scan
 * @param basePath - Base path for calculating relative paths
 * @param entries - Array to accumulate entries
 */
async function scanDirectoryRecursive(
  dirPath: string,
  basePath: string,
  entries: Array<{
    id: string;
    name: string;
    file: string;
    preview: string | null;
    type: ContentType;
    isFolder: boolean;
    width?: number;
    height?: number;
    previewWidth?: number;
    previewHeight?: number;
    relativePath: string;
    parentPath: string;
    depth: number;
  }>
): Promise<void> {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  
  // Calculate relative path from base
  const relativeDirPath = path.relative(basePath, dirPath);
  const parentPath = relativeDirPath === '.' ? '' : relativeDirPath.replace(/\\/g, '/');
  const depth = relativeDirPath === '.' ? 0 : relativeDirPath.split(path.sep).length;

  for (const item of items) {
    const itemPath = path.join(dirPath, item.name);
    const relativeItemPath = path.relative(basePath, itemPath).replace(/\\/g, '/');

    if (item.isDirectory()) {
      // Recursively scan subdirectories first
      await scanDirectoryRecursive(itemPath, basePath, entries);

      // Skip creating folder entries for directories named "preview" if preview.png or preview.jpeg exists in parent
      const isPreviewFolder = item.name.toLowerCase() === 'preview';
      if (isPreviewFolder) {
        // Check if parent directory already has preview.png or preview.jpeg
        const parentItems = await fs.readdir(dirPath).catch(() => []);
        const hasParentPreview = parentItems.some((file: string) => {
          const lowerFile = file.toLowerCase();
          return lowerFile === 'preview.png' || lowerFile === 'preview.jpeg' || lowerFile === 'preview.jpg';
        });
        
        // If parent has preview file, skip creating a folder entry for this "preview" folder
        if (hasParentPreview) {
          continue;
        }
      }

      // Check if this directory contains content files (to treat it as a folder entry)
      const subItems = await fs.readdir(itemPath);
      
      // Look for preview files (preview.png or preview.jpeg)
      const previewFile = subItems.find(file => {
        const lowerFile = file.toLowerCase();
        return lowerFile === 'preview.png' || lowerFile === 'preview.jpeg' || lowerFile === 'preview.jpg';
      });

      // Find the main file (not the preview file)
      const mainFile = subItems.find(file => {
        const ext = path.extname(file).toLowerCase().slice(1);
        return contentList.includes(ext as ContentType) &&
          !file.toLowerCase().startsWith('preview.');
      });

      // Only create folder entry if there's a main file (not just preview files)
      // If preview.png or preview.jpeg exists, we'll use those as the preview image
      if (mainFile) {
        const ext = path.extname(mainFile).toLowerCase().slice(1);
        const mainFilePath = path.join(itemPath, mainFile);
        const mainDimensions = await getImageDimensions(mainFilePath);

        let previewDimensions: { width?: number; height?: number; } = {};
        // Use preview.png or preview.jpeg if they exist
        if (previewFile) {
          const previewFilePath = path.join(itemPath, previewFile);
          previewDimensions = await getImageDimensions(previewFilePath);
        }

        // Create entry ID from relative path
        const entryId = relativeItemPath.replace(/\//g, '--');

        entries.push({
          id: entryId,
          name: item.name,
          file: `${relativeItemPath}/${mainFile}`,
          // Prioritize preview.png/jpeg as the preview image for folders
          // If preview exists, use it; otherwise fall back to the main file
          preview: previewFile ? `${relativeItemPath}/${previewFile}` : null,
          type: ext as ContentType,
          isFolder: true,
          // Use preview dimensions if available, otherwise use main file dimensions
          width: previewDimensions.width || mainDimensions.width,
          height: previewDimensions.height || mainDimensions.height,
          previewWidth: previewDimensions.width,
          previewHeight: previewDimensions.height,
          relativePath: relativeItemPath,
          parentPath: parentPath,
          depth: depth,
        });
      }
      // If directory only contains preview files (or is named "preview"), don't create a folder entry
      // The preview files will be handled as regular files if needed
    } else if (item.isFile()) {
      // Skip preview files - they should not be rendered as individual tiles
      // Preview files (preview.png, preview.jpeg, preview.jpg) are used as preview images for folders
      const fileName = item.name.toLowerCase();
      const isPreviewFile = fileName === 'preview.png' || 
                           fileName === 'preview.jpeg' || 
                           fileName === 'preview.jpg';
      
      if (isPreviewFile) {
        // Skip creating an entry for preview files - they're only used as folder previews
        continue;
      }

      // Handle files at any depth
      const ext = path.extname(item.name).toLowerCase().slice(1);
      if (contentList.includes(ext as ContentType)) {
        const dimensions = await getImageDimensions(itemPath);
        
        // Create entry ID from relative path
        const entryId = relativeItemPath.replace(/\//g, '--');

        entries.push({
          id: entryId,
          name: item.name,
          file: relativeItemPath,
          preview: null,
          type: ext as ContentType,
          isFolder: false,
          width: dimensions.width,
          height: dimensions.height,
          relativePath: relativeItemPath,
          parentPath: parentPath,
          depth: depth,
        });
      }
    }
  }
}

/**
 * Loads content from a directory recursively, supporting any depth of nesting
 * @param basePath - Base directory path to scan
 */
function loadContentInDirectory(basePath: string) {
  return async () => {
    const entries: Array<{
      id: string;
      name: string;
      file: string;
      preview: string | null;
      type: ContentType;
      isFolder: boolean;
      width?: number;
      height?: number;
      previewWidth?: number;
      previewHeight?: number;
      relativePath: string;
      parentPath: string;
      depth: number;
    }> = [];

    // Recursively scan the directory
    await scanDirectoryRecursive(basePath, basePath, entries);

    return entries;
  };
}

// Helper function to get image dimensions
async function getImageDimensions(filePath: string): Promise<{ width?: number; height?: number }> {
  try {
    const supportedImageTypes = ['png', 'jpg', 'jpeg', 'webp', 'gif'];
    const ext = path.extname(filePath).toLowerCase().slice(1);
    
    if (supportedImageTypes.includes(ext)) {
      const buffer = await fs.readFile(filePath);
      const dimensions = sizeOf(buffer);
      return {
        width: dimensions.width,
        height: dimensions.height
      };
    }
  } catch (error) {
    console.warn(`Could not read dimensions for ${filePath}:`, error);
  }
  return {};
}

const resourcesCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/content' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const newslettersCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/pages/newsletters' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    version: z.string().optional(),
    lastUpdated: z.coerce.date().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const contentList = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf', 'zip', 'mp4'] as const;
type ContentType = typeof contentList[number]
const imagePath = path.resolve(import.meta.dirname, '../../public/images');
const bookletPath = path.resolve(import.meta.dirname, '../../public/booklets');

const imageCollection = defineCollection({
  loader: loadContentInDirectory(imagePath),
  schema: z.object({
    name: z.string(),
    file: z.string(),
    preview: z.string().nullable(),
    type: z.enum(contentList),
    isFolder: z.boolean(),
    width: z.number().optional(),
    height: z.number().optional(),
    previewWidth: z.number().optional(),
    previewHeight: z.number().optional(),
    relativePath: z.string(),
    parentPath: z.string(),
    depth: z.number(),
  }),
});

const bookletCollection = defineCollection({
  loader: loadContentInDirectory(bookletPath),
  schema: z.object({
    name: z.string(),
    file: z.string(),
    preview: z.string().nullable(),
    type: z.enum(contentList),
    isFolder: z.boolean(),
    width: z.number().optional(),
    height: z.number().optional(),
    previewWidth: z.number().optional(),
    previewHeight: z.number().optional(),
    relativePath: z.string(),
    parentPath: z.string(),
    depth: z.number(),
  }),
});

export const collections = {
  'resources': resourcesCollection,
  'images': imageCollection,
  'newsletters': newslettersCollection,
  'booklets': bookletCollection,
}; 

