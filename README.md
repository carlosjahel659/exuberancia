# La Exuberancia — menú digital

Sitio de restaurante mexicano familiar con **React 18, Vite 7 y Tailwind CSS 3**. Se publica como archivos estáticos en GitHub Pages bajo `/exuberancia/`. No hay backend, base de datos, carrito, pagos, buscador ni cuentas.

## Iniciar y verificar

Requiere Node **20.19 o superior de la rama 20**, o **22.12 o superior**. El flujo de GitHub utiliza Node 22.

```powershell
npm ci
npm run dev
```

- Desarrollo: http://127.0.0.1:5173/exuberancia/
- `npm run build`: genera `dist/`, prerenderiza la carta y agrega SEO y CSP.
- `npm run preview`: http://127.0.0.1:4173/exuberancia/
- `npm test`: pruebas de horarios, catálogo y enlaces.
- `npm run test:browser`: prueba la compilación existente con Playwright y axe.

Para las pruebas de navegador ejecuta primero `npm run build`. En Windows se utiliza Chrome instalado; en Linux se prepara Chromium con `npx playwright install --with-deps chromium`. Las capturas y trazas quedan en `test-results/` y están excluidas de Git. La prueba inicia y detiene su propio servidor de preview.

El servidor de desarrollo escucha únicamente en la computadora local. Para probar desde un teléfono en tu red, puedes iniciar explícitamente `npm run dev -- --host 0.0.0.0` y usar la IP de la computadora con el puerto 5173. No abras ese puerto a Internet.

## Estructura y responsabilidades

| Ubicación | Responsabilidad |
|---|---|
| `src/App.jsx` | Orden de las secciones. |
| `src/main.jsx` | Hidrata el HTML generado; en desarrollo inicia React. |
| `src/components/` | Interfaz: menú, productos, promociones, marca y contacto. |
| `src/data/menu.js` | Todos los productos, descripciones, precios, fotos y seis promociones. |
| `src/data/horarios.js` | Apertura, cierre, disponibilidad y simulación. |
| `src/data/site.js` | Contacto, redes, cumpleaños y tiempos estimados. |
| `src/data/seo.js` | URL pública, metadatos y datos estructurados. |
| `src/utils/catalogo.js` | Regla única de publicación y reportes de pendientes. |
| `src/utils/precio.js` | Precios en pesos mexicanos. |
| `src/utils/enlaces.js` | Valida destinos y descarta marcadores o protocolos inseguros. |
| `src/utils/recurso.js` | Rutas compatibles con el subdirectorio de Vite. |
| `src/index.css` | Variables de color, disposición, componentes visuales y animaciones. |
| `tailwind.config.js` | Utilidades conectadas a las variables CSS y tipografías. |
| `src/entrada-servidor.jsx` y `scripts/prerender.mjs` | HTML y SEO durante la compilación, sin servidor en producción. |
| `public/` | Recursos originales, PDF y plantillas de publicación. |
| `tests/` | Pruebas de lógica e interfaz. |
| `.github/workflows/deploy.yml` | Compila y verifica antes de publicar en GitHub Pages. |

## Experiencia de consulta

Las seis categorías se conservan: Desayunos, Entradas, Comida mexicana, Fin de semana, Barbacoa y Bebidas.

**Las categorías fuera de horario vuelven a estar bloqueadas**, conforme a la última preferencia de diseño. La cuadrícula original muestra candados, colores de estado y cuándo vuelven a abrir; solamente una categoría disponible puede abrir su panel. El enlace directo `#categoria-bebidas` también respeta el bloqueo. Escape devuelve el foco a la categoría, incluso cuando un panel se cierra al terminar su horario.

El aviso de día y hora recupera su presentación anterior, con estados «Disponible ahora», «Disponible más tarde», «No disponible hoy» y «Solo domingos». Sin JavaScript se conserva una carta estática desplegable con horarios publicados; no se anuncia disponibilidad en tiempo real. El primer render es idéntico en servidor y cliente para mantener la hidratación.

Las seis categorías permanecen visibles al seleccionar una: los platillos se muestran debajo y se puede cambiar directamente entre categorías disponibles. Al tocar una tarjeta se conserva la posición de la página; con teclado o enlace directo, el foco pasa al título del contenido. El acceso horizontal a Promociones Exuberantes ocupa todo el ancho debajo de la cuadrícula y lleva a `#promociones`. La barra dentro de los platillos permite subir a elegir otra categoría sin cerrar el panel. La navegación móvil cerrada no deja enlaces invisibles en el recorrido del teclado. Los controles tienen áreas táctiles de al menos 44 px. Las animaciones respetan `prefers-reduced-motion`.

## Horarios

