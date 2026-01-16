'use client'

import { useState } from 'react'
import {
    Clock,
    Phone,
    MapPin,
    DollarSign,
    ChefHat,
    Package,
    Truck,
    CheckCircle,
    MoreVertical,
    Plus,
    Search,
    Filter,
} from 'lucide-react'
import { formatPrice, formatRelativeTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface OrderItem {
    name: string
    quantity: number
    modifiers?: string[]
}

interface Order {
    id: string
    orderNumber: string
    customer: {
        name: string
        phone: string
        address?: string
    }
    items: OrderItem[]
    total: number
    paymentMethod: string
    paymentStatus: 'pending' | 'confirmed'
    status: 'new' | 'confirmed' | 'preparing' | 'ready' | 'on_way' | 'delivered'
    createdAt: Date
    notes?: string
}

// ===== Mock Data =====

const mockOrders: Order[] = [
    {
        id: '1',
        orderNumber: '#1250',
        customer: { name: 'Juan Pérez', phone: '+57 300 123 4567', address: 'Cra 45 #28-15, Medellín' },
        items: [
            { name: 'Hamburguesa Clásica', quantity: 2, modifiers: ['Sin cebolla'] },
            { name: 'Papas Francesas', quantity: 1 },
            { name: 'Coca Cola 400ml', quantity: 2 },
        ],
        total: 52000,
        paymentMethod: 'Nequi',
        paymentStatus: 'confirmed',
        status: 'new',
        createdAt: new Date(Date.now() - 3 * 60000),
        notes: 'Tocar el timbre 2 veces',
    },
    {
        id: '2',
        orderNumber: '#1249',
        customer: { name: 'María López', phone: '+57 301 234 5678', address: 'Calle 50 #30-20' },
        items: [
            { name: 'Pizza Margarita', quantity: 1 },
            { name: 'Limonada Natural', quantity: 2 },
        ],
        total: 38000,
        paymentMethod: 'Efectivo',
        paymentStatus: 'pending',
        status: 'new',
        createdAt: new Date(Date.now() - 8 * 60000),
    },
    {
        id: '3',
        orderNumber: '#1248',
        customer: { name: 'Carlos Ruiz', phone: '+57 302 345 6789' },
        items: [
            { name: 'Combo Familiar', quantity: 1 },
        ],
        total: 65000,
        paymentMethod: 'Wompi',
        paymentStatus: 'confirmed',
        status: 'preparing',
        createdAt: new Date(Date.now() - 15 * 60000),
    },
    {
        id: '4',
        orderNumber: '#1247',
        customer: { name: 'Ana García', phone: '+57 303 456 7890', address: 'Cra 70 #45-30' },
        items: [
            { name: 'Hamburguesa Doble', quantity: 1 },
            { name: 'Malteada Chocolate', quantity: 1 },
        ],
        total: 35000,
        paymentMethod: 'Daviplata',
        paymentStatus: 'confirmed',
        status: 'preparing',
        createdAt: new Date(Date.now() - 25 * 60000),
    },
    {
        id: '5',
        orderNumber: '#1246',
        customer: { name: 'Pedro Martínez', phone: '+57 304 567 8901' },
        items: [
            { name: 'Pizza Pepperoni', quantity: 2 },
            { name: 'Gaseosa 2L', quantity: 1 },
        ],
        total: 72000,
        paymentMethod: 'Bancolombia',
        paymentStatus: 'confirmed',
        status: 'ready',
        createdAt: new Date(Date.now() - 35 * 60000),
    },
    {
        id: '6',
        orderNumber: '#1245',
        customer: { name: 'Laura Jiménez', phone: '+57 305 678 9012', address: 'Calle 10 #20-30' },
        items: [
            { name: 'Ensalada César', quantity: 1 },
            { name: 'Jugo Natural', quantity: 1 },
        ],
        total: 28000,
        paymentMethod: 'Nequi',
        paymentStatus: 'confirmed',
        status: 'on_way',
        createdAt: new Date(Date.now() - 45 * 60000),
    },
]

// ===== Column Configuration =====

const columns = [
    {
        id: 'new',
        title: 'Nuevos',
        icon: Clock,
        color: 'bg-red-500',
        lightBg: 'bg-red-50',
    },
    {
        id: 'preparing',
        title: 'En Preparación',
        icon: ChefHat,
        color: 'bg-blue-500',
        lightBg: 'bg-blue-50',
    },
    {
        id: 'ready',
        title: 'Listos',
        icon: Package,
        color: 'bg-green-500',
        lightBg: 'bg-green-50',
    },
    {
        id: 'on_way',
        title: 'En Camino',
        icon: Truck,
        color: 'bg-purple-500',
        lightBg: 'bg-purple-50',
    },
]

// ===== Components =====

function OrderCard({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: Order['status']) => void }) {
    const [showActions, setShowActions] = useState(false)

    const getNextStatus = (): Order['status'] | null => {
        switch (order.status) {
            case 'new': return 'preparing'
            case 'preparing': return 'ready'
            case 'ready': return 'on_way'
            case 'on_way': return 'delivered'
            default: return null
        }
    }

    const getActionLabel = () => {
        switch (order.status) {
            case 'new': return 'Aceptar Pedido'
            case 'preparing': return 'Marcar Listo'
            case 'ready': return 'Asignar Repartidor'
            case 'on_way': return 'Marcar Entregado'
            default: return ''
        }
    }

    const nextStatus = getNextStatus()

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="p-3 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{order.orderNumber}</span>
                        {order.paymentStatus === 'confirmed' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                                <DollarSign className="w-3 h-3" />
                                Pagado
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">
                                Pendiente
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-400">{formatRelativeTime(order.createdAt)}</span>
                        <button
                            onClick={() => setShowActions(!showActions)}
                            className="p-1 text-slate-400 hover:text-slate-600 rounded"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Customer Info */}
            <div className="p-3 border-b border-slate-100">
                <p className="font-medium text-slate-900">{order.customer.name}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Phone className="w-3 h-3" />
                    {order.customer.phone}
                </div>
                {order.customer.address && (
                    <div className="flex items-start gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{order.customer.address}</span>
                    </div>
                )}
            </div>

            {/* Items */}
            <div className="p-3 border-b border-slate-100">
                <ul className="space-y-1">
                    {order.items.map((item, index) => (
                        <li key={index} className="text-sm">
                            <span className="font-medium text-slate-700">{item.quantity}x</span>
                            <span className="text-slate-600 ml-1">{item.name}</span>
                            {item.modifiers && (
                                <span className="text-xs text-slate-400 ml-1">
                                    ({item.modifiers.join(', ')})
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
                {order.notes && (
                    <p className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
                        📝 {order.notes}
                    </p>
                )}
            </div>

            {/* Footer */}
            <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-slate-500">{order.paymentMethod}</span>
                    <span className="font-bold text-slate-900">{formatPrice(order.total)}</span>
                </div>

                {nextStatus && (
                    <button
                        onClick={() => onStatusChange(order.id, nextStatus)}
                        className={cn(
                            'w-full py-2 text-sm font-medium rounded-lg transition-colors',
                            order.status === 'new'
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-brand-primary text-white hover:bg-blue-700'
                        )}
                    >
                        {getActionLabel()}
                    </button>
                )}
            </div>
        </div>
    )
}

function KanbanColumn({
    column,
    orders,
    onStatusChange
}: {
    column: typeof columns[0]
    orders: Order[]
    onStatusChange: (id: string, status: Order['status']) => void
}) {
    const Icon = column.icon

    return (
        <div className="flex flex-col min-w-[300px] w-[300px]">
            {/* Column Header */}
            <div className={cn('p-3 rounded-t-lg', column.lightBg)}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={cn('p-1.5 rounded-lg', column.color)}>
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="font-semibold text-slate-900">{column.title}</h3>
                    </div>
                    <span className={cn(
                        'px-2 py-0.5 text-sm font-bold rounded-full text-white',
                        column.color
                    )}>
                        {orders.length}
                    </span>
                </div>
            </div>

            {/* Column Content */}
            <div className="flex-1 bg-slate-100 p-3 rounded-b-lg space-y-3 overflow-y-auto max-h-[calc(100vh-280px)]">
                {orders.length === 0 ? (
                    <div className="text-center py-8 text-slate-400">
                        <p className="text-sm">Sin pedidos</p>
                    </div>
                ) : (
                    orders.map((order) => (
                        <OrderCard
                            key={order.id}
                            order={order}
                            onStatusChange={onStatusChange}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function PedidosPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [searchQuery, setSearchQuery] = useState('')

    const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            )
        )
    }

    const getOrdersByStatus = (status: string) => {
        return orders.filter(order => order.status === status)
    }

    const newOrdersCount = getOrdersByStatus('new').length

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
                    <p className="text-slate-500">
                        {newOrdersCount > 0 && (
                            <span className="text-red-600 font-medium">{newOrdersCount} nuevos • </span>
                        )}
                        {orders.length} pedidos en total
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar pedido..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-64 text-sm border border-slate-300 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                        />
                    </div>

                    {/* Filter Button */}
                    <button className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                        <Filter className="w-5 h-5 text-slate-600" />
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.id}
                        column={column}
                        orders={getOrdersByStatus(column.id)}
                        onStatusChange={handleStatusChange}
                    />
                ))}
            </div>
        </div>
    )
}
