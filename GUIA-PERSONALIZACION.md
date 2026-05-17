# Guía de personalización — Anatomía del Producto

Cómo cambiar colores, tipografías y secciones por tu cuenta.

---

## 1. Cambiar colores

Todos los colores del sitio se controlan desde un solo archivo:

```
src/styles/custom.css
```

Dentro de ese archivo hay un bloque de variables CSS:

```css
:root,
:root[data-theme='light'],
:root[data-theme='dark'] {
    --sl-color-bg:         #DCC7A7;  /* fondo de la página */
    --sl-color-bg-nav:     #CDB99A;  /* fondo del header */
    --sl-color-bg-sidebar: #D5BFA0;  /* fondo del sidebar */
    --sl-color-text:       #45423F;  /* color del texto normal */
    --sl-color-accent:     #6A5142;  /* color de énfasis (encabezados, activo) */
    ...
}
```

Para cambiar un color, simplemente reemplaza el valor hexadecimal (`#DCC7A7`, etc.) por el color que quieras. Puedes usar cualquier herramienta para elegir colores, como [coolors.co](https://coolors.co) o el selector de color de tu editor.

### Referencia de variables y dónde se ven

| Variable | Dónde afecta |
|---|---|
| `--sl-color-bg` | Fondo principal de cada página |
| `--sl-color-bg-nav` | Barra de navegación superior (header) |
| `--sl-color-bg-sidebar` | Panel lateral izquierdo |
| `--sl-color-text` | Texto del cuerpo de los artículos |
| `--sl-color-accent` | Encabezados h1–h6, enlace activo en sidebar |
| `--sl-color-text-accent` | Color de texto de énfasis, títulos en tarjetas |
| `--sl-color-text-invert` | Texto sobre el fondo del enlace activo en sidebar |
| `--sl-color-hairline` | Líneas divisorias y bordes sutiles |
| `--sl-color-gray-1` a `--sl-color-gray-7` | Degradado de tonos para texto secundario, bordes, etc. |

### Colores especiales que no son variables

Algunos colores están definidos directamente (sin variables) porque son muy específicos:

```css
/* En custom.css */

h1#_top { color: #6A5142; }                  /* título del artículo */
.sl-markdown-content strong { color: #282828; } /* negritas */
.group-label .large { color: #523C2E; }       /* secciones del sidebar */
.site-title { color: #542C14; }               /* "Anatomía del Producto" en el header */
.tag-chip { color: #523C2E; }                 /* chips de tags */
```

Para cambiarlos, localiza esa línea en `custom.css` y cambia el hexadecimal.

---

## 2. Cambiar tipografías

Las fuentes se cargan desde Google Fonts. El proceso tiene dos pasos:

### Paso A — Actualizar la URL en `astro.config.mjs`

Busca el bloque `head` dentro de `starlight({...})`:

```js
head: [
    ...
    {
        tag: 'link',
        attrs: {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap',
        },
    },
],
```

Para añadir una fuente nueva, ve a [fonts.google.com](https://fonts.google.com), elige la fuente, haz clic en "Get embed code" y copia solo la parte del `href` del link. Añádela a la URL existente con `&family=NombreDeLaFuente`.

### Paso B — Aplicar la fuente en `custom.css`

```css
body {
    font-family: 'Lato', sans-serif;     /* texto del cuerpo */
}
h1, h2, h3, h4, h5, h6 {
    font-family: 'PT Serif', serif;       /* encabezados */
}
.site-title {
    font-family: 'Alegreya', serif;       /* título del sitio en el header */
}
```

Cambia el nombre de la fuente entre comillas por el nombre exacto que aparece en Google Fonts.

---

## 3. Añadir una nueva sección al sidebar

El sidebar se configura en `astro.config.mjs`, dentro del bloque `sidebar: [...]`.

### Paso A — Crear la carpeta en el contenido

Crea una carpeta dentro de `src/content/docs/` con el nombre de la sección (sin espacios, en minúsculas con guiones):

```
src/content/docs/
└── mi-nueva-seccion/
    └── primer-articulo.md
```

### Paso B — Registrar la sección en el sidebar

En `astro.config.mjs`, añade un objeto dentro del array `sidebar`:

```js
sidebar: [
    // ... secciones existentes ...
    {
        label: 'Mi nueva sección',        // nombre que aparece en el sidebar
        items: [
            { autogenerate: { directory: 'mi-nueva-seccion' } },
        ],
    },
],
```

Con `autogenerate`, cualquier artículo `.md` que pongas dentro de esa carpeta aparecerá automáticamente en el sidebar sin que tengas que tocar la config de nuevo.

### Variante: sección con enlaces fijos (sin autogenerate)

Si quieres control total sobre qué artículos aparecen y en qué orden:

```js
{
    label: 'Mi sección',
    items: [
        { label: 'Artículo 1', link: '/mi-nueva-seccion/articulo-1/' },
        { label: 'Artículo 2', link: '/mi-nueva-seccion/articulo-2/' },
    ],
},
```

---

## 4. Añadir artículos a una sección existente

1. Crea un archivo `.md` en la carpeta correspondiente:

```
src/content/docs/cabeza/mi-nuevo-articulo.md
```

2. Añade el frontmatter al inicio del archivo:

```markdown
---
title: Título del artículo
description: Descripción breve (aparece en el índice y en Google).
tags: ["IA", "Estrategia"]
---

Aquí empieza el contenido en Markdown...

## Un subtítulo

Texto normal. **Negrita.** *Cursiva.*

### Un sub-subtítulo

Más contenido.
```

3. El artículo aparece solo en el sidebar (si la sección usa `autogenerate`). No necesitas tocar ningún otro archivo.

---

## 5. Crear una página especial (sin sección)

Para páginas que van directas en la raíz (como "Contacto" o "Sobre mí"):

1. Crea el archivo en `src/content/docs/` directamente (sin subcarpeta):

```
src/content/docs/mi-pagina.md
```

2. Añádela manualmente al sidebar en `astro.config.mjs`:

```js
{ label: 'Mi página', link: '/mi-pagina/' },
```

---

## 6. Cambiar el orden de los artículos en el sidebar

Cuando usas `autogenerate`, Starlight ordena los artículos alfabéticamente por el nombre del archivo. Para controlar el orden tienes dos opciones:

**Opción A — Prefijos numéricos en el nombre del archivo:**
```
01-introduccion.md
02-conceptos-clave.md
03-casos-practicos.md
```
Los prefijos no aparecen en la URL ni en el título.

**Opción B — Campo `order` en el frontmatter:**
```markdown
---
title: Mi artículo
order: 2
---
```

---

## 7. Referencia rápida de archivos

| Qué quiero cambiar | Archivo a editar |
|---|---|
| Colores del sitio | `src/styles/custom.css` |
| Fuentes tipográficas | `astro.config.mjs` (URL) + `src/styles/custom.css` (reglas) |
| Estructura del sidebar | `astro.config.mjs` → bloque `sidebar` |
| Favicon (pestaña) | `public/favicon.svg` |
| Logo junto al título | `src/assets/logo.svg` |
| Título del sitio | `astro.config.mjs` → `title:` |
| Descripción del sitio (SEO) | `astro.config.mjs` → `description:` |
| Contenido de un artículo | El archivo `.md` correspondiente en `src/content/docs/` |
