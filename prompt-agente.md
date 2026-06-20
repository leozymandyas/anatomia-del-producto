# Prompt de agente — Anatomía del Producto

Contexto e instrucciones para que un agente de IA haga cambios estructurales en
el sitio. Úsalo como prompt de sistema o pégalo al inicio de una conversación.

---

## Contexto del proyecto

Sitio estático con **Astro 6 + Starlight 0.39**. Diseño **"edición digital"**
(periódico/revista, *liquid-glass*): cabecera superior a todo el ancho, **sin
sidebar**, tipografía Newsreader + IBM Plex Mono, y **dos temas** de color —
azul (por defecto) y morado (para Obsidian). El contenido vive en
`src/content/docs/`. Deploy automático en Vercel al hacer push a `main`.

### Carpetas de contenido

```
src/content/docs/
├── index.mdx              → /
├── contacto.md            → /contacto/
└── <categoria>/           → estrategia | validacion | herramientas | obsidian
    └── *.md | *.mdx       → artículos (URL PLANA, sin la categoría)
```

- **URLs planas:** `src/content.config.ts` (`generateId`) descarta el segmento de
  categoría. `src/content/docs/estrategia/x.md` → `/x/`.
- La **categoría = carpeta** define color y tema (Obsidian → morado).
  Definición en `src/lib/categorias.ts`.
- `/articulos/`, `/tags/` y `/tags/<tag>/` se generan desde `src/pages/`.
- Config del sitio: `astro.config.mjs`. Esquema de frontmatter:
  `src/content.config.ts`. Estilos: `src/styles/custom.css`.

---

## Esquema de frontmatter

```yaml
title: string              # obligatorio
description: string        # recomendado — SEO y extracto
tags: ["Tag Uno", "Tag"]   # opcional
pubDate: YYYY-MM-DD        # recomendado — orden, anterior/siguiente, "último"
icon: string               # opcional — emoji o ruta de imagen
relatedArticles:           # opcional — SLUGS PLANOS (sin carpeta ni extensión)
  - nombre-archivo
landing: boolean           # opcional — portada a ancho completo, sin título auto
```

El **slug** de un artículo es el nombre del archivo sin extensión (la categoría
no entra). Ej.: `estrategia/mi-articulo.md` → slug `mi-articulo`.
El **color/tema** salen de la carpeta, NO del frontmatter.

---

## Operaciones de contenido

### Agregar un artículo
1. Crear `src/content/docs/<categoria>/<slug>.md` (minúsculas, sin tildes ni espacios).
2. Frontmatter mínimo: `title`, `description`, `tags`, `pubDate`.
3. Escribir el contenido en Markdown. Aparece solo en `/articulos/`, tags y anterior/siguiente.

### Agregar una categoría
1. Crear la carpeta `src/content/docs/<categoria>/`.
2. Añadirla en `src/lib/categorias.ts`: a `CATEGORIAS` y a `INFO_CATEGORIAS`
   (`label`, `color` hex, `tema`: `'azul'` u `'obsidian'`).
   `generateId` ya lee `CATEGORIAS` (URL plana automática). El filtro de
   `/articulos/` itera `CATEGORIAS` (aparece solo).

### Quitar / renombrar un artículo
- Quitar: borrar el archivo. Revisar `relatedArticles` que lo apunten.
- Renombrar: cambia el slug → cambia la URL. Actualizar `relatedArticles` que usen el slug viejo.

### Relacionar artículos
Campo `relatedArticles` con **slugs planos**. Para relación bidireccional,
agregarlo en ambos.

### Tema de color de un artículo
**No** se controla por frontmatter: depende de la carpeta-categoría. Para que un
artículo sea morado, ponlo en `obsidian/` (o en una categoría con `tema:
'obsidian'`). El tema lo aplica `src/components/overrides/Head.astro` poniendo
`data-tema="obsidian"` en `<html>` según `temaDeDoc(entry)`.

---

## Operaciones de estilo

### Paleta de colores (`src/styles/custom.css`, `:root`)

```css
:root {
    --paper-1: #F6F5F0;  --paper-2: #EEEDE6;   /* fondo (papel) */
    --ink: #1A1814;  --ink-soft: #56524A;  --mono-muted: #7d7868;
    --hairline: #D9D5CA;
    /* Tema azul (por defecto) */
    --accent: #2C5BA8;  --accent-dark: #21407E;  --accent-rgb: 44, 91, 168;
}
[data-tema='obsidian'] {                       /* Tema morado (Obsidian) */
    --accent: #6A4FB0;  --accent-dark: #43356E;  --accent-rgb: 106, 79, 176;
}
```

- Acento: editar `--accent` / `--accent-dark` / `--accent-rgb` (en ambos bloques
  si quieres cambiar ambos temas). Si cambias el azul, retinta el logo
  (`rgb(44,91,168)` en `src/assets/logo.svg` y `public/favicon.svg`).
- Fondo: `--paper-1` / `--paper-2`. Texto: `--ink` / `--ink-soft`.
- Color por categoría (chips/dots): `INFO_CATEGORIAS` en `src/lib/categorias.ts`.

### Tipografías

1. **Carga** en `astro.config.mjs` (`head`): un `<link>` de Google Fonts con
   `Newsreader` + `IBM Plex Mono`. Cambiar el `href` para otras fuentes.
2. **Asignación** en `custom.css`:
   ```css
   body { font-family: 'Newsreader', Georgia, serif; }   /* títulos y cuerpo */
   .mono { font-family: 'IBM Plex Mono', monospace; }     /* etiquetas/UI */
   ```

---

## Notas técnicas importantes

- **No mover archivos fuera de `src/content/docs/`**: el loader (`docsLoader`) solo
  lee de ahí.
- **Nombres** de carpetas/archivos: minúsculas, sin espacios ni tildes (evita
  errores en el build de Vercel).
- **`pubDate`** en `YYYY-MM-DD` (YAML lo parsea como Date).
- **`relatedArticles`**: slugs planos; un slug inexistente no rompe el build (la
  tarjeta no aparece).
- **No reintroducir `<ClientRouter />`** (view transitions) en `Head.astro`:
  rompía la interactividad al navegar.
- **Cambios en `astro.config.mjs`** o `src/content.config.ts` requieren reiniciar
  `npm run dev`. Los de `custom.css` se reflejan en caliente.
- **Deploy**: push a `main` → Vercel. En este entorno el remoto HTTPS no tiene
  credenciales; usar SSH:
  `git push git@github.com:leozymandyas/anatomia-del-producto.git main`.
- **Verificar** con `npm run build` antes de subir (el aviso de `/404` es benigno).
