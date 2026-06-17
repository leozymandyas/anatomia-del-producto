# Anatomía del Producto

Blog sobre creación de productos digitales en la era de la inteligencia artificial.
Construido con [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

**Sitio:** https://anatomia-del-producto.com
**Deploy:** Vercel (automático al hacer push a `main`)

---

## Comandos

```bash
npm run dev      # servidor local en localhost:4321
npm run build    # compilar para producción
npm run preview  # previsualizar el build
```

---

## Publicar un artículo

1. Crea el archivo en `src/content/docs/<seccion>/nombre-del-articulo.md`
2. Escribe el frontmatter y el contenido
3. `git add . && git commit -m "Nuevo artículo: título" && git push`

Vercel despliega en ~1 minuto.

Ver **`guia-contenido.md`** para documentación completa.

---

## Estructura del proyecto

```
src/
├── assets/                        → imágenes y logos (logo.svg)
├── components/
│   ├── overrides/                 → componentes que reemplazan los de Starlight
│   │   ├── Footer.astro           → copyright automático al final de cada página
│   │   ├── Header.astro           → header oculto en desktop, visible en móvil
│   │   ├── MarkdownContent.astro  → añade tags, artículos relacionados y paginación
│   │   ├── MobileMenuFooter.astro → vacío (elimina selector de tema oscuro/claro)
│   │   ├── PageSidebar.astro      → TOC móvil (el de escritorio está en el sidebar)
│   │   ├── PageTitle.astro        → título con soporte de ícono (emoji o imagen)
│   │   └── Sidebar.astro          → sidebar con branding sticky, collapse y copyright
│   ├── RelatedArticles.astro      → tarjetas de artículos relacionados
│   ├── SidebarWithToc.astro       → sidebar con TOC integrado
│   ├── UltimoArticulo.astro       → botón "Último artículo →" de la página de inicio
│   └── YouTube.astro              → componente para incrustar videos de YouTube
├── content/
│   ├── docs/
│   │   ├── index.mdx              → página de inicio (/)
│   │   ├── contacto.md            → /contacto/
│   │   ├── cabeza/                → sección Cabeza
│   │   ├── caja-toracica/         → sección Caja torácica
│   │   └── extremidades/          → sección Extremidades
│   └── i18n/
│       └── es.json                → sobreescribe textos de Starlight en español
├── pages/
│   ├── 404.astro                  → página de error personalizada con botón de inicio
│   ├── articulos/index.astro      → /articulos/ — índice completo de artículos
│   └── tags/
│       ├── index.astro            → /tags/ — lista de todos los tags
│       └── [tag].astro            → /tags/<tag>/ — artículos por tag
└── styles/
    └── custom.css                 → paleta, tipografía, layout, temas de página

astro.config.mjs                   → configuración del sitio, sidebar y rehype plugins
src/content.config.ts              → esquema de frontmatter con campos personalizados
guia-contenido.md                  → guía para escribir y publicar artículos
```

---

## Campos de frontmatter disponibles

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | Título del artículo (obligatorio) |
| `description` | string | Descripción SEO |
| `tags` | string[] | Etiquetas del artículo |
| `pubDate` | fecha | Fecha de publicación (YYYY-MM-DD). Determina el "Último artículo" del inicio. |
| `icon` | string | Ícono junto al título: emoji (`🧠`) o ruta de imagen (`/favicon.svg`) |
| `relatedArticles` | string[] | IDs de artículos relacionados (tarjetas al final del artículo) |
| `pageTheme` | string | Tema de color de la página (ej: `terracota`) |

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--c-bg` | `#FBF8F3` | Fondo general (papel cálido) |
| `--c-surface` | `#FFFFFF` | Tarjetas y bloques elevados |
| `--c-navy` | `#C25A2C` | Acento principal (terracota) |
| `--c-navy-dark` | `#9C431D` | Hover del acento |
| `--c-text` | `#2B2520` | Texto del cuerpo (carbón cálido) |
| `--c-text-strong` | `#16110D` | Negritas y títulos |

Para cambiar la paleta, edita las variables `--c-*` en `src/styles/custom.css`.

---

## Fuentes

- **Fraunces** — nombre del sitio, encabezados (h1–h6) y títulos de tarjetas
- **Inter** — cuerpo del texto y UI

Cargadas desde Google Fonts en `astro.config.mjs`.

---

## Comportamientos automáticos

- **Links externos** — cualquier URL `http(s)://` en el contenido abre en pestaña nueva (`target="_blank"`), implementado con un plugin rehype en `astro.config.mjs`
- **Último artículo** — el botón de la página de inicio apunta siempre al artículo con `pubDate` más reciente entre las secciones de contenido
- **Artículos relacionados** — se muestran al final del artículo si tiene el campo `relatedArticles`
- **Paginación** — anterior/siguiente aparece debajo de los artículos relacionados
- **TOC en sidebar** — en escritorio, la tabla de contenidos aparece inline bajo el artículo activo en el sidebar izquierdo (no en un panel derecho)
- **Sidebar sticky** — el bloque de logo/nombre permanece visible al hacer scroll en el sidebar
- **Sidebar colapsable** — botón en la esquina superior derecha; estado guardado en localStorage
