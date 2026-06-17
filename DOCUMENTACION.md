# Documentación del proyecto — Anatomía del Producto

> Guía de referencia para entender la estructura del proyecto, el stack tecnológico y todas las personalizaciones realizadas.

---

## 1. ¿Qué es este proyecto?

**Anatomía del Producto** es un blog sobre creación de productos digitales en la era de la inteligencia artificial. La URL de producción es `https://anatomia-del-producto.com`.

El sitio está construido con **Astro** usando el tema **Starlight**, que originalmente está pensado para documentación técnica pero fue adaptado para funcionar como blog.

---

## 2. Stack tecnológico

| Tecnología | Versión | Para qué sirve |
|---|---|---|
| **Astro** | 6.3.x | Framework base. Genera HTML estático en el build. |
| **Starlight** | 0.39.x | Tema/plugin de Astro. Provee layout, sidebar, buscador, TOC, modo oscuro, etc. |
| **TypeScript** | (incluido) | Se usa en los componentes `.astro` para tipado. |
| **Sharp** | 0.34.x | Procesamiento de imágenes (incluido por Astro). |

### Comandos esenciales

```bash
npm run dev       # Servidor local en http://localhost:4321
npm run build     # Genera el sitio estático en la carpeta /dist
npm run preview   # Sirve el /dist localmente para revisar antes de subir
```

---

## 3. Estructura de carpetas

```
anatomia-del-producto/
│
├── astro.config.mjs          ← Configuración central del proyecto
├── src/
│   ├── assets/
│   │   └── logo.svg          ← Ícono del vitruviano (sidebar + header)
│   │
│   ├── components/
│   │   ├── SidebarWithToc.astro        ← Sidebar de navegación recursivo
│   │   ├── YouTube.astro               ← Componente para embeber videos de YouTube
│   │   └── overrides/                  ← Componentes que reemplazan los de Starlight
│   │       ├── Header.astro            ← Header personalizado
│   │       ├── Sidebar.astro           ← Sidebar (usa SidebarWithToc)
│   │       ├── PageSidebar.astro       ← Vacío (sin TOC de página)
│   │       └── MarkdownContent.astro   ← Contenido de artículo + tags
│   │
│   ├── content/
│   │   └── docs/                       ← Aquí viven todos los artículos
│   │       ├── index.mdx               ← Página de inicio (/)
│   │       ├── contacto.md             ← Página /contacto
│   │       ├── cabeza/                 ← Sección "Cabeza"
│   │       │   └── ia-y-el-futuro-de-los-productos-digitales.md
│   │       ├── caja-toracica/          ← Sección "Caja torácica"
│   │       │   └── como-validar-un-mvp-con-ia.mdx
│   │       └── extremidades/           ← Sección "Extremidades"
│   │           └── herramientas-ia-para-equipos-de-producto.md
│   │
│   ├── pages/
│   │   ├── articulos/
│   │   │   └── index.astro             ← Página /articulos (índice de todos los artículos)
│   │   └── tags/
│   │       ├── index.astro             ← Página /tags (nube de tags)
│   │       └── [tag].astro             ← Página dinámica por tag (/tags/ia/, etc.)
│   │
│   ├── styles/
│   │   └── custom.css                  ← Todos los estilos personalizados
│   │
│   └── content.config.ts               ← Define el esquema de los artículos
│
└── public/
    └── favicon.svg                     ← Ícono de la pestaña del navegador
```

---

## 4. Cómo funciona Astro + Starlight

### Astro en una frase

Astro convierte archivos `.astro`, `.md` y `.mdx` en HTML estático. No hay JavaScript en el cliente por defecto — el sitio carga muy rápido.

### Starlight en una frase

Starlight es un tema completo que añade: layout de dos columnas, sidebar navegable, tabla de contenidos, buscador (Pagefind), modo oscuro, y más. Todo configurable desde `astro.config.mjs`.

### El ciclo de vida de una página

```
src/content/docs/cabeza/mi-articulo.md
        ↓
Astro lo lee en el build
        ↓
Starlight genera el layout (header + sidebar + contenido)
        ↓
Los overrides personalizan partes del layout
        ↓
dist/cabeza/mi-articulo/index.html  (HTML listo para publicar)
```

---

## 5. Cómo crear un artículo nuevo

1. Crea un archivo `.md` o `.mdx` dentro de `src/content/docs/` en la carpeta de la sección correspondiente.
2. El archivo debe empezar con un bloque **frontmatter** entre `---`:

