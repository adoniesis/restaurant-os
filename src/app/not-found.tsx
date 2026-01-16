import Link from 'next/link'
import { Search, Home, LayoutDashboard, ShoppingBag, ClipboardList, HelpCircle } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('/images/food-pattern.svg')] opacity-5" />

            <div className="relative z-10 max-w-md w-full text-center">
                {/* Chef illustration placeholder - using emoji and styled text for now */}
                <div className="mb-8">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center relative">
                        <span className="text-8xl">👨‍🍳</span>
                        <div className="absolute -right-2 -top-2 w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                            <span className="text-2xl">❓</span>
                        </div>
                        <div className="absolute -left-4 top-1/2 w-20 h-20 bg-slate-100 rounded-full border-4 border-slate-200" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-7xl font-bold text-brand-primary mb-4">
                    404
                </h1>

                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                    Página no encontrada
                </h2>

                <p className="text-slate-600 mb-8">
                    Lo sentimos, la página que buscas no existe o fue movida.
                </p>

                {/* Search bar */}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="¿Qué estás buscando?"
                        className="w-full px-4 py-3 pl-11 bg-white border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
                     text-slate-900 placeholder:text-slate-400"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>

                {/* Primary button */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3
                   bg-brand-primary text-white font-medium rounded-lg
                   hover:bg-blue-700 transition-colors mb-8"
                >
                    <Home className="w-5 h-5" />
                    Volver al inicio
                </Link>

                {/* Quick links */}
                <div className="flex items-center justify-center gap-6 text-sm">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-1.5 text-slate-600 hover:text-brand-primary transition-colors"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/menu"
                        className="flex items-center gap-1.5 text-slate-600 hover:text-brand-primary transition-colors"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Productos
                    </Link>
                    <Link
                        href="/dashboard/pedidos"
                        className="flex items-center gap-1.5 text-slate-600 hover:text-brand-primary transition-colors"
                    >
                        <ClipboardList className="w-4 h-4" />
                        Pedidos
                    </Link>
                    <Link
                        href="/help"
                        className="flex items-center gap-1.5 text-slate-600 hover:text-brand-primary transition-colors"
                    >
                        <HelpCircle className="w-4 h-4" />
                        Ayuda
                    </Link>
                </div>
            </div>

            {/* Timestamp - matching the design */}
            <div className="absolute bottom-4 right-4 text-xs text-slate-400">
                {new Date().toLocaleDateString('es-CO', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
        </div>
    )
}
