'use client'

import { useEffect } from 'react'
import { ErrorMessage } from '@/components/error-message'

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Products error:', error)
  }, [error])

  return (
    <ErrorMessage
      title="Error al cargar los productos"
      description="Ha ocurrido un error al cargar la lista de productos. Por favor, inténtalo de nuevo."
      actionText="Intentar de nuevo"
      onAction={reset}
    />
  )
}

