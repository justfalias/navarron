import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Store, Globe, Zap, Users, TrendingUp } from 'lucide-react'

export default function VendeEnNavarron() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Vende en Navarron</h1>
        <p className="text-xl mb-8">Lleva tu negocio local al mundo digital sin complicaciones</p>
        <Button size="lg" asChild>
          <Link href="#contact-form">Únete a Navarron</Link>
        </Button>
      </section>

      {/* Key Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">¿Por qué vender en Navarron?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Store, title: "Visibilidad Local", description: "Conecta con clientes de Pamplona y toda Navarra" },
            { icon: Globe, title: "Presencia Digital", description: "Tu propio microsite personalizado dentro de Navarron" },
            { icon: Zap, title: "Fácil Gestión", description: "Herramientas intuitivas para manejar tus productos y pedidos" },
            { icon: Users, title: "Comunidad Activa", description: "Forma parte de una red de comercios y clientes locales" },
            { icon: TrendingUp, title: "Crecimiento", description: "Expande tu negocio en el mercado digital" },
            { icon: CheckCircle, title: "Sin Complicaciones", description: "Olvídate de crear y mantener tu propia web" },
          ].map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <benefit.icon className="w-6 h-6 mr-2 text-primary" />
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Navarron Section */}
      <section className="mb-16">
        <div className="bg-secondary rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-4">Sobre Navarron</h2>
          <p className="mb-4">
            Navarron es un marketplace digital diseñado para conectar a los comercios locales de Navarra con sus clientes. 
            Nuestra misión es promover el comercio de proximidad, el consumo responsable y apoyar a los pequeños negocios 
            en su transición al entorno digital, eliminando barreras tecnológicas.
          </p>
          <p>
            Al unirte a Navarron, no solo obtienes una plataforma de venta, sino que te conviertes en parte de un 
            movimiento que fortalece el tejido comercial local frente a grandes plataformas globales.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Cómo Funciona</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Regístrate", description: "Crea tu cuenta de vendedor en Navarron" },
            { title: "Configura tu Tienda", description: "Personaliza tu microsite y sube tus productos" },
            { title: "Empieza a Vender", description: "Recibe pedidos y haz crecer tu negocio en línea" },
          ].map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-primary text-primary-foreground text-lg font-bold mb-2">
                    {index + 1}
                  </span>
                  <h3 className="text-xl">{step.title}</h3>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-form" className="text-center">
        <h2 className="text-3xl font-semibold mb-4">¿Listo para empezar?</h2>
        <p className="mb-8">Únete a Navarron hoy y lleva tu negocio al siguiente nivel</p>
        <Button size="lg" asChild>
          <Link href="/registro-vendedor">Registra tu Negocio</Link>
        </Button>
      </section>
    </div>
  )
}

