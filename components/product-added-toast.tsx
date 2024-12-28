import * as React from "react"
import { Toast } from "@/components/ui/toast"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface ProductAddedToastProps {
  productName: string
  productImage: string
  onOpenCart: () => void
}

export function ProductAddedToast({ productName, productImage, onOpenCart }: ProductAddedToastProps) {
  const { dismiss } = useToast()

  return (
    <Toast className="w-auto max-w-md border-none p-4 cursor-pointer" onClick={() => dismiss()}>
      <div className="flex items-center space-x-3">
        <div className="relative w-12 h-12 flex-shrink-0">
          <Image
            src={productImage}
            alt={productName}
            layout="fill"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <div className="flex-grow">
          <p className="text-sm font-medium">Producto añadido al carrito</p>
          {/* Removed default description to prevent empty toast boxes */}
          {/* <p className="text-sm text-muted-foreground truncate">{productName}</p> */}
        </div>
        <Button variant="ghost" size="sm" className="ml-auto" onClick={(e) => {
          e.stopPropagation();
          onOpenCart();
          dismiss();
        }}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Carrito
        </Button>
      </div>
    </Toast>
  )
}

