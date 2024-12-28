import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  basePath: string
  totalItems: number
  itemsPerPage: number
}

export function PaginationControls({ currentPage, totalPages, basePath, totalItems, itemsPerPage }: PaginationControlsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - halfVisible, 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      <div className="flex justify-center items-center space-x-2">
        {currentPage > 1 && (
          <Button
            variant="outline"
            size="icon"
            asChild
          >
            <Link href={`${basePath}?page=${currentPage - 1}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Link>
          </Button>
        )}
        
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            size="icon"
            asChild
          >
            <Link href={`${basePath}?page=${pageNumber}`}>
              {pageNumber}
            </Link>
          </Button>
        ))}
        
        {currentPage < totalPages && (
          <Button
            variant="outline"
            size="icon"
            asChild
          >
            <Link href={`${basePath}?page=${currentPage + 1}`}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Link>
          </Button>
        )}
      </div>
      
      <p className="text-sm text-muted-foreground">
        Mostrando comercios {startItem} a {endItem} de {totalItems}
      </p>
    </div>
  )
}

