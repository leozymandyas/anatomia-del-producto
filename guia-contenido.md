# Guía de contenido — Anatomía del Producto

Cómo escribir artículos, crear secciones y estructurar el sitio.

---

## Estructura de carpetas del contenido

```
src/content/docs/
├── index.mdx              → página de inicio (ruta: /)
├── sobre-mi.md            → ruta: /sobre-mi/
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
tags: [producto, IA, estrategia]
---

El primer párrafo va aquí, sin ningún encabezado encima. Este texto
es la introducción del artículo.

## Primer subtítulo

Contenido de la sección...

## Segundo subtítulo

Más contenido...
```

### Campos del frontmatter

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título del artículo. Aparece como h1 y en la pestaña. |
| `description` | Recomendado | Descripción corta para SEO y tarjetas de vista previa. |
| `tags` | No | Lista de etiquetas. Genera chips y páginas `/tags/<tag>/`. |

### Tema de color de la página (`pageTheme`)

Puedes cambiar los colores del área de contenido de una página sin afectar el sidebar ni el menú. El sidebar, el header y la navegación conservan siempre sus colores normales.

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
/* Tema: marino — ejemplo */
.main-pane:has([data-page-theme='marino']) {
  background-color: #1A2A45;
  color: #FDF5E5;
  --c-navy:              #FDF5E5;
  --c-text:              #FDF5E5;
  --c-text-strong:       #FDF5E5;
  --c-border:            rgba(253, 245, 229, 0.25);
  --c-border-soft:       rgba(253, 245, 229, 0.18);
  --sl-color-bg:         #1A2A45;
  --sl-color-text:       #FDF5E5;
  --sl-color-white:      #FDF5E5;
  --sl-color-text-accent:#FDF5E5;
  --sl-color-accent:     #FDF5E5;
  --sl-color-hairline:        rgba(253, 245, 229, 0.25);
  --sl-color-hairline-light:  rgba(253, 245, 229, 0.18);
}

.main-pane:has([data-page-theme='marino']) a {
  color: #FDF5E5;
  text-decoration-color: rgba(253, 245, 229, 0.5);
}

.main-pane:has([data-page-theme='marino']) a:hover {
  text-decoration-color: #FDF5E5;
}

.main-pane:has([data-page-theme='marino']) .tag-chip {
  background-color: rgba(253, 245, 229, 0.18);
  color: #FDF5E5;
}
```

3. Usa `pageTheme: marino` en el frontmatter del artículo.

### Sobre los tags

- Se escriben como lista: `tags: [producto, IA]` o `tags: ["Producto Digital", "IA"]`
- Si el tag tiene espacios, usa comillas: `"Producto Digital"`
- Al usar un tag por primera vez se crea automáticamente su página en `/tags/<tag>/`
- Usa tags consistentes entre artículos (misma capitalización y ortografía)

---

## Extensión del archivo: .md vs .mdx

| Extensión | Cuándo usarla |
|---|---|
| `.md` | La mayoría de artículos. Solo texto, imágenes y Markdown estándar. |
| `.mdx` | Cuando necesitas insertar componentes como `<YouTube>` o elementos interactivos. |

Para artículos normales, usa `.md`. Solo cambia a `.mdx` si el artículo necesita un componente.

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

Formatos soportados: `.png`, `.jpg`, `.webp`, `.gif`, `.svg`

---

## Incrustar videos de YouTube

Los artículos `.mdx` pueden usar el componente `<YouTube>`:

```mdx
---
title: Mi artículo con video
description: Descripción del artículo.
tags: [producto]
---

import YouTube from '../../../components/YouTube.astro';

Texto introductorio del artículo.

<YouTube id="dQw4w9WgXcQ" />

Texto después del video.
```

El `id` es el código que aparece en la URL de YouTube después de `?v=`.

---

## Agregar una nueva sección al sidebar

Una "sección" es una carpeta dentro de `src/content/docs/` + una entrada en el sidebar de `astro.config.mjs`.

### Paso 1: Crear la carpeta

```
src/content/docs/columna/       ← nombre en minúsculas, sin espacios ni tildes
```

### Paso 2: Agregar la sección al sidebar

Abre `astro.config.mjs` y agrega una entrada en el array `sidebar`:

```js
sidebar: [
  // ... entradas existentes ...
  {
    label: 'Columna',           // nombre que se ve en el sidebar
    items: [
      { autogenerate: { directory: 'columna' } }
    ],
  },
]
```

`autogenerate` hace que todos los archivos de esa carpeta aparezcan automáticamente.

### Paso 3: Crear el primer artículo de la sección

```
src/content/docs/columna/mi-primer-articulo.md
```

```markdown
---
title: Mi primer artículo de Columna
description: Descripción del artículo.
tags: [columna]
---

