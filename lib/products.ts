export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  vendorId: string;
  inventory: number;
  slug: string;
  coverImage: string;
  images: string[];
  discount?: number;
  rating: number;
  features?: string[];
}

const products: Product[] = [
  {
    id: '1',
    name: 'Queso D.O. Roncal',
    description: 'Queso de oveja con Denominación de Origen Roncal, curado durante 4 meses.',
    price: 15.99,
    categoryId: '1',
    vendorId: '1',
    inventory: 50,
    slug: 'queso-do-roncal',
    coverImage: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    features: ['100% leche de oveja', 'Curación mínima de 4 meses', 'Sabor intenso y equilibrado'],
    images: [
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1470104240373-bc1812eddc9f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?auto=format&fit=crop&w=800&q=60'
    ],
    discount: 10,
  },
  {
    id: '2',
    name: 'Vino Tinto Reserva',
    description: 'Vino tinto reserva de la D.O. Navarra, envejecido en barrica de roble.',
    price: 12.50,
    categoryId: '1',
    vendorId: '2',
    inventory: 100,
    slug: 'vino-tinto-reserva',
    coverImage: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    features: ['Uva Tempranillo', '18 meses en barrica', 'Aroma intenso a frutos rojos'],
    images: [
      'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=60'
    ],
    discount: 15,
  },
  {
    id: '3',
    name: 'Espárragos de Navarra',
    description: 'Espárragos blancos con Indicación Geográfica Protegida de Navarra.',
    price: 8.75,
    categoryId: '1',
    vendorId: '3',
    inventory: 75,
    slug: 'esparragos-de-navarra',
    coverImage: 'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    features: ['IGP Espárrago de Navarra', 'Calibre grueso', 'Textura tierna y sabor dulce'],
    images: [
      'https://images.unsplash.com/photo-1515471209610-dae1c92d8777?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1604932732281-c4c7856aee25?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '4',
    name: 'Chistorra de Navarra',
    description: 'Chistorra artesanal elaborada con carne de cerdo y pimentón de la Vera.',
    price: 6.99,
    categoryId: '1',
    vendorId: '4',
    inventory: 60,
    slug: 'chistorra-de-navarra',
    coverImage: 'https://images.unsplash.com/photo-1597712679225-64f4dc31f0a3?auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    features: ['100% carne de cerdo', 'Ahumado natural', 'Ideal para el aperitivo'],
    images: [
      'https://images.unsplash.com/photo-1597712679225-64f4dc31f0a3?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1614398751058-eb2e0bf63e53?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1628517394788-cdd94adc4839?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '5',
    name: 'Pacharán Artesanal',
    description: 'Licor tradicional navarro elaborado con endrinas silvestres.',
    price: 14.25,
    categoryId: '1',
    vendorId: '2',
    inventory: 40,
    slug: 'pacharan-artesanal',
    coverImage: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=60',
    rating: 4.5,
    features: ['Endrinas 100% silvestres', 'Maceración tradicional', 'Sin colorantes artificiales'],
    images: [
      'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1470338745628-171cf53de3a8?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1549873916-b1bb7dc758c3?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '8',
    name: 'Miel de Romero',
    description: 'Miel pura de romero recolectada en los campos de Navarra.',
    price: 8.50,
    categoryId: '1',
    vendorId: '8',
    inventory: 30,
    slug: 'miel-de-romero',
    coverImage: 'https://images.unsplash.com/photo-1587049352847-4e8123573f93?auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    features: ['100% natural', 'Sin aditivos', 'Propiedades antioxidantes'],
    images: [
      'https://images.unsplash.com/photo-1587049352847-4e8123573f93?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '9',
    name: 'Queso Idiazábal',
    description: 'Queso Idiazábal D.O. curado, elaborado con leche cruda de oveja latxa.',
    price: 18.75,
    categoryId: '1',
    vendorId: '1',
    inventory: 25,
    slug: 'queso-idiazabal',
    coverImage: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    features: ['Denominación de Origen', 'Curación mínima de 2 meses', 'Sabor intenso'],
    images: [
      'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1566454825481-9c20a44d1c8f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1571166574917-826d6d3e8754?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '10',
    name: 'Sidra Natural',
    description: 'Sidra natural de Navarra, elaborada con manzanas autóctonas.',
    price: 5.99,
    categoryId: '1',
    vendorId: '7',
    inventory: 50,
    slug: 'sidra-natural',
    coverImage: 'https://images.unsplash.com/photo-1569384229829-896923a3c0cb?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    features: ['Sin aditivos', 'Fermentación natural', 'Sabor fresco y ácido'],
    images: [
      'https://images.unsplash.com/photo-1569384229829-896923a3c0cb?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1620405116976-f0d46f8b5775?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1621873495914-1c921811e37f?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '11',
    name: 'Pañuelo de San Fermín',
    description: 'Pañuelo rojo tradicional para las fiestas de San Fermín.',
    price: 12.00,
    categoryId: '2',
    vendorId: '6',
    inventory: 100,
    slug: 'panuelo-san-fermin',
    coverImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    features: ['100% algodón', 'Tinte natural', 'Tamaño estándar'],
    images: [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1562699969-e9e01b5c2fb6?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1565025968566-82b0c3fefe5e?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '12',
    name: 'Cerámica Artesanal',
    description: 'Plato decorativo de cerámica pintado a mano con motivos tradicionales navarros.',
    price: 45.00,
    categoryId: '3',
    vendorId: '6',
    inventory: 15,
    slug: 'ceramica-artesanal',
    coverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    features: ['Hecho a mano', 'Pintado individualmente', 'Apto para uso alimentario'],
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '13',
    name: 'Txistorra',
    description: 'Txistorra tradicional navarra, embutido curado listo para cocinar.',
    price: 7.50,
    categoryId: '4',
    vendorId: '4',
    inventory: 40,
    slug: 'txistorra',
    coverImage: 'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    features: ['Sin conservantes', 'Ahumado natural', 'Ideal para bocadillos y pinchos'],
    images: [
      'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1588690793273-3cbc8f9db309?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '14',
    name: 'Alpargatas Artesanales',
    description: 'Alpargatas tradicionales hechas a mano, perfectas para el verano.',
    price: 29.99,
    categoryId: '2',
    vendorId: '6',
    inventory: 30,
    slug: 'alpargatas-artesanales',
    coverImage: 'https://images.unsplash.com/photo-1572789182634-c2e5e8a40b15?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    features: ['Suela de yute', 'Parte superior de algodón', 'Hechas a mano en Navarra'],
    images: [
      'https://images.unsplash.com/photo-1572789182634-c2e5e8a40b15?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '15',
    name: 'Aceite de Oliva Virgen Extra',
    description: 'Aceite de oliva virgen extra de la variedad Arróniz, típica de Navarra.',
    price: 14.95,
    categoryId: '1',
    vendorId: '3',
    inventory: 35,
    slug: 'aceite-oliva-virgen-extra',
    coverImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    features: ['Extracción en frío', 'Acidez máxima 0.2%', 'Botella oscura para mejor conservación'],
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1591448919361-b3a32f5c6e6b?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=60'
    ]
  },
];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductsByVendor(vendorId: string, page: number, limit: number): Promise<{ products: Product[], totalPages: number }> {
  try {
    const vendorProducts = products.filter(product => product.vendorId === vendorId);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = vendorProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(vendorProducts.length / limit);

    return {
      products: paginatedProducts,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching products by vendor:", error);
    return { products: [], totalPages: 0 };
  }
}

export async function getProductBySlug(slug: string, vendorId: string): Promise<Product | undefined> {
  return products.find(product => 
    product.slug === slug && 
    product.vendorId === vendorId
  );
}

export async function getRelatedProducts(productId: string, vendorId: string, limit: number = 4): Promise<Product[]> {
  // Filter out the current product and get products from the same vendor
  const relatedProducts = products.filter(p => p.id !== productId && p.vendorId === vendorId);
  
  // Shuffle the array to get random related products
  for (let i = relatedProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [relatedProducts[i], relatedProducts[j]] = [relatedProducts[j], relatedProducts[i]];
  }
  
  // Return the specified number of related products
  return relatedProducts.slice(0, limit);
}

