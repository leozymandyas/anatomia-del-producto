import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { CATEGORIAS } from './lib/categorias';

// Carpetas-categoría: agrupan los artículos y definen su color/tema, pero NO
// deben aparecer en la URL.
const CATS: readonly string[] = CATEGORIAS;

/**
 * Genera el slug (= URL) de cada documento. Replica el comportamiento por
 * defecto de Astro (slugifica cada segmento y elimina `/index`) pero descarta
 * el segmento de categoría para que la URL quede plana:
 *   `estrategia/el-pm-en-la-era-de-la-ia.md` → `el-pm-en-la-era-de-la-ia`
 * Los archivos siguen viviendo en sus carpetas, así que la categoría se deriva
 * del `filePath` (ver src/lib/categorias.ts).
 */
function generateId({ entry }: { entry: string }): string {
	const segmentos = entry.replace(/\.(mdx?|markdown)$/i, '').split('/');
	if (segmentos.length > 1 && CATS.includes(segmentos[0])) {
		segmentos.shift();
	}
	return segmentos
		.map((s) =>
			s
				.toLowerCase()
				.trim()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9\-/]/g, '')
		)
		.join('/')
		.replace(/\/index$/, '');
}

export const collections = {
	docs: defineCollection({
		loader: docsLoader({ generateId }),
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
