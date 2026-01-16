import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * Format price in Colombian Pesos
 */
export function formatPrice(price: number | string): string {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(numericPrice)
}

/**
 * Format date in Colombian locale
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        ...options,
    }).format(dateObj)
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('es-CO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(dateObj)
}

/**
 * Format relative time (e.g., "hace 5 minutos")
 */
export function formatRelativeTime(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Ahora'
    if (diffMins < 60) return `Hace ${diffMins} min`
    if (diffHours < 24) return `Hace ${diffHours}h`
    if (diffDays < 7) return `Hace ${diffDays} días`
    return formatDate(dateObj)
}

/**
 * Generate a random order number
 */
export function generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase()
    const random = Math.random().toString(36).substring(2, 6).toUpperCase()
    return `${timestamp}${random}`
}

/**
 * Generate a tracking code
 */
export function generateTrackingCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
}

/**
 * Calculate estimated delivery time based on distance
 */
export function calculateEstimatedTime(distanceKm: number, preparationMinutes: number = 20): number {
    // Average speed: 20 km/h in city traffic
    const deliveryMinutes = Math.ceil((distanceKm / 20) * 60)
    return preparationMinutes + deliveryMinutes
}

/**
 * Order status labels and colors
 */
export const ORDER_STATUSES = {
    new: { label: 'Nuevo', color: 'order-new', emoji: '🆕' },
    confirmed: { label: 'Confirmado', color: 'order-confirmed', emoji: '✅' },
    preparing: { label: 'En Preparación', color: 'order-preparing', emoji: '👨‍🍳' },
    ready: { label: 'Listo', color: 'order-ready', emoji: '📦' },
    on_way: { label: 'En Camino', color: 'order-onway', emoji: '🚚' },
    delivered: { label: 'Entregado', color: 'order-delivered', emoji: '✨' },
    cancelled: { label: 'Cancelado', color: 'badge-error', emoji: '❌' },
} as const

/**
 * Payment method labels
 */
export const PAYMENT_METHODS = {
    nequi_qr: { label: 'Nequi QR', icon: '📱' },
    daviplata_qr: { label: 'Daviplata QR', icon: '📱' },
    bancolombia_qr: { label: 'Bancolombia QR', icon: '🏦' },
    wompi: { label: 'Pago en línea', icon: '💳' },
    cash: { label: 'Efectivo', icon: '💵' },
    dataphone: { label: 'Datafono', icon: '💳' },
} as const

/**
 * Payment status labels
 */
export const PAYMENT_STATUSES = {
    pending: { label: 'Pendiente', color: 'badge-warning' },
    confirmed: { label: 'Confirmado', color: 'badge-success' },
    failed: { label: 'Fallido', color: 'badge-error' },
    refunded: { label: 'Reembolsado', color: 'badge-info' },
} as const

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
    }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength - 3) + '...'
}

/**
 * Format phone number for Colombia
 */
export function formatPhoneNumber(phone: string): string {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '')

    // If starts with 57, format as Colombian
    if (digits.startsWith('57') && digits.length === 12) {
        return `+57 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
    }

    // If 10 digits, assume Colombian mobile
    if (digits.length === 10) {
        return `+57 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    }

    return phone
}

/**
 * Generate WhatsApp URL
 */
export function getWhatsAppUrl(phone: string, message?: string): string {
    const cleanPhone = phone.replace(/\D/g, '')
    const encodedMessage = message ? encodeURIComponent(message) : ''
    return `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}
