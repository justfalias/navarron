import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Providers } from './providers'
import { CartProvider } from '@/components/cart-provider'
import { SearchDialogProvider } from '@/components/search-dialog-provider'
import { Toaster } from "@/components/ui/toaster"
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { ErrorBoundary } from '@/components/error-boundary'
import { getServerCart } from '@/app/actions/server-cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Navarron - El Marketplace de Navarra',
  description: 'Descubre y compra productos locales de Navarra',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const initialCart = await getServerCart()

  return (
    <html lang="es" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <Providers>
            <CartProvider initialCart={initialCart}>
              <SearchDialogProvider>
                <ErrorBoundary>
                  <div className="flex flex-col min-h-screen">
                    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                      <div className="container mx-auto px-4">
                        <MainNav />
                      </div>
                    </header>
                    <main className="flex-1">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </ErrorBoundary>
              </SearchDialogProvider>
            </CartProvider>
          </Providers>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}

