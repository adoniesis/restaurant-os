'use client'

import { useState } from 'react'
import {
    QrCode,
    Copy,
    Check,
    Clock,
    Upload,
    Camera,
    ArrowLeft,
    AlertCircle,
} from 'lucide-react'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

// ===== Types =====

type PaymentMethod = 'nequi' | 'daviplata' | 'bancolombia'

interface PaymentConfig {
    method: PaymentMethod
    label: string
    emoji: string
    color: string
    bgColor: string
    instructions: string[]
    accountNumber: string
    accountHolder: string
}

// ===== Payment Methods Configuration =====

const paymentMethods: Record<PaymentMethod, PaymentConfig> = {
    nequi: {
        method: 'nequi',
        label: 'Nequi',
        emoji: '💜',
        color: 'text-purple-600',
        bgColor: 'bg-purple-600',
        instructions: [
            'Abre tu app Nequi',
            'Toca "Escanear QR" o "Enviar plata"',
            'Escanea el código o ingresa el número',
            'Ingresa el monto exacto',
            'Confirma el pago',
        ],
        accountNumber: '3001234567',
        accountHolder: 'Restaurante La Delicia',
    },
    daviplata: {
        method: 'daviplata',
        label: 'Daviplata',
        emoji: '🔴',
        color: 'text-red-600',
        bgColor: 'bg-red-600',
        instructions: [
            'Abre tu app Daviplata',
            'Selecciona "Pagar con QR" o "Transferir"',
            'Escanea el código o ingresa el número',
            'Ingresa el monto exacto',
            'Confirma el pago',
        ],
        accountNumber: '3001234567',
        accountHolder: 'Restaurante La Delicia',
    },
    bancolombia: {
        method: 'bancolombia',
        label: 'Bancolombia',
        emoji: '🟡',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-500',
        instructions: [
            'Abre tu app Bancolombia',
            'Selecciona "Código QR" o "Transferir"',
            'Escanea el código o ingresa la cuenta',
            'Ingresa el monto exacto',
            'Confirma el pago',
        ],
        accountNumber: '123-456789-01',
        accountHolder: 'Restaurante La Delicia SAS',
    },
}

// ===== Mock Order Data =====

const mockOrderData = {
    orderNumber: '#1250',
    amount: 52000,
    items: [
        { name: 'Hamburguesa Clásica', quantity: 2 },
        { name: 'Papas Francesas', quantity: 1 },
        { name: 'Coca Cola 400ml', quantity: 2 },
    ],
}

// ===== Components =====

function QRCodeDisplay({ method, amount }: { method: PaymentMethod; amount: number }) {
    const config = paymentMethods[method]

    // Generate a simple QR placeholder (in production, use a real QR library)
    const qrData = `${method}://${config.accountNumber}?amount=${amount}`

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">{config.emoji}</span>
                <h2 className={cn('text-xl font-bold', config.color)}>{config.label}</h2>
            </div>

            {/* QR Code */}
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                    <div className="text-center">
                        <QrCode className="w-24 h-24 mx-auto text-slate-800" />
                        <p className="text-xs text-slate-400 mt-2">Código QR</p>
                    </div>
                </div>
            </div>

            {/* Amount */}
            <div className="text-center mb-4">
                <p className="text-sm text-slate-500">Monto a pagar</p>
                <p className="text-3xl font-bold text-slate-900">{formatPrice(amount)}</p>
            </div>

            {/* Account Info */}
            <div className="bg-slate-50 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-500 mb-1">O transfiere a</p>
                <p className="font-mono text-lg font-bold text-slate-900">{config.accountNumber}</p>
                <p className="text-sm text-slate-600">{config.accountHolder}</p>
            </div>
        </div>
    )
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className={cn(
                'inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            )}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4" />
                    Copiado
                </>
            ) : (
                <>
                    <Copy className="w-4 h-4" />
                    Copiar
                </>
            )}
        </button>
    )
}

function PaymentMethodSelector({
    selected,
    onSelect
}: {
    selected: PaymentMethod
    onSelect: (method: PaymentMethod) => void
}) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2">
            {Object.entries(paymentMethods).map(([key, config]) => (
                <button
                    key={key}
                    onClick={() => onSelect(key as PaymentMethod)}
                    className={cn(
                        'flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all border-2',
                        selected === key
                            ? `${config.bgColor} text-white border-transparent`
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    )}
                >
                    <span className="text-lg">{config.emoji}</span>
                    {config.label}
                </button>
            ))}
        </div>
    )
}

