export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

const subcategories: Subcategory[] = [
  { id: '1', name: 'Carnicerías', slug: 'carnicerias', categoryId: '1' },
  { id: '2', name: 'Pescaderías', slug: 'pescaderias', categoryId: '1' },
  { id: '3', name: 'Fruterías', slug: 'fruterias', categoryId: '1' },
  { id: '4', name: 'Panaderías y Pastelerías', slug: 'panaderias-y-pastelerias', categoryId: '1' },
  { id: '5', name: 'Bodegas y Vinos', slug: 'bodegas-y-vinos', categoryId: '1' },
  { id: '6', name: 'Productos Gourmet', slug: 'productos-gourmet', categoryId: '1' },

  { id: '7', name: 'Ropa', slug: 'ropa', categoryId: '2' },
  { id: '8', name: 'Zapaterías', slug: 'zapaterias', categoryId: '2' },
  { id: '9', name: 'Moda Infantil', slug: 'moda-infantil', categoryId: '2' },
  { id: '10', name: 'Complementos', slug: 'complementos', categoryId: '2' },
  { id: '11', name: 'Joyerías', slug: 'joyerias', categoryId: '2' },

  { id: '12', name: 'Cerámica', slug: 'ceramica', categoryId: '3' },
  { id: '13', name: 'Textiles', slug: 'textiles', categoryId: '3' },
  { id: '14', name: 'Madera', slug: 'madera', categoryId: '3' },
  { id: '15', name: 'Decoración', slug: 'decoracion', categoryId: '3' },

  { id: '16', name: 'Peluquerías', slug: 'peluquerias', categoryId: '4' },
  { id: '17', name: 'Centros de Estética', slug: 'centros-de-estetica', categoryId: '4' },
  { id: '18', name: 'Reparaciones', slug: 'reparaciones', categoryId: '4' },
  { id: '19', name: 'Academias', slug: 'academias', categoryId: '4' },

  { id: '20', name: 'Ferreterías', slug: 'ferreterias', categoryId: '5' },
  { id: '21', name: 'Muebles', slug: 'muebles', categoryId: '5' },
  { id: '22', name: 'Electrodomésticos', slug: 'electrodomesticos', categoryId: '5' },
  { id: '23', name: 'Jardinería', slug: 'jardineria', categoryId: '5' },

  { id: '24', name: 'Librerías', slug: 'librerias', categoryId: '6' },
  { id: '25', name: 'Papelerías', slug: 'papelerias', categoryId: '6' },
  { id: '26', name: 'Prensa', slug: 'prensa', categoryId: '6' },
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

