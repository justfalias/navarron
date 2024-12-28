'use client'

import { useEffect } from 'react'
import { ErrorMessage } from '@/components/error-message'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <ErrorMessage
      title="Algo salió mal"
      description={error.message || 'Ha ocurrido un error inesperado'}
      actionText="Intentar de nuevo"
      onAction={reset}
    />
  )
}

