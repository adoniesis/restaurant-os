'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import {
    Building2, User, Mail, Phone, MapPin, Upload, ChevronRight,
    ChevronLeft, Check, Settings, CreditCard, Utensils, Lock
} from 'lucide-react'

// ===== Types =====

interface FormData {
    // Step 1: Información
    businessName: string
    businessType: string
    ownerName: string
    email: string
    password?: string
    confirmPassword?: string
    phone: string
    address: string
    logo: File | null
    howDidYouFindUs: string

    // Step 2: Configuración
    primaryColor: string
    secondaryColor: string
    operatingHours: string
    deliveryRadius: string

    // Step 3: Pago
    plan: 'basic' | 'professional' | 'enterprise'
    paymentMethod: string
}

const initialFormData: FormData = {
    businessName: '',
    businessType: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    logo: null,
    howDidYouFindUs: '',
    primaryColor: '#2563eb',
    secondaryColor: '#64748b',
    operatingHours: '',
    deliveryRadius: '5',
    plan: 'professional',
    paymentMethod: '',
}

const businessTypes = [
    { value: '', label: 'Selecciona un tipo...' },
    { value: 'restaurant', label: 'Restaurante' },
    { value: 'fast_food', label: 'Comidas Rápidas' },
    { value: 'pizzeria', label: 'Pizzería' },
    { value: 'bakery', label: 'Panadería/Pastelería' },
    { value: 'coffee_shop', label: 'Cafetería' },
    { value: 'food_truck', label: 'Food Truck' },
    { value: 'other', label: 'Otro' },
]

const referralSources = [
    { value: '', label: 'Selecciona una opción...' },
    { value: 'google', label: 'Búsqueda en Google' },
    { value: 'social_media', label: 'Redes Sociales' },
    { value: 'friend', label: 'Recomendación de un amigo' },
    { value: 'ads', label: 'Publicidad' },
    { value: 'other', label: 'Otro' },
]

// ===== Step Indicator Component =====

