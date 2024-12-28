'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { X, SlidersHorizontal, Search, Loader2 } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDebounce } from '@/lib/hooks'

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const { data: filterSections, isLoading } = useQuery({
    queryKey: ['filterOptions', debouncedSearchTerm, priceRange],
    queryFn: async () => {
      const response = await fetch(`/api/filter-options?search=${debouncedSearchTerm}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`)
      if (!response.ok) {
        throw new Error('Failed to fetch filter options')
      }
      return response.json()
    },
    initialData: []
  })

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams)
    Object.entries(selectedFilters).forEach(([key, values]) => {
      params.delete(key)
      values.forEach(value => params.append(key, value))
    })
    params.set('search', searchTerm)
    params.set('minPrice', priceRange[0].toString())
    params.set('maxPrice', priceRange[1].toString())
    router.push(`/tienda?${params.toString()}`)
    setIsOpen(false)
  }, [selectedFilters, searchTerm, priceRange, router, searchParams])

  const clearFilters = useCallback(() => {
    setSelectedFilters({})
    setSearchTerm('')
    setPriceRange([0, 1000])
    router.push('/tienda')
    setIsOpen(false)
  }, [router])

  const toggleFilter = useCallback((sectionId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const newFilters = { ...prev }
      if (!newFilters[sectionId]) {
        newFilters[sectionId] = []
      }
      const index = newFilters[sectionId].indexOf(optionId)
      if (index > -1) {
        newFilters[sectionId].splice(index, 1)
      } else {
        newFilters[sectionId].push(optionId)
      }
      if (newFilters[sectionId].length === 0) {
        delete newFilters[sectionId]
      }
      return newFilters
    })
  }, [])

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Buscar</Label>
        <div className="flex">
          <Input
            id="search"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button type="button" className="ml-2" onClick={applyFilters}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Rango de Precio</Label>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between text-sm">
          <span>{priceRange[0]}€</span>
          <span>{priceRange[1]}€</span>
        </div>
      </div>

      <ScrollArea className="h-[400px]">
        <Accordion type="multiple" className="w-full">
          {filterSections?.map((section: any) => (
            <AccordionItem value={section.id} key={section.id}>
              <AccordionTrigger>{section.name}</AccordionTrigger>
              <AccordionContent>
                {section.options.map((option: any) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${section.id}-${option.id}`}
                      checked={selectedFilters[section.id]?.includes(option.id)}
                      onCheckedChange={() => toggleFilter(section.id, option.id)}
                    />
                    <Label htmlFor={`${section.id}-${option.id}`}>
                      {option.name} ({option.count})
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>

      <div className="flex justify-between">
        <Button onClick={clearFilters} variant="outline">
          Limpiar filtros
        </Button>
        <Button onClick={applyFilters}>
          Aplicar filtros
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg border p-6">
          <h2 className="font-semibold text-lg mb-4">Filtros</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <FilterContent />
          )}
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <FilterContent />
            )}
          </SheetContent>
        </Sheet>
      </div>

      {/* Applied filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        {Object.entries(selectedFilters).flatMap(([sectionId, optionIds]) =>
          optionIds.map(optionId => {
            const section = filterSections?.find(s => s.id === sectionId)
            const option = section?.options.find(o => o.id === optionId)
            return option ? (
              <Badge key={`${sectionId}-${optionId}`} variant="secondary" className="px-2 py-1">
                {option.name}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() => toggleFilter(sectionId, optionId)}
                />
              </Badge>
            ) : null
          })
        )}
      </div>
    </>
  )
}

