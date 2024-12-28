'use client'

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, Store, Users, Utensils, Shirt, Palette, ShoppingCart, Mail, Home, BookOpen, ShoppingBag, ArrowRight, LogIn, UserPlus, Wrench } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartPreview } from "./cart-preview"
import { useCart } from "@/components/cart-provider"
import { SearchDialog } from "@/components/search-dialog"
import { useSearchDialog } from '@/components/search-dialog-provider'

import { getCategories } from "@/lib/categories"
import { getVendors } from "@/lib/vendors"
import { getSubcategories } from "@/lib/subcategories"

const categoryIcons = {
  'gastronomia': Utensils,
  'moda': Shirt,
  'artesania-y-decoracion': Palette,
  'alimentacion': ShoppingCart,
  'servicios': Wrench,
  'hogar-y-ferreterias': Home,
  'librerias-y-papelerias': BookOpen,
}

const NavItems = ({ isMobile = false, categories = [], vendors = [], subcategories = [] }) => (
  <>
    {isMobile ? (
      <>
        <Link href="/" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Home className="h-6 w-6" />
          <span>Inicio</span>
        </Link>
        <Link href="/tienda" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <ShoppingBag className="h-6 w-6" />
          <span>Productos</span>
        </Link>
        <Link href="/comercios" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Store className="h-6 w-6" />
          <span>Comercios</span>
        </Link>
        <Link href="/quienes-somos" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Users className="h-6 w-6" />
          <span>Quienes Somos</span>
        </Link>
        <Link href="/contacto" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent">
          <Mail className="h-6 w-6" />
          <span>Contacto</span>
        </Link>
        <Link href="/vende-en-navarron" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent mt-auto">
          <UserPlus className="h-6 w-6" />
          <span>Vende en Navarron</span>
        </Link>
        <Link href="/iniciar-sesion" className="flex items-center space-x-2 p-2 rounded-lg hover:bg-accent mt-auto">
          <LogIn className="h-6 w-6" />
          <span>Iniciar sesión</span>
        </Link>
      </>
    ) : (
      <>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Productos
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link
              href="/tienda"
              className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors"
            >
              <span>Ver todos los productos</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <div className="border-t" />
            <div className="grid gap-2 p-6 w-[800px] grid-cols-4">
              {categories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <Link
                    href={`/categorias/${category.slug}`}
                    className="text-sm font-medium leading-none hover:underline"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {React.createElement(categoryIcons[category.slug] || ShoppingBag, {
                        className: "h-4 w-4"
                      })}
                      {category.name}
                    </div>
                  </Link>
                  <ul className="space-y-2">
                    {subcategories
                      .filter(sub => sub.categoryId === category.id)
                      .map(subcategory => (
                        <li key={subcategory.id}>
                          <Link
                            href={`/categorias/${category.slug}/${subcategory.slug}`}
                            className="text-xs text-muted-foreground hover:text-primary"
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Store className="mr-2 h-4 w-4" />
            Comercios
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <Link
              href="/comercios"
              className="flex items-center justify-between p-2 hover:bg-accent rounded-md transition-colors"
            >
              <span>Ver todos los comercios</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
            <div className="border-t" />
            <div className="grid gap-4 p-6 pt-4 w-[600px] grid-cols-3">
              {vendors.map((vendor) => (
                <Link
                  key={vendor.id}
                  href={`/${vendor.slug}`}
                  className="flex items-center space-x-2 hover:bg-accent rounded-md p-2 transition-colors"
                >
                  <Image
                    src={vendor.thumbnailUrl || '/placeholder.svg'}
                    alt={vendor.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{vendor.name}</span>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/quienes-somos" className={navigationMenuTriggerStyle()}>
            <Users className="mr-2 h-4 w-4" />
            Quienes somos
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contacto" className={navigationMenuTriggerStyle()}>
            <Mail className="mr-2 h-4 w-4" />
            Contacto
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/vende-en-navarron"
            className="flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background text-primary hover:text-primary/80 h-9 px-3 group"
          >
            <UserPlus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
            <span className="border-b border-primary border-dashed group-hover:border-solid transition-all">
              Vende en Navarron
            </span>
          </Link>
        </NavigationMenuItem>
      </>
    )}
  </>
)

export function MainNav() {
  const [categories, setCategories] = React.useState([])
  const [vendors, setVendors] = React.useState([])
  const [subcategories, setSubcategories] = React.useState([])
  const { items } = useCart()
  const { openSearchDialog } = useSearchDialog()

  React.useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, vendorsData, subcategoriesData] = await Promise.all([
        getCategories(),
        getVendors(),
        getSubcategories()
      ])
      setCategories(categoriesData)
      setVendors(vendorsData)
      setSubcategories(subcategoriesData)
    }
    fetchData()
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="border-b backdrop-blur-sm bg-background/60">
      <div className="flex h-16 items-center px-4">
        <div className="w-[200px]">
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="font-bold text-xl">Navarron</span>
          </Link>
        </div>
        <div className="flex-1 hidden lg:flex justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-4">
              <NavItems categories={categories} vendors={vendors} subcategories={subcategories} />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center justify-end space-x-4 ml-auto">
          <Button variant="ghost" size="icon" onClick={openSearchDialog}>
            <Search className="h-5 w-5" />
          </Button>
          <CartPreview />
          <Link
            href="/iniciar-sesion"
            className="hidden lg:flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Iniciar sesión
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <NavItems isMobile={true} categories={categories} vendors={vendors} subcategories={subcategories} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <SearchDialog />
    </div>
  )
}

