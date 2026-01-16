'use client'

import { useState } from 'react'
import {
    Search,
    Filter,
    Phone,
    Mail,
    MapPin,
    Star,
    ShoppingBag,
    DollarSign,
    Calendar,
    ChevronRight,
    Download,
} from 'lucide-react'
import { formatPrice, formatDate, formatPhoneNumber } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface Customer {
    id: string
    name: string
    phone: string
    email?: string
    address?: string
    totalSpent: number
    orderCount: number
    lastOrderAt: Date
    isFrequent: boolean
    createdAt: Date
}

// ===== Mock Data =====

const mockCustomers: Customer[] = [
    {
        id: '1',
        name: 'Juan Pérez',
        phone: '+57 300 123 4567',
        email: 'juan.perez@email.com',
        address: 'Cra 45 #28-15, Medellín',
        totalSpent: 580000,
        orderCount: 24,
        lastOrderAt: new Date(Date.now() - 2 * 24 * 60 * 60000),
        isFrequent: true,
        createdAt: new Date('2024-06-15'),
    },
    {
        id: '2',
        name: 'María López',
        phone: '+57 301 234 5678',
        email: 'maria.lopez@email.com',
        address: 'Calle 50 #30-20, Medellín',
        totalSpent: 320000,
        orderCount: 15,
        lastOrderAt: new Date(Date.now() - 5 * 24 * 60 * 60000),
        isFrequent: true,
        createdAt: new Date('2024-08-20'),
    },
    {
        id: '3',
        name: 'Carlos Ruiz',
        phone: '+57 302 345 6789',
        totalSpent: 145000,
        orderCount: 6,
        lastOrderAt: new Date(Date.now() - 10 * 24 * 60 * 60000),
        isFrequent: false,
        createdAt: new Date('2024-10-05'),
    },
    {
        id: '4',
        name: 'Ana García',
        phone: '+57 303 456 7890',
        email: 'ana.garcia@email.com',
        address: 'Cra 70 #45-30, Envigado',
        totalSpent: 890000,
        orderCount: 42,
        lastOrderAt: new Date(Date.now() - 1 * 24 * 60 * 60000),
        isFrequent: true,
        createdAt: new Date('2024-03-10'),
    },
    {
        id: '5',
        name: 'Pedro Martínez',
        phone: '+57 304 567 8901',
        totalSpent: 45000,
        orderCount: 2,
        lastOrderAt: new Date(Date.now() - 30 * 24 * 60 * 60000),
        isFrequent: false,
        createdAt: new Date('2024-12-01'),
    },
]

// ===== Components =====

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                    {icon}
                </div>
                <div>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                    <p className="text-sm text-slate-500">{title}</p>
                </div>
            </div>
        </div>
    )
}

function CustomerRow({ customer, onClick }: { customer: Customer; onClick: () => void }) {
    return (
        <tr
            onClick={onClick}
            className="hover:bg-slate-50 cursor-pointer transition-colors"
        >
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-900">{customer.name}</span>
                            {customer.isFrequent && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                                    <Star className="w-3 h-3" />
                                    Frecuente
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-500">{customer.phone}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-slate-600">
                {customer.email || '-'}
            </td>
            <td className="px-4 py-4 text-sm text-slate-900 font-medium">
                {customer.orderCount}
            </td>
            <td className="px-4 py-4 text-sm text-slate-900 font-medium">
                {formatPrice(customer.totalSpent)}
            </td>
            <td className="px-4 py-4 text-sm text-slate-500">
                {formatDate(customer.lastOrderAt)}
            </td>
            <td className="px-4 py-4">
                <ChevronRight className="w-5 h-5 text-slate-300" />
            </td>
        </tr>
    )
}

// ===== Main Page =====

export default function ClientesPage() {
    const [customers] = useState(mockCustomers)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'frequent'>('all')

    const filteredCustomers = customers.filter(customer => {
        const matchesSearch =
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.includes(searchQuery) ||
            customer.email?.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesFilter = filter === 'all' || (filter === 'frequent' && customer.isFrequent)
        return matchesSearch && matchesFilter
    })

    const totalCustomers = customers.length
    const frequentCustomers = customers.filter(c => c.isFrequent).length
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Clientes</h1>
                    <p className="text-slate-500">Base de datos de clientes registrados</p>
                </div>

                <button className="btn-secondary">
                    <Download className="w-5 h-5" />
                    Exportar
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                    title="Total Clientes"
                    value={totalCustomers.toString()}
                    icon={<ShoppingBag className="w-5 h-5" />}
                />
                <StatCard
                    title="Clientes Frecuentes"
                    value={frequentCustomers.toString()}
                    icon={<Star className="w-5 h-5" />}
                />
                <StatCard
                    title="Ingresos Totales"
                    value={formatPrice(totalRevenue)}
                    icon={<DollarSign className="w-5 h-5" />}
                />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, teléfono o email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={cn(
                            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                            filter === 'all'
                                ? 'bg-brand-primary text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                    >
                        Todos
                    </button>
                    <button
                        onClick={() => setFilter('frequent')}
                        className={cn(
                            'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                            filter === 'frequent'
                                ? 'bg-brand-primary text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        )}
                    >
                        ⭐ Frecuentes
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Cliente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Pedidos
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Total Gastado
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Última Visita
                            </th>
                            <th className="px-4 py-3 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredCustomers.map((customer) => (
                            <CustomerRow
                                key={customer.id}
                                customer={customer}
                                onClick={() => console.log('View customer', customer.id)}
                            />
                        ))}
                    </tbody>
                </table>

                {filteredCustomers.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p>No se encontraron clientes</p>
                    </div>
                )}
            </div>
        </div>
    )
}
