import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Menú | Restaurante La Delicia',
    description: 'Explora nuestro delicioso menú y haz tu pedido',
}

export default function CatalogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50">
            {children}
        </div>
    )
}
