# Kit de Contenido para Figma · Syntra Consulting

Este paquete fue creado para que redactores, diseñadores UX/UI y el equipo directivo puedan trabajar, editar y validar el contenido del sitio web de **Syntra Consulting** directamente en **Figma** o en hojas de cálculo.

---

## 📁 Archivos Disponibles en esta Carpeta (`/figma`)

| Archivo | Formato | Para qué sirve |
| :--- | :--- | :--- |
| **`syntra_landing_figma.svg`** | SVG Vectorial | **El archivo principal para Figma.** Se arrastra directamente al lienzo de Figma y genera un artboard de 1440px con todas las secciones y capas de texto 100% editables. |
| **`syntra_eia_figma.svg`** | SVG Vectorial | Artboard del **Caso de Estudio EIA (Hub)** para editar los textos de perfil organizacional, las 5 fases metodológicas y métricas. |
| **`figma_import_landing.html`** | HTML local | Archivo listo para importar con el popular plugin gratuito **html.to.design** en Figma (crea componentes con Auto-Layout automático). |
| **`figma_import_eia.html`** | HTML local | Archivo del Caso EIA listo para importar con el plugin **html.to.design**. |
| **`matriz_de_contenido.csv`** | CSV (Excel / Sheets) | Matriz fila por fila con todos los textos, IDs de capas de Figma, límites de caracteres y notas para redactores. |
| **`contenido_web_syntra.json`** | JSON estructurado | Estructura en JSON para vincular con plugins de contenido como *Content Reel* o *Google Sheets Sync*. |
| **`guia_de_contenido_y_copywriting.md`** | Markdown | Guía completa con el tono de voz de Syntra, principios de redacción para C-Level y glosario de explicaciones sencillas. |

---

## 🚀 Cómo Empezar en Figma (3 Métodos Sencillos)

### Método 1: Arrastrar y Soltar el `.svg` (Recomendado · Sin plugins · 5 segundos)

1. Abrí **Figma** (en el navegador o en la app de escritorio) y creá un archivo nuevo (*New design file*).
2. Abrí el explorador de archivos de Windows en la carpeta:
   `C:\Users\Alan\Documents\Facu\APLSI\Syntra web\syntra-consulting\figma\`
3. Hacé click y arrastrá el archivo **`syntra_landing_figma.svg`** directamente sobre el lienzo en blanco de Figma.
4. **¡Listo!** Figma importará la pantalla completa en resolución desktop (1440 x 4120 px):
   - Cada título, bajada, botón y campo es una **capa de texto nativa de Figma**.
   - Hacé **doble clic** sobre cualquier texto para empezar a redactar o ajustar el contenido.
   - En el panel lateral izquierdo (*Layers*) vas a ver las secciones nombradas de forma ordenada:
     - `01-Header-Navegacion`
     - `02-Hero-Section`
     - `03-Credenciales-Metodologicas`
     - `04-Presentacion-Equipo`
     - `05-Framework-5-Etapas`
     - `06-Formulario-Contacto`
     - `07-Mega-Footer`

---

### Método 2: Importar con el Plugin "html.to.design" (Para diseñadores avanzados con Auto-Layout)

Si tu equipo prefiere tener componentes automáticos con Auto-Layout y estilos CSS nativos:

1. En Figma, abrí el menú de **Plugins** y buscá: `html.to.design`.
2. Ejecutá el plugin.
3. Hacé clic en la pestaña **Import via HTML file**.
4. Seleccioná el archivo **`figma_import_landing.html`** (o `figma_import_eia.html`).
5. El plugin creará el diseño exacto con frames de Auto-Layout listos para diseñar y mover bloques.

---

### Método 3: Edición Exclusiva de Textos (Para Copywriters que no usan Figma)

Si una persona del equipo solo debe redactar o corregir textos sin entrar a Figma:

1. Abrí el archivo **`matriz_de_contenido.csv`** en **Microsoft Excel** o subilo a **Google Sheets**.
2. Cada fila corresponde a un bloque de texto del sitio web, indicando:
   - `Pagina` y `Seccion`
   - `Capa_Figma` (para que el diseñador ubique el texto en segundos)
   - `Texto_Actual`
   - `Limite_Caracteres` sugerido para no romper el layout
   - `Notas_Copywriting`
3. El redactor puede agregar una columna al lado llamada `Texto_Nuevo_Propuesto` y trabajar con total comodidad.

---

## 🎨 Tipografía y Colores Oficiales

- **Tipografía sugerida en Figma:** `Plus Jakarta Sans` o `Inter` (disponibles gratis en Google Fonts y Figma).
- **Colores de Marca:**
  - Azul Medianoche Principal: `#0B1D3A`
  - Azul Corporativo Acento: `#1E3A8A`
  - Crema Cálido Fondos: `#FDFBF7`
  - Dorado Metodología: `#D4AF37`
  - Gris Texto de Cuerpo: `#334155` y `#64748B`
