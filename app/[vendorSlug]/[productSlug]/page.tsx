import { notFound } from 'next/navigation'
import { getVendorBySlug } from '@/lib/vendors'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'
import ProductDetails from '@/components/product-details'
import { ErrorMessage } from '@/components/error-message'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function ProductDetailsSkeleton() {
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

type Params = Promise<{ vendorSlug: string; productSlug: string }>

export default async function Page({
  params
}: {
  params: Params
}) {
  const { vendorSlug, productSlug } = await params
  let decodedVendorSlug, decodedProductSlug
  try {
    decodedVendorSlug = decodeURIComponent(vendorSlug)
    decodedProductSlug = decodeURIComponent(productSlug)
  } catch (error) {
    console.error('Error decoding URI components:', error)
    notFound()
    return
  }

  try {
    const vendor = await getVendorBySlug(decodedVendorSlug)

    if (!vendor) {
      notFound()
    }

    const product = await getProductBySlug(decodedProductSlug, vendor.id)

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

    const relatedProductsWithVendor = await getRelatedProducts(product.id, vendor.id).then((relatedProducts) => 
      relatedProducts.map((relatedProduct) => ({
        ...relatedProduct,
        vendor,
      }))
    )

    return (
      <div className="container mx-auto">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails 
            product={product} 
            vendor={vendor} 
            relatedProducts={relatedProductsWithVendor}
          />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Error fetching vendor or product:', error)
    notFound()
  }
}