import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // RestaurantOS Brand Colors
                brand: {
                    primary: '#2563eb',    // Blue - Primary actions
                    secondary: '#64748b',  // Gray - Secondary text
                    accent: '#f59e0b',     // Amber - Highlights
                },
                // Status Colors
                status: {
                    success: '#22c55e',    // Green
                    warning: '#f59e0b',    // Amber
                    error: '#ef4444',      // Red
                    info: '#3b82f6',       // Blue
                },
                // Order Status Colors
                order: {
                    new: '#ef4444',        // Red
                    confirmed: '#f59e0b',  // Amber
                    preparing: '#3b82f6',  // Blue
                    ready: '#22c55e',      // Green
                    onway: '#8b5cf6',      // Purple
                    delivered: '#6b7280',  // Gray
                    cancelled: '#dc2626',  // Dark Red
                },
                // Payment Status Colors
                payment: {
                    pending: '#f59e0b',
                    confirmed: '#22c55e',
                    failed: '#ef4444',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                lg: '0.75rem',
                md: '0.5rem',
                sm: '0.25rem',
            },
            boxShadow: {
                'card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                'card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'modal': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'slide-in-up': 'slideInUp 0.3s ease-out',
                'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                slideInUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                pulseRing: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '.5' },
                },
            },
        },
    },
    plugins: [],
}

export default config
