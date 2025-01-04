'use server'

import { cookies } from 'next/headers'
import { CartItem } from '@/lib/cart-context'
import { getProductBySlug } from '@/lib/products'
import { getVendorBySlug } from '@/lib/vendors'

const CART_COOKIE_NAME = 'navarron_cart'

export async function getCart(): Promise<CartItem[]> {
const cartCookie = (await cookies()).get(CART_COOKIE_NAME)
return cartCookie ? JSON.parse(cartCookie.value) : []
}

export async function addToCart(vendorSlug: string, productSlug: string, quantity: number) {
  try {
    console.log(`Adding to cart: vendorSlug=${vendorSlug}, productSlug=${productSlug}, quantity=${quantity}`)
    const cart = await getCart()
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

    const cookieStore = await cookies()
    cookieStore.set(CART_COOKIE_NAME, JSON.stringify(cart))
    console.log('Cart updated successfully')
    return cart
  } catch (error) {
    console.error('Error in addToCart server action:', error)
    throw error
  }
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  const cart = await getCart()
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  )
const cookieStore = await cookies()
cookieStore.set(CART_COOKIE_NAME, JSON.stringify(updatedCart))
return updatedCart
}

export async function removeFromCart(productId: string) {
  const cart = await getCart()
  const updatedCart = cart.filter(item => item.id !== productId)
const cookieStore = await cookies()
cookieStore.set(CART_COOKIE_NAME, JSON.stringify(updatedCart))
return updatedCart
}

export async function clearCart() {
const cookieStore = await cookies()
cookieStore.delete(CART_COOKIE_NAME)
return []
}

