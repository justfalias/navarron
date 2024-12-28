import { ErrorMessage } from '@/components/error-message'

export default function ProductsNotFound() {
  return (
    <ErrorMessage
      title="Productos no encontrados"
      description="Lo sentimos, los productos que buscas no existen o han sido eliminados."
      actionText="Ver todos los productos"
      actionHref="/productos"
    />
  )
}

