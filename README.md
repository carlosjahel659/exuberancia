# La Exuberancia — beta del sitio web

Beta funcional del sitio de **La Exuberancia** (restaurante mexicano familiar), construida con
**React + Vite + Tailwind CSS**. El contenido del menú se extrajo del PDF `MENU EXUBERANCIA.pdf`
y del cartel *Menú de bebidas*; todo está convertido a HTML real (no hay PDFs ni imágenes de
menú incrustadas).

---

## Cómo iniciar la página

En esta computadora **no había Node.js instalado**, así que se instaló una copia portátil en
`C:\Users\carlo\tools\node-v22.14.0-win-x64` (no toca el sistema ni el PATH global).

### Opción A — usar la copia portátil (PowerShell)

```powershell
$env:PATH = "$env:USERPROFILE\tools\node-v22.14.0-win-x64;" + $env:PATH
cd c:\Users\carlo\repositorios\exuberancia
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173
```

### Opción B — instalar Node.js normalmente

Instala Node 20 o superior desde <https://nodejs.org> y después:

```powershell
cd c:\Users\carlo\repositorios\exuberancia
npm install
npm run dev
```

Otros comandos:

| Comando           | Qué hace                                        |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build`   | Compila el sitio a `dist/`                      |
| `npm run preview` | Sirve la versión compilada                      |

---

## Archivos creados

```
exuberancia/
├─ index.html                     Documento base, fuentes y metadatos
├─ package.json                   Dependencias y scripts
├─ vite.config.js
├─ tailwind.config.js             Paleta, tipografías y animaciones de marca
├─ postcss.config.js
├─ .gitignore
├─ public/assets/                 Imágenes extraídas del PDF y optimizadas a .webp
│  ├─ logo-exuberancia.webp       Logotipo completo
│  ├─ logo-wordmark.webp          Logotipo tipográfico
│  ├─ textura-tela.webp           Textura diagonal de fondo (del propio PDF)
│  ├─ barbacoa.webp  chilaquiles.webp  enchiladas.webp
│  ├─ hot-cakes.webp  quesadillas.webp  cazuela-barro.webp
│  └─ favicon.png
└─ src/
   ├─ main.jsx                    Punto de entrada
   ├─ App.jsx                     Orden de las secciones
   ├─ index.css                   Estilos base, texturas, neón y reduced-motion
   ├─ data/
   │  ├─ menu.js                  TODO el menú, bebidas, promos y especialidades
   │  ├─ horarios.js              ÚNICA fuente de días, horarios y disponibilidad
   │  └─ site.js                  Contacto, horarios, redes y navegación
   ├─ hooks/
   │  ├─ useAhora.js              Reloj de Ciudad de México (con modo de prueba)
   │  └─ useRevelar.js            Aparición al hacer scroll + sección activa
   └─ components/
      ├─ Encabezado.jsx           Header fijo + menú hamburguesa animado
      ├─ Portada.jsx              Hero con entrada animada
      ├─ MenuInteractivo.jsx      Cuadrícula de 6 categorías con estado (sin recargar)
      ├─ AvisoDelDia.jsx          Bloque dinámico de día, hora y disponibilidad
      ├─ EstadoDisponibilidad.jsx Pastillas de estado y aviso de categoría bloqueada
      ├─ TarjetaProducto.jsx      Tarjeta de platillo reutilizable
      ├─ TarjetaPromo.jsx         Tarjeta de promoción reutilizable
      ├─ Especialidades.jsx       Bloques grandes alternando foto/texto
      ├─ Bebidas.jsx              Sección tipo pizarrón con precios de barril
      ├─ Nosotros.jsx             Bloque de marca
      ├─ Promociones.jsx          Promos + horarios + tiempos de preparación
      ├─ Ubicacion.jsx            Contacto, redes y espacio para el mapa
      ├─ PieDePagina.jsx          Footer
      ├─ Ornamentos.jsx           Filigranas, agaves, chispas e ilustraciones neón
      ├─ IconosRed.jsx            Iconos de Instagram, Facebook y TikTok
      └─ ui.jsx                   Botón, etiqueta, título de sección, Revelar
