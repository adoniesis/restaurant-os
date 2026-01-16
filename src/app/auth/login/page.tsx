'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Utensils } from 'lucide-react'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // TODO: Implement actual login logic
        await new Promise(r => setTimeout(r, 1000))
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background with food illustrations */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100" />

            {/* Decorative food illustrations - positioned around the edges */}
            <div className="absolute inset-0 opacity-30">
                {/* Left side decorations */}
                <div className="absolute left-12 top-20 text-6xl rotate-[-15deg]">🍝</div>
                <div className="absolute left-24 bottom-32 text-5xl rotate-[10deg]">🥗</div>
                <div className="absolute left-8 bottom-48 text-4xl">🍅</div>

                {/* Right side decorations */}
                <div className="absolute right-16 top-24 text-6xl rotate-[15deg]">🍽️</div>
                <div className="absolute right-8 top-48 text-4xl">🥄</div>
                <div className="absolute right-20 bottom-40 text-5xl rotate-[-10deg]">🍕</div>

                {/* Top decorations */}
                <div className="absolute left-1/4 top-12 text-4xl">🌿</div>
                <div className="absolute right-1/3 top-8 text-5xl">🍳</div>

                {/* Bottom decorations */}
                <div className="absolute left-1/3 bottom-12 text-4xl rotate-[20deg]">🍔</div>
                <div className="absolute right-1/4 bottom-16 text-5xl">🥤</div>
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/50">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                                <Utensils className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-brand-primary">
                                Restaurant<span className="text-slate-700">OS</span>
                            </span>
                        </div>
                        <h1 className="text-xl font-semibold text-slate-900 mt-4">
                            Iniciar Sesión
                        </h1>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div className="relative">
                            <Mail className="input-icon" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                                className="input-base input-with-icon"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <Lock className="input-icon" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="input-base input-with-icon pr-11"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 text-brand-primary border-slate-300 rounded 
                         focus:ring-brand-primary focus:ring-offset-0"
                            />
                            <label htmlFor="remember" className="ml-2 text-sm text-slate-600">
                                Recordarme
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-3"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Iniciando sesión...
                                </span>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>

                    {/* Forgot Password */}
                    <div className="text-center mt-4">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-brand-primary hover:text-blue-700 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Divider */}
                    <div className="my-6 border-t border-slate-200" />

                    {/* Register Link */}
                    <p className="text-center text-sm text-slate-600">
                        ¿No tienes cuenta?{' '}
                        <Link
                            href="/auth/register"
                            className="font-medium text-brand-primary hover:text-blue-700 hover:underline"
                        >
                            Registrarse
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
