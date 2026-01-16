'use client'

import { useState } from 'react'
import {
    Search,
    Filter,
    MoreHorizontal,
    ExternalLink,
    Shield,
    Ban,
    CheckCircle,
    LogIn,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

// ===== Mock Data =====

interface Tenant {
    id: string
    name: string
    domain: string
    plan: 'Básico' | 'Profesional' | 'Empresarial'
    status: 'active' | 'suspended' | 'pending'
    revenue: number
    owner: string
    email: string
    createdAt: string
}

const mockTenants: Tenant[] = [
    {
        id: '1',
        name: 'Restaurante La Delicia',
        domain: 'ladelicia.restaurantos.app',
        plan: 'Profesional',
        status: 'active',
        revenue: 4500000,
        owner: 'Juan Pérez',
        email: 'juan@ladelicia.com',
        createdAt: '2025-12-01',
    },
    {
        id: '2',
        name: 'Burger King Local',
        domain: 'burger.restaurantos.app',
        plan: 'Empresarial',
        status: 'active',
        revenue: 12000000,
        owner: 'Admin BK',
        email: 'admin@bk-local.com',
        createdAt: '2025-11-15',
    },
    {
        id: '3',
        name: 'Pizza Express',
        domain: 'pizzaexpress.restaurantos.app',
        plan: 'Básico',
        status: 'pending',
        revenue: 0,
        owner: 'Carlos Ruiz',
        email: 'carlos@pizza.com',
        createdAt: '2026-01-16',
    },
    {
        id: '4',
        name: 'Sushi Master',
        domain: 'sushi.restaurantos.app',
        plan: 'Profesional',
        status: 'suspended',
        revenue: 850000,
        owner: 'Ana Kyoto',
        email: 'ana@sushi.com',
        createdAt: '2025-10-20',
    },
]

// ===== Components =====

function TenantRow({
    tenant,
    onLoginAs
}: {
    tenant: Tenant
    onLoginAs: (id: string) => void
}) {
    return (
        <tr className="hover:bg-slate-50 transition-colors group">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white uppercase",
                        "bg-gradient-to-br from-purple-500 to-indigo-600"
                    )}>
                        {tenant.name.substring(0, 2)}
                    </div>
                    <div>
                        <div className="font-bold text-slate-900">{tenant.name}</div>
                        <div className="text-xs text-slate-500">{tenant.domain}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-slate-900">{tenant.owner}</div>
                <div className="text-xs text-slate-500">{tenant.email}</div>
            </td>
            <td className="px-6 py-4">
                <span className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1.5',
                    tenant.plan === 'Empresarial' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                        tenant.plan === 'Profesional' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                            'bg-slate-50 text-slate-700 border-slate-200'
                )}>
                    {tenant.plan === 'Empresarial' && <Shield className="w-3 h-3" />}
                    {tenant.plan}
                </span>
            </td>
            <td className="px-6 py-4">
                <span className={cn(
                    'inline-flex items-center gap-1.5 text-sm',
                    tenant.status === 'active' ? 'text-green-600' :
                        tenant.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                )}>
                    {tenant.status === 'active' ? <CheckCircle className="w-4 h-4" /> :
                        tenant.status === 'pending' ? <div className="w-2 h-2 rounded-full bg-amber-500" /> :
                            <Ban className="w-4 h-4" />}
                    <span className="capitalize">{tenant.status === 'active' ? 'Activo' : tenant.status === 'pending' ? 'Pendiente' : 'Suspendido'}</span>
                </span>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="font-mono text-slate-700">{formatPrice(tenant.revenue)}</div>
            </td>
            <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onLoginAs(tenant.id)}
                        className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors tooltip-trigger"
                        title="Iniciar sesión como este restaurante"
                    >
                        <LogIn className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function TenantsPage() {
    const [tenants, setTenants] = useState(mockTenants)
    const [search, setSearch] = useState('')

    const filteredTenants = tenants.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
    )

    const handleLoginAs = (id: string) => {
        alert(`Iniciando sesión simulada en el tenant ${id}...`)
        // In logic real: set cookie/token override and redirect to /dashboard
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestión de Restaurantes</h1>
                    <p className="text-slate-500">Administra los {tenants.length} tenants registrados en la plataforma.</p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm shadow-purple-200">
                    <ExternalLink className="w-4 h-4" />
                    Nuevo Tenant
                </button>
            </div>

            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o dominio..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 flex items-center gap-2">
                        <Filter className="w-4 h-4" />
                        Filtros
                    </button>
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50">
                        Exportar
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Restaurante</th>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Propietario</th>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Plan</th>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider text-right">Ingresos (Mes)</th>
                                <th className="px-6 py-4 font-medium text-slate-500 text-xs uppercase tracking-wider text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTenants.map(tenant => (
                                <TenantRow key={tenant.id} tenant={tenant} onLoginAs={handleLoginAs} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-sm text-slate-500">
                    <span>Mostrando {filteredTenants.length} de {tenants.length} resultados</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-slate-200 rounded bg-white disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 border border-slate-200 rounded bg-white disabled:opacity-50" disabled>Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