function UploadReceiptSection({ onUpload }: { onUpload: (file: File) => void }) {
    const [dragActive, setDragActive] = useState(false)

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragActive(false)
        if (e.dataTransfer.files?.[0]) {
            onUpload(e.dataTransfer.files[0])
        }
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Subir Comprobante
            </h3>

            <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(
                    'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                    dragActive
                        ? 'border-brand-primary bg-blue-50'
                        : 'border-slate-300 hover:border-slate-400'
                )}
            >
                <Camera className="w-12 h-12 mx-auto text-slate-400 mb-3" />
                <p className="text-slate-600 mb-2">
                    Arrastra tu comprobante aquí o
                </p>
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg cursor-pointer hover:bg-blue-700">
                    <Upload className="w-4 h-4" />
                    Seleccionar Archivo
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
                    />
                </label>
                <p className="text-xs text-slate-400 mt-3">
                    PNG, JPG o PDF hasta 5MB
                </p>
            </div>

            <div className="mt-4 p-4 bg-amber-50 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                    <p className="font-medium">Importante</p>
                    <p>El comprobante debe mostrar claramente el monto y la fecha de la transacción.</p>
                </div>
            </div>
        </div>
    )
}

// ===== Main Page =====

export default function PagoPage({ params }: { params: { orderId: string } }) {
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('nequi')
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'uploading' | 'verifying' | 'confirmed'>('pending')
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)

    const config = paymentMethods[selectedMethod]
    const order = mockOrderData

    const handleUpload = (file: File) => {
        setUploadedFile(file)
        setPaymentStatus('uploading')

        // Simulate upload
        setTimeout(() => {
            setPaymentStatus('verifying')
        }, 1500)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 pb-8">
            {/* Header */}
            <header className="bg-white border-b border-slate-200">
                <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 -ml-2 text-slate-400 hover:text-slate-600">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="font-bold text-slate-900">Pago con QR</h1>
                        <p className="text-xs text-slate-500">Pedido {order.orderNumber}</p>
                    </div>
                </div>
            </header>

            <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                    <h3 className="font-bold text-slate-900 mb-3">📋 Resumen del Pedido</h3>
                    <ul className="space-y-1 text-sm text-slate-600">
                        {order.items.map((item, index) => (
                            <li key={index}>• {item.quantity}x {item.name}</li>
                        ))}
                    </ul>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center">
                        <span className="font-medium text-slate-900">Total a pagar</span>
                        <span className="text-xl font-bold text-brand-primary">{formatPrice(order.amount)}</span>
                    </div>
                </div>

                {/* Timer */}
                <div className="bg-amber-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-amber-800">Tiempo para pagar</p>
                        <p className="text-lg font-bold text-amber-900">14:59</p>
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                    <h3 className="font-medium text-slate-700 mb-3">Selecciona método de pago</h3>
                    <PaymentMethodSelector selected={selectedMethod} onSelect={setSelectedMethod} />
                </div>

                {/* QR Code Display */}
                <QRCodeDisplay method={selectedMethod} amount={order.amount} />

                {/* Instructions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="font-bold text-slate-900 mb-4">📝 Instrucciones</h3>
                    <ol className="space-y-3">
                        {config.instructions.map((instruction, index) => (
                            <li key={index} className="flex gap-3">
                                <span className={cn(
                                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0',
                                    config.bgColor
                                )}>
                                    {index + 1}
                                </span>
                                <span className="text-sm text-slate-600">{instruction}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                {/* Copy Buttons */}
                <div className="flex gap-3">
                    <div className="flex-1 bg-white rounded-xl p-4 shadow-lg">
                        <p className="text-xs text-slate-500 mb-1">Número / Cuenta</p>
                        <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-slate-900">{config.accountNumber}</span>
                            <CopyButton text={config.accountNumber} />
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-4 shadow-lg">
                        <p className="text-xs text-slate-500 mb-1">Monto exacto</p>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{order.amount.toLocaleString()}</span>
                            <CopyButton text={order.amount.toString()} />
                        </div>
                    </div>
                </div>

                {/* Upload Receipt */}
                {paymentStatus === 'pending' && (
                    <UploadReceiptSection onUpload={handleUpload} />
                )}

                {/* Upload/Verifying Status */}
                {paymentStatus === 'uploading' && (
                    <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4" />
                        <p className="font-medium text-slate-900">Subiendo comprobante...</p>
                    </div>
                )}

                {paymentStatus === 'verifying' && (
                    <div className="bg-blue-50 rounded-2xl p-6 shadow-lg text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Verificando pago</h3>
                        <p className="text-sm text-blue-700">
                            Estamos revisando tu comprobante. Te notificaremos cuando sea confirmado.
                        </p>
                        <div className="mt-4 flex justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                En revisión
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
