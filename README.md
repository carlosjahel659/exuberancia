# La Exuberancia — sitio web

Sitio de **La Exuberancia** (restaurante mexicano familiar), construido con
**React + Vite + Tailwind CSS**.

El contenido del menú sale de **`public/menu-exuberancia.pdf`**
(*Menu_Exuberancia_Con_Bebidas*) y está convertido a **HTML real**: la página no depende de un
visor de PDF. El PDF se conserva en `public/` únicamente para el botón
*“Ver menú completo en PDF”*.

> El PDF **no incluye precios**. Por eso el sitio tampoco muestra ninguno: no se inventaron
> importes ni cantidades. Ver [Cómo agregar precios](#cómo-agregar-precios-cuando-existan).

---

## Cómo iniciar la página

Requiere **Node 20 o superior** (en esta computadora está instalado Node 20.20.2).

```powershell
cd c:\Users\carlo\repositorios\exuberancia
npm install      # solo la primera vez
npm run dev      # abre http://localhost:5173/exuberancia/
```

| Comando           | Qué hace                                                    |
| ----------------- | ----------------------------------------------------------- |
| `npm run dev`     | Servidor de desarrollo en `http://localhost:5173/exuberancia/` |
| `npm run build`   | Compila el sitio a `dist/`                                  |
| `npm run preview` | Sirve la versión compilada en `http://localhost:4173/exuberancia/` |

> La dirección incluye `/exuberancia/` porque el sitio se publica en un subdirectorio de GitHub
> Pages (`base` en `vite.config.js`). Es intencional: así se desarrolla en la misma ruta en la
> que se publica.

---

## Estructura del proyecto

```
exuberancia/
├─ index.html                     Documento base, fuentes y metadatos
├─ vite.config.js                 base: '/exuberancia/' para GitHub Pages
├─ tailwind.config.js             Paleta, tipografías y animaciones de marca
├─ .github/workflows/deploy.yml   Publica en GitHub Pages en cada push a main
├─ public/
│  ├─ menu-exuberancia.pdf        PDF completo (botón "Ver menú completo en PDF")
│  └─ assets/                     Imágenes extraídas del PDF y optimizadas a .webp
└─ src/
   ├─ main.jsx                    Punto de entrada
   ├─ App.jsx                     Orden de las secciones
   ├─ index.css                   Estilos base, texturas, neón y reduced-motion
   ├─ utils/recurso.js            Calcula rutas de public/ respetando la base
   ├─ data/
   │  ├─ menu.js                  TODO el menú: 6 categorías, grupos y productos
   │  ├─ horarios.js              ÚNICA fuente de días, horarios y disponibilidad
   │  └─ site.js                  Contacto, horarios, redes y navegación
   ├─ hooks/
   │  ├─ useAhora.js              Reloj de Ciudad de México (con modo de prueba)
   │  └─ useRevelar.js            Aparición al hacer scroll + sección activa
   └─ components/
      ├─ Encabezado.jsx           Header fijo + menú hamburguesa animado
      ├─ Portada.jsx              Hero con entrada animada
      ├─ MenuInteractivo.jsx      Cuadrícula de 6 categorías + panel de contenido
      ├─ AvisoDelDia.jsx          Bloque dinámico de día, hora y disponibilidad
      ├─ EstadoDisponibilidad.jsx Pastillas de estado, candado y aviso de bloqueo
      ├─ TarjetaProducto.jsx      Tarjeta de platillo reutilizable
      ├─ TarjetaPromo.jsx         Tarjeta de promoción reutilizable
      ├─ Especialidades.jsx       Bloques grandes alternando foto/texto
      ├─ Bebidas.jsx              Sección tipo pizarrón, bebidas de barril
      ├─ Nosotros.jsx             Bloque de marca
      ├─ Promociones.jsx          Promos + horarios + tiempos de preparación
      ├─ Ubicacion.jsx            Contacto, redes y espacio para el mapa
      ├─ PieDePagina.jsx          Footer
      ├─ Ornamentos.jsx           Filigranas, agaves, chispas e iconos SVG
      ├─ IconosRed.jsx            Iconos de Instagram, Facebook y TikTok
      └─ ui.jsx                   Botón, etiqueta, título de sección, Revelar
```

---

## Las seis categorías

El menú se organiza en **exactamente seis** opciones. Cada una agrupa lo que le corresponde del
PDF:

| Categoría           | Qué contiene                                                                     |
| ------------------- | -------------------------------------------------------------------------------- |
| **Desayunos**       | Chilaquiles, huevos, huevos al gusto, omelettes, hot cakes, molletes, pan francés |
| **Entradas**        | Queso asadero, molcajetes, sopas y cremas                                        |
| **Comida mexicana** | Guisados del día, enchiladas, quesadillas, antojitos, platos fuertes             |
| **Fin de semana**   | Carnitas, caldos, de la brasa, especialidades de la brasa, aguachiles, coctelería de mariscos |
| **Barbacoa**        | Por orden y para compartir                                                       |
| **Bebidas**         | Cervezas, ron, vodka, cantaritos, tequila, mezcal, brandy y vino, botellas, bebidas individuales, bebidas frías, para compartir en familia, daños o errores |

En el teléfono se ven las seis en una cuadrícula de **2 columnas × 3 filas** dentro de la primera
pantalla; en computadora, **3 columnas × 2 filas**. Al tocar una categoría disponible se abre su
contenido debajo, con un botón **“Volver a las categorías”** siempre visible (barra fija arriba
del panel) y otro al final. `Esc` también regresa.

---

## Menú dinámico por día y horario

La página detecta sola el día y la hora en **`America/Mexico_City`** (no usa el reloj ni la
región del visitante) y desbloquea o bloquea cada categoría.

**Todas las reglas viven en un solo archivo: [`src/data/horarios.js`](src/data/horarios.js).**
Ningún componente repite horarios: todos preguntan ahí. Estas reglas **tienen prioridad sobre
los horarios impresos dentro del PDF**.

| Categoría           | Días              | Horario       | Cuando no aplica                                             |
| ------------------- | ----------------- | ------------- | ------------------------------------------------------------ |
| **Desayunos**       | Lunes a viernes   | 9:00 – 12:00  | “Desayunos disponibles de 9:00 a. m. a 12:00 p. m.”          |
| **Entradas**        | Lunes a viernes   | 9:00 – 19:00  | Dentro del horario se anuncia “Disponible todo el día”       |
| **Comida mexicana** | Lunes a viernes   | 12:00 – 19:00 | Antes de las 12:00: “Disponible a partir de las 12:00 p. m.” |
| **Fin de semana**   | Sábado y domingo  | Todo el día   | Lun–vie: “Disponible sábados y domingos”                     |
| **Barbacoa**        | **Solo domingo**  | Todo el día   | “La barbacoa se sirve solamente los domingos”                |
| **Bebidas**         | Todos los días    | Todo el día   | Siempre disponible                                           |

**El sábado se desbloquea *Fin de semana* pero *Barbacoa* sigue bloqueada; el domingo se
desbloquean las dos.** Por eso Barbacoa es una categoría propia y no un grupo dentro de Fin de
semana: así pueden abrirse por separado.

### Estados visuales

| Estado                   | Color         | Cuándo aparece                             |
| ------------------------ | ------------- | ------------------------------------------ |
| **Disponible ahora**     | Turquesa      | Es su día y está dentro del horario        |
| **Disponible más tarde** | Amarillo      | Es su día pero todavía no abre             |
| **No disponible hoy**    | Gris          | No se sirve hoy, o su horario ya terminó   |
| **Solo domingos**        | Rosa mexicano | Barbacoa cualquier día que no sea domingo  |

Una categoría bloqueada **no desaparece**: sigue en la cuadrícula, se ve oscurecida y sin color,
lleva un candado y muestra su horario o el próximo día disponible (“Vuelve el domingo”). No se
puede abrir: el botón queda con `aria-disabled` y no responde al clic, pero **sí recibe el foco
del teclado** para que un lector de pantalla anuncie por qué no está disponible.

### Cómo probar otros días y horas (sin tocar el reloj de la computadora)

Agrega parámetros a la dirección. La página muestra un aviso amarillo de **modo de prueba**
mientras la simulación está activa:

```
http://localhost:5173/exuberancia/?dia=lunes&hora=10:00     → desayunos y entradas
http://localhost:5173/exuberancia/?dia=lunes&hora=12:00     → cierran desayunos, abre comida mexicana
http://localhost:5173/exuberancia/?dia=lunes&hora=19:00     → cocina cerrada, solo bebidas
http://localhost:5173/exuberancia/?dia=sabado&hora=13:00    → fin de semana SÍ, barbacoa NO
http://localhost:5173/exuberancia/?dia=domingo&hora=13:00   → fin de semana y barbacoa
http://localhost:5173/exuberancia/?ahora=2026-09-06T13:00   → fecha y hora completas
```

También acepta el día como número (`?dia=0` domingo … `?dia=6` sábado). Quitar los parámetros
devuelve la hora real.

### Para cuando existan carrito y backend

`horarios.js` exporta las funciones que hay que usar como **única** validación, tanto en el
navegador como en el servidor (no dependen del DOM):

```js
import { puedeAgregarAlCarrito, revisarDisponibilidad } from './src/data/horarios'

puedeAgregarAlCarrito({ categoria: 'barbacoa' })   // un martes
// -> { permitido: false, motivo: 'La barbacoa se sirve solamente los domingos', estado: 'soloDomingos' }

revisarDisponibilidad(articulosDelCarrito)
// -> { todoDisponible: false, noDisponibles: [ { articulo, motivo, estado } ] }
```

> Este proyecto es un sitio estático **sin backend, sin base de datos y sin carrito**. Las
> funciones de arriba ya están listas para conectarse el día que exista el backend.

---

## Cómo editar el contenido

### Cambiar, agregar o quitar productos

Todo el menú vive en **[`src/data/menu.js`](src/data/menu.js)**. No hay que tocar ningún
componente: las tarjetas se generan solas a partir de estos datos.

```js
export const menu = {
  desayunos: [                       // ← una de las seis categorías
    {
      grupo: 'Chilaquiles',          // ← encabezado del bloque
      nota: 'Texto opcional del grupo',
      productos: [
        {
          nombre: 'Chilaquiles tradicionales',
          descripcion: 'Totopos con crema, queso fresco…',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: ['Verde', 'Roja'] },
            { etiqueta: 'Incluye', tipo: 'incluye', opciones: ['100 g de pollo'] },
          ],
          imagen: IMG.chilaquiles,   // opcional, de public/assets/
          etiqueta: 'Exuberante',    // opcional: Exuberante | Especialidad | Fin de semana
        },
      ],
    },
  ],
}
```

- **Agregar un producto** → añade un objeto a `productos`.
- **Agregar un grupo** → añade `{ grupo, productos }` al arreglo de la categoría.
- **Mover un producto de categoría** → córtalo y pégalo en la otra; nada más.
- `tipo: 'incluye'` pinta los chips en amarillo (“Incluye”, “Rinde para”); sin él salen en
  turquesa (“Elige tu…”).
- `formato: 'lista'` en un grupo lo pinta como lista compacta en vez de tarjetas grandes; así se
  muestran las bebidas.

### Cambiar horarios

Todo en **[`src/data/horarios.js`](src/data/horarios.js)**, en el objeto `REGLAS`:

```js
desayunos: {
  dias: LUNES_A_VIERNES,   // o FIN_DE_SEMANA, SOLO_DOMINGO, TODOS_LOS_DIAS, o [1,3,5]
  desde: min(9),           // 9:00
  hasta: min(12),          // 12:00
  resumen: 'Lun a vie · 9:00 a 12:00',      // lo que se lee en la tarjeta
  fueraDeHorario: '…',                       // mensaje cuando ya cerró
  otroDia: 'Disponible de lunes a viernes',  // mensaje cuando hoy no toca
},
```

Cambiar `desde`/`hasta`/`dias` actualiza la cuadrícula, el aviso del día, los bloqueos y los
mensajes, todo a la vez. **Acuérdate de actualizar también `resumen`**, que es el texto que se
muestra: no se genera solo, para que puedas redactarlo como quieras.

Para volver a cerrar un grupo suelto sin cerrar toda su categoría, agrega una entrada en
`REGLAS_GRUPO` con la misma forma, usando como llave el nombre exacto del grupo en `menu.js`.

### Cómo agregar precios cuando existan

Hoy no hay ninguno porque el PDF no los trae. Cuando el restaurante los defina:

1. Agrega `precio: '$95'` a cada producto en `src/data/menu.js`.
2. En `src/components/TarjetaProducto.jsx`, dentro del `<h4>` del nombre, agrega el campo:

   ```jsx
   {producto.precio && (
     <span className="font-display text-xl text-amarillo sm:text-2xl">{producto.precio}</span>
   )}
   ```

3. Para los grupos en `formato: 'lista'` (bebidas), el mismo campo se pinta en `GrupoLista`
   dentro de `src/components/MenuInteractivo.jsx`.

### Reemplazar el PDF

Sustituye `public/menu-exuberancia.pdf` conservando el nombre. El botón *“Ver menú completo en
PDF”* apunta ahí a través de `MENU_PDF` en `menu.js`, que respeta la base del sitio.

### Datos de contacto que todavía faltan

Todos viven en **[`src/data/site.js`](src/data/site.js)**. Sustituye el texto entre corchetes y
el sitio entero se actualiza (encabezado, botones, ubicación y pie de página):
`[DIRECCIÓN]`, `[TELÉFONO]`, `[WHATSAPP_LINK]`, `[GOOGLE_MAPS_URL]`, `[INSTAGRAM_URL]`,
`[FACEBOOK_URL]`, `[TIKTOK_URL]`.

Mientras estén sin definir, los enlaces se muestran deshabilitados y marcados como “por definir”,
en lugar de llevar a una página rota.

---

## Notas sobre el contenido

- Nombres, descripciones, gramajes y opciones están transcritos **literalmente** del PDF. No se
  inventaron productos, ingredientes, cantidades ni precios.
- **Los molcajetes** (norteño, Mexa y Mexa Exuberante) quedaron en *Entradas*. En el PDF, el
  Molcajete Mexa aparece en la página de *Asada* (viernes a domingo); se movió a Entradas por
  petición expresa. Si prefieres que siga las reglas del fin de semana, mueve ese grupo a
  `menu.finde` en `menu.js`.
- **Promociones** (`#promociones`) no viene del PDF: se conserva del contenido anterior del
  sitio. Es la única sección con textos que no salen del documento.
- Las fotografías y el logotipo se extrajeron del PDF original y se convirtieron a `.webp`. Son
  de baja resolución (176–380 px de ancho); si el cliente envía las originales, basta con
  reemplazar los archivos de `public/assets/` conservando el nombre.
- Las bebidas de barril se representan con **ilustraciones neón dibujadas en SVG**
  (`Ornamentos.jsx`), porque no hay fotografías utilizables.
- El mapa es un **espacio reservado** hasta tener la URL de Google Maps.

---

## Diseño y comportamiento

- **Paleta:** negro carbón `#070909`, blanco cálido `#F5F0DF`, turquesa `#00A8A5`,
  rosa mexicano `#E50058`, amarillo `#F0B323`, naranja `#E87B3A`. Se agregó `rosaClaro`
  `#FF7BA6` solo para textos pequeños: el rosa de marca sobre carbón no alcanza contraste AA.
- **Tipografías:** Anton (títulos), Bebas Neue (subtítulos), Montserrat (texto).
- **Fondo:** textura de tela diagonal tomada del propio PDF, con resplandores de color.
- **Responsive:** móvil primero. Sin desplazamiento horizontal en ningún ancho. Las seis
  categorías caben completas en la primera pantalla del teléfono (2×3) y en 3×2 en computadora.
- **Animaciones:** entrada de la portada, aparición al hacer scroll, ornamentos flotando, entrada
  escalonada de las tarjetas al abrir una categoría y brillo en los botones. Todo respeta
  `prefers-reduced-motion: reduce`.
- **Accesibilidad:** HTML semántico, enlace “saltar al menú”, `aria-expanded`/`aria-controls` en
  las categorías, `aria-disabled` + `aria-describedby` en las bloqueadas, foco que entra al panel
  al abrir y vuelve a la tarjeta al cerrar, `Esc` para cerrar, textos alternativos y contraste AA.
