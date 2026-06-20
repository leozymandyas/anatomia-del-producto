# Guía de personalización — Anatomía del Producto

Referencia práctica para mantener y cambiar el sitio sin recordar cómo funciona
por dentro. El diseño actual es **"edición digital"** (periódico/revista con
estética *liquid-glass*).

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 6 |
| Tema base | Starlight 0.39 (adaptado a blog, sin sidebar) |
| Hosting | Vercel (auto-deploy desde GitHub) |
| Repositorio | `leozymandyas/anatomia-del-producto` |
| Dominio | `anatomia-del-producto.com` |

---

## Paleta de colores

Los colores son variables CSS en `src/styles/custom.css`, bloque `:root`.
Cambiar un valor lo propaga a todo el sitio.

| Token | Valor | Rol |
|---|---|---|
| `--paper-1` | `#F6F5F0` | Fondo (papel), arriba |
| `--paper-2` | `#EEEDE6` | Fondo (papel), abajo |
| `--ink` | `#1A1814` | Texto principal |
| `--ink-soft` | `#56524A` | Texto secundario |
| `--mono-muted` | `#7d7868` | Etiquetas mono, meta |
| `--hairline` | `#D9D5CA` | Líneas finas |
| `--accent` | `#2C5BA8` | Acento (azul, por defecto) |
| `--accent-dark` | `#21407E` | Acento oscuro / hover |
| `--accent-rgb` | `44, 91, 168` | Versión RGB para vidrios y tintes |

### Dos temas: azul y morado (Obsidian)

El sitio cambia de tema según la **categoría** del artículo. El tema redefine
`--accent` / `--accent-dark` / `--accent-rgb` / `--glow-rgb`:

| Tema | Cuándo | Acento |
|---|---|---|
| Azul | por defecto (todo salvo Obsidian) | `#2C5BA8` / `#21407E` |
| Morado | artículos en la carpeta `obsidian/` | `#6A4FB0` / `#43356E` |

El morado se activa con el selector `[data-tema="obsidian"]`, que coloca
`src/components/overrides/Head.astro` en `<html>` antes del primer paint, leyendo
la categoría del artículo (`temaDeDoc` en `src/lib/categorias.ts`). Como todo
(cabecera, logo, glow, tarjetas, citas, footer) usa `var(--accent)`, la página
entera se vuelve morada sola.

### Color por categoría

Cada categoría tiene además un color propio (para chips y dots), en
`src/lib/categorias.ts` → `INFO_CATEGORIAS`:

| Categoría | Color | Tema |
|---|---|---|
| Estrategia | `#21407E` | azul |
| Validación | `#2C5BA8` | azul |
| Herramientas | `#2E78B8` | azul |
| Obsidian | `#6A4FB0` | morado |

### Cambiar la paleta completa

1. Abre `src/styles/custom.css`.
2. Edita los tokens en `:root` (papel/tinta) y, para el acento, los bloques
   `:root` (azul) y `[data-tema='obsidian']` (morado).
3. Si cambias el azul, retinta también el logo: `src/assets/logo.svg` y
   `public/favicon.svg` usan el hex fijo `rgb(44,91,168)`.

---

## Tipografía

Se cargan desde Google Fonts en `astro.config.mjs` (sección `head`).

| Fuente | Rol |
|---|---|
| **Newsreader** | Títulos y cuerpo del texto (serif) |
| **IBM Plex Mono** | Etiquetas, meta, navegación, botones, chips |

### Cómo cambiar una fuente

