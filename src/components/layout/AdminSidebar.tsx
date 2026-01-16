'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    Store,
    Users,
    CreditCard,
    Settings,
    LogOut,
    Menu,
    ChevronLeft,
    ChevronRight,
    Shield,
    Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Navigation Items =====

const adminNavItems = [
    {
        title: 'Global',
        items: [
            { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
            { name: 'Restaurantes', href: '/admin/tenants', icon: Store, badge: 2 },
            { name: 'Usuarios', href: '/admin/users', icon: Users },
        ],
    },
    {
        title: 'Finanzas',
        items: [
            { name: 'Suscripciones', href: '/admin/billing', icon: CreditCard },
            { name: 'Reportes', href: '/admin/reports', icon: Activity },
        ],
    },
    {
        title: 'Sistema',
        items: [
            { name: 'Configuración', href: '/admin/settings', icon: Settings },
        ],
    },
]

// ===== Admin Sidebar Component =====

interface AdminSidebarProps {
    isCollapsed: boolean
    onToggle: () => void
}

export function AdminSidebar({ isCollapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname()

    return (
        <aside
            className={cn(
                'fixed left-0 top-0 z-40 h-screen bg-slate-900 text-slate-100 transition-all duration-300',
                isCollapsed ? 'w-[70px]' : 'w-[260px]'
            )}
        >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
                {!isCollapsed && (
                    <Link href="/admin" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">Super Admin</span>
                    </Link>
                )}
                {isCollapsed && (
                    <div className="w-full flex justify-center">
                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
                {adminNavItems.map((section) => (
                    <div key={section.title} className="mb-6">
                        {!isCollapsed && (
                            <h3 className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                {section.title}
                            </h3>
                        )}
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                                                isActive
                                                    ? 'bg-purple-500/10 text-purple-400'
                                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100',
                                                isCollapsed && 'justify-center'
                                            )}
                                            title={isCollapsed ? item.name : undefined}
                                        >
                                            <item.icon className="w-5 h-5 flex-shrink-0" />
                                            {!isCollapsed && (
                                                <>
                                                    <span className="flex-1">{item.name}</span>
                                                    {item.badge && (
                                                        <span className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </>
                                            )}
                                            {isCollapsed && item.badge && (
                                                <span className="absolute right-2 top-1 w-2 h-2 bg-purple-600 rounded-full" />
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
            <div className="border-t border-slate-800 p-3">
                <button
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-colors',
                        isCollapsed && 'justify-center'
                    )}
                >
                    <LogOut className="w-5 h-5" />
                    {!isCollapsed && <span>Cerrar Sesión</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={onToggle}
                className="absolute -right-3 top-20 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full shadow-sm flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
                {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
        </aside>
    )
}