Contenido del artículo...
```

Guarda el archivo y la sección aparece en el sidebar de inmediato (en desarrollo local).

---

## Agregar subsecciones (Cabeza > Ojos > Artículo)

Puedes anidar un nivel más creando subcarpetas dentro de una sección. No hace falta tocar `astro.config.mjs` si ya usas `autogenerate` — Starlight convierte las subcarpetas en grupos automáticamente.

### Estructura de carpetas

```
src/content/docs/
└── cabeza/
    ├── ojos/
    │   ├── ia-y-vision.md
    │   └── reconocimiento-de-patrones.md
    └── oidos/
        └── procesamiento-de-audio.md
```

Resultado en el sidebar:
```
▼ Cabeza
    ▼ Ojos
        IA y visión
        Reconocimiento de patrones
    ▼ Oídos
        Procesamiento de audio
```

El label del grupo viene del nombre de la carpeta (capitalizado automáticamente).

### Si quieres un label personalizado para la subsección

Reemplaza el `autogenerate` de la sección en `astro.config.mjs` con una lista manual:

```js
{
  label: 'Cabeza',
  items: [
    {
      label: 'Visión e imágenes',        // label personalizado
      items: [{ autogenerate: { directory: 'cabeza/ojos' } }],
    },
    {
      label: 'Sonido',
      items: [{ autogenerate: { directory: 'cabeza/oidos' } }],
    },
  ],
},
```

### Rutas resultantes

| Archivo | URL |
|---|---|
| `cabeza/ojos/ia-y-vision.md` | `/cabeza/ojos/ia-y-vision/` |
| `cabeza/oidos/procesamiento.md` | `/cabeza/oidos/procesamiento/` |

---

## Orden de los artículos en el sidebar

Por defecto, `autogenerate` ordena los artículos **alfabéticamente** por nombre de archivo.

Para controlar el orden usa un prefijo numérico en el nombre del archivo:

```
cabeza/
├── 01-introduccion.md          → aparece primero
├── 02-ia-y-producto.md         → segundo
└── 03-estrategia.md            → tercero
```

El número no aparece en la URL (Astro lo elimina del slug automáticamente).

Si prefieres nombres sin número, también puedes listar los artículos manualmente en `astro.config.mjs`:

```js
{
  label: 'Cabeza',
  items: [
    { label: 'Introducción', link: '/cabeza/introduccion/' },
    { label: 'IA y producto', link: '/cabeza/ia-y-producto/' },
  ],
}
```

---

## Cambiar el título de un artículo en el sidebar

Por defecto el sidebar usa el `title` del frontmatter. Para usar un título diferente (más corto) en el sidebar, configúralo manualmente:

```js
{
  label: 'Cabeza',
  items: [
    { autogenerate: { directory: 'cabeza' } }
  ],
}
```

O listando manualmente con `label` propio:

```js
items: [
  { label: 'Intro corta', link: '/cabeza/introduccion-al-producto-digital/' },
]
```

---

## Crear páginas especiales (sin sección)

Páginas como "Sobre mí" o "Contacto" van directamente en `src/content/docs/` (sin subcarpeta) y se agregan manualmente al sidebar:

```js
{
  label: 'Anatomía del producto',
  items: [
    { label: 'Inicio', link: '/' },
    { label: 'Sobre mí', link: '/sobre-mi/' },
    { label: 'Contacto', link: '/contacto/' },
  ],
},
```

---

## Páginas automáticas del sitio

El sitio incluye dos páginas generadas automáticamente que no requieren mantenimiento:

| URL | Descripción |
|---|---|
| `/articulos/` | Índice de todos los artículos, ordenados alfabéticamente con su sección y tags |
| `/tags/` | Lista de todos los tags usados, con el número de artículos de cada uno |
| `/tags/<tag>/` | Artículos filtrados por un tag específico |

Estas páginas se actualizan solas cada vez que publicas un artículo nuevo. No necesitas tocarlas.

---

## Footer de copyright

Todos los artículos muestran automáticamente al final:

> Copyright © Todos los Derechos Reservados Leonardo Ruano Hernández {año}

No necesitas añadirlo manualmente. El componente `Footer.astro` lo inserta en cada página. El año se actualiza solo.

---

## Sidebar colapsable

En escritorio, el sidebar tiene un botón `‹` en la esquina superior derecha que lo colapsa a un rail de íconos. El estado se guarda automáticamente en el navegador — si lo cierras y vuelves, queda igual. No necesitas configurar nada.

---

## Flujo completo: publicar un artículo nuevo

1. Crea el archivo `.md` en la carpeta correcta
2. Escribe el frontmatter (`title`, `description`, `tags`)
3. Escribe el contenido en Markdown
4. Prueba localmente: `npm run dev`
5. Cuando se vea bien, publica:
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
| `docs/sobre-mi.md` | `/sobre-mi/` |
| `docs/cabeza/ia-y-producto.md` | `/cabeza/ia-y-producto/` |
| `docs/cabeza/01-intro.md` | `/cabeza/intro/` (el número se elimina) |
| `docs/caja-toracica/mvp.md` | `/caja-toracica/mvp/` |
