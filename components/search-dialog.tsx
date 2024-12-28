'use client'

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import { useSearchDialog } from './search-dialog-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"
import { getVendors } from "@/lib/vendors"
import { Store, ArrowRight } from 'lucide-react'

export function SearchDialog() {
  const router = useRouter()
  const { isOpen, closeSearchDialog } = useSearchDialog()
  const [vendors, setVendors] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')
  //const [isVendorsOpen, setIsVendorsOpen] = React.useState(true) //Removed

  React.useEffect(() => {
    const fetchData = async () => {
      const vendorsData = await getVendors()
      setVendors(vendorsData)
    }
    fetchData()
  }, [])

  const sortAlphabetically = (items) => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name))
  }

  const getRandomItems = (items, count) => {
    const shuffled = [...items].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const filteredVendors = sortAlphabetically(vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  const displayedVendors = searchTerm ? filteredVendors : getRandomItems(vendors, 3)

  return (
    <CommandDialog open={isOpen} onOpenChange={closeSearchDialog} className="h-[90vh] max-h-[800px]">
      <DialogTitle className="sr-only">Búsqueda de productos y comercios</DialogTitle>
      <CommandInput 
        placeholder="Buscar comercios en Navarron..." 
        onValueChange={setSearchTerm}
      />
      <CommandList>
        <CommandEmpty>No se encontraron resultados.</CommandEmpty>
        <CommandGroup heading={
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Store className="mr-2 h-4 w-4" />
              Comercios
            </div>
            <button
              onClick={() => {
                router.push('/comercios');
                closeSearchDialog();
              }}
              className="text-sm text-blue-500 hover:underline flex items-center"
            >
              Ver todos <ArrowRight className="ml-1 h-3 w-3" />
            </button>
          </div>
        }>
          {filteredVendors.map((vendor) => (
            <CommandItem
              key={vendor.id}
              onSelect={() => {
                router.push(`/${vendor.slug}`)
                closeSearchDialog()
              }}
              className="pl-8"
            >
              <div className="flex items-center">
                <Image
                  src={vendor.thumbnailUrl || '/placeholder.svg'}
                  alt={vendor.name}
                  width={32}
                  height={32}
                  className="mr-2 rounded-full object-cover"
                />
                {vendor.name}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

