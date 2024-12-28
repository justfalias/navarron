'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { AnimatedProductCard } from "@/components/animated-product-card"
import { ErrorMessage } from "@/components/error-message"
import { Product } from "@/lib/products"
import { PaginationControls } from "@/components/pagination-controls"

interface ProductGridProps {
  initialProducts: Product[]
  vendorNames: Record<string, string>
}

export function ProductGrid({ initialProducts, vendorNames }: ProductGridProps) {
  const searchParams = useSearchParams()
  
  const { data: products = initialProducts, isError } = useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/products?${searchParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      return response.json()
    },
    initialData: initialProducts,
  })

  if (isError) {
    return (
      <ErrorMessage
        title="Error al cargar los productos"
        description="Ha ocurrido un error al cargar los productos. Por favor, inténtalo de nuevo."
        actionText="Reintentar"
        actionHref="/tienda"
      />
    )
  }

  if (!products || products.length === 0) {
    return (
      <ErrorMessage
        title="No hay productos"
        description="No se encontraron productos para mostrar."
        actionText="Limpiar filtros"
        actionHref="/tienda"
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <AnimatedProductCard
            key={product.id}
            product={product}
            vendorName={vendorNames[product.vendorId] || 'Comercio'}
            showAddToCart={true}
          />
        ))}
      </div>
      {products.length > 0 && (
        <PaginationControls
          currentPage={1}
          totalPages={Math.ceil(products.length / 12)}
          basePath="/tienda"
          totalItems={products.length}
          itemsPerPage={12}
        />
      )}
    </div>
  )
}

