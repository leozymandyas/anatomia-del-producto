# Documentación del proyecto — Anatomía del Producto

> Referencia de arquitectura: estructura, stack y todas las personalizaciones.
> Diseño actual: **"edición digital"** (periódico/revista, *liquid-glass*).

---

## 1. ¿Qué es?

**Anatomía del Producto** es un blog sobre creación de productos digitales en la
era de la IA (`https://anatomia-del-producto.com`). Está construido con **Astro**
+ **Starlight**. Starlight es un tema de documentación, pero aquí se adaptó a un
blog tipo periódico: se **oculta el sidebar** y la navegación vive en una
cabecera superior; se reaprovechan sus colecciones de contenido, su buscador
(Pagefind) y su pipeline de Markdown.

---

## 2. Stack

| Tecnología | Versión | Para qué |
|---|---|---|
| **Astro** | 6.3.x | Framework. Genera HTML estático en el build. |
| **Starlight** | 0.39.x | Colecciones de contenido, buscador, overrides, routing. |
| **Sharp** | 0.34.x | Procesamiento de imágenes. |

```bash
npm run dev       # http://localhost:4321
npm run build     # genera /dist
npm run preview   # sirve /dist
```

---

## 3. Estructura

```
src/
├── assets/logo.svg                 ← figura vitruviana (marca)
├── components/
│   ├── overrides/                  ← reemplazan componentes de Starlight
│   │   ├── Head.astro              ← tema morado (Obsidian) + sin ClientRouter
│   │   ├── Header.astro            ← masthead + cabecera glass + nav + buscador
│   │   ├── Footer.astro            ← footer (sticky al fondo)
│   │   ├── PageTitle.astro         ← tarjeta de título en vidrio (artículos)
│   │   ├── MarkdownContent.astro   ← cuerpo + relacionados + anterior/siguiente
│   │   └── PageSidebar.astro       ← vacío (sin TOC de página)
│   ├── HomePage.astro              ← cuerpo de la portada
│   ├── RelatedArticles.astro       ← tarjetas glass
│   ├── ArticlePagination.astro     ← anterior / siguiente (cronológico)
│   ├── BrandMark.astro             ← logo SVG temable
│   └── UltimoArticulo.astro
├── content/
│   ├── docs/                       ← contenido por categoría
│   │   ├── index.mdx               ← portada (/)
│   │   ├── contacto.md
│   │   ├── estrategia/  validacion/  herramientas/  obsidian/
│   └── i18n/es.json
├── lib/categorias.ts               ← categorías: etiqueta, color, tema, helpers
├── pages/
│   ├── articulos/index.astro       ← /articulos/ (buscador en vivo + filtros)
│   └── tags/{index,[tag]}.astro
├── styles/custom.css
└── content.config.ts               ← esquema + URLs planas

public/favicon.svg
astro.config.mjs
```

---

## 4. Categorías, temas y URLs planas

`src/lib/categorias.ts` es el corazón de la taxonomía:

- `CATEGORIAS = ['estrategia','validacion','herramientas','obsidian']` — cada una
  es una **carpeta** bajo `src/content/docs/`.
- `INFO_CATEGORIAS` define para cada una: `label`, `color` y `tema`
  (`'azul'` o `'obsidian'` → morado).
- Helpers: `categoriaDeDoc`, `esArticulo`, `etiquetaCategoria`, `colorCategoria`,
  `temaDeDoc`, `minutosLectura`. Derivan la categoría del `filePath` del doc.

**URLs planas:** `src/content.config.ts` define `generateId`, que descarta el
segmento de categoría del slug:

```
src/content/docs/estrategia/el-pm-en-la-era-de-la-ia.md
        → URL:  /el-pm-en-la-era-de-la-ia/
```

Así la categoría agrupa y colorea, pero no aparece en la URL. Los enlaces
internos y `relatedArticles` usan el **slug plano**.

**Cambio de tema (azul ↔ morado):** `Head.astro` calcula `temaDeDoc(entry)` y, si
es `'obsidian'`, inyecta `<script is:inline>` que pone `data-tema="obsidian"` en
`<html>` antes del primer paint. El CSS `[data-tema='obsidian']` redefine
`--accent` y derivados; como todo el sitio usa `var(--accent)`, la página entera
cambia a morado.

---

## 5. Crear un artículo

Crea un `.md` (o `.mdx`) en la carpeta de su categoría con frontmatter:

