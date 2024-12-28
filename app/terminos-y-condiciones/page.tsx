import { Card, CardContent } from "@/components/ui/card"

export default function TerminosYCondicionesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Términos y Condiciones</h1>
      <Card>
        <CardContent className="prose max-w-none p-6">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web de Navarron, aceptas cumplir y quedar vinculado por estos Términos y Condiciones. 
            Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios.
          </p>

          <h2>2. Uso del Sitio</h2>
          <p>
            Te comprometes a utilizar el sitio solo para fines legales y de una manera que no infrinja los derechos de otros 
            usuarios o restrinja su uso del sitio.
          </p>

          <h2>3. Cuentas de Usuario</h2>
          <p>
            Para realizar compras, es necesario crear una cuenta. Eres responsable de mantener la confidencialidad de tu cuenta 
            y contraseña, así como de restringir el acceso a tu computadora.
          </p>

          <h2>4. Productos y Precios</h2>
          <p>
            Nos esforzamos por mostrar con precisión los colores y las imágenes de nuestros productos. Sin embargo, no podemos 
            garantizar que la visualización de cualquier color en tu monitor sea precisa. Todos los precios están sujetos a cambios.
          </p>

          <h2>5. Envíos y Devoluciones</h2>
          <p>
            Consulta nuestra política de Envíos y Devoluciones para obtener información detallada sobre estos procesos.
          </p>

          <h2>6. Propiedad Intelectual</h2>
          <p>
            Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes, así como su compilación, 
            es propiedad de Navarron o sus proveedores de contenido y está protegido por las leyes de propiedad intelectual.
          </p>

          <h2>7. Limitación de Responsabilidad</h2>
          <p>
            Navarron no será responsable de ningún daño directo, indirecto, incidental, consecuente o punitivo que surja 
            del uso o la imposibilidad de usar nuestros servicios.
          </p>

          <h2>8. Ley Aplicable</h2>
          <p>
            Estos términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus 
            disposiciones sobre conflictos de leyes.
          </p>

          <h2>9. Cambios en los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Tu uso continuado del sitio después 
            de dichos cambios constituirá tu aceptación de los nuevos términos.
          </p>

          <h2>10. Contacto</h2>
          <p>
            Si tienes alguna pregunta sobre estos Términos y Condiciones, por favor contáctanos en info@navarron.com.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

