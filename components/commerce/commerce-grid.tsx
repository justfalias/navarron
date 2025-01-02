'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { PaginationControls } from "@/components/pagination-controls"
import { Skeleton } from "@/components/ui/skeleton"
import type { Vendor } from '@/lib/vendors'
import type { Category } from '@/lib/categories'
import type { Subcategory } from '@/lib/subcategories'
import type { Area } from '@/lib/areas'

interface CommerceGridProps {
  initialVendors: Vendor[]
  currentPage: number
  itemsPerPage: number
  categoryFilter?: string
  subcategoryFilter?: string | string[]
  areaFilter?: string
  categories: Category[]
  subcategories: Subcategory[]
  areas: Area[]
}

export function CommerceGrid({
  initialVendors,
  currentPage,
  itemsPerPage,
  categoryFilter: initialCategoryFilter,
  subcategoryFilter: initialSubcategoryFilter,
  areaFilter: initialAreaFilter,
  categories,
  subcategories,
  areas
}: CommerceGridProps) {
  const searchParams = useSearchParams()
  
  const categoryFilter = searchParams.get('categoria') || initialCategoryFilter
  const subcategoryFilter = searchParams.get('subcategoria') || initialSubcategoryFilter
  const areaFilter = searchParams.get('area') || initialAreaFilter
  const page = Number(searchParams.get('page')) || currentPage

  const { data: filteredVendors, isLoading } = useQuery({
    queryKey: ['vendors', categoryFilter, subcategoryFilter, areaFilter],
    queryFn: () => filterVendors(initialVendors, categoryFilter, subcategoryFilter, areaFilter, categories, subcategories, areas),
    initialData: initialVendors,
  })

  // Calculate pagination
  const totalVendors = filteredVendors.length
  const totalPages = Math.ceil(totalVendors / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentVendors = filteredVendors.slice(startIndex, endIndex)

  const VendorCard = ({ vendor }: { vendor: Vendor }) => (
    <Card className="overflow-hidden group">
      <Link href={`/${vendor.slug}`}>
        <CardContent className="p-0">
          <div className="relative h-48">
            <Image 
              src={vendor.imageUrl} 
              alt={vendor.name} 
              layout="fill"
              objectFit="cover"
              className="transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{vendor.name}</h2>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {vendor.description}
            </p>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{vendor.city}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>Desde {vendor.foundedYear}</span>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )

  const SkeletonCard = () => (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <Skeleton className="h-48 w-full" />
        <div className="p-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 min-h-[800px]">
        {isLoading
          ? Array(itemsPerPage).fill(0).map((_, index) => <SkeletonCard key={index} />)
          : currentVendors.length > 0
            ? currentVendors.map((vendor) => <VendorCard key={vendor.id} vendor={vendor} />)
            : <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-semibold mb-2">No se encontraron comercios</h3>
                <p className="text-muted-foreground">
                  Prueba a cambiar los filtros de búsqueda
                </p>
              </div>
        }
      </div>

      {!isLoading && totalVendors > itemsPerPage && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          basePath="/comercios"
          totalItems={totalVendors}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  )
}

function filterVendors(
  vendors: Vendor[],
  categoryFilter: string | undefined,
  subcategoryFilter: string | string[] | undefined,
  areaFilter: string | undefined,
  categories: Category[],
  subcategories: Subcategory[],
  areas: Area[]
): Vendor[] {
  return vendors.filter(vendor => {
    if (categoryFilter || subcategoryFilter) {
      const vendorSubcategoryIds = vendor.subcategoryIds || []
      const subcategoryFilters = Array.isArray(subcategoryFilter) 
        ? subcategoryFilter 
        : subcategoryFilter ? [subcategoryFilter] : []
      
      const subcategoryIds = subcategoryFilters.map(slug => {
        const subcategory = subcategories.find(s => s.slug === slug)
        return subcategory?.id
      })

      if (subcategoryIds.length > 0) {
        if (!vendorSubcategoryIds.some(id => subcategoryIds.includes(id))) {
          return false
        }
      } else if (categoryFilter) {
        const category = categories.find(c => c.slug === categoryFilter)
        if (category) {
          const categorySubcategoryIds = subcategories
            .filter(sub => sub.categoryId === category.id)
            .map(sub => sub.id)
          if (!vendorSubcategoryIds.some(id => categorySubcategoryIds.includes(id))) {
            return false
          }
        }
      }
    }

    if (areaFilter) {
      const area = areas.find(a => a.slug === areaFilter)
      if (!area || vendor.areaId !== area.id) {
        return false
      }
    }

    return true
  })
}

