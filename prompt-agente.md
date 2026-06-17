# Prompt de agente — Anatomía del Producto

Este documento define el contexto y las instrucciones que debe seguir un agente de IA para realizar cambios estructurales en el sitio. Úsalo como prompt de sistema o pégalo al inicio de una conversación nueva.

---

## Contexto del proyecto

Sitio web estático construido con **Astro 6 + Starlight 0.39**. El contenido vive en archivos Markdown dentro de `src/content/docs/`. El deploy es automático en Vercel al hacer `git push` a la rama `main`.

### Carpetas que almacenan contenido renderizado

Las siguientes carpetas contienen los archivos que generan páginas visibles en el sitio. Cualquier archivo `.md` o `.mdx` que se cree aquí produce una URL pública:

```
src/content/docs/          ← raíz del contenido
├── index.mdx              → ruta: /
├── *.md                   → páginas especiales (ej: /contacto/)
└── <seccion>/             → cada subcarpeta es una sección del sidebar
    └── *.md o *.mdx       → artículos de esa sección
```

Las páginas de tags y artículos (`/tags/`, `/articulos/`) se generan automáticamente desde `src/pages/` y no requieren edición de contenido.

El archivo de configuración del sidebar y comportamiento del sitio es `astro.config.mjs`.
El esquema de frontmatter está en `src/content.config.ts`.
Los estilos globales están en `src/styles/custom.css`.

---

## Esquema de frontmatter

Todo archivo de contenido acepta los siguientes campos en el bloque `---`:

```yaml
title: string              # obligatorio — título del artículo
description: string        # recomendado — descripción SEO
tags: ["Tag Uno", "Tag"]   # opcional — lista de etiquetas
pubDate: YYYY-MM-DD        # recomendado — fecha de publicación
icon: string               # opcional — emoji ("🧠") o ruta de imagen ("/favicon.svg")
pageTheme: string          # opcional — nombre del tema de color (ej: "terracota")
relatedArticles:           # opcional — IDs de artículos relacionados
  - seccion/nombre-archivo
  - otra-seccion/nombre-archivo
```

El ID de un artículo es su ruta dentro de `src/content/docs/` sin extensión.
Ejemplo: `src/content/docs/cabeza/mi-articulo.md` → ID: `cabeza/mi-articulo`

---

## Operaciones de contenido

### Agregar una sección nueva

1. Crear la carpeta:
   ```
   src/content/docs/<nombre-seccion>/
   ```
   Usar solo minúsculas, sin espacios ni tildes en el nombre de carpeta.

2. Registrar la sección en el array `sidebar` de `astro.config.mjs`:
   ```js
   {
     label: 'Nombre visible en el sidebar',
     items: [{ autogenerate: { directory: '<nombre-seccion>' } }],
   }
   ```
   Agregar la entrada en la posición correcta dentro del array, respetando el orden deseado.

3. Crear al menos un artículo dentro de la carpeta (ver "Agregar un artículo").

---

### Quitar una sección

1. Eliminar todos los archivos dentro de `src/content/docs/<nombre-seccion>/`.
2. Eliminar la carpeta `<nombre-seccion>/`.
3. Eliminar la entrada correspondiente del array `sidebar` en `astro.config.mjs`.

> Si algún artículo de otras secciones tiene `relatedArticles` apuntando a artículos de esta sección, eliminar esas referencias del frontmatter de cada artículo afectado.

---

### Cambiar el nombre visible de una sección en el sidebar

Editar el campo `label` de la entrada de la sección en `astro.config.mjs`:

```js
{ label: 'Nuevo nombre visible', items: [...] }
```

Esto no cambia las URLs — solo el texto que aparece en la navegación.

---

### Agregar un artículo

1. Crear el archivo en la carpeta de la sección correspondiente:
   ```
   src/content/docs/<seccion>/<nombre-del-articulo>.md
   ```

2. Escribir el frontmatter mínimo:
   ```yaml
   ---
   title: Título del artículo
   description: Descripción del artículo.
   tags: ["Tag"]
   pubDate: YYYY-MM-DD
   ---
   ```

