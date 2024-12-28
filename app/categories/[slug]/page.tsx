import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getCategories } from '@/lib/categories'
import { getProducts } from '@/lib/products'
import { getComercios } from '@/lib/comercios'
import { AnimatedProductCard } from "@/components/animated-product-card"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const categories = await getCategories()
  const category = categories.find(c => c.slug === params.slug)

  if (!category) {
    notFound()
  }

  const products = await getProducts()
  const comercios = await getComercios()
  const categoryProducts = products.filter(p => p.categoryId === category.id)

  const getComercioName = (comercioId: string) => {
    const comercio = comercios.find(c => c.id === comercioId)
    return comercio ? comercio.name : 'Comercio desconocido'
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src={category.imageUrl}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{category.name}</h1>
          <p className="text-xl">{category.description}</p>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Productos en {category.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <AnimatedProductCard
              key={product.id}
              product={product}
              vendorName={getComercioName(product.vendorId)}
              showAddToCart={true}
            />
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <p className="text-center text-muted-foreground">No hay productos disponibles en esta categoría actualmente.</p>
        )}
      </div>
    </div>
  )
}

