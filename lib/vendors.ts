import { generateSlug } from '@/lib/utils'

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  heroImageUrl: string;
  thumbnailUrl: string;
  city: string;
  foundedYear: number;
  specialties: string[];
  size: 'small' | 'medium' | 'large';
  areaId: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  contactPerson: string;
  subcategoryIds: string[]; // Cambiado de categoryIds a subcategoryIds
}

const vendors: Vendor[] = [
  {
    id: '1',
    slug: 'queseria-roncal',
    name: 'Quesería Roncal',
    description: 'Productores artesanales de queso D.O. Roncal desde 1980.',
    longDescription: 'En Quesería Roncal, llevamos más de cuatro décadas elaborando el auténtico queso D.O.P. Roncal. Nuestro compromiso con la tradición y la calidad nos ha convertido en un referente de la gastronomía navarra. Utilizamos leche de oveja de razas autóctonas y técnicas artesanales para crear un queso de sabor inigualable.',
    imageUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1571166574917-826d6d3e8754?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Valle de Roncal, Navarra',
    foundedYear: 1980,
    specialties: ['Queso D.O.P. Roncal', 'Queso curado', 'Queso ahumado'],
    size: 'medium',
    areaId: '5',
    phone: '+34 948 475 035',
    email: 'info@queseriaroncal.com',
    address: 'Calle Mayor 5, 31415 Roncal, Navarra',
    whatsapp: '+34 666 123 456',
    contactPerson: 'María Etxeberria',
    subcategoryIds: ['6'], // Productos Gourmet
  },
  {
    id: '2',
    slug: 'bodegas-ochoa',
    name: 'Bodegas Ochoa',
    description: 'Viñedos familiares con más de 160 años de tradición vinícola.',
    longDescription: 'Bodegas Ochoa es una empresa familiar con una rica historia que se remonta a 1845. Nuestros viñedos, situados en la privilegiada zona de Olite, nos permiten producir vinos de alta calidad que reflejan la esencia de Navarra. Combinamos técnicas tradicionales con innovación para ofrecer una amplia gama de vinos que satisfacen los paladares más exigentes.',
    imageUrl: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Olite, Navarra',
    foundedYear: 1845,
    specialties: ['Vinos tintos', 'Vinos blancos', 'Vinos rosados', 'Vinos ecológicos'],
    size: 'large',
    areaId: '3',
    phone: '+34 948 740 006',
    email: 'info@bodegasochoa.com',
    address: 'Ctra. de Zaragoza, Km. 5,5, 31390 Olite, Navarra',
    whatsapp: '+34 687 654 321',
    contactPerson: 'Javier Ochoa',
    subcategoryIds: ['5'], // Bodegas y Vinos
  },
  {
    id: '3',
    slug: 'conservas-el-navarrico',
    name: 'Conservas El Navarrico',
    description: 'Especialistas en conservas vegetales de la huerta navarra.',
    longDescription: 'Desde hace varias generaciones, Conservas El Navarrico se dedica a la elaboración de conservas vegetales de la huerta navarra. Utilizamos productos frescos y de temporada, cultivados con métodos tradicionales, para garantizar la máxima calidad y sabor en nuestros productos. Nuestras conservas son un auténtico tesoro de la gastronomía local.',
    imageUrl: 'https://images.unsplash.com/photo-1599003037886-f8b50bc290c8?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1560806175-3b5e9b8f5b11?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1599003037886-f8b50bc290c8?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'San Adrián, Navarra',
    foundedYear: 1900,
    specialties: ['Conservas vegetales', 'Pimientos del piquillo', 'Espárragos', 'Alcachofas'],
    size: 'medium',
    areaId: '2',
    phone: '+34 948 670 411',
    email: 'info@elnavarrico.com',
    address: 'Polígono Industrial, Calle A, 31570 San Adrián, Navarra',
    whatsapp: '+34 639 876 543',
    contactPerson: 'Ana Martínez',
    subcategorysubcategoryIds: ['6'], // Productos Gourmet
  },
  {
    id: '4',
    slug: 'embutidos-arrieta',
    name: 'Embutidos Arrieta',
    description: 'Elaboración tradicional de embutidos y chistorra navarra.',
    longDescription: 'Embutidos Arrieta mantiene la tradición charcutera navarra desde hace décadas. Elaboramos nuestros productos con recetas familiares y materias primas de primera calidad, siguiendo métodos artesanales para garantizar un sabor auténtico. Nuestra chistorra es reconocida como una de las mejores de la región.',
    imageUrl: 'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542901031-ec5eeb518e83?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Pamplona, Navarra',
    foundedYear: 1950,
    specialties: ['Chistorra', 'Chorizo', 'Salchichón', 'Lomo embuchado'],
    size: 'medium',
    areaId: '1',
    phone: '+34 948 123 456',
    email: 'pedidos@embutidosarrieta.com',
    address: 'Calle San Nicolás 13, 31001 Pamplona, Navarra',
    whatsapp: '+34 654 321 987',
    contactPerson: 'Miguel Arrieta',
    subcategoryIds: ['1'], // Carnicerías
  },
  {
    id: '5',
    slug: 'pasteleria-larramendi',
    name: 'Pastelería Larramendi',
    description: 'Dulces tradicionales y pasteles artesanales desde 1950.',
    longDescription: 'En Pastelería Larramendi, elaboramos dulces y pasteles artesanales con recetas tradicionales y los mejores ingredientes. Nuestro compromiso con la calidad y el sabor nos ha convertido en un referente de la repostería navarra. Desde nuestros famosos canutillos hasta las tartas de celebración, cada producto es una obra maestra de sabor.',
    imageUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Pamplona, Navarra',
    foundedYear: 1950,
    specialties: ['Canutillos de crema', 'Coronas de hojaldre', 'Tartas personalizadas', 'Pasteles tradicionales'],
    size: 'small',
    areaId: '1',
    phone: '+34 948 220 168',
    email: 'info@pasteleriaLarramendi.com',
    address: 'Calle Estafeta 96, 31001 Pamplona, Navarra',
    whatsapp: '+34 678 901 234',
    contactPerson: 'Laura Larramendi',
    subcategoryIds: ['4'], // Panaderías y Pastelerías
  },
  {
    id: '6',
    slug: 'artesania-navarra',
    name: 'Artesanía Navarra',
    description: 'Creaciones únicas de artesanía local en madera y cerámica.',
    longDescription: 'Artesanía Navarra ofrece piezas únicas de artesanía local, elaboradas con técnicas tradicionales y materiales de alta calidad. Descubre la belleza y la tradición de Navarra en cada una de nuestras creaciones. Nuestros artesanos combinan la sabiduría ancestral con diseños contemporáneos para crear objetos que son verdaderas obras de arte.',
    imageUrl: 'https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1462927114214-6956d2fddd4e?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Estella, Navarra',
    foundedYear: 1985,
    specialties: ['Tallas en madera', 'Cerámica pintada a mano', 'Tejidos artesanales', 'Joyería tradicional'],
    size: 'small',
    areaId: '4',
    phone: '+34 948 546 789',
    email: 'contacto@artesanianavarra.com',
    address: 'Plaza de los Fueros 12, 31200 Estella, Navarra',
    whatsapp: '+34 612 345 678',
    contactPerson: 'Carlos Echarri',
    subcategoryIds: ['12', '13', '14'], // Cerámica, Textiles, Madera
  },
  {
    id: '7',
    slug: 'libreria-auzolan',
    name: 'Librería Auzolan',
    description: 'Librería independiente con una amplia selección de libros y eventos culturales.',
    longDescription: 'Fundada en 1977, Librería Auzolan es un referente cultural en Pamplona. Ofrecemos una cuidada selección de libros en euskera y castellano, además de organizar presentaciones de libros, clubes de lectura y otras actividades culturales. Nuestro compromiso con la cultura local y la promoción de la lectura nos ha convertido en un punto de encuentro para los amantes de la literatura en Iturrama.',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Pamplona',
    foundedYear: 1977,
    specialties: ['Libros en euskera', 'Literatura infantil y juvenil', 'Eventos culturales'],
    size: 'medium',
    areaId: '5', // Iturrama
    phone: '+34 948 275 535',
    email: 'info@libreriaauzolan.com',
    address: 'Irunlarrea Kalea, 9, 31008 Pamplona, Navarra',
    whatsapp: '+34 644 555 123',
    contactPerson: 'Mikel Zubeldia',
    subcategoryIds: ['24', '19'], // Librerías, Academias
  },
  {
    id: '8',
    slug: 'calzados-garrido',
    name: 'Calzados Garrido',
    description: 'Zapatería familiar con una amplia selección de calzado para toda la familia.',
    longDescription: 'Calzados Garrido es una zapatería familiar con más de 40 años de experiencia en el sector. Ofrecemos una amplia gama de calzado para hombre, mujer y niño, combinando marcas reconocidas con diseños propios. Nuestra atención personalizada y conocimiento del producto son nuestra seña de identidad. Además, nos especializamos en calzado de confort y zapatos ortopédicos para garantizar el bienestar de nuestros clientes.',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Pamplona',
    foundedYear: 1980,
    specialties: ['Calzado de confort', 'Zapatos ortopédicos', 'Calzado infantil'],
    size: 'small',
    areaId: '5', // Iturrama
    phone: '+34 948 266 987',
    email: 'info@calzadosgarrido.com',
    address: 'Iturrama Kalea, 28, 31007 Pamplona, Navarra',
    whatsapp: '+34 654 321 987',
    contactPerson: 'Ana Garrido',
    subcategoryIds: ['8', '9'], // Zapaterías, Moda Infantil
  },
  {
    id: '9',
    slug: 'peluqueria-imagen',
    name: 'Peluquería Imagen',
    description: 'Salón de belleza y peluquería con servicios personalizados y las últimas tendencias.',
    longDescription: 'Peluquería Imagen es un salón de belleza moderno ubicado en el corazón de Iturrama. Nuestro equipo de profesionales altamente cualificados ofrece servicios de peluquería y estética utilizando productos de primera calidad. Nos mantenemos al día con las últimas tendencias en cortes, coloración y tratamientos capilares para garantizar que nuestros clientes luzcan y se sientan lo mejor posible.',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Pamplona',
    foundedYear: 1995,
    specialties: ['Cortes de pelo', 'Coloración', 'Tratamientos capilares', 'Maquillaje'],
    size: 'small',
    areaId: '5', // Iturrama
    phone: '+34 948 277 788',
    email: 'citas@peluqueriaimagen.com',
    address: 'Avenida de Navarra, 5, 31008 Pamplona, Navarra',
    whatsapp: '+34 678 123 456',
    contactPerson: 'Elena Sánchez',
    subcategoryIds: ['16', '17'], // Peluquerías, Centros de Estética
  },
];

export async function getVendors(): Promise<Vendor[]> {
  try {
    console.log('Starting getVendors fetch');
    
    if (!vendors || vendors.length === 0) {
      console.error('No vendors found in the database');
      return []; // Return empty array instead of throwing
    }
    
    console.log(`Successfully fetched ${vendors.length} vendors`);
    return vendors;
  } catch (error) {
    console.error('Error in getVendors:', error);
    return []; // Return empty array instead of throwing
  }
}

export async function getVendorBySlug(slug: string): Promise<Vendor | undefined> {
  console.log(`Searching for vendor with slug: ${slug}`);
  if (slug === 'comercios' || slug === 'productos') {
    console.log(`${slug} page requested, not a vendor`);
    return undefined;
  }
  const vendor = vendors.find(vendor => vendor.slug === slug);
  if (!vendor) {
    console.log(`No vendor found with slug: ${slug}`);
  }
  return vendor;
}

export async function getVendorById(id: string): Promise<Vendor | undefined> {
  console.log(`Searching for vendor with id: ${id}`);
  const vendor = vendors.find(vendor => vendor.id === id);
  if (!vendor) {
    console.log(`No vendor found with id: ${id}`);
  }
  return vendor;
}

