'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from '@/lib/cart-context'
import { addToServerCart, updateServerCartItemQuantity, removeFromServerCart, clearServerCart } from '@/app/actions/server-cart'
import { getClientCart, setClientCart } from '@/lib/client-cache'

interface CartContextType {
  items: CartItem[]
  addToCart: (vendorSlug: string, productSlug: string, quantity: number) => Promise<void>
  updateQuantity: (productId: string, quantity: number) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  clearCart: () => Promise<void>
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  setItems: (items: CartItem[]) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: React.ReactNode
  initialCart?: CartItem[]
}

export function CartProvider({ children, initialCart = [] }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(initialCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const initializeCart = async () => {
      const clientCart = getClientCart()
      if (clientCart.length > 0) {
        setItems(clientCart)
      } else if (initialCart.length > 0) {
        setItems(initialCart)
        setClientCart(initialCart)
      }
    }

    initializeCart()
  }, [initialCart])

  useEffect(() => {
    setClientCart(items)
  }, [items])

  const syncWithServer = async (updatedCart: CartItem[]) => {
    await fetch('/api/sync-cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCart),
    })
    
    // Emitir evento de actualización del carrito
    const event = new CustomEvent('cart-update', { detail: updatedCart })
    window.dispatchEvent(event)
  }

  const addToCartHandler = async (vendorSlug: string, productSlug: string, quantity: number) => {
    try {
      const result = await addToServerCart(vendorSlug, productSlug, quantity)
      if (result.success) {
        setItems(result.cart)
        await syncWithServer(result.cart)
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      console.error('Error in addToCartHandler:', error)
      throw error
    }
  }

  const updateQuantityHandler = async (productId: string, quantity: number) => {
    const result = await updateServerCartItemQuantity(productId, quantity)
    if (result.success) {
      setItems(result.cart)
      await syncWithServer(result.cart)
    }
  }

  const removeFromCartHandler = async (productId: string) => {
    const result = await removeFromServerCart(productId)
    if (result.success) {
      setItems(result.cart)
      await syncWithServer(result.cart)
    }
  }

  const clearCartHandler = async () => {
    const result = await clearServerCart()
    if (result.success) {
      setItems([])
      setClientCart([])
      await syncWithServer([])
    }
  }

  return (
    <CartContext.Provider value={{
      items,
      addToCart: addToCartHandler,
      updateQuantity: updateQuantityHandler,
      removeFromCart: removeFromCartHandler,
      clearCart: clearCartHandler,
      isCartOpen,
      setIsCartOpen,
      setItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

