import { getVendors } from '@/lib/vendors'
import { getServerCart } from '@/app/actions/server-cart'
import { CartContent } from '@/components/cart-content'

export default async function CartPage() {
  const [vendors, serverCart] = await Promise.all([
    getVendors(),
    getServerCart()
  ])

  const vendorNames = vendors.reduce((acc, vendor) => {
    acc[vendor.id] = vendor.name
    return acc
  }, {} as Record<string, string>)

  return (
    <div>
      <CartContent initialCart={serverCart} vendorNames={vendorNames} />
    </div>
  )
}

