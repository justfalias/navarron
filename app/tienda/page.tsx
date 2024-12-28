import { Suspense } from 'react'
import { Providers } from '../providers'
import { ProductFilters } from '@/components/product-filters'
import { ProductGrid } from '@/components/product-grid'
import { PaginationControls } from "@/components/pagination-controls"
import { getProducts } from '@/lib/products'
import { getVendors } from '@/lib/vendors'

export default async function TiendaPage() {
  // Pre-fetch initial data
  const [initialProducts, vendors] = await Promise.all([
    getProducts(),
    getVendors(),
  ])

  const vendorNames = vendors.reduce((acc, vendor) => {
    acc[vendor.id] = vendor.name
    return acc
  }, {} as Record<string, string>)

  return (
    <Providers>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestra Tienda</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <Suspense fallback={<div>Cargando filtros...</div>}>
              <ProductFilters />
            </Suspense>
          </div>
          <div className="w-full lg:w-3/4">
            <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductGrid 
                initialProducts={initialProducts} 
                vendorNames={vendorNames} 
              />
            </Suspense>
          </div>
        </div>
      </div>
    </Providers>
  )
}

