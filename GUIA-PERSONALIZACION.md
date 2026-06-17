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

> Nota: los tokens de acento conservan el nombre histórico `--c-navy` por compatibilidad con el resto del código; su valor es la terracota de marca.

| Variable | Valor | Rol |
|---|---|---|
| `--c-bg` | `#FBF8F3` | Fondo de página, sidebar, nav (papel cálido) |
| `--c-surface` | `#FFFFFF` | Tarjetas y bloques elevados |
| `--c-surface-soft` | `#F4EEE3` | Relleno sutil (chips, código, citas) |
| `--c-text` | `#2B2520` | Cuerpo de texto (carbón cálido) |
| `--c-text-strong` | `#16110D` | Negritas y títulos |
| `--c-text-muted` | `#776B5E` | Texto secundario |
| `--c-navy` | `#C25A2C` | Terracota: acento principal, tags, links activos |
| `--c-navy-dark` | `#9C431D` | Hover sobre elementos de acento |
| `--c-navy-tint` | `#F5E5DB` | Fondo de acento muy suave |
| `--c-navy-tint-2` | `#EDD3C3` | Borde/hover de acento |
| `--c-gray-1..7` | `#16110D` → `#EFE9DD` | Escala carbón cálido (texto secundario, bordes) |
| `--c-border` | `#E7DECE` | Bordes estándar |
| `--c-border-soft` | `#F0E9DC` | Bordes interiores del sidebar |
| `--c-border-dark` | `#D8CBB5` | Bordes con más contraste |
| `--c-scroll-thumb` | `#CDBFA9` | Thumb de la scrollbar |
| `--c-scroll-track` | `#F0E9DC` | Track de la scrollbar |
| `--shadow-sm/md/lg` | — | Sombras cálidas suaves (tarjetas, botones) |
| `--radius-sm/md/lg` | `0.5/0.75/1rem` | Radios de borde |

### Cómo cambiar la paleta completa

1. Abre `src/styles/custom.css`
2. Edita los valores en el bloque `:root { /* Paleta de colores */ }`
3. Los tokens de Starlight (`--sl-color-*`) están mapeados a estas variables en el bloque siguiente — no hace falta tocarlos

---

## Tipografía

Las fuentes vienen de Google Fonts y se cargan en `astro.config.mjs` (sección `head`).

| Fuente | Rol | Pesos cargados |
|---|---|---|
| **Inter** | Cuerpo de texto (párrafos, UI, sidebar) | 400–700 (variable) |
| **Fraunces** | Encabezados h1–h6, títulos de tarjetas y nombre del sitio | 400–700 (variable, opsz 9–144) + itálica |

### Cómo cambiar una fuente (paso a paso)

**Paso 1 — Elige la fuente en Google Fonts**
1. Ve a [fonts.google.com](https://fonts.google.com)
2. Busca la fuente y haz clic en ella
3. Selecciona los pesos que quieres (ej: 400, 700) con el botón "Get font"
4. Haz clic en **"Get embed code"** → pestaña **@import** o **\<link\>**
5. Copia la URL que aparece en el `href` del `<link>`

**Paso 2 — Actualiza la URL en `astro.config.mjs`**

Busca el bloque de Google Fonts en la sección `head` y reemplaza el `href`:

```js
{
  tag: 'link',
  attrs: {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Nueva+Fuente:wght@400;700&display=swap',
  },
},
```

Si cargas múltiples fuentes en la misma URL (recomendado para evitar peticiones extra), sepáralas con `&family=`:

```
?family=Fuente+Uno:wght@400;700&family=Fuente+Dos:ital,wght@0,400;1,400&display=swap
```

**Paso 3 — Actualiza `font-family` en `custom.css`**

Según qué rol quieras cambiar, edita el selector correspondiente:

```css
/* Cuerpo de texto */
body {
  font-family: 'Nueva Fuente Sans', sans-serif;
}

/* Encabezados h1–h6 */
h1, h2, h3, h4, h5, h6,
.sl-markdown-content h1, ... {
  font-family: 'Nueva Fuente Slab', serif;
}

/* Nombre del sitio en sidebar */
.site-title {
  font-family: 'Nueva Fuente Display', serif;
}
```

**Paso 4 — Actualiza `Sidebar.astro` si cambias el nombre del sitio**

El nombre "Anatomía del Producto" en el sidebar usa su propio `font-family` en
`src/components/overrides/Sidebar.astro`, selector `.brand-link`. Cámbialo también.

> **Importante:** si la nueva fuente solo tiene peso 400 (como IM Fell French Canon),
> asegúrate de que el selector CSS no tenga `font-weight: 700` o el navegador
> intentará sintetizar la negrita y puede verse mal.

**Paso 5 — Verifica localmente**

```bash
npm run dev
```

Abre el navegador en `localhost:4321`, navega por el sitio y comprueba que la fuente
carga correctamente en todos los contextos (desktop, móvil, sidebar).

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
