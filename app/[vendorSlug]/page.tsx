import { notFound } from 'next/navigation'
import { getVendorBySlug } from '@/lib/vendors'
import { getProductsByVendor } from '@/lib/products'
import { VendorProfile } from '@/components/vendor-profile'
import ComerciosPage from '../comercios/page'
import ProductosPage from '../productos/page'
import { ErrorMessage } from '@/components/error-message'

export default async function VendorPage({ params }: { params: { vendorSlug: string } }) {
  // Handle special routes
  if (params.vendorSlug === 'comercios') {
    return <ComerciosPage searchParams={{}} />
  }

  if (params.vendorSlug === 'productos') {
    return <ProductosPage searchParams={{}} />
  }

  try {
    const vendor = await getVendorBySlug(params.vendorSlug)

    if (!vendor) {
      notFound()
    }

    // Fetch products for this vendor
    const { products, totalPages } = await getProductsByVendor(vendor.id, 1, 12) // Assuming 12 products per page

    // Add vendor slug to each product
    const productsWithVendor = products.map(product => ({
      ...product,
      vendor: { ...product.vendor, slug: vendor.slug }
    }))

    return (
      <VendorProfile 
        vendor={vendor} 
        products={productsWithVendor} 
        currentPage={1} 
        totalPages={totalPages} 
      />
    )
  } catch (error) {
    console.error('Error in VendorPage:', error)
    return (
      <ErrorMessage
        title="Error al cargar la página del comercio"
        description="Lo sentimos, ha ocurrido un error al cargar la información del comercio. Por favor, inténtalo de nuevo más tarde."
        actionText="Volver a la página principal"
        actionHref="/"
      />
    )
  }
}

