export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  subcategoryId: string; // Cambiado de categoryId a subcategoryId
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
    subcategoryId: '6', // Productos Gourmet
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
    subcategoryId: '5', // Bodegas y Vinos
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
    subcategoryId: '6', // Productos Gourmet
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
    subcategoryId: '1', // Carnicerías
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
    subcategoryId: '5', // Bodegas y Vinos
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
    id: '6',
    name: 'Tarta de Manzana',
    description: 'Deliciosa tarta de manzana elaborada con receta tradicional.',
    price: 18.50,
    subcategoryId: '4', // Panaderías y Pastelerías
    vendorId: '5',
    inventory: 20,
    slug: 'tarta-de-manzana',
    coverImage: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a7?auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    features: ['Manzanas frescas', 'Masa casera', 'Sin conservantes'],
    images: [
      'https://images.unsplash.com/photo-1568571780765-9276ac8b75a7?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1562007908-141f2a8d4ce4?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '7',
    name: 'Cerámica Decorativa',
    description: 'Jarrón de cerámica pintado a mano con motivos tradicionales navarros.',
    price: 45.00,
    subcategoryId: '12', // Cerámica
    vendorId: '6',
    inventory: 15,
    slug: 'ceramica-decorativa',
    coverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=60',
    rating: 4.9,
    features: ['Hecho a mano', 'Pintado individualmente', 'Diseño único'],
    images: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '8',
    name: 'Libro "Patria" de Fernando Aramburu',
    description: 'Novela galardonada que aborda el conflicto vasco a través de dos familias enfrentadas.',
    price: 21.90,
    subcategoryId: '24', // Librerías
    vendorId: '7',
    inventory: 25,
    slug: 'libro-patria-fernando-aramburu',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=60',
    rating: 4.8,
    features: ['Tapa dura', 'Edición especial', 'Autor local'],
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '9',
    name: 'Zapatos de Confort para Mujer',
    description: 'Zapatos de piel con plantilla extraíble y suela antideslizante.',
    price: 79.95,
    subcategoryId: '8', // Zapaterías
    vendorId: '8',
    inventory: 15,
    slug: 'zapatos-confort-mujer',
    coverImage: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=60',
    rating: 4.6,
    features: ['Piel de primera calidad', 'Plantilla extraíble', 'Suela antideslizante'],
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&w=800&q=60'
    ]
  },
  {
    id: '10',
    name: 'Corte de Pelo y Peinado',
    description: 'Servicio de corte de pelo y peinado personalizado.',
    price: 35.00,
    subcategoryId: '16', // Peluquerías
    vendorId: '9',
    inventory: 999,
    slug: 'corte-pelo-peinado',
    coverImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60',
    rating: 4.7,
    features: ['Consulta personalizada', 'Productos de alta calidad', 'Estilistas profesionales'],
    images: [
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=800&q=60'
    ]
  }
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

