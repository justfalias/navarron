import Image from 'next/image'
import { Vendor } from '@/lib/vendors'
import { Product } from '@/lib/products'
import { AnimatedProductCard } from '@/components/animated-product-card'
import { PaginationControls } from '@/components/pagination-controls'
import { ErrorMessage } from '@/components/error-message'

interface VendorProfileProps {
  vendor: Vendor
  products: (Product & { vendor: { slug: string } })[]
  currentPage: number
  totalPages: number
}

export function VendorProfile({ vendor, products, currentPage, totalPages }: VendorProfileProps) {
  if (!vendor) {
    return (
      <ErrorMessage
        title="Comercio no encontrado"
        description="Lo sentimos, no se pudo encontrar la información del comercio."
        actionText="Volver a la página principal"
        actionHref="/"
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Image
          src={vendor.heroImageUrl || '/vendor-placeholder.jpg'}
          alt={vendor.name}
          width={1200}
          height={400}
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4">{vendor.name}</h1>
      <p className="text-lg mb-6">{vendor.longDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <AnimatedProductCard
              key={product.id}
              product={product}
              vendorName={vendor.name}
              showAddToCart={true}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No hay productos disponibles para este comercio.</p>
        )}
      </div>
      {totalPages > 1 && (
        <PaginationControls 
          currentPage={currentPage} 
          totalPages={totalPages} 
          basePath={`/${vendor.slug}`} 
        />
      )}
    </div>
  )
}

