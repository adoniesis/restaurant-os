'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    CheckCircle,
    Clock,
    ChefHat,
    Package,
    Truck,
    PartyPopper,
    Phone,
    MapPin,
    MessageCircle,
    ArrowLeft,
} from 'lucide-react'
import { formatPrice, formatDateTime, getWhatsAppUrl } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface OrderStatus {
    id: string
    label: string
    emoji: string
    icon: React.ElementType
    description: string
}

interface Order {
    id: string
    orderNumber: string
    trackingCode: string
    status: string
    customer: {
        name: string
        phone: string
        address: string
    }
    restaurant: {
        name: string
        phone: string
    }
    items: { name: string; quantity: number; price: number }[]
    subtotal: number
    deliveryCost: number
    total: number
    deliveryPerson?: {
        name: string
        phone: string
        vehicle: string
        licensePlate: string
    }
    estimatedTime?: number
    timeline: {
        status: string
        timestamp: Date
        message: string
    }[]
    createdAt: Date
}

// ===== Status Configuration =====

const statusSteps: OrderStatus[] = [
    { id: 'confirmed', label: 'Confirmado', emoji: '✅', icon: CheckCircle, description: 'Tu pedido ha sido recibido' },
    { id: 'preparing', label: 'En Preparación', emoji: '👨‍🍳', icon: ChefHat, description: 'Estamos preparando tu pedido' },
    { id: 'ready', label: 'Listo', emoji: '📦', icon: Package, description: 'Tu pedido está listo' },
    { id: 'on_way', label: 'En Camino', emoji: '🚚', icon: Truck, description: 'Tu pedido va en camino' },
    { id: 'delivered', label: 'Entregado', emoji: '🎉', icon: PartyPopper, description: '¡Disfruta tu pedido!' },
]

// ===== Mock Data =====

const mockOrder: Order = {
    id: '1',
    orderNumber: '#1250',
    trackingCode: 'ABC123XY',
    status: 'on_way',
    customer: {
        name: 'Juan Pérez',
        phone: '+57 300 123 4567',
        address: 'Cra 45 #28-15, Medellín',
    },
    restaurant: {
        name: 'Restaurante La Delicia',
        phone: '+57 300 123 4567',
    },
    items: [
        { name: 'Hamburguesa Clásica', quantity: 2, price: 18000 },
        { name: 'Papas Francesas', quantity: 1, price: 8000 },
        { name: 'Coca Cola 400ml', quantity: 2, price: 3500 },
    ],
    subtotal: 51000,
    deliveryCost: 0,
    total: 51000,
    deliveryPerson: {
        name: 'Carlos Rodríguez',
        phone: '+57 301 234 5678',
        vehicle: 'Moto',
        licensePlate: 'ABC-123',
    },
    estimatedTime: 8,
    timeline: [
        { status: 'confirmed', timestamp: new Date(Date.now() - 45 * 60000), message: 'Pedido confirmado' },
        { status: 'preparing', timestamp: new Date(Date.now() - 35 * 60000), message: 'En preparación' },
        { status: 'ready', timestamp: new Date(Date.now() - 15 * 60000), message: 'Pedido listo para entrega' },
        { status: 'on_way', timestamp: new Date(Date.now() - 5 * 60000), message: 'Carlos salió con tu pedido' },
    ],
    createdAt: new Date(Date.now() - 50 * 60000),
}

// ===== Components =====

