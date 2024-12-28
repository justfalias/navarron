import { TypeIcon as type, LucideIcon, Utensils, ShoppingBag, Palette, ShoppingCart, Wrench, Home, BookOpen } from 'lucide-react'

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  icon: LucideIcon;
  imageUrl: string; // Añadimos esta línea
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Gastronomía',
    description: 'Descubre los sabores auténticos de Navarra',
    slug: 'gastronomia',
    icon: Utensils,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '2',
    name: 'Moda',
    description: 'Estilo y diseño local para todos',
    slug: 'moda',
    icon: ShoppingBag,
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '3',
    name: 'Artesanía y Decoración',
    description: 'El arte y la tradición de Navarra en tu hogar',
    slug: 'artesania-y-decoracion',
    icon: Palette,
    imageUrl: 'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '4',
    name: 'Alimentación',
    description: 'Productos frescos y de calidad de nuestra tierra',
    slug: 'alimentacion',
    icon: ShoppingCart,
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '5',
    name: 'Servicios',
    description: 'Profesionales locales a tu servicio',
    slug: 'servicios',
    icon: Wrench,
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '6',
    name: 'Hogar y Ferreterías',
    description: 'Todo para tu hogar y proyectos de bricolaje',
    slug: 'hogar-y-ferreterias',
    icon: Home,
    imageUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '7',
    name: 'Librerías y Papelerías',
    description: 'Cultura, educación y entretenimiento',
    slug: 'librerias-y-papelerias',
    icon: BookOpen,
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

