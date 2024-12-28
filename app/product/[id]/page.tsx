import { notFound } from 'next/navigation'
import { getProducts } from '@/lib/products'
import { getComercios } from '@/lib/comercios'
import ProductDetails from '@/components/product-details'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getProducts()
  const product = products.find(p => p.id === params.id)

  if (!product) {
    notFound()
  }

  const comercios = await getComercios()
  const comercio = comercios.find(c => c.id === product.vendorId)

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} comercio={comercio} />
    </div>
  )
}