function StatusTimeline({ order }: { order: Order }) {
    const currentIndex = statusSteps.findIndex(s => s.id === order.status)

    return (
        <div className="py-6">
            {statusSteps.map((step, index) => {
                const isCompleted = index <= currentIndex
                const isCurrent = index === currentIndex
                const timelineEntry = order.timeline.find(t => t.status === step.id)
                const Icon = step.icon

                return (
                    <div key={step.id} className="flex gap-4">
                        {/* Line and Circle */}
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                                    isCompleted
                                        ? isCurrent
                                            ? 'bg-brand-primary text-white ring-4 ring-blue-100'
                                            : 'bg-green-500 text-white'
                                        : 'bg-slate-200 text-slate-400'
                                )}
                            >
                                {isCompleted && !isCurrent ? (
                                    <CheckCircle className="w-5 h-5" />
                                ) : (
                                    <Icon className="w-5 h-5" />
                                )}
                            </div>
                            {index < statusSteps.length - 1 && (
                                <div
                                    className={cn(
                                        'w-0.5 h-16 my-1',
                                        index < currentIndex ? 'bg-green-500' : 'bg-slate-200'
                                    )}
                                />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                            <div className="flex items-center gap-2">
                                <span className="text-lg">{step.emoji}</span>
                                <h3
                                    className={cn(
                                        'font-semibold',
                                        isCompleted ? 'text-slate-900' : 'text-slate-400'
                                    )}
                                >
                                    {step.label}
                                </h3>
                            </div>
                            <p className={cn('text-sm mt-1', isCompleted ? 'text-slate-600' : 'text-slate-400')}>
                                {step.description}
                            </p>
                            {timelineEntry && (
                                <p className="text-xs text-slate-400 mt-1">
                                    {formatDateTime(timelineEntry.timestamp)}
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

function DeliveryCard({ deliveryPerson, estimatedTime }: { deliveryPerson: Order['deliveryPerson']; estimatedTime?: number }) {
    if (!deliveryPerson) return null

    return (
        <div className="bg-gradient-to-r from-brand-primary to-blue-600 rounded-2xl p-4 text-white">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">🚴 Repartidor</h3>
                {estimatedTime && (
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        ⏱️ {estimatedTime} min
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl">
                    👤
                </div>
                <div className="flex-1">
                    <p className="font-semibold">{deliveryPerson.name}</p>
                    <p className="text-sm opacity-80">
                        {deliveryPerson.vehicle} • {deliveryPerson.licensePlate}
                    </p>
                </div>
                <a
                    href={`tel:${deliveryPerson.phone.replace(/\s/g, '')}`}
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                    <Phone className="w-5 h-5" />
                </a>
            </div>
        </div>
    )
}

function OrderSummary({ order }: { order: Order }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900 mb-3">📋 Resumen del Pedido</h3>

            <ul className="space-y-2 text-sm">
                {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                        <span className="text-slate-600">
                            {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-slate-900">
                            {formatPrice(item.price * item.quantity)}
                        </span>
                    </li>
                ))}
            </ul>

            <div className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-sm">
                <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                    <span>Domicilio</span>
                    <span className={order.deliveryCost === 0 ? 'text-green-600 font-medium' : ''}>
                        {order.deliveryCost === 0 ? 'GRATIS' : formatPrice(order.deliveryCost)}
                    </span>
                </div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(order.total)}</span>
                </div>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function TrackingPage({ params }: { params: { code: string } }) {
    const [order, setOrder] = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrder(mockOrder)
            setLoading(false)
        }, 1000)
    }, [params.code])

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary" />
            </div>
        )
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
                <span className="text-6xl mb-4">🔍</span>
                <h1 className="text-xl font-bold text-slate-900 mb-2">Pedido no encontrado</h1>
                <p className="text-slate-500 text-center mb-6">
                    No pudimos encontrar un pedido con el código "{params.code}"
                </p>
                <Link href="/" className="btn-primary">
                    Volver al inicio
                </Link>
            </div>
        )
    }

    const currentStatus = statusSteps.find(s => s.id === order.status)

    return (
        <div className="min-h-screen bg-slate-50 pb-8">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-lg mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="font-bold text-slate-900">Pedido {order.orderNumber}</h1>
                            <p className="text-xs text-slate-500">Código: {order.trackingCode}</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* Current Status Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 text-center">
                    <span className="text-5xl mb-3 block">{currentStatus?.emoji}</span>
                    <h2 className="text-xl font-bold text-slate-900">{currentStatus?.label}</h2>
                    <p className="text-slate-500 mt-1">{currentStatus?.description}</p>

                    {order.estimatedTime && order.status === 'on_way' && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium">
                            <Clock className="w-4 h-4" />
                            Llega en ~{order.estimatedTime} minutos
                        </div>
                    )}
                </div>

                {/* Delivery Person (if on the way) */}
                {order.status === 'on_way' && order.deliveryPerson && (
                    <DeliveryCard deliveryPerson={order.deliveryPerson} estimatedTime={order.estimatedTime} />
                )}

                {/* Delivery Address */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">📍 Dirección de Entrega</h3>
                    <p className="text-slate-600 text-sm">{order.customer.address}</p>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <h3 className="font-semibold text-slate-900 mb-2">📊 Estado del Pedido</h3>
                    <StatusTimeline order={order} />
                </div>

                {/* Order Summary */}
                <OrderSummary order={order} />

                {/* Contact Restaurant */}
                <div className="flex gap-3">
                    <a
                        href={`tel:${order.restaurant.phone.replace(/\s/g, '')}`}
                        className="flex-1 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 text-slate-700 font-medium hover:bg-slate-50"
                    >
                        <Phone className="w-5 h-5" />
                        Llamar
                    </a>
                    <a
                        href={getWhatsAppUrl('573001234567', `Hola, tengo una consulta sobre mi pedido ${order.orderNumber}`)}
                        target="_blank"
                        className="flex-1 py-3 bg-green-500 text-white rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-green-600"
                    >
                        <MessageCircle className="w-5 h-5" />
                        WhatsApp
                    </a>
                </div>
            </div>
        </div>
    )
}
