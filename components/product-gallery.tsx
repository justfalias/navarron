'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion, AnimatePresence } from 'framer-motion'

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Ensure we have valid images
  const validImages = images?.length > 0 ? images : [
    { 
      src: '/placeholder.svg?height=600&width=600',
      alt: 'Product image placeholder'
    }
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImage((prev) => (prev > 0 ? prev - 1 : validImages.length - 1))
      } else if (e.key === 'ArrowRight') {
        setCurrentImage((prev) => (prev < validImages.length - 1 ? prev + 1 : 0))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [validImages.length])

  const handleThumbnailClick = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square"
          >
            <Image
              src={validImages[currentImage].src}
              alt={validImages[currentImage].alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>
        <button
          onClick={() => setCurrentImage((prev) => (prev > 0 ? prev - 1 : validImages.length - 1))}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
          aria-label="Previous image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentImage((prev) => (prev < validImages.length - 1 ? prev + 1 : 0))}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
          aria-label="Next image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {validImages.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={cn(
              "relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0",
              index === currentImage && "ring-2 ring-primary"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

