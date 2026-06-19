---
title: Gestión de épicas
description: Documentación del plugin de Obsidian para Product Owners y equipos ágiles que gestionan el desarrollo de producto a través de épicas, historias, sprints e incidencias — todo como notas Markdown dentro del vault.
tags: ["Obsidian", "Gestión de producto", "Plugin"]
pubDate: 2026-06-19
icon: /favicon.svg
---

**Gestión de épicas** es un plugin de Obsidian para Product Owners, Product Managers y equipos ágiles. Concentra en un solo lugar toda la información de un esfuerzo de producto —historias, sprints, tareas, pendientes, incidencias, documentos y roadmap— y la guarda como notas Markdown dentro de tu propia bóveda.

Tu información siempre queda en archivos `.md` normales: portable, legible y tuya, incluso si algún día desactivas el plugin.

:::note[Requisitos]
Solo funciona en **Obsidian Desktop** (Windows, macOS, Linux). La interfaz está en español. Versión mínima de Obsidian: **1.7.2**.
:::

---

## El modelo de datos

El plugin organiza el trabajo en una jerarquía pensada para gestión de producto:

| Elemento | Para qué sirve |
|---|---|
| **Épica** | El contenedor principal de un esfuerzo de producto. Cada épica tiene su propia nota *dashboard* y se guarda en las carpetas `Épicas/` o `Épicas archivadas/` del vault. |
| **Historia** | Un módulo o bloque de trabajo dentro de una épica. |
| **Etiqueta** | Clasifica historias por funcionalidad o por cualquier criterio que definas. |
| **Incidencia** | Registros que tú defines: tareas, pendientes, notas, bugs, etc. Se pueden crear a nivel de épica o de historia. |
| **Sprint** | Vincula épicas con el sprint en curso y con los equipos o células que las trabajan. |
| **Colaborador** | Personas que puedes asignar a cualquier elemento del plugin. |
| **Documento** | Notas de apoyo (especificaciones, investigaciones, actas) clasificadas por épica o por segmento. |

Cada elemento se guarda como una nota Markdown con su *frontmatter*, dentro de carpetas con nombres *slugificados*:

```text
Diseñar pantalla de login  →  disenar-pantalla-de-login.md
```

---

## Instalación

### Desde Community Plugins

1. Abre **Settings → Community plugins → Browse**.
2. Busca **Gestion de epicas**.
3. Haz clic en **Install** y luego en **Enable**.

### Instalación manual

1. Descarga `manifest.json`, `main.js` y `styles.css` desde la última *release* del repositorio.
2. Crea la carpeta `<tu-vault>/.obsidian/plugins/gestion-de-epicas/` y copia ahí los tres archivos.
3. En Obsidian, ve a **Settings → Community plugins** y activa **Gestion de epicas**.

:::tip
La carpeta `.obsidian` está oculta. En macOS, dentro de Finder, presiona `Cmd + Shift + .` para mostrarla.
:::

---

## Primeros pasos

1. Abre el **panel de acciones** desde el ícono del plugin en la barra lateral izquierda.
2. La primera vez, usa **«Crear carpetas de gestión»** para generar la estructura `Épicas/` y `Épicas archivadas/` en la raíz del vault.
3. Crea tu primera **épica** — se abrirá automáticamente su nota *dashboard*.
4. Desde ahí, agrega **historias, incidencias y documentos**.
5. Abre el **Kanban** o el **Roadmap** para visualizar el avance general.

---

## El panel de acciones

Todo el plugin se controla desde un panel lateral organizado en pestañas. Estas son las acciones disponibles en cada una:

### Épicas

| Acción | Qué hace |
|---|---|
| **Crear épica** | Crea una nueva épica con su dashboard. |
| **Crear historia** | Añade una historia (módulo de trabajo) dentro de una épica. |
| **Asignar sprint** | Vincula una épica con el sprint en curso. |
| **Roadmap** | Abre la vista de roadmap con la planeación temporal. |
| **Planeación** | Gestor de funcionalidades para planear el alcance por periodo. |
| **Historias por épica** | Lista y navega las historias agrupadas por épica. |
| **Mover historias** | Reubica historias entre épicas desde un tablero. |
| **Etiquetas de historias** | Asigna o quita etiquetas a tus historias. |
| **Configurar / Asignar colaborador** | Gestiona el equipo y asígnalo a las épicas. |
| **Archivar épicas** | Mueve épicas terminadas a `Épicas archivadas/`. |
| **Eliminar épica o historia** | Borra elementos que ya no necesitas. |

### Incidencias

| Acción | Qué hace |
|---|---|
| **Crear incidencia** | Crea un registro (tarea, pendiente, bug…) a nivel de épica o historia. |
| **Incidencias por colaborador** | Tablero de incidencias agrupadas por persona asignada. |
| **Mover incidencias** | Reubica incidencias entre épicas o historias. |
| **Reclasificar incidencias** | Cambia el tipo de una o varias incidencias. |

### Documentos

| Acción | Qué hace |
|---|---|
| **Crear documento** | Añade un documento de apoyo a una épica. |
| **Documentos por épica** | Navega los documentos agrupados por épica. |
| **Documentos por segmentos** | Vista de documentos organizados por segmento o tipo. |
| **Clasificar / Reclasificar documentos** | Asigna o cambia el tipo de tus documentos. |

:::tip
La pestaña **Favoritos** te permite fijar las acciones que más usas para tenerlas siempre a mano.
:::

---

## Vistas de visualización

- **Kanban** — el *dashboard* de cada épica muestra sus historias e incidencias en columnas por estado. Mueve tarjetas para actualizar el avance.
- **Roadmap** — vista temporal de las épicas y su planeación, ideal para comunicar el plan a stakeholders.
- **Planeación** — el gestor de funcionalidades te ayuda a distribuir el alcance por periodo o sprint.

---

## Configuración

En **Settings → Gestion de epicas** puedes personalizar:

- **Etiquetas de sprint** — los sprints o células disponibles para asignar.
- **Estados disponibles** — las columnas del Kanban (por ejemplo: *Por hacer*, *En curso*, *Hecho*).
- **Tipos de incidencia** — define tus propios tipos de registro.
- **Tipos de documento** — define cómo clasificar tus documentos.

---

## Filosofía: tus datos, tuyos

Todo lo que crea el plugin son archivos Markdown estándar dentro de tu vault. No hay base de datos propietaria ni servidor externo: puedes versionar tus épicas con Git, leerlas desde cualquier editor y conservarlas aunque desinstales el plugin.

---

## ¿Te resulta útil?

Si el plugin te ahorra tiempo en tu día a día, puedes apoyar su desarrollo invitándome un café:

**[Buy Me a Coffee →](https://buymeacoffee.com/leonardoruano)**