```

---

## Menú dinámico por día y horario

La página detecta sola el día y la hora en **`America/Mexico_City`** (no usa el reloj ni la
región del visitante) y activa o bloquea cada categoría.

**Todas las reglas viven en un solo archivo: [`src/data/horarios.js`](src/data/horarios.js).**
Ningún componente repite horarios: todos preguntan ahí. Para cambiar un horario se edita ese
archivo y se actualiza toda la página.

| Categoría           | Días              | Horario         | Cuando no aplica                              |
| ------------------- | ----------------- | --------------- | --------------------------------------------- |
| **Desayunos**       | Lunes a viernes   | 9:00 – 12:00    | “Desayunos disponibles de 9:00 a. m. a 12:00 p. m.” |
| **Entradas**        | Lunes a viernes   | 9:00 – 19:00    | Dentro del horario se anuncia “Disponible todo el día” |
| **Comida mexicana** | Lunes a viernes   | 12:00 – 19:00   | Antes de las 12:00: “Disponible a partir de las 12:00 p. m.” |
| **Fin de semana**   | Sábado y domingo  | Todo el día     | Lun–vie: “Disponible sábados y domingos”      |
| **Barbacoa** (grupo dentro de Fin de semana) | Solo domingo | Todo el día | “Barbacoa disponible solamente los domingos” |
| **Bebidas**         | Todos los días    | Todo el día     | Siempre activa (con y sin alcohol)            |
| **Promociones**     | Todos los días    | —               | Solo respeta los días que la propia promo ya declara |

Las dos promociones que ya traían días propios los conservan: **Desayuno Ejecutivo**
(lunes a viernes) y **Música en vivo** (viernes, sábado y domingo desde las 12:00). Las demás no
tienen horario y no se les inventó ninguno.

### Estados visuales

| Estado                  | Color            | Cuándo aparece                                  |
| ----------------------- | ---------------- | ----------------------------------------------- |
| **Disponible ahora**    | Turquesa         | Es su día y está dentro del horario             |
| **Disponible más tarde**| Amarillo         | Es su día pero todavía no abre                  |
| **No disponible hoy**   | Gris             | No se sirve hoy, o su horario ya terminó        |
| **Solo domingos**       | Rosa mexicano    | Barbacoa cualquier día que no sea domingo       |

Las categorías bloqueadas **siguen visibles**: el cliente puede leer toda la carta. Al abrirlas se
muestra su horario y el próximo día disponible, y cada platillo queda marcado como
“No se puede pedir en este momento”.

### Cómo probar otros días y horas (sin tocar el reloj de la computadora)

Agrega parámetros a la dirección. La página muestra un aviso amarillo de **modo de prueba**
mientras la simulación está activa:

```
http://localhost:5173/?dia=lunes&hora=10:00      → menú entre semana, desayunos activos
http://localhost:5173/?dia=lunes&hora=12:00      → desayunos cierran, comida mexicana abre
http://localhost:5173/?dia=lunes&hora=19:00      → cocina cerrada, solo bebidas y promos
http://localhost:5173/?dia=sabado&hora=13:00     → fin de semana activo, barbacoa bloqueada
http://localhost:5173/?dia=domingo&hora=13:00    → fin de semana y barbacoa activos
http://localhost:5173/?ahora=2026-09-06T13:00    → fecha y hora completas
```

También acepta el día como número (`?dia=0` domingo … `?dia=6` sábado). Quitar los parámetros
devuelve la hora real.

### Para cuando existan carrito y backend

`horarios.js` exporta las funciones que hay que usar como **única** validación, tanto en el
navegador como en el servidor (no dependen del DOM):

```js
import { puedeAgregarAlCarrito, revisarDisponibilidad } from './src/data/horarios'

// Antes de agregar al carrito o de registrar una compra
puedeAgregarAlCarrito({ categoria: 'finde', grupo: 'Barbacoa' })
// -> { permitido: false, motivo: 'Barbacoa disponible solamente los domingos', estado: 'soloDomingos' }

// Antes de finalizar la compra, para avisar de lo que dejó de estar disponible
revisarDisponibilidad(articulosDelCarrito)
// -> { todoDisponible: false, noDisponibles: [ { articulo, motivo, estado } ] }
```

> **Importante:** este proyecto es un sitio estático (React + Vite) **sin backend, sin base de
> datos, sin sistema de usuarios y sin carrito de compras** — la beta anterior se pidió
> explícitamente sin ellos. Por eso la validación de servidor todavía no se puede conectar: las
> funciones de arriba ya están listas y probadas para hacerlo el día que exista el backend.

---

## Datos reales que todavía faltan

Todos viven en un solo archivo: [`src/data/site.js`](src/data/site.js). Sustituye el texto entre
corchetes y el sitio entero se actualiza (encabezado, botones, ubicación y pie de página).

1. **Dirección** — `[DIRECCIÓN]`
2. **Teléfono** — `[TELÉFONO]`
3. **Enlace de WhatsApp** — `[WHATSAPP_LINK]` (formato `https://wa.me/52XXXXXXXXXX`)
4. **URL de Google Maps** — `[GOOGLE_MAPS_URL]` (y el `<iframe>` para incrustar el mapa)
5. **Instagram** — `[INSTAGRAM_URL]`
6. **Facebook** — `[FACEBOOK_URL]`
7. **TikTok** — `[TIKTOK_URL]`