```markdown
---
title: Título del artículo
description: Descripción corta (aparece en el índice y en el SEO).
tags: ["IA", "Producto", "Estrategia"]
---

Aquí empieza el contenido en Markdown...

## Un subtítulo

Párrafo normal. **Texto en negrita.** *Texto en cursiva.*
```

3. El artículo aparece automáticamente en el sidebar bajo la sección correcta (Starlight lo detecta por la carpeta donde está).

### Secciones disponibles

| Carpeta | Sección en sidebar |
|---|---|
| `src/content/docs/cabeza/` | Cabeza |
| `src/content/docs/caja-toracica/` | Caja torácica |
| `src/content/docs/extremidades/` | Extremidades |

### Tags

Los tags se definen en el frontmatter como array de strings. Aparecen como chips morados al inicio del artículo y generan páginas propias en `/tags/nombre-del-tag/`. El esquema de tags está definido en `src/content.config.ts`.

---

## 6. Archivo central: `astro.config.mjs`

Este es el archivo más importante del proyecto. Controla todo lo que Starlight hace.

```js
starlight({
  title: 'Anatomía del Producto',      // Nombre del sitio
  favicon: '/favicon.svg',             // Ícono de la pestaña
  logo: { src: './src/assets/logo.svg', replacesTitle: false }, // Ícono junto al título
  
  head: [ ... ],      // Inyecta <link> en el <head> de todas las páginas (aquí van las fuentes)
  customCss: ['./src/styles/custom.css'], // CSS global personalizado
  
  components: { ... }, // Reemplaza componentes internos de Starlight por los nuestros
  
  sidebar: [ ... ],   // Define la estructura del menú lateral
})
```

### Sidebar config

```js
sidebar: [
  {
    label: 'Cabeza',
    items: [
      { label: 'Inicio', link: '/' },
      { autogenerate: { directory: 'cabeza' } }, // Lee automáticamente los .md de esa carpeta
    ],
  },
  // ...más secciones
  {
    label: 'Todos los artículos',
    link: '/articulos/',
    attrs: { class: 'sidebar-sep-link' }, // Clase CSS que añade un separador visual antes de este enlace
  },
]
```

---

## 7. Componentes override: cómo funciona el sistema

Starlight permite reemplazar cualquiera de sus componentes internos. En lugar de editar los archivos de `node_modules` (que se perderían al actualizar), se crea un componente propio y se registra en `astro.config.mjs`:

```js
components: {
  Header: './src/components/overrides/Header.astro',
  Sidebar: './src/components/overrides/Sidebar.astro',
  PageSidebar: './src/components/overrides/PageSidebar.astro',
  MarkdownContent: './src/components/overrides/MarkdownContent.astro',
},
```

### Qué hace cada override

#### `Header.astro`
Reemplaza el header original de Starlight. Quita el buscador del header (se movió al sidebar) y añade el enlace "Contacto" a la derecha.

#### `Sidebar.astro`
Añade el buscador en la parte superior del sidebar. Usa el componente personalizado `SidebarWithToc` en lugar del `SidebarSublist` original de Starlight.

#### `PageSidebar.astro`
El panel derecho (donde Starlight normalmente muestra la tabla de contenidos en desktop). En este proyecto el índice "en esta página" se eliminó por completo, así que este override está **vacío** y no renderiza nada (ni en escritorio ni en móvil).

#### `MarkdownContent.astro`
Envuelve el contenido de cada artículo. Antes del contenido muestra los **tags** del artículo como chips de colores.

---

## 8. Componente clave: `SidebarWithToc.astro`

Es una versión del `SidebarSublist` de Starlight que renderiza el menú de navegación del sidebar.

### Cómo funciona

- Es un componente **recursivo**: se llama a sí mismo para renderizar grupos anidados (`<Astro.self />`).
- El enlace de la página actual (`entry.isCurrent`) se resalta con el color de acento.
- (Históricamente inyectaba un índice "en esta página" bajo el artículo activo; esa función se eliminó.)

```
Cabeza
  └── Inicio
  └── IA y el futuro...   ← página actual, resaltada
  └── Otro artículo
```

---

## 9. Estilos: `src/styles/custom.css`

Starlight usa un sistema de **CSS layers** (`@layer starlight.core`). Los estilos en capas (`@layer`) tienen **menor prioridad** que los estilos normales (sin capa). Por eso el CSS en `custom.css` siempre gana sin necesidad de `!important`.

### Secciones del archivo

#### Tipografía (Google Fonts)
Las fuentes se cargan desde Google Fonts vía el `head` en `astro.config.mjs`:

