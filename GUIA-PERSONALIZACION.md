# Guía de personalización — Anatomía del Producto

Referencia práctica para mantener y cambiar el sitio sin tener que recordar cómo funciona por dentro.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 6 |
| Tema de documentación | Starlight 0.39 |
| Hosting | Vercel (auto-deploy desde GitHub) |
| Repositorio | `leozymandyas/anatomia-del-producto` |
| Dominio | `anatomia-del-producto.com` |

---

## Paleta de colores

Los colores están definidos como variables CSS en `src/styles/custom.css`, en el bloque `:root { /* Paleta de colores */ }`. Cambiar un valor aquí lo propaga a todo el sitio.

| Variable | Valor | Rol |
|---|---|---|
| `--c-bg` | `#FDF5E5` | Fondo de página, sidebar, nav, modal de búsqueda |
| `--c-text` | `#2E3D30` | Cuerpo de texto (párrafos, listas) |
| `--c-text-strong` | `#1E2E20` | Negritas dentro del contenido |
| `--c-navy` | `#7B9A80` | Títulos, acento principal, tags, sidebar, links activos |
| `--c-navy-dark` | `#4A6B50` | Hover sobre elementos de acento |
| `--c-navy-tint` | `#D4E4D8` | Fondo de acento muy suave |
| `--c-gray-1..7` | `#1E2E20` → `#E8F0EA` | Escala verde-grisácea (texto secundario, bordes) |
| `--c-border` | `#B0C8B8` | Bordes estándar |
| `--c-border-soft` | `#C4D8CA` | Bordes interiores del sidebar |
| `--c-border-dark` | `#96B0A0` | Bordes con más contraste |
| `--c-scroll-thumb` | `#7B9A80` | Thumb de la scrollbar |
| `--c-scroll-track` | `#E8F0EA` | Track de la scrollbar |

### Cómo cambiar la paleta completa

1. Abre `src/styles/custom.css`
2. Edita los valores en el bloque `:root { /* Paleta de colores */ }`
3. Los tokens de Starlight (`--sl-color-*`) están mapeados a estas variables en el bloque siguiente — no hace falta tocarlos

---

## Tipografía

Las fuentes vienen de Google Fonts y se cargan en `astro.config.mjs` (sección `head`).

| Fuente | Rol |
|---|---|
| **Lato** | Cuerpo de texto (párrafos, UI) |
| **PT Serif** | Todos los encabezados h1–h6 |
| **Alegreya** | Título del sitio en el sidebar |

Para cambiar una fuente: reemplaza la URL en el `<link>` de Google Fonts en `astro.config.mjs` y actualiza el `font-family` en `custom.css`.

---

## Estructura de archivos clave

```
src/
├── assets/
│   └── logo.svg                  # Logo (figura vitruviana naranja)
├── components/
│   ├── overrides/
│   │   ├── Header.astro          # Header reducido — solo visible en móvil
│   │   ├── Sidebar.astro         # Sidebar con branding y botón de colapsar
│   │   ├── PageSidebar.astro     # TOC en móvil (sin panel derecho en desktop)
│   │   ├── MarkdownContent.astro # Inserta tags encima del contenido
│   │   └── MobileMenuFooter.astro# Vacío — elimina selector de tema en móvil
│   └── SidebarWithToc.astro      # Sidebar recursivo con TOC inline
├── content/
│   ├── docs/                     # Artículos del sitio (.md / .mdx)
│   │   ├── index.mdx             # Página de inicio
│   │   ├── sobre-mi.md
│   │   ├── contacto.md
│   │   ├── articulos.md          # Índice de todos los artículos
│   │   ├── cabeza/               # Sección "Cabeza"
│   │   ├── caja-toracica/        # Sección "Caja torácica"
│   │   └── extremidades/         # Sección "Extremidades"
│   └── i18n/
│       └── es.json               # Textos de interfaz en español
├── styles/
│   └── custom.css                # Todo el estilo personalizado del sitio
└── content.config.ts             # Esquema de colecciones (docs + i18n)

public/
└── favicon.svg                   # Copia del logo para favicon

astro.config.mjs                  # Configuración principal: sidebar, fuentes, overrides
guia-personalizacion.md           # Este archivo
```

