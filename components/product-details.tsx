'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from '@/components/product-gallery'
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductCarousel } from '@/components/product-carousel'
import { Store, Check, ShoppingCart, Heart } from 'lucide-react'
import { Product } from '@/lib/products'
import { Vendor } from '@/lib/vendors'
import ContactModal from './contact-modal'

interface ProductDetailsProps {
  product: Product
  vendor: Vendor
  relatedProducts: (Product & { vendor: { id: string; name: string; slug: string } })[]
}

export default function ProductDetails({ product, vendor, relatedProducts }: ProductDetailsProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const discountedPrice = product.price * (1 - (product.discount || 0) / 100)

  // Ensure product.images is an array and has at least one image
  const productImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.coverImage || '/placeholder.svg']

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={productImages.map(img => ({ src: img, alt: product.name }))} />
        <div className="flex flex-col h-full">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="mb-4">
              {product.discount ? (
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-red-600">{discountedPrice.toFixed(2)}€</span>
                  <span className="text-xl text-muted-foreground line-through">{product.price.toFixed(2)}€</span>
                  <Badge variant="destructive">-{product.discount}%</Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold">{product.price.toFixed(2)}€</span>
              )}
            </div>
            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>
          <div className="mt-auto pt-6 flex justify-between items-center">
            <AddToCartButton 
              product={product} 
              vendorSlug={vendor.slug}
              variant="default"
              size="lg"
              className="flex-1 mr-2"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Añadir al carrito
            </AddToCartButton>
            <Button variant="outline" size="lg" className="aspect-square">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-12 p-4 bg-muted rounded-lg flex items-start space-x-4">
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-2">
            <Store className="h-5 w-5" />
            <h2 className="text-xl font-semibold">{vendor.name}</h2>
          </div>
          <p className="text-muted-foreground mb-4">{vendor.description}</p>
          <Button variant="outline" onClick={() => setIsContactModalOpen(true)}>
            Contactar
          </Button>
          <Badge variant="secondary" className="ml-4">{product.category}</Badge>
        </div>
      </div>

      {product.features && product.features.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Características del Producto</h2>
          <ul className="space-y-2">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Productos relacionados</h2>
          <ProductCarousel products={relatedProducts} />
        </div>
      )}

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        vendor={vendor}
      />
    </div>
  )
}

