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

Ver **`guia-contenido.md`** para documentación completa de estructura, frontmatter, tags, temas de color, secciones y más.

---

## Estructura del proyecto

```
src/
├── assets/                    → imágenes y logos
├── components/
│   ├── overrides/             → componentes que reemplazan los de Starlight
│   │   ├── Footer.astro       → copyright automático en cada página
│   │   ├── Header.astro       → header oculto en desktop
│   │   ├── MarkdownContent.astro → añade tags y soporte de pageTheme
│   │   ├── MobileMenuFooter.astro
│   │   ├── PageSidebar.astro  → TOC integrado en el sidebar
│   │   └── Sidebar.astro      → sidebar con collapse, branding y copyright
│   ├── SidebarWithToc.astro
│   └── YouTube.astro          → componente para incrustar videos
├── content/
│   └── docs/
│       ├── index.mdx          → página de inicio (/)
│       ├── sobre-mi.md
│       ├── contacto.md
│       ├── cabeza/            → sección Cabeza
│       ├── caja-toracica/     → sección Caja torácica
│       └── extremidades/      → sección Extremidades
├── pages/
│   ├── articulos/index.astro  → /articulos/ — índice completo
│   └── tags/
│       ├── index.astro        → /tags/ — lista de tags
│       └── [tag].astro        → /tags/<tag>/ — artículos por tag
└── styles/
    └── custom.css             → paleta, tipografía, layout, temas de página

astro.config.mjs               → configuración del sitio y sidebar
guia-contenido.md              → guía para escribir y publicar artículos
```

---

## Paleta de colores

| Variable | Valor | Uso |
|---|---|---|
| `--c-bg` | `#FDF5E5` | Fondo general (crema cálida) |
| `--c-navy` | `#B25F28` | Acento principal (terracota) |
| `--c-text` | `#3D2010` | Texto del cuerpo |

Para cambiar la paleta, edita las variables `--c-*` en `src/styles/custom.css`.

---

## Fuentes

- **Alegreya** — nombre del sitio en el sidebar
- **PT Serif** — encabezados (h1–h6)
- **Lato** — cuerpo del texto

Cargadas desde Google Fonts en `astro.config.mjs`.
