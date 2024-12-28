import { useEffect } from 'react'
import { useCart } from '@/components/cart-provider'

export function useCartEvents() {
  const { setItems } = useCart()

  useEffect(() => {
    const eventSource = new EventSource('/api/cart-events')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'cart-update') {
        setItems(data.cart)
      }
    }

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [setItems])
}