function StepIndicator({ currentStep }: { currentStep: number }) {
    const steps = [
        { number: 1, label: 'Información' },
        { number: 2, label: 'Configuración' },
        { number: 3, label: 'Pago' },
    ]

    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                    <div className="flex items-center gap-2">
                        <div
                            className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                ${currentStep >= step.number
                                    ? 'bg-brand-primary text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }
              `}
                        >
                            {currentStep > step.number ? <Check className="w-4 h-4" /> : step.number}
                        </div>
                        <span
                            className={`text-sm font-medium ${currentStep >= step.number ? 'text-brand-primary' : 'text-slate-400'
                                }`}
                        >
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <ChevronRight className="w-5 h-5 text-slate-300 mx-3" />
                    )}
                </div>
            ))}
        </div>
    )
}

// ===== Logo Upload Component =====

function LogoUpload({
    value,
    onChange
}: {
    value: File | null
    onChange: (file: File | null) => void
}) {
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            onChange(file)
        }
    }, [onChange])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            onChange(file)
        }
    }

    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                Subir Logo
            </label>
            <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="w-32 h-32 border-2 border-dashed border-brand-primary/50 rounded-xl
                   flex flex-col items-center justify-center cursor-pointer
                   hover:bg-brand-primary/5 transition-colors"
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="logo-upload"
                />
                <label htmlFor="logo-upload" className="cursor-pointer text-center p-4">
                    {value ? (
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 rounded-lg overflow-hidden bg-slate-100">
                                <img
                                    src={URL.createObjectURL(value)}
                                    alt="Logo preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xs text-slate-500">Cambiar</span>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                            <span className="text-xs text-slate-500">
                                Arrastra o haz clic<br />para subir logo
                            </span>
                        </>
                    )}
                </label>
            </div>
        </div>
    )
}

// ===== Main Register Page =====

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [isLoading, setIsLoading] = useState(false)

    const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleNext = () => {
        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            alert('Por favor completa los campos obligatorios')
            return
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Las contraseñas no coinciden')
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Error en el registro')
            }

            // Redirect to dashboard or success page
            window.location.href = '/dashboard'
        } catch (error: any) {
            console.error('Registration error:', error)
            alert(error.message || 'Error al conectar con el servidor')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-50 flex items-center justify-center p-4">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 text-6xl">🍕</div>
                <div className="absolute bottom-20 right-20 text-6xl">🍔</div>
                <div className="absolute top-1/2 left-10 text-4xl">🥤</div>
                <div className="absolute top-1/3 right-16 text-5xl">🍝</div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200/50">
                    {/* Step Indicator */}
                    <StepIndicator currentStep={currentStep} />

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-slate-900 mb-6">
                        Registra tu Negocio
                    </h1>

                    {/* Step 1: Información */}
                    {currentStep === 1 && (
                        <div className="space-y-4">
                            {/* Business Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Nombre del Negocio
                                </label>
                                <div className="relative">
                                    <Building2 className="input-icon" />
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => updateField('businessName', e.target.value)}
                                        placeholder="Ej: Restaurante La Delicia"
                                        className="input-base input-with-icon"
                                    />
                                </div>
                            </div>

                            {/* Business Type */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Tipo de Negocio
                                </label>
                                <select
                                    value={formData.businessType}
                                    onChange={(e) => updateField('businessType', e.target.value)}
                                    className="input-base"
                                >
                                    {businessTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Owner Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Nombre del Propietario
                                </label>
                                <div className="relative">
                                    <User className="input-icon" />
                                    <input
                                        type="text"
                                        value={formData.ownerName}
                                        onChange={(e) => updateField('ownerName', e.target.value)}
                                        placeholder="Ej: Juan Pérez"
                                        className="input-base input-with-icon"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="input-icon" />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        placeholder="ejemplo@email.com"
                                        className="input-base input-with-icon"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Contraseña de Acceso
                                </label>
                                <div className="relative">
                                    <Lock className="input-icon" />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => updateField('password', e.target.value)}
                                        placeholder="Min. 8 caracteres"
                                        className="input-base input-with-icon"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="input-icon" />
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => updateField('confirmPassword', e.target.value)}
                                        placeholder="Repite tu contraseña"
                                        className="input-base input-with-icon"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Teléfono
                                </label>
                                <div className="relative">
                                    <Phone className="input-icon" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => updateField('phone', e.target.value)}
                                        placeholder="+57 300 123 4567"
                                        className="input-base input-with-icon"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Dirección
                                </label>
                                <div className="relative">
                                    <MapPin className="input-icon" />
                                    <input
                                        type="text"
                                        value={formData.address}
                                        onChange={(e) => updateField('address', e.target.value)}
                                        placeholder="Ej: Calle 10 #20-30"
                                        className="input-base input-with-icon"
                                    />
                                </div>
                            </div>

                            {/* Logo Upload */}
                            <LogoUpload
                                value={formData.logo}
                                onChange={(file) => updateField('logo', file)}
                            />

                            {/* How did you find us */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    ¿Cómo nos conociste?
                                </label>
                                <select
                                    value={formData.howDidYouFindUs}
                                    onChange={(e) => updateField('howDidYouFindUs', e.target.value)}
                                    className="input-base"
                                >
                                    {referralSources.map(source => (
                                        <option key={source.value} value={source.value}>{source.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Configuración */}
                    {currentStep === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-600 mb-4">
                                <Settings className="w-5 h-5" />
                                <span className="font-medium">Configura tu negocio</span>
                            </div>

                            {/* Color Pickers */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Color Primario
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={formData.primaryColor}
                                            onChange={(e) => updateField('primaryColor', e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={formData.primaryColor}
                                            onChange={(e) => updateField('primaryColor', e.target.value)}
                                            className="input-base flex-1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">
                                        Color Secundario
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={formData.secondaryColor}
                                            onChange={(e) => updateField('secondaryColor', e.target.value)}
                                            className="w-10 h-10 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={formData.secondaryColor}
                                            onChange={(e) => updateField('secondaryColor', e.target.value)}
                                            className="input-base flex-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Operating Hours */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Horario de Atención
                                </label>
                                <textarea
                                    value={formData.operatingHours}
                                    onChange={(e) => updateField('operatingHours', e.target.value)}
                                    placeholder="Ej: Lun-Vie: 8am-10pm, Sáb-Dom: 9am-11pm"
                                    className="input-base resize-none"
                                    rows={3}
                                />
                            </div>

                            {/* Delivery Radius */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Radio de Entrega (km)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    value={formData.deliveryRadius}
                                    onChange={(e) => updateField('deliveryRadius', e.target.value)}
                                    className="w-full"
                                />
                                <div className="text-center text-sm text-slate-600 mt-1">
                                    {formData.deliveryRadius} km
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Pago */}
                    {currentStep === 3 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-600 mb-4">
                                <CreditCard className="w-5 h-5" />
                                <span className="font-medium">Selecciona tu plan</span>
                            </div>

                            {/* Plans */}
                            <div className="space-y-3">
                                {[
                                    { id: 'basic', name: 'Básico', price: '$50', features: ['200 pedidos/mes', '1 usuario'] },
                                    { id: 'professional', name: 'Profesional', price: '$100', features: ['1000 pedidos/mes', '3 usuarios', 'Reportes'] },
                                    { id: 'enterprise', name: 'Empresarial', price: '$200', features: ['Ilimitado', 'Usuarios ilimitados', 'Soporte 24/7'] },
                                ].map(plan => (
                                    <label
                                        key={plan.id}
                                        className={`
                      flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all
                      ${formData.plan === plan.id
                                                ? 'border-brand-primary bg-brand-primary/5'
                                                : 'border-slate-200 hover:border-slate-300'}
                    `}
                                    >
                                        <input
                                            type="radio"
                                            name="plan"
                                            value={plan.id}
                                            checked={formData.plan === plan.id}
                                            onChange={(e) => updateField('plan', e.target.value as FormData['plan'])}
                                            className="sr-only"
                                        />
                                        <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center
                      ${formData.plan === plan.id ? 'border-brand-primary' : 'border-slate-300'}
                    `}>
                                            {formData.plan === plan.id && (
                                                <div className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-slate-900">{plan.name}</div>
                                            <div className="text-sm text-slate-500">{plan.features.join(' • ')}</div>
                                        </div>
                                        <div className="text-lg font-bold text-brand-primary">{plan.price}/mes</div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-3 mt-8">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className={`flex-1 btn-secondary py-3 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Volver
                        </button>
                        {currentStep < 3 ? (
                            <button
                                onClick={handleNext}
                                className="flex-1 btn-primary py-3"
                            >
                                Siguiente
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="flex-1 btn-primary py-3"
                            >
                                {isLoading ? 'Procesando...' : 'Completar Registro'}
                            </button>
                        )}
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-sm text-slate-600 mt-6">
                        ¿Ya tienes cuenta?{' '}
                        <Link
                            href="/auth/login"
                            className="font-medium text-brand-primary hover:underline"
                        >
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>

                {/* Timestamp */}
                <div className="text-center mt-4 text-xs text-slate-400">
                    {new Date().toLocaleDateString('es-CO', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </div>
            </div>
        </div>
    )
}
