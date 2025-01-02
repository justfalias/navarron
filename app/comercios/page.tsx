import { Suspense } from 'react'
import { getVendors } from '@/lib/vendors'
import { getCategories } from '@/lib/categories'
import { getSubcategories } from '@/lib/subcategories'
import { getAreas } from '@/lib/areas'
import { CommerceFilters } from '@/components/commerce/commerce-filters'
import { CommerceGrid } from '@/components/commerce/commerce-grid'
import { ErrorBoundary } from '@/components/error-boundary'
import { Loader2 } from 'lucide-react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Providers } from '@/app/providers'

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
  area?: string
  page?: string
}

export default async function ComerciosPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Pre-fetch all data at once
  const [vendors, categories, subcategories, areas] = await Promise.all([
    getVendors(),
    getCategories(),
    getSubcategories(),
    getAreas(),
  ])

  // Parse search params
  const page = Number(searchParams.page) || 1
  const categoria = searchParams.categoria?.toString()
  const subcategoria = searchParams.subcategoria?.toString()
  const area = searchParams.area?.toString()

  return (
    <Providers>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <CommerceFilters 
                  categories={categories}
                  subcategories={subcategories}
                  areas={areas}
                  initialCategory={categoria}
                  initialSubcategory={subcategoria}
                  initialArea={area}
                />
              </Suspense>
            </ErrorBoundary>
          </aside>
          <main className="w-full lg:w-3/4">
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <CommerceGrid 
                  initialVendors={vendors}
                  currentPage={page}
                  itemsPerPage={12}
                  categoryFilter={categoria}
                  subcategoryFilter={subcategoria}
                  areaFilter={area}
                  categories={categories}
                  subcategories={subcategories}
                  areas={areas}
                />
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </div>
    </Providers>
  )
}

