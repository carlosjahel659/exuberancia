// -----------------------------------------------------------------------------
// Menú de La Exuberancia.
// Nombres, descripciones y precios transcritos del PDF "MENU EXUBERANCIA".
// La sección de bebidas de barril toma sus precios del cartel "Menú de bebidas".
// Solo se corrigieron faltas de ortografía evidentes (ver README).
// -----------------------------------------------------------------------------

export const IMG = {
  chilaquiles: '/assets/chilaquiles.webp',
  hotCakes: '/assets/hot-cakes.webp',
  quesadillas: '/assets/quesadillas.webp',
  enchiladas: '/assets/enchiladas.webp',
  barbacoa: '/assets/barbacoa.webp',
  cazuela: '/assets/cazuela-barro.webp',
  logo: '/assets/logo-exuberancia.webp',
  wordmark: '/assets/logo-wordmark.webp',
}

export const categorias = [
  { id: 'desayunos', etiqueta: 'Desayunos', kicker: 'Desayunos', titulo: 'Exuberantes', color: 'amarillo' },
  { id: 'entradas', etiqueta: 'Entradas', kicker: 'Entradas', titulo: 'Exuberantes', color: 'naranja' },
  { id: 'mexicana', etiqueta: 'Comida mexicana', kicker: 'Comida', titulo: 'Mexicana', color: 'turquesa' },
  { id: 'finde', etiqueta: 'Fin de semana', kicker: 'Fin de', titulo: 'Semana', color: 'rosa' },
  { id: 'bebidas', etiqueta: 'Bebidas', kicker: 'Bebidas', titulo: 'Exuberantes', color: 'turquesa' },
  { id: 'promos', etiqueta: 'Promociones', kicker: 'Promos', titulo: 'Exuberantes', color: 'rosa' },
]

