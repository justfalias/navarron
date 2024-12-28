import { Card, CardContent } from "@/components/ui/card"

export default function SobreNosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosotros</h1>
      <Card className="mb-8">
        <CardContent className="prose max-w-none p-6">
          <h2 className="text-2xl font-semibold mb-4">Nuestra Misión</h2>
          <p>
            En Navarron, nos dedicamos a:
          </p>
          <ul>
            <li>Conectar a los comercios locales de Navarra con sus clientes a través de una plataforma digital accesible y fácil de usar.</li>
            <li>Fomentar el comercio de proximidad y la economía local.</li>
            <li>Ayudar a los negocios tradicionales a dar el salto al mundo digital sin complicaciones técnicas.</li>
            <li>Ofrecer a los clientes una forma sencilla de apoyar a los comercios de su comunidad.</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 mt-8">Nuestros Valores</h2>
          <ul>
            <li><strong>Simplicidad:</strong> Hacemos que la tecnología sea accesible para todos los comercios.</li>
            <li><strong>Proximidad:</strong> Apoyamos y promovemos el comercio local y sostenible.</li>
            <li><strong>Personalización:</strong> Cada negocio mantiene su identidad única en nuestra plataforma.</li>
            <li><strong>Soporte:</strong> Ofrecemos asistencia continua para que cada comercio tenga éxito en línea.</li>
            <li><strong>Comunidad:</strong> Construimos una red fuerte de comercios y clientes locales.</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4 mt-8">Nuestra Propuesta de Valor</h2>
          <ul>
            <li>Microsites personalizados para cada negocio</li>
            <li>Gestión autónoma e intuitiva de productos y servicios</li>
            <li>Fomento del comercio de proximidad</li>
            <li>Soporte técnico continuo</li>
            <li>Opciones de entrega flexibles</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

