import { notFound } from 'next/navigation'
import { getVendorBySlug } from '@/lib/vendors'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import ProductDetails from '@/components/product-details'
import { ErrorMessage } from '@/components/error-message'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

// Define the correct types for Next.js App Router page props
type PageProps = {
  params: {
    vendorSlug: string
    productSlug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductPage({
  params,
  searchParams,
}: PageProps) {
  try {
    const vendor = await getVendorBySlug(decodeURIComponent(params.vendorSlug))

    if (!vendor) {
      notFound()
    }

    const product = await getProductBySlug(decodeURIComponent(params.productSlug), vendor.id)

    if (!product) {
      return (
        <ErrorMessage
          title="Producto no encontrado"
          description="Lo sentimos, el producto que buscas no está disponible."
          actionText="Ver otros productos"
          actionHref={`/${vendor.slug}`}
        />
      )
    }

    // Fetch related products
    const relatedProducts = await getRelatedProducts(product.id, vendor.id)

    // Map the vendor info to each related product
    const relatedProductsWithVendor = relatedProducts.map(relatedProduct => ({
      ...relatedProduct,
      vendor: {
        id: vendor.id,
        name: vendor.name,
        slug: vendor.slug
      }
    }))

    return (
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails 
          product={product} 
          vendor={vendor} 
          relatedProducts={relatedProductsWithVendor}
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error in ProductPage:', error)
    return (
      <ErrorMessage
        title="Error al cargar el producto"
        description="Lo sentimos, ha ocurrido un error al cargar el producto. Por favor, inténtalo de nuevo más tarde."
        actionText="Volver al inicio"
        actionHref="/"
      />
    )
  }
}

function ProductDetailsSkeleton(): JSX.Element {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Skeleton className="h-[400px] w-full" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

