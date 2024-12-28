import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Store, ShoppingBag, UserPlus } from 'lucide-react'
import { SearchBar } from "@/components/search-bar"

export function HeroSection() {
  return (
    <div className="relative min-h-[600px] flex items-center justify-center text-white">
      <Image
        src="https://res.cloudinary.com/dddbhgbxn/image/upload/v1734351587/pamplona_fqlii8.webp"
        alt="Plaza del Castillo de Pamplona de noche"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold mb-6">Compra en tus comercios navarros desde casa</h1>
        <p className="text-xl mb-8">
          El marketplace navarro que apoya el comercio de proximidad y fomenta el consumo responsable.
        </p>
        <div className="w-full max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/comercios">
            <Button size="lg" variant="default" className="group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Store className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Explorar Comercios
            </Button>
          </Link>
          <Link href="/registro-vendedor">
            <Button size="lg" variant="secondary" className="group bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <UserPlus className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Vende en Navarron
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

