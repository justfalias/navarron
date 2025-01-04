import { notFound } from 'next/navigation'
import { getVendorBySlug } from '@/lib/vendors'
import { getProductsByVendor } from '@/lib/products'
import { VendorProfile } from '@/components/vendor-profile'
import ComerciosPage from '../comercios/page'
import ProductosPage from '../productos/page'
import { ErrorMessage } from '@/components/error-message'

type Params = { vendorSlug: string }

export default async function VendorPage({ params }: { params: Promise<Params> }) {
const { vendorSlug } = await params

if (vendorSlug === 'comercios') {
    return (
    <ComerciosPage
        params={{}}
        searchParams={{
        categoria: undefined,
        subcategoria: undefined,
        area: undefined,
        page: undefined
        }}
    />
    )
}

if (vendorSlug === 'productos') {
    return <ProductosPage searchParams={Promise.resolve({})} />
}

try {
    const vendor = await getVendorBySlug(vendorSlug)

    if (!vendor) {
    notFound()
    }

    const { products, totalPages } = await getProductsByVendor(vendor.id, 1, 12)

    const productsWithVendor = products.map(product => ({
    ...product,
    vendor: {
        slug: vendor.slug
    }
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