| Fuente | Uso |
|---|---|
| **Fraunces** | Título del sitio (`.site-title`), encabezados h1–h6 y títulos de tarjetas |
| **Inter** | Cuerpo del texto (`body`) y UI |

#### Paleta de colores
Se definen tokens propios `--c-*` en `:root` y se mapean a las variables internas de Starlight (`--sl-color-*`). El acento es índigo:

```css
:root {
  --c-navy: #3D5AE0;                 /* acento índigo */
}
:root, :root[data-theme='light'], :root[data-theme='dark'] {
  --sl-color-accent: var(--c-navy);  /* misma paleta en claro y oscuro */
}
```

#### Layout: contenido centrado (sin TOC)
En pantallas anchas (≥ 72rem / ~1152px):
- Se **oculta** el panel derecho (`right-sidebar-container`) donde Starlight normalmente muestra el TOC; el índice de página se eliminó.
- El contenido queda centrado en el espacio disponible.

#### Tags
Chips estilo pastilla con el acento índigo. Se muestran arriba del contenido de cada artículo y en las páginas de índice.

#### Colores del contenido
- Título del artículo (`h1#_top`): color accent morado.
- Subtítulos del artículo (h2–h6 dentro de `.sl-markdown-content`): color accent morado.
- Negritas (`<strong>`): morado medio (#9333ea en claro, #c084fc en oscuro).

---

## 10. Páginas especiales (fuera de Starlight)

Estas páginas no son artículos Markdown sino componentes Astro que usan `StarlightPage` para mantener el mismo layout.

### `/articulos/` — `src/pages/articulos/index.astro`
Lista todos los artículos del sitio. Usa `getCollection('docs')` para leer todos los artículos y los muestra como tarjetas con título, descripción, sección y tags.

### `/tags/` — `src/pages/tags/index.astro`
Nube de tags con contador de artículos por tag.

### `/tags/[tag]/` — `src/pages/tags/[tag].astro`
Página dinámica generada para cada tag. Muestra todos los artículos que tienen ese tag.

---

## 11. Archivos de assets

| Archivo | Descripción |
|---|---|
| `public/favicon.svg` | Ícono que aparece en la pestaña del navegador. Los archivos en `public/` se sirven tal cual en la raíz del sitio. |
| `src/assets/logo.svg` | Ícono del vitruviano que aparece junto al título "Anatomía del Producto" en el header. Starlight lo procesa y optimiza durante el build. |

La diferencia entre `public/` y `src/assets/`:
- `public/` → copiado tal cual a `/dist`, accesible por URL directa.
- `src/assets/` → procesado por Astro (optimización, hash de nombre), no accesible por URL directa.

---

## 12. Variables CSS útiles de Starlight

Starlight expone variables CSS que puedes usar en tus propios estilos:

```css
var(--sl-color-accent)       /* color de énfasis (morado en este proyecto) */
var(--sl-color-accent-low)   /* versión pálida del color de énfasis */
var(--sl-color-white)        /* blanco (o casi blanco en dark mode) */
var(--sl-color-text)         /* color del texto normal */
var(--sl-color-gray-1)       /* gris muy claro */
var(--sl-color-gray-3)       /* gris medio */
var(--sl-color-hairline)     /* gris muy sutil para bordes */
var(--sl-sidebar-width)      /* ancho del sidebar (18.75rem = 300px) */
var(--sl-content-width)      /* ancho máximo del contenido (45rem = 720px) */
var(--sl-text-sm)            /* tamaño de fuente pequeño */
var(--sl-text-base)          /* tamaño de fuente base */
var(--sl-text-lg)            /* tamaño de fuente grande */
```

---

## 13. Cómo desplegar en Vercel

**Opción A — Desde la web (recomendada):**
1. Sube el proyecto a un repositorio de GitHub.
2. Entra a [vercel.com](https://vercel.com) → **Add New Project**.
3. Importa el repositorio. Vercel detecta Astro automáticamente.
4. Haz clic en **Deploy**. Cada `git push` redespliega el sitio.

**Opción B — Con la CLI:**
```bash
npm i -g vercel
vercel        # primera vez
vercel --prod # deploys siguientes
```

---

## 14. Flujo de trabajo diario

```
1. npm run dev          ← Arranca el servidor local
2. Crea o edita un .md en src/content/docs/
3. El navegador se actualiza automáticamente (hot reload)
4. git add . && git commit -m "nuevo artículo"
5. git push              ← Vercel redespliega automáticamente
```
