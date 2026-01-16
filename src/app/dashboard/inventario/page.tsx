'use client'

import { useState } from 'react'
import {
    Search,
    Plus,
    AlertTriangle,
    Package,
    TrendingDown,
    Edit,
    History,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Types =====

interface InventoryItem {
    id: string
    name: string
    currentStock: number
    minimumStock: number
    unit: string
    cost?: number
    lastUpdated: Date
}

// ===== Mock Data =====

const mockInventory: InventoryItem[] = [
    { id: '1', name: 'Carne de Res', currentStock: 15, minimumStock: 20, unit: 'kg', cost: 32000, lastUpdated: new Date(Date.now() - 2 * 60 * 60000) },
    { id: '2', name: 'Pan de Hamburguesa', currentStock: 50, minimumStock: 30, unit: 'unidades', cost: 1500, lastUpdated: new Date(Date.now() - 5 * 60 * 60000) },
    { id: '3', name: 'Queso Mozzarella', currentStock: 3, minimumStock: 10, unit: 'kg', cost: 28000, lastUpdated: new Date(Date.now() - 8 * 60 * 60000) },
    { id: '4', name: 'Papas Francesas', currentStock: 8, minimumStock: 15, unit: 'kg', cost: 8000, lastUpdated: new Date(Date.now() - 12 * 60 * 60000) },
    { id: '5', name: 'Tomate', currentStock: 12, minimumStock: 10, unit: 'kg', cost: 5000, lastUpdated: new Date(Date.now() - 24 * 60 * 60000) },
    { id: '6', name: 'Lechuga', currentStock: 8, minimumStock: 8, unit: 'kg', cost: 4000, lastUpdated: new Date(Date.now() - 24 * 60 * 60000) },
    { id: '7', name: 'Coca Cola 400ml', currentStock: 120, minimumStock: 50, unit: 'unidades', cost: 2000, lastUpdated: new Date(Date.now() - 48 * 60 * 60000) },
    { id: '8', name: 'Aceite de Cocina', currentStock: 5, minimumStock: 5, unit: 'litros', cost: 12000, lastUpdated: new Date(Date.now() - 72 * 60 * 60000) },
]

// ===== Helper Functions =====

function getStockStatus(item: InventoryItem): 'critical' | 'low' | 'normal' {
    const ratio = item.currentStock / item.minimumStock
    if (ratio <= 0.3) return 'critical'
    if (ratio <= 1) return 'low'
    return 'normal'
}

function getStatusStyle(status: 'critical' | 'low' | 'normal') {
    switch (status) {
        case 'critical':
            return { bg: 'bg-red-100', text: 'text-red-700', label: 'Crítico' }
        case 'low':
            return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Bajo' }
        case 'normal':
            return { bg: 'bg-green-100', text: 'text-green-700', label: 'Normal' }
    }
}

function formatTimeAgo(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return 'Hace menos de 1 hora'
    if (diffHours < 24) return `Hace ${diffHours}h`
    const diffDays = Math.floor(diffHours / 24)
    return `Hace ${diffDays} días`
}

// ===== Components =====

function AlertCard({ items }: { items: InventoryItem[] }) {
    const criticalItems = items.filter(i => getStockStatus(i) === 'critical')

    if (criticalItems.length === 0) return null

    return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-red-800">Stock Crítico</h3>
                    <p className="text-sm text-red-600 mt-1">
                        {criticalItems.length} productos necesitan reposición urgente:
                    </p>
                    <ul className="mt-2 space-y-1">
                        {criticalItems.map(item => (
                            <li key={item.id} className="text-sm text-red-700">
                                • {item.name}: {item.currentStock} {item.unit} (mín: {item.minimumStock})
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function InventoryRow({ item }: { item: InventoryItem }) {
    const status = getStockStatus(item)
    const statusStyle = getStatusStyle(status)

    return (
        <tr className="hover:bg-slate-50 transition-colors">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg">
                        <Package className="w-5 h-5 text-slate-500" />
                    </div>
                    <span className="font-medium text-slate-900">{item.name}</span>
                </div>
            </td>
            <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                    <span className={cn(
                        'font-semibold',
                        status === 'critical' ? 'text-red-600' :
                            status === 'low' ? 'text-amber-600' : 'text-slate-900'
                    )}>
                        {item.currentStock}
                    </span>
                    <span className="text-slate-400">{item.unit}</span>
                    {status !== 'normal' && (
                        <TrendingDown className={cn(
                            'w-4 h-4',
                            status === 'critical' ? 'text-red-500' : 'text-amber-500'
                        )} />
                    )}
                </div>
            </td>
            <td className="px-4 py-4 text-sm text-slate-600">
                {item.minimumStock} {item.unit}
            </td>
            <td className="px-4 py-4">
                <span className={cn(
                    'inline-flex px-2.5 py-1 text-xs font-medium rounded-full',
                    statusStyle.bg,
                    statusStyle.text
                )}>
                    {statusStyle.label}
                </span>
            </td>
            <td className="px-4 py-4 text-sm text-slate-500">
                {formatTimeAgo(item.lastUpdated)}
            </td>
            <td className="px-4 py-4">
                <div className="flex items-center gap-1">
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                        <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                        <History className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

// ===== Main Page =====

export default function InventarioPage() {
    const [inventory] = useState(mockInventory)
    const [searchQuery, setSearchQuery] = useState('')
    const [filter, setFilter] = useState<'all' | 'low' | 'critical'>('all')

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
        const status = getStockStatus(item)
        const matchesFilter =
            filter === 'all' ||
            (filter === 'low' && (status === 'low' || status === 'critical')) ||
            (filter === 'critical' && status === 'critical')
        return matchesSearch && matchesFilter
    })

    const criticalCount = inventory.filter(i => getStockStatus(i) === 'critical').length
    const lowCount = inventory.filter(i => getStockStatus(i) === 'low').length

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Inventario</h1>
                    <p className="text-slate-500">
                        {inventory.length} items •
                        {criticalCount > 0 && <span className="text-red-600 font-medium"> {criticalCount} críticos</span>}
                        {lowCount > 0 && <span className="text-amber-600 font-medium"> • {lowCount} bajos</span>}
                    </p>
                </div>

                <button className="btn-primary">
                    <Plus className="w-5 h-5" />
                    Agregar Item
                </button>
            </div>

            {/* Critical Alert */}
            <AlertCard items={inventory} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar ingrediente..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>

                <div className="flex gap-2">
                    {[
                        { id: 'all', label: 'Todos' },
                        { id: 'low', label: '⚠️ Stock Bajo' },
                        { id: 'critical', label: '🔴 Crítico' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setFilter(option.id as typeof filter)}
                            className={cn(
                                'px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                                filter === option.id
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Ingrediente
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Stock Actual
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Stock Mínimo
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Última Actualización
                            </th>
                            <th className="px-4 py-3 w-20"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredInventory.map((item) => (
                            <InventoryRow key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>

                {filteredInventory.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <p>No se encontraron items</p>
                    </div>
                )}
            </div>
        </div>
    )
}
