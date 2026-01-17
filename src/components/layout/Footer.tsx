import Link from 'next/link'
import { Utensils, Mail, MapPin } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 px-4 border-t border-slate-800">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">

                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                            <Utensils className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-white text-lg">RestaurantOS</span>
                    </div>
                    <p className="text-sm text-slate-400 max-w-xs">
                        La plataforma integral para digitalizar y potenciar restaurantes en Latinoamérica.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <Link href="/terminos" className="hover:text-white transition-colors">
                                Términos y Condiciones
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacidad" className="hover:text-white transition-colors">
                                Política de Privacidad
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Contacto</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <Mail className="w-4 h-4 mt-0.5 text-brand-primary" />
                            <a href="mailto:adoniesis2010@gmail.com" className="hover:text-white transition-colors">
                                adoniesis2010@gmail.com
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-0.5 text-brand-primary" />
                            <span>Medellín, Colombia</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-6xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>
                    © 2025 Adoniesis Serna Hinestroza. Todos los derechos reservados.
                </p>
                <div className="flex gap-4">
                    <Link href="/contacto" className="hover:text-white transition-colors">Contáctanos</Link>
                </div>
            </div>
        </footer>
    )
}
