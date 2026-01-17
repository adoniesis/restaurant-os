import { Footer } from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowLeft, Mail, MapPin, Phone, MessageCircle } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white border-b border-slate-200 py-4">
                <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-brand-primary font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al Inicio
                    </Link>
                    <span className="font-bold text-slate-900">RestaurantOS</span>
                </div>
            </header>

            <main className="flex-1 py-12 px-4">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h1 className="text-3xl font-bold text-slate-900 mb-6">Contáctanos</h1>
                        <p className="text-slate-600 mb-8">
                            ¿Tienes dudas sobre RestaurantOS? Estamos aquí para ayudarte a digitalizar tu negocio.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-brand-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Correo Electrónico</h3>
                                    <a href="mailto:adoniesis2010@gmail.com" className="text-brand-primary hover:underline">
                                        adoniesis2010@gmail.com
                                    </a>
                                    <p className="text-xs text-slate-400 mt-1">Soporte y Ventas</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900">Ubicación</h3>
                                    <p className="text-slate-600">Medellín, Colombia</p>
                                    <p className="text-xs text-slate-400 mt-1">Oficina Central</p>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-8">
                                <h4 className="font-bold text-slate-900 mb-2">Información Legal</h4>
                                <p className="text-sm text-slate-600 mb-1">
                                    <strong>Representante:</strong> Adoniesis Serna Hinestroza
                                </p>
                                <p className="text-sm text-slate-600">
                                    Todos los derechos reservados © 2025
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Envíanos un mensaje</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="Tu nombre" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="tucorreo@ejemplo.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Mensaje</label>
                                <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
