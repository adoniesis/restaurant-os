'use client'

import { useState } from 'react'
import {
    Store,
    Clock,
    MapPin,
    Smartphone,
    CreditCard,
    Palette,
    MessageSquare,
    Save,
    Upload,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ===== Types =====

interface BusinessConfig {
    name: string
    description: string
    phone: string
    email: string
    address: string
    logo?: string
    primaryColor: string
    secondaryColor: string
    // Operating hours
    operatingHours: {
        [key: string]: { open: string; close: string; closed: boolean }
    }
    // Delivery
    deliveryRadius: number
    deliveryBaseCost: number
    freeDeliveryMinimum: number
    // Payments
    nequiEnabled: boolean
    nequiNumber: string
    daviplataEnabled: boolean
    daviplataNumber: string
    bancolombiaEnabled: boolean
    bancolombiaAccount: string
    cashEnabled: boolean
    dataphoneEnabled: boolean
}

const defaultConfig: BusinessConfig = {
    name: 'Restaurante La Delicia',
    description: 'Los mejores sabores de la ciudad con ingredientes frescos y de calidad.',
    phone: '+57 300 123 4567',
    email: 'contacto@ladelicia.com',
    address: 'Cra 45 #28-15, Medellín, Colombia',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    operatingHours: {
        lunes: { open: '08:00', close: '22:00', closed: false },
        martes: { open: '08:00', close: '22:00', closed: false },
        miercoles: { open: '08:00', close: '22:00', closed: false },
        jueves: { open: '08:00', close: '22:00', closed: false },
        viernes: { open: '08:00', close: '23:00', closed: false },
        sabado: { open: '09:00', close: '23:00', closed: false },
        domingo: { open: '09:00', close: '21:00', closed: false },
    },
    deliveryRadius: 5,
    deliveryBaseCost: 5000,
    freeDeliveryMinimum: 50000,
    nequiEnabled: true,
    nequiNumber: '3001234567',
    daviplataEnabled: true,
    daviplataNumber: '3001234567',
    bancolombiaEnabled: true,
    bancolombiaAccount: '123-456789-01',
    cashEnabled: true,
    dataphoneEnabled: true,
}

const tabs = [
    { id: 'general', label: 'Información', icon: Store },
    { id: 'hours', label: 'Horarios', icon: Clock },
    { id: 'delivery', label: 'Delivery', icon: MapPin },
    { id: 'payments', label: 'Pagos', icon: CreditCard },
    { id: 'brand', label: 'Marca', icon: Palette },
]

const daysOfWeek = [
    { key: 'lunes', label: 'Lunes' },
    { key: 'martes', label: 'Martes' },
    { key: 'miercoles', label: 'Miércoles' },
    { key: 'jueves', label: 'Jueves' },
    { key: 'viernes', label: 'Viernes' },
    { key: 'sabado', label: 'Sábado' },
    { key: 'domingo', label: 'Domingo' },
]

// ===== Main Page =====

export default function ConfiguracionPage() {
    const [config, setConfig] = useState<BusinessConfig>(defaultConfig)
    const [activeTab, setActiveTab] = useState('general')
    const [isSaving, setIsSaving] = useState(false)

    const updateConfig = <K extends keyof BusinessConfig>(key: K, value: BusinessConfig[K]) => {
        setConfig(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        await new Promise(r => setTimeout(r, 1000))
        setIsSaving(false)
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Configuración</h1>
                    <p className="text-slate-500">Personaliza tu negocio</p>
                </div>

                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="btn-primary"
                >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="flex gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-2 pb-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                                activeTab === tab.id
                                    ? 'border-brand-primary text-brand-primary'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
                            )}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                {/* General Tab */}
                {activeTab === 'general' && (
                    <div className="space-y-6 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Logo del Negocio
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Store className="w-8 h-8 text-slate-400" />
                                </div>
                                <button className="btn-secondary">
                                    <Upload className="w-4 h-4" />
                                    Subir Logo
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Nombre del Negocio
                            </label>
                            <input
                                type="text"
                                value={config.name}
                                onChange={(e) => updateConfig('name', e.target.value)}
                                className="input-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Descripción
                            </label>
                            <textarea
                                value={config.description}
                                onChange={(e) => updateConfig('description', e.target.value)}
                                rows={3}
                                className="input-base resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={config.phone}
                                    onChange={(e) => updateConfig('phone', e.target.value)}
                                    className="input-base"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={config.email}
                                    onChange={(e) => updateConfig('email', e.target.value)}
                                    className="input-base"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Dirección
                            </label>
                            <input
                                type="text"
                                value={config.address}
                                onChange={(e) => updateConfig('address', e.target.value)}
                                className="input-base"
                            />
                        </div>
                    </div>
                )}

                {/* Hours Tab */}
                {activeTab === 'hours' && (
                    <div className="space-y-4 max-w-2xl">
                        <p className="text-sm text-slate-500 mb-4">
                            Configura los horarios de atención de tu negocio
                        </p>

                        {daysOfWeek.map((day) => (
                            <div key={day.key} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                                <div className="w-24">
                                    <span className="font-medium text-slate-900">{day.label}</span>
                                </div>

                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={!config.operatingHours[day.key].closed}
                                        onChange={(e) => {
                                            const hours = { ...config.operatingHours }
                                            hours[day.key] = { ...hours[day.key], closed: !e.target.checked }
                                            updateConfig('operatingHours', hours)
                                        }}
                                        className="w-4 h-4 text-brand-primary rounded"
                                    />
                                    <span className="text-sm text-slate-600">Abierto</span>
                                </label>

                                {!config.operatingHours[day.key].closed && (
                                    <>
                                        <input
                                            type="time"
                                            value={config.operatingHours[day.key].open}
                                            onChange={(e) => {
                                                const hours = { ...config.operatingHours }
                                                hours[day.key] = { ...hours[day.key], open: e.target.value }
                                                updateConfig('operatingHours', hours)
                                            }}
                                            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                                        />
                                        <span className="text-slate-400">a</span>
                                        <input
                                            type="time"
                                            value={config.operatingHours[day.key].close}
                                            onChange={(e) => {
                                                const hours = { ...config.operatingHours }
                                                hours[day.key] = { ...hours[day.key], close: e.target.value }
                                                updateConfig('operatingHours', hours)
                                            }}
                                            className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg"
                                        />
                                    </>
                                )}

                                {config.operatingHours[day.key].closed && (
                                    <span className="text-sm text-red-500 font-medium">Cerrado</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Delivery Tab */}
                {activeTab === 'delivery' && (
                    <div className="space-y-6 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Radio de Entrega (km)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={config.deliveryRadius}
                                onChange={(e) => updateConfig('deliveryRadius', parseInt(e.target.value))}
                                className="w-full"
                            />
                            <p className="text-sm text-slate-500 mt-1">{config.deliveryRadius} km</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Costo Base de Domicilio
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={config.deliveryBaseCost}
                                    onChange={(e) => updateConfig('deliveryBaseCost', parseInt(e.target.value))}
                                    className="input-base pl-8"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                                Domicilio Gratis desde
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                                <input
                                    type="number"
                                    value={config.freeDeliveryMinimum}
                                    onChange={(e) => updateConfig('freeDeliveryMinimum', parseInt(e.target.value))}
                                    className="input-base pl-8"
                                />
                            </div>
                            <p className="text-sm text-slate-500 mt-1">
                                Pedidos superiores a este monto tendrán domicilio gratis
                            </p>
                        </div>
                    </div>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                    <div className="space-y-6 max-w-2xl">
                        <p className="text-sm text-slate-500 mb-4">
                            Configura los métodos de pago que aceptas
                        </p>

                        {/* Nequi */}
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <label className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <span className="font-medium text-slate-900">Nequi</span>
                                        <p className="text-xs text-slate-500">Pago con QR</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={config.nequiEnabled}
                                    onChange={(e) => updateConfig('nequiEnabled', e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded"
                                />
                            </label>
                            {config.nequiEnabled && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <input
                                        type="text"
                                        value={config.nequiNumber}
                                        onChange={(e) => updateConfig('nequiNumber', e.target.value)}
                                        placeholder="Número Nequi"
                                        className="input-base"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Daviplata */}
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <label className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📱</span>
                                    <div>
                                        <span className="font-medium text-slate-900">Daviplata</span>
                                        <p className="text-xs text-slate-500">Pago con QR</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={config.daviplataEnabled}
                                    onChange={(e) => updateConfig('daviplataEnabled', e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded"
                                />
                            </label>
                            {config.daviplataEnabled && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <input
                                        type="text"
                                        value={config.daviplataNumber}
                                        onChange={(e) => updateConfig('daviplataNumber', e.target.value)}
                                        placeholder="Número Daviplata"
                                        className="input-base"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Bancolombia */}
                        <div className="p-4 border border-slate-200 rounded-lg">
                            <label className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🏦</span>
                                    <div>
                                        <span className="font-medium text-slate-900">Bancolombia</span>
                                        <p className="text-xs text-slate-500">Transferencia QR</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={config.bancolombiaEnabled}
                                    onChange={(e) => updateConfig('bancolombiaEnabled', e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded"
                                />
                            </label>
                            {config.bancolombiaEnabled && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <input
                                        type="text"
                                        value={config.bancolombiaAccount}
                                        onChange={(e) => updateConfig('bancolombiaAccount', e.target.value)}
                                        placeholder="Número de Cuenta"
                                        className="input-base"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Other methods */}
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 p-4 border border-slate-200 rounded-lg flex-1">
                                <input
                                    type="checkbox"
                                    checked={config.cashEnabled}
                                    onChange={(e) => updateConfig('cashEnabled', e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded"
                                />
                                <span>💵 Efectivo</span>
                            </label>
                            <label className="flex items-center gap-2 p-4 border border-slate-200 rounded-lg flex-1">
                                <input
                                    type="checkbox"
                                    checked={config.dataphoneEnabled}
                                    onChange={(e) => updateConfig('dataphoneEnabled', e.target.checked)}
                                    className="w-5 h-5 text-brand-primary rounded"
                                />
                                <span>💳 Datafono</span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Brand Tab */}
                {activeTab === 'brand' && (
                    <div className="space-y-6 max-w-2xl">
                        <p className="text-sm text-slate-500 mb-4">
                            Personaliza la apariencia de tu catálogo web
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Color Primario
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={config.primaryColor}
                                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={config.primaryColor}
                                        onChange={(e) => updateConfig('primaryColor', e.target.value)}
                                        className="input-base flex-1"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Color Secundario
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={config.secondaryColor}
                                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                                        className="w-12 h-12 rounded-lg cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={config.secondaryColor}
                                        onChange={(e) => updateConfig('secondaryColor', e.target.value)}
                                        className="input-base flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Vista Previa
                            </label>
                            <div
                                className="p-6 rounded-xl border-2"
                                style={{ borderColor: config.primaryColor }}
                            >
                                <div
                                    className="h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: config.primaryColor }}
                                >
                                    {config.name}
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        className="px-4 py-2 text-sm font-medium rounded-lg text-white"
                                        style={{ backgroundColor: config.primaryColor }}
                                    >
                                        Botón Primario
                                    </button>
                                    <button
                                        className="px-4 py-2 text-sm font-medium rounded-lg"
                                        style={{ backgroundColor: config.secondaryColor, color: 'white' }}
                                    >
                                        Botón Secundario
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
