'use client'

import * as React from "react"
import Image from 'next/image'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/cart-provider"
import Link from 'next/link'
import { getVendors } from "@/lib/vendors"

export function CartPreview() {
  const { items, removeFromCart, isCartOpen, setIsCartOpen } = useCart()
  const [vendors, setVendors] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const fetchVendors = async () => {
      const vendorsData = await getVendors()
      const vendorsMap = vendorsData.reduce((acc, comercio) => {
        acc[comercio.id] = comercio.name
        return acc
      }, {} as Record<string, string>)
      setVendors(vendorsMap)
    }
    fetchVendors()
  }, [])

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = []
    }
    acc[item.vendorId].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const totalPrice = items.reduce((sum, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100)
    return sum + discountedPrice * item.quantity
  }, 0)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Carrito</span>
          <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {totalItems}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Tu Carrito</SheetTitle>
          <SheetDescription>
            Tienes {totalItems} producto{totalItems !== 1 ? 's' : ''} en tu carrito
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-280px)] mt-4">
          {Object.entries(groupedItems).map(([vendorId, vendorItems]) => (
            <div key={vendorId} className="mb-6">
              <h3 className="font-semibold mb-2">{vendors[vendorId] || 'Comercio'}</h3>
              {vendorItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md">
                    <Image 
                      src={item.coverImage} 
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                    <p className="text-sm">
                      {item.discount ? (
                        <>
                          <span className="line-through text-muted-foreground">{item.price.toFixed(2)}€</span>
                          <span className="text-red-600 ml-2">
                            {(item.price * (1 - item.discount / 100)).toFixed(2)}€
                          </span>
                        </>
                      ) : (
                        <span>{item.price.toFixed(2)}€</span>
                      )}
                      {item.quantity > 1 && ` × ${item.quantity}`}
                    </p>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </Button>
                  </SheetClose>
                </div>
              ))}
              <div className="flex justify-between text-sm font-semibold mt-2">
                <span>Subtotal:</span>
                <span>{vendorItems.reduce((sum, item) => {
                  const discountedPrice = item.price * (1 - (item.discount || 0) / 100)
                  return sum + discountedPrice * item.quantity
                }, 0).toFixed(2)}€</span>
              </div>
              <Separator className="my-4" />
            </div>
          ))}
        </ScrollArea>
        <div className="space-y-4 mt-4">
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)}€</span>
          </div>
          <Button className="w-full" asChild>
            <Link href="/carrito">Ir al Carrito</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

