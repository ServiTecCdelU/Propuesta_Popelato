import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800', '900'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ropelato | Materiales para construir, remodelar o ampliar tu hogar',
  description:
    'Corralón y tienda de materiales de construcción y decoración en Entre Ríos. +40 años de experiencia, envío gratis en Entre Ríos y hasta 6 cuotas sin interés.',
  generator: 'v0.app',
  keywords: [
    'Ropelato',
    'corralón',
    'materiales de construcción',
    'Entre Ríos',
    'Concepción del Uruguay',
    'Gualeguaychú',
    'Rosario del Tala',
    'sanitarios',
    'porcelanatos',
  ],
  openGraph: {
    title: 'Ropelato | +40 años construyendo con vos',
    description: 'Productos para construir, remodelar o ampliar tu hogar en Entre Ríos.',
    locale: 'es_AR',
    type: 'website',
    siteName: 'Ropelato',
    images: ['/images/hero-1.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#a8d142',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