3. Escribir el contenido en Markdown debajo del frontmatter.

Si la sección usa `autogenerate` en `astro.config.mjs`, el artículo aparece automáticamente en el sidebar. El orden por defecto es alfabético por nombre de archivo; se puede controlar con prefijos numéricos (`01-nombre.md`, `02-nombre.md`).

---

### Quitar un artículo

1. Eliminar el archivo `src/content/docs/<seccion>/<nombre-del-articulo>.md`.
2. Si la sección lista artículos manualmente en `astro.config.mjs`, eliminar la entrada correspondiente.
3. Revisar si otros artículos tienen `relatedArticles` apuntando al artículo eliminado y quitar esas referencias.

---

### Renombrar un artículo

Renombrar el archivo cambia la URL del artículo. Pasos:

1. Renombrar el archivo (esto cambia la URL).
2. Si la sección usa listado manual en `astro.config.mjs`, actualizar el `link` y el `label` de esa entrada.
3. Actualizar cualquier `relatedArticles` en otros artículos que referencie el ID anterior.

---

### Relacionar artículos entre sí

Agregar el campo `relatedArticles` al frontmatter del artículo. Los valores son los IDs de los artículos a relacionar:

```yaml
relatedArticles:
  - seccion-a/nombre-articulo-a
  - seccion-b/nombre-articulo-b
```

Las tarjetas de artículos relacionados aparecen automáticamente al final del contenido. Para una relación bidireccional, agregar el campo en ambos artículos apuntándose mutuamente.

---

### Cambiar el tema de color de un artículo

Agregar o modificar el campo `pageTheme` en el frontmatter:

```yaml
pageTheme: terracota
```

Los temas disponibles están definidos en `src/styles/custom.css` bajo la sección `/* Temas de página */`. Para agregar un tema nuevo, ver la siguiente sección de este documento.

---

## Operaciones de estilo

### Cambiar la paleta de colores

Todas las variables de color se definen al inicio de `src/styles/custom.css` dentro de `:root`. Las variables propias del proyecto tienen el prefijo `--c-`:

```css
:root {
    --c-bg:            #FBF8F3;   /* fondo general (papel cálido) */
    --c-surface:       #FFFFFF;   /* tarjetas y bloques elevados */
    --c-surface-soft:  #F4EEE3;   /* relleno sutil (chips, código, citas) */
    --c-text:          #2B2520;   /* texto del cuerpo (carbón cálido) */
    --c-text-strong:   #16110D;   /* negritas y títulos */
    --c-text-muted:    #776B5E;   /* texto secundario */
    --c-navy:          #C25A2C;   /* acento principal (terracota) */
    --c-navy-dark:     #9C431D;   /* hover del acento */
    --c-navy-tint:     #F5E5DB;   /* fondos de acento suave */
    --c-navy-tint-2:   #EDD3C3;   /* borde/hover de acento */

    /* Escala carbón cálido (1=oscuro → 7=claro) */
    --c-gray-1: #16110D;
    --c-gray-2: #2B2520;
    --c-gray-3: #5C5147;
    --c-gray-4: #8A7D6E;
    --c-gray-5: #B8AC9B;
    --c-gray-6: #DED4C3;
    --c-gray-7: #EFE9DD;

    /* Bordes */
    --c-border:        #E7DECE;
    --c-border-soft:   #F0E9DC;
    --c-border-dark:   #D8CBB5;
}
```

Estas variables se mapean automáticamente a los tokens internos de Starlight en el bloque `:root, :root[data-theme='light'], :root[data-theme='dark']` que sigue en el mismo archivo. Cambiar `--c-*` propaga el cambio a todo el sitio.

**Para cambiar el color de acento** (links, títulos, tags, sidebar activo), editar `--c-navy` y `--c-navy-dark`.
**Para cambiar el fondo**, editar `--c-bg`.
**Para cambiar el texto**, editar `--c-text`.

---

### Cambiar tipografías

