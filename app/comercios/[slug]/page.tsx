import { notFound } from 'next/navigation'
import Image from 'next/image'
import { MapPin, Calendar, Phone, Mail, MessageCircle } from 'lucide-react'
import { getVendorBySlug } from '@/lib/vendors'
import { getAreaById } from '@/lib/areas'
import { Card, CardContent } from "@/components/ui/card"

type Params = Promise<{ slug: string }>

export default async function ComercioPage({
  params
}: {
  params: Params
}) {
  const { slug } = await params
  const comercio = await getVendorBySlug(slug)

  if (!comercio) {
    notFound()
  }

  const area = await getAreaById(comercio.areaId)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-64 mb-8">
          <Image 
            src={comercio.heroImageUrl} 
            alt={comercio.name} 
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">{comercio.name}</h1>
        <p className="text-lg mb-6">{comercio.longDescription}</p>
        
        {/* Contact Information Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span>{comercio.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <a href={`mailto:${comercio.email}`} className="hover:underline">{comercio.email}</a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span>{comercio.address}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                <a href={`https://wa.me/${comercio.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  WhatsApp: {comercio.whatsapp}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{comercio.city}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>Desde {comercio.foundedYear}</span>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Especialidades</h2>
          <ul className="list-disc list-inside">
            {comercio.specialties.map((specialty, index) => (
              <li key={index}>{specialty}</li>
            ))}
          </ul>
        </div>
        {area && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Área</h2>
            <p>{area.name} - {area.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

