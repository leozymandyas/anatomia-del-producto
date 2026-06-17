# Guía de contenido — Anatomía del Producto

Cómo escribir artículos, crear secciones y estructurar el sitio.

---

## Estructura de carpetas del contenido

```
src/content/docs/
├── index.mdx              → página de inicio (ruta: /)
├── contacto.md            → ruta: /contacto/
├── cabeza/                → sección "Cabeza" en el sidebar
│   └── mi-articulo.md     → ruta: /cabeza/mi-articulo/
├── caja-toracica/         → sección "Caja torácica"
│   └── mi-articulo.mdx
└── extremidades/          → sección "Extremidades"
    └── mi-articulo.md
```

**Regla clave:** la ruta de la URL refleja la carpeta y el nombre del archivo.
`src/content/docs/cabeza/producto-y-ia.md` → `anatomia-del-producto.com/cabeza/producto-y-ia/`

---

## Estructura de un artículo

Todo artículo empieza con un bloque de **frontmatter** (entre `---`) seguido del contenido en Markdown.

```markdown
---
title: Título del artículo
description: Una frase que describe el artículo. Aparece en SEO y en vistas previas.
tags: ["producto", "IA", "estrategia"]
pubDate: 2025-03-15
---

El primer párrafo va aquí, sin ningún encabezado encima.

## Primer subtítulo

Contenido de la sección...
```

### Campos del frontmatter

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título del artículo. Aparece como h1 y en el sidebar. |
| `description` | Recomendado | Descripción corta para SEO y tarjetas de vista previa. |
| `tags` | No | Lista de etiquetas. Genera chips y páginas `/tags/<tag>/`. |
| `pubDate` | Recomendado | Fecha de publicación (YYYY-MM-DD). Usada para el botón "Último artículo" del inicio. |
| `icon` | No | Ícono que aparece junto al título. Puede ser un emoji (`🧠`) o una ruta de imagen (`/favicon.svg`). |
| `relatedArticles` | No | Lista de IDs de artículos relacionados. Muestra tarjetas al final del artículo. |
| `pageTheme` | No | Tema de color de la página (ej: `terracota`). |

### El campo `pubDate`

Controla qué artículo aparece en el botón "Último artículo →" de la página de inicio. El botón apunta siempre al artículo con la fecha más reciente dentro de las secciones Cabeza, Caja torácica y Extremidades.

```yaml
pubDate: 2025-03-15
```

> El campo es interno — no se muestra visiblemente en el artículo.

### El campo `icon`

Aparece alineado al lado izquierdo del título (`<h1>`). Acepta dos formatos:

```yaml
# Emoji
icon: 🧠

# Ruta de imagen (debe existir en /public/ o como asset)
icon: /favicon.svg
```

### El campo `relatedArticles`

Muestra tarjetas de artículos relacionados al final del contenido, antes de la navegación anterior/siguiente. Se escribe como lista de IDs de documento (ruta relativa sin extensión desde `src/content/docs/`):

```yaml
relatedArticles:
  - cabeza/ia-y-el-futuro-de-los-productos-digitales
  - extremidades/herramientas-ia-para-equipos-de-producto
```

El ID es la ruta del archivo sin `src/content/docs/` y sin extensión.

---

## Tema de color de la página (`pageTheme`)

Puedes cambiar los colores del área de contenido de una página sin afectar el sidebar ni el menú.

```yaml
---
title: Inicio
pageTheme: terracota
---
```

| Valor | Efecto |
|---|---|
| `terracota` | Fondo terracota, texto crema (colores invertidos de la paleta principal) |
| *(sin valor)* | Colores normales del sitio |

**Cómo crear un tema nuevo:**

1. Abre `src/styles/custom.css` y busca la sección `/* Temas de página */`
2. Duplica el bloque `terracota` y cambia el nombre y los colores. Usa valores hex directos (no variables CSS) para evitar referencias circulares:

```css
.main-pane:has([data-page-theme='marino']) {
  background-color: #1A2A45;
  color: #F6F8FF;
  --c-navy:              #F6F8FF;
  --c-text:              #F6F8FF;
  --c-text-strong:       #F6F8FF;
  --c-border:            rgba(246, 248, 255, 0.25);
  --c-border-soft:       rgba(246, 248, 255, 0.18);
  --sl-color-bg:         #1A2A45;
  --sl-color-text:       #F6F8FF;
  --sl-color-white:      #F6F8FF;
  --sl-color-text-accent:#F6F8FF;
  --sl-color-accent:     #F6F8FF;
  --sl-color-hairline:        rgba(246, 248, 255, 0.25);
  --sl-color-hairline-light:  rgba(246, 248, 255, 0.18);
}

.main-pane:has([data-page-theme='marino']) a {
  color: #F6F8FF;
  text-decoration-color: rgba(246, 248, 255, 0.5);
}
```

3. Usa `pageTheme: marino` en el frontmatter.

---

## Sobre los tags

- Se escriben como lista: `tags: ["Producto Digital", "IA"]`
- Si el tag tiene espacios, usa comillas
- Al usar un tag por primera vez se crea automáticamente su página en `/tags/<tag>/`
- Usa tags consistentes entre artículos (misma capitalización y ortografía)

---

## Extensión del archivo: .md vs .mdx

| Extensión | Cuándo usarla |
|---|---|
| `.md` | La mayoría de artículos. Solo texto, imágenes y Markdown estándar. |
| `.mdx` | Cuando necesitas insertar componentes como `<YouTube>` o elementos interactivos. |

---

## Formato Markdown disponible

