export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

const subcategories: Subcategory[] = [
  { id: '1', name: 'Restaurantes', slug: 'restaurantes', categoryId: '1' },
  { id: '2', name: 'Bares y Cafeterías', slug: 'bares-y-cafeterias', categoryId: '1' },
  { id: '3', name: 'Panaderías y Pastelerías', slug: 'panaderias-y-pastelerias', categoryId: '1' },
  { id: '4', name: 'Tiendas Gourmet', slug: 'tiendas-gourmet', categoryId: '1' },
  
  { id: '5', name: 'Ropa y Complementos', slug: 'ropa-y-complementos', categoryId: '2' },
  { id: '6', name: 'Zapaterías', slug: 'zapaterias', categoryId: '2' },
  { id: '7', name: 'Moda Infantil', slug: 'moda-infantil', categoryId: '2' },
  
  { id: '8', name: 'Cerámica y Alfarería', slug: 'ceramica-y-alfareria', categoryId: '3' },
  { id: '9', name: 'Joyería Artesanal', slug: 'joyeria-artesanal', categoryId: '3' },
  { id: '10', name: 'Productos de Madera', slug: 'productos-de-madera', categoryId: '3' },
  { id: '11', name: 'Arte y Decoración', slug: 'arte-y-decoracion', categoryId: '3' },
  
  { id: '12', name: 'Carnicerías', slug: 'carnicerias', categoryId: '4' },
  { id: '13', name: 'Charcuterías', slug: 'charcuterias', categoryId: '4' },
  { id: '14', name: 'Pescaderías', slug: 'pescaderias', categoryId: '4' },
  { id: '15', name: 'Fruterías', slug: 'fruterias', categoryId: '4' },
  
  { id: '16', name: 'Peluquerías y Barberías', slug: 'peluquerias-y-barberias', categoryId: '5' },
  { id: '17', name: 'Centros de Estética', slug: 'centros-de-estetica', categoryId: '5' },
  { id: '18', name: 'Gimnasios y Centros Deportivos', slug: 'gimnasios-y-centros-deportivos', categoryId: '5' },
  { id: '19', name: 'Reparaciones', slug: 'reparaciones', categoryId: '5' },
  
  { id: '20', name: 'Tiendas de Decoración', slug: 'tiendas-de-decoracion', categoryId: '6' },
  { id: '21', name: 'Textiles para el Hogar', slug: 'textiles-para-el-hogar', categoryId: '6' },
  { id: '22', name: 'Ferreterías y Bricolaje', slug: 'ferreterias-y-bricolaje', categoryId: '6' },
  
  { id: '23', name: 'Librerías', slug: 'librerias', categoryId: '7' },
  { id: '24', name: 'Papelerías', slug: 'papelerias', categoryId: '7' },
  { id: '25', name: 'Jugueterías', slug: 'jugueterias', categoryId: '7' }
];

export async function getSubcategories(): Promise<Subcategory[]> {
  return subcategories;
}

export async function getSubcategoriesByCategoryId(categoryId: string): Promise<Subcategory[]> {
  return subcategories.filter(subcategory => subcategory.categoryId === categoryId);
}

export async function getSubcategoryBySlug(slug: string): Promise<Subcategory | undefined> {
  return subcategories.find(subcategory => subcategory.slug === slug);
}

export async function getSubcategoryById(id: string): Promise<Subcategory | undefined> {
  return subcategories.find(subcategory => subcategory.id === id);
}

