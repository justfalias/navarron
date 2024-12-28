import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Calendar } from 'lucide-react'
import { getVendors } from '@/lib/vendors'
import { getAreas } from '@/lib/areas'
import { Card, CardContent } from "@/components/ui/card"
import { PaginationControls } from "@/components/pagination-controls"
import { ErrorMessage } from "@/components/error-message"
import { Suspense } from 'react'
import { ComerciosLoading } from './loading'

interface ComerciosPageProps {
  searchParams: { page?: string }
}

export default async function ComerciosPage({ searchParams }: ComerciosPageProps) {
  console.log('ComerciosPage: Starting render');
  
  try {
    const page = Math.max(1, Number(searchParams.page) || 1);
    const limit = 8;

    console.log('ComerciosPage: Fetching data');
    const [vendors, areas] = await Promise.all([
      getVendors(),
      getAreas()
    ]);

    console.log(`ComerciosPage: Fetched ${vendors.length} vendors and ${areas.length} areas`);

    // Handle no vendors case
    if (!vendors || vendors.length === 0) {
      console.log('ComerciosPage: No vendors found');
      return (
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage
            title="No hay comercios disponibles"
            description="En este momento no hay comercios para mostrar. Por favor, inténtalo más tarde."
            actionText="Volver al inicio"
            actionHref="/"
          />
        </div>
      );
    }

    // Calculate pagination
    const totalVendors = vendors.length;
    const totalPages = Math.ceil(totalVendors / limit);
    const offset = (page - 1) * limit;
    const paginatedVendors = vendors.slice(offset, offset + limit);

    // Handle invalid page number
    if (page > totalPages) {
      console.log('ComerciosPage: Invalid page number');
      return (
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage
            title="Página no encontrada"
            description="La página que buscas no existe."
            actionText="Ir a la primera página"
            actionHref="/comercios"
          />
        </div>
      );
    }

    // Create areas map
    const areaMap = areas.reduce((acc, area) => {
      acc[area.id] = area.name;
      return acc;
    }, {} as Record<string, string>);

    console.log('ComerciosPage: Rendering vendor list');
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Nuestros Comercios</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {paginatedVendors.map((comercio) => (
            <Card key={comercio.id} className="overflow-hidden group">
              <Link href={`/${comercio.slug}`}>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image 
                      src={comercio.imageUrl} 
                      alt={comercio.name} 
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{comercio.name}</h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {comercio.description}
                    </p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{comercio.city}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Desde {comercio.foundedYear}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Área: {areaMap[comercio.areaId]}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <PaginationControls 
          currentPage={page} 
          totalPages={totalPages} 
          basePath="/comercios" 
          totalItems={totalVendors}
          itemsPerPage={limit}
        />
      </div>
    );
  } catch (error) {
    console.error('ComerciosPage: Error:', error);
    throw error; // Let the error boundary handle it
  }
}

