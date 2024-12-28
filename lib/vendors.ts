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
    contactPerson: 'María Etxeberria'
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
    contactPerson: 'Javier Ochoa'
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
    contactPerson: 'Ana Martínez'
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
    contactPerson: 'Miguel Arrieta'
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
    contactPerson: 'Laura Larramendi'
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
    contactPerson: 'Carlos Echarri'
  },
  {
    id: '7',
    slug: 'cerveceria-naparbier',
    name: 'Cervecería Naparbier',
    description: 'Cervezas artesanales con sabores únicos de Navarra.',
    longDescription: 'Cervecería Naparbier elabora cervezas artesanales con ingredientes locales y recetas innovadoras. Descubre una experiencia cervecera única, con sabores que reflejan la esencia de Navarra. Nuestro maestro cervecero combina técnicas tradicionales con métodos modernos para crear cervezas de carácter distintivo y calidad excepcional.',
    imageUrl: 'https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1505075106905-fb052892c116?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Noáin, Navarra',
    foundedYear: 2010,
    specialties: ['IPA artesanal', 'Cerveza de trigo', 'Stout de temporada', 'Cervezas experimentales'],
    size: 'small',
    areaId: '1',
    phone: '+34 948 312 444',
    email: 'info@naparbier.com',
    address: 'Polígono Talluntxe II, Calle M-6, 31110 Noáin, Navarra',
    whatsapp: '+34 634 567 890',
    contactPerson: 'Juan Magaña'
  },
  {
    id: '8',
    slug: 'miel-del-pirineo',
    name: 'Miel del Pirineo',
    description: 'Miel orgánica recolectada en las montañas del Pirineo navarro.',
    longDescription: 'Miel del Pirineo produce miel orgánica de alta calidad, recolectada en las montañas del Pirineo navarro. Nuestro compromiso con la sostenibilidad y la calidad nos permite ofrecer un producto natural y delicioso. Trabajamos en armonía con las abejas y la naturaleza para traer a tu mesa lo mejor de las flores silvestres del Pirineo.',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=60',
    heroImageUrl: 'https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&w=1920&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=80&h=80&q=60',
    city: 'Ochagavía,Ochagavía, Navarra',
    foundedYear: 2005,
    specialties: ['Miel de flores silvestres', 'Miel de castaño', 'Polen fresco', 'Propóleo'],
    size: 'small',
    areaId: '5',
    phone: '+34 948 890 123',
    email: 'contacto@mieldelpirineo.com',
    address: 'Calle San Martín 8, 31680 Ochagavía, Navarra',
    whatsapp: '+34 645 678 901',
    contactPerson: 'Elena Iriarte'
  }
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

