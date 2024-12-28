'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getProducts } from "@/lib/products"
import { getVendors } from "@/lib/vendors"

interface CommandMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandMenu({ open, onOpenChange }: CommandMenuProps) {
  const router = useRouter()
  const [products, setProducts] = React.useState([])
  const [vendors, setVendors] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const productsData = await getProducts()
      const vendorsData = await getVendors()
      setProducts(productsData)
      setVendors(vendorsData)
    }
    fetchData()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar productos y comercios..." />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading="Productos">
          {products.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => {
                router.push(`/productos/${product.slug}`)
                onOpenChange(false)
              }}
            >
              {product.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Comercios">
          {vendors.map((vendor) => (
            <CommandItem
              key={vendor.id}
              onSelect={() => {
                router.push(`/${vendor.slug}`)
                onOpenChange(false)
              }}
            >
              {vendor.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

