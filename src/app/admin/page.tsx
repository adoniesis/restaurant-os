'use client'

import {
    Users,
    Store,
    CreditCard,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'

// ===== Mock Data =====

const stats = [
    {
        title: 'Ingresos Totales',
        value: 12500000,
        change: '+12.5%',
        trend: 'up',
        icon: CreditCard,
        color: 'text-green-600',
        bg: 'bg-green-100',
    },
    {
        title: 'Tenants Activos',
        value: 45,
        change: '+3',
        trend: 'up',
        icon: Store,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
    },
    {
        title: 'Usuarios Totales',
        value: 1250,
        change: '+15.2%',
        trend: 'up',
        icon: Users,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
    },
    {
        title: 'Tasa de Cancelación',
        value: '2.4%',
        change: '-0.5%',
        trend: 'down',
        icon: Activity,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
        inverse: true, // down is good
    },
]

const recentTenants = [
    {
        id: '1',
        name: 'Restaurante La Delicia',
        plan: 'Profesional',
        status: 'active',
        revenue: 450000,
        joined: 'Hace 2 días',
    },
    {
        id: '2',
        name: 'Burger King Local',
        plan: 'Empresarial',
        status: 'active',
        revenue: 1200000,
        joined: 'Hace 5 días',
    },
    {
        id: '3',
        name: 'Pizza Express',
        plan: 'Básico',
        status: 'pending',
        revenue: 0,
        joined: 'Hace 1 hora',
    },
    {
        id: '4',
        name: 'Sushi Master',
        plan: 'Profesional',
        status: 'suspended',
        revenue: 850000,
        joined: 'Hace 2 semanas',
    },
]

// ===== Components =====

function StatCard({ stat }: { stat: typeof stats[0] }) {
    const isPositive = stat.trend === 'up'
    const isGood = stat.inverse ? !isPositive : isPositive

    return (
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <div className={cn('p-3 rounded-xl', stat.bg)}>
                    <stat.icon className={cn('w-6 h-6', stat.color)} />
                </div>
                <div className={cn(
                    'flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-full',
                    isGood ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                )}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.change}
                </div>
            </div>
            <p className="text-sm text-slate-500 font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">
                {typeof stat.value === 'number' && stat.title.includes('Ingresos')
                    ? formatPrice(stat.value)
                    : stat.value}
            </h3>
        </div>
    )
}

function RecentTenantsTable() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                <h3 className="font-bold text-slate-900 text-lg">Últimos Registros</h3>
                <button className="text-sm text-purple-600 font-medium hover:text-purple-700">Ver todos</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Restaurante</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Estado</th>
                            <th className="px-6 py-4 text-right">Ingresos</th>
                            <th className="px-6 py-4 text-right">Registro</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentTenants.map((tenant) => (
                            <tr key={tenant.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">
                                    {tenant.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        'px-2 py-1 rounded-full text-xs font-medium border',
                                        tenant.plan === 'Empresarial' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                            tenant.plan === 'Profesional' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-slate-50 text-slate-700 border-slate-200'
                                    )}>
                                        {tenant.plan}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        'inline-flex items-center gap-1.5',
                                        tenant.status === 'active' ? 'text-green-600' :
                                            tenant.status === 'pending' ? 'text-amber-600' : 'text-red-600'
                                    )}>
                                        <span className={cn(
                                            'w-2 h-2 rounded-full',
                                            tenant.status === 'active' ? 'bg-green-600' :
                                                tenant.status === 'pending' ? 'bg-amber-600' : 'bg-red-600'
                                        )} />
                                        {tenant.status === 'active' ? 'Activo' :
                                            tenant.status === 'pending' ? 'Pendiente' : 'Suspendido'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-slate-700">
                                    {formatPrice(tenant.revenue)}
                                </td>
                                <td className="px-6 py-4 text-right text-slate-500">
                                    {tenant.joined}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Global</h1>
                <p className="text-slate-500">Vista general del rendimiento de la plataforma.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatCard key={stat.title} stat={stat} />
                ))}
            </div>

            {/* Charts & Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Chart Area (Placeholder) */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[400px]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-900 text-lg">Crecimiento de Ingresos</h3>
                        <select className="text-sm border-slate-200 rounded-lg text-slate-600">
                            <option>Últimos 30 días</option>
                            <option>Este año</option>
                        </select>
                    </div>
                    <div className="h-[300px] flex items-end justify-between gap-2 px-4">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((h, i) => (
                            <div key={i} className="w-full bg-purple-100 rounded-t-sm hover:bg-purple-200 transition-colors relative group">
                                <div className="absolute bottom-0 w-full bg-purple-600 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}>
                                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap">
                                        ${(h * 15000).toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-400">
                        <span>Ene</span><span>Feb</span><span>Mar</span><span>Abr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Ago</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dic</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-lg mb-6">Actividad Reciente</h3>
                    <div className="space-y-6">
                        {[
                            { text: 'Nuevo restaurante registrado: Pasta Italiana', time: 'Hace 5 min', type: 'new' },
                            { text: 'Pago de suscripción recibido: $199.000', time: 'Hace 23 min', type: 'money' },
                            { text: 'Alerta: 3 errores de pago detectados', time: 'Hace 1 hora', type: 'alert' },
                            { text: 'Usuario suspendido: Pizza Fake', time: 'Hace 4 horas', type: 'ban' },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-3">
                                <div className={cn(
                                    "w-2 h-2 mt-2 rounded-full flex-shrink-0",
                                    item.type === 'new' ? 'bg-blue-500' :
                                        item.type === 'money' ? 'bg-green-500' :
                                            item.type === 'alert' ? 'bg-red-500' : 'bg-slate-500'
                                )} />
                                <div>
                                    <p className="text-sm text-slate-700">{item.text}</p>
                                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        Ver todo el historial
                    </button>
                </div>

            </div>

            {/* Recent Tenants */}
            <RecentTenantsTable />

        </div>
    )
}