1. En [fonts.google.com](https://fonts.google.com) elige la fuente y copia la URL del `<link>`.
2. Reemplaza el `href` del bloque de fuentes en `astro.config.mjs` (varias fuentes se separan con `&family=`).
3. Ajusta `font-family` en `custom.css`:
   - Cuerpo/títulos: `body` y el selector de `h1..h6`/`.sl-markdown-content` usan `'Newsreader'`.
   - UI/etiquetas: la clase `.mono` y muchos componentes usan `'IBM Plex Mono'`.

---

## Estructura de archivos clave

```
src/
├── assets/logo.svg                # figura vitruviana (marca)
├── components/
│   ├── overrides/                 # reemplazan componentes de Starlight
│   │   ├── Head.astro             # tema morado + sin ClientRouter
│   │   ├── Header.astro           # masthead + cabecera glass + nav + buscador
│   │   ├── Footer.astro           # footer (sticky)
│   │   ├── PageTitle.astro        # tarjeta de título glass (artículos)
│   │   ├── MarkdownContent.astro  # cuerpo + relacionados + anterior/siguiente
│   │   └── PageSidebar.astro      # vacío
│   ├── HomePage.astro             # cuerpo de la portada
│   ├── RelatedArticles.astro      # tarjetas glass
│   ├── ArticlePagination.astro    # anterior / siguiente
│   ├── BrandMark.astro            # logo temable
│   └── UltimoArticulo.astro
├── content/
│   ├── docs/                      # contenido (.md / .mdx) por categoría
│   └── i18n/es.json               # textos de interfaz
├── lib/categorias.ts              # categorías, colores, temas y helpers
├── pages/                         # /articulos/, /tags/, 404
├── styles/custom.css              # todo el estilo del sitio
└── content.config.ts              # esquema + URLs planas (generateId)

public/favicon.svg                 # favicon (copia del logo)
astro.config.mjs                   # config: fuentes, overrides, sidebar (oculto)
```

---

## Agregar un artículo

1. Crea un `.md` en la carpeta de la categoría:
   ```
   src/content/docs/estrategia/nombre-del-articulo.md
   ```
2. Frontmatter mínimo:
   ```yaml
   ---
   title: Título del artículo
   description: Frase corta (SEO y extracto en listados).
   tags: ["IA", "Producto"]
   pubDate: 2026-03-15
   ---
   ```
3. Escribe el contenido en Markdown.

El color y el tema salen de la carpeta. La URL es **plana**: el artículo de
arriba queda en `/nombre-del-articulo/` (la categoría no aparece en la URL).

---

## Agregar o cambiar una categoría

Las categorías son carpetas bajo `src/content/docs/` declaradas en
`src/lib/categorias.ts`.

1. Crea la carpeta (minúsculas, sin tildes ni espacios).
2. Añádela a `CATEGORIAS` y a `INFO_CATEGORIAS` (etiqueta, `color`, `tema`) en
   `src/lib/categorias.ts`. `generateId` (en `content.config.ts`) ya lee
   `CATEGORIAS`, así que la URL seguirá siendo plana.
3. Si quieres que salga como pastilla en los filtros del listado, no hay que
   hacer nada extra: `/articulos/` itera `CATEGORIAS`.

---

## Internacionalización (textos de interfaz)

`src/content/i18n/es.json`:

```json
{
  "search.label": "Buscar artículos…",
  "page.previousLink": "Anterior",
  "page.nextLink": "Siguiente"
}
```

---

## Despliegue

Auto-deploy en Vercel al hacer push a `main`:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

> En este entorno el remoto HTTPS no tiene credenciales; el push se hace por SSH:
> `git push git@github.com:leozymandyas/anatomia-del-producto.git main`.

Probar antes de publicar: `npm run dev` (4321) · `npm run build` · `npm run preview`.

---

## Cambiar el logo / favicon

1. Reemplaza `public/favicon.svg` y `src/assets/logo.svg`.
2. La marca de la cabecera usa el componente `BrandMark.astro` (SVG inline con el
   círculo en `var(--accent)`, así se tiñe con el tema). Si cambias el dibujo,
   actualízalo ahí también.
3. Si el navegador conserva el favicon viejo, recarga con `Ctrl+Shift+R`.

---

## Decisiones de diseño importantes

| Decisión | Razón |
|---|---|
| Layout periódico, sin sidebar | El diseño "edición digital": la navegación vive en la cabecera superior |
| Tema por categoría (`data-tema`) | Obsidian se distingue en morado sin marcar cada artículo a mano |
| URLs planas (`generateId`) | La categoría agrupa y colorea, pero no ensucia la URL |
| Sin view transitions (`ClientRouter`) | Rompían la interactividad (menú/colapso) al navegar entre páginas |
| Footer sticky | Se mantiene al fondo en páginas cortas (cadena flex desde `.page`) |
| Solo modo claro | La paleta se fuerza igual en claro y oscuro |
| Estética liquid-glass | `backdrop-filter` en controles y destacados (botones, chips, tarjetas, citas) |
