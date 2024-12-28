import { Card, CardContent } from "@/components/ui/card"

export default function PoliticaDePrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidad</h1>
      <Card>
        <CardContent className="prose max-w-none p-6">
          <p>
            En Navarron, nos comprometemos a proteger tu privacidad y a tratar tus datos personales con transparencia. 
            Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos tu información personal.
          </p>

          <h2>1. Información que Recopilamos</h2>
          <p>
            Recopilamos información que nos proporcionas directamente, como tu nombre, dirección de correo electrónico, 
            dirección postal y número de teléfono cuando creas una cuenta o realizas una compra.
          </p>

          <h2>2. Cómo Utilizamos tu Información</h2>
          <p>
            Utilizamos tu información para:
          </p>
          <ul>
            <li>Procesar tus pedidos y envíos</li>
            <li>Comunicarnos contigo sobre tu cuenta o pedidos</li>
            <li>Mejorar nuestros productos y servicios</li>
            <li>Personalizar tu experiencia de compra</li>
            <li>Enviarte ofertas promocionales (si has dado tu consentimiento)</li>
          </ul>

          <h2>3. Compartir Información</h2>
          <p>
            No vendemos ni alquilamos tu información personal a terceros. Compartimos tu información solo con 
            proveedores de servicios que nos ayudan en nuestras operaciones comerciales.
          </p>

          <h2>4. Seguridad de los Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal 
            contra accesos no autorizados, pérdida o alteración.
          </p>

          <h2>5. Tus Derechos</h2>
          <p>
            Tienes derecho a acceder, corregir o eliminar tu información personal. También puedes oponerte al 
            procesamiento de tus datos o solicitar su portabilidad.
          </p>

          <h2>6. Cookies</h2>
          <p>
            Utilizamos cookies para mejorar tu experiencia de navegación. Puedes gestionar tus preferencias de 
            cookies a través de la configuración de tu navegador.
          </p>

          <h2>7. Cambios en esta Política</h2>
          <p>
            Nos reservamos el derecho de modificar esta política en cualquier momento. Te notificaremos sobre 
            cambios significativos a través de nuestro sitio web o por correo electrónico.
          </p>

          <h2>8. Contacto</h2>
          <p>
            Si tienes preguntas sobre nuestra Política de Privacidad, por favor contáctanos en privacy@navarron.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

