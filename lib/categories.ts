import type { LucideIcon } from 'lucide-react'

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  iconName: string; 
  imageUrl: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Gastronomía',
    description: 'Descubre los sabores auténticos y productos frescos de Navarra',
    slug: 'gastronomia',
    iconName: 'utensils',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    name: 'Moda',
    description: 'Estilo y diseño local para todos',
    slug: 'moda',
    iconName: 'shopping-bag',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    name: 'Artesanía',
    description: 'El arte y la tradición de Navarra en tu hogar',
    slug: 'artesania-y-decoracion',
    iconName: 'palette',
    imageUrl: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '4',
    name: 'Servicios',
    description: 'Profesionales locales a tu servicio',
    slug: 'servicios',
    iconName: 'wrench',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '5',
    name: 'Hogar',
    description: 'Todo para tu hogar y proyectos de bricolaje',
    slug: 'hogar-y-ferreterias',
    iconName: 'home',
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '6',
    name: 'Libros',
    description: 'Cultura, educación y entretenimiento',
    slug: 'librerias-y-papelerias',
    iconName: 'book-open',
    imageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=60'
  }
];

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  return categories.find(category => category.slug === slug);
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  return categories.find(category => category.id === id);
}

