import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import path from 'path';
import { loadBookletsInDirectory } from './loaders/booklets';
import { loadContentInDirectory } from './loaders/images';
import { contentList } from './loaders/shared';

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
  loader: loadBookletsInDirectory(bookletPath),
  schema: z.object({
    name: z.string(),
    file: z.string(),
    preview: z.string().nullable(),
    type: z.enum(contentList),
    width: z.number().optional(),
    height: z.number().optional(),
    previewWidth: z.number().optional(),
    previewHeight: z.number().optional(),
  }),
});

export const collections = {
  resources: resourcesCollection,
  images: imageCollection,
  newsletters: newslettersCollection,
  booklets: bookletCollection,
};
