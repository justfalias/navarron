import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'
import { getSubcategories } from '@/lib/subcategories'
import { getVendors } from '@/lib/vendors'
import { getAreas } from '@/lib/areas'
import { ProductFilters } from '@/components/product/product-filters'
import { ProductGrid } from '@/components/product/product-grid'
import { ErrorBoundary } from '@/components/error-boundary'
import { Loader2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  )
}

interface SearchParams {
  [key: string]: string | string[] | undefined
  categoria?: string
  subcategoria?: string
  comercio?: string
  area?: string
  page?: string
}

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Pre-fetch all data at once
  const [products, categories, subcategories, vendors, areas] = await Promise.all([
    getProducts(),
    getCategories(),
    getSubcategories(),
    getVendors(),
    getAreas(),
  ])

  const productsWithVendors = products.map(product => ({
    ...product,
    vendor: vendors.find(v => v.id === product.vendorId)
  }));

  // Parse search params
  const page = Number(searchParams.page) || 1
  const categoria = searchParams.categoria?.toString()
  const subcategoria = searchParams.subcategoria?.toString()
  const comercio = searchParams.comercio?.toString()
  const area = searchParams.area?.toString()

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-1/4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <ProductFilters 
                categories={categories}
                subcategories={subcategories}
                vendors={vendors}
                areas={areas}
                initialCategory={categoria}
                initialSubcategory={subcategoria}
                initialVendor={comercio}
                initialArea={area}
              />
            </Suspense>
          </ErrorBoundary>
        </aside>
        <main className="w-full lg:w-3/4">
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
              <ProductGrid 
                products={productsWithVendors}
                currentPage={page}
                itemsPerPage={12}
                categoryFilter={categoria}
                subcategoryFilter={subcategoria}
                vendorFilter={comercio}
                areaFilter={area}
                categories={categories}
                subcategories={subcategories}
                vendors={vendors}
              />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}

