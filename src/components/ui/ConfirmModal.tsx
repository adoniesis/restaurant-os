'use client'

import { Fragment } from 'react'
import { AlertTriangle, X } from 'lucide-react'

// ===== Types =====

export interface ConfirmModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    variant?: 'danger' | 'warning' | 'info'
    isLoading?: boolean
}

// ===== Variant Styles =====

const variantStyles = {
    danger: {
        icon: 'bg-red-100 text-red-600',
        button: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    warning: {
        icon: 'bg-amber-100 text-amber-600',
        button: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
    info: {
        icon: 'bg-blue-100 text-blue-600',
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
}

// ===== Component =====

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = '¿Estás seguro?',
    message,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    variant = 'danger',
    isLoading = false,
}: ConfirmModalProps) {
    if (!isOpen) return null

    const styles = variantStyles[variant]

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget && !isLoading) {
            onClose()
        }
    }

    const handleConfirm = () => {
        if (!isLoading) {
            onConfirm()
        }
    }

    return (
        <Fragment>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={handleBackdropClick}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div
                    className="w-full max-w-md bg-white rounded-xl shadow-modal animate-slide-in-up"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 
                       rounded-full hover:bg-slate-100 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Cerrar"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Content */}
                    <div className="p-6 text-center">
                        {/* Icon */}
                        <div className={`mx-auto w-16 h-16 flex items-center justify-center rounded-full ${styles.icon} mb-4`}>
                            <AlertTriangle className="w-8 h-8" />
                        </div>

                        {/* Title */}
                        <h2 id="modal-title" className="text-xl font-semibold text-slate-900 mb-2">
                            {title}
                        </h2>

                        {/* Message */}
                        <p className="text-slate-600 mb-6">
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 
                         bg-white border border-slate-300 rounded-lg
                         hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-offset-2
                          disabled:opacity-50 disabled:cursor-not-allowed
                          transition-colors ${styles.button}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Procesando...
                                    </span>
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmModal
