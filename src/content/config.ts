import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const whatCanIDoCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/what-can-i-do' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = {
  'what-can-i-do': whatCanIDoCollection,
}; 