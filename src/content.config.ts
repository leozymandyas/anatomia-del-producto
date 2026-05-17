import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: glob({
			pattern: ['**/*.md', '**/*.mdx'],
			base: './src/content/Anatomía del producto',
		}),
		schema: docsSchema({
			extend: z.object({
				tags: z.array(z.string()).optional().default([]),
				pageTheme: z.string().optional(),
				pubDate: z.date().optional(),
			}),
		}),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema(),
	}),
};
