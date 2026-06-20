# Guía de contenido — Anatomía del Producto

Cómo escribir artículos, usar categorías y estructurar el sitio.

---

## Estructura de carpetas del contenido

```
src/content/docs/
├── index.mdx              → portada (ruta: /)
├── contacto.md            → /contacto/
├── estrategia/            → categoría "Estrategia"
│   └── mi-articulo.md     → ruta: /mi-articulo/   (¡plana!)
├── validacion/            → categoría "Validación"
├── herramientas/          → categoría "Herramientas"
└── obsidian/              → categoría "Obsidian" (tema morado)
```

**Regla clave:** la categoría es la carpeta, pero **NO aparece en la URL**. El
slug es plano y sale del nombre del archivo:
`src/content/docs/estrategia/producto-y-ia.md` →
`anatomia-del-producto.com/producto-y-ia/`

La carpeta define el **color y el tema** del artículo (Obsidian → morado; el
resto → azul).

---

## Estructura de un artículo

Frontmatter (entre `---`) + contenido en Markdown:

```markdown
---
title: Título del artículo
description: Una frase que describe el artículo (SEO y extracto en listados).
tags: ["producto", "IA", "estrategia"]
pubDate: 2026-03-15
---

El primer párrafo va aquí (recibe una **capitular** automática).

## Primer subtítulo

Contenido…
```

### Campos del frontmatter

| Campo | Obligatorio | Descripción |
|---|---|---|
| `title` | Sí | Título del artículo. Aparece en la tarjeta de título y en los listados. |
| `description` | Recomendado | Descripción corta (SEO y extracto en tarjetas/filas). |
| `tags` | No | Lista de etiquetas. Genera chips y páginas `/tags/<tag>/`. |
| `pubDate` | Recomendado | `YYYY-MM-DD`. Ordena el listado y el "anterior/siguiente"; define el "Último artículo" del inicio. |
| `icon` | No | Ícono junto al título: emoji (`🧠`) o ruta de imagen (`/favicon.svg`). |
| `relatedArticles` | No | Slugs (planos) de artículos relacionados. Tarjetas al final. |
| `landing` | No | Marca la página como portada (ancho completo, sin título automático). Solo para páginas especiales. |

> El **color y el tema** del artículo salen de su carpeta-categoría, no del
> frontmatter.

### El campo `pubDate`

Controla el orden del listado, la navegación anterior/siguiente, y qué artículo
aparece en "Último artículo →" del inicio (el de fecha más reciente).

### El campo `relatedArticles`

Tarjetas de artículos relacionados al final, antes del anterior/siguiente. Se
escribe con **slugs planos** (el nombre del archivo sin carpeta ni extensión):

```yaml
relatedArticles:
  - ia-y-el-futuro-de-los-productos-digitales
  - herramientas-ia-para-equipos-de-producto
```

Si un slug no coincide con ningún artículo, esa tarjeta simplemente no aparece.

---

## Categorías

Las cuatro categorías están definidas en `src/lib/categorias.ts`:

| Carpeta | Categoría | Color | Tema |
|---|---|---|---|
| `estrategia/` | Estrategia | azul oscuro | azul |
| `validacion/` | Validación | azul | azul |
| `herramientas/` | Herramientas | azul claro | azul |
| `obsidian/` | Obsidian | morado | **morado** |

Para escribir un artículo, basta con ponerlo en la carpeta correcta. Para crear
una categoría nueva ver "Agregar una categoría" más abajo.

---

## .md vs .mdx

| Extensión | Cuándo |
|---|---|
| `.md` | La mayoría de artículos. Texto, imágenes y Markdown estándar. |
| `.mdx` | Cuando necesitas componentes como `<YouTube>`. |

---

## Formato Markdown disponible

```markdown
## Encabezado nivel 2
### Encabezado nivel 3

**Negrita**  ·  *cursiva*

- Lista
1. Lista numerada

> Cita destacada (se renderiza como tarjeta de vidrio)

`código inline`

[Texto del link](https://ejemplo.com)

![Descripción](../../assets/mi-imagen.png)
```

También puedes usar *asides* de Starlight (`:::note`, `:::tip`, etc.), que se ven
como tarjetas de vidrio con el color del tema.

### Imágenes

En `src/assets/` (ruta relativa) o en `public/` (ruta absoluta `/...`).

### Links externos

Los links `http(s)://` abren en pestaña nueva automáticamente.

---

## Incrustar videos de YouTube (`.mdx`)

```mdx
---
title: Mi artículo con video
description: Descripción.
tags: ["producto"]
pubDate: 2026-03-15
---

import YouTube from '../../../components/YouTube.astro';

Texto introductorio.

<YouTube id="dQw4w9WgXcQ" />
```

El `id` es el código tras `?v=` en la URL de YouTube.

---

## Agregar una categoría

1. Crea la carpeta en `src/content/docs/` (minúsculas, sin tildes ni espacios),
   p. ej. `src/content/docs/cultura/`.
2. Añádela en `src/lib/categorias.ts`:
   - a la lista `CATEGORIAS`
   - a `INFO_CATEGORIAS` con su `label`, `color` y `tema` (`'azul'` u `'obsidian'`).
3. Crea al menos un artículo dentro. La URL seguirá siendo plana y la categoría
   aparecerá como filtro en `/articulos/` automáticamente.

---

## Sobre los tags

- Lista en el frontmatter: `tags: ["Producto Digital", "IA"]` (comillas si hay espacios).
- Cada tag genera su página `/tags/<tag>/` automáticamente.
- Usa tags consistentes (misma capitalización).

---

## Páginas automáticas

| URL | Descripción |
|---|---|
| `/` | Portada (hero, secciones, últimos artículos, newsletter) |
| `/articulos/` | Listado con buscador en vivo + filtros por categoría |
| `/tags/` | Todos los temas con contador |
| `/tags/<tag>/` | Artículos de un tema |

Se actualizan solas al publicar.

---

## Final de cada artículo

En orden:

1. **Artículos relacionados** — si hay `relatedArticles` (tarjetas glass con chip de categoría).
2. **Anterior / Siguiente** — vecinos por orden cronológico (`pubDate`), en tarjetas glass.

No hay que configurar el anterior/siguiente; los relacionados sí (campo `relatedArticles`).

---

## Flujo: publicar un artículo

1. Crea el `.md` en la carpeta de su categoría.
2. Frontmatter con al menos `title`, `description`, `tags`, `pubDate`.
3. (Opcional) `relatedArticles` con slugs planos.
4. Escribe el contenido.
5. Publica:
   ```bash
   git add .
   git commit -m "Nuevo artículo: nombre"
   git push
   ```
6. Vercel despliega en ~1 minuto.

---

## Referencia rápida de rutas

| Archivo | URL |
|---|---|
| `docs/index.mdx` | `/` |
| `docs/contacto.md` | `/contacto/` |
| `docs/estrategia/ia-y-producto.md` | `/ia-y-producto/` |
| `docs/validacion/mvp.md` | `/mvp/` |
| `docs/obsidian/gestion-de-epicas.md` | `/gestion-de-epicas/` |

> La categoría (carpeta) **no** aparece en la URL — solo agrupa y colorea.
