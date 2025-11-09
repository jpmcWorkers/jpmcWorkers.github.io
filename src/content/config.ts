import { defineCollection, z } from 'astro:content';
import { glob, } from 'astro/loaders';
import path from 'path';
import fs from 'fs/promises';
import sizeOf from 'image-size';



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
    }> = [];

    // Get all items in the images folder
    const items = await fs.readdir(basePath, { withFileTypes: true });

    for (const item of items) {
      const itemPath = path.join(basePath, item.name);

      if (item.isDirectory()) {
        // Handle subfolders with any file type and optional preview
        const subItems = await fs.readdir(itemPath);
        const previewFile = subItems.find(file => file.startsWith('preview.'));

        // Find the main file (not the preview file)
        const mainFile = subItems.find(file => {
          const ext = path.extname(file).toLowerCase().slice(1);
          return contentList.includes(ext as ContentType) &&
            !file.startsWith('preview.');
        });

        if (mainFile) {
          const ext = path.extname(mainFile).toLowerCase().slice(1);

          // Get dimensions for main file and preview
          const mainFilePath = path.join(itemPath, mainFile);
          const mainDimensions = await getImageDimensions(mainFilePath);

          let previewDimensions: { width?: number; height?: number; } = {};
          if (previewFile) {
            const previewFilePath = path.join(itemPath, previewFile);
            previewDimensions = await getImageDimensions(previewFilePath);
          }

          entries.push({
            id: item.name,
            name: item.name,
            file: `${item.name}/${mainFile}`,
            preview: previewFile ? `${item.name}/${previewFile}` : null,
            type: ext as ContentType,
            isFolder: true,
            width: mainDimensions.width,
            height: mainDimensions.height,
            previewWidth: previewDimensions.width,
            previewHeight: previewDimensions.height,
          });
        }
      } else if (item.isFile()) {
        // Handle single files
        const ext = path.extname(item.name).toLowerCase().slice(1);
        if (contentList.includes(ext as ContentType)) {
          // Get dimensions for single file
          const filePath = path.join(basePath, item.name);
          const dimensions = await getImageDimensions(filePath);

          entries.push({
            id: item.name,
            name: item.name,
            file: item.name,
            preview: null,
            type: ext as ContentType,
            isFolder: false,
            width: dimensions.width,
            height: dimensions.height,
          });
        }
      }
    }

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
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletters' }),
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
  }),
});

export const collections = {
  'resources': resourcesCollection,
  'images': imageCollection,
  'newsletters': newslettersCollection,
  'booklets': bookletCollection,
}; 