Mientras estén sin definir, los enlaces se muestran deshabilitados y marcados como
“por definir”, en lugar de llevar a una página rota.

Además, hay dos cosas del menú que conviene confirmar con el restaurante:

8. **Descripción de “Enchiladas Exuberantes”** — en el PDF aparece el nombre y el precio
   ($7.75) pero no la descripción. Está marcada como pendiente en la tarjeta.
9. **Fotografías en alta resolución** — ver la nota de imágenes abajo.

---

## Notas sobre el contenido

### Precios y textos

Los nombres, descripciones y precios se transcribieron **tal cual** del PDF. Solo se corrigieron
faltas de ortografía evidentes:

| En el PDF          | En el sitio         |
| ------------------ | ------------------- |
| `Divorsiados`      | `Divorciados`       |
| `COCTELERIA`       | `Coctelería`        |
| `porción de arrachera` (sin espacio) | corregido el espaciado |

También se antepuso el nombre del grupo en algunos platillos para que se entiendan fuera de su
columna (`Tradicionales` → `Chilaquiles Tradicionales`, `Rancheros` → `Huevos Rancheros`, etc.).
Los precios **no se modificaron**; conviene revisarlos, porque en el PDF algunos parecen
inconsistentes (por ejemplo, *Hot Cakes Exuberantes* $4.50 sale más barato que los tradicionales
$7.00, y los platillos “Exuberantes” suelen costar menos que los tradicionales).

Se añadieron dos descripciones cortas donde el PDF solo traía una lista de opciones sin texto
(*Queso fundido* y *Taco Exuberante*); son textos de relleno editables en `src/data/menu.js`.

### Bebidas

- Los **precios de barril** (Cerveza de Barril, Cerveza Mega, Michelada de Barril, Michelada Mega,
  Marina de Barril y Venenosa) vienen del cartel *Menú de bebidas*.
- La **lista de coctelería, cervezas, aguas frescas, malteadas y otras bebidas** viene del PDF,
  que no incluye precios para esos artículos.

### Imágenes

- Todas las fotografías y el logotipo se **extrajeron del PDF original** (con su transparencia) y
  se convirtieron a `.webp` optimizado. No se usó ninguna foto de banco ajena a la marca.
- Las fotos del PDF son **de baja resolución** (entre 176 px y 380 px de ancho). Se ven bien en
  las tarjetas del menú, pero en la sección de *Especialidades* se muestran a mayor tamaño y se
  notan suaves. Si el cliente puede enviar las fotos originales, basta con reemplazar los
  archivos de `public/assets/` conservando el nombre.
- El cartel de bebidas no permitía recortar fotos limpias de los tarros, así que las bebidas de
  barril se representan con **ilustraciones neón dibujadas en SVG** (`Ornamentos.jsx`), en el mismo
  estilo del cartel. Se pueden cambiar por fotografías reales cuando existan.
- El mapa es un **espacio reservado** claramente identificado hasta tener la URL de Google Maps.

---

## Diseño y comportamiento

- **Paleta:** negro carbón `#070909`, blanco cálido `#F5F0DF`, turquesa `#00A8A5`,
  rosa mexicano `#E50058`, amarillo `#F0B323`, naranja `#E87B3A`.
- **Tipografías:** Anton (títulos), Bebas Neue (subtítulos y precios), Montserrat (texto).
- **Fondo:** textura de tela diagonal tomada del propio PDF, con resplandores de color.
- **Responsive:** diseñado primero para móvil; probado a **360 px, 768 px y 1440 px**. Sin
  desplazamiento horizontal en ningún ancho. Las seis categorías se ven completas en una
  cuadrícula de 2×3 en teléfono y en una sola fila de 6 en computadora.
- **Animaciones:** entrada de la portada, aparición al hacer scroll, ornamentos flotando, escala
  suave en tarjetas y fotos, transición entre categorías y brillo en los botones principales.
  Todo respeta `prefers-reduced-motion: reduce`.
- **Accesibilidad:** HTML semántico, enlace “saltar al menú”, `aria-*` en pestañas y menú móvil,
  foco visible, textos alternativos y contraste alto sobre fondo oscuro.
- Sin backend, sin carrito y sin pagos, tal como se pidió para esta beta.