Las fuentes se definen en dos lugares:

**1. Carga de fuentes — `astro.config.mjs`**

En el array `head`, hay una entrada `<link>` con la URL de Google Fonts. Para agregar o cambiar fuentes, modificar esa URL:

```js
{
    tag: 'link',
    attrs: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=NombreFuente:wght@400;700&display=swap',
    },
}
```

**2. Asignación de fuentes — `src/styles/custom.css`**

```css
/* Cuerpo del texto */
body {
    font-family: 'Inter', system-ui, sans-serif;
}

/* Encabezados (h1–h6) */
h1, h2, h3, h4, h5, h6,
.sl-markdown-content h1,
.sl-markdown-content h2,
.sl-markdown-content h3 {
    font-family: 'Fraunces', Georgia, serif;
}

/* Nombre del sitio en el sidebar */
.site-title {
    font-family: 'Fraunces', Georgia, serif;
}
```

Para cambiar una fuente: reemplazar el nombre en `custom.css` y actualizar la URL en `astro.config.mjs` si es una fuente de Google Fonts diferente.

---

### Agregar un tema de página nuevo

Un tema de página cambia los colores del área de contenido sin afectar el sidebar ni el header.

1. En `src/styles/custom.css`, localizar la sección `/* Temas de página */`.
2. Agregar un bloque nuevo. Usar valores hex directos (no variables CSS) para evitar referencias circulares:

```css
.main-pane:has([data-page-theme='nombre-tema']) {
    background-color: #HEXCOLOR;
    color: #HEXCOLOR;
    --c-navy:              #HEXCOLOR;
    --c-text:              #HEXCOLOR;
    --c-text-strong:       #HEXCOLOR;
    --c-border:            rgba(r, g, b, 0.25);
    --c-border-soft:       rgba(r, g, b, 0.18);
    --sl-color-bg:         #HEXCOLOR;
    --sl-color-text:       #HEXCOLOR;
    --sl-color-white:      #HEXCOLOR;
    --sl-color-text-accent:#HEXCOLOR;
    --sl-color-accent:     #HEXCOLOR;
    --sl-color-hairline:        rgba(r, g, b, 0.25);
    --sl-color-hairline-light:  rgba(r, g, b, 0.18);
}

.main-pane:has([data-page-theme='nombre-tema']) a {
    color: #HEXCOLOR;
    text-decoration-color: rgba(r, g, b, 0.5);
}

.main-pane:has([data-page-theme='nombre-tema']) a:hover {
    text-decoration-color: #HEXCOLOR;
}

.main-pane:has([data-page-theme='nombre-tema']) .tag-chip {
    background-color: rgba(r, g, b, 0.18);
    color: #HEXCOLOR;
}
```

3. Usar el tema en el frontmatter del artículo: `pageTheme: nombre-tema`

---

## Notas técnicas importantes

- **No mover archivos fuera de `src/content/docs/`**. El loader de Starlight (`docsLoader()`) solo lee de esa carpeta. Archivos en otras ubicaciones no generan páginas.
- **Nombres de carpetas y archivos**: solo minúsculas, sin espacios, sin tildes ni caracteres especiales. Los espacios o caracteres no-ASCII en rutas pueden causar errores en el build de producción (Vercel).
- **Frontmatter de fechas**: el campo `pubDate` debe estar en formato `YYYY-MM-DD`. YAML lo parsea como Date automáticamente.
- **IDs de artículos en `relatedArticles`**: son la ruta relativa desde `src/content/docs/` sin extensión. Si el ID no coincide con ningún archivo existente, la tarjeta simplemente no aparece (no rompe el build).
- **Cambios en `astro.config.mjs`**: requieren reiniciar el servidor de desarrollo (`npm run dev`). En producción, el build de Vercel los toma automáticamente.
- **Cambios en `src/styles/custom.css`**: se reflejan en caliente en desarrollo sin reiniciar.
- **El archivo `.gitignore` excluye `.obsidian/`** — si usas Obsidian como editor, su carpeta de configuración no se sube al repositorio.
