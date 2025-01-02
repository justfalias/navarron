'use client'

import { useEffect, useState } from 'react'
import type { Product } from '@/lib/products'
import type { Category } from '@/lib/categories'
import type { Subcategory } from '@/lib/subcategories'
import type { Vendor } from '@/lib/vendors'
import type { Area } from '@/lib/areas'; // Import Area type
import { AnimatedProductCard } from "@/components/animated-product-card"
import { PaginationControls } from "@/components/pagination-controls"
import { Loader2 } from 'lucide-react'

interface ProductGridProps {
  products: (Product & { vendor?: Vendor })[],
  currentPage: number
  itemsPerPage: number
  categoryFilter?: string
  subcategoryFilter?: string | string[]
  vendorFilter?: string
  areaFilter?: string
  categories: Category[]
  subcategories: Subcategory[]
  vendors: Vendor[]
  areas: Area[]
}

export function ProductGrid({ 
  products: initialProducts, 
  currentPage, 
  itemsPerPage,
  categoryFilter,
  subcategoryFilter,
  vendorFilter,
  areaFilter,
  categories,
  subcategories,
  vendors,
  areas
}: ProductGridProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const filtered = initialProducts.filter(product => {
      // Check subcategory filter (which can be a single value or an array)
      if (subcategoryFilter) {
        const subcategoryFilters = Array.isArray(subcategoryFilter) 
          ? subcategoryFilter 
          : [subcategoryFilter]
        
        const subcategoryIds = subcategoryFilters.map(slug => {
          const subcategory = subcategories.find(s => s.slug === slug)
          return subcategory?.id
        })

        if (!subcategoryIds.includes(product.subcategoryId)) {
          return false
        }
      }
      // If category filter is present but no subcategory filter,
      // filter by all subcategories of that category
      else if (categoryFilter) {
        const category = categories.find(c => c.slug === categoryFilter)
        if (category) {
          const categorySubcategoryIds = subcategories
            .filter(sub => sub.categoryId === category.id)
            .map(sub => sub.id)
          if (!categorySubcategoryIds.includes(product.subcategoryId)) {
            return false
          }
        }
      }

      // Check vendor filter
      if (vendorFilter) {
        const vendor = vendors.find(v => v.slug === vendorFilter)
        if (!vendor || product.vendorId !== vendor.id) {
          return false
        }
      }

      // Check area filter
      if (areaFilter) {
        const vendor = vendors.find(v => v.id === product.vendorId)
        if (!vendor || vendor.areaId !== areaFilter) {
          return false
        }
      }

      return true
    })

    setFilteredProducts(filtered)
    setIsLoading(false)
  }, [initialProducts, categoryFilter, subcategoryFilter, vendorFilter, areaFilter, categories, subcategories, vendors, areas])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // Calculate pagination
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  if (currentProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">
          Prueba a cambiar los filtros de búsqueda
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) => {
          const vendor = vendors.find(v => v.id === product.vendorId)
          return (
            <AnimatedProductCard
              key={product.id}
              product={product}
              vendorName={vendor?.name || 'Comercio'}
            />
          )
        })}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/tienda"
        totalItems={totalProducts}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}

