import { ErrorMessage } from '@/components/error-message'

export default function NotFound() {
  return (
    <ErrorMessage
      title="404 - Página no encontrada"
      description="Lo sentimos, la página que buscas no existe o ha sido movida."
      actionText="Volver al inicio"
      actionHref="/"
    />
  )
}

