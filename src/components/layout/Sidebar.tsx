'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    UtensilsCrossed,
    ClipboardList,
    CreditCard,
    Package,
    Users,
    BarChart3,
    Settings,
    Truck,
    Tag,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Bell,
    Menu,
    Bot,
    MessageCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Navigation Items =====

const navItems = [
    {
        title: 'Principal',
        items: [
            { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { name: 'Pedidos', href: '/dashboard/pedidos', icon: ClipboardList, badge: 5 },
        ],
    },
    {
        title: 'Gestión',
        items: [
            { name: 'Menú', href: '/dashboard/menu', icon: UtensilsCrossed },
            { name: 'Pedidos', href: '/dashboard/pedidos', icon: ClipboardList, badge: 5 },
            { name: 'Pagos', href: '/dashboard/pagos', icon: CreditCard, badge: 3 },
            { name: 'Inventario', href: '/dashboard/inventario', icon: Package },
            { name: 'Clientes', href: '/dashboard/clientes', icon: Users },
            { name: 'Repartidores', href: '/dashboard/repartidores', icon: Truck },
        ],
    },
    {
        title: 'Marketing',
        items: [
            { name: 'Bot WhatsApp', href: '/dashboard/whatsapp', icon: Bot },
            { name: 'Chat en Vivo', href: '/dashboard/chat', icon: MessageCircle, badge: 2 },
            { name: 'Promociones', href: '/dashboard/promociones', icon: Tag },
            { name: 'Mensajes Masivos', href: '/dashboard/mensajes', icon: MessageSquare },
        ],
    },
    {
        title: 'Análisis',
        items: [
            { name: 'Reportes', href: '/dashboard/reportes', icon: BarChart3 },
        ],
    },
]

// ===== Sidebar Component =====

interface SidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300',
                isCollapsed ? 'w-[70px]' : 'w-[260px]'
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
                {!isCollapsed && (
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                            <UtensilsCrossed className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-slate-900">RestaurantOS</span>
                    </Link>
                )}
                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                            <UtensilsCrossed className="w-5 h-5 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navItems.map((section) => (
                    <div key={section.title} className="mb-6">
                        {!isCollapsed && (
                            <h3 className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                {section.title}
                            </h3>
                        )}
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                                isActive
                                                    ? 'bg-brand-primary/10 text-brand-primary'
                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                                                isCollapsed && 'justify-center'
                                            )}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1">{item.name}</span>
                                                    {item.badge && (
                                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                            {isCollapsed && item.badge && (
                                                <span className="absolute right-2 top-1 w-2 h-2 bg-red-500 rounded-full" />
                                            )}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-200 p-3">
                <Link
                    href="/dashboard/configuracion"
                    className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors',
                        isCollapsed && 'justify-center'
                    )}
                >
                    <Settings className="w-5 h-5" />
                    {!isCollapsed && <span>Configuración</span>}
                </Link>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    )
}

// ===== Header Component =====

interface HeaderProps {
    onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                    <Menu className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-lg font-semibold text-slate-900">Restaurante La Delicia</h1>
                    <p className="text-xs text-slate-500">Plan Profesional • Activo</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Notifications */}
                <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                    <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-medium text-sm">
                        JD
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-slate-900">Juan Delicia</p>
                        <p className="text-xs text-slate-500">Administrador</p>
                    </div>
                </div>
            </div>
        </header>
    )
}

// ===== Default Export =====

export default Sidebar
