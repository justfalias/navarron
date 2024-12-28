export function getClientCart() {
  if (typeof window !== 'undefined') {
    const cachedCart = localStorage.getItem('navarron_client_cart')
    return cachedCart ? JSON.parse(cachedCart) : []
  }
  return []
}

export function setClientCart(cart: any[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('navarron_client_cart', JSON.stringify(cart))
  }
}

