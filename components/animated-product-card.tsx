'use client'

import * as React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Store, Heart, ShoppingCart } from 'lucide-react'

interface AnimatedProductCardProps {
  product: Product & { 
    vendor?: { 
      slug: string 
    } 
  }
  vendorName: string
  showAddToCart?: boolean
}

export function AnimatedProductCard({ product, vendorName, showAddToCart = true }: AnimatedProductCardProps) {
  if (!product) {
    return null;
  }

  const price = product.price ?? 0;
  const discount = product.discount ?? 0;
  const discountedPrice = price * (1 - discount / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <Link href={product.vendor?.slug ? `/${product.vendor.slug}/${product.slug}` : '#'} className="block hover:no-underline">
          <CardHeader className="p-0">
            <div className="relative h-48 w-full">
              <Image 
                src={product.coverImage || '/placeholder.svg'}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform hover:scale-105"
              />
              {product.discount > 0 && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  -{product.discount}%
                </Badge>
              )}
              {product.inventory === 0 && (
                <Badge className="absolute bottom-2 left-2 bg-gray-500">
                  Agotado
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Store className="h-4 w-4 mr-1" />
              <span>{vendorName}</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <div className="flex items-baseline">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold mr-2">
                    {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                  </span>
                  <span className="text-sm line-through text-muted-foreground">
                    {product.price.toFixed(2)}€
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">{product.price.toFixed(2)}€</span>
              )}
            </div>
            {product.discount > 0 && (
              <Badge className="mt-2 bg-red-500">
                -{product.discount}%
              </Badge>
            )}
            {product.inventory > 0 && product.inventory <= 5 && (
              <p className="text-sm text-yellow-600 mt-2">
                ¡Solo quedan {product.inventory} unidades!
              </p>
            )}
          </CardContent>
        </Link>
        <CardFooter className="p-4 flex justify-between items-center">
          {showAddToCart && (
            <AddToCartButton 
              product={product} 
              vendorSlug={product.vendor?.slug || ''} 
              variant="outline" 
              size="sm"
              disabled={!product.vendor?.slug}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.inventory > 0 ? 'Añadir' : 'Agotado'}
            </AddToCartButton>
          )}
          <Button variant="outline" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

