'use client'

import { useEffect } from 'react'
import { ErrorMessage } from '@/components/error-message'

export default function ComerciosError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Comercios error:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage
        title="Error al cargar los comercios"
        description="Ha ocurrido un error al cargar la lista de comercios. Por favor, inténtalo de nuevo."
        actionText="Intentar de nuevo"
        onAction={reset}
      />
    </div>
  )
}

