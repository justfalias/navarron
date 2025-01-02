import { Suspense, lazy } from 'react'
import { notFound } from 'next/navigation'
import { PaginationControls } from "@/components/pagination-controls"
import { ErrorMessage } from '@/components/error-message'

const SearchResults = lazy(() => import('@/components/search-results').then(mod => ({ default: mod.SearchResults })))

async function getSearchResults(query: string, page: number = 1, limit: number = 10) {
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`, { 
      next: { revalidate: 0 },
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Search request failed: ${res.status} ${res.statusText}`)
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format: expected JSON')
    }

    const data = await res.json()
    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.error('Search fetch error:', error)
    throw new Error(`Failed to fetch search results: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export default async function SearchResultsPage({ 
  searchParams 
}: { 
  searchParams: { q: string; page?: string } 
}) {
  const query = searchParams.q
  const page = parseInt(searchParams.page || '1', 10)

  if (!query) {
    notFound()
  }

  try {
    const { results, totalPages, totalResults } = await getSearchResults(query, page)

    if (!results || results.length === 0) {
      return (
        <ErrorMessage
          title="No se encontraron resultados"
          description={`No encontramos resultados para &quot;${query}&quot;. Intenta con otros términos de búsqueda.`}
          actionText="Volver al inicio"
          actionHref="/"
        />
      )
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resultados de búsqueda para &quot;{query}&quot;</h1>
        <p className="mb-4">Se encontraron {totalResults} resultados</p>
        
        <Suspense fallback={<div>Cargando resultados...</div>}>
          <SearchResults results={results} />
        </Suspense>

        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          basePath={`/busqueda?q=${encodeURIComponent(query)}`}
        />
      </div>
    )
  } catch (error) {
    console.error('Search page error:', error)
    return (
      <ErrorMessage
        title="Error en la búsqueda"
        description={`Lo sentimos, ha ocurrido un error al procesar tu búsqueda: ${error instanceof Error ? error.message : 'Error desconocido'}. Por favor, inténtalo de nuevo.`}
        actionText="Volver al inicio"
        actionHref="/"
      />
    )
  }
}

