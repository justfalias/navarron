import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'
import { getVendors } from '@/lib/vendors'
import { ProductFilters } from '@/components/product/product-filters'
import { ProductGrid } from '@/components/product/product-grid'
import { PaginationControls } from "@/components/pagination-controls"
import { ErrorMessage } from '@/components/error-message'
import { ProductsLoading } from './loading'

interface ProductsPageProps {
  searchParams: { 
    page?: string
    category?: string
    vendor?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
    inStock?: string
    discount?: string
    rating?: string
    search?: string
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const page = Math.max(1, Number(searchParams.page) || 1)
  const limit = 12 // Products per page

  try {
    // Fetch all necessary data
    const [productsData, categoriesData, vendorsData] = await Promise.all([
      getProducts(),
      getCategories(),
      getVendors(),
    ])

    // Check if any of the fetched data is undefined
    if (!productsData || !categoriesData || !vendorsData) {
      throw new Error("Failed to fetch necessary data")
    }

    const products = productsData
    const categories = categoriesData
    const vendors = vendorsData

    // Create vendor names map
    const vendorNames = vendors.reduce((acc, vendor) => {
      if (vendor && vendor.id && vendor.name) {
        acc[vendor.id] = vendor.name
      }
      return acc
    }, {} as Record<string, string>)

    // Apply filters
    let filteredProducts = [...products]

    if (searchParams.category) {
      filteredProducts = filteredProducts.filter(p => p.categoryId === searchParams.category)
    }

    if (searchParams.vendor) {
      filteredProducts = filteredProducts.filter(p => p.vendorId === searchParams.vendor)
    }

    if (searchParams.minPrice) {
      filteredProducts = filteredProducts.filter(p => p.price >= Number(searchParams.minPrice))
    }

    if (searchParams.maxPrice) {
      filteredProducts = filteredProducts.filter(p => p.price <= Number(searchParams.maxPrice))
    }

    if (searchParams.inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.inventory > 0)
    }

    if (searchParams.discount === 'true') {
      filteredProducts = filteredProducts.filter(p => (p.discount || 0) > 0)
    }

    if (searchParams.rating) {
      filteredProducts = filteredProducts.filter(p => p.rating >= Number(searchParams.rating))
    }

    if (searchParams.search) {
      const search = searchParams.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
      )
    }

    // Apply sorting
    if (searchParams.sort) {
      switch (searchParams.sort) {
        case 'price-asc':
          filteredProducts.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          filteredProducts.sort((a, b) => b.price - a.price)
          break
        case 'rating-desc':
          filteredProducts.sort((a, b) => b.rating - a.rating)
          break
        case 'newest':
          // Assuming newer products have higher IDs
          filteredProducts.sort((a, b) => Number(b.id) - Number(a.id))
          break
      }
    }

    const totalProducts = filteredProducts.length
    const totalPages = Math.ceil(totalProducts / limit)

    // Handle invalid page number
    if (page > totalPages && totalProducts > 0) {
      return (
        <ErrorMessage
          title="Página no encontrada"
          description="La página que buscas no existe."
          actionText="Ir a la primera página"
          actionHref="/productos"
        />
      )
    }

    // Paginate results
    const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Productos</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <Suspense fallback={<div>Cargando filtros...</div>}>
              <ProductFilters
                categories={categories}
                vendors={vendors}
                initialFilters={{
                  category: searchParams.category,
                  vendor: searchParams.vendor,
                  minPrice: searchParams.minPrice,
                  maxPrice: searchParams.maxPrice,
                  sort: searchParams.sort,
                  inStock: searchParams.inStock === 'true',
                  discount: searchParams.discount === 'true',
                  rating: searchParams.rating,
                  search: searchParams.search,
                }}
              />
            </Suspense>
          </div>
          <div className="w-full lg:w-3/4">
            <Suspense fallback={<ProductsLoading />}>
              <ProductGrid products={paginatedProducts} vendorNames={vendorNames} />
              {totalProducts > 0 && (
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  basePath="/productos"
                  totalItems={totalProducts}
                  itemsPerPage={limit}
                />
              )}
              {totalProducts === 0 && (
                <ErrorMessage
                  title="No se encontraron productos"
                  description="No hay productos que coincidan con los filtros seleccionados."
                  actionText="Limpiar filtros"
                  actionHref="/productos"
                />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in ProductsPage:', error)
    return <ErrorMessage 
      title="Error loading products"
      description="There was a problem loading the products. Please try again later."
      actionText="Refresh"
      actionHref="/productos"
    />
  }
}

