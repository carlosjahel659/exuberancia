// -----------------------------------------------------------------------------
// Menú de La Exuberancia.
//
// FUENTE ÚNICA: public/menu-exuberancia.pdf ("Menu_Exuberancia_Con_Bebidas").
// Nombres, descripciones, gramajes y opciones están transcritos literalmente de
// ese documento. El PDF no trae precios, así que aquí tampoco hay ninguno: no se
// inventan cantidades ni importes.
//
// Cómo editar (ver README):
//   · Cambiar un producto  -> edita su objeto dentro de `menu`.
//   · Agregar un grupo     -> agrega { grupo, productos } al arreglo de la categoría.
//   · Cambiar horarios     -> src/data/horarios.js (aquí no viven las reglas).
// -----------------------------------------------------------------------------

import { recurso } from '../utils/recurso'

/** PDF completo, servido desde public/. Respeta la base del sitio. */
export const MENU_PDF = recurso('menu-exuberancia.pdf')

export const IMG = {
  chilaquiles: recurso('assets/chilaquiles.webp'),
  hotCakes: recurso('assets/hot-cakes.webp'),
  quesadillas: recurso('assets/quesadillas.webp'),
  enchiladas: recurso('assets/enchiladas.webp'),
  barbacoa: recurso('assets/barbacoa.webp'),
  cazuela: recurso('assets/cazuela-barro.webp'),
  logo: recurso('assets/logo-exuberancia.webp'),
  wordmark: recurso('assets/logo-wordmark.webp'),
}

// -----------------------------------------------------------------------------
// Las seis categorías del menú. El orden es el que se ve en la cuadrícula.
// El icono y las reglas de horario viven en src/data/horarios.js.
// -----------------------------------------------------------------------------
export const categorias = [
  {
    id: 'desayunos',
    etiqueta: 'Desayunos',
    kicker: 'Desayunos',
    titulo: 'Exuberantes',
    color: 'amarillo',
    descripcion: 'Chilaquiles, huevos, omelettes y pan dulce preparados al momento.',
  },
  {
    id: 'entradas',
    etiqueta: 'Entradas',
    kicker: 'Para',
    titulo: 'Compartir',
    color: 'naranja',
    descripcion: 'Quesos asaderos, molcajetes, sopas y cremas de la casa.',
  },
  {
    id: 'mexicana',
    etiqueta: 'Comida mexicana',
    kicker: 'Comida',
    titulo: 'Mexicana',
    color: 'turquesa',
    descripcion: 'Guisados del día, enchiladas, quesadillas, antojitos y platos fuertes.',
  },
  {
    id: 'finde',
    etiqueta: 'Fin de semana',
    kicker: 'Fin de',
    titulo: 'Semana',
    color: 'rosa',
    descripcion: 'Carnitas, caldos, cortes a la brasa, aguachiles y coctelería de mariscos.',
  },
  {
    id: 'barbacoa',
    etiqueta: 'Barbacoa',
    kicker: 'Solo',
    titulo: 'Domingos',
    color: 'naranja',
    descripcion: 'Servicio especial de domingo con consomé y tortillas hechas a mano.',
  },
  {
    id: 'bebidas',
    etiqueta: 'Bebidas',
    kicker: 'Bebidas',
    titulo: 'Exuberantes',
    color: 'turquesa',
    descripcion: 'Cervezas, coctelería, botellas y bebidas sin alcohol, todos los días.',
  },
]

// -----------------------------------------------------------------------------
// Productos.
//
// Cada categoría es un arreglo de grupos:
//   { grupo, nota?, formato?, color?, sinAlcohol?, productos: [...] }
//
// Cada producto acepta:
//   nombre        obligatorio
//   descripcion   opcional
//   detalles      [{ etiqueta, opciones, tipo? }]  tipo: 'elige' (predeterminado) | 'incluye'
//   imagen        una de IMG
//   etiqueta      'Exuberante' | 'Especialidad' | 'Fin de semana' | 'Sin alcohol'
//
// `formato: 'lista'` pinta el grupo como lista compacta (bebidas) en vez de
// tarjetas grandes con fotografía.
// -----------------------------------------------------------------------------

