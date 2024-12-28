'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { useCart } from '@/components/cart-provider'
import { toast } from "@/hooks/use-toast"
import { Product } from '@/lib/products'
import { ProductAddedToast } from "@/components/product-added-toast"
import { ShoppingCart, Plus } from 'lucide-react'

interface AddToCartButtonProps {
  product: Product
  vendorSlug: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
  children?: React.ReactNode
}

export function AddToCartButton({ product, vendorSlug, variant = 'outline', size = 'icon', className, children }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { addToCart, setIsCartOpen } = useCart()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      if (!vendorSlug) {
        throw new Error('Vendor slug is undefined')
      }
      await addToCart(vendorSlug, product.slug, 1)
      toast({
        action: (
          <ProductAddedToast
            productName={product.name}
            productImage={product.coverImage}
            onOpenCart={() => setIsCartOpen(true)}
          />
        ),
        duration: 5000,
        description: null,
      })
    } catch (error) {
      console.error('Error adding product to cart:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Error desconocido al añadir el producto',
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleAddToCart} 
      disabled={isLoading || product.inventory === 0}
      className={className}
    >
      {children || (
        <>
          <ShoppingCart className="h-4 w-4" />
          <Plus className="h-3 w-3 absolute top-0 right-0" />
        </>
      )}
    </Button>
  )
}

