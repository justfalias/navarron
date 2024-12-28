import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "¿Cómo puedo realizar un pedido?",
      answer: "Para realizar un pedido, simplemente navega por nuestra tienda, selecciona los productos que deseas y añádelos a tu carrito. Cuando hayas terminado, ve al carrito y sigue los pasos para completar tu compra."
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      answer: "Aceptamos tarjetas de crédito/débito (Visa, MasterCard, American Express), PayPal, y transferencia bancaria para pedidos grandes."
    },
    {
      question: "¿Cuánto tiempo tarda en llegar mi pedido?",
      answer: "El tiempo de entrega depende de tu ubicación y el tipo de envío seleccionado. Generalmente, los pedidos se entregan en 3-5 días laborables dentro de la península."
    },
    {
      question: "¿Puedo devolver un producto si no estoy satisfecho?",
      answer: "Sí, ofrecemos devoluciones dentro de los 14 días siguientes a la recepción del producto. El producto debe estar en su estado original y sin usar. Consulta nuestra política de devoluciones para más detalles."
    },
    {
      question: "¿Los productos son realmente de Navarra?",
      answer: "Sí, todos nuestros productos son auténticos y provienen directamente de productores y artesanos de Navarra. Trabajamos estrechamente con ellos para garantizar la autenticidad y calidad de cada producto."
    },
    {
      question: "¿Ofrecen envíos internacionales?",
      answer: "Actualmente, solo realizamos envíos dentro de España. Estamos trabajando para expandir nuestros servicios a nivel internacional en el futuro."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Preguntas Frecuentes</h1>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