const PROTEINAS = ['Pollo', 'Chorizo', 'Chistorra', 'Arrachera', 'Costilla']
const SALSAS = ['Verde', 'Roja']
const CORTES_CARNITAS = ['Chamorro', 'Cuerito', 'Costilla', 'Surtida']
const BRASA = ['Arrachera', 'Pollo', 'Chorizo', 'Chistorra', 'Costilla']

export const menu = {
  // ---------------------------------------------------------------- Desayunos
  desayunos: [
    {
      grupo: 'Chilaquiles',
      productos: [
        {
          nombre: 'Chilaquiles tradicionales',
          descripcion: 'Totopos con crema, queso fresco, cebolla morada y frijoles refritos.',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: SALSAS },
            { etiqueta: 'Elige tu proteína (200 g)', opciones: [...PROTEINAS, 'Huevo'] },
          ],
          imagen: IMG.chilaquiles,
        },
        {
          nombre: 'Chilaquiles suizos',
          descripcion:
            'Totopos con preparación cremosa, queso gratinado, crema, queso fresco, cebolla y frijoles refritos.',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: SALSAS },
            { etiqueta: 'Elige tu proteína (200 g)', opciones: [...PROTEINAS, 'Huevo'] },
          ],
        },
        {
          nombre: 'Chilaquiles Exuberantes',
          descripcion:
            'Totopos con crema, queso fresco y cebolla morada. Incluyen 500 g de proteína en total.',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: SALSAS },
            {
              etiqueta: 'Incluye',
              tipo: 'incluye',
              opciones: [
                '100 g de pollo',
                '100 g de chorizo',
                '100 g de chistorra',
                '100 g de arrachera',
                '100 g de costilla',
              ],
            },
          ],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Huevos',
      productos: [
        {
          nombre: 'Huevos rancheros',
          descripcion: 'Dos huevos estrellados sobre tortilla, salsa ranchera y frijoles refritos.',
        },
        {
          nombre: 'Huevos divorciados',
          descripcion:
            'Dos huevos estrellados con salsa verde y roja, aguacate, cebolla, frijoles refritos y totopos.',
        },
      ],
    },
    {
      grupo: 'Huevos al gusto',
      productos: [
        {
          nombre: 'Huevos revueltos al gusto',
          descripcion: 'Tres huevos con frijoles refritos y totopos.',
          detalles: [
            {
              etiqueta: 'Elige tu preparación',
              opciones: ['A la mexicana', 'Jamón', 'Salchicha', 'Tocino', 'Chistorra'],
            },
          ],
        },
      ],
    },
    {
      grupo: 'Omelettes',
      productos: [
        {
          nombre: 'Omelette al gusto',
          descripcion: 'Preparado con tres huevos, frijoles refritos, totopos y queso fresco.',
          detalles: [
            {
              etiqueta: 'Elige tu relleno',
              opciones: ['Jamón', 'Salchicha', 'Tocino', 'Chistorra'],
            },
          ],
        },
        {
          nombre: 'Omelette Exuberante',
          descripcion: 'Preparado con cuatro huevos y rajas de chile poblano.',
          detalles: [
            {
              etiqueta: 'Incluye',
              tipo: 'incluye',
              opciones: [
                '30 g de arrachera',
                '30 g de tocino',
                '30 g de chorizo',
                '30 g de chistorra',
              ],
            },
          ],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Hot cakes',
      productos: [
        {
          nombre: 'Hot cakes tradicionales',
          descripcion:
            'Tres piezas con un peso total de 150 g, miel, 100 g de plátano y azúcar glass.',
          imagen: IMG.hotCakes,
        },
        {
          nombre: 'Hot cakes Exuberantes',
          descripcion:
            'Tres piezas con un peso total de 150 g, miel, 150 g de frutos rojos y azúcar glass.',
          etiqueta: 'Exuberante',
        },
        {
          nombre: 'Hot cakes con tocino crujiente',
          descripcion:
            'Tres piezas con un peso total de 150 g, miel, 100 g de plátano, tocino crujiente y azúcar glass.',
        },
      ],
    },
    {
      grupo: 'Molletes',
      productos: [
        {
          nombre: 'Molletes clásicos',
          descripcion:
            'Tres piezas preparadas con bolillo normal, frijoles, queso gratinado y pico de gallo.',
        },
        {
          nombre: 'Molletes con proteína',
          descripcion: 'Tres piezas de bolillo normal con frijoles y queso gratinado.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: PROTEINAS }],
        },
      ],
    },
    {
      grupo: 'Pan francés',
      productos: [
        {
          nombre: 'Pan francés',
          descripcion:
            'Dos rebanadas de pan de caja cortadas a 3 cm, preparadas con vainilla y azúcar glass.',
        },
        {
          nombre: 'Pan francés Exuberante',
          descripcion:
            'Cuatro rebanadas de pan de caja cortadas a 3 cm, con frutos rojos, plátano, vainilla y azúcar glass.',
          etiqueta: 'Exuberante',
        },
      ],
    },
  ],

  // ----------------------------------------------------------------- Entradas
  entradas: [
    {
      grupo: 'Queso asadero',
      productos: [
        {
          nombre: 'Queso asadero',
          descripcion: 'Queso fundido con una ligera costra dorada en la parte superior.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: PROTEINAS }],
          imagen: IMG.quesadillas,
        },
        {
          nombre: 'Queso asadero Exuberante',
          descripcion: 'Queso fundido con una ligera costra dorada en la parte superior.',
          detalles: [{ etiqueta: 'Incluye', tipo: 'incluye', opciones: PROTEINAS }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Molcajetes',
      productos: [
        {
          nombre: 'Molcajete norteño',
          descripcion: 'Guacamole, chicharrón norteño, cebollas encurtidas y 300 g de tortillas.',
          imagen: IMG.cazuela,
        },
        {
          nombre: 'Molcajete Mexa',
          descripcion:
            'Nopales, cebolla cambray, arrachera, pollo, chistorra y 200 g de tortillas.',
          detalles: [{ etiqueta: 'Rinde para', tipo: 'incluye', opciones: ['2 personas'] }],
        },
        {
          nombre: 'Molcajete Mexa Exuberante',
          descripcion:
            'Nopales, cebolla cambray, arrachera, pollo, costilla, chistorra, tres quesadillas de chorizo y 500 g de tortillas.',
          detalles: [{ etiqueta: 'Rinde para', tipo: 'incluye', opciones: ['4 personas'] }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Sopas y cremas',
      nota: 'Las cuatro preparaciones están disponibles diariamente.',
      productos: [
        { nombre: 'Sopa azteca', descripcion: 'Con el sabor tradicional de la casa.' },
        { nombre: 'Sopa de médula', descripcion: 'Preparación reconfortante de sabor profundo.' },
        { nombre: 'Crema poblana', descripcion: 'Cremosa y ligeramente ahumada.' },
        { nombre: 'Crema de zanahoria', descripcion: 'Suave, cálida y equilibrada.' },
      ],
    },
  ],

  // ---------------------------------------------------------- Comida mexicana
  mexicana: [
    {
      grupo: 'Guisados del día',
      productos: [
        {
          nombre: 'Guisados del día',
          descripcion:
            'Dos preparaciones diferentes cada día. Consulta disponibilidad. Se sirven sin guarnición.',
          etiqueta: 'Especialidad',
        },
      ],
    },
    {
      grupo: 'Enchiladas',
      productos: [
        {
          nombre: 'Enchiladas tradicionales',
          descripcion: 'Cuatro piezas con crema, queso fresco, cebolla y cilantro.',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: SALSAS },
            { etiqueta: 'Elige tu relleno', opciones: PROTEINAS },
          ],
          imagen: IMG.enchiladas,
        },
        {
          nombre: 'Enchiladas suizas',
          descripcion: 'Cuatro piezas con preparación cremosa y queso gratinado.',
          detalles: [
            { etiqueta: 'Elige tu salsa', opciones: SALSAS },
            { etiqueta: 'Elige tu relleno', opciones: PROTEINAS },
          ],
        },
        {
          nombre: 'Enchiladas Exuberantes',
          descripcion: 'Cuatro piezas con crema, queso fresco, cebolla y cilantro.',
          detalles: [{ etiqueta: 'Incluye', tipo: 'incluye', opciones: PROTEINAS }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Quesadillas',
      productos: [
        {
          nombre: 'Quesadillas',
          descripcion: 'Tres piezas con queso, acompañadas con frijoles y salsa.',
          detalles: [
            { etiqueta: 'Elige tu relleno', opciones: ['Chorizo', 'Chistorra', 'Tinga de pollo'] },
          ],
          imagen: IMG.quesadillas,
        },
        {
          nombre: 'Quesadillas Exuberantes',
          descripcion: 'Tres piezas con queso, frijoles y salsa.',
          detalles: [{ etiqueta: 'Incluye', tipo: 'incluye', opciones: PROTEINAS }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Antojitos',
      productos: [
        {
          nombre: 'Tacos dorados de pollo',
          descripcion: 'Cinco piezas doradas al momento, sin guarnición.',
        },
        {
          nombre: 'Tostadas de tinga de pollo',
          descripcion: 'Dos piezas crujientes con tinga de pollo, sin guarnición.',
        },
        {
          nombre: 'Pastel azteca',
          descripcion:
            'Platillo disponible diariamente, preparado con tortilla, salsa, pollo y queso gratinado.',
        },
      ],
    },
    {
      grupo: 'Platos fuertes',
      productos: [
        {
          nombre: 'Pollo cordon bleu',
          descripcion: 'Pechuga rellena y empanizada, disponible diariamente.',
        },
        {
          nombre: 'Papa rellena',
          descripcion: 'Papa al horno, rellena y gratinada con queso.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: PROTEINAS }],
          etiqueta: 'Especialidad',
        },
      ],
    },
  ],

  // ------------------------------------------------------------ Fin de semana
  finde: [
    {
      grupo: 'Carnitas',
      nota: 'En las órdenes por peso se pueden repetir dos tortillas por persona.',
      productos: [
        {
          nombre: 'Taco de carnitas',
          descripcion: 'Servido en tortilla hecha a mano.',
          detalles: [{ etiqueta: 'Elige tu corte', opciones: CORTES_CARNITAS }],
          imagen: IMG.cazuela,
        },
        {
          nombre: 'Torta de carnitas',
          descripcion: 'Preparada en bolillo normal.',
          detalles: [{ etiqueta: 'Elige tu corte', opciones: CORTES_CARNITAS }],
        },
        {
          nombre: 'Medio kilo de carnitas',
          descripcion: 'Acompañado con 200 g de tortillas hechas a mano.',
          detalles: [{ etiqueta: 'Elige tu corte', opciones: CORTES_CARNITAS }],
        },
        {
          nombre: 'Kilo de carnitas',
          descripcion: 'Acompañado con 500 g de tortillas hechas a mano.',
          detalles: [{ etiqueta: 'Elige tu corte', opciones: CORTES_CARNITAS }],
        },
      ],
    },
    {
      grupo: 'Caldos',
      productos: [
        {
          nombre: 'Pozole rojo norteño',
          descripcion: 'Porción de 20 oz con lechuga, rábano, cebolla y tostadas.',
          etiqueta: 'Fin de semana',
        },
        {
          nombre: 'Pancita tradicional',
          descripcion: 'Porción de 20 oz con sus acompañamientos.',
        },
        {
          nombre: 'Pancita Exuberante',
          descripcion: 'Porción de 40 oz con sus acompañamientos.',
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'De la brasa',
      productos: [
        {
          nombre: 'Taco tradicional a la brasa',
          descripcion: 'Dos tortillas hechas a mano con 170 g de proteína.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: BRASA }],
        },
        {
          nombre: 'Taco Exuberante a la brasa',
          descripcion: 'Cuatro tortillas empalmadas a lo largo con 350 g de proteína.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: BRASA }],
          etiqueta: 'Exuberante',
        },
        {
          nombre: 'Tostadas Exuberantes',
          descripcion:
            'Dos piezas con guacamole, queso fundido y salsa martajada; sin guarnición adicional.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: BRASA }],
          etiqueta: 'Exuberante',
        },
        {
          nombre: 'Burrito Exuberante',
          descripcion:
            'Tortilla de harina con frijoles, mezcla de quesos, lechuga, salsa y guacamole.',
          detalles: [{ etiqueta: 'Elige tu proteína', opciones: BRASA }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Especialidades de la brasa',
      productos: [
        {
          nombre: 'Arrachera tampiqueña',
          descripcion:
            'Arrachera con papitas y rajas, frijoles, queso fresco, totopos, salsa y guacamole.',
          etiqueta: 'Especialidad',
        },
      ],
    },
    {
      grupo: 'Aguachiles',
      productos: [
        {
          nombre: 'Aguachile de camarón',
          descripcion: 'Preparado con 150 g de camarón.',
          detalles: [{ etiqueta: 'Elige tu sabor', opciones: ['Tradicional', 'Rojo', 'Negro'] }],
        },
        {
          nombre: 'Aguachile Exuberante',
          descripcion: 'Preparado con 300 g de camarón y 50 g de pulpo.',
          detalles: [{ etiqueta: 'Elige tu sabor', opciones: ['Tradicional', 'Rojo', 'Negro'] }],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Coctelería de mariscos',
      productos: [
        {
          nombre: 'Cóctel de camarón',
          descripcion: 'Clásico, fresco y servido con los acompañamientos de la casa.',
        },
        {
          nombre: 'Vuelve a la vida',
          descripcion: 'Mezcla de mariscos preparada con la receta de la casa.',
        },
      ],
    },
  ],

  // ----------------------------------------------------------------- Barbacoa
  barbacoa: [
    {
      grupo: 'Por orden',
      productos: [
        {
          nombre: 'Taco de barbacoa',
          descripcion: 'Servido en tortilla hecha a mano.',
          imagen: IMG.barbacoa,
        },
        {
          nombre: 'Orden de barbacoa',
          descripcion: 'Tres tacos de barbacoa acompañados con consomé.',
          etiqueta: 'Especialidad',
        },
        {
          nombre: 'Orden de flautas',
          descripcion: 'Tres flautas de barbacoa acompañadas con consomé.',
        },
        { nombre: 'Torta de barbacoa', descripcion: 'Bolillo normal relleno de barbacoa.' },
      ],
    },
    {
      grupo: 'Para compartir',
      productos: [
        {
          nombre: 'Medio kilo de barbacoa',
          descripcion: 'Acompañado con tortillas hechas a mano.',
        },
        { nombre: 'Kilo de barbacoa', descripcion: 'Acompañado con tortillas hechas a mano.' },
        { nombre: 'Consomé', descripcion: 'Disponible también por separado.' },
      ],
    },
  ],

  // ------------------------------------------------------------------ Bebidas
  bebidas: [
    {
      grupo: 'Cervezas',
      formato: 'lista',
      color: 'amarillo',
      productos: [
        { nombre: 'Cerveza de barril 1 litro' },
        { nombre: 'Cerveza de barril 1/2 litro' },
        { nombre: 'Cerveza mega 1 litro', descripcion: 'Corona, Victoria o Modelo Especial.' },
        { nombre: 'Michelada de sabor de barril', descripcion: 'Mango, tamarindo o cubana.' },
        { nombre: 'Michelada mega', descripcion: 'Cubana, mango o tamarindo.' },
        {
          nombre: 'Marina de barril 1 litro',
          descripcion: 'Camarón pacotilla, Clamato, cubano de la casa, salsas negras y ostiones.',
        },
        { nombre: 'Marina de barril 1/2 litro' },
        {
          nombre: 'Marina mega 1 litro',
          descripcion: 'Camarón pacotilla, Clamato, cubano de la casa, salsas negras y ostiones.',
        },
        { nombre: 'Cerillito', descripcion: 'Lata de cerveza.' },
        { nombre: 'Venenosa', descripcion: 'Corona o Victoria.' },
        { nombre: 'Cerveza 355 ml', descripcion: 'Indio, Tecate o XX Lager.' },
        { nombre: 'Tarro extra con limón y sal' },
        { nombre: 'Tarro extra cubano' },
      ],
    },
    {
      grupo: 'Cerveza para compartir',
      formato: 'lista',
      color: 'amarillo',
      productos: [
        { nombre: 'Cubetazo de cerveza · 10 piezas' },
        { nombre: 'Cubetazo de cerveza · 6 piezas' },
      ],
    },
    {
      grupo: 'Ron',
      formato: 'lista',
      color: 'rosa',
      productos: [
        { nombre: 'Mojito clásico' },
        { nombre: 'Mojito de frutos rojos' },
        { nombre: 'Mojito de pepino', descripcion: 'Azúcar, hierbabuena, limón y pepino.' },
        {
          nombre: 'Mojito Blue Berry',
          descripcion: 'Moras, hierbabuena, ron azul, azúcar y limón.',
        },
        {
          nombre: 'Mojito 1 litro',
          descripcion: 'Tradicional, frutos rojos, mango, fresa o pepino.',
        },
        { nombre: 'Mojito 500 ml', descripcion: 'Tradicional, frutos rojos, pepino o fresa.' },
        {
          nombre: 'Piña colada 500 ml',
          descripcion: 'Ron, preparado de piña colada y jugo de piña.',
        },
        {
          nombre: 'Piña colada 1 litro',
          descripcion: 'Ron, preparado de piña colada y jugo de piña.',
        },
        {
          nombre: 'Coco Sunset',
          descripcion: 'Ron, jugo de naranja, jugo de piña, Kahlúa y granadina.',
        },
      ],
    },
    {
      grupo: 'Vodka',
      formato: 'lista',
      color: 'turquesa',
      productos: [
        { nombre: 'Exuberancia Rosa', descripcion: 'Vodka, piña, granadina y leche condensada.' },
        { nombre: 'Blue 1 litro', descripcion: 'Volt, lima-limón, mora y vodka.' },
        { nombre: 'Manguito', descripcion: 'Vodka, jugo de mango y Sprite.' },
        { nombre: 'Nieve de Hielo', descripcion: 'Soda, vodka, limón y leche condensada.' },
      ],
    },
    {
      grupo: 'Cantaritos',
      formato: 'lista',
      color: 'naranja',
      productos: [
        { nombre: 'Cantaritos', descripcion: 'Toronja, naranja, limón, sal, tequila y refresco.' },
        { nombre: 'Cantarito 1 litro', descripcion: 'Supremo, José Cuervo o Centenario.' },
        { nombre: 'Cantarito 5 litros', descripcion: 'Supremo, José Cuervo o Centenario.' },
        { nombre: 'Cantarito 10 litros', descripcion: 'Supremo, José Cuervo o Centenario.' },
      ],
    },
    {
      grupo: 'Tequila',
      formato: 'lista',
      color: 'amarillo',
      productos: [
        { nombre: 'Palomazo' },
        { nombre: 'Paloma 500 ml', descripcion: 'Supremo, José Cuervo o Centenario.' },
        { nombre: 'Charro Negro 500 ml', descripcion: 'Coca-Cola, limón, sal y tequila.' },
        { nombre: 'Margarita clásica' },
        { nombre: 'Margarita de mango' },
        { nombre: 'Margarita de pepino' },
        { nombre: 'Margarita de maracuyá' },
        { nombre: 'Margarita de jamaica' },
        { nombre: 'Ojo de Tigre', descripcion: 'Cerveza con tequila.' },
        { nombre: 'Batanfa', descripcion: 'Tequila con Coca-Cola y escarchado de sal.' },
      ],
    },
    {
      grupo: 'Mezcal',
      formato: 'lista',
      color: 'naranja',
      productos: [
        { nombre: 'Mezcalita de piña' },
        { nombre: 'Mezcalita de jamaica' },
        { nombre: 'Mezcalita de pepino' },
        { nombre: 'Mezcalita de fresa' },
        { nombre: 'Mezcalita de maracuyá' },
        { nombre: 'Mezcalita de frutos rojos' },
      ],
    },
    {
      grupo: 'Brandy y vino',
      formato: 'lista',
      color: 'rosa',
      productos: [
        { nombre: 'Paraíso de Noche 500 ml', descripcion: 'Brandy, refresco de cola y limón.' },
        { nombre: 'Paraíso de Día 500 ml', descripcion: 'Brandy, agua mineral y limón.' },
        { nombre: 'Clericot 500 ml' },
        { nombre: 'Clericot 1.8 litros' },
      ],
    },
    {
      grupo: 'Botellas · con servicio y show',
      formato: 'lista',
      color: 'amarillo',
      nota: 'Todas incluyen servicio de refresco, hielos y limones.',
      productos: [
        { nombre: 'Buchanans' },
        { nombre: 'Don Julio 70' },
        { nombre: 'Maestro Dobel' },
        { nombre: 'Red Label' },
        { nombre: 'José Cuervo Especial' },
        { nombre: 'Torres 10' },
        { nombre: 'Centenario' },
        { nombre: 'Bacardí' },
      ],
    },
    {
      grupo: 'Bebidas individuales',
      formato: 'lista',
      color: 'turquesa',
      sinAlcohol: true,
      productos: [
        { nombre: 'Café de olla 250 ml' },
        { nombre: 'Coca-Cola 500 ml' },
        { nombre: 'Refresco de sabor' },
        { nombre: 'Agua de sabor 1 litro' },
        { nombre: 'Agua de sabor 1/2 litro' },
        { nombre: 'Naranjada 500 ml' },
        { nombre: 'Limonada 500 ml' },
        { nombre: 'Limonada de frutos rojos 500 ml' },
        { nombre: 'Tehuacán preparado 500 ml' },
        { nombre: 'Sangría preparada 500 ml' },
      ],
    },
    {
      grupo: 'Bebidas frías',
      formato: 'lista',
      color: 'turquesa',
      sinAlcohol: true,
      productos: [
        { nombre: 'Clamato preparado 500 ml' },
        { nombre: 'Frappé de frutos rojos 500 ml' },
        { nombre: 'Frappé Mangoneada 500 ml' },
        { nombre: 'Ice de mora 500 ml' },
        { nombre: 'Ice de cereza 500 ml' },
      ],
    },
    {
      grupo: 'Para compartir en familia',
      formato: 'lista',
      color: 'turquesa',
      sinAlcohol: true,
      productos: [
        { nombre: 'Coca-Cola familiar 3 litros' },
        { nombre: 'Jarra de limonada 1.8 litros' },
        { nombre: 'Jarra de limonada de frutos rojos 1.8 litros' },
        { nombre: 'Jarra de agua de sabor natural 1.8 litros' },
      ],
    },
    {
      grupo: 'Daños o errores',
      formato: 'lista',
      color: 'rosa',
      nota: 'Cargos que aplican cuando se rompe una pieza del servicio.',
      productos: [{ nombre: 'Tarro roto' }, { nombre: 'Copa rota' }, { nombre: 'Plato roto' }],
    },
  ],
}

// -----------------------------------------------------------------------------
// Bebidas de barril destacadas en la sección #bebidas.
// Subconjunto de menu.bebidas, con los mismos nombres y textos del PDF.
// -----------------------------------------------------------------------------
export const bebidasBarril = [
  {
    nombre: 'Cerveza de barril',
    descripcion: 'Servida al momento, bien fría.',
    medidas: ['1 litro', '1/2 litro', 'Mega 1 litro'],
    ilustracion: 'tarro',
    color: 'amarillo',
  },
  {
    nombre: 'Michelada de sabor',
    descripcion: 'Mango, tamarindo o cubana.',
    medidas: ['De barril', 'Mega'],
    ilustracion: 'michelada',
    color: 'rosa',
  },
  {
    nombre: 'Marina de barril',
    descripcion: 'Camarón pacotilla, Clamato, cubano de la casa, salsas negras y ostiones.',
    medidas: ['1 litro', '1/2 litro', 'Mega 1 litro'],
    ilustracion: 'marina',
    color: 'turquesa',
    destacado: true,
  },
  {
    nombre: 'Cantaritos',
    descripcion: 'Toronja, naranja, limón, sal, tequila y refresco.',
    medidas: ['Individual', '1 litro', '5 litros', '10 litros'],
    ilustracion: 'botella',
    color: 'naranja',
  },
]

// -----------------------------------------------------------------------------
// Especialidades destacadas (sección #especialidades).
// Textos tomados del PDF; sin precios porque el documento no los incluye.
// -----------------------------------------------------------------------------
export const especialidades = [
  {
    kicker: 'Solo los domingos',
    nombre: 'Orden de barbacoa',
    texto:
      'Tres tacos de barbacoa acompañados con consomé y servidos en tortilla hecha a mano. También por taco, torta, flautas, medio kilo y kilo.',
    etiqueta: 'Especialidad',
    imagen: IMG.barbacoa,
    color: 'rosa',
  },
  {
    kicker: 'Para empezar el día',
    nombre: 'Chilaquiles Exuberantes',
    texto:
      'Totopos con crema, queso fresco y cebolla morada, con 500 g de proteína en total: pollo, chorizo, chistorra, arrachera y costilla. Elige salsa verde o roja.',
    etiqueta: 'Exuberante',
    imagen: IMG.chilaquiles,
    color: 'turquesa',
  },
  {
    kicker: 'Comida mexicana',
    nombre: 'Enchiladas Exuberantes',
    texto:
      'Cuatro piezas con crema, queso fresco, cebolla y cilantro. Incluyen pollo, chorizo, chistorra, arrachera y costilla.',
    etiqueta: 'Exuberante',
    imagen: IMG.enchiladas,
    color: 'amarillo',
  },
]

// -----------------------------------------------------------------------------
// Promociones e información de servicio (sección #promociones).
// No provienen del PDF del menú: se conservan del contenido anterior del sitio.
// -----------------------------------------------------------------------------
export const promociones = [
  {
    nombre: 'Cumpleañero',
    texto: 'Celebra tu cumpleaños con nosotros y recibe una bebida, pastel y un taco de cortesía.',
    restricciones: true,
    icono: 'pastel',
    color: 'rosa',
    destacado: true,
  },
  {
    nombre: 'Desayuno Ejecutivo',
    texto: 'Chilaquiles tradicionales + café de olla + agua de sabor.',
    detalle: 'Lunes a viernes.',
    restricciones: true,
    icono: 'cafe',
    color: 'amarillo',
  },
  {
    nombre: 'Promo Conbeber',
    texto: 'Dos cantaritos + dos aguachiles.',
    restricciones: true,
    icono: 'cantarito',
    color: 'turquesa',
  },
  {
    nombre: 'Promo Familiar',
    texto: 'Un kilo de barbacoa + un cantarito de 1 litro.',
    restricciones: true,
    icono: 'olla',
    color: 'naranja',
  },
  {
    nombre: 'Música en vivo',
    texto: 'Viernes, sábado y domingo a partir de las 12:00 p.m.',
    icono: 'musica',
    color: 'rosa',
  },
]