```markdown
---
title: Título del artículo
description: Descripción corta (SEO y extracto).
tags: ["IA", "Producto"]
pubDate: 2026-03-15
---

Primer párrafo (lleva capitular automática).

## Subtítulo
```

Aparece automáticamente en `/articulos/`, en `/tags/<tag>/` y en el
"anterior/siguiente". Su color y tema salen de la carpeta.

---

## 6. `astro.config.mjs`

Controla el sitio: `title`, `favicon`, `logo`, `head` (fuentes), `customCss`,
`components` (overrides) y `sidebar`. El `sidebar` se mantiene válido pero
**está oculto** por CSS (la navegación está en la cabecera).

---

## 7. Overrides de Starlight

Se registran en `astro.config.mjs` → `components`. Qué hace cada uno:

- **`Head.astro`** — passthrough del Head por defecto + activación del tema
  morado. **No** incluye `<ClientRouter />`: las view transitions rompían la
  interactividad al navegar (los listeners de `<script>` no se re-registraban).
- **`Header.astro`** — el *chrome* superior: masthead (fecha + categoría),
  cabecera de vidrio con el logo (`BrandMark`), el buscador (`<Search>` de
  Starlight estilizado) y la navegación (Artículos / Temas / Contacto).
- **`Footer.astro`** — `.site-footer`, pegado al fondo (sticky).
- **`PageTitle.astro`** — en artículos renderiza la **tarjeta de título en
  vidrio** (breadcrumb + chip de categoría + h1 + byline con fecha y minutos de
  lectura). En portadas (`landing`) no renderiza nada.
- **`MarkdownContent.astro`** — envuelve el cuerpo (`<slot/>`) y, en artículos,
  añade `RelatedArticles` + `ArticlePagination`.
- **`PageSidebar.astro`** — vacío (no hay índice "en esta página").

---

## 8. Componentes propios

- **`HomePage.astro`** — cuerpo de la portada: hero, "Secciones" (las 4
  categorías), "Últimos artículos" (filas planas) y newsletter.
- **`RelatedArticles.astro`** — tarjetas glass de los `relatedArticles`.
- **`ArticlePagination.astro`** — anterior/siguiente calculado por orden
  **cronológico** (`pubDate`), en tarjetas glass.
- **`BrandMark.astro`** — el logo en SVG con el círculo en `var(--accent)`, así
  se tiñe con el tema. Se usa en la cabecera y, semitransparente, en bylines.
- **`UltimoArticulo.astro`** — botón al artículo más reciente.

---

## 9. Estilos: `src/styles/custom.css`

Starlight usa `@layer starlight.core`; el CSS sin capa de `custom.css` gana sin
`!important`. Secciones principales:

- **Tokens** (`:root`): papel/tinta + tema azul; `[data-tema='obsidian']` para el
  morado.
- **Layout invertido**: `.header` a todo el ancho, sidebar oculto, contenido a
  ancho completo (cada bloque centra su columna). Footer sticky vía cadena flex.
- **Tipografía**: Newsreader (cuerpo/títulos) + IBM Plex Mono (`.mono` y UI).
- **Chrome**: `.masthead`, `.site-header`, `.site-nav`, `.site-footer`.
- **Liquid-glass**: `.btn-primary`/`.btn-ghost`, `.chip`, tarjetas, buscador,
  tarjeta de título, citas y asides.
- **Portada y listado**: `.hero`, `.seccion-row`, `.article-row`, `.big-search`,
  `.filter`.

---

## 10. Páginas especiales (`.astro`)

Usan `<StarlightPage frontmatter={{ ..., landing: true }}>` para ir a ancho
completo con el mismo chrome:

- **`/articulos/`** — listado con **buscador en vivo** + **filtros por
  categoría** (un `<script is:inline>` filtra las filas por texto y categoría).
- **`/tags/`** — chips de todos los temas con contador.
- **`/tags/<tag>/`** — artículos de ese tema (filas con su color de categoría).
- **`/404`** — página de error.

---

## 11. Assets

- `public/favicon.svg` — favicon (servido tal cual desde la raíz).
- `src/assets/logo.svg` — marca; Astro la procesa en el build.
- El logo de la cabecera no usa estos archivos directamente sino
  `BrandMark.astro` (SVG inline, temable).

---

## 12. Deploy

Auto-deploy en Vercel al hacer push a `main`. En este entorno el remoto HTTPS no
tiene credenciales; el push se hace por SSH
(`git@github.com:leozymandyas/anatomia-del-producto.git`).
