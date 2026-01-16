'use client'

import { useState } from 'react'
import {
    CreditCard,
    QrCode,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Filter,
    Eye,
    Download,
} from 'lucide-react'
import { formatPrice, formatDateTime } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

interface PaymentRecord {
    id: string
    orderNumber: string
    customer: string
    amount: number
    method: string
    status: 'pending' | 'confirmed' | 'rejected'
    receiptUrl?: string
    createdAt: Date
    confirmedAt?: Date
}

// ===== Mock Data =====

const mockPayments: PaymentRecord[] = [
    {
        id: '1',
        orderNumber: '#1250',
        customer: 'Juan Pérez',
        amount: 52000,
        method: 'Nequi',
        status: 'pending',
        receiptUrl: '/receipt1.jpg',
        createdAt: new Date(Date.now() - 5 * 60000),
    },
    {
        id: '2',
        orderNumber: '#1249',
        customer: 'María López',
        amount: 38000,
        method: 'Daviplata',
        status: 'pending',
        receiptUrl: '/receipt2.jpg',
        createdAt: new Date(Date.now() - 15 * 60000),
    },
    {
        id: '3',
        orderNumber: '#1248',
        customer: 'Carlos Ruiz',
        amount: 65000,
        method: 'Bancolombia',
        status: 'confirmed',
        receiptUrl: '/receipt3.jpg',
        createdAt: new Date(Date.now() - 45 * 60000),
        confirmedAt: new Date(Date.now() - 40 * 60000),
    },
    {
        id: '4',
        orderNumber: '#1247',
        customer: 'Ana García',
        amount: 28000,
        method: 'Nequi',
        status: 'confirmed',
        receiptUrl: '/receipt4.jpg',
        createdAt: new Date(Date.now() - 2 * 60 * 60000),
        confirmedAt: new Date(Date.now() - 115 * 60000),
    },
    {
        id: '5',
        orderNumber: '#1246',
        customer: 'Pedro Martínez',
        amount: 45000,
        method: 'Daviplata',
        status: 'rejected',
        receiptUrl: '/receipt5.jpg',
        createdAt: new Date(Date.now() - 3 * 60 * 60000),
    },
]

// ===== Components =====

function StatusBadge({ status }: { status: PaymentRecord['status'] }) {
    const config = {
        pending: { label: 'Pendiente', icon: Clock, bg: 'bg-amber-100', text: 'text-amber-700' },
        confirmed: { label: 'Confirmado', icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700' },
        rejected: { label: 'Rechazado', icon: XCircle, bg: 'bg-red-100', text: 'text-red-700' },
    }

    const { label, icon: Icon, bg, text } = config[status]

    return (
        <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium', bg, text)}>
            <Icon className="w-3.5 h-3.5" />
            {label}
        </span>
    )
}

function MethodBadge({ method }: { method: string }) {
    const emoji = method === 'Nequi' ? '💜' : method === 'Daviplata' ? '🔴' : '🟡'

    return (
        <span className="inline-flex items-center gap-1 text-sm">
            <span>{emoji}</span>
            {method}
        </span>
    )
}

function PaymentCard({
    payment,
    onConfirm,
    onReject,
    onViewReceipt
}: {
    payment: PaymentRecord
    onConfirm: () => void
    onReject: () => void
    onViewReceipt: () => void
}) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">{payment.orderNumber}</span>
                        <StatusBadge status={payment.status} />
                    </div>
                    <p className="text-sm text-slate-600">{payment.customer}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                        <MethodBadge method={payment.method} />
                        <span>{formatDateTime(payment.createdAt)}</span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{formatPrice(payment.amount)}</p>
                </div>
            </div>

            {/* Actions for pending payments */}
            {payment.status === 'pending' && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                    <button
                        onClick={onViewReceipt}
                        className="flex-1 py-2 px-3 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-200"
                    >
                        <Eye className="w-4 h-4" />
                        Ver Comprobante
                    </button>
                    <button
                        onClick={onReject}
                        className="py-2 px-4 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="py-2 px-4 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                    >
                        Confirmar
                    </button>
                </div>
            )}
        </div>
    )
}

function StatsCards({ payments }: { payments: PaymentRecord[] }) {
    const pending = payments.filter(p => p.status === 'pending')
    const confirmed = payments.filter(p => p.status === 'confirmed')
    const totalConfirmed = confirmed.reduce((sum, p) => sum + p.amount, 0)

    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-amber-900">{pending.length}</p>
                        <p className="text-sm text-amber-600">Pendientes</p>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-900">{confirmed.length}</p>
                        <p className="text-sm text-green-600">Confirmados hoy</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-blue-900">{formatPrice(totalConfirmed)}</p>
                        <p className="text-sm text-blue-600">Recaudado hoy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function PagosPage() {
    const [payments, setPayments] = useState(mockPayments)
    const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected'>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredPayments = payments.filter(payment => {
        const matchesFilter = filter === 'all' || payment.status === filter
        const matchesSearch =
            payment.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            payment.customer.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const handleConfirm = (paymentId: string) => {
        setPayments(prev =>
            prev.map(p =>
                p.id === paymentId
                    ? { ...p, status: 'confirmed' as const, confirmedAt: new Date() }
                    : p
            )
        )
    }

    const handleReject = (paymentId: string) => {
        setPayments(prev =>
            prev.map(p =>
                p.id === paymentId ? { ...p, status: 'rejected' as const } : p
            )
        )
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Verificación de Pagos</h1>
                    <p className="text-slate-500">Revisa y confirma los comprobantes de pago</p>
                </div>
            </div>

            {/* Stats */}
            <StatsCards payments={payments} />

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por pedido o cliente..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>

                <div className="flex gap-2">
                    {(['all', 'pending', 'confirmed', 'rejected'] as const).map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={cn(
                                'px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap',
                                filter === status
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            )}
                        >
                            {status === 'all' ? 'Todos' :
                                status === 'pending' ? '⏳ Pendientes' :
                                    status === 'confirmed' ? '✅ Confirmados' : '❌ Rechazados'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Payments List */}
            <div className="space-y-3">
                {filteredPayments.map((payment) => (
                    <PaymentCard
                        key={payment.id}
                        payment={payment}
                        onConfirm={() => handleConfirm(payment.id)}
                        onReject={() => handleReject(payment.id)}
                        onViewReceipt={() => console.log('View receipt', payment.id)}
                    />
                ))}

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        <QrCode className="w-12 h-12 mx-auto mb-3" />
                        <p>No hay pagos que coincidan con tu búsqueda</p>
                    </div>
                )}
            </div>
        </div>
    )
}
