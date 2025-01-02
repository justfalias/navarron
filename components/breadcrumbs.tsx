'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href: string
}

const ROUTE_LABELS: Record<string, string> = {
  'tienda': 'Tienda',
  'comercios': 'Comercios',
  'productos': 'Productos',
  'carrito': 'Carrito',
  'gastronomia': 'Gastronomía',
  'moda': 'Moda',
  'artesania-y-decoracion': 'Artesanía y Decoración',
  'servicios': 'Servicios',
  'hogar-y-ferreterias': 'Hogar y Ferreterías',
  'librerias-y-papelerias': 'Librerías y Papelerías',
  'bodegas-y-vinos': 'Bodegas y Vinos',
  'productos-gourmet': 'Productos Gourmet',
  'panaderias-y-pastelerias': 'Panaderías y Pastelerías'
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const breadcrumbs = useMemo(() => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '')
    const items: BreadcrumbItem[] = [{ label: 'Inicio', href: '/' }]
    
    // Add path segments
    pathSegments.forEach((segment, index) => {
      const href = `/${pathSegments.slice(0, index + 1).join('/')}`
      const label = ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      items.push({ label, href })
    })
    
    // Add query parameters if they exist
    const categoria = searchParams.get('categoria')
    const subcategoria = searchParams.get('subcategoria')
    
    if (categoria) {
      const categoriaLabel = ROUTE_LABELS[categoria] || categoria
      items.push({
        label: categoriaLabel,
        href: `${pathname}?categoria=${categoria}`
      })
    }
    
    if (subcategoria) {
      const subcategoriaLabel = ROUTE_LABELS[subcategoria] || subcategoria
      items.push({
        label: subcategoriaLabel,
        href: `${pathname}?categoria=${categoria}&subcategoria=${subcategoria}`
      })
    }
    
    return items
  }, [pathname, searchParams])

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center space-x-2">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />}
            {index === 0 ? (
              <Link 
                href={breadcrumb.href} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">{breadcrumb.label}</span>
              </Link>
            ) : index === breadcrumbs.length - 1 ? (
              <span className="text-foreground font-medium">{breadcrumb.label}</span>
            ) : (
              <Link 
                href={breadcrumb.href} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

