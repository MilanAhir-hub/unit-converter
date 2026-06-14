import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Real Unit Converter Team'),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    readTime: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    relatedConverters: z.array(z.string()).optional(),
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    formula: z.string().optional(),
    table: z.object({
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string())),
    }).optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
