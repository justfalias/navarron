import { Card, CardContent } from "@/components/ui/card"

export default function EnviosYDevolucionesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Envíos y Devoluciones</h1>
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Política de Envíos</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Realizamos envíos a toda la península española.</li>
              <li>El tiempo estimado de entrega es de 3-5 días laborables.</li>
              <li>Los gastos de envío se calculan en función del peso y el destino.</li>
              <li>Ofrecemos envío gratuito para pedidos superiores a 50€.</li>
              <li>Trabajamos con empresas de mensajería de confianza para garantizar la seguridad de tu pedido.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Política de Devoluciones</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Aceptamos devoluciones dentro de los 14 días siguientes a la recepción del producto.</li>
              <li>El producto debe estar en su estado original, sin usar y con el embalaje intacto.</li>
              <li>Para iniciar una devolución, contacta con nuestro servicio de atención al cliente.</li>
              <li>Una vez recibido y comprobado el producto, procederemos al reembolso.</li>
              <li>El coste de la devolución corre a cargo del cliente, excepto en caso de productos defectuosos.</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Productos Defectuosos o Dañados</h2>
            <p>
              Si recibes un producto defectuoso o dañado, por favor, contacta con nosotros inmediatamente. 
              Nos haremos cargo de los gastos de devolución y te enviaremos un reemplazo sin coste adicional.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

