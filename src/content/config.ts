import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import path from 'path';
import fs from 'fs/promises';



const whatCanIDoCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/what-can-i-do' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const imageCollection = defineCollection({
  loader: async () => {
    const basePath = path.resolve(import.meta.dirname, 'images');
    const entries: Array<{
      id: string;
      name: string;
      file: string;
      preview: string | null;
      type: 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'pdf';
      isFolder: boolean;
    }> = [];
    
    // Get all items in the images folder
    const items = await fs.readdir(basePath, { withFileTypes: true });
    
    for (const item of items) {
      const itemPath = path.join(basePath, item.name);
      
      if (item.isDirectory()) {
        // Handle subfolders with any file type and optional preview
        const subItems = await fs.readdir(itemPath);
        const previewFile = subItems.find(file => file === 'preview.png' || file === 'preview.jpg' || file === 'preview.webp');
        
        // Find the main file (not the preview file)
        const mainFile = subItems.find(file => {
          const ext = path.extname(file).toLowerCase().slice(1);
          return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf'].includes(ext) && 
                 !file.startsWith('preview.');
        });
        
        if (mainFile) {
          const ext = path.extname(mainFile).toLowerCase().slice(1);
          entries.push({
            id: item.name,
            name: item.name,
            file: path.join(item.name, mainFile),
            preview: previewFile ? path.join(item.name, previewFile) : null,
            type: ext as 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'pdf',
            isFolder: true,
          });
        }
      } else if (item.isFile()) {
        // Handle single files
        const ext = path.extname(item.name).toLowerCase().slice(1);
        if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf'].includes(ext)) {
          entries.push({
            id: item.name,
            name: item.name,
            file: item.name,
            preview: null,
            type: ext as 'png' | 'jpg' | 'jpeg' | 'webp' | 'gif' | 'pdf',
            isFolder: false,
          });
        }
      }
    }
    
    return entries;
  },
  schema: z.object({
    name: z.string(),
    file: z.string(),
    preview: z.string().nullable(),
    type: z.enum(['png', 'jpg', 'jpeg', 'webp', 'gif', 'pdf']),
    isFolder: z.boolean(),
  }),
});

export const collections = {
  'what-can-i-do': whatCanIDoCollection,
  'images': imageCollection,
}; 