import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				tags: z.array(z.string()).optional().default([]),
				pageTheme: z.string().optional(),
				pubDate: z.date().optional(),
				icon: z.string().optional(),
				relatedArticles: z.array(z.string()).optional().default([]),
				// Marca una página como "portada": oculta el título automático y el
				// TOC para que el hero personalizado sea el protagonista (ver
				// PageTitle, PageSidebar y MarkdownContent overrides).
				landing: z.boolean().optional().default(false),
			}),
		}),
	}),
	i18n: defineCollection({
		loader: i18nLoader(),
		schema: i18nSchema(),
	}),
};
