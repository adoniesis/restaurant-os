import Link from 'next/link'
import { Utensils, ArrowRight, Smartphone, CreditCard, MapPin, CheckCircle } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 bg-brand-primary rounded-lg flex items-center justify-center">
                                <Utensils className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-brand-primary">
                                Restaurant<span className="text-slate-700">OS</span>
                            </span>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center gap-4">
                            <Link
                                href="/auth/login"
                                className="text-sm font-medium text-slate-600 hover:text-brand-primary transition-colors"
                            >
                                Iniciar Sesión
                            </Link>
                            <Link
                                href="/auth/register"
                                className="btn-primary text-sm"
                            >
                                Registrar Negocio
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                        La plataforma completa para tu{' '}
                        <span className="text-gradient-brand">restaurante</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Gestiona pedidos, recibe pagos QR, automatiza tu WhatsApp y haz seguimiento
                        en tiempo real. Todo en una sola plataforma.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/auth/register" className="btn-primary text-lg px-8 py-4">
                            Comenzar Gratis
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/demo" className="btn-outline text-lg px-8 py-4">
                            Ver Demo
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                        Todo lo que necesitas para tu negocio
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Smartphone,
                                title: 'Bot de WhatsApp',
                                description: 'Automatiza la atención al cliente y recibe pedidos 24/7',
                            },
                            {
                                icon: CreditCard,
                                title: 'Pagos QR',
                                description: 'Nequi, Daviplata, Bancolombia y pagos en línea integrados',
                            },
                            {
                                icon: MapPin,
                                title: 'Tracking GPS',
                                description: 'Seguimiento en tiempo real para tus clientes y repartidores',
                            },
                            {
                                icon: CheckCircle,
                                title: 'Panel Completo',
                                description: 'Gestiona menú, pedidos, inventario y reportes en un solo lugar',
                            },
                        ].map((feature, index) => (
                            <div key={index} className="card-smooth p-6 text-center">
                                <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-7 h-7 text-brand-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                                <p className="text-slate-600 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto bg-brand-primary rounded-2xl p-8 sm:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        ¿Listo para digitalizar tu restaurante?
                    </h2>
                    <p className="text-blue-100 mb-8 max-w-xl mx-auto">
                        Únete a cientos de restaurantes que ya confían en RestaurantOS para
                        gestionar sus pedidos y crecer su negocio.
                    </p>
                    <Link
                        href="/auth/register"
                        className="inline-flex items-center gap-2 bg-white text-brand-primary font-semibold 
                     px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Comenzar Ahora - Es Gratis
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-slate-200">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                            <Utensils className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900">RestaurantOS</span>
                    </div>
                    <p className="text-sm text-slate-500">
                        © {new Date().getFullYear()} RestaurantOS. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </div>
    )
}
