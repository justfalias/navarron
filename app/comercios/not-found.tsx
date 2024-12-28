import { ErrorMessage } from '@/components/error-message'

export default function ComerciosNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorMessage
        title="Comercio no encontrado"
        description="Lo sentimos, el comercio que buscas no existe o ha sido eliminado."
        actionText="Ver todos los comercios"
        actionHref="/comercios"
      />
    </div>
  )
}

