import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: {
        default: 'RestaurantOS - Plataforma SaaS para Restaurantes',
        template: '%s | RestaurantOS',
    },
    description: 'Plataforma integral para gestión de restaurantes con WhatsApp, pagos QR y seguimiento en tiempo real.',
    keywords: ['restaurantes', 'delivery', 'WhatsApp', 'pagos QR', 'Colombia', 'SaaS'],
    authors: [{ name: 'RestaurantOS' }],
    openGraph: {
        type: 'website',
        locale: 'es_CO',
        siteName: 'RestaurantOS',
        title: 'RestaurantOS - Plataforma SaaS para Restaurantes',
        description: 'Gestiona tu restaurante con WhatsApp, pagos QR y seguimiento en tiempo real.',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es" className={inter.variable}>
            <body className={`${inter.className} antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
