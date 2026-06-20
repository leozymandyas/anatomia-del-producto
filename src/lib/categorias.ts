import type { CollectionEntry } from 'astro:content';

/**
 * Las "categorías" son carpetas bajo `src/content/docs/`. Agrupan los artículos
 * en la home, el listado y los índices, y definen el color/tema de cada uno.
 * NO forman parte de la URL: `src/content.config.ts` aplana el slug con
 * `generateId`, descartando el segmento de categoría. La categoría se deriva del
 * `filePath` (ruta real en disco), que sí conserva la carpeta.
 *
 * Tema visual (ver custom.css): Obsidian usa el tema morado; el resto, azul.
 */
export const CATEGORIAS = ['estrategia', 'validacion', 'herramientas', 'obsidian'] as const;

export type Categoria = (typeof CATEGORIAS)[number];

interface InfoCategoria {
	/** Etiqueta legible (chip, dot, breadcrumb). */
	label: string;
	/** Color de acento de la categoría. */
	color: string;
	/** Tema de página: 'azul' (por defecto) u 'obsidian' (morado). */
	tema: 'azul' | 'obsidian';
}

export const INFO_CATEGORIAS: Record<Categoria, InfoCategoria> = {
	estrategia: { label: 'Estrategia', color: '#21407E', tema: 'azul' },
	validacion: { label: 'Validación', color: '#2C5BA8', tema: 'azul' },
	herramientas: { label: 'Herramientas', color: '#2E78B8', tema: 'azul' },
	obsidian: { label: 'Obsidian', color: '#6A4FB0', tema: 'obsidian' },
};

/** Devuelve la categoría (carpeta) de un doc desde su `filePath`, o `null`. */
export function categoriaDeDoc(doc: CollectionEntry<'docs'>): Categoria | null {
	const fp = doc.filePath ?? '';
	const match = fp.match(/\/docs\/([^/]+)\//);
	const cat = match?.[1];
	return cat && (CATEGORIAS as readonly string[]).includes(cat) ? (cat as Categoria) : null;
}

/** `true` si el doc es un artículo (vive dentro de una categoría). */
export function esArticulo(doc: CollectionEntry<'docs'>): boolean {
	return categoriaDeDoc(doc) !== null;
}

/** Etiqueta legible de la categoría del doc (p. ej. "Validación"), o `''`. */
export function etiquetaCategoria(doc: CollectionEntry<'docs'>): string {
	const cat = categoriaDeDoc(doc);
	return cat ? INFO_CATEGORIAS[cat].label : '';
}

/** Color de acento de la categoría del doc, o el azul por defecto. */
export function colorCategoria(doc: CollectionEntry<'docs'>): string {
	const cat = categoriaDeDoc(doc);
	return cat ? INFO_CATEGORIAS[cat].color : '#2C5BA8';
}

/** Tema de página del doc: 'azul' u 'obsidian' (morado). */
export function temaDeDoc(doc: CollectionEntry<'docs'>): 'azul' | 'obsidian' {
	const cat = categoriaDeDoc(doc);
	return cat ? INFO_CATEGORIAS[cat].tema : 'azul';
}

/** Minutos de lectura estimados a partir del cuerpo del doc (~200 palabras/min). */
export function minutosLectura(doc: CollectionEntry<'docs'>): number {
	const palabras = (doc.body ?? '').trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(palabras / 200));
}
