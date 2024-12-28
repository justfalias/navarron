import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contacto</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <p className="mb-4">
              Estamos aquí para ayudarte. No dudes en ponerte en contacto con nosotros si tienes alguna pregunta, sugerencia o comentario.
            </p>
            <ul className="space-y-2">
              <li><strong>Email:</strong> info@navarron.com</li>
              <li><strong>Teléfono:</strong> +34 948 123 456</li>
              <li><strong>Dirección:</strong> Calle Mayor 1, 31001 Pamplona, Navarra</li>
            </ul>
            <p className="mt-4">
              Horario de atención al cliente:<br />
              Lunes a Viernes: 9:00 - 18:00<br />
              Sábados: 10:00 - 14:00
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
            <form className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Tu nombre" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div>
                <Label htmlFor="asunto">Asunto</Label>
                <Input id="asunto" placeholder="Asunto de tu mensaje" />
              </div>
              <div>
                <Label htmlFor="mensaje">Mensaje</Label>
                <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí" rows={4} />
              </div>
              <Button type="submit">Enviar Mensaje</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

