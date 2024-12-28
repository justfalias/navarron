'use client'

import { useEffect } from 'react'
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CartItem } from '@/lib/cart-context'
import { useCartEvents } from '@/lib/hooks/useCartEvents'

interface CartContentProps {
  vendorNames: Record<string, string>
  initialCart: CartItem[]
}

const VAT_RATE = 0.21; // 21% VAT rate

export function CartContent({ vendorNames, initialCart }: CartContentProps) {
  const { items, updateQuantity, removeFromCart, setItems } = useCart()

  useEffect(() => {
    setItems(initialCart)
  }, [initialCart, setItems])

  // Usar el nuevo hook para escuchar actualizaciones en tiempo real
  useCartEvents()

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = []
    }
    acc[item.vendorId].push(item)
    return acc
  }, {} as Record<string, typeof items>)

  const subtotal = items.reduce((total, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
    return total + discountedPrice * item.quantity;
  }, 0);
  const subtotalWithoutVAT = items.reduce((total, item) => {
    const discountedPrice = item.price * (1 - (item.discount || 0) / 100)
    return total + (discountedPrice / (1 + VAT_RATE)) * item.quantity
  }, 0)
  const subtotalVAT = subtotal - subtotalWithoutVAT
  const shipping = 5.99
  const totalWithoutVAT = subtotalWithoutVAT + shipping / (1 + VAT_RATE)
  const totalVAT = subtotal + shipping - totalWithoutVAT
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
        <p className="text-xl mb-4">Tu carrito está vacío</p>
        <Button asChild>
          <Link href="/">Seguir comprando</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(groupedItems).map(([vendorId, vendorItems]) => (
                <div key={vendorId} className="mb-6">
                  <h3 className="font-semibold mb-2">{vendorNames[vendorId] || 'Comercio'}</h3>
                  {vendorItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.coverImage || '/placeholder.svg'}
                          alt={item.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.discount ? (
                            <>
                              <span className="line-through">{item.price.toFixed(2)}€</span>
                              <span className="text-red-600 ml-2">
                                {(item.price * (1 - item.discount / 100)).toFixed(2)}€
                              </span>
                            </>
                          ) : (
                            <span>{item.price.toFixed(2)}€</span>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(1, parseInt(e.target.value) || 0)
                            updateQuantity(item.id, newQuantity)
                          }}
                          className="w-16 text-center"
                        />
                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal (sin IVA):</span>
                  <span>{subtotalWithoutVAT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA:</span>
                  <span>{subtotalVAT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal (con IVA):</span>
                  <span>{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span>{shipping.toFixed(2)}€</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total (sin IVA):</span>
                  <span>{totalWithoutVAT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA total:</span>
                  <span>{totalVAT.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total (con IVA):</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
                <Button className="w-full" disabled>
                  Pagar con PayPal
                </Button>
                <Button className="w-full bg-black text-white" disabled>
                  Pagar con Apple Pay
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/finalizar-compra">
                    Proceder al checkout
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

