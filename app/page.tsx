import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/lib/products'
import { getVendors } from '@/lib/vendors'
import { HeroSection } from "@/components/hero-section"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Store, ShoppingBag, MapPin } from 'lucide-react'
import { ProductCarousel } from '@/components/product-carousel'

export default async function Home() {
  const products = await getProducts()
  const vendors = await getVendors()

  // Obtener los 8 productos más recientes con información del vendedor
const latestProducts = await Promise.all(
products.slice(-8).reverse().map(async (product) => {
    const vendor = vendors.find(v => v.id === product.vendorId);
    return { 
    ...product, 
    vendor: vendor || null
    };
})
);

  return (
    <div>
      <HeroSection />
      
      {/* Sección de Comercios */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Nuestros Comercios</h2>
          <p className="text-center text-muted-foreground mb-8">Conoce a los artesanos y productores que hacen posible nuestra comunidad</p>
          
          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 mb-8 auto-rows-[200px]">
            {/* Featured Large Card - Spans 6 columns and 2 rows */}
            {vendors[0] && (
              <Card className="col-span-full md:col-span-6 md:row-span-2 overflow-hidden">
                <Link href={`/${vendors[0].slug}`}>
                  <CardContent className="p-0 relative group h-full">
                    <div className="absolute inset-0">
                      <Image 
                        src={vendors[0].imageUrl || '/placeholder.svg'} 
                        alt={vendors[0].name} 
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{vendors[0].name}</h3>
                      <p className="text-sm mb-2 line-clamp-2">{vendors[0].description}</p>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{vendors[0].city}</span>
                    </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )}

            {/* Medium Cards - Span 3 columns */}
            {vendors.slice(1, 3).map((vendor) => (
              <Card key={vendor.id} className="col-span-full md:col-span-3 overflow-hidden">
                <Link href={`/${vendor.slug}`}>
                  <CardContent className="p-0 relative group h-full">
                    <div className="absolute inset-0">
                      <Image 
                        src={vendor.imageUrl || '/placeholder.svg'} 
                        alt={vendor.name} 
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{vendor.name}</h3>
                      <p className="text-sm line-clamp-1">{vendor.description}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}

            {/* Wide Card - Spans 6 columns */}
            {vendors[3] && (
              <Card className="col-span-full md:col-span-6 overflow-hidden">
                <Link href={`/${vendors[3].slug}`}>
                  <CardContent className="p-0 relative group h-full">
                    <div className="absolute inset-0">
                      <Image 
                        src={vendors[3].imageUrl || '/placeholder.svg'} 
                        alt={vendors[3].name} 
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{vendors[3].name}</h3>
                      <p className="text-sm line-clamp-2">{vendors[3].description}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )}

            {/* Small Cards - Span 3 columns */}
            {vendors.slice(4, 8).map((vendor) => (
              <Card key={vendor.id} className="col-span-full md:col-span-3 overflow-hidden">
                <Link href={`/${vendor.slug}`}>
                  <CardContent className="p-0 relative group h-full">
                    <div className="absolute inset-0">
                      <Image 
                        src={vendor.imageUrl || '/placeholder.svg'} 
                        alt={vendor.name} 
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{vendor.name}</h3>
                      <p className="text-sm line-clamp-1">{vendor.description}</p>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button variant="default" size="lg" asChild className="group">
              <Link href="/comercios" className="flex items-center">
                <Store className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Explorar todos los comercios
                <span className="sr-only">, ir a la página de comercios</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Productos */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Productos Destacados</h2>
          <p className="text-center text-muted-foreground mb-8">Descubre la calidad y autenticidad de nuestros productos locales</p>
          <ProductCarousel products={latestProducts} />
          <div className="text-center mt-8">
            <Button variant="default" size="lg" asChild className="group">
              <Link href="/productos" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Ver todos los productos
                <span className="sr-only">, ir a la página de productos</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Fomenta el Comercio Local</h2>
          <p className="text-center text-muted-foreground mb-8">Apoya a tu comunidad y disfruta de productos de calidad</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Productos de Proximidad</h3>
                <p className="text-muted-foreground">Reduce tu huella de carbono comprando productos locales y de temporada</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Apoyo a la Economía Local</h3>
                <p className="text-muted-foreground">Cada compra contribuye al crecimiento y desarrollo de nuestra comunidad</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Tradición y Calidad</h3>
                <p className="text-muted-foreground">Descubre productos artesanales elaborados con técnicas tradicionales</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestro Valor Añadido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Microsites Personalizados</h3>
                <p className="text-muted-foreground">Cada comercio tiene su espacio único dentro de Navarron para promover su identidad.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Gestión Autónoma e Intuitiva</h3>
                <p className="text-muted-foreground">Control total de tu catálogo, inventario y precios desde un panel sencillo.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Soporte Técnico Continuo</h3>
                <p className="text-muted-foreground">Te acompañamos en tu proceso de digitalización con asistencia y formación.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección "Únete a Nuestra Comunidad" */}
      <section className="bg-black py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Únete a Nuestra Comunidad</h2>
          <p className="text-gray-300 mb-8">Descubre eventos locales, recetas tradicionales y más</p>
          <Button size="lg" asChild className="bg-white text-black hover:bg-gray-200">
            <Link href="/suscribirse">Suscríbete a nuestro boletín</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

