'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AnimatedProductCard } from "@/components/animated-product-card"
import type { Product } from "@/lib/products"
import type { Vendor } from "@/lib/vendors"
import { cn } from "@/lib/utils"

interface ProductCarouselProps {
  products: (Product & { vendor: Vendor | null })[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  return (
    <div className="relative px-4 py-2">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem key={product.id} className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              {product.vendor && (
                <AnimatedProductCard
                  product={{
                    ...product,
                    coverImage: product.coverImage || '/placeholder.svg',
                    discount: product.discount // Ensure discount is passed
                  }}
                  vendorName={product.vendor.name}
                  showAddToCart={true}
                />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2" />
        <CarouselNext className="right-0 translate-x-1/2" />
      </Carousel>
    </div>
  )
}

