'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { StarRating } from '@/components/star-rating'

interface Review {
  id: string
  author: string
  rating: number
  content: string
  date: string
}

interface ReviewCarouselProps {
  productId: string
}

export function ReviewCarousel({ productId }: ReviewCarouselProps) {
  // En una implementación real, aquí cargaríamos las reseñas del producto
  // Por ahora, usaremos datos de ejemplo
  const reviews: Review[] = [
    { id: '1', author: 'María G.', rating: 5, content: 'Excelente producto, superó mis expectativas.', date: '2023-05-15' },
    { id: '2', author: 'Juan L.', rating: 4, content: 'Muy buena calidad, lo recomiendo.', date: '2023-06-02' },
    { id: '3', author: 'Ana R.', rating: 5, content: 'Increíble relación calidad-precio.', date: '2023-06-20' },
    { id: '4', author: 'Carlos M.', rating: 4, content: 'Buen producto, entrega rápida.', date: '2023-07-05' },
  ]

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm mx-auto"
    >
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-start p-6">
                  <div className="flex items-center justify-between w-full mb-2">
                    <StarRating rating={review.rating} />
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <h3 className="font-semibold">{review.author}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{review.content}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

