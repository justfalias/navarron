import { NextRequest } from 'next/server'
import { getServerCart } from '@/app/actions/server-cart'

export async function GET(request: NextRequest) {
  const responseStream = new TransformStream()
  const writer = responseStream.writable.getWriter()
  const encoder = new TextEncoder()

  const writeEvent = async (data: any) => {
    await writer.write(encoder.encode(`data: ${JSON.stringify(data)}\n\n`))
  }

  const sendCartUpdate = async () => {
    const cart = await getServerCart()
    await writeEvent({ type: 'cart-update', cart })
  }

  // Enviar el estado inicial del carrito
  await sendCartUpdate()

  // Simular actualizaciones periódicas (en una implementación real, esto se activaría por cambios reales en el carrito)
  const interval = setInterval(async () => {
    await sendCartUpdate()
  }, 5000)

  request.signal.addEventListener('abort', () => {
    clearInterval(interval)
    writer.close()
  })

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