```markdown
## Encabezado nivel 2
### Encabezado nivel 3

**Texto en negrita**
*Texto en cursiva*

- Lista con viñetas
- Otro elemento

1. Lista numerada
2. Otro elemento

> Cita o bloque destacado

`código inline`

[Texto del link](https://ejemplo.com)

![Descripción de imagen](../../assets/mi-imagen.png)
```

### Imágenes

Las imágenes van en `src/assets/` y se referencian con ruta relativa desde el artículo:

```markdown
![Descripción](../../assets/mi-imagen.png)
```

También puedes poner imágenes en `public/` y referenciarlas con ruta absoluta:

```markdown
![Descripción](/imagenes/mi-imagen.png)
```

### Links externos

Cualquier link que empiece con `http://` o `https://` se abre automáticamente en una pestaña nueva (`target="_blank"`). Los links internos (que empiezan con `/`) abren en la misma pestaña. No necesitas configurar nada.

---

## Incrustar videos de YouTube

Los artículos `.mdx` pueden usar el componente `<YouTube>`:

```mdx
---
title: Mi artículo con video
description: Descripción del artículo.
tags: ["producto"]
pubDate: 2025-03-15
---

import YouTube from '../../../components/YouTube.astro';

Texto introductorio del artículo.

<YouTube id="dQw4w9WgXcQ" />
```

El `id` es el código que aparece en la URL de YouTube después de `?v=`.

---

## Agregar una nueva sección al sidebar

Una "sección" es una carpeta dentro de `src/content/docs/` + una entrada en el sidebar de `astro.config.mjs`.

### Paso 1: Crear la carpeta

```
src/content/docs/columna/
```

### Paso 2: Agregar la sección al sidebar

Abre `astro.config.mjs` y agrega una entrada en el array `sidebar`:

```js
sidebar: [
  // ... entradas existentes ...
  {
    label: 'Columna',
    items: [
      { autogenerate: { directory: 'columna' } }
    ],
  },
]
```

### Paso 3: Crear el primer artículo de la sección

```markdown
---
title: Mi primer artículo de Columna
description: Descripción del artículo.
tags: ["columna"]
pubDate: 2025-04-01
---

Contenido del artículo...
```

---

## Agregar subsecciones

Puedes anidar carpetas dentro de una sección. Con `autogenerate`, Starlight convierte las subcarpetas en grupos automáticamente.

```
src/content/docs/
└── cabeza/
    ├── ojos/
    │   └── ia-y-vision.md
    └── oidos/
        └── procesamiento-de-audio.md
```

---

## Orden de los artículos en el sidebar

Por defecto, `autogenerate` ordena los artículos **alfabéticamente** por nombre de archivo.

Para controlar el orden usa un prefijo numérico en el nombre del archivo:

```
cabeza/
├── 01-introduccion.md
├── 02-ia-y-producto.md
└── 03-estrategia.md
```

El número no aparece en la URL.

---

## Quitar un artículo del sidebar

Si borras un archivo `.md`, desaparece automáticamente del sidebar. No hace falta tocar `astro.config.mjs` si usas `autogenerate`.

Si el artículo estaba listado manualmente en `astro.config.mjs` (como "Inicio" o "Contacto"), también debes quitarlo de ahí.

---

## Crear páginas especiales (sin sección)

Páginas como "Contacto" van directamente en `src/content/docs/` y se agregan manualmente al sidebar:

```js
{
  label: 'Anatomía del producto',
  items: [
    { label: 'Inicio', link: '/' },
    { label: 'Contacto', link: '/contacto/' },
  ],
},
```

---

## Páginas automáticas del sitio

| URL | Descripción |
|---|---|
| `/articulos/` | Índice de todos los artículos, ordenados con su sección y tags |
| `/tags/` | Lista de todos los tags usados |
| `/tags/<tag>/` | Artículos filtrados por un tag específico |

Se actualizan solas cada vez que publicas un artículo nuevo.

---

## Navegación al final de los artículos

Al final de cada artículo aparecen (en este orden):

1. **Tarjetas de artículos relacionados** — si el artículo tiene `relatedArticles` en el frontmatter
2. **Navegación Anterior / Siguiente** — siempre presente (excepto en el primero y último artículo de la secuencia del sidebar)

No necesitas configurar nada para la navegación. Los artículos relacionados se configuran con el campo `relatedArticles`.

---

## Footer de copyright

Todos los artículos muestran automáticamente al final:

> Copyright © Todos los Derechos Reservados Leonardo Ruano Hernández {año}

El año se actualiza solo. No necesitas añadirlo manualmente.

---

## Sidebar colapsable

En escritorio, el sidebar tiene un botón en la esquina superior derecha que lo colapsa a un rail de íconos. El estado se guarda automáticamente en el navegador.

El bloque de branding (logo + nombre + botón) es **sticky** — permanece visible aunque hagas scroll dentro del sidebar.

---

## Flujo completo: publicar un artículo nuevo

1. Crea el archivo `.md` en la carpeta correcta
2. Escribe el frontmatter con al menos `title`, `description`, `tags`, `pubDate`
3. (Opcional) Agrega `relatedArticles` con IDs de otros artículos
4. Escribe el contenido en Markdown
5. Publica:
   ```bash
   git add .
   git commit -m "Nuevo artículo: nombre del artículo"
   git push
   ```
6. Vercel despliega automáticamente en ~1 minuto

---

## Referencia rápida de rutas

| Archivo | URL resultante |
|---|---|
| `docs/index.mdx` | `/` |
| `docs/contacto.md` | `/contacto/` |
| `docs/cabeza/ia-y-producto.md` | `/cabeza/ia-y-producto/` |
| `docs/cabeza/01-intro.md` | `/cabeza/intro/` (el número se elimina) |
| `docs/caja-toracica/mvp.md` | `/caja-toracica/mvp/` |
