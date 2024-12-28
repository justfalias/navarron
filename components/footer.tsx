import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Sobre Nosotros</h3>
            <p className="text-sm text-gray-600">
              Navarron es un marketplace digital diseñado para conectar a los comercios locales de Navarra con sus clientes. Su misión principal es promover el comercio de proximidad, el consumo responsable y apoyar a los pequeños negocios en su transición al entorno digital, eliminando barreras tecnológicas.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/productos" className="text-sm text-gray-600 hover:text-gray-900">Productos</Link></li>
              <li><Link href="/comercios" className="text-sm text-gray-600 hover:text-gray-900">Comercios</Link></li>
              <li><Link href="/sobre-nosotros" className="text-sm text-gray-600 hover:text-gray-900">Sobre Nosotros</Link></li>
              <li><Link href="/contacto" className="text-sm text-gray-600 hover:text-gray-900">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Atención al Cliente</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900">Preguntas Frecuentes</Link></li>
              <li><Link href="/envios" className="text-sm text-gray-600 hover:text-gray-900">Envíos y Devoluciones</Link></li>
              <li><Link href="/terminos" className="text-sm text-gray-600 hover:text-gray-900">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="text-sm text-gray-600 hover:text-gray-900">Política de Privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Síguenos</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><Facebook size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><Instagram size={24} /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><Twitter size={24} /></a>
            </div>
            <h3 className="font-semibold text-lg mb-2">Métodos de Pago</h3>
            <div className="grid grid-cols-3 gap-4">
              <Image 
                src="https://www.svgrepo.com/show/362035/visa-3.svg" 
                alt="Visa" 
                width={60} 
                height={40} 
                className="h-8 w-auto"
              />
              <Image 
                src="https://www.svgrepo.com/show/508701/mastercard-full.svg" 
                alt="Mastercard" 
                width={60} 
                height={40} 
                className="h-8 w-auto"
              />
              <Image 
                src="https://www.svgrepo.com/show/303275/apple-pay-payment-mark-logo.svg" 
                alt="Apple Pay" 
                width={60} 
                height={40} 
                className="h-8 w-auto"
              />
              <Image 
                src="https://www.svgrepo.com/show/508690/google-pay.svg" 
                alt="Google Pay" 
                width={60} 
                height={40} 
                className="h-8 w-auto"
              />
              <Image 
                src="https://www.svgrepo.com/show/508716/paypal.svg" 
                alt="PayPal" 
                width={60} 
                height={40} 
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Navarron. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

