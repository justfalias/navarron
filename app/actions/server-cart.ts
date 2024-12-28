'use server'

import { cookies } from 'next/headers'
import { CartItem } from '@/lib/cart-context'
import { getProductBySlug } from '@/lib/products'
import { getVendorBySlug } from '@/lib/vendors'

const CART_COOKIE_NAME = 'navarron_cart'

export async function getServerCart(): Promise<CartItem[]> {
  const cartCookie = cookies().get(CART_COOKIE_NAME)
  return cartCookie ? JSON.parse(cartCookie.value) : []
}

export async function addToServerCart(vendorSlug: string, productSlug: string, quantity: number) {
  try {
    const cart = await getServerCart()
    const vendor = await getVendorBySlug(vendorSlug)
    if (!vendor) {
      throw new Error(`Vendor not found: ${vendorSlug}`)
    }

    const product = await getProductBySlug(productSlug, vendor.id)
    if (!product) {
      throw new Error(`Product not found: ${productSlug}`)
    }

    if (product.inventory < quantity) {
      throw new Error(`Not enough inventory. Available: ${product.inventory}`)
    }

    const existingItemIndex = cart.findIndex(item => item.id === product.id)

    if (existingItemIndex > -1) {
      const newQuantity = cart[existingItemIndex].quantity + quantity
      if (product.inventory < newQuantity) {
        throw new Error(`Not enough inventory. Available: ${product.inventory}`)
      }
      cart[existingItemIndex].quantity = newQuantity
    } else {
      cart.push({ ...product, quantity })
    }

    cookies().set(CART_COOKIE_NAME, JSON.stringify(cart))
    return { success: true, cart }
  } catch (error) {
    console.error('Error in addToServerCart:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function updateServerCartItemQuantity(productId: string, quantity: number) {
  const cart = await getServerCart()
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  )
  cookies().set(CART_COOKIE_NAME, JSON.stringify(updatedCart))
  return { success: true, cart: updatedCart }
}

export async function removeFromServerCart(productId: string) {
  const cart = await getServerCart()
  const updatedCart = cart.filter(item => item.id !== productId)
  cookies().set(CART_COOKIE_NAME, JSON.stringify(updatedCart))
  return { success: true, cart: updatedCart }
}

export async function clearServerCart() {
  cookies().delete(CART_COOKIE_NAME)
  return { success: true, cart: [] }
}

