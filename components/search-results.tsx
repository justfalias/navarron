import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  id: string
  type: string
  name: string
  slug: string
  description: string
  thumbnailUrl?: string
}

interface SearchResultsProps {
  results: SearchResult[]
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {results.map((result) => (
        <Card key={`${result.type}-${result.id}`}>
          <Link href={result.type === 'category' ? `/categorias/${result.slug}` : `/${result.slug}`}>
            <CardContent className="p-4">
              {result.thumbnailUrl && (
                <div className="mb-4">
                  <Image
                    src={result.thumbnailUrl || '/placeholder.svg'}
                    alt={result.name}
                    width={300}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
              )}
              <h2 className="text-xl font-semibold mb-2">{result.name}</h2>
              <p className="text-sm text-gray-600 mb-2">{result.type}</p>
              <p className="text-sm">{result.description}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  )
}

