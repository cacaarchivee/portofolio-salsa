import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    description: z.string(),
    category: z.enum(['Professional work', 'Academic project', 'Academic project / thesis']),
    company: z.string().optional(),
    role: z.string(),
    timeframe: z.string().optional(),
    stack: z.array(z.string()).min(1),
    cover: z.string(),
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    sourceUrl: z.url().optional(),
    demoUrl: z.url().optional(),
  }),
});

export const collections = { projects };
