import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '@/lib/products'
import { getCategories } from '@/lib/categories'
import { getVendors } from '@/lib/vendors'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const search = searchParams.get('search') || ''
  const minPrice = Number(searchParams.get('minPrice')) || 0
  const maxPrice = Number(searchParams.get('maxPrice')) || Infinity

  const [products, categories, vendors] = await Promise.all([
    getProducts(),
    getCategories(),
    getVendors(),
  ])

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    product.price >= minPrice &&
    product.price <= maxPrice
  )

  const categoryOptions = categories.map(category => ({
    id: category.id,
    name: category.name,
    count: filteredProducts.filter(p => p.categoryId === category.id).length,
  }))

  const vendorOptions = vendors.map(vendor => ({
    id: vendor.id,
    name: vendor.name,
    count: filteredProducts.filter(p => p.vendorId === vendor.id).length,
  }))

  const filterSections = [
    { id: 'categories', name: 'Categorías', options: categoryOptions },
    { id: 'vendors', name: 'Comercios', options: vendorOptions },
  ]

  return NextResponse.json(filterSections)
}

