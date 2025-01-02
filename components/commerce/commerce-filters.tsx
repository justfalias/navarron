'use client'

import { useState, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import type { Category } from '@/lib/categories'
import type { Subcategory } from '@/lib/subcategories'
import type { Area } from '@/lib/areas'
import { Store, ShoppingBag, Palette, Wrench, Home, BookOpen, SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const categoryIcons = {
  'gastronomia': Store,
  'moda': ShoppingBag,
  'artesania-y-decoracion': Palette,
  'servicios': Wrench,
  'hogar-y-ferreterias': Home,
  'librerias-y-papelerias': BookOpen,
}

interface CommerceFiltersProps {
  categories: Category[]
  subcategories: Subcategory[]
  areas: Area[]
  initialCategory?: string
  initialSubcategory?: string
  initialArea?: string
}

export function CommerceFilters({ 
  categories,
  subcategories,
  areas,
  initialCategory,
  initialSubcategory,
  initialArea
}: CommerceFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [currentCategory, setCurrentCategory] = useState<string | null>(searchParams.get('categoria') || initialCategory || null)
  const [currentSubcategory, setCurrentSubcategory] = useState<string | null>(searchParams.get('subcategoria') || initialSubcategory || null)
  const [currentArea, setCurrentArea] = useState<string | null>(searchParams.get('area') || initialArea || null)

  useEffect(() => {
    const category = searchParams.get('categoria')
    const subcategory = searchParams.get('subcategoria')
    const area = searchParams.get('area')
    
    setCurrentCategory(category || null)
    setCurrentSubcategory(subcategory || null)
    setCurrentArea(area || null)

    if (category) {
      setOpenSections(prev => prev.includes('categories') ? prev : [...prev, 'categories'])
      setOpenCategories(prev => prev.includes(category) ? prev : [category])
    }
  }, [searchParams])

  // Sort arrays alphabetically by name
  const sortedCategories = [...categories].sort((a, b) => a.name.localeCompare(b.name))
  const sortedAreas = [...areas].sort((a, b) => a.name.localeCompare(b.name))

  const handleFilterChange = useCallback((type: 'categoria' | 'subcategoria' | 'area', value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (type === 'categoria') {
      if (value) {
        params.set('categoria', value)
        params.delete('subcategoria')
      } else {
        params.delete('categoria')
        params.delete('subcategoria')
      }
    } else if (type === 'subcategoria') {
      if (value) {
        const subcategory = subcategories.find(sub => sub.slug === value)
        if (subcategory) {
          const category = categories.find(cat => cat.id === subcategory.categoryId)
          if (category && category.slug !== currentCategory) {
            params.set('categoria', category.slug)
          }
        }
        params.set('subcategoria', value)
      } else {
        params.delete('subcategoria')
      }
    } else if (type === 'area') {
      value ? params.set('area', value) : params.delete('area')
    }

    params.delete('page')  // Reset to first page when filters change
    const newUrl = `/comercios?${params.toString()}`
    router.push(newUrl, { scroll: false })

    // Invalidate the vendors query to trigger a refetch
    queryClient.invalidateQueries(['vendors'])
  }, [searchParams, router, categories, subcategories, currentCategory, queryClient])

  const clearFilters = useCallback(() => {
    setOpenSections([])
    setOpenCategories([])
    setIsOpen(false)
    setCurrentCategory(null)
    setCurrentSubcategory(null)
    setCurrentArea(null)
    router.push('/comercios', { scroll: false })

    // Invalidate the vendors query to trigger a refetch
    queryClient.invalidateQueries(['vendors'])
  }, [router, queryClient])

  const toggleCategory = useCallback((categorySlug: string) => {
    setOpenCategories(prev => 
      prev.includes(categorySlug) 
        ? prev.filter(slug => slug !== categorySlug)
        : [...prev, categorySlug]
    )
  }, [])

  const FilterContent = useCallback(() => (
    <div className="space-y-8">
      <Accordion type="multiple" value={openSections} onValueChange={setOpenSections}>
        <AccordionItem value="categories">
          <AccordionTrigger>Categorías</AccordionTrigger>
          <AccordionContent>
            {sortedCategories.map((category) => {
              const Icon = categoryIcons[category.slug] || Store
              const categorySubcategories = subcategories
                .filter(sub => sub.categoryId === category.id)
                .sort((a, b) => a.name.localeCompare(b.name))
              const isCategoryOpen = openCategories.includes(category.slug)
              
              return (
                <div key={category.id} className="mb-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Checkbox 
                        id={`category-${category.slug}`}
                        checked={currentCategory === category.slug && !currentSubcategory}
                        onCheckedChange={(checked) => {
                          handleFilterChange('categoria', checked ? category.slug : null)
                        }}
                      />
                      <Label 
                        htmlFor={`category-${category.slug}`}
                        className="text-sm font-medium leading-none flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {category.name}
                      </Label>
                    </div>
                    {categorySubcategories.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleCategory(category.slug)}
                      >
                        {isCategoryOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    )}
                  </div>
                  {isCategoryOpen && (
                    <div className="pl-8 space-y-2">
                      {categorySubcategories.map((subcategory) => (
                        <div key={subcategory.id} className="flex items-center gap-2">
                          <Checkbox 
                            id={`subcategory-${subcategory.slug}`}
                            checked={currentSubcategory === subcategory.slug}
                            onCheckedChange={(checked) => {
                              handleFilterChange('subcategoria', checked ? subcategory.slug : null)
                            }}
                          />
                          <Label 
                            htmlFor={`subcategory-${subcategory.slug}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subcategory.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="areas">
          <AccordionTrigger>Zonas</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {sortedAreas.map((area) => (
                <div key={area.id} className="flex items-center gap-2">
                  <Checkbox 
                    id={`area-${area.slug}`}
                    checked={currentArea === area.slug}
                    onCheckedChange={(checked) => {
                      handleFilterChange('area', checked ? area.slug : null)
                    }}
                  />
                  <Label htmlFor={`area-${area.slug}`}>
                    {area.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button 
        onClick={clearFilters} 
        variant="outline" 
        className="w-full"
      >
        Limpiar filtros
      </Button>
    </div>
  ), [currentCategory, currentSubcategory, currentArea, handleFilterChange, clearFilters, sortedCategories, sortedAreas, subcategories, openSections, openCategories, toggleCategory])

  // Get active filters for badges
  const activeFilters = []

  if (currentSubcategory) {
    const sub = subcategories.find(s => s.slug === currentSubcategory)
    if (sub) {
      activeFilters.push({
        type: 'subcategoria',
        label: sub.name,
        value: sub.slug
      })
    }
  } else if (currentCategory) {
    const category = categories.find(c => c.slug === currentCategory)
    if (category) {
      activeFilters.push({
        type: 'categoria',
        label: category.name,
        value: category.slug
      })
    }
  }

  if (currentArea) {
    const area = areas.find(a => a.slug === currentArea)
    if (area) {
      activeFilters.push({
        type: 'area',
        label: area.name,
        value: area.slug
      })
    }
  }

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg border p-8">
          <h2 className="font-semibold text-xl mb-6">Filtros</h2>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFilters.map((filter) => (
                <Badge 
                  key={`${filter.type}-${filter.value}`} 
                  variant="secondary" 
                  className="flex items-center gap-2 px-3 py-1.5"
                >
                  <span>{filter.label}</span>
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => handleFilterChange(filter.type as any, null)}
                  />
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearFilters}
                className="h-8 px-3"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
          <FilterContent />
        </div>
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtros
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md">
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
            </SheetHeader>
            <ScrollArea className="h-[calc(100vh-8rem)] pr-4 mt-6">
              {activeFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeFilters.map((filter) => (
                    <Badge 
                      key={`${filter.type}-${filter.value}`} 
                      variant="secondary" 
                      className="flex items-center gap-2 px-3 py-1.5"
                    >
                      <span>{filter.label}</span>
                      <X
                        className="h-3 w-3 cursor-pointer hover:text-destructive"
                        onClick={() => handleFilterChange(filter.type as any, null)}
                      />
                    </Badge>
                  ))}
                  {activeFilters.length > 1 && (
                    <Badge 
                      variant="outline" 
                      className="flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-secondary"
                      onClick={clearFilters}
                    >
                      Limpiar todos
                    </Badge>
                  )}
                </div>
              )}
              <FilterContent />
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

