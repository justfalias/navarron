import { NextRequest, NextResponse } from 'next/server'
import { getProducts } from '@/lib/products'
import { getVendors } from '@/lib/vendors'
import { getCategories } from '@/lib/categories'

export async function GET(request: NextRequest) {
  const headers = {
    'Content-Type': 'application/json',
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '10', 10)

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400, headers }
      )
    }

    const [products, vendors, categories] = await Promise.all([
      getProducts(),
      getVendors(),
      getCategories()
    ])

    const normalizedQuery = query.toLowerCase()

    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery)
    )

    const filteredVendors = vendors.filter(vendor =>
      vendor.name.toLowerCase().includes(normalizedQuery) ||
      vendor.description.toLowerCase().includes(normalizedQuery)
    )

    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(normalizedQuery) ||
      category.description.toLowerCase().includes(normalizedQuery)
    )

    const allResults = [
      ...filteredProducts.map(p => ({ ...p, type: 'product' })),
      ...filteredVendors.map(v => ({ ...v, type: 'vendor' })),
      ...filteredCategories.map(c => ({ ...c, type: 'category' }))
    ]

    const totalResults = allResults.length
    const totalPages = Math.ceil(totalResults / limit)
    const paginatedResults = allResults.slice((page - 1) * limit, page * limit)

    return NextResponse.json({
      results: paginatedResults,
      page,
      totalPages,
      totalResults
    }, { headers })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    )
  }
}