La apertura general vive en `APERTURAS_SERVICIO` y el cierre en `CIERRE_DIARIO`, dentro de `horarios.js`. `site.horarios` y JSON-LD se derivan de esos datos.

- Lunes a viernes: 9:00–19:30.
- Sábado y domingo: 7:00–19:30.
- Desayunos: todos los días, 9:00–12:00.
- Entradas: todos los días, 9:00–19:00.
- Comida mexicana: todos los días, 12:00–19:00.
- Fin de semana: sábado y domingo, dentro del horario general.
- Barbacoa: solo domingo, dentro del horario general.
- Bebidas: todos los días, dentro del horario general.
- Música: sábado y domingo desde las 10:00, según la regla existente.

No se amplió el desayuno a las 7:00. Las reglas generales prevalecen sobre los horarios históricos impresos en el PDF. Si cambias una regla, revisa también su texto `resumen`.

El reloj usa la fecha del dispositivo convertida a `America/Mexico_City`; no consulta un servidor de hora. Se actualiza cada 30 segundos y al volver a la pestaña. Las funciones de futura validación de carrito no constituyen un backend.

### Simular días

```text
/exuberancia/?dia=lunes&hora=10:00
/exuberancia/?dia=sabado&hora=13:00
/exuberancia/?dia=domingo&hora=19:30
/exuberancia/?ahora=2026-09-06T13:00
```

La interfaz identifica la simulación y ofrece volver a la hora real. Acepta días 0–6 o nombres, reloj 00:00–23:59 y fechas válidas. Una fecha sin zona se interpreta como hora civil de Ciudad de México. Los valores inválidos se ignoran.

## Mantener el catálogo

La carta original proviene de `public/menu-exuberancia.pdf`. Los precios y promociones incorporados posteriormente viven en `menu.js`: **ese archivo es la referencia de la interfaz actual**, no el PDF de respaldo. Sus comentarios históricos sobre ausencia de precios no describen todos los datos actuales.

El rediseño conserva el archivo del catálogo y los recursos originales. Hay 116 registros, incluidos cargos por roturas: 98 publicables, 18 ocultos, tres variantes adicionales ocultas y cuatro productos publicables con precios pendientes. Las seis promociones están aparte y tienen precio pendiente.

- Guarda `precio` como número, nunca como texto con `$`.
- Usa `variantes: [{ medida, precio }]` para presentaciones, sin duplicar productos.
- Usa `sabores` para sabores y sus ingredientes.
- `visible: false` u `oculto: true` conserva el producto sin publicarlo.
- Sin precio válido no se publica, excepto con `precioPendiente: true`.
- Para publicarlo, completa el precio y retira la marca de oculto.
- `formato: 'bebidas'` activa las tarjetas de bebida.
- `bloque` organiza bebidas sin alcohol, con alcohol y cargos por roturas.
- El build reporta productos ocultos, variantes ocultas, importes pendientes y promociones por separado.

Las promociones son informativas y no calculan pedidos ni descuentos. No se deducen precios de los productos individuales. El beneficio de cumpleaños continúa pendiente; sus requisitos sí están definidos en `site.js`.

Los molcajetes permanecen en Entradas, conforme a la decisión existente del proyecto. Barbacoa mantiene una categoría independiente del fin de semana.

## Imágenes y diseño

Se conservan los WebP, JPG, PNG y el PDF. Las nueve fotografías de `public/assets/fotos/` tienen versiones de 320 y 160 px. Las imágenes secundarias utilizan carga diferida y dimensiones explícitas; no se inventaron fotografías ni se alteraron originales.

La paleta se define en las variables `--rgb-*` de `src/index.css`; Tailwind y los SVG comparten esos colores. Se mantienen Anton, Bebas Neue y Montserrat, servidas por Google Fonts. Se recuperaron los resplandores turquesa, rosa y amarillo, la textura de tela y los botones redondeados del diseño anterior. Las tarjetas separan imagen, nombre, descripción y precio. No hay librerías de animación ni carruseles.

## SEO y seguridad

`META` y `SITIO` generan título, descripción, canónica, Open Graph, Twitter Card, robots y sitemap. El JSON-LD contiene Restaurant y Menu con precios confirmados; omite datos de contacto pendientes y no inventa coordenadas ni rango de precios. Los cargos por piezas rotas se mantienen en la interfaz, pero no se declaran como platillos en JSON-LD.

El HTML de producción incluye CSP mediante meta: scripts propios, hash del JSON-LD, fuentes Google, imágenes locales y estilos inline necesarios. No autoriza JavaScript inline ni objetos. Desarrollo no usa esa CSP porque Vite necesita recarga mediante WebSocket.