---

## Agregar un artículo

1. Crea un archivo `.md` en la carpeta de sección correcta:
   ```
   src/content/docs/cabeza/nombre-del-articulo.md
   ```

2. Agrega el frontmatter:
   ```yaml
   ---
   title: Título del artículo
   description: Frase corta que describe el artículo (SEO y vista previa).
   tags: [producto, estrategia]
   ---
   ```

3. Escribe el contenido en Markdown debajo del frontmatter.

El artículo aparece automáticamente en el sidebar gracias a `autogenerate`.

### Tags

Los tags se renderizan como chips encima del artículo y enlazan a `/tags/<tag>/`. Se declaran en el frontmatter:

```yaml
tags: [producto, IA, estrategia]
```

---

## Cambiar el sidebar

El sidebar se configura en `astro.config.mjs`, propiedad `sidebar`:

```js
sidebar: [
  { label: 'Anatomía del producto', items: [
    { label: 'Inicio', link: '/' },
    { label: 'Sobre mí', link: '/sobre-mi/' },
  ]},
  { label: 'Cabeza', items: [{ autogenerate: { directory: 'cabeza' } }] },
  { label: 'Caja torácica', items: [{ autogenerate: { directory: 'caja-toracica' } }] },
  { label: 'Extremidades', items: [{ autogenerate: { directory: 'extremidades' } }] },
  { label: 'Todos los artículos', link: '/articulos/', attrs: { class: 'sidebar-sep-link' } },
  { label: 'Tags', link: '/tags/' },
]
```

- `autogenerate` genera los links desde los archivos de la carpeta automáticamente
- La clase `sidebar-sep-link` pinta un separador visual encima del link

### Sidebar colapsable

El sidebar se puede colapsar en desktop. El estado se persiste en `localStorage` (`sidebar-collapsed`). Cuando está colapsado:

- Ancho: `3.75rem` en lugar de `18.75rem` (variable `--sl-sidebar-width`)
- Solo se ve el logo y el botón de colapsar; se ocultan buscador, nombre y links

La lógica vive en `src/components/overrides/Sidebar.astro` y el CSS en `custom.css` bajo `/* Sidebar colapsable */`.

---

## Internacionalización (textos de interfaz)

Los textos de la UI en español están en `src/content/i18n/es.json`:

```json
{
  "tableOfContents.onThisPage": "Anatomía de la página"
}
```

Para cambiar una etiqueta de UI busca la clave en la documentación de Starlight i18n y agrégala aquí.

---

## Despliegue

El sitio se despliega automáticamente en Vercel al hacer push a `main`.

```bash
git add .
git commit -m "descripción del cambio"
git push
```

Para probar localmente antes de publicar:

```bash
npm run dev       # servidor en http://localhost:4321
npm run build     # compila y detecta errores
npm run preview   # previsualiza el build
```

---

## Cambiar el logo / favicon

1. Reemplaza `public/favicon.svg` y `src/assets/logo.svg` con el nuevo SVG
2. El favicon se aplica automáticamente (configurado en `astro.config.mjs`)
3. Si el navegador sigue mostrando el favicon anterior, fuerza recarga con `Ctrl+Shift+R`

---

## Decisiones de diseño importantes

| Decisión | Razón |
|---|---|
| Header oculto en desktop | Estilo tipo Godot Docs — el branding vive en el sidebar |
| TOC inline en sidebar | Elimina el panel derecho y centra el contenido |
| Modo oscuro/claro desactivado | La paleta se fuerza sobreescribiendo `[data-theme='dark']` con los mismos valores |
| `--sl-color-black` = `--c-bg` | Corrige el fondo blanco del modal de búsqueda (Pagefind usa esta variable) |
| Script `is:inline` en Sidebar | Restaura el estado colapsado antes del primer paint — evita flash del sidebar expandido |
| i18n collection en content.config.ts | Necesario para que `es.json` sea procesado por Starlight |
| `h1#_top` separado de `.sl-markdown-content` | El h1 del título lo genera Starlight fuera del contenido markdown, requiere selector propio |
