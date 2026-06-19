import type { CollectionEntry } from 'astro:content';

/**
 * Las "regiones" son únicamente una categoría del frontend: agrupan los
 * artículos en el sidebar y en los índices, pero NO forman parte de la URL.
 *
 * El slug (URL) de cada artículo se aplana en `src/content.config.ts` mediante
 * `generateId`, que descarta el segmento de región. Aquí derivamos la región a
 * partir de `filePath` (la ruta real del archivo en disco), que sí conserva la
 * carpeta — así el sidebar autogenerado por directorio y estos índices siguen
 * funcionando sin tener la región en la URL.
 */
export const REGIONES = ['cabeza', 'caja-toracica', 'extremidades'] as const;

export type Region = (typeof REGIONES)[number];

const ETIQUETAS: Record<Region, string> = {
	cabeza: 'Cabeza',
	'caja-toracica': 'Caja torácica',
	extremidades: 'Extremidades',
};

/** Devuelve la región (carpeta) de un doc a partir de su `filePath`, o `null`. */
export function regionDeDoc(doc: CollectionEntry<'docs'>): Region | null {
	const fp = doc.filePath ?? '';
	const match = fp.match(/\/docs\/([^/]+)\//);
	const region = match?.[1];
	return region && (REGIONES as readonly string[]).includes(region)
		? (region as Region)
		: null;
}

/** `true` si el doc es un artículo (vive dentro de una región). */
export function esArticulo(doc: CollectionEntry<'docs'>): boolean {
	return regionDeDoc(doc) !== null;
}

/** Etiqueta legible de la región del doc (p. ej. "Caja torácica"), o `''`. */
export function etiquetaRegion(doc: CollectionEntry<'docs'>): string {
	const region = regionDeDoc(doc);
	return region ? ETIQUETAS[region] : '';
}