Los enlaces externos que abren otra pestaña incluyen `noopener noreferrer`. Los marcadores y destinos inseguros se deshabilitan. No hay secretos ni variables privadas requeridas; `BASE_URL` la proporciona Vite. `.env` y derivados quedan excluidos de Git.

### GitHub Pages, hosting actual

- Conserva `base: '/exuberancia/'` y la URL confirmada en `SITIO`.
- En Settings → Pages, utiliza GitHub Actions como origen.
- Verifica y activa **Enforce HTTPS** cuando GitHub lo permita.
- GitHub Pages ignora `_headers`. No se afirma que X-Frame-Options, Permissions-Policy, HSTS o la política frame-ancestors preparada estén activos.
- La CSP y Referrer-Policy mediante meta sí están incluidas en el HTML.
- El robots.txt de un subdirectorio no controla la raíz del dominio. El sitemap puede enviarse directamente a Search Console.
- No se publicó esta actualización automáticamente desde el trabajo local.

### Si se migra a Cloudflare Pages

No es el hosting configurado actualmente. El build prepara `dist/_headers` con CSP, frame-ancestors, X-Frame-Options, X-Content-Type-Options, Referrer-Policy y Permissions-Policy. La caché immutable se limita a rutas exactas de JS/CSS con hash, no a fotografías de nombre fijo. HSTS está comentado hasta verificar HTTPS y redirección. Ajusta `SITIO` y `base` al dominio y subdirectorio reales antes de publicar.

## Datos que faltan

En `src/data/site.js`: dirección, teléfono, WhatsApp, Google Maps, enlace para reseñas e Instagram. Facebook y TikTok conservan sus URLs existentes.

La sección de ubicación muestra estos pendientes con botones deshabilitados; no representa un mapa ficticio ni promete que agregar una URL incruste uno. La reseña requiere su propio enlace confirmado.

Faltan asimismo los precios marcados como pendientes, condiciones concretas de algunas promociones y el beneficio de cumpleaños. No se inventa ninguno.

## Archivos de esta actualización y comprobaciones

Archivos modificados, agrupados por responsabilidad:

- Interfaz, en `src/components/`: `AvisoDelDia.jsx`, `Bebidas.jsx`, `Cumpleanos.jsx`, `Encabezado.jsx`, `Especialidades.jsx`, `MenuInteractivo.jsx`, `MusicaEnVivo.jsx`, `Nosotros.jsx`, `Ornamentos.jsx`, `PieDePagina.jsx`, `Portada.jsx`, `PromocionesExuberantes.jsx`, `TarjetaBebida.jsx`, `TarjetaProducto.jsx`, `Ubicacion.jsx` y `ui.jsx`.
- Diseño e inicio: `src/index.css`, `tailwind.config.js`, `src/main.jsx`, `src/hooks/useAhora.js` y `src/hooks/useRevelar.js`.
- Reglas y datos del sitio: `src/data/horarios.js`, `src/data/site.js`, `src/utils/catalogo.js` y `src/utils/precio.js`.
- SEO y compilación: `index.html`, `src/data/seo.js`, `src/entrada-servidor.jsx`, `scripts/prerender.mjs`, `public/_headers`, `public/robots.txt`, `public/sitemap.xml` y `vite.config.js`.
- Mantenimiento: `package.json`, `package-lock.json`, `.github/workflows/deploy.yml`, `.gitignore` y este `README.md`.
- Archivos nuevos: `src/utils/enlaces.js`, `playwright.config.js`, `tests/horarios.test.js`, `tests/catalogo.test.js`, `tests/enlaces.test.js` y `tests/browser/menu.spec.js`.

Verificación local del 7 de septiembre de 2026: compilación correcta, 19 pruebas unitarias y 12 pruebas de navegador aprobadas. Chrome se verificó a 320, 375, 390, 768, 1024, 1440 y 1920 px, sin desbordamiento horizontal. Se comprobaron categorías persistentes, acceso a promociones debajo de la cuadrícula, bloqueos de horario, consola, variantes, seis promociones, teclado, áreas táctiles, enlaces, HTML sin JavaScript, metadatos y recursos bajo `/exuberancia/`. Axe no detectó infracciones WCAG A/AA en portada, desayunos, bebidas y barbacoa. Se inspeccionaron capturas de escritorio y móvil; no equivale a probar Safari ni dispositivos físicos.

La auditoría npm con acceso a la red reportó cero vulnerabilidades después de actualizar Vite. Tras los ajustes de colores y navegación, la compilación genera aproximadamente 34.40 kB de CSS y 229.54 kB de JavaScript sin comprimir. Estos tamaños no son una medición de tiempo de carga en red móvil. `src/data/menu.js`, las imágenes y el PDF no tienen cambios.
