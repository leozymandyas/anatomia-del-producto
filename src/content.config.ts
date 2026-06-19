import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

// Carpetas que representan una "región": son solo una categoría del frontend
// (agrupan en el sidebar y en los índices) y NO deben aparecer en la URL.
const REGIONES = ['cabeza', 'caja-toracica', 'extremidades'];

/**
 * Genera el slug (= URL) de cada documento. Replica el comportamiento por
 * defecto de Astro (slugifica cada segmento y elimina `/index`) pero descarta
 * el segmento de región para que la URL quede plana:
 *   `cabeza/el-pm-en-la-era-de-la-ia.md` → `el-pm-en-la-era-de-la-ia`
 * Los archivos siguen viviendo en sus carpetas, así que el sidebar autogenerado
 * por directorio mantiene el agrupamiento por región.
 */
function generateId({ entry }: { entry: string }): string {
	const segmentos = entry.replace(/\.(mdx?|markdown)$/i, '').split('/');
	if (segmentos.length > 1 && REGIONES.includes(segmentos[0])) {
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
