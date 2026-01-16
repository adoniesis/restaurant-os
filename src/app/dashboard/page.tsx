'use client'

import { useState } from 'react'
import {
    DollarSign,
    ShoppingBag,
    TrendingUp,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    Users,
    AlertTriangle,
} from 'lucide-react'
import { formatPrice, formatRelativeTime } from '@/lib/utils'

// ===== Types =====

interface MetricCardProps {
    title: string
    value: string
    change?: { value: number; label: string }
    icon: React.ReactNode
    iconBg: string
}

interface OrderItemProps {
    id: string
    customer: string
    items: number
    total: number
    time: Date
    status: 'new' | 'confirmed' | 'preparing' | 'ready'
}

interface ProductItemProps {
    name: string
    sold: number
    revenue: number
    trend: 'up' | 'down' | 'neutral'
}

// ===== Mock Data =====

const mockMetrics = [
    {
        title: 'Ventas Hoy',
        value: formatPrice(1580000),
        change: { value: 12.5, label: 'vs ayer' },
        icon: <DollarSign className="w-6 h-6" />,
        iconBg: 'bg-green-100 text-green-600',
    },
    {
        title: 'Pedidos Hoy',
        value: '47',
        change: { value: 8, label: 'vs ayer' },
        icon: <ShoppingBag className="w-6 h-6" />,
        iconBg: 'bg-blue-100 text-blue-600',
    },
    {
        title: 'Ticket Promedio',
        value: formatPrice(33617),
        change: { value: -2.3, label: 'vs semana pasada' },
        icon: <TrendingUp className="w-6 h-6" />,
        iconBg: 'bg-purple-100 text-purple-600',
    },
    {
        title: 'Tiempo Promedio',
        value: '28 min',
        change: { value: -5, label: 'mejorado' },
        icon: <Clock className="w-6 h-6" />,
        iconBg: 'bg-amber-100 text-amber-600',
    },
]

const mockRecentOrders: OrderItemProps[] = [
    { id: '#1247', customer: 'Juan Pérez', items: 3, total: 45000, time: new Date(Date.now() - 5 * 60000), status: 'new' },
    { id: '#1246', customer: 'María López', items: 2, total: 32000, time: new Date(Date.now() - 12 * 60000), status: 'preparing' },
    { id: '#1245', customer: 'Carlos Ruiz', items: 5, total: 78000, time: new Date(Date.now() - 25 * 60000), status: 'ready' },
    { id: '#1244', customer: 'Ana García', items: 1, total: 18000, time: new Date(Date.now() - 45 * 60000), status: 'confirmed' },
]

const mockTopProducts: ProductItemProps[] = [
    { name: 'Hamburguesa Clásica', sold: 45, revenue: 810000, trend: 'up' },
    { name: 'Pizza Margarita', sold: 32, revenue: 640000, trend: 'up' },
    { name: 'Papas Francesas', sold: 58, revenue: 290000, trend: 'neutral' },
    { name: 'Coca Cola 400ml', sold: 67, revenue: 201000, trend: 'down' },
    { name: 'Combo Familiar', sold: 12, revenue: 540000, trend: 'up' },
]

const mockAlerts = [
    { type: 'warning', message: 'Stock bajo: Papas Francesas (5 unidades)' },
    { type: 'warning', message: 'Stock bajo: Queso Mozzarella (2 kg)' },
    { type: 'info', message: '3 pedidos pendientes de confirmación' },
]

// ===== Components =====

function MetricCard({ title, value, change, icon, iconBg }: MetricCardProps) {
    const isPositive = change && change.value >= 0

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
                    {change && (
                        <div className="flex items-center gap-1 mt-2">
                            {isPositive ? (
                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                            ) : (
                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                            )}
                            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                {Math.abs(change.value)}%
                            </span>
                            <span className="text-sm text-slate-400">{change.label}</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-xl ${iconBg}`}>
                    {icon}
                </div>
            </div>
        </div>
    )
}

function OrderStatusBadge({ status }: { status: OrderItemProps['status'] }) {
    const styles = {
        new: 'bg-red-100 text-red-700',
        confirmed: 'bg-amber-100 text-amber-700',
        preparing: 'bg-blue-100 text-blue-700',
        ready: 'bg-green-100 text-green-700',
    }
    const labels = {
        new: 'Nuevo',
        confirmed: 'Confirmado',
        preparing: 'Preparando',
        ready: 'Listo',
    }

    return (
        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}

function RecentOrdersCard() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Pedidos Recientes</h3>
                    <a href="/dashboard/pedidos" className="text-sm text-brand-primary hover:underline">
                        Ver todos
                    </a>
                </div>
            </div>
            <div className="divide-y divide-slate-100">
                {mockRecentOrders.map((order) => (
                    <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                                    <Package className="w-5 h-5 text-slate-500" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium text-slate-900">{order.id}</span>
                                        <OrderStatusBadge status={order.status} />
                                    </div>
                                    <p className="text-sm text-slate-500">
                                        {order.customer} • {order.items} items
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-slate-900">{formatPrice(order.total)}</p>
                                <p className="text-xs text-slate-400">{formatRelativeTime(order.time)}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TopProductsCard() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">Productos Más Vendidos</h3>
                    <span className="text-xs text-slate-400">Hoy</span>
                </div>
            </div>
            <div className="p-4 space-y-4">
                {mockTopProducts.map((product, index) => (
                    <div key={product.name} className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                            {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-900 truncate">{product.name}</p>
                            <p className="text-xs text-slate-500">{product.sold} vendidos</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-slate-900">{formatPrice(product.revenue)}</p>
                            {product.trend === 'up' && <ArrowUpRight className="w-4 h-4 text-green-500 ml-auto" />}
                            {product.trend === 'down' && <ArrowDownRight className="w-4 h-4 text-red-500 ml-auto" />}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AlertsCard() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Alertas</h3>
            </div>
            <div className="p-4 space-y-3">
                {mockAlerts.map((alert, index) => (
                    <div
                        key={index}
                        className={`flex items-start gap-3 p-3 rounded-lg ${alert.type === 'warning' ? 'bg-amber-50' : 'bg-blue-50'
                            }`}
                    >
                        <AlertTriangle
                            className={`w-5 h-5 flex-shrink-0 ${alert.type === 'warning' ? 'text-amber-500' : 'text-blue-500'
                                }`}
                        />
                        <p className={`text-sm ${alert.type === 'warning' ? 'text-amber-700' : 'text-blue-700'}`}>
                            {alert.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

function QuickStatsCard() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <h3 className="font-semibold text-slate-900 mb-4">Resumen del Día</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Package className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-500">En preparación</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                    <Users className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="text-2xl font-bold text-slate-900">8</p>
                    <p className="text-xs text-slate-500">Clientes nuevos</p>
                </div>
            </div>
        </div>
    )
}

// ===== Main Dashboard Page =====

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Resumen de tu negocio hoy</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockMetrics.map((metric) => (
                    <MetricCard key={metric.title} {...metric} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Recent Orders */}
                <div className="lg:col-span-2">
                    <RecentOrdersCard />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <AlertsCard />
                    <QuickStatsCard />
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TopProductsCard />

                {/* Placeholder for Chart */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Ventas por Hora</h3>
                    <div className="h-64 flex items-center justify-center text-slate-400">
                        <p className="text-center">
                            📊 Gráfica de ventas<br />
                            <span className="text-sm">(Se implementará con Recharts)</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
