'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

interface ProvidersProps {
  children: React.ReactNode
}

export function ViewTransitionsProvider({ children }: ProvidersProps) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.dataset.route = pathname
  }, [pathname])

  return children
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ViewTransitionsProvider>
        {children}
      </ViewTransitionsProvider>
    </QueryClientProvider>
  )
}