export const menu = {
  desayunos: [
    {
      grupo: 'Chilaquiles',
      productos: [
        {
          nombre: 'Chilaquiles Tradicionales',
          precio: '$8.50',
          descripcion:
            'Totopos bañados en salsa verde o roja, acompañados de crema, queso fresco, cebolla morada y frijoles refritos.',
          opciones: ['Huevo', 'Pollo', 'Arrachera', 'Costilla de res'],
          imagen: IMG.chilaquiles,
          etiqueta: 'Especialidad',
        },
        {
          nombre: 'Chilaquiles Exuberantes',
          precio: '$7.75',
          descripcion:
            'Totopos bañados en salsa verde o roja, acompañados de crema, queso fresco, cebolla morada y frijoles refritos. Servidos con costilla de res, arrachera, chorizo y huevo.',
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Huevos',
      productos: [
        {
          nombre: 'Huevos Rancheros',
          precio: '$9.50',
          descripcion:
            'Dos huevos estrellados montados sobre tortilla dorada, bañados en salsa ranchera y acompañados de frijoles refritos.',
        },
        {
          nombre: 'Huevos Divorciados',
          precio: '$8.75',
          descripcion:
            'Dos huevos estrellados bañados, uno en salsa verde y otro en salsa roja de la casa. Acompañados de frijoles refritos, aguacate, cebolla morada y totopos.',
        },
        {
          nombre: 'Huevos al gusto',
          precio: '$10.25',
          descripcion:
            'Acompañados de frijoles refritos, queso fresco, totopos y tortillas hechas a mano.',
          opciones: ['A la Mexicana', 'Con salchicha', 'Con jamón', 'Con tocino'],
        },
      ],
    },
    {
      grupo: 'Omelettes',
      productos: [
        {
          nombre: 'Omelette Hawaiano',
          precio: '$8.25',
          descripcion: 'Relleno de jamón, queso y piña.',
        },
        {
          nombre: 'Omelette Suizo',
          precio: '$9.25',
          descripcion: 'Relleno de champiñones, queso, espinaca y cebolla caramelizada.',
        },
        {
          nombre: 'Omelette Exuberante',
          precio: '$7.50',
          descripcion:
            'Una combinación irresistible de queso fundido, jugosa arrachera, tocino crujiente, chorizo y chile poblano en fajitas.',
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Hot Cakes',
      productos: [
        {
          nombre: 'Hot Cakes Tradicionales',
          precio: '$7.00',
          descripcion: 'Tres piezas acompañadas de plátano y azúcar glas.',
          imagen: IMG.hotCakes,
        },
        {
          nombre: 'Hot Cakes Exuberantes',
          precio: '$4.50',
          descripcion: 'Tres piezas acompañadas de frutos rojos, miel y azúcar glas.',
          etiqueta: 'Exuberante',
        },
      ],
    },
  ],

  entradas: [
    {
      grupo: 'Quesos fundidos',
      productos: [
        {
          nombre: 'Queso fundido',
          precio: '$8.50',
          descripcion: 'Queso derretido servido bien caliente, listo para taquear.',
          opciones: ['Con longaniza', 'Con arrachera', 'Con champiñones'],
        },
        {
          nombre: 'Queso fundido Exuberante',
          precio: '$7.75',
          descripcion: 'Queso fundido acompañado de arrachera, chorizo y champiñones.',
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Quesadillas',
      productos: [
        {
          nombre: 'Quesadillas Tradicionales',
          precio: '$9.50',
          descripcion:
            'Tres quesadillas acompañadas de queso derretible y frijoles refritos, acompañadas de salsa de la casa.',
          imagen: IMG.quesadillas,
        },
        {
          nombre: 'Quesadilla de arrachera',
          precio: '$8.75',
          descripcion:
            'Quesadilla acompañada de queso derretible, porción de arrachera y guacamole.',
          etiqueta: 'Especialidad',
        },
      ],
    },
    {
      grupo: 'Sopas',
      productos: [
        {
          nombre: 'Sopas',
          precio: '$8.50',
          descripcion:
            'Tortillas bañadas en salsa verde o roja, acompañadas de costilla de res o bistec, queso fresco, crema y cebolla morada.',
          opciones: ['Sopa Azteca', 'Sopa de Médula'],
        },
      ],
    },
  ],

  mexicana: [
    {
      grupo: 'Enchiladas',
      productos: [
        {
          nombre: 'Enchiladas Verdes',
          precio: '$8.50',
          descripcion: 'Acompañadas de queso fresco, crema y cebolla morada.',
          imagen: IMG.enchiladas,
          etiqueta: 'Especialidad',
        },
        {
          nombre: 'Enchiladas de Pollo',
          precio: '$7.75',
          descripcion:
            'Tortillas rellenas de pollo bañadas en salsa verde o roja, acompañadas de queso, crema y cebolla morada.',
        },
        {
          nombre: 'Enchiladas Suizas',
          precio: '$7.75',
          descripcion:
            'Tortillas rellenas de pollo con mezcla de quesos derretidos y salsa verde cremosa.',
        },
        {
          nombre: 'Enchiladas Exuberantes',
          precio: '$7.75',
          descripcion: 'Descripción pendiente de confirmar con el restaurante.',
          etiqueta: 'Exuberante',
          pendiente: true,
        },
      ],
    },
  ],

  finde: [
    {
      grupo: 'Sábado y domingo',
      productos: [
        {
          nombre: 'Pozole Rojo Norteño',
          precio: '$8.50',
          descripcion: 'Acompañado de lechuga, rábano, cebolla y tostadas.',
          etiqueta: 'Fin de semana',
        },
        {
          nombre: 'Pancita Tradicional',
          precio: '$7.75',
          descripcion: 'Menudo suave finamente picado y caldo rojo sazonado de la casa.',
          etiqueta: 'Fin de semana',
        },
        {
          nombre: 'Pancita Exuberante',
          precio: '$7.75',
          descripcion: 'Servida con un trozo completo de pata y caldo especial de la casa.',
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Barbacoa',
      productos: [
        {
          nombre: 'Barbacoa',
          precio: '$9.50',
          descripcion:
            'Todos nuestros tacos y pedidos por kilo se acompañan de tortillas hechas a mano.',
          opciones: ['Surtida', 'Maciza', 'Combinada'],
          nota: 'Disponibles por taco, medio kilo y kilo.',
          imagen: IMG.barbacoa,
          etiqueta: 'Especialidad',
        },
        {
          nombre: 'Taco Exuberante',
          precio: '$9.50',
          descripcion: 'El taco de barbacoa de la casa, servido a lo grande.',
          opciones: ['Taco', 'Consomé', 'Medio kilo', 'Kilo completo'],
          etiqueta: 'Exuberante',
        },
      ],
    },
    {
      grupo: 'Carnitas',
      productos: [
        {
          nombre: 'Carnitas',
          precio: '$8.50',
          descripcion: 'Tacos elaborados con tortillas hechas a mano.',
          etiqueta: 'Fin de semana',
        },
      ],
    },
  ],
}

// --- Bebidas -----------------------------------------------------------------
// Precios tomados del cartel "MENÚ DE BEBIDAS".
export const bebidasBarril = [
  {
    nombre: 'Cerveza de Barril',
    descripcion: 'Bien fría, servida al momento en tarro escarchado.',
    precios: [
      { medida: '1 LT', precio: '$109' },
      { medida: '1/2 LT', precio: '$69' },
    ],
    ilustracion: 'tarro',
    color: 'amarillo',
  },
  {
    nombre: 'Cerveza Mega',
    descripcion: 'Corona, Victoria o Modelo Especial.',
    precios: [{ medida: '1 LT', precio: '$149' }],
    ilustracion: 'botella',
    color: 'naranja',
  },
  {
    nombre: 'Michelada de Barril',
    descripcion: 'Sabor mango, tamarindo o cubana.',
    precios: [{ medida: '1 LT', precio: '$139' }],
    ilustracion: 'michelada',
    color: 'rosa',
  },
  {
    nombre: 'Michelada Mega',
    descripcion: 'Sabor mango, tamarindo o cubana.',
    precios: [{ medida: '1 LT', precio: '$159' }],
    ilustracion: 'michelada',
    color: 'rosa',
  },
  {
    nombre: 'Marina de Barril',
    descripcion: 'Camarón pacotilla, clamato, salsa cubana, salsas negras y ostiones.',
    precios: [
      { medida: '1 LT', precio: '$189' },
      { medida: '1/2 LT', precio: '$129' },
    ],
    ilustracion: 'marina',
    color: 'turquesa',
    destacado: true,
  },
  {
    nombre: 'Venenosa',
    descripcion: 'Victoria, Corona o Modelo Especial.',
    precios: [{ medida: 'Única', precio: '$150' }],
    ilustracion: 'botella',
    color: 'amarillo',
  },
]

export const bebidasListas = [
  {
    grupo: 'Coctelería',
    color: 'rosa',
    items: [
      'Cantarito Individual',
      'Cantarito Familiar',
      'Cantarito Exuberante',
      'Mojito Tradicional',
      'Mojito Frutos Rojos',
      'Mojito Maracuyá Mango',
      'Mezcalitas',
      'Blue (1 litro)',
      'Eléctrico (1 litro)',
      'Piña Colada',
      'Clericot',
      'Palomazo',
      'Margaritas',
    ],
  },
  {
    grupo: 'Cervezas',
    color: 'amarillo',
    items: [
      'Cerveza de Barril 500 ml',
      'Cerveza de Barril 1 Litro',
      'Micheladas de Sabor',
      'Michelada con Camarones',
      'Cubetazo de 10',
      'Cubetazo de 15',
      'Cerveza 350 ml',
    ],
  },
  {
    grupo: 'Aguas Frescas',
    color: 'turquesa',
    sinAlcohol: true,
    items: [
      'Horchata',
      'Jamaica',
      'Maracuyá',
      'Piña con Hierbabuena',
      'Guayaba',
      'Pepino con Limón',
    ],
    nota: 'Presentaciones: 1 litro y 1.8 litros.',
  },
  {
    grupo: 'Malteadas',
    color: 'naranja',
    sinAlcohol: true,
    items: ['Oreo', 'Vainilla', 'Fresa', 'Chocolate'],
  },
  {
    grupo: 'Otras bebidas',
    color: 'turquesa',
    sinAlcohol: true,
    items: ['ICE', 'Piña Colada sin alcohol', 'Coca-Cola 500 ml', 'Coca-Cola Familiar'],
  },
]

// --- Promociones -------------------------------------------------------------
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
    texto: 'Chilaquiles Tradicionales + Café Americano refill + Agua fresca.',
    detalle: 'Lunes a viernes.',
    restricciones: true,
    icono: 'cafe',
    color: 'amarillo',
  },
  {
    nombre: 'Promo Conbeber',
    texto: 'Dos Cantaritos + Dos Aguachiles.',
    restricciones: true,
    icono: 'cantarito',
    color: 'turquesa',
  },
  {
    nombre: 'Promo Familiar',
    texto: 'Un kilo de barbacoa + un cantarito familiar.',
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

// --- Especialidades destacadas ----------------------------------------------
export const especialidades = [
  {
    kicker: 'La casa recomienda',
    nombre: 'Barbacoa de fin de semana',
    texto:
      'Surtida, maciza o combinada. Todos nuestros tacos y pedidos por kilo se acompañan de tortillas hechas a mano, salsa de la casa y consomé bien caliente.',
    precio: '$9.50',
    etiqueta: 'Fin de semana',
    imagen: IMG.barbacoa,
    color: 'rosa',
  },
  {
    kicker: 'Para empezar el día',
    nombre: 'Chilaquiles Exuberantes',
    texto:
      'Totopos bañados en salsa verde o roja con crema, queso fresco, cebolla morada y frijoles refritos. Servidos con costilla de res, arrachera, chorizo y huevo.',
    precio: '$7.75',
    etiqueta: 'Exuberante',
    imagen: IMG.chilaquiles,
    color: 'turquesa',
  },
  {
    kicker: 'Para compartir',
    nombre: 'Enchiladas Verdes',
    texto:
      'Bañadas en salsa verde de la casa y acompañadas de queso fresco, crema y cebolla morada. Sencillas, generosas y siempre bien servidas.',
    precio: '$8.50',
    etiqueta: 'Especialidad',
    imagen: IMG.enchiladas,
    color: 'amarillo',
  },
]
