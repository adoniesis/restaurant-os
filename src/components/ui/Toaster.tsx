'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react'

// ===== Types =====

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
    id: string
    type: ToastType
    message: string
    duration?: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (type: ToastType, message: string, duration?: number) => void
    removeToast: (id: string) => void
}

// ===== Context =====

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

// ===== Toast Item Component =====

const toastStyles: Record<ToastType, { bg: string; icon: React.ReactNode; iconBg: string }> = {
    success: {
        bg: 'bg-green-500',
        iconBg: 'bg-green-600',
        icon: <CheckCircle className="w-5 h-5 text-white" />,
    },
    error: {
        bg: 'bg-red-500',
        iconBg: 'bg-red-600',
        icon: <XCircle className="w-5 h-5 text-white" />,
    },
    warning: {
        bg: 'bg-amber-500',
        iconBg: 'bg-amber-600',
        icon: <AlertTriangle className="w-5 h-5 text-white" />,
    },
    info: {
        bg: 'bg-blue-500',
        iconBg: 'bg-blue-600',
        icon: <Info className="w-5 h-5 text-white" />,
    },
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
    const style = toastStyles[toast.type]

    useEffect(() => {
        const timer = setTimeout(onRemove, toast.duration || 5000)
        return () => clearTimeout(timer)
    }, [toast.duration, onRemove])

    return (
        <div
            className={`
        flex items-center gap-3 min-w-[320px] max-w-md p-4 rounded-lg shadow-lg
        ${style.bg} text-white
        animate-slide-in-right
      `}
            role="alert"
        >
            <div className={`flex-shrink-0 p-1 rounded-full ${style.iconBg}`}>
                {style.icon}
            </div>
            <p className="flex-1 text-sm font-medium">{toast.message}</p>
            <button
                onClick={onRemove}
                className="flex-shrink-0 p-1 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Cerrar notificación"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

// ===== Toast Container Component =====

function ToastContainer({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) {
    return (
        <div
            className="fixed top-4 right-4 z-50 flex flex-col gap-3"
            aria-live="polite"
            aria-label="Notificaciones"
        >
            {toasts.map((toast) => (
                <ToastItem
                    key={toast.id}
                    toast={toast}
                    onRemove={() => removeToast(toast.id)}
                />
            ))}
        </div>
    )
}

// ===== Toast Provider =====

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = useCallback((type: ToastType, message: string, duration = 5000) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        setToasts((prev) => [...prev, { id, type, message, duration }])
    }, [])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    )
}

// ===== Toaster (exports Provider for layout.tsx) =====

export function Toaster() {
    return null // The actual toasts are rendered by ToastProvider
}

// ===== Re-export for convenience =====
export { ToastProvider as ToasterProvider }
