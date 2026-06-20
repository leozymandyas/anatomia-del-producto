# Anatomía del Producto

Blog sobre creación de productos digitales en la era de la inteligencia artificial.
Construido con [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

**Sitio:** https://anatomia-del-producto.com
**Deploy:** Vercel (automático al hacer push a `main`)

El diseño es tipo **"edición digital"** (periódico/revista) con estética
*liquid-glass*: cabecera arriba a todo el ancho (sin menú lateral), tipografía
Newsreader + IBM Plex Mono y dos temas de color — **azul** (por defecto) y
**morado** para los artículos de Obsidian.

---

## Comandos

```bash
npm run dev      # servidor local en localhost:4321
npm run build    # compilar para producción
npm run preview  # previsualizar el build
```

---

## Publicar un artículo

1. Crea el archivo en `src/content/docs/<categoria>/nombre-del-articulo.md`
   (categorías: `estrategia`, `validacion`, `herramientas`, `obsidian`)
2. Escribe el frontmatter y el contenido
3. `git add . && git commit -m "Nuevo artículo: título" && git push`

Vercel despliega en ~1 minuto. La categoría (carpeta) define el color y el tema
del artículo. Ver **`guia-contenido.md`** para la documentación completa.

---

## Estructura del proyecto

```
src/
├── assets/
│   └── logo.svg                   → figura vitruviana (marca)
├── components/
│   ├── overrides/                 → componentes que reemplazan los de Starlight
│   │   ├── Head.astro             → activa el tema morado (Obsidian); sin view transitions
│   │   ├── Header.astro           → chrome: masthead + cabecera glass + nav + buscador
│   │   ├── Footer.astro           → pie de página (sticky al fondo)
│   │   ├── PageTitle.astro        → tarjeta de título en vidrio (artículos)
│   │   ├── MarkdownContent.astro  → cuerpo + relacionados + anterior/siguiente
│   │   ├── PageSidebar.astro      → vacío (sin TOC de página)
│   │   ├── Sidebar.astro          → (oculto en el diseño actual)
│   │   └── MobileMenuFooter.astro → vacío
│   ├── HomePage.astro             → cuerpo de la portada (hero, secciones, etc.)
│   ├── RelatedArticles.astro      → tarjetas glass de artículos relacionados
│   ├── ArticlePagination.astro    → anterior / siguiente (cronológico)
│   ├── BrandMark.astro            → logo en SVG, temable (azul / morado)
│   ├── UltimoArticulo.astro       → botón "Último artículo →"
│   └── YouTube.astro              → incrustar videos
├── content/
│   ├── docs/
│   │   ├── index.mdx              → portada (/)
│   │   ├── contacto.md            → /contacto/
│   │   ├── estrategia/            → categoría Estrategia (azul oscuro)
│   │   ├── validacion/            → categoría Validación (azul)
│   │   ├── herramientas/          → categoría Herramientas (azul claro)
│   │   └── obsidian/              → categoría Obsidian (morado)
│   └── i18n/es.json              → textos de interfaz en español
├── lib/
│   └── categorias.ts             → categorías: etiqueta, color, tema y helpers
├── pages/
│   ├── 404.astro
│   ├── articulos/index.astro      → /articulos/ (buscador en vivo + filtros)
│   └── tags/{index,[tag]}.astro   → /tags/ y /tags/<tag>/
└── styles/custom.css             → paleta, tipografía, layout, temas, glass

astro.config.mjs                   → config del sitio, fuentes y overrides
src/content.config.ts              → esquema de frontmatter + URLs planas (generateId)
```

---

## Campos de frontmatter

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | Título del artículo (obligatorio) |
| `description` | string | Descripción SEO y extracto en listados/tarjetas |
| `tags` | string[] | Etiquetas (generan `/tags/<tag>/`) |
| `pubDate` | fecha | `YYYY-MM-DD`. Ordena el listado y el "anterior/siguiente"; define el "Último artículo" del inicio |
| `icon` | string | Ícono junto al título: emoji o ruta de imagen |
| `relatedArticles` | string[] | Slugs (planos) de artículos relacionados |
| `landing` | boolean | Marca una página como portada (ancho completo, sin título automático) |

> El **color y el tema** de un artículo salen de su carpeta-categoría, no del frontmatter.

---

## Paleta y temas

Tokens en `src/styles/custom.css` (bloque `:root`).

| Token | Valor | Uso |
|---|---|---|
| `--paper-1` / `--paper-2` | `#F6F5F0` / `#EEEDE6` | Fondo (papel cálido) |
| `--ink` | `#1A1814` | Texto |
| `--ink-soft` | `#56524A` | Texto secundario |
| `--accent` / `--accent-dark` | `#2C5BA8` / `#21407E` | Acento azul (por defecto) |

**Tema morado (Obsidian):** `[data-tema="obsidian"]` cambia `--accent`/`--accent-dark`
a `#6A4FB0` / `#43356E`. Lo activa `Head.astro` según la categoría del artículo.

---

## Fuentes

- **Newsreader** — títulos y cuerpo del texto (serif).
- **IBM Plex Mono** — etiquetas, meta, navegación, botones y chips.

Cargadas desde Google Fonts en `astro.config.mjs`.

---

## Comportamientos automáticos

- **Tema por categoría** — los artículos en `obsidian/` pintan toda la página de morado; el resto, azul.
- **URLs planas** — la categoría no aparece en la URL (`/mi-articulo/`, no `/estrategia/mi-articulo/`).
- **Links externos** — las URLs `http(s)://` abren en pestaña nueva (plugin rehype).
- **Último artículo** — el botón del inicio apunta al `pubDate` más reciente.
- **Final del artículo** — artículos relacionados (si hay `relatedArticles`) + anterior/siguiente (cronológico), en tarjetas glass.
- **Listado en vivo** — `/articulos/` filtra por texto y por categoría en el cliente.
- **Footer sticky** — siempre al fondo, incluso en páginas cortas.
